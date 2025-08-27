
import { AppFavourite } from "@/features";
import { AppLayout } from "@/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Rick and Morty Favourites',
  description: 'Browse Rick and Morty Favourites',
};
export default function Favourite() {
  return (
    <AppLayout>
      <AppFavourite/>
    </AppLayout>
  );
}
