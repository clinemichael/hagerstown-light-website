export type Vehicle = {
  id: string;
  name: string;
  type: string;
  mileage: number;
  maintenance: string;
};

export const vehicles: Vehicle[] = [
  {
    id: "T-12",
    name: "Truck 12",
    type: "Bucket Truck",
    mileage: 45231,
    maintenance: "2026-09-15",
  },
  {
    id: "T-18",
    name: "Truck 18",
    type: "Bucket Truck",
    mileage: 38742,
    maintenance: "2026-10-02",
  },
  {
    id: "T-21",
    name: "Truck 21",
    type: "Line Truck",
    mileage: 52108,
    maintenance: "2026-08-25",
  },
  {
    id: "T-24",
    name: "Truck 24",
    type: "Bucket Truck",
    mileage: 41685,
    maintenance: "2026-09-10",
  },
  {
    id: "T-26",
    name: "Truck 26",
    type: "Service Truck",
    mileage: 29314,
    maintenance: "2026-09-20",
  },
  {
    id: "ST-01",
    name: "Service Truck 1",
    type: "Service Truck",
    mileage: 18756,
    maintenance: "2026-10-05",
  },
];