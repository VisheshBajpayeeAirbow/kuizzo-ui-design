import Navbar from "@/components/ui/Molecules/Navbar/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Institutions",
  description: "Institutions Listing Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className={`bg-background-app `}>{children}</section>;
}
