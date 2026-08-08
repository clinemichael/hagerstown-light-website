import AppLayout from "@/components/layout/AppLayout";
import QuickActions from "@/components/dashboard/QuickActions";
import OperationsStatus from "@/components/dashboard/OperationsStatus";
import TodaysOperations from "@/components/dashboard/TodaysOperations";
import OperationsAlerts from "@/components/dashboard/OperationsAlerts";


export default function Dashboard() {
  return (
    <AppLayout>

      <h1 className="text-3xl font-bold text-brand-blue">
        HLD Operations Dashboard
      </h1>

      <OperationsStatus />

      <div className="grid lg:grid-cols-2 gap-6 mt-10">

  <QuickActions />

  <TodaysOperations />

</div>
        <OperationsAlerts />
        
    </AppLayout>
  );
}