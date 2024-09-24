"use client";
import { Button } from "@/components";
import Spinner from "@/components/ui/Atoms/Spinner";
import FormCardDashboard from "@/components/ui/Molecules/dashboard/cards/FormCardDashboard";
import ParentCardDashboard from "@/components/ui/Molecules/dashboard/cards/ParentCardDashboard";
import EditAboutUsSectionForm, {
  IEditAboutUsSectionDefaultValues,
} from "@/components/ui/Organisms/forms/dashboard/institution/EditAboutUsSectionForm";
import EditContactUsSectionForm from "@/components/ui/Organisms/forms/dashboard/institution/EditContactUsSectionForm";
import EditCounterForm, {
  IEditCounterSectionDefaultValues,
} from "@/components/ui/Organisms/forms/dashboard/institution/EditCounterForm";
import EditCoursesWeOfferForm from "@/components/ui/Organisms/forms/dashboard/institution/EditCoursesWeOfferForm";
import EditFaqSectionForm, {
  IEditFaqSectionFormDefaultValues,
} from "@/components/ui/Organisms/forms/dashboard/institution/EditFaqSectionForm";
import EditGallerySectionForm, {
  IGallerySectionFormDefaultValues,
} from "@/components/ui/Organisms/forms/dashboard/institution/EditGallerySectionForm";
import EditHeroSectionForm, {
  IEditHeroSectionDefaultValues,
} from "@/components/ui/Organisms/forms/dashboard/institution/EditHeroSectionForm";
import EditTestimonialsSectionForm, {
  IEditTestimonialsFormDefaultValues,
} from "@/components/ui/Organisms/forms/dashboard/institution/EditTestimonialsSectionForm";
import InstructorPermissionsForm, {
  IInstructorPermissionsForm,
} from "@/components/ui/Organisms/forms/dashboard/institution/InstructorPermissionsForm";
import StudentPermissionsForm, {
  IStudentPermissionsForm,
} from "@/components/ui/Organisms/forms/dashboard/institution/StudentPermissionsForm";
import { useUpdateInstitutionMutation } from "@/server/mutations";
import { useCachedInstitutionById } from "@/server/queries";
import { IGallerySectionForm, IInstitutionEditCounterForm } from "@/types";
import { getLocalStorageFormData, updateLocalStorageFormData } from "@/utils";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import ScrollToTop from "react-scroll-to-top";

const EditInstitutionPage = ({ institutionId }: { institutionId: string }) => {
  const {
    data: institutionData,
    isLoading,
    isError,
    error,
  } = useCachedInstitutionById(institutionId);
  const editMutation = useUpdateInstitutionMutation();
  const [heroFormData, setHeroFormData] = useState<
    IEditHeroSectionDefaultValues | {}
  >({});
  const [coursesWeOfferFormData, setCoursesWeOfferFormData] = useState<{
    courses: { courseId: string | undefined }[];
  }>({ courses: [] });
  const [counterFormData, setCounterFormData] = useState<
    IInstitutionEditCounterForm | {}
  >({
    titleOne: "",
    countOne: 0,
    titleTwo: "",
    countTwo: 0,
    titleThree: "",
    countThree: 0,
  });

  const [aboutUsFormData, setAboutUsFormData] =
    useState<IEditAboutUsSectionDefaultValues>({
      data: {
        title: "DEFAULT TITLE",
        description: "DEFAULT DESCRIPTION",
        images: [
          {
            fileKey:
              "https://images.pexels.com/photos/5427659/pexels-photo-5427659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            fileName: "DEFAULT IMAGE",
            fileType: "DEFAULT TYPE",
          },
          {
            fileKey:
              "https://images.pexels.com/photos/7805671/pexels-photo-7805671.jpeg?auto=compress&cs=tinysrgb&w=800",
            fileName: "DEFAULT IMAGE",
            fileType: "DEFAULT TYPE",
          },
        ],
      },
      hidden: false,
    });

  const [galleryFormData, setGalleryFormData] = useState<
    IGallerySectionForm | {}
  >({});
  const [faqFormData, setFaqFormData] =
    useState<IEditFaqSectionFormDefaultValues>({
      data: [
        {
          question: "",
          answer: "",
        },
      ],
      hidden: false,
    });
  const [testimonialsFormData, setTestimonialsFormData] =
    useState<IEditTestimonialsFormDefaultValues>({
      data: [
        {
          imageUrl: "",
          title: "",
          testimonial: "",
          ratings: 0,
        },
      ],
      hidden: false,
    });
  // contact us form selection is directally associated with the contact us section
  const [contactUsFormData, setContactUsFormData] = useState<string>("");

  const [instructorPermissionsFormData, setInstructorPermissionsFormData] =
    useState<IInstructorPermissionsForm>({
      createCourse: false,
      createQuizAndExam: true,
      addStudents: false,
      addInstructor: false,
      billingAndPayments: false,
    });

  const [studentPermissionsFormData, setStudentPermissionsFormData] =
    useState<IStudentPermissionsForm>({
      createExam: false,
      createQuiz: true,
    });

  const handleHeroFormChange = (data: IEditHeroSectionDefaultValues) => {
    toast.success("Hero section updated successfully");
    setHeroFormData(data);
    updateLocalStorageFormData("heroSection", data);
  };

  const handleCoursesWeOfferFormChange = (data: {
    courses: { courseId: string | undefined }[];
  }) => {
    toast.success("Courses we offer updated successfully");
    setCoursesWeOfferFormData(data);
    updateLocalStorageFormData("courseSection", data);
  };

  const handleCounterFormChange = (data: IEditCounterSectionDefaultValues) => {
    toast.success("Counter section updated successfully");
    console.log("COUNTER SECTION DATA", data);
    setCounterFormData(data);
    updateLocalStorageFormData("counterSection", data);
  };

  const handleAboutUsFormChange = (data: IEditAboutUsSectionDefaultValues) => {
    toast.success("About us section updated successfully");
    setAboutUsFormData(data);
    updateLocalStorageFormData("aboutSection", data);
  };

  const handleGalleryFormChange = (data: IGallerySectionFormDefaultValues) => {
    toast.success("Gallery section updated successfully");
    setGalleryFormData(data);
    updateLocalStorageFormData("gallerySection", data);
  };

  const handleFaqFormChange = (data: IEditFaqSectionFormDefaultValues) => {
    toast.success("FAQ section updated successfully");
    setFaqFormData(data);
    updateLocalStorageFormData("faqSection", data);
  };

  const handleTestimonialsFormChange = (
    data: IEditTestimonialsFormDefaultValues
  ) => {
    toast.success("Testimonials section updated successfully");
    setTestimonialsFormData(data);
    updateLocalStorageFormData("testimonialsSection", data);
  };

  const handleContactUsFormChange = (data: string) => {
    setContactUsFormData(data);
    updateLocalStorageFormData("contactUsSection", data);
  };

  const handleInstructorPermissionsFormChange = (
    data: IInstructorPermissionsForm
  ) => {
    toast.success("Instructor permissions updated successfully");
    setInstructorPermissionsFormData(data);
    updateLocalStorageFormData("instructorPermissionsSection", data);
  };

  const handleStudentPermissionsFormChange = (
    data: IStudentPermissionsForm
  ) => {
    toast.success("Student permissions updated successfully");
    setStudentPermissionsFormData(data);
    updateLocalStorageFormData("studentPermissionsSection", data);
  };

  const isPublishable = (
    hero: any,
    courses: any[],
    counter: any,
    aboutUs: any,
    gallery: any,
    faq: IEditFaqSectionFormDefaultValues,
    testimonials: IEditTestimonialsFormDefaultValues,
    contactUs: any,
    instructorPermissions: IInstructorPermissionsForm,
    studentPermissions: IStudentPermissionsForm
  ) => {
    return (
      Object.keys(hero).length > 0 &&
      courses.length > 0 &&
      Object.keys(counter).length > 0 &&
      Object.keys(aboutUs).length > 0 &&
      Object.keys(gallery).length > 0 &&
      faq.data.length > 0 &&
      testimonials.data.length > 0 &&
      contactUs.length > 0 &&
      Object.keys(instructorPermissions).length > 0 &&
      Object.keys(studentPermissions).length > 0
    );
  };

  const handlePublishClick = () => {
    if (
      !isPublishable(
        heroFormData,
        coursesWeOfferFormData.courses,
        counterFormData,
        aboutUsFormData,
        galleryFormData,
        faqFormData,
        testimonialsFormData,
        contactUsFormData,
        instructorPermissionsFormData,
        studentPermissionsFormData
      )
    ) {
      let missingFields = [];
      if (Object.keys(heroFormData).length === 0)
        missingFields.push("Hero Section");
      if (coursesWeOfferFormData.courses.length === 0)
        missingFields.push("Courses We Offer");
      if (Object.keys(counterFormData).length === 0)
        missingFields.push("Counter Section");
      if (Object.keys(aboutUsFormData).length === 0)
        missingFields.push("About Us Section");
      if (Object.keys(galleryFormData).length === 0)
        missingFields.push("Gallery Section");
      if (faqFormData.data.length === 0) missingFields.push("FAQ Section");
      if (testimonialsFormData.data.length === 0)
        missingFields.push("Testimonials Section");
      if (contactUsFormData.length === 0)
        missingFields.push("Contact Us Section");
      toast.error(
        `Please complete the following sections:\n${missingFields.join("\n")}`
      );
    } else {
      console.log("PAYLOAD INSTITUTE EDIT: ", {
        id: institutionData?.institute.id,
        data: {
          pageContent: {
            heroSection: heroFormData,
            coursesSection: coursesWeOfferFormData,
            whyUsSection: counterFormData,
            aboutUsSection: aboutUsFormData,
            gallerySection: galleryFormData,
            faqSection: faqFormData,
            testimonialsSection: testimonialsFormData,
            contactUsSection: contactUsFormData,
          },
          instructorPermissions: instructorPermissionsFormData,
          studentPermissions: studentPermissionsFormData,
        },
      });

      editMutation.mutate({
        id: institutionData?.institute.id,
        data: {
          pageContent: {
            heroSection: heroFormData,
            coursesSection: coursesWeOfferFormData,
            whyUsSection: counterFormData,
            aboutUsSection: aboutUsFormData,
            gallerySection: galleryFormData,
            faqSection: faqFormData,
            testimonialsSection: testimonialsFormData,
            contactUsSection: contactUsFormData,
          },
          instructorPermissions: instructorPermissionsFormData,
          studentPermissions: studentPermissionsFormData,
        },
      });
    }
  };

  if (isLoading) return <Spinner loadingText="Fetching Institution Details" />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      {/* <pre>{JSON.stringify(institutionData, null, 2)}</pre> */}
      <ParentCardDashboard
        marginBottom="mb-[3.19rem]"
        heading="Edit Institute Page"
      >
        {/* All form sections */}
        <FormCardDashboard
          heading="Hero Section"
          headingTextSize="text-[1.125rem]"
          helperTooltipDescription="This section is for displaying the main banner of the website. It is a mandatory section."
          fullWidthOnMediumDevices={true}
          marginAuto={false}
        >
          <EditHeroSectionForm
            submitHandler={handleHeroFormChange}
            defaultValues={
              getLocalStorageFormData("heroSection")
                ? getLocalStorageFormData("heroSection")
                : institutionData?.institute.pageContent.heroSection
            }
          />
        </FormCardDashboard>
        <FormCardDashboard
          helperTooltipDescription="This section is for displaying the courses we offer. It is a mandatory section."
          headingTextSize="text-[1.125rem]"
          fullWidthOnMediumDevices={true}
          marginAuto={false}
          heading="Courses We Offer"
        >
          <EditCoursesWeOfferForm
            submitHandler={handleCoursesWeOfferFormChange}
            defaultValues={
              getLocalStorageFormData("coursesSection")
                ? getLocalStorageFormData("coursesSection")
                : institutionData?.institute.pageContent.coursesSection
            }
          />
        </FormCardDashboard>
        <FormCardDashboard
          helperTooltipDescription="This section is for displaying the why us section numbers. It is not a mandatory section."
          headingTextSize="text-[1.125rem]"
          fullWidthOnMediumDevices={true}
          marginAuto={false}
          heading="Counter Section"
        >
          <EditCounterForm
            defaultValues={
              getLocalStorageFormData("counterSection")
                ? getLocalStorageFormData("counterSection")
                : institutionData?.institute.pageContent.whyUsSection
            }
            submitHandler={handleCounterFormChange}
          />
        </FormCardDashboard>
        <FormCardDashboard
          helperTooltipDescription="This section is for displaying the about us section. It is not a mandatory section."
          headingTextSize="text-[1.125rem]"
          fullWidthOnMediumDevices={true}
          marginAuto={false}
          heading="About Us"
        >
          <EditAboutUsSectionForm
            defaultValues={
              getLocalStorageFormData("aboutSection")
                ? getLocalStorageFormData("aboutSection")
                : institutionData?.institute.pageContent.aboutSection
            }
            submitHandler={handleAboutUsFormChange}
          />
        </FormCardDashboard>
        <FormCardDashboard
          helperTooltipDescription="This section is for displaying the gallery section. It is not a mandatory section."
          headingTextSize="text-[1.125rem]"
          fullWidthOnMediumDevices={true}
          marginAuto={false}
          heading="Gallery Section"
        >
          <EditGallerySectionForm
            defaultValues={
              getLocalStorageFormData("gallerySection")
                ? getLocalStorageFormData("gallerySection")
                : institutionData?.institute.pageContent.gallerySection
            }
            submitHandler={handleGalleryFormChange}
          />
        </FormCardDashboard>
        <FormCardDashboard
          helperTooltipDescription="This section is for displaying the faq section. It is not a mandatory section."
          headingTextSize="text-[1.125rem]"
          fullWidthOnMediumDevices={true}
          marginAuto={false}
          heading="FAQ Section"
        >
          <EditFaqSectionForm
            defaultValues={
              getLocalStorageFormData("faqSection")
                ? getLocalStorageFormData("faqSection")
                : institutionData?.institute.pageContent.faqSection
            }
            submitHandler={handleFaqFormChange}
          />
        </FormCardDashboard>
        <FormCardDashboard
          helperTooltipDescription="This section is for displaying the testimonials section. It is not a mandatory section."
          headingTextSize="text-[1.125rem]"
          fullWidthOnMediumDevices={true}
          marginAuto={false}
          heading="Testimonials Section"
        >
          <EditTestimonialsSectionForm
            defaultValues={
              getLocalStorageFormData("testimonialsSection")
                ? getLocalStorageFormData("testimonialsSection")
                : institutionData?.institute.pageContent.testimonialsSection
            }
            submitHandler={handleTestimonialsFormChange}
          />
        </FormCardDashboard>
        <FormCardDashboard
          helperTooltipDescription="This section is for displaying the contact us section. It is not a mandatory section."
          headingTextSize="text-[1.125rem]"
          fullWidthOnMediumDevices={true}
          marginAuto={false}
          heading="Contact Us Section"
        >
          <EditContactUsSectionForm
            defaultValue={
              getLocalStorageFormData("contactEmail")
                ? getLocalStorageFormData("contactEmail")
                : institutionData?.institute.pageContent.contactEmail
            }
            submitHandler={handleContactUsFormChange}
          />
        </FormCardDashboard>
        <FormCardDashboard
          helperTooltipDescription="This section is for displaying the instructor permissions. It is not a mandatory section."
          headingTextSize="text-[1.125rem]"
          fullWidthOnMediumDevices={true}
          marginAuto={false}
          heading="Instructor Permissions (For All Instructors)"
        >
          <InstructorPermissionsForm
            defaultValues={
              getLocalStorageFormData("instructorPermissions")
                ? getLocalStorageFormData("instructorPermissions")
                : institutionData?.institute.instructorPermissions
            }
            submitHandler={handleInstructorPermissionsFormChange}
          />
        </FormCardDashboard>
        <FormCardDashboard
          helperTooltipDescription="This section is for displaying thestudent permissions. It is not a mandatory section."
          headingTextSize="text-[1.125rem]"
          fullWidthOnMediumDevices={true}
          marginAuto={false}
          heading="Student Permissions (For All Students)"
        >
          <StudentPermissionsForm
            defaultValues={
              getLocalStorageFormData("studentPermissions")
                ? getLocalStorageFormData("studentPermissions")
                : institutionData?.institute.studentPermissions
            }
            submitHandler={handleStudentPermissionsFormChange}
          />
        </FormCardDashboard>
        <div className="flex justify-center pb-[4.5rem]">
          <Button
            className="w-[12.125rem] h-[3.9375rem]"
            btnColor="purple"
            onClick={handlePublishClick}
          >
            Publish
          </Button>
        </div>
      </ParentCardDashboard>
      <ScrollToTop
        smooth
        style={{
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
        component={
          <IoArrowUpCircleOutline className="text-2xl text-app-purple hover:scale-[200%] transition ease-in-out duration-300 absolute right-0" />
        }
      />
    </div>
  );
};

export default EditInstitutionPage;
