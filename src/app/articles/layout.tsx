export default function Layout({
  articlesCard,
  children,
}: {
  articlesCard: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <div>{articlesCard}</div>
      <div>{children}</div>
    </>
  );
}
