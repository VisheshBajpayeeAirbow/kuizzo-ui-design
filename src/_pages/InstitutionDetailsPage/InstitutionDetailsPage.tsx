"use client";
import { useState, useEffect } from "react";
import InstitutionHero from "@/components/ui/Organisms/sections/InstitutionHero";
import InstitutionCourses from "@/components/ui/Organisms/sections/InstitutionCourses";
import InstitutionWhyUs from "@/components/ui/Organisms/sections/InstitutionWhyUs";
import InstitutionAboutUs from "@/components/ui/Organisms/sections/InstitutionAboutUs";
import InstitutionSuccessStory from "@/components/ui/Organisms/sections/InstitutionSuccessStory";
import InstitutionFAQ from "@/components/ui/Organisms/sections/InstitutionFAQ";
import InstitutionTestimonials from "@/components/ui/Organisms/sections/InstitutionTestimonials";
import InstitutionContactUs from "@/components/ui/Organisms/sections/InstitutionContactUs";
import { useGetInstituteBySlug } from "@/server/queries";
import { IPageContent } from "@/types/api";
import Spinner from "@/components/ui/Atoms/Spinner";

const InstitutionHomePage = ({ slug }: { slug: string }) => {
  const {
    data: institutionData,
    isLoading,
    isError,
    error,
  } = useGetInstituteBySlug(slug);

  const [pageContent, setPageContent] = useState<IPageContent | null>(null);
  const [pagePublished, setPagePublished] = useState<boolean>(false);

  useEffect(() => {
    if (institutionData?.institute?.pageContent) {
      console.log(
        "Setting pageContent with:",
        institutionData.institute.pageContent
      );
      setPageContent(institutionData.institute.pageContent);
      setPagePublished(institutionData.institute.published);
    }
  }, [institutionData]);

  if (isLoading) return <Spinner loadingText="Fetching Institution" />;

  if (isError)
    return <div>Error occurred: {error?.message || "Unknown error"}</div>;

  if (!pageContent) return <div>No data available</div>;

  if (!pagePublished) return <div>Page is not Published Yet</div>;

  const {
    aboutSection,
    faqSection,
    gallerySection,
    heroSection,
    testimonialsSection,
    whyUsSection,
    coursesSection,
  } = pageContent;

  return (
    <main className="flex flex-col bg-background-app">
      {heroSection && (
        <InstitutionHero
          instituteName={heroSection.instituteName}
          address={heroSection.address}
          instituteDescription={heroSection.instituteDescription}
          instituteUrl={heroSection.instituteUrl}
          logo={heroSection.logo}
          phoneNumber={heroSection.phoneNumber}
        />
      )}
      <InstitutionCourses data={coursesSection?.courses} />
      {whyUsSection && !whyUsSection.hidden && (
        <InstitutionWhyUs disableGradient={false} data={whyUsSection.data} />
      )}
      {aboutSection && !aboutSection.hidden && (
        <InstitutionAboutUs
          title={aboutSection.data?.title}
          aboutInfo={aboutSection.data?.description}
          images={aboutSection.data?.images}
        />
      )}
      {gallerySection && !gallerySection.hidden && (
        <InstitutionSuccessStory images={gallerySection.data} />
      )}
      {faqSection && !faqSection.hidden && (
        <InstitutionFAQ data={faqSection.data} />
      )}
      {testimonialsSection && !testimonialsSection.hidden && (
        <InstitutionTestimonials data={testimonialsSection.data} />
      )}
      <InstitutionContactUs />
    </main>
  );
};

export default InstitutionHomePage;
