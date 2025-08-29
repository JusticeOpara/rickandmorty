import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/lib/Providers";
import { Inter } from 'next/font/google';


export const metadata: Metadata = {
  title: 'Rick and Morty App',
  description: 'Browse Rick and Morty characters',
};
const inter = Inter({
  variable: '--font-inter',
  display: 'swap',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
         className={`${inter.variable} font-sans antialiased`}
      >
         <Providers> 
          {children}
         </Providers> 
      </body>
    </html>
  );
}
