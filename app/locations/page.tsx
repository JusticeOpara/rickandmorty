

import AppLocation from "@/features/AppLocations";
import { AppLayout } from "@/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Rick and Morty Locations',
  description: 'Browse Rick and Morty Locations',
};
export default function Favourite() {
  return (
    <AppLayout>
      <AppLocation/>
    </AppLayout>
  );
}