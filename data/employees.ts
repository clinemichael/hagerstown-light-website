export type EmployeeStatus =
  | "Active"
  | "Inactive";

export type Employee = {
  id: string;
  name: string;
  title: string;
  status: EmployeeStatus;
  phone: string;
};

export const employees: Employee[] = [
  {
    id: "1001",
    name: "John Smith",
    title: "Lead Lineman",
    status: "Active",
    phone: "301-555-0101",
  },
  {
    id: "1002",
    name: "Robert Jones",
    title: "Lineman",
    status: "Active",
    phone: "301-555-0102",
  },
  {
    id: "1003",
    name: "Michael Davis",
    title: "Lineman",
    status: "Active",
    phone: "301-555-0103",
  },
  {
    id: "1004",
    name: "James Wilson",
    title: "Apprentice Lineman",
    status: "Active",
    phone: "301-555-0104",
  },
  {
    id: "1005",
    name: "David Miller",
    title: "Service Technician",
    status: "Active",
    phone: "301-555-0105",
  },
  {
    id: "1006",
    name: "Chris Anderson",
    title: "Lineman",
    status: "Inactive",
    phone: "301-555-0106",
  },
];