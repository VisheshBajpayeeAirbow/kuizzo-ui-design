import {
  ButtonHTMLAttributes,
  ChangeEvent,
  ElementType,
  HTMLAttributes,
  ReactNode,
} from "react";
import { UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";
import {
  ICourseData,
  IInstructorData,
  IInstructorPermissions,
  IStudentData,
  IStudentPermissions,
} from "./api";
import { ChartData, ChartOptions } from "chart.js";
import { Option } from "@/components/custom/multi-select";
export type AuthFormState = "institution" | "instructor" | "student";

export interface IDashboardLayoutProps {
  children: ReactNode;
  header: ReactNode;
  sidebar: ReactNode;
  dashboard: ReactNode;
}
export interface IAddIndividualStudentsFormProps {
  studentName: string;
  // username: string;
  email: string;
  course: string;
  instructor: string;
  // image is optional
  image?: FileList;
}

export interface IAddIndividualInstructorFormProps {
  instructorName: string;
  email: string;
  // course not required as its used from multi-select input
  course?: string[];
  // image is optional
  image?: FileList;
}

export interface IInstructorStudentClipboardData {
  title: string;
  email: string;
  password: string;
  username: string;
}

// __________________________________________________________ Institution types
// INSTITUTION LIST TYPES
export interface IInstitutionHeroProps {
  instituteName: string;
  instituteDescription: string;
  instituteUrl: string;
  logo: string;
  address: string;
  phoneNumber: string[];
}
export interface IInstitutionContactUsForm {
  username: string;
  email: string;
  subject: string;
  question: string;
}

export interface ITestimonialProps {
  imageUrl: string;
  title: string;
  testimonial: string;
  ratings: number;
}

export interface ICourses {
  id: string;
  title: string;
  totalStars: number;
  description: string;
  imageUrl: string;
}

export interface IWhyUs {
  data: {
    heading: string;
    number: number;
  }[];
  hidden: boolean;
}

export interface IAboutUS {
  data: {
    title: string;
    images: string[];
    description: string;
  };
  hidden: boolean;
}

export interface IGallery {
  data: string[];
  hidden: boolean;
}

export interface IFaq {
  data: IAccordianMappingObj[];
  hidden: boolean;
}

export interface ITestimonial {
  data: ITestimonialProps[];
  hidden: boolean;
}

export interface IInstitutionProps {
  id: string;
  heroSection: IInstitutionHeroProps;
  courses: ICourses[];
  whyUsCounters: IWhyUs;
  aboutUs: IAboutUS;
  gallerySection: IGallery;
  faqSection: IFaq;
  testimonialSection: ITestimonial;
  contactUsEmail: string;
}

export interface BarChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    stack?: string;
    hidden: boolean;
    borderRadius?: number;
  }[];
}

// dashboard forms types
export interface IHeroSectionForm {
  heroImage?: File | string;
  title: string;
  description: string;
  address: string;
  instituteUrl: string;
  // phone is not present because its state is handled seperately
}

export interface ICounterSectionForm {
  titleOne: string;
  countOne: number;
  titleTwo: string;
  countTwo: number;
  titleThree: string;
  countThree: number;
}

export interface IAboutUsSectionForm {
  aboutUsImageOne?: IFileUpload;
  aboutUsImageTwo?: IFileUpload;
  title: string;
  description: string;
  hidden: string;
}

export interface IGallerySectionForm {
  galleryImageOne: any;
  galleryImageTwo: any;
  galleryImageThree: any;
  galleryImageFour: any;
  galleryImageFive: any;
  galleryImageSix: any;
  hidden: string;
}

export type QueryFunctionResult<T> = T;

// user schema
export interface IUser {
  id?: string;
  role: string;
  email: string;
  username: string;
  password: string;
  phone?: string;
  dob?: Date;
  address: string;
  picture?: string;
}

// ? __________institution details components types start__________

// institution hero section component proptypes
export interface IInstitutionHeroProps {
  instituteName: string;
  instituteDescription: string;
  logo: string;
  rating: number;
  ratingCount: number;
  address: string;
  phoneNumber: string[];
}

// institution courses section component proptypes
export interface IInstitutionCoursesProps {
  disableBackground?: boolean;
  hasborderRadius?: boolean;
  data: { courseId: string }[];
}

// institution why us section component proptypes
export interface IInstitutionWhyUsProps {
  data: {
    heading: string;
    number: number;
  }[];
  disableGradient: boolean;
}

// institution about us section component proptypes
export interface IInstitutionAboutUsProps {
  aboutInfo: string;
  images: string[];
  title: string;
}
// institution gallery section component proptypes
export interface IInstitutionGalleryProps {
  images: string[];
}

// institution faq section component proptypes
export interface IInstitutionFaqProps {
  data: {
    question: string;
    answer: string;
  }[];
}

// institution testimonials component proptypes
export interface IInstitutionTestimonialProps {
  data: {
    imageUrl: string;
    title: string;
    testimonial: string;
    ratings: number;
  }[];
}
// ? __________institution details components types end__________

// ? __________ui atoms proptypes start__________

// basic input component proptypes
export interface IInputBasicProps {
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addPhoneInput?: () => void;
  removePhoneInput?: () => void;
  hideAddButton?: boolean;
  hideAllButtons?: boolean;
  inputType: string;
  label?: string;
  value?: string;
}

// country code input propstypes
export interface IPhoneCountryCodeInputProps {
  onCountryCodeChange: (countryCode: string, value: string) => void;
}
// form radio component proptypes
export interface IFormRadioProps {
  register: UseFormRegister<IRadioForm>;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  scheme: "purple" | "orange" | "green";
  value: string;
}

// for radio colors proptypes
export interface IRadioColors {
  purple: string;
  orange: string;
  green: string;
}

// form input component proptypes

export interface IFormInputProps {
  selectOptions?: { id: string | undefined; value: string }[] | string[];
  register: any;
  errorMessage?: string | undefined;
  labelText?: string;
  name: any;
  placeholder: string;
  requiredField?: boolean;
  fileInputTypeInfo?: string;
  resetFileUpload?: (resetData: any) => void;
  defaultInputTypeValue?: "text" | "number";
  fileUploadType?: Array<
    | "image/jpeg"
    | "image/png"
    | "image/jpg"
    | "image/gif"
    | "image/webp"
    | "text/csv"
    | "application/pdf"
    | "application/msword"
    | string
  >;
  Icon?: IconType;
  inputType?:
    | "default"
    | "withIcon"
    | "showPassword"
    | "phone"
    | "date"
    | "textarea"
    | "file"
    | "select"
    | "checkbox"
    | "radio"
    | "time";
  disabledOptions?: string[];
  fileInputResetTrigger?: boolean;
  imageUrl?: string;
}

export interface ISelectInputProps {
  options: string[];
  handleSelectChange: (value: string) => void;
  label?: string;
  id: string;
  customHeight?: string;
  customRadius?: string;
}

// avatar component proptypes
export interface IAvatarProps {
  image: string;
  alt?: string;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}

// heading component proptypes
export interface IHeadingProps {
  heading: string | undefined;
  className?: string;
}

// icon badge component proptypes
export interface IIconProps {
  Icon: HTMLImageElement;
  bgColor: string;
  iconColor: string;
  size: "small" | "medium" | "large" | "xl";
  vectorSize: "small" | "medium" | "large" | "xl";
}

// star rating component proptypes
export interface IStarRatingProps {
  rating: number;
  ratingReviewCount?: number;
  countSize?: string;
}

// sidebar navigation button component proptypes
export interface ISidebarNavigationButtonProps {
  image: HTMLImageElement;
  text: string;
  link: string;
  noBorder?: boolean;
  darkImage: HTMLImageElement;
}

// social media button component proptypes
export interface ISocialMediaButton
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: "Google" | "Facebook" | "Apple";
  icon: HTMLImageElement;
}

// question types component proptypes
export interface IQuestionTypeInputsProps {
  checkboxState: boolean | undefined;
  checkboxRegister: any;
  checkboxLabelText: string;
  checkboxPlaceholder: string;
  checkboxName: string;
  inputName: string;
  inputPlaceholder: string;
  inputRegister: any;
  // is optional
  inputError?: string | undefined;
}

// ? __________ui atoms proptypes end__________

// ? __________ui molecules proptypes start__________

// pricing card component proptypes
export interface IPricingCardProps {
  accent: "instructor" | "institution" | "student";
  pricingData: {
    title: string;
    subTitle: string;
    price: string | number;
    redirectLink: string;
    perks: {
      perkOption: boolean | string;
      perkDescription: string;
    }[];
  };
}

// institution details card component proptypes
export interface IInstitutionDetailsCardProps {
  id: string;
  heading: string;
  date?: string;
  imageUrl: string;
  description: string;
  instituteUrl: string;
}

// explore subjects card component proptypes
export interface IExploreSubjectsCardProps {
  title: string;
  iconBgColor: string;
  cardIcon: HTMLImageElement;
}

// browse section card component proptypes
export interface ICardBrowseSectionProps {
  cardIconBgColor: string;
  cardIconColor: string;
  cardIcon: HTMLImageElement;
  buttonColor?: "green" | "orange" | "blue" | "purple" | "plainOrange";
  buttonIcon: IconType;
  buttonText: string;
  title: string;
}

// hero section all cards parent component proptypes
export interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  cardType:
    | "explore-flashcard"
    | "explore-topnotes"
    | "testimonial"
    | "testimonial-institution"
    | "subject"
    | "courses";
  badges?: string[];
  totalStars?: number;
  totalReviews?: number;
  avatarImage?: string | undefined;
  cardIconColor?: string;
  cardIcon?: HTMLImageElement;
  footerText?: string;
  buttonColor?: "green" | "orange" | "blue" | "purple";
  buttonText?: string;
  testimonial?: string;
  description?: string;
  redirectLink?: string;
}

// blog details card component proptypes
export interface IBlogDetailsCard {
  id: string;
  heading: string;
  date?: string;
  imageUrl: string;
  description: string;
  category?: string;
}

// avatar group component proptypes
export interface IAvatarGroupProps {
  avatars: IAvatarMappingObj[];
  maxDisplay?: number | undefined;
  size?: "small" | "medium" | "large" | undefined;
}
// accordian componeny proptypes
export interface IAccordionProps {
  data: {
    question: string;
    answer: string;
  }[];
}

// dashboard form card component proptypes
export interface IDashboardFormCardProps {
  children: ReactNode;
  heading: string;
  marginAuto: boolean;
  fullWidthOnMediumDevices: boolean;
  headingTextSize: string;
  helperTooltipDescription?: string;
}

// dashboard parent card component proptypes
export interface IParentCardDashboardProps {
  heading: string;
  children: ReactNode;
  marginBottom: string;
  hideSeparator?: boolean;
}

// dashboard overview card component proptypes
export interface IOverviewCardProps {
  icon: HTMLImageElement;
  text: string;
  number: number;
  circleColor: string;
}

// dashboard barchart component proptypes
export interface IBarChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  };
}

// custom button group component proptypes

// sidebar component proptypes
export interface ISidebarProps {
  sidebarState: boolean;
  handleSidebarToggle: () => void;
}

export interface ICourseOptionalFormInputProps {
  setInputs: React.Dispatch<React.SetStateAction<boolean>>;
  getInputState?: boolean;
  formType: "Module" | "Topic";
}

export interface IDatePickerProps {
  label: string;
  dateSetter: React.Dispatch<React.SetStateAction<DateRange>>;
  dateValue: DateRange;
}

export interface IMultiInputProps {
  maxInputs: number;
  placeholder: string;
  setInputsState: (data: any) => void;
  inputsState: { id: number; value: string }[];
  inputType: "number" | "string";
  label: string;
}

export interface ISearchInput {
  search: string;
}

// ? __________ui molecules proptypes end__________

// ? __________ ui organisms proptypes start__________

// institution signup form component proptypes
export interface IInstitutionSignupFormProps {
  email: string;
  username: string;
  password: string;
  phone?: string;
  address: string;
  slug: string;
  instituteName: string;
}

// instructor signup form component proptypes
export interface IInstructorSignupFormProps {
  email: string;
  username: string;
  password: string;
  phone?: string;
}
// student signup form component proptypes
export interface IStudentSignupFormProps {
  email: string;
  username: string;
  password: string;
  phone?: string;
  dob: Date;
}

// login form component proptypes
export interface ILoginForm {
  username: string;
  password: string;
}

// role radio form component proptypes
export interface IRadioForm {
  role: string;
}

// quiz generator form component proptypes
export interface IQuizGeneratorForm {
  // notesMaterial?: any;
  // syllabusMaterial?: any;
  // pastQuizMaterial?: any;
  quizName: string;
  additionalNotesOrInstructions?: string;
  course: string;
  subject: string;
  topic: string;
  type: string;
  numberOfQuestions?: number;
  difficultyLevel: string;
}

export interface IExamGeneratorForm {
  notesMaterial?: any;
  syllabusMaterial?: any;
  pastExamMaterial?: any;
  examName: string;
  additionalNotesOrInstructions?: string;
  course: string;
  subject: string;
  topic: string;
  numberOfQuestions: string;
  difficultyLevel: string;
  timeSlotFrom: string;
  timeSlotTo: string;
  questionTypeMcq?: boolean;
  questionTypeTrueFalse?: boolean;
  questionTypeShortAnswer?: boolean;
  questionTypeEssay?: boolean;
  questionTypeFillInTheBlanks?: boolean;
  examTime?: string;
  customExamTimeHour?: number;
  customExamTimeMin?: number;
  questionTypeMcqCount?: number;
  questionTypeTrueFalseCount?: number;
  questionTypeShortAnswerCount?: number;
  questionTypeEssayCount?: number;
  questionTypeFillInTheBlanksCount?: number;
}

export interface ICreateIndividualStudentFormProps {
  individualStudentFormHandler: (
    individualStudentData: IStudentData,
    courseId: string
  ) => void;
}

export interface ICreateIndividualInstructorFormProps {
  individualInstructorFormHandler: (
    data: IInstructorData,
    courseIds: string[]
  ) => void;
}

// ? __________ ui organisms proptypes end__________

// ? __________ mapping object types starts __________
export interface IAvatarMappingObj {
  image: string;
  alt?: string | undefined;
  size?: "small" | "medium" | "large" | undefined;
}

export interface IAccordianMappingObj {
  id: string;
  question: string;
  answer: string;
}

export interface IBrowseByExamSectionList {
  id: number;
  title: string;
  buttonText: string;
  cardIcon: any;
  cardIconBgColor: string;
  cardIconColor: string;
  buttonColor:
    | "purple"
    | "plainOrange"
    | "green"
    | "orange"
    | "blue"
    | undefined;
}

export interface ISublink {
  popupTitle: string;
  link: string;
  sublinks?: ISublink[]; // Add sublinks here for recursion
}

export interface INavLink {
  name: string;
  link?: string;
  popup?: ISublink[];
}

export interface IParsedQuestionsData {
  id: string;
  instituteId: string;
  question: string;
  type: "mcq" | "true/false" | "short-answer" | "essay" | "fill-in-the-blanks";
  correctAnswer?: string;
  options?: string;
  keywords?: string;
  tags?: string;
  category: string;
  subCategory: string;
}

// ? __________ mapping object types ends __________
export interface SelectInputData {
  id: string;
  value: string;
}

export interface IInstitutionEditCounterForm {
  titleOne: string;
  countOne: number;
  titleTwo: string;
  countTwo: number;
  titleThree: string;
  countThree: number;
  hidden: string;
}
export interface IInstitutionFaqForm {
  faqs: {
    title: string;
    description: string;
  }[];
  hidden: string;
}
export interface IInstitutionTestimonialForm {
  testimonials: {
    testimonialImage?: any;
    title: string;
    testimonial: string;
    ratings: number;
  }[];
  hidden: string;
}

// session user
export interface ISessionUser {
  name: string;
  image: string;
  id: string;
  role: string;
  picture: string;
}
// session interface
export interface ISession {
  user: ISessionUser;
  expires: string;
}

export interface ICustomTable {
  header: string;
  pageSize: number;
  tableData: {}[];
  tableColumns: any[];
  hasActions: boolean;
  handleDelete?: (data: any) => void;
  handleEdit?: (data: any) => void;
  actionIcons?: { icon: ElementType; handler: (data: any) => void }[];
}

// ? __________ question components props start _______

export interface IEssayQuestionProps {
  questionId: string;
  essaySubmitHandler: (questionDetails: any) => void;
  resetQuestionTypeForm: (resetData: IQuestionTypeForm) => void;
  mode: "edit" | "add";
  defaultValues?: IEssayProps;
}
export interface IEssayProps {
  question: string;
  keywords: string;
}
export interface ICreateQuestionFormProps {
  questionListHandler: (data: IParsedQuestionsData[]) => void;
  categoryData: {
    category: string;
    subCategory: string;
  };
}

export interface IQuestionTypeForm {
  questionType:
    | "MCQ"
    | "True/False"
    | "Short Answer"
    | "Essay"
    | "Fill in the blanks"
    | "";
}

export interface IFillInTheBlanksProps {
  question: string;
  correctAnswer: string;
}
export interface IFillInTheBlanksQuestionProps {
  questionId: string;
  mode: "edit" | "add";
  defaultValues?: IFillInTheBlanksProps;
  fillInTheBlanksSubmitHandler: (questionDetails: any) => void;
  resetQuestionTypeForm: (resetData: IQuestionTypeForm) => void;
}
export interface ITrueFalseQuestionProps {
  questionId: string;
  mode: "edit" | "add";
  defaultValues?: IFillInTheBlanksProps;
  trueFalseSubmitHandler: (questionDetails: any) => void;
  resetQuestionTypeForm: (resetData: IQuestionTypeForm) => void;
}

export interface IMcqQuestionProps {
  questionId: string;
  mode: "edit" | "add";
  defaultValues?: IMcqProps;
  mcqSubmitHandler: (questionDetails: any) => void;
  resetQuestionTypeForm: (resetData: IQuestionTypeForm) => void;
}

export interface IMcqProps {
  question: string;
  optionOne: string;
  optionTwo: string;
  optionThree: string;
  optionFour: string;
  correctAnswer: string;
}

export interface IShortAnswerQuestionProps {
  questionId: string;
  shortAnswerSubmitHandler: (questionDetails: any) => void;
  resetQuestionTypeForm: (resetData: IQuestionTypeForm) => void;
  mode: "edit" | "add";
  defaultValues?: IShortAnswerProps;
}

export interface IShortAnswerProps {
  question: string;
  keywords: string;
}

export interface ITrueFalseQuestionProps {
  questionId: string;
  mode: "edit" | "add";
  defaultValues?: ITrueFalseProps;
  trueFalseSubmitHandler: (questionDetails: any) => void;
  resetQuestionTypeForm: (resetData: IQuestionTypeForm) => void;
}

export interface ITrueFalseProps {
  question: string;
  correctAnswer: string;
}

export interface IEssayQuestionFormProps {
  id: string;
  question: string;
  keyWords: string;
  formCategory: "exam" | "quiz";
}

export interface IFillInTheBlanksQuestionFormProps {
  id: string;
  question: string;
  correctAnswer: string;
  formCategory: "exam" | "quiz";
}

export interface IMcqQuestionFormProps {
  id: string;
  question: string;
  options: string;
  correctAnswer: string;
  formCategory: "quiz" | "exam";
}

export interface IShortAnswerQuestionFormProps {
  id: string;
  question: string;
  keyWords: string;
  formCategory: "quiz" | "exam";
}

export interface ITrueFalseQuestionFormProps {
  id: string;
  question: string;
  correctAnswer: string;
  formCategory: "exam" | "quiz";
}

export interface IQuestionCategories {
  questionsFor: "Exam" | "Quiz";
  subCategory: string;
}

// ? __________ question components props end _______

// ? __________ dialog types start __________
export interface IDialogProps {
  dialogTitle: string;
  dialogDescription?: string;
  dialogHandler: () => void;
  dialogToggle: boolean;
  setDialogToggle: React.Dispatch<React.SetStateAction<boolean>>;
  buttonOneText?: string;
  buttonTwoText?: string;
}

export interface IExamEditObject {
  id?: string;
  examName: string;
  course: string;
  subject: string;
}

export interface IEditExamDialogProps {
  instituteId: string;
  dialogToggle: boolean;
  dataToBeEdited: IExamEditObject;
  setDialogToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IInstructorEditObject {
  instructorName: string;
  userName: string;
  email: string;
  course: string;
  id?: number;
  permissions?: number[];
}

export interface IEditInstructorDialogProps {
  instituteId: string;
  dialogToggle: boolean;
  dataToBeEdited: IInstructorDialogForm | undefined;
  originalData: IInstructorData | undefined;
  setDialogToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IInstructorDialogForm extends IInstructorPermissions {
  title: string;
  username: string;
  email: string;
  // course Ids are handled separately
  courseIds?: string[] | null;
}

export interface IStudentDialogForm extends IStudentPermissions {
  title: string;
  username: string;
  email: string;
  instructorId: string;
  courseId: string | null;
}

export interface IQuestionEditObject {
  id?: string;
  question: string;
  type: "mcq" | "true/false" | "essay" | "short-answer" | "fill-in-the-blanks";
  correctAnswer: string;
  options: string;
  category: string;
  subCategory: string;
  keyWords: string;
}

export interface IEditQuestionDialogProps {
  categoryId: string;
  questionsList: IParsedQuestionsData[];
  dialogToggle: boolean;
  refetch: boolean;
  dataToBeEdited: IQuestionEditObject;
  questionCategoryType: "Exam" | "Quiz";
  refetchSetter: React.Dispatch<React.SetStateAction<boolean>>;
  setDialogToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IQuizEditObject {
  id?: string;
  quizName: string;
  course: string;
  subject: string;
}

export interface IEditQuizDialogProps {
  instituteId: string;
  dialogToggle: boolean;
  dataToBeEdited: IQuizEditObject;
  setDialogToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IEditStudentDialogProps {
  dialogToggle: boolean;
  dataToBeEdited: IStudentDialogForm | undefined;
  originalData: IStudentData | undefined;
  instituteId: string;
  setDialogToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

// ? __________ dialog types end __________

// ? __________ api integration types start __________

interface IPageContent {
  heroSection: Record<string, any>;
  whyUsSection: Record<string, any>;
  aboutSection: Record<string, any>;
  gallerySection: Record<string, any>;
  faqSection: Record<string, any>;
  testimonialsSection: Record<string, any>;
  contactEmail: string;
}

export interface IInstitutionPayload {
  title: string;
  subscription: string;
  verified: boolean;
  pageContent: IPageContent;
  studentPermissions: IStudentPermissions;
  instructorPermissions: IInstructorPermissions;
  profileImage: string;
  createdOn: string;
  updatedOn: string;
  timeZone: string;
}

export interface IInstructorPayload {
  instituteId: string;
  instructorPermissions: IInstructorPermissions;
  subscription: string;
  verified: boolean;
  profileImage: string;
  createdOn: string;
  updatedOn: string;
}

export interface IStudentPayload {
  instituteId: string;
  studentPermissions: IStudentPermissions;
  subscription: string;
  verified: boolean;
  profileImage: string;
  createdOn: string;
  updatedOn: string;
  timeZone: string;
}

export type RegisterPayload =
  | IInstitutionPayload
  | IInstructorPayload
  | IStudentPayload;

export interface IFileUpload {
  fileName: string | undefined;
  fileType: string | undefined;
  fileKey: string;
}

export interface ISpinnerProps {
  loadingText?: string;
}

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

// Student dashboard types
export interface IDoughnutChartComponentProps {
  data: ChartData<"doughnut">;
  options?: ChartOptions<"doughnut">; // Make options optional
  cssClasses?: string;
}

export interface IProgressBarProps {
  progress: number;
  maxValue: number;
  accent: "bg-app-green" | "bg-app-purple" | "bg-yellow-500" | "bg-red-500";
  extraClasses?: string;
}
export interface IRadialProgressBarProps {
  progress: number;
}

export interface IProgressGauseProps {
  progress: number;
  maxTime: number;
  extraClasses: string;
}

export interface IStudentQuickSummaryProps {
  rank: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  percentage: number;
  status: "Passed" | "Failed";
}

export interface ITimingDetailsProps {
  totalTime: string;
  timeTaken: string;
}

export interface ICourseStatisticsProps {
  totalExams: number;
  totalExamsTaken: number;
  totalPass: number;
  successRate: number;
}

export interface IStudentBreakdownProps {
  correctAnswers: number;
  totalQuestions: number;
  wrongAnswers: number;
}

export interface IStudentTestAnalyticsProps {
  questionsData: IStudentQuickSummaryProps;
  timingDetails: ITimingDetailsProps;
  courseStatistics: ICourseStatisticsProps;
}

export interface IQuestionsNavigationTabProps {
  totalPages: number;
  onPageChange: (page: number) => void;
  currentPage: number; // Add this line
}

export interface IStudentDashboardCourseCardProps {
  course: ICourseData;
}

export interface IEvaluationResult {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  percentage: number;
}

export interface IAnswerPayload {
  questionId: string;
  answer: string;
  keywords?: string;
  correctAnswer?: string;
}
