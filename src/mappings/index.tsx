import { PATHS } from "@/constants";
import Image from "next/image";
import {
  IAvatarMappingObj,
  IAccordianMappingObj,
  BarChartData,
  ICourses,
  IBrowseByExamSectionList,
  INavLink,
  ITestimonialProps,
} from "@/types";
import { nanoid } from "nanoid";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/custom/collapsible";

// icons for dashboard sidebar
import OverviewIcon from "@/assets/icons/dashboard_sidebar_overview_icon.svg";
import CreateNewCoursesIcon from "@/assets/icons/plus_icon.svg";
import AddRemoveInstructorIcon from "@/assets/icons/add_remove_instructor_icon.svg";
import EditInstitutePageIcon from "@/assets/icons/edit_institute_page_icon.svg";
import LogoutIcon from "@/assets/icons/logout_icon.svg";
import { createColumnHelper } from "@tanstack/react-table";
import EditIcon from "@/assets/icons/table_edit_icon.svg";
import UserIcon from "@/assets/icons/table_user_icon.svg";
import InstructorIcon from "@/assets/icons/table_instructor_icon.svg";
// light icon for sidebar
import OverviewIconLight from "@/assets/icons/overview_icon_light.svg";
import CreateNewCourseIconLight from "@/assets/icons/create_new_course_icon_light.svg";
import AddRemoveInstructorIconLight from "@/assets/icons/add_remove_instructor_icon_light.svg";
import EditInstitutePageIconLight from "@/assets/icons/edit_institution_icon_light.svg";
import { PiFacebookLogoBold } from "react-icons/pi";
import { TbLayoutBottombarCollapse } from "react-icons/tb";
import { FaInstagram, FaLinkedin } from "react-icons/fa6";
import KuizzoLogoWhite from "../../public/kuizzo-logo-svg.svg";
import { FaXTwitter } from "react-icons/fa6";
// browse by exams home page mappings icons
import ChessKingIcon from "@/assets/icons/chess_king_icon.svg";
import SwordIcon from "@/assets/icons/sword_icon.svg";
import HelmetIcon from "@/assets/icons/helmet_icon.svg";
import { getCurrentYear } from "@/utils";

// institution details
export const mobileNavLinks: INavLink[] = [
  {
    name: "Website",
    popup: [
      {
        popupTitle: "Home",
        link: PATHS.homePage,
      },
      {
        popupTitle: "Institution",
        link: PATHS.institutionHomePage,
      },
      {
        popupTitle: "Blog",
        link: PATHS.blogPage,
      },
      {
        popupTitle: "Pricing",
        link: PATHS.pricing,
      },
      // {
      //   popupTitle: "About Us",
      //   link: PATHS.aboutUsPage,
      // },
      {
        popupTitle: "Contact Us",
        link: PATHS.contactUsPage,
      },
    ],
  },
  {
    name: "Dashboard",
    popup: [
      {
        popupTitle: "Create New Courses",
        link: PATHS.createNewCourses,
      },
      {
        popupTitle: "Course List",
        link: PATHS.courseList,
      },
      {
        popupTitle: "Add/Remove Students",
        link: PATHS.studentManager,
      },
      {
        popupTitle: "Add/Remove Instructors",
        link: PATHS.instructorManager,
      },
      {
        popupTitle: "Create Quiz",
        link: PATHS.quizGenerator,
      },
      {
        popupTitle: "Quiz List",
        link: PATHS.quizList,
      },
      {
        popupTitle: "Create Exam",
        link: PATHS.examGenerator,
      },

      {
        popupTitle: "Create Questions",
        link: PATHS.createQuestions,
      },
      {
        popupTitle: "Edit Institution",
        link: PATHS.editInstitution,
      },
    ],
  },
];

export const desktopNavLinks = [
  {
    name: "Home",
    href: PATHS.homePage,
  },
  {
    name: "Institution",
    href: PATHS.institutionHomePage,
  },
  {
    name: "Blog",
    href: PATHS.blogPage,
  },
  {
    name: "Explore",
    href: PATHS.exploreCourses,
  },
  {
    name: "Exams",
    href: PATHS.examGenerator,
  },

  // {
  //   name: "Pricing",
  //   href: PATHS.pricing,
  // },
  // {
  //   name: "About Us",
  //   href: PATHS.aboutUsPage,
  // },
  {
    name: "Contact Us",
    href: PATHS.contactUsPage,
  },
];

// its used for all instances of accordian throughout the app, need to change the data in future specific to the section in which accordian is used
export const accordianData: IAccordianMappingObj[] = [
  {
    id: nanoid(),
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.",
  },
  {
    id: nanoid(),
    question:
      "Ut et massa mi. Aliquam in hendrerit Pellentesque sit amet sapien fringilla",
    answer:
      "Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante ",
  },
  {
    id: nanoid(),
    question:
      "Ut et massa mi. Aliquam in hendrerit Pellentesque sit amet sapien fringilla",
    answer:
      "Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante ",
  },
  {
    id: nanoid(),
    question:
      "Ut et massa mi. Aliquam in hendrerit Pellentesque sit amet sapien fringilla",
    answer:
      "Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante ",
  },
];

// its used for all instances of student pricing table throughout the app
export const studentPricing = [
  {
    title: "Basic Plan",
    subTitle: "Basic plan for student",
    price: "Free",
    redirectLink: "/login",
    perks: [
      {
        perkOption: true,
        perkDescription: "Standard Note Creation",
      },
      {
        perkOption: "Unlimited",
        perkDescription: "Course Creation",
      },
      {
        perkOption: "Unlimited",
        perkDescription: "Exam/Quiz Creation",
      },

      {
        perkOption: true,
        perkDescription: "Ad-supported",
      },
      {
        perkOption: false,
        perkDescription: "Advanced Quizzes",
      },
      {
        perkOption: false,
        perkDescription: "Content Download(PDF)",
      },
      {
        perkOption: false,
        perkDescription: "Offline Access",
      },
      {
        perkOption: false,
        perkDescription: "AI Analysis",
      },
      {
        perkOption: false,
        perkDescription: "Priority Support",
      },
    ],
  },

  {
    title: "Plus Plan",
    subTitle: "Plus Plan for student",
    price: 10,
    redirectLink: "/login",
    perks: [
      {
        perkOption: true,
        perkDescription: "Standard Note Creation",
      },
      {
        perkOption: "Unlimited",
        perkDescription: "Course Creation",
      },
      {
        perkOption: "Unlimited",
        perkDescription: "Exam/Quiz Creation",
      },
      {
        perkOption: "50 questions",
        perkDescription: "Quiz Limit",
      },
      {
        perkOption: false,
        perkDescription: "Ad-supported",
      },
      {
        perkOption: true,
        perkDescription: "Advanced Quizzes",
      },
      {
        perkOption: true,
        perkDescription: "Content Download(PDF)",
      },
      {
        perkOption: true,
        perkDescription: "Offline Access",
      },
      {
        perkOption: false,
        perkDescription: "AI Analysis",
      },
      {
        perkOption: false,
        perkDescription: "Priority Support",
      },
    ],
  },
  {
    title: "Premium Plan",
    subTitle: "Premium Plan for student",
    price: 50,
    redirectLink: "/login",
    perks: [
      {
        perkOption: true,
        perkDescription: "Standard Note Creation",
      },
      {
        perkOption: "Unlimited",
        perkDescription: "No.of Courses",
      },
      {
        perkOption: "Unlimited",
        perkDescription: "No. of Exams",
      },
      {
        perkOption: "Same as Plus Plan",
        perkDescription: "Quiz Limit",
      },
      {
        perkOption: false,
        perkDescription: "Ad-supported",
      },
      {
        perkOption: true,
        perkDescription: "Advanced Quizzes",
      },
      {
        perkOption: true,
        perkDescription: "Content Download(PDF)",
      },
      {
        perkOption: true,
        perkDescription: "Offline Access",
      },
      {
        perkOption: true,
        perkDescription: "AI Analysis",
      },
      {
        perkOption: true,
        perkDescription: "Priority Support",
      },
    ],
  },
];
// its used for all instances of instructor pricing table throughout the app
export const instructorPricing = [
  {
    title: "Basic Plan",
    subTitle: "Basic Plan for Instructor",
    price: "Free",
    redirectLink: "/login",
    perks: [
      {
        perkOption: "5",
        perkDescription: "No. of Students",
      },
      {
        perkOption: "Unlimited",
        perkDescription: "No. of Exams",
      },
      {
        perkOption: "Unlimited",
        perkDescription: "No. of Courses",
      },
      {
        perkOption: "None",
        perkDescription: "No. of Ads",
      },
      {
        perkOption: false,
        perkDescription: "Trial Period",
      },
    ],
  },
  {
    title: "Plus Plan",
    subTitle: "Plus Plan for Instructor",
    price: "50",
    redirectLink: "/login",
    perks: [
      {
        perkOption: "100",
        perkDescription: "No. of Students",
      },
      {
        perkOption: "Unlimited",
        perkDescription: "No. of Exams",
      },
      {
        perkOption: "Unlimited",
        perkDescription: "No. of Courses",
      },
      {
        perkOption: "20 Pics",
        perkDescription: "No. of Ads",
      },
      {
        perkOption: true,
        perkDescription: "Trial Period",
      },
    ],
  },
  {
    title: "Premium Plan",
    subTitle: "Premium Plan for Instructor",
    price: "250",
    redirectLink: "/login",
    perks: [
      {
        perkOption: "1000",
        perkDescription: "No. of Students",
      },
      {
        perkOption: "Unlimited",
        perkDescription: "No. of Exams",
      },
      {
        perkOption: "Unlimited",
        perkDescription: "No. of Courses",
      },
      {
        perkOption: "100 Pics",
        perkDescription: "No. of Ads",
      },
      {
        perkOption: false,
        perkDescription: "Trial Period",
      },
    ],
  },
];
// its used for all instances of institution pricing table throughout the app
export const institutionPricing = [
  {
    title: "Basic Plan",
    subTitle: "Basic Plan for institution",
    price: "Free",
    redirectLink: "/login",
    perks: [
      {
        perkOption: "kuizzo.com/institution",
        perkDescription: "Domain Name",
      },
      {
        perkOption: "100",
        perkDescription: "No. of Students",
      },
      {
        perkOption: "Unlimited",
        perkDescription: "No. of Exams",
      },
      {
        perkOption: "Unlimited",
        perkDescription: "No. of Courses",
      },
      {
        perkOption: "None",
        perkDescription: "No. of Ads",
      },
      {
        perkOption: true,
        perkDescription: "Trial Period",
      },
    ],
  },
  {
    title: "Plus Plan",
    subTitle: "Plus Plan for institution",
    price: "300",
    redirectLink: "/login",
    perks: [
      {
        perkOption: "kuizzo.com/institution",
        perkDescription: "Domain Name",
      },
      {
        perkOption: "1000",
        perkDescription: "No. of Students",
      },
      {
        perkOption: "Unlimited",
        perkDescription: "No. of Exams",
      },
      {
        perkOption: "Unlimited",
        perkDescription: "No. of Courses",
      },
      {
        perkOption: "20 pics",
        perkDescription: "No. of Ads",
      },
      {
        perkOption: false,
        perkDescription: "Trial Period",
      },
    ],
  },
  {
    title: "Premium Plan",
    subTitle: "Premium Plan for institution",
    price: "500",
    redirectLink: "/login",
    perks: [
      {
        perkOption: "Institution url",
        perkDescription: "Domain Name",
      },
      {
        perkOption: "based on the plan",
        perkDescription: "No. of Students",
      },
      {
        perkOption: "Unlimited",
        perkDescription: "No. of Exams",
      },
      {
        perkOption: "Unlimited",
        perkDescription: "No. of Courses",
      },
      {
        perkOption: "Unlimited",
        perkDescription: "No. of Ads",
      },
      {
        perkOption: false,
        perkDescription: "Trial Period",
      },
    ],
  },
];

export const avatarsData: IAvatarMappingObj[] = [
  {
    image:
      "https://images.pexels.com/photos/459403/pexels-photo-459403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "User 1",
    size: "large",
  },
  {
    image:
      "https://images.pexels.com/photos/2235130/pexels-photo-2235130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "User 2",
    size: "large",
  },
  {
    image:
      "https://images.pexels.com/photos/1337380/pexels-photo-1337380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "User 3",
    size: "large",
  },
  {
    image:
      "https://images.pexels.com/photos/1337386/pexels-photo-1337386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "User 4",
    size: "large",
  },
];

export const aboutUsImages: string[] = [
  "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

export const successStoryImages: string[] = [
  "https://images.pexels.com/photos/459403/pexels-photo-459403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/267491/pexels-photo-267491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/68761/pexels-photo-68761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];
// testimonial data for home page and institution testimonials section
export const testimonialsData = [
  {
    imageUrl:
      "https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg",
    title: "Janhavi Patil, 11th",
    testimonial: `Education in the field of Commerce has acclaimed worldwide recognition
          after economic reforms.  The Scope of Commerce stream has
          significantly increased in last few years. The awareness about
          Professional Courses in Commerce has also grown up which is a good `,
    ratings: 4,
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg",
    title: "Janhavi Patil, 11th",
    testimonial: `Education in the field of Commerce has acclaimed worldwide recognition
          after economic reforms.  The Scope of Commerce stream has
          significantly increased in last few years. The awareness about
          Professional Courses in Commerce has also grown up which is a good `,
    ratings: 2.5,
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg",
    title: "Janhavi Patil, 11th",
    testimonial: `Education in the field of Commerce has acclaimed worldwide recognition
          after economic reforms.  The Scope of Commerce stream has
          significantly increased in last few years. The awareness about
          Professional Courses in Commerce has also grown up which is a good `,
    ratings: 4.5,
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg",
    title: "Janhavi Patil, 11th",
    testimonial: `Education in the field of Commerce has acclaimed worldwide recognition
          after economic reforms.  The Scope of Commerce stream has
          significantly increased in last few years. The awareness about
          Professional Courses in Commerce has also grown up which is a good `,
    ratings: 2.5,
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg",
    title: "Janhavi Patil, 11th",
    testimonial: `Education in the field of Commerce has acclaimed worldwide recognition
          after economic reforms.  The Scope of Commerce stream has
          significantly increased in last few years. The awareness about
          Professional Courses in Commerce has also grown up which is a good `,
    ratings: 5,
  },
];

// institution dashboard sidebar mapping
export const institutionSidebarLinks = [
  {
    text: "Overview",
    link: PATHS.institutionDashboardOverview,
    image: OverviewIconLight,
    darkImage: OverviewIcon,
  },
  {
    text: "Create New Course",
    link: PATHS.createNewCourses,
    image: CreateNewCourseIconLight,
    darkImage: CreateNewCoursesIcon,
  },
  {
    text: "Students Manager",
    link: PATHS.studentManager,
    image: AddRemoveInstructorIconLight,
    darkImage: AddRemoveInstructorIcon,
  },
  {
    text: "Instructors Manager",
    link: PATHS.instructorManager,
    image: AddRemoveInstructorIconLight,
    darkImage: AddRemoveInstructorIcon,
  },
  {
    text: "Students List",
    link: PATHS.studentList,
    image: OverviewIconLight,
    darkImage: CreateNewCoursesIcon,
  },
  {
    text: "Instructors List",
    link: PATHS.instructorList,
    image: OverviewIconLight,
    darkImage: CreateNewCoursesIcon,
  },
  {
    text: "Course List",
    link: PATHS.courseList,
    image: OverviewIconLight,
    darkImage: CreateNewCoursesIcon,
  },
  {
    text: "Questions",
    link: PATHS.createQuestions,
    image: OverviewIconLight,
    darkImage: CreateNewCoursesIcon,
  },
  {
    text: "Quiz Generator",
    link: PATHS.quizGenerator,
    image: OverviewIconLight,
    darkImage: CreateNewCoursesIcon,
  },

  {
    text: "Exam Generator",
    link: PATHS.examGenerator,
    image: OverviewIconLight,
    darkImage: CreateNewCoursesIcon,
  },
  {
    text: "Quiz and Exam List",
    link: PATHS.quizAndExamList,
    image: OverviewIconLight,
    darkImage: CreateNewCoursesIcon,
  },
  {
    text: "Edit Institution Page",
    link: PATHS.editInstitution,
    image: EditInstitutePageIconLight,
    darkImage: EditInstitutePageIcon,
  },
  {
    text: "Logout",
    link: "/logout",
    image: LogoutIcon,
    darkImage: OverviewIcon,
    noBorder: true,
  },
];

export const instructorSidebarLinks = [
  {
    text: "Overview",
    link: "/instructor-dashboard",
    image: OverviewIconLight,
    darkImage: OverviewIcon,
  },
  {
    text: "My Courses",
    link: PATHS.instructorMyCourses,
    image: OverviewIconLight,
    darkImage: OverviewIcon,
  },
  {
    text: "Quiz",
    link: PATHS.instructorQuizGenerator,
    image: OverviewIconLight,
    darkImage: OverviewIcon,
  },
  {
    text: "Exam",
    link: PATHS.instructorExamGenerator,
    image: OverviewIconLight,
    darkImage: OverviewIcon,
  },
  {
    text: "Add/Remove Students",
    link: PATHS.instructorstudentManager,
    image: OverviewIconLight,
    darkImage: OverviewIcon,
  },
  {
    text: "Students List",
    link: "/student-list",
    image: OverviewIconLight,
    darkImage: OverviewIcon,
  },
  {
    text: "Create New Course",
    link: "/create-new-courses",
    image: OverviewIconLight,
    darkImage: OverviewIcon,
  },
  {
    text: "Logout",
    link: "/logout",
    image: OverviewIconLight,
    darkImage: OverviewIcon,
    noBorder: true,
  },
];

export const studentSidebarLinks = [
  {
    text: "Create New",
    link: "/",
    image: OverviewIconLight,
    darkImage: OverviewIcon,
  },
  {
    text: "Testing Page",
    link: PATHS.studentTestAnalyitcs,
    image: OverviewIconLight,
    darkImage: OverviewIcon,
  },
  {
    text: "Questions List",
    link: PATHS.studentQuestionsPage,
    image: OverviewIconLight,
    darkImage: OverviewIcon,
  },
  {
    text: "Select Multiple",
    link: "/select-multiple",
    image: OverviewIconLight,
    darkImage: OverviewIcon,
  },
  {
    text: "Last Updated",
    link: "/last-updated",
    image: OverviewIconLight,
    darkImage: OverviewIcon,
  },
  {
    text: "Sort",
    link: "/sort",
    image: OverviewIconLight,
    darkImage: OverviewIcon,
  },
  {
    text: "Favourite",
    link: "/favourite",
    image: OverviewIconLight,
    darkImage: OverviewIcon,
  },
  {
    text: "Logout",
    link: "/logout",
    image: OverviewIconLight,
    darkImage: OverviewIcon,
    noBorder: true,
  },
];

// average grade barchart data

export const averageGradeBarChartData: BarChartData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "A-B",
      data: [40, 30, 20, 48, 60, 10, 44, 76, 43, 31, 19, 20],
      backgroundColor: "rgba(194, 194, 255, 0.7)",
      borderColor: "rgba(194, 194, 255, 1)",
      borderWidth: 1,
      stack: "stack1",
      hidden: true,
    },
    {
      label: "C-D",
      data: [25, 29, 30, 31, 26, 25, 20, 20, 10, 5, 20, 10],
      backgroundColor: "rgb(255, 166, 0)",
      borderColor: "rgba(255, 166, 0, 1)",
      borderWidth: 1,
      stack: "stack1",
      hidden: true,
    },
    {
      label: "F",
      data: [0, 12, 55, 32, 12, 40, 20, 20, 10, 5, 20, 10],
      backgroundColor: "rgba(255, 86, 48, 1)",
      borderColor: "rgba(255, 86, 48, 1)",
      borderWidth: 1,
      stack: "stack1",
      hidden: false,
    },
  ],
};

export const performanceMetricsBarChartData: BarChartData = {
  labels: ["A+", "A", "B", "C", "D", "F"],
  datasets: [
    {
      label: "Grade",
      data: [25, 25, 25, 25, 25, 25],
      backgroundColor: "rgba(194, 194, 255,1)",
      borderColor: "rgba(194, 194, 255, 1)",
      borderWidth: 1,
      stack: "stack1",
      hidden: true,
      borderRadius: 100,
    },
    {
      label: "Students",
      data: [14, 18, 13, 21, 8, 12],
      backgroundColor: "rgb(175, 164, 240, 0.7)",
      borderColor: "rgba(175, 164, 240,1)",
      borderWidth: 0,
      stack: "stack1",
      hidden: false,
      borderRadius: 100,
    },
  ],
};

// Courses we offer mappnig for kuizzo  details
export const coursesWeOfferListStatic: ICourses[] = [
  {
    id: "218qew9fiudhcj",
    imageUrl: "https://via.placeholder.com/150",
    totalStars: 2,
    title: "Wade Warren",
    description: "this is a description",
  },
  {
    id: "2143w54eyrthgrfd",
    imageUrl: "https://via.placeholder.com/150",
    totalStars: 2,
    title: "Marry Smith",
    description: "this is a description",
  },
  {
    id: "23w4terfsdzd32qw",
    imageUrl: "https://via.placeholder.com/150",
    totalStars: 2,
    title: "John Doe",
    description: "this is a description",
  },
  {
    id: "45rt243we23rwffsdf",
    imageUrl: "https://via.placeholder.com/150",
    totalStars: 2,
    title: "John Doe",
    description: "this is a description",
  },
];

export const instructorTableDummyData = [
  {
    instructorName: "Dr. Alice Smith",
    userName: "alice123",
    email: "alice.smith@example.com",
    course: "Introduction to Programming",
    id: 1,
  },
  {
    instructorName: "Prof. Bob Johnson",
    userName: "bob.johnson",
    email: "bob.johnson@example.com",
    course: "Advanced JavaScript",
    id: 2,
  },
  {
    instructorName: "Dr. Carol Williams",
    userName: "carol.williams",
    email: "carol.williams@example.com",
    course: "Data Structures and Algorithms",
    id: 3,
  },
  {
    instructorName: "Prof. Dave Brown",
    userName: "dave.brown",
    email: "dave.brown@example.com",
    course: "Web Development Fundamentals",
    id: 4,
  },
  {
    instructorName: "Dr. Eve Davis",
    userName: "eve.davis",
    email: "eve.davis@example.com",
    course: "Machine Learning Basics",
    id: 5,
  },
  {
    instructorName: "Prof. Frank Miller",
    userName: "frank.miller",
    email: "frank.miller@example.com",
    course: "Database Management",
    id: 6,
  },
  {
    instructorName: "Dr. Grace Wilson",
    userName: "grace.wilson",
    email: "grace.wilson@example.com",
    course: "Cybersecurity Essentials",
    id: 7,
  },
  {
    instructorName: "Prof. Henry Moore",
    userName: "henry.moore",
    email: "henry.moore@example.com",
    course: "Front-End Development",
    id: 8,
  },
  {
    instructorName: "Dr. Ivy Taylor",
    userName: "ivy.taylor",
    email: "ivy.taylor@example.com",
    course: "Back-End Development",
    id: 9,
  },
  {
    instructorName: "Prof. Jack Anderson",
    userName: "jack.anderson",
    email: "jack.anderson@example.com",
    course: "Cloud Computing",
    id: 10,
  },
  {
    instructorName: "Dr. Kim Thomas",
    userName: "kim.thomas",
    email: "kim.thomas@example.com",
    course: "Software Engineering",
    id: 11,
  },
  {
    instructorName: "Prof. Leo Jackson",
    userName: "leo.jackson",
    email: "leo.jackson@example.com",
    course: "Data Science",
    id: 12,
  },
  {
    instructorName: "Dr. Mia Harris",
    userName: "mia.harris",
    email: "mia.harris@example.com",
    course: "Human-Computer Interaction",
    id: 13,
  },
  {
    instructorName: "Prof. Nate Martin",
    userName: "nate.martin",
    email: "nate.martin@example.com",
    course: "Network Security",
    id: 14,
  },
  {
    instructorName: "Dr. Olivia Lewis",
    userName: "olivia.lewis",
    email: "olivia.lewis@example.com",
    course: "Artificial Intelligence",
    id: 15,
  },
  {
    instructorName: "Prof. Paul Walker",
    userName: "paul.walker",
    email: "paul.walker@example.com",
    course: "Game Development",
    id: 16,
  },
  {
    instructorName: "Dr. Quinn Young",
    userName: "quinn.young",
    email: "quinn.young@example.com",
    course: "Systems Programming",
    id: 17,
  },
  {
    instructorName: "Prof. Rachel King",
    userName: "rachel.king",
    email: "rachel.king@example.com",
    course: "DevOps Fundamentals",
    id: 18,
  },
  {
    instructorName: "Dr. Steve Scott",
    userName: "steve.scott",
    email: "steve.scott@example.com",
    course: "Mobile App Development",
    id: 19,
  },
  {
    instructorName: "Prof. Tina Adams",
    userName: "tina.adams",
    email: "tina.adams@example.com",
    course: "Software Testing",
    id: 20,
  },
];

export const studentTableDummyData = [
  {
    studentName: "Alice Smith",
    userName: "alice123",
    email: "alice.smith@example.com",
    course: "Introduction to Programming",
    id: 1,
    instructor: "Dr John Doe",
  },
  {
    studentName: "Bob Johnson",
    userName: "bob.johnson",
    email: "bob.johnson@example.com",
    course: "Data Structures and Algorithms",
    id: 2,
    instructor: "Prof. Sarah Lee",
  },
  {
    studentName: "Carol Williams",
    userName: "carol.williams",
    email: "carol.williams@example.com",
    course: "Web Development Fundamentals",
    id: 3,
    instructor: "Dr. Emily Davis",
  },
  {
    studentName: "David Brown",
    userName: "david.brown",
    email: "david.brown@example.com",
    course: "Machine Learning Basics",
    id: 4,
    instructor: "Prof. Michael Scott",
  },
  {
    studentName: "Eve Davis",
    userName: "eve.davis",
    email: "eve.davis@example.com",
    course: "Advanced JavaScript",
    id: 5,
    instructor: "Dr. Laura Adams",
  },
  {
    studentName: "Frank Miller",
    userName: "frank.miller",
    email: "frank.miller@example.com",
    course: "Database Management",
    id: 6,
    instructor: "Prof. William Smith",
  },
  {
    studentName: "Grace Wilson",
    userName: "grace.wilson",
    email: "grace.wilson@example.com",
    course: "Cybersecurity Essentials",
    id: 7,
    instructor: "Dr. Olivia Martinez",
  },
  {
    studentName: "Henry Moore",
    userName: "henry.moore",
    email: "henry.moore@example.com",
    course: "Cloud Computing",
    id: 8,
    instructor: "Prof. James Brown",
  },
  {
    studentName: "Ivy Taylor",
    userName: "ivy.taylor",
    email: "ivy.taylor@example.com",
    course: "Software Engineering",
    id: 9,
    instructor: "Dr. Daniel Garcia",
  },
  {
    studentName: "Jack Anderson",
    userName: "jack.anderson",
    email: "jack.anderson@example.com",
    course: "Data Science",
    id: 10,
    instructor: "Prof. Emma Wilson",
  },
  {
    studentName: "Kim Thomas",
    userName: "kim.thomas",
    email: "kim.thomas@example.com",
    course: "Human-Computer Interaction",
    id: 11,
    instructor: "Dr. Joshua Lee",
  },
  {
    studentName: "Leo Jackson",
    userName: "leo.jackson",
    email: "leo.jackson@example.com",
    course: "Network Security",
    id: 12,
    instructor: "Prof. Sophia Clark",
  },
  {
    studentName: "Mia Harris",
    userName: "mia.harris",
    email: "mia.harris@example.com",
    course: "Artificial Intelligence",
    id: 13,
    instructor: "Dr. Ethan White",
  },
  {
    studentName: "Nate Martin",
    userName: "nate.martin",
    email: "nate.martin@example.com",
    course: "Mobile App Development",
    id: 14,
    instructor: "Prof. Isabella Lewis",
  },
  {
    studentName: "Olivia Lewis",
    userName: "olivia.lewis",
    email: "olivia.lewis@example.com",
    course: "Game Development",
    id: 15,
    instructor: "Dr. Mason Walker",
  },
  {
    studentName: "Paul Walker",
    userName: "paul.walker",
    email: "paul.walker@example.com",
    course: "Systems Programming",
    id: 16,
    instructor: "Prof. Ava Scott",
  },
  {
    studentName: "Quinn Young",
    userName: "quinn.young",
    email: "quinn.young@example.com",
    course: "DevOps Fundamentals",
    id: 17,
    instructor: "Dr. Mia Harris",
  },
  {
    studentName: "Rachel King",
    userName: "rachel.king",
    email: "rachel.king@example.com",
    course: "Software Testing",
    id: 18,
    instructor: "Prof. Jacob Thomas",
  },
  {
    studentName: "Steve Scott",
    userName: "steve.scott",
    email: "steve.scott@example.com",
    course: "Introduction to Programming",
    id: 19,
    instructor: "Dr. Emily Davis",
  },
  {
    studentName: "Tina Adams",
    userName: "tina.adams",
    email: "tina.adams@example.com",
    course: "Advanced JavaScript",
    id: 20,
    instructor: "Prof. John Doe",
  },
];

const columnHelper = createColumnHelper<any>();

export const instructorTableColumns = [
  columnHelper.accessor("title", {
    cell: (info) => (
      <>
        <Image src={UserIcon} alt="edit-icon" />
        <p className="text-xs">{info.getValue()}</p>
      </>
    ),
    header: () => <span>Instructor Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.username, {
    id: "username",
    cell: (info) => (
      <>
        <Image src={EditIcon} alt="edit-icon" />
        <p className="text-xs">{info.getValue()}</p>
      </>
    ),
    header: () => <span>User Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.email, {
    id: "email",
    cell: (info) => <p className="text-xs">{info.getValue()}</p>,
    header: () => <span>Email</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.courseName, {
    id: "courseName",
    cell: (info) => <p className="text-xs">{info.getValue()}</p>,
    header: () => <span>Course</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.verified, {
    id: "verified",
    cell: (info) => <p className="text-xs">{String(info.getValue())}</p>,
    header: () => <span>Verified</span>,
    footer: (info) => info.column.id,
  }),
];

export const studentTableColumns = [
  columnHelper.accessor("title", {
    cell: (info) => (
      <>
        {/* <Image src={UserIcon} alt="edit-icon" /> */}
        <p className="text-xs">{info.getValue()}</p>
      </>
    ),
    header: () => <span>Student Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.username, {
    id: "username",
    cell: (info) => (
      <>
        {/* <Image src={EditIcon} alt="edit-icon" /> */}
        <p className="text-xs">{info.getValue()}</p>
      </>
    ),
    header: () => <span>User Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.email, {
    id: "email",
    cell: (info) => <p className="text-xs ">{info.getValue()}</p>,
    header: () => <span>Email</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.courseName, {
    id: "courseName",
    cell: (info) => <p className="text-xs">{info.getValue()}</p>,
    header: () => <span>Course</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.instructorName, {
    id: "instructorName",
    cell: (info) => <p className="text-xs">{info.getValue()}</p>,
    header: () => <span>Instructor</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.verified, {
    id: "verified",
    cell: (info) => <p className="text-xs">{String(info.getValue())}</p>,
    header: () => <span>Verified</span>,
    footer: (info) => info.column.id,
  }),
];

// questions table column mapping
export const quetionsListColumnMapping = [
  columnHelper.accessor("question", {
    cell: (info) => (
      <>
        <p className="text-xs">{info.getValue()}</p>
      </>
    ),
    header: () => <span>Question</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("type", {
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <span>Type</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("correctAnswer", {
    cell: (info) => (
      <>
        <p>
          {" "}
          {info.getValue() ? (
            info.getValue()
          ) : (
            <span className="text-app-purple">Not Applicable</span>
          )}
        </p>
      </>
    ),
    header: () => <span>Correct Answer</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("options", {
    cell: (info) => (
      <div>
        {info.getValue() ? (
          <div className="flex flex-col">
            <Collapsible>
              <CollapsibleTrigger>
                <p className="flex items-center text-bold justify-between gap-[1rem]">
                  <span className="text-sm font-extrabold">Show Options</span>
                  <TbLayoutBottombarCollapse className="text-app-green" />
                </p>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {info
                  .getValue()
                  .split(",")
                  .map((option: string, index: number) => (
                    <p
                      onClick={() =>
                        console.log(
                          "CORRECT OPTION: ",
                          info.cell
                            .getContext()
                            .row.original.correctAnswer.split(" ")[1],
                          "INDEX: ",
                          String(index + 1)
                        )
                      }
                      className={`flex justify-between ${
                        info.cell
                          .getContext()
                          .row.original.correctAnswer.split(" ")[1] ===
                        String(index + 1)
                          ? "text-app-green"
                          : ""
                      }`}
                      key={nanoid()}
                    >
                      <span>{index + 1}:</span> <span>{option}</span>
                    </p>
                  ))}
              </CollapsibleContent>
            </Collapsible>
          </div>
        ) : (
          <span className="text-app-purple">Not Applicable</span>
        )}
      </div>
    ),
    header: () => <span>Options</span>,
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("keywords", {
    cell: (info) => (
      <div>
        {info.getValue() ? (
          <div className="flex flex-col overflow-x-scroll">
            <Collapsible>
              <CollapsibleTrigger>
                <p className="flex items-center justify-between gap-[1rem]">
                  <span className="font-extrabold text-sm"> Show Keywords</span>
                  <TbLayoutBottombarCollapse className="text-app-green" />
                </p>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {info
                  .getValue()
                  .split(",")
                  .map((option: string, index: number) => (
                    <p className="flex justify-between" key={nanoid()}>
                      <span>{index + 1}:</span> <span>{option}</span>
                    </p>
                  ))}
              </CollapsibleContent>
            </Collapsible>
          </div>
        ) : (
          <span className="text-app-purple">Not Applicable</span>
        )}
      </div>
    ),
    header: () => <span>Key Words</span>,
    footer: (info) => info.column.id,
  }),
];

export const studentExamColumnMapping = [
  columnHelper.accessor("examName", {
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <span>Exam Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("examTime", {
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <span>Exam Time</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("examDate", {
    cell: (info) => <p>{info.getValue().startDate}</p>,
    header: () => <span>Exam Start Date</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("examDate", {
    cell: (info) => <p>{info.getValue().endDate}</p>,
    header: () => <span>Exam End Date</span>,
    footer: (info) => info.column.id,
  }),
];

export const studentQuizColumnMapping = [
  columnHelper.accessor("quizName", {
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <span>Quiz Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("numberOfQuestions", {
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <span>Questions Count</span>,
    footer: (info) => info.column.id,
  }),
];

// exam list columns mapping
export const examColumnMapping = [
  columnHelper.accessor("examName", {
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <span>Exam Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("course", {
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <span>Course Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("subject", {
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <span>Subject Name</span>,
    footer: (info) => info.column.id,
  }),
  // not needed
  // columnHelper.accessor("topic", {
  //   cell: (info) => <p>{info.getValue()}</p>,
  //   header: () => <span>Topic Name</span>,
  //   footer: (info) => info.column.id,
  // }),
];

// quiz table columns mapping
export const quizColumnMapping = [
  columnHelper.accessor("quizName", {
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <span>Quiz Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("course", {
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <span>Course Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("subject", {
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <span>Subject Name</span>,
    footer: (info) => info.column.id,
  }),
  // columnHelper.accessor("topic", {
  //   cell: (info) => <p>{info.getValue()}</p>,
  //   header: () => <span>Topic Name</span>,
  //   footer: (info) => info.column.id,
  // }),
];

export const coursesListColumnMapping = [
  columnHelper.accessor("courseName", {
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <span>Course Name</span>,
  }),
  columnHelper.accessor("instructorName", {
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <span>Instructor Name</span>,
  }),
  columnHelper.accessor("studentCount", {
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <span>Students Count</span>,
  }),
];

export const instructorListDataMapping = [
  {
    studentName: "Alice Johnson",
    courseTitle: "Mathematics",
    instructorName: "Dr. Smith",
  },
  {
    studentName: "Bob Brown",
    courseTitle: "Physics",
    instructorName: "Dr. Taylor",
  },
  {
    studentName: "Carol White",
    courseTitle: "Chemistry",
    instructorName: "Dr. Smith",
  },
  {
    studentName: "David Clark",
    courseTitle: "Biology",
    instructorName: "Dr. Lee",
  },
  {
    studentName: "Eve Davis",
    courseTitle: "Mathematics",
    instructorName: "Dr. Smith",
  },
  {
    studentName: "Frank Miller",
    courseTitle: "Physics",
    instructorName: "Dr. Taylor",
  },
  {
    studentName: "Grace Wilson",
    courseTitle: "Chemistry",
    instructorName: "Dr. Johnson",
  },
  {
    studentName: "Henry Martinez",
    courseTitle: "Biology",
    instructorName: "Dr. Lee",
  },
  {
    studentName: "Isabella Anderson",
    courseTitle: "Mathematics",
    instructorName: "Dr. Johnson",
  },
  {
    studentName: "Jack Thomas",
    courseTitle: "Physics",
    instructorName: "Dr. Taylor",
  },
  {
    studentName: "Kathy Moore",
    courseTitle: "Chemistry",
    instructorName: "Dr. Smith",
  },
  {
    studentName: "Liam Jackson",
    courseTitle: "Biology",
    instructorName: "Dr. Lee",
  },
  {
    studentName: "Mia Martin",
    courseTitle: "Mathematics",
    instructorName: "Dr. Smith",
  },
  {
    studentName: "Noah Garcia",
    courseTitle: "Physics",
    instructorName: "Dr. Johnson",
  },
  {
    studentName: "Olivia Harris",
    courseTitle: "Chemistry",
    instructorName: "Dr. Taylor",
  },
  {
    studentName: "Peter Young",
    courseTitle: "Biology",
    instructorName: "Dr. Lee",
  },
  {
    studentName: "Quinn King",
    courseTitle: "Mathematics",
    instructorName: "Dr. Johnson",
  },
  {
    studentName: "Ryan Scott",
    courseTitle: "Physics",
    instructorName: "Dr. Taylor",
  },
  {
    studentName: "Sophia Lewis",
    courseTitle: "Chemistry",
    instructorName: "Dr. Smith",
  },
  {
    studentName: "Tyler Walker",
    courseTitle: "Biology",
    instructorName: "Dr. Lee",
  },
];

export const instructorListColumnsMapping = [
  columnHelper.accessor("studentName", {
    cell: (info) => (
      <>
        <Image src={UserIcon} alt="edit-icon" />
        <p className="text-nowrap">{info.getValue()}</p>
      </>
    ),
    header: () => <span>Student Name</span>,
  }),
  columnHelper.accessor("courseTitle", {
    id: "courseTitle",
    cell: (info) => (
      <>
        <Image src={EditIcon} alt="edit-icon" />
        <p className="text-nowrap">{info.getValue()}</p>
      </>
    ),
    header: () => <span>Course Title</span>,
  }),
  columnHelper.accessor("instructorName", {
    id: "instructorName",
    cell: (info) => (
      <>
        <Image src={InstructorIcon} alt="edit-icon" />
        <p className="text-nowrap">{info.getValue()}</p>
      </>
    ),
    header: () => <span>Instructor Name</span>,
  }),
];

// kuizzo about us page mapping
export const kuizzoAboutUsData = {
  id: "092kewdmi12j90ck",
  heroSection: {
    instituteName: "Brilliant Professional Academy",

    instituteDescription:
      "Chances are, you’ve come across a job posting (or two) that requires a bachelor’s degree, even if the responsibilities don’t align with that kind of education. That’s because employers typically set the standards around credentials.",

    logo: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",

    address: "123 Main Street, Cityville, Countryland",

    phoneNumber: ["+1234567890", "+0987654321"],

    rating: 4.5,

    ratingCount: 1200,
  },
  courses: [
    {
      title: "CS - EET",

      totalStars: 2,

      description:
        "A student who has got himself registered for Common Proficiency Test 60 days prior to the first day of the month in which examination is to be held can appear in the examination i.e. on or before 1st April and 1st October for appearing in CA FOUNDATION examination.",

      imageUrl:
        "https://images.pexels.com/photos/459403/pexels-photo-459403.jpeg",
    },

    {
      title: "CA - Foundation",

      totalStars: 4,

      description:
        "A student who has got himself registered for Common Proficiency Test 60 days prior to the first day of the month in which examination is to be held can appear in the examination i.e. on or before 1st April and 1st October for appearing in CA FOUNDATION examination.",

      imageUrl:
        "https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ],
  whyUsCounters: {
    data: [
      {
        heading: "Years of experience",
        number: 10,
      },
      {
        heading: "Successful Students",
        number: 200,
      },
      {
        heading: "Results Every Year",
        number: 500,
      },
    ],
    hidden: false,
  },
  aboutUs: {
    data: {
      title: "About Us Title",
      images: [
        "https://images.pexels.com/photos/5427659/pexels-photo-5427659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",

        "https://images.pexels.com/photos/7805671/pexels-photo-7805671.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
      description:
        "ABC University provided me with the skills and knowledge needed to succeed in my career. This institution's comprehensive curriculum and experienced faculty members played a pivotal role in shaping my professional journey. The coursework was meticulously designed to cover all essential aspects of my field, ensuring that I gained a thorough understanding of both theoretical concepts and practical applications.\n\nEngaging in various projects and hands-on activities allowed me to apply what I learned in real-world scenarios, enhancing my problem-solving abilities and critical thinking skills. The university's commitment to fostering a collaborative learning environment further enriched my experience, as it encouraged teamwork and the exchange of ideas among peers from diverse backgrounds.\n\nMoreover, the support services provided by ABC University, such as career counseling, workshops, and networking events, were instrumental in guiding me toward the right career path. These resources not only helped me identify my strengths and interests but also connected me with industry professionals and potential employers. The mentorship I received from professors and alumni was invaluable, offering insights and advice that proved crucial in navigating the professional landscape.\n\nIn summary, ABC University equipped me with a solid foundation of knowledge and skills, bolstered by practical experience and robust support, enabling me to achieve success in my career.\n ",
    },

    hidden: false,
  },
  gallerySection: {
    data: [
      "https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",

      "https://images.pexels.com/photos/889545/pexels-photo-889545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",

      "https://images.pexels.com/photos/1245055/pexels-photo-1245055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",

      "https://images.pexels.com/photos/1472334/pexels-photo-1472334.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",

      "https://images.pexels.com/photos/1472334/pexels-photo-1472334.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",

      "https://images.pexels.com/photos/1472334/pexels-photo-1472334.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    hidden: false,
  },
  faqSection: {
    data: [
      {
        id: "123ewesfdf",
        question: "What is the admission process?",
        answer:
          "The admission process involves submitting an application, appearing for an entrance test, and attending an interview.",
      },
      {
        id: "3erwsdfs3qqwscd",
        question: "What courses are offered?",
        answer:
          "We offer a wide range of courses in various fields including science, arts, and technology.",
      },
    ],
    hidden: false,
  },
  testimonialSection: {
    data: [
      {
        imageUrl:
          "https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        title: "Great Experience",
        testimonial:
          "I had a wonderful experience at ABC University. The faculty is amazing and the campus is beautiful.",
        ratings: 5,
      },
      {
        imageUrl:
          "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        title: "Highly Recommend",
        testimonial:
          "ABC University provided me with the skills and knowledge needed to succeed in my career.",
        ratings: 4,
      },
      {
        imageUrl:
          "https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        title: "Great Experience",
        testimonial:
          "I had a wonderful experience at ABC University. The faculty is amazing and the campus is beautiful.",
        ratings: 5,
      },
      {
        imageUrl:
          "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        title: "Highly Recommend",
        testimonial:
          "ABC University provided me with the skills and knowledge needed to succeed in my career.",

        ratings: 4,
      },
    ],
    hidden: false,
  },
  contactUsEmail: "Kuizzo@gmail.com",
};

// footer data mapping
export const footerData = {
  logo: KuizzoLogoWhite,
  description:
    "Veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  sections: [
    {
      title: "Study Tools",
      items: [
        "AI Flashcards",
        "AI PDF Summarizer",
        "AI PPT Summarizer",
        "AI Video Summarizer",
        "AI Spreadsheet Summarizer",
        "AI Notes",
      ],
    },
    {
      title: "Exams",
      items: [
        "AP Exam Hub",
        "IB Exam Hub",
        "GC Exam Hub",
        "A Level Exam Hub",
        "More Exam Hubs",
      ],
    },
    {
      title: "Resources",
      items: [
        "FAQ",
        "Contact Us",
        "Blog",
        "Kuizzo Updates",
        "Privacy Policy",
        "Terms of Services",
      ],
    },
  ],
  copyright: `Copyright ${getCurrentYear()} | All Rights Reserved`,
  socialMedia: [
    { icon: PiFacebookLogoBold, alt: "Facebook" },
    { icon: FaXTwitter, alt: "Twitter" },
    { icon: FaInstagram, alt: "Instagram" },
    { icon: FaLinkedin, alt: "Linkedin" },
  ],
};

// browse by exam list to map the cards for the browse by exams
export const browseByExamsList: IBrowseByExamSectionList[] = [
  {
    id: 1,
    buttonText: "AP Study Guide",
    cardIcon: ChessKingIcon,
    cardIconBgColor: "bg-browse-by-exams-icon-background-1",
    cardIconColor: "text-[#7F56D9]",
    buttonColor: "purple",
    title: "Kuizzo AP Hub",
  },
  {
    id: 2,
    buttonText: "IB Study Guide",
    cardIcon: SwordIcon,
    cardIconBgColor: "bg-browse-by-exams-icon-background-2",
    cardIconColor: "text-[#FF6905]",
    buttonColor: "plainOrange",
    title: "Kuizzo AP Hub",
  },
  {
    id: 3,
    buttonText: "GC Study Guide",
    cardIcon: HelmetIcon,
    cardIconBgColor: "bg-browse-by-exams-icon-background-3",
    cardIconColor: "text-[#4671CC]",
    buttonColor: "blue",
    title: "Kuizzo AP Hub",
  },
  {
    id: 4,
    buttonText: "AP Study Guide",
    cardIcon: ChessKingIcon,
    cardIconBgColor: "bg-browse-by-exams-icon-background-1",
    cardIconColor: "text-[#7F56D9]",
    buttonColor: "purple",
    title: "Kuizzo AP Hub",
  },
  {
    id: 5,
    buttonText: "IB Study Guide",
    cardIcon: SwordIcon,
    cardIconBgColor: "bg-browse-by-exams-icon-background-2",
    cardIconColor: "text-[#FF6905]",
    buttonColor: "plainOrange",
    title: "Kuizzo AP Hub",
  },
  {
    id: 6,
    buttonText: "GC Study Guide",
    cardIcon: HelmetIcon,
    cardIconBgColor: "bg-browse-by-exams-icon-background-3",
    cardIconColor: "text-[#4671CC]",
    buttonColor: "blue",
    title: "Kuizzo AP Hub",
  },
];

//signin and signup mapping
export const signupData = {
  title: "Sign Up",
  description:
    "This is a dummy text added via mapping found in /mappings/index.tsx file. You can change it to your liking. Title is not mapped but not used as title depends on the role ",
};

export const signinData = {
  title: "Sign In",
  description:
    "This is a dummy text added via mapping found in /mappings/index.tsx file. You can change it to your liking.",
};

export const questionsListDummyData = [
  {
    id: "1",
    question: "What is the best framework for web development?",
    type: "mcq",
    correctAnswer: "Option 3",
    options: "React,Angular,Vue,Svelte",
    category: "Exam",
    subCategory: "Exam 2",
  },
  {
    id: "2",
    question: "There are 3 states of matter in the universe?",
    correctAnswer: "False",
    type: "true/false",
    category: "Exam",
    subCategory: "Exam 2",
  },
  {
    id: "3",
    question: "Write a short answer describing rise of ai in India.",
    keyWords: "keyword-1,keyword-2,keyword-3,keyword-4,keyword-5",
    type: "short-answer",
    category: "Exam",
    subCategory: "Exam 2",
  },
  {
    id: "4",
    question: "Write an essay on how to create a typescript gneric interfaces",
    keyWords: "keyword-1,keyword-2,keyword-3,keyword-4,keyword-5",
    type: "essay",
    category: "Exam",
    subCategory: "Exam 2",
  },
  {
    id: "5",
    question: "What is the best framework for web development?",
    type: "mcq",
    correctAnswer: "Option 2",
    options: "React,Angular,Vue,Svelte",
    category: "Exam",
    subCategory: "Exam 2",
  },
  {
    id: "6",
    question: "There are 3 states of matter in the universe?",
    correctAnswer: "False",
    type: "true/false",
    category: "Exam",
    subCategory: "Exam 2",
  },
  {
    id: "7",
    question: "Write a short answer describing rise of ai in India.",
    keyWords: "keyword-1,keyword-2,keyword-3,keyword-4,keyword-5",
    type: "short-answer",
    category: "Exam",
    subCategory: "Exam 2",
  },
  {
    id: "8",
    question: "Write an essay on how to create a typescript gneric interfaces",
    keyWords: "keyword-1,keyword-2,keyword-3,keyword-4,keyword-5",
    type: "essay",
    category: "Exam",
    subCategory: "Exam 2",
  },
  {
    id: "9",
    question: "Capital of India is ___________",
    keyWords: "",
    type: "fill-in-the-blanks",
    correctAnswer: "Delhi",
    category: "Exam",
    subCategory: "Exam 2",
  },
];
export const instructoriMyCoursesDummyData = [
  {
    id: 1,
    name: "Python for Data Science Bootcamp",
    studyMaterialCount: 5,
    quizCount: 2,
    studentCount: 25,
  },
  {
    id: 2,
    name: "Introduction to Machine Learning",
    studyMaterialCount: 8,
    quizCount: 3,
    studentCount: 30,
  },
  {
    id: 3,
    name: "Web Development with React",
    studyMaterialCount: 10,
    quizCount: 4,
    studentCount: 40,
  },
  {
    id: 4,
    name: "Advanced JavaScript Techniques",
    studyMaterialCount: 7,
    quizCount: 2,
    studentCount: 20,
  },
  {
    id: 5,
    name: "Database Management Systems",
    studyMaterialCount: 6,
    quizCount: 3,
    studentCount: 35,
  },
  {
    id: 6,
    name: "Fundamentals of Cyber Security",
    studyMaterialCount: 5,
    quizCount: 2,
    studentCount: 25,
  },
  {
    id: 7,
    name: "Digital Marketing Essentials",
    studyMaterialCount: 8,
    quizCount: 4,
    studentCount: 50,
  },
  {
    id: 8,
    name: "Cloud Computing with AWS",
    studyMaterialCount: 9,
    quizCount: 3,
    studentCount: 45,
  },
  {
    id: 9,
    name: "Mobile App Development with Flutter",
    studyMaterialCount: 7,
    quizCount: 2,
    studentCount: 40,
  },
];

export const testimonialDummyData: ITestimonialProps[] = [
  {
    imageUrl:
      "https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Great Experience",
    testimonial:
      "I had a wonderful experience at ABC University. The faculty is amazing and the campus is beautiful.",
    ratings: 5,
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Highly Recommend",
    testimonial:
      "ABC University provided me with the skills and knowledge needed to succeed in my career.",
    ratings: 4,
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Great Experience",
    testimonial:
      "I had a wonderful experience at ABC University. The faculty is amazing and the campus is beautiful.",
    ratings: 5,
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Highly Recommend",
    testimonial:
      "ABC University provided me with the skills and knowledge needed to succeed in my career.",
    ratings: 4,
  },
];

export const quizTypeOptions = [
  { id: "mcq", value: "Multiple Choice" },
  { id: "true/false", value: "True/False" },
];
