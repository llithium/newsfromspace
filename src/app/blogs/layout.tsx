export default function Layout({
  blogsModal,
  children,
}: {
  blogsModal: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <div>{blogsModal}</div>
      <div>{children}</div>
    </>
  );
}
