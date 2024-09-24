import Footer from "@/components/ui/Molecules/Footer";
import Navbar from "@/components/ui/Molecules/Navbar/Navbar";
import { ReactNode } from "react";

const NavbarAndFooterLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className={`bg-background-app`}>
      <Navbar />
      {children}
      <Footer />
    </section>
  );
};

export default NavbarAndFooterLayout;
