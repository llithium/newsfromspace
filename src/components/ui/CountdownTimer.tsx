"use client";
import Countdown, { CountdownRenderProps } from "react-countdown";

const pad = (n: number) => String(n).padStart(2, "0");

type Variant = "inline" | "card" | "bay";

const Segments = ({
  days,
  hours,
  minutes,
  seconds,
  big,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  big?: boolean;
}) => (
  <div className={big ? "bigclock" : "clock"}>
    <div className="seg">
      <div className="num">{pad(days)}</div>
      <div className="unit">Days</div>
    </div>
    <div className="seg">
      <div className="num">{pad(hours)}</div>
      <div className="unit">Hrs</div>
    </div>
    <div className="seg">
      <div className="num">{pad(minutes)}</div>
      <div className="unit">Min</div>
    </div>
    <div className="seg">
      <div className="num">{pad(seconds)}</div>
      <div className="unit">Sec</div>
    </div>
  </div>
);

const CountdownTimer = ({
  date,
  variant = "inline",
  className,
}: {
  date: Date;
  variant?: Variant;
  className?: string;
}) => {
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    if (completed) {
      return (
        <span
          className={`countdown-expired${className ? ` ${className}` : ""}`}
        >
          Window elapsed
        </span>
      );
    }
    if (variant === "card" || variant === "bay") {
      return (
        <Segments
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          big={variant === "bay"}
        />
      );
    }
    // inline
    const text =
      days > 0
        ? `${days}d ${pad(hours)}h`
        : hours > 0
          ? `${pad(hours)}h ${pad(minutes)}m`
          : `${pad(minutes)}m ${pad(seconds)}s`;
    return <span className={className}>{text}</span>;
  };

  return <Countdown date={date} renderer={renderer} />;
};

export default CountdownTimer;
