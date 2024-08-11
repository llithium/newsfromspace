"use client";
import Countdown from "react-countdown";

const CountdownTimer = ({ date }: { date: Date }) => {
  return (
    <Countdown className="font-semibold opacity-70" date={date}></Countdown>
  );
};

export default CountdownTimer;
