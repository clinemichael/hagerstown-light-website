import AdminManagementGuard from "@/components/auth/AdminManagementGuard";

export default function FleetAdminLayout({
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