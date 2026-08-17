import AdminManagementGuard from "@/components/auth/AdminManagementGuard";

export default function EmployeesAdminLayout({
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