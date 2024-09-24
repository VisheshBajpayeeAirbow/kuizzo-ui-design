import InstitutionAboutUs from "@/components/ui/Organisms/sections/InstitutionAboutUs";
import InstitutionContactUs from "@/components/ui/Organisms/sections/InstitutionContactUs";
import InstitutionFAQ from "@/components/ui/Organisms/sections/InstitutionFAQ";
import InstitutionSuccessStory from "@/components/ui/Organisms/sections/InstitutionSuccessStory";
import InstitutionTestimonials from "@/components/ui/Organisms/sections/InstitutionTestimonials";
import InstitutionWhyUs from "@/components/ui/Organisms/sections/InstitutionWhyUs";
import { kuizzoAboutUsData } from "@/mappings";

const AboutUsPage = () => {
  // Neet to know if this will be dynamic or static
  // DUMMY DATA
  const data = kuizzoAboutUsData;

  return (
    <div>
      <InstitutionAboutUs
        title={data.aboutUs.data.title}
        aboutInfo={data.aboutUs.data.description}
        images={data.aboutUs.data.images}
      />
      <InstitutionWhyUs disableGradient data={data.whyUsCounters.data} />
      <InstitutionSuccessStory images={data.gallerySection.data} />

      <InstitutionFAQ data={data.faqSection.data} />
      <InstitutionTestimonials data={data.testimonialSection.data} />
      <InstitutionContactUs />
    </div>
  );
};

export default AboutUsPage;
