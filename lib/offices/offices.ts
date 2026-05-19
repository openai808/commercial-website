import type { OfficeLocation } from "@/lib/offices/types";

/** Static office locations until an offices table is available in Supabase. */
export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    id: "metro-manila",
    name: "Metro Manila",
    city: "Makati City",
    address: "26th Floor, GT Tower International, Ayala Avenue, Makati City",
    phone: "+63 2 8888 0000",
    email: "metro.manila@remaxcommercial.ph",
  },
  {
    id: "cebu",
    name: "Cebu",
    city: "Cebu City",
    address: "Cebu Business Park, Cebu City",
    phone: "+63 32 8888 0000",
    email: "cebu@remaxcommercial.ph",
  },
  {
    id: "davao",
    name: "Davao",
    city: "Davao City",
    address: "Lanang, Davao City",
    phone: "+63 82 8888 0000",
    email: "davao@remaxcommercial.ph",
  },
  {
    id: "clark",
    name: "Clark / Central Luzon",
    city: "Angeles City",
    address: "Clark Freeport Zone, Pampanga",
    phone: "+63 45 8888 0000",
    email: "clark@remaxcommercial.ph",
  },
];

export function getOffices(): OfficeLocation[] {
  return OFFICE_LOCATIONS;
}
