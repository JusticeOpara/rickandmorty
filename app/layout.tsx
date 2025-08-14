import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/lib/Providers";


export const metadata: Metadata = {
  title: "Web Page",
  description: "Web Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className=""
      >
         <Providers> 
          {children}
         </Providers> 
      </body>
    </html>
  );
}
