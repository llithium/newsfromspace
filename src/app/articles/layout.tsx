export default function Layout({
  articlesModal,
  children,
}: {
  articlesModal: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <div>{articlesModal}</div>
      <div>{children}</div>
    </>
  );
}
