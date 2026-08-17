import AdminManagementGuard from "@/components/auth/AdminManagementGuard";

export default function CrewsAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminManagementGuard>
      {children}
    </AdminManagementGuard>
  );
}