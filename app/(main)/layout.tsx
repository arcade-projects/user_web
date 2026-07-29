import BottomNav from "../components/BottonNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex-1">{children}</main>
      <BottomNav />
    </>
  );
}