import { IFileUpload, IParsedQuestionsData } from ".";

// * __________ INSTITUTION DATA TYPES START __________
export interface IInstructorPermissions {
  createCourse: boolean;
  createQuizAndExam: boolean;
  addInstructor: boolean;
  billingAndPayments: boolean;
  addStudents: boolean;
}

export interface IFaqSection {
  data: Array<{
    question: string;
    answer: string;
  }>;
  hidden: boolean;
}

export interface IAboutSection {
  data: {
    title: string;
    description: string;
    images: string[];
  };
  hidden: boolean;
}

export interface IWhyUsSection {
  data: Array<{
    heading: string;
    number: number;
  }>;
  hidden: boolean;
}

export interface ITestimonialsSection {
  data: Array<{
    testimonial: string;
    title: string;
    ratings: number;
    imageUrl: string;
  }>;
  hidden: boolean;
}

export interface IGallerySection {
  data: string[];
  hidden: boolean;
}

export interface IHeroSection {
  instituteUrl: string;
  address: string;
  phoneNumber: string[];
  logo: string;
  instituteDescription: string;
  instituteName: string;
}

export interface ICoursesSection {
  courses: { courseId: string }[];
}

export interface IPageContent {
  heroSection: IHeroSection;
  coursesSection: ICoursesSection;
  aboutSection: IAboutSection;
  whyUsSection: IWhyUsSection;
  gallerySection: IGallerySection;
  contactEmail: string;
  faqSection: IFaqSection;
  testimonialsSection: ITestimonialsSection;
}

export interface IStudentPermissions {
  createQuiz: boolean;
  createExam: boolean;
}

export interface IInstitutionData {
  institute: {
    updatedOn: string;
    instructorPermissions: IInstructorPermissions;
    subscription: string;
    address: string;
    pageContent: IPageContent;
    email: string;
    verified: boolean;
    profileImage: string;
    timeZone: string;
    password: string;
    createdOn: string;
    username: string;
    id: string;
    phone: string;
    studentPermissions: IStudentPermissions;
    title: string;
    published: boolean;
  };
}

export interface IInstitutionList {
  updatedOn: string;
  instructorPermissions: IInstructorPermissions;
  subscription: string;
  address: string;
  pageContent: IPageContent;
  email: string;
  verified: boolean;
  profileImage: string;
  timeZone: string;
  password: string;
  createdOn: string;
  username: string;
  id: string;
  phone: string;
  studentPermissions: IStudentPermissions;
  title: string;
}
// * __________ INSTITUTION DATA TYPES END __________

// * __________ INSTRUCTOR DATA TYPES START __________
export interface IInstructorData {
  id?: string;
  instituteId?: string;
  courseIds: string[] | null;
  title: string;
  username: string;
  password?: string;
  email: string;
  permissions: IInstructorPermissions;
  verified?: boolean;
  subscription?: "free" | "plus" | "premium";
  profileImage?: IFileUpload | string | undefined;
}

// * __________ INSTRUCTOR DATA TYPES END __________

// * __________ STUDENT DATA TYPES START ________

export interface IStudentData {
  id?: string;
  instituteId?: string;
  courseId: string | null;
  instructorId: string;
  title: string;
  username: string;
  password?: string;
  email: string;
  permissions: IStudentPermissions;
  verified?: boolean;
  subscription?: "free" | "plus" | "premium";
  profileImage?: IFileUpload | string | undefined;
  instructorName?: string;
  courseName?: string;
}

// * __________ STUDENT DATA TYPES END __________

// * __________ COURSE DATA TYPES ________
export interface ICourseMaterial {
  fileName: string;
  fileType: "doc" | "pdf" | "csv";
  fileContent: string | undefined; // Base64 encoded file content
}

export interface ISubject {
  subjectName: string;
  subjectDescription: string;
  topics?: ITopic[];
}

export interface ITopic {
  topicName: string;
  topicDescription: string;
  modules?: Module[];
}

export interface Module {
  moduleName: string;
  moduleDescription: string;
}

export interface ICourseData {
  id?: string;
  instituteId: string;
  courseName: string;
  courseDescription: string;
  courseObjective: string;
  youtubeLink?: string;
  courseMaterial?: File | undefined;
  subjects: ISubject[];
  courseMaterialKey?: string;
}

export interface IEnrichedCourseData extends ICourseData {
  studentCount: number;
  instructorName: string;
}

export interface ICourseDataMany {
  courses: ICourseData[];
}

export interface IEnrichedCourseDataGetRequest {
  courses: IEnrichedCourseData[];
}

export interface ICourseDataSingle {
  course: ICourseData;
}
// * __________ COURSE DATA TYPES END ________

// * __________INSTRUCTOR-COURSE ENTROLLMENT DATA TYPES START __________
export interface IEnrolledInstructorCourseData {
  courseIds: string[];
  instructorId: string;
}
export interface IEnrolledStudentCourseData {
  courseId: string;
  studentId: string;
}

// * __________INSTRUCTOR-COURSE ENTROLLMENT DATA TYPES END ________

// * __________QUESTION DATA TYPES START __________
export interface IQuestionsGetRequestPayloadData {
  questions: IParsedQuestionsData[];
}
// * __________QUESTION DATA TYPES END __________

// * __________QUIZ DATA TYPES START __________
export interface IQuizData {
  quizQuestions: IParsedQuestionsData[] | [];
  quizName: string;
  additionalNotesOrInstructions?: string;
  course: string;
  subject: string;
  topic: string;
  type: string;
  numberOfQuestions?: number;
  difficultyLevel: string;
  id?: string;
}

export interface IQuizGetRequestPayloadData {
  message: string;
  quizzes: IQuizData[];
}

// * __________QUIZ DATA TYPES END ________

// * __________EXAM DATA TYPES START __________
export interface IExamData {
  id?: string;
  examQuestions: IParsedQuestionsData[] | [];
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

export interface IExamGetRequestPayloadData {
  message: string;
  exams: IExamData[];
}

// * __________EXAM DATA TYPES END ________

// * __________ANALYTICS DATA TYPES START __________
export interface InstituteAnalyticsData {
  instituteId: string;
  totalCourses: number;
  totalStudents: number;
  totalExams: number;
  totalInstructors: number;
}
// * __________ANALYTICS DATA TYPES END ________

// * __________UPLOAD FILE TYPES START __________

export interface IUploadFilesRequestPayloadData {
  files: File[];
  uploadMeta: {
    folder: string;
    subDirectory: "student" | "instructor" | "institution";
  };
}
