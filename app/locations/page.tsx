

import Location from "@/features/locations/Locations";
import { AppLayout } from "@/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Rick and Morty Location',
  description: 'Browse Rick and Morty Location',
};
export default function LocationPage() {
  return (
    <AppLayout>
      <Location/>
    </AppLayout>
  );
}