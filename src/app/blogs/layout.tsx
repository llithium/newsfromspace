export default function Layout({
  blogsCard,
  children,
}: {
  blogsCard: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <div>{blogsCard}</div>
      <div>{children}</div>
    </>
  );
}
