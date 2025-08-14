import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/lib/Providers";


export const metadata: Metadata = {
  title: 'Rick and Morty App',
  description: 'Browse Rick and Morty characters',
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
