import Footer from "@/components/ui/Molecules/Footer";
import Navbar from "@/components/ui/Molecules/Navbar/Navbar";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
const PrivateLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
      <Toaster position="bottom-center" />
    </div>
  );
};

export default PrivateLayout;
