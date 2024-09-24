import Navbar from "@/components/ui/Molecules/Navbar/Navbar";
import React from "react";
import HeroSection from "@/sections/HomePage/HeroSection";
import BrowseByExamSection from "@/sections/HomePage/BrowseByExamSection";
import ExploreTopFlashCardsSection from "@/sections/HomePage/ExploreTopFlashCardsSection";
import ExploreTopNotesSection from "@/sections/HomePage/ExploreTopNotesSection";
import ExploreSubjectsSection from "@/sections/HomePage/ExploreSubjectsSection";
import LearnMoreSection from "@/sections/HomePage/LearnMoreSection";
import FAQSection from "@/sections/HomePage/FAQSection";
import TestimonialsSection from "@/sections/HomePage/TestimonialsSection";
import Footer from "@/components/ui/Molecules/Footer";

const HomePage = () => (
  <main className={`flex flex-col min-h-screen bg-background-app`}>
    <Navbar />
    <HeroSection />
    <BrowseByExamSection />
    <ExploreTopFlashCardsSection />
    <ExploreTopNotesSection />
    <ExploreSubjectsSection />
    <LearnMoreSection />
    <FAQSection />
    <TestimonialsSection />
    <Footer />
  </main>
);

export default HomePage;
