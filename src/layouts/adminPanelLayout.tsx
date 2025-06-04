import { AdminNavbar } from "@/components/AdminDashboard/components/AdminNavbar";

export default function AdminPanelLayout({
  children,
}: {
  hideNavbar: boolean,
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <AdminNavbar />
      {children}
    </div>
  );
}
