import * as yup from "yup";

export const institutionSignupSchema = yup.object().shape({
  username: yup.string().required("First name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  phone: yup.string(),
  address: yup.string().required("Address is required"),
  slug: yup.string().required("Slug is required"),
  instituteName: yup.string().required("Institute Name is required"),
});

export const instructorSignupSchema = yup.object().shape({
  username: yup.string().required("First name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  phone: yup.string(),
});

export const studentSignupSchema = yup.object().shape({
  username: yup.string().required("First name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  phone: yup.string(),
  dob: yup.date().required(),
});

export const radioSchema = yup.object().shape({
  role: yup.string().required(),
});

export const loginSchema = yup.object().shape({
  username: yup.string().required("username is requried"),
  password: yup
    .string()
    .required("password is required")
    .min(6, "min 6 characters"),
});

// page forms
export const institutionContactUsSchema = yup.object().shape({
  username: yup.string().required("Name is required"),
  email: yup.string().email("enter valid email").required("email is required"),
  subject: yup.string().required("subject is required"),
  question: yup.string().required("question is required"),
});

// institution dashboard forms

export const EditHeroSectionFormSchema = yup.object().shape({
  heroImage: yup.mixed(),
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  address: yup.string().required("Address is required"),
  instituteUrl: yup.string().required("Url name is required"),
  // phone is handled using component state
});

export const EditCounterSectionFormSchema = yup.object().shape({
  titleOne: yup.string().required("Title is required"),
  countOne: yup.number().required("Count is required"),
  titleTwo: yup.string().required("Title is required"),
  countTwo: yup.number().required("Count is required"),
  titleThree: yup.string().required("Title is required"),
  countThree: yup.number().required("Count is required"),
  hidden: yup.string().required("Hidden flag is required"),
});

export const EditAboutUsFormSchema = yup.object().shape({
  aboutUsImageOne: yup.mixed(),
  aboutUsImageTwo: yup.mixed(),
  title: yup.string().required("Title is required"),
  description: yup.string().required("Decsription is required"),
  hidden: yup.string().required("Hidden flag is required"),
});

export const addIndividualStudentFormSchema = yup.object().shape({
  studentName: yup.string().required("Student Name is required"),
  // username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  course: yup.string().required("Course is required"),
  instructor: yup.string().required("Instructor is required"),
});

export const addInstructorFormSchema = yup.object().shape({
  instructorName: yup.string().required("Instructor Name is required"),

  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  // course used from multi select
  // course: yup.string().required("Course is required"),
  image: yup.mixed(),
});

export const addMaterialsToCourseSchema = yup.object().shape({
  courseName: yup.string().required("Course Name is required"),
  subject: yup.string().required("Subject is required"),
  topic: yup.string().required("Topic is required"),
  module: yup.string().required("Module is required"),
  courseMaterial: yup.mixed().required("Course Material is required"),
  youtubeUrl: yup.string().required("Youtube Url is required"),
});

export const coursesFormSchema = yup.object().shape({
  courseName: yup.string().required("Course Name is required"),
  courseDescription: yup.string().required("Course Description is required"),
  courseObjective: yup.string().required("Course Objective is required"),
  youtubeUrl: yup.string(),
  courseMaterials: yup.mixed(),
});

export const courseSubjectFormSchema = yup.object().shape({
  subjects: yup
    .array()
    .of(
      yup.object().shape({
        subjectName: yup.string().required("Subject Name is required"),
        subjectDescription: yup
          .string()
          .required("Subject Description is required"),
      })
    )
    .required("At least one form is required"),
});

export const courseTopicFormSchema = yup.object().shape({
  topics: yup
    .array()
    .of(
      yup.object().shape({
        topicName: yup.string().required("Topic Name is required"),
        topicDescription: yup
          .string()
          .required("Topic Description is required"),
        selectedSubject: yup.string().required("Subject is required"), // Added validation for selectedSubject
      })
    )
    .required("At least one topic is required")
    .min(1, "At least one topic is required"),
});

export const courseModuleFormSchema = yup.object().shape({
  modules: yup
    .array()
    .of(
      yup.object().shape({
        moduleName: yup.string().required("Module Name is required"),
        moduleDescription: yup
          .string()
          .required("Module Description is required"),
        selectedTopic: yup.string().required("Topic is required"), // Added validation for selectedTopic
      })
    )
    .required("At least one module is required"),
});

export const generateQuizFormSchema = yup.object().shape({
  notesMaterial: yup.mixed(),
  syllabusMaterial: yup.mixed(),
  pastQuizMaterial: yup.mixed(),
  quizName: yup.string().required("Quiz Name is required"),
  additionalNotesOrInstructions: yup.string(),
  course: yup.string().required("Course is required"),
  subject: yup.string().required("Subject is required"),
  topic: yup.string().required("Topic is required"),
  type: yup.string().required("Type is required"),
  difficultyLevel: yup.string().required("Difficulty level is required"),
});

export const generateExamFormSchema = yup.object().shape({
  notesMaterial: yup.mixed(),
  syllabusMaterial: yup.mixed(),
  pastExamsMaterial: yup.mixed(),
  examName: yup.string().required("Exam Name is required"),
  additionalNotesOrInstructions: yup.string(),
  course: yup.string().required("Course is required"),
  subject: yup.string().required("Subject is required"),
  topic: yup.string().required("Topic is required"),
  numberOfQuestions: yup.string().required("Number of Questions is required"),
  difficultyLevel: yup.string().required("Difficulty level is required"),
  timeSlotFrom: yup.string().required("Start time required"),
  timeSlotTo: yup.string().required("End time required"),
  questionTypeMcq: yup.boolean(),
  questionTypeTrueFalse: yup.boolean(),
  questionTypeShortAnswer: yup.boolean(),
  questionTypeEssay: yup.boolean(),
  questionTypeFillInTheBlanks: yup.boolean(),
  examTime: yup.string(),
  customQuizTimeHour: yup.number(),
  customQuizTimeMin: yup.number(),
  questionTypeMcqCount: yup.number(),
  questionTypeTrueFalseCount: yup.number(),
  questionTypeShortAnswerCount: yup.number(),
  questionTypeEssayCount: yup.number(),
  questionTypeFillInTheBlanksCount: yup.number(),
});

export const mcqQuestionFormSchema = yup.object().shape({
  question: yup.string().required("Question is required"),
  optionOne: yup.string().required("Option one is required"),
  optionTwo: yup.string().required("Option two is required"),
  optionThree: yup.string().required("Option three is required"),
  optionFour: yup.string().required("Option four is required"),
  correctAnswer: yup.string().required("Correct answer is required"),
});

export const trueFalseQuestionFormSchema = yup.object().shape({
  question: yup.string().required("Question is required"),
  correctAnswer: yup.string().required("Correct answer is required"),
});

export const shortAnswerQuestionFormSchema = yup.object().shape({
  question: yup.string().required("Question is required"),
  keywords: yup.string().required("Keywords are required"),
});

export const essayQuestionFormSchema = yup.object().shape({
  question: yup.string().required("Question is required"),
  keywords: yup.string().required("Keywords are required"),
});

export const fillInTheBlanksQuestionFormSchema = yup.object().shape({
  question: yup.string().required("Question is required"),
  correctAnswer: yup.string().required("Correct answer is required"),
});

export const bulkStudentUploadFormSchema = yup.object().shape({
  addStudentCsv: yup.mixed().required("File is required"),
});
export const bulkInstructorUploadFormSchema = yup.object().shape({
  addInstructorCsv: yup.mixed().required("File is required"),
});

export const editTestimonialsFormSchema = yup.object().shape({
  testimonials: yup
    .array()
    .of(
      yup.object().shape({
        testimonialImage: yup.mixed(),
        title: yup.string().required("Subject Name is required"),
        testimonial: yup.string().required("Subject Description is required"),
        ratings: yup.number().required("Rating is requried"),
      })
    )
    .required("At least one form is required"),

  hidden: yup.string().required("Hidden flag is required"),
});

export const editFaqsFormSchema = yup.object().shape({
  faqs: yup
    .array()
    .of(
      yup.object().shape({
        title: yup.string().required("Subject Name is required"),
        description: yup.string().required("Subject Description is required"),
      })
    )
    .required("At least one form is required"),

  hidden: yup.string().required("Hidden flag is required"),
});

export const editInstructorPermissionsFormSchema = yup.object().shape({
  createCourse: yup.boolean().required(),
  createQuizAndExam: yup.boolean().required(),
  addStudents: yup.boolean().required(),
  addInstructor: yup.boolean().required(),
  billingAndPayments: yup.boolean().required(),
});

export const editStudentPermissionsFormSchema = yup.object().shape({
  createQuiz: yup.boolean().required(),
  createExam: yup.boolean().required(),
});

export const editInstructorDialogFormSchema = yup.object().shape({
  title: yup.string().required("Instructor Name cannot be empty"),
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  // courseId: yup.string().nullable().defined(),
  addInstructor: yup.boolean().required(),
  addStudents: yup.boolean().required(),
  createCourse: yup.boolean().required(),
  createQuizAndExam: yup.boolean().required(),
  billingAndPayments: yup.boolean().required(),
});

export const editStudentDialogFormSchema = yup.object().shape({
  title: yup.string().required("Student Name cannot be empty"),
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  courseId: yup.string().nullable().defined(),
  instructorId: yup.string().required("Instructor ID is required"),
  createExam: yup.boolean().required(),
  createQuiz: yup.boolean().required(),
});

export const editQuestionDialogFormSchema = yup.object().shape({
  question: yup.string().required("Question is required"),
  type: yup
    .string()
    .oneOf(["mcq", "true/false", "essay", "short-answer", "fill-in-the-blanks"])
    .required("Type is required"),
  correctAnswer: yup.string(),
  options: yup.string(),
  category: yup.string(),
  subCategory: yup.string(),
  keywords: yup.string(),
});

export const editQuizDialogFormSchema = yup.object().shape({
  quizName: yup.string().required("Quiz Name cannot be empty"),
  course: yup.string().required("Course Name cannot be empty"),
  subject: yup.string().required("Subject Name cannot be empty"),
});
export const editExamDialogFormSchema = yup.object().shape({
  examName: yup.string().required("Quiz Name cannot be empty"),
  course: yup.string().required("Course Name cannot be empty"),
  subject: yup.string().required("Subject Name cannot be empty"),
});
