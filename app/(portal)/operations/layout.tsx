"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

type OperationsLayoutProps = {
  children: ReactNode;
};

export default function OperationsLayout({
  children,
}: OperationsLayoutProps) {
  const pathname = usePathname();

  const isCalendar =
    pathname === "/operations/calendar";

  const isCrew =
    pathname === "/operations/crew";

  const isFleet =
    pathname === "/operations/fleet";

  return (

      <div>

        {/* Operations Header */}

        <div className="mb-6">

          <h1 className="text-3xl font-bold text-brand-blue">
            Operations
          </h1>

          <p className="text-gray-600 mt-1">
            Manage daily operations, crews, fleet, and scheduling.
          </p>

        </div>


        {/* Operations Navigation */}

        <div className="
          flex
          gap-2
          border-b
          border-gray-200
          mb-6
        ">

          <Link
            href="/operations/calendar"
           className={`
             px-5
             py-3
             font-semibold
             rounded-t-lg
             transition
             ${
             isCalendar
                ? "text-brand-blue bg-blue-50 border-b-2 border-brand-blue"
                : "text-gray-500 hover:text-brand-blue hover:bg-gray-50"
             }
`           }
          >
            Calendar
          </Link>


          <Link
            href="/operations/crew"
            className={`
              px-5
              py-3
              font-semibold
              rounded-t-lg
              transition
              ${
                isCrew
                   ? "text-brand-blue bg-blue-50 border-b-2 border-brand-blue"
                : "text-gray-500 hover:text-brand-blue hover:bg-gray-50"
              }
            `}
          >
            Crew
          </Link>


          <Link
            href="/operations/fleet"
            className={`
              px-5
              py-3
              font-semibold
              rounded-t-lg
              transition
              ${
                isFleet
                  ? "text-brand-blue bg-blue-50 border-b-2 border-brand-blue"
                  : "text-gray-500 hover:text-brand-blue hover:bg-gray-50"
              }
            `}
          >
            Fleet
          </Link>

        </div>


        {/* Current Page */}

        {children}

      </div>

    
  );
}