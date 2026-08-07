import AppLayout from "@/components/layout/AppLayout";
import QuickActions from "@/components/dashboard/QuickActions";
import OperationsStatus from "@/components/dashboard/OperationsStatus";


export default function Dashboard() {
  return (
    <AppLayout>

      <h1 className="text-3xl font-bold text-brand-blue">
        HLD Operations Dashboard
      </h1>

      <OperationsStatus />

      <QuickActions />

    </AppLayout>
  );
}