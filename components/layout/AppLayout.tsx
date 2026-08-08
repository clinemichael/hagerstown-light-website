import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import OperationsHeader from "./OperationsHeader";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-brand-light">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <OperationsHeader />

        <main className="flex-1 p-8">

  <div className="max-w-7xl mx-auto">
    {children}
  </div>

</main>

      </div>

    </div>
  );
}