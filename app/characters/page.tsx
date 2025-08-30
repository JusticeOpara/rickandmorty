import { Characters } from "@/features";
import { AppLayout } from "@/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Rick and Morty Characters',
  description: 'Browse Rick and Morty Characters',
};
export default function Favourite() {
  return (
    <AppLayout>
      <Characters/>
    </AppLayout>
  );
}