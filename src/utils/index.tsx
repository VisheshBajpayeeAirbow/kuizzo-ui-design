import EssayQuestionForm from "@/components/ui/Molecules/dashboard/questions/present/EssayQuestionForm";
import FillInTheBlanksQuestionForm from "@/components/ui/Molecules/dashboard/questions/present/FillInTheBlanksQuestionForm";
import McqQuestionForm from "@/components/ui/Molecules/dashboard/questions/present/McqQuestionForm";
import ShortAnswerQuestionForm from "@/components/ui/Molecules/dashboard/questions/present/ShortAnswerQuestionForm";
import TrueFalseQuestionForm from "@/components/ui/Molecules/dashboard/questions/present/TrueFalseQuestionForm";
import StudentEssayQuestion from "@/components/ui/Molecules/dashboard/questions/presentToStudent/StudentEssayQuestion";
import StudentFillInTheBlanksQuestion from "@/components/ui/Molecules/dashboard/questions/presentToStudent/StudentFillInTheBlanksQuestion";
import StudentMcqQuestion from "@/components/ui/Molecules/dashboard/questions/presentToStudent/StudentMcqQuestion";
import StudentShortQuestion from "@/components/ui/Molecules/dashboard/questions/presentToStudent/StudentShortQuestion";
import StudentTrueFalseQuestion from "@/components/ui/Molecules/dashboard/questions/presentToStudent/StudentTrueFalseQuestion";
import { PATHS } from "@/constants";
import { CourseSliceInitialState } from "@/features/courseSlice/courseSlice";
import {
  IAnswerPayload,
  IEvaluationResult,
  IParsedQuestionsData,
  ISession,
} from "@/types";
import { ICourseData } from "@/types/api";
import { type ClassValue, clsx } from "clsx";
import NextCrypto from "next-crypto";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * toCapitalCase
 *
 * Takes a string and capitalizes the first letter of each word in the string.
 * The rest of the letters in each word are converted to lower case.
 *
 * @param str - The string to capitalize.
 * @returns The capitalized string.
 */
export const toCapitalCase = (str: string): string => {
  // Split the string into an array of words.
  const words = str.split(" ");
  // Initialize an empty array to store the capitalized words.
  const capitalizedWords: string[] = [];

  // For each word in the words array...
  for (const word of words) {
    // Get the first letter of the word and convert it to upper case.
    const firstLetter = word.charAt(0).toUpperCase();
    // Get the rest of the letters in the word and convert them to lower case.
    const restOfWord = word.slice(1).toLowerCase();
    // Combine the capitalized first letter and the lower cased rest of the word.
    const capitalizedWord = firstLetter + restOfWord;
    // Add the capitalized word to the capitalizedWords array.
    capitalizedWords.push(capitalizedWord);
  }

  // Join the capitalizedWords array into a string with spaces in between each word.
  const capitalizedString = capitalizedWords.join(" ");
  // Return the capitalized string.
  return capitalizedString;
};

/**
 * authRedirection
 *
 * This function determines the appropriate redirect path based on the user's role.
 *
 * @param {string} role - The user's role ("institution", "instructor", or "student").
 * @return {string} The path to redirect the user to.
 */
export const authRedirection = (
  role: "institution" | "instructor" | "student"
) => {
  // Check if the user's role is "instructor".
  if (role === "instructor") {
    // If the user is an instructor, redirect them to the instructor dashboard.
    return PATHS.instructorDashboard;
  }
  // Check if the user's role is "student".
  else if (role === "student") {
    // If the user is a student, redirect them to the student dashboard.
    return PATHS.studentDashboard;
  }
  // If the user's role is neither "instructor" nor "student", redirect them to the institution dashboard.
  else {
    return PATHS.institutionDashboard;
  }
};

/**
 * renderButtonColorByRole
 *
 * This function takes in a user's role and renders a corresponding button color.
 *
 * @param {string} role - The user's role, which can be "instructor", "student", or "institution".
 * @return {string} The color of the button to render.
 */
export const renderButtonColorByRole = (
  role: "instructor" | "student" | "institution"
) => {
  // Check the user's role and return the corresponding button color.
  switch (role) {
    // If the user is an instructor, render a button with a plain orange color.
    case "instructor":
      return "plainOrange";
    // If the user is a student, render a button with a green color.
    case "student":
      return "green";
    // If the user is an institution, render a button with a purple color.
    default:
      return "purple";
  }
};

/**
 * renderTextColorBasedOnRole
 *
 * This function takes in a user's role and returns a class name that can be
 * used to set the text color of an element based on the user's role.
 *
 * The function takes in a role, which can be one of the following:
 * - "institution"
 * - "instructor"
 * - "student"
 *
 * The function returns a class name that can be used to set the text color of
 * an element. The class name is based on the user's role, and is one of the
 * following:
 * - "text-app-orange" for instructors
 * - "text-app-green" for students
 * - "text-app-purple" for institutions
 *
 * @param {string} role - The user's role, which can be "institution", "instructor", or "student".
 * @return {string} The class name to use to set the text color based on the user's role.
 */
export const renderTextColorBasedOnRole = (
  role: "institution" | "instructor" | "student"
): string => {
  switch (role) {
    case "instructor":
      // If the user is an instructor, return the class name to use to set the
      // text color to orange.
      return "text-app-orange";

    case "student":
      // If the user is a student, return the class name to use to set the text
      // color to green.
      return "text-app-green";

    default:
      // If the user is an institution, return the class name to use to set the
      // text color to purple.
      return "text-app-purple";
  }
};

/**
 * getAccentColorByRole
 *
 * This function takes in a user's role and the type of accent color to return,
 * and returns the corresponding accent color.
 *
 * If the user's role is "instructor", the function returns either the background
 * or text color for the instructor accent color, depending on the value of the
 * "type" argument.
 *
 * If the user's role is "student", the function returns either the background or
 * text color for the student accent color, depending on the value of the "type"
 * argument.
 *
 * If the user's role is not "instructor" or "student", the function returns either
 * the background or text color for the institution accent color, depending on the
 * value of the "type" argument.
 *
 * @param {string} role - The user's role, which can be "instructor", "student", or
 * "institution".
 * @param {string} type - The type of accent color to return, which can be either
 * "background" or "text".
 * @return {string} The accent color to render.
 */
export const getAccentColorByRole = (
  role: "instructor" | "student" | "institution",
  type: "background" | "text"
) => {
  switch (role) {
    case "instructor":
      // If the user is an instructor, return either the background or text color
      // for the instructor accent color, depending on the value of the "type"
      // argument.
      return type === "background" ? "bg-app-orange" : "text-app-orange";
    case "student":
      // If the user is a student, return either the background or text color for
      // the student accent color, depending on the value of the "type" argument.
      return type === "background" ? "bg-app-green" : "text-app-green";
    default:
      // If the user's role is not "instructor" or "student", return either the
      // background or text color for the institution accent color, depending on
      // the value of the "type" argument.
      return type === "background" ? "bg-app-purple" : "text-app-purple";
  }
};

/**
 * generateAuthorizationHeaderValue
 *
 * This function takes in a user session and returns an authorization header
 * value that can be used to determine whether the user is authorized to access
 * a particular resource.
 *
 * If the user is logged in (i.e. the session is not undefined and the user
 * property of the session is not null), the function returns "allow".
 *
 * If the user is not logged in (i.e. the session is undefined), the function
 * returns "unauthorized".
 *
 * @param {ISession | undefined} session - The user's session.
 * @return {string} The authorization header value.
 */
export const generateAuthorizationHeaderValue = (
  session: undefined | ISession
) => {
  if (session && session.user) {
    // If the user is logged in, return "allow".
    return "allow";
  } else if (session === undefined) {
    // If the user is not logged in, return "unauthorized".
    return "unauthorized";
  }
};

/**
 * isValidTimeRange
 *
 * This function takes two strings representing times and determines if the
 * first time is earlier than the second time. It returns true if the first time
 * is earlier and false otherwise.
 *
 * @param {string} fromTime - A string representing the first time.
 * @param {string} toTime - A string representing the second time.
 * @return {boolean} Whether the first time is earlier than the second time.
 */
export const isValidTimeRange = (fromTime: string, toTime: string): boolean => {
  // Split the strings into arrays of strings and then convert them to numbers.
  // The first element of the array is the hour and the second element of the
  // array is the minute.
  const [fromHours, fromMinutes] = fromTime.split(":").map(Number);
  const [toHours, toMinutes] = toTime.split(":").map(Number);

  // Check if the first time is earlier than the second time.
  // If the first time has a smaller hour, then the first time is earlier
  // than the second time.
  if (fromHours < toHours) {
    return true;
  }
  // If the first time has the same hour as the second time, then check if
  // the first time has a smaller minute. If it does, then the first time is
  // earlier than the second time.
  else if (fromHours === toHours && fromMinutes < toMinutes) {
    return true;
  }
  // If the first time has the same hour and minute as the second time, then
  // the first time is not earlier than the second time.
  else {
    return false;
  }
};

const LOCAL_STORAGE_KEY = "institutionFormData";

interface FormData {
  [key: string]: any;
}

/**
 * This function updates the form data stored in the browser's local storage.
 *
 * @param {string} section - The section of the form data to update.
 * @param {any} data - The new data to store in the form data.
 * @param {boolean} [remove=false] - Whether to remove the section from the form data. Defaults to false.
 * @return {void} This function does not return anything.
 */
export const updateLocalStorageFormData = (
  section: string,
  data: any,
  remove: boolean = false
): void => {
  // Retrieve the form data stored in the browser's local storage, or an empty object if no data is stored.
  const storedData: FormData = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY) || "{}"
  );

  // If the remove flag is true, delete the specified section from the stored data.
  // Otherwise, update the specified section with the new data.
  if (remove) {
    delete storedData[section];
  } else {
    storedData[section] = data;
  }

  // Update the form data stored in the browser's local storage with the updated data.
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedData));
};

/**
 * Retrieves the form data stored in the browser's local storage for a given section.
 *
 * @param {string} section - The section of the form data to retrieve.
 * @return {any} The form data stored in the browser's local storage for the specified section, or `undefined` if no data is stored.
 */
export const getLocalStorageFormData = (section: string): any => {
  // Retrieve the form data stored in the browser's local storage, or an empty object if no data is stored.
  const storedData: FormData = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY) || "{}"
  );

  // Return the specified section of the stored data, or undefined if the section does not exist.
  return storedData[section];
};

export const clearLocalStorageFormData = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

/**
 * Converts a file to a Base64 encoded string.
 *
 * @param {File} file - The file to convert.
 * @return {Promise<string>} A promise that resolves with the Base64 encoded string,
 * or rejects with an error if the file cannot be read.
 */
export const fileToBase64 = (file: File): Promise<string> => {
  // Create a new Promise that will be resolved with the Base64 string, or rejected with an error.
  return new Promise((resolve, reject) => {
    // Create a new FileReader object, which will read the file asynchronously.
    const reader = new FileReader();

    // Define a callback function to be executed when the FileReader finishes loading the file.
    reader.onloadend = () => {
      // Check if the FileReader was able to read the file.
      if (reader.result) {
        // Split the Base64 string into an array of two elements, with the first element being the data URL prefix.
        // We only need the second element, which is the actual Base64 string.
        const base64String = (reader.result as string).split(",")[1];

        // Resolve the Promise with the Base64 string.
        resolve(base64String);
      } else {
        // If the FileReader failed to read the file, reject the Promise with an error.
        reject(new Error("Failed to read file"));
      }
    };

    // Define a callback function to be executed if there is an error while reading the file.
    reader.onerror = () => {
      // Reject the Promise with an error.
      reject(new Error("Failed to read file"));
    };

    // Read the file as a data URL, which includes the Base64 string and the file's MIME type.
    reader.readAsDataURL(file);
  });
};

/**
 * This function transforms the state of the course form into a format that can be sent to the server.
 * It takes in the current state of the form and the ID of the institute the course belongs to.
 * It then maps through the subjects, topics, and modules in the state and creates a new object with the transformed data.
 * The transformed data includes the institute ID, the course name and description, the course objective, the YouTube link,
 * the course material (as a Base64 encoded string), and the subjects (with their topics and modules).
 *
 * @param {CourseSliceInitialState} state - The current state of the course form.
 * @param {string} instituteId - The ID of the institute the course belongs to.
 * @return {Promise<ICourseData>} A promise that resolves with the transformed course data.
 */

export const transformCourseState = async (
  state: CourseSliceInitialState,
  instituteId: string
): Promise<ICourseData> => {
  // Log the state before transformation for debugging purposes
  console.log("State before transformation: ", state);

  // Destructure the subjects, topics, and modules from the state
  const { subjects } = state.createSubjectForm;
  const { topics } = state.createTopicForm;
  const { modules } = state.createModuleForm;
  console.log("Modules: ", modules);

  // Convert the course material to a Base64 encoded string if it exists
  const courseMaterialBase64 = state.createCourseForm.courseMaterials;

  // Map through the subjects and create a new object with the transformed data
  const subjectsWithTopics = subjects.map((subject) => {
    // Get the topics related to the current subject
    const relatedTopics = topics
      .filter((topic) => topic.selectedSubject === subject.subjectName)
      .map((topic) => {
        // Get the modules related to the current topic

        const relatedModules = modules
          .filter((module) => module.selectedTopic === topic.topicName)
          .map((module) => ({
            moduleName: module.moduleName,
            moduleDescription: module.moduleDescription,
          }));

        // Return the topic with the related modules only if relatedModules is not empty
        return {
          topicName: topic.topicName,
          topicDescription: topic.topicDescription,
          ...(relatedModules.length > 0 && { modules: relatedModules }),
        };
      });

    // Return the subject with the topics field only if relatedTopics is not empty
    return {
      subjectName: subject.subjectName,
      subjectDescription: subject.subjectDescription,
      ...(relatedTopics.length > 0 && { topics: relatedTopics }),
    };
  });

  // Log the transformed subjects with topics for debugging purposes
  console.log("SUBJECTS WITH TOPICS: ", subjectsWithTopics);

  // Wait for all asynchronous operations to complete before returning the final object
  return {
    instituteId, // The ID of the institute the course belongs to
    courseName: state.createCourseForm.courseName, // The name of the course
    courseDescription: state.createCourseForm.courseDescription, // The description of the course
    courseObjective: state.createCourseForm.courseObjective, // The objective of the course
    youtubeLink: state.createCourseForm.youtubeUrl, // The YouTube link for the course
    courseMaterial: courseMaterialBase64,
    subjects: subjectsWithTopics, // The subjects with their topics and modules
  };
};

/**
 * This function takes in the transformed course data and returns the initial state of the course form.
 * It maps through the subjects, topics, and modules in the transformed data and creates a new object with the initial state data.
 *
 * @param {ICourseData} courseData - The transformed course data.
 * @return {CourseSliceInitialState} The initial state of the course form.
 */
export const reverseTransformCourseState = (
  courseData: ICourseData
): CourseSliceInitialState => {
  // Create the initial state for the createSubjectForm
  const createSubjectForm = {
    subjects: courseData.subjects.map((subject) => ({
      // Extract the subject name and description from the transformed data
      subjectName: subject.subjectName,
      subjectDescription: subject.subjectDescription,
    })),
  };

  // Create the initial state for the createTopicForm
  const createTopicForm = {
    topics: courseData.subjects.flatMap((subject) =>
      // Map through the topics related to each subject
      (subject.topics ?? []).map((topic) => ({
        // Extract the topic name, description, and selected subject from the transformed data
        topicName: topic.topicName,
        topicDescription: topic.topicDescription,
        selectedSubject: subject.subjectName,
      }))
    ),
  };

  // Create the initial state for the createModuleForm
  const createModuleForm = {
    modules: courseData.subjects.flatMap((subject) =>
      // Map through the topics related to each subject
      (subject.topics ?? []).flatMap((topic) =>
        // Map through the modules related to each topic
        (topic.modules ?? []).map((module) => ({
          // Extract the module name, description, and selected topic from the transformed data
          moduleName: module.moduleName,
          moduleDescription: module.moduleDescription,
          selectedTopic: topic.topicName,
        }))
      )
    ),
  };

  // Create the initial state for the createCourseForm
  const createCourseForm = {
    courseName: courseData.courseName,
    courseDescription: courseData.courseDescription,
    courseObjective: courseData.courseObjective,
    youtubeUrl: courseData.youtubeLink,
    courseMaterials: courseData.courseMaterial,
  };

  // Determine if any topics exist in the transformed data
  const topicsExist = courseData.subjects.some(
    (subject) => (subject.topics ?? []).length > 0
  );

  // Determine if any modules exist in the transformed data
  const modulesExist = courseData.subjects.some((subject) =>
    (subject.topics ?? []).some((topic) => (topic.modules ?? []).length > 0)
  );

  // Return the initial state of the course form with all the necessary data
  return {
    createSubjectForm,
    createTopicForm,
    createModuleForm,
    createCourseForm,
    activeStep: "course",
    topicsExist,
    modulesExist,
  };
};

/**
 * This function generates a unique password for a user based on their username.
 *
 * @param {string} username - The username of the user.
 * @returns {string} - The generated password, which is a combination of the first three characters of the username and a random 4-digit number.
 */
export const generateUniquePassword = (username: string) => {
  // Extract the first three characters of the username
  const firstThreeChars = username.slice(0, 3);

  // Generate a random 4-digit number between 1000 and 9999
  const randomFourDigits = Math.floor(1000 + Math.random() * 9000);

  // Concatenate the first three characters of the username and the random 4-digit number to form the password
  const password = firstThreeChars + randomFourDigits;

  // Return the generated password
  return password;
};

export const renderQuestionsBasedOnType = (
  questionToBeMapped: IParsedQuestionsData,
  formCategory: "exam" | "quiz"
) => {
  /**
   * This function takes in a parsed question object and the category of the form (exam or quiz).
   * It renders the correct type of question based on the type of question the parsed question object is.
   * The rendered question is wrapped in a form component that includes the id of the question, the correct answer,
   * the options, the question text, and the form category.
   * This is necessary because the question types are different and need to be handled differently.
   */
  const { question, correctAnswer, options, type, keywords, id } =
    questionToBeMapped;

  /**
   * Switch statement that renders the correct type of question based on the type of question the parsed question object is.
   */
  switch (type) {
    case "mcq":
      /**
       * Render an MCQ question form if the type of the question is "mcq".
       * The form includes the id of the question, the correct answer, the options, the question text, and the form category.
       */
      return (
        <McqQuestionForm
          id={id}
          correctAnswer={correctAnswer as string}
          options={options as string}
          question={question}
          formCategory={formCategory}
        />
      );
    case "true/false":
      /**
       * Render a true/false question form if the type of the question is "true/false".
       * The form includes the id of the question, the correct answer, the question text, and the form category.
       */
      return (
        <TrueFalseQuestionForm
          id={id}
          question={question}
          correctAnswer={correctAnswer as string}
          formCategory={formCategory}
        />
      );

    case "short-answer":
      /**
       * Render a short answer question form if the type of the question is "short-answer".
       * The form includes the id of the question, the keywords, the question text, and the form category.
       */
      return (
        <ShortAnswerQuestionForm
          id={id}
          keyWords={keywords as string}
          question={question}
          formCategory={formCategory}
        />
      );

    case "essay":
      /**
       * Render an essay question form if the type of the question is "essay".
       * The form includes the id of the question, the keywords, the question text, and the form category.
       */
      return (
        <EssayQuestionForm
          id={id}
          keyWords={keywords as string}
          question={question}
          formCategory={formCategory}
        />
      );

    case "fill-in-the-blanks":
      /**
       * Render a fill-in-the-blanks question form if the type of the question is "fill-in-the-blanks".
       * The form includes the id of the question, the correct answer, the question text, and the form category.
       */
      return (
        <FillInTheBlanksQuestionForm
          id={id}
          question={question}
          correctAnswer={correctAnswer as string}
          formCategory={formCategory}
        />
      );
  }
};

export const generateUsername = (title: string, alias: string): string => {
  // Take the title provided as an argument, and convert it to lowercase. This is
  // because usernames are typically case-insensitive, and we want to ensure that
  // the generated username is also case-insensitive.
  const cleanTitle = title.toLowerCase();

  // Remove any non-alphanumeric characters from the title. This is because
  // usernames should only contain letters and numbers, and we want to ensure that
  // the generated username is valid.
  const alphanumericTitle = cleanTitle.replace(/[^a-z0-9]/g, "");

  // Generate a unique username by appending a random number to the
  // alphanumeric title. This is because we want each generated username to be
  // unique, even if the input titles are the same.
  const username = `${alias}_${alphanumericTitle}_${Math.floor(
    Math.random() * 1000
  )}`;

  // Return the generated username.
  return username;
};

/**
 * Copies a given text string to the user's system clipboard.
 *
 * This function uses the `navigator.clipboard` API to write the given text to the clipboard.
 * If the operation is successful, it will display a success toast message.
 * If the operation fails, it will log an error message to the console.
 *
 * @param text The text string to be copied to the clipboard.
 */
export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    /**
     * Attempt to write the given text to the user's system clipboard.
     * This method returns a Promise that resolves when the text has been successfully written to the clipboard.
     */
    await navigator.clipboard.writeText(text);

    /**
     * If the text has been successfully written to the clipboard, display a success toast message.
     */
    toast.success("Copied to clipboard");
  } catch (error) {
    /**
     * If the operation fails, log an error message to the console.
     * This will include the error that was thrown by the `writeText` method.
     */
    console.error("Failed to copy to clipboard:", error);
  }
};

// This function demonstrates how to encrypt and decrypt sensitive information
// using the NextCrypto library.
//
// The idea is that when a user logs in, the server will send a configuration
// object to the client, which will be stored in cookies or local storage.
// This object will contain information about the user's role and any limitations
// that come with that role (e.g. number of students, number of exams, etc.).
//
// To prevent tampering with this object, we will encrypt it before storing
// it in the user's browser. This way, even if a malicious user tries to modify
// the object, the changes will be detectable because the encryption will fail.
export const getEncryptedObject = async () => {
  // Create a new instance of NextCrypto, passing in the encryption key
  // from the environment variables.
  const crypto: NextCrypto = new NextCrypto(
    process.env.ENCRYPTION_KEY as string
  );

  // This is the object that we want to encrypt. It contains some example
  // data that might be used to configure the user's experience.
  const objectToBeEncrypted: any = {
    id: "21309i1djoi",
    roleId: 0,
    roleName: "institution",
    roleDescription: "Institution role for free plan",
    plan: "free",
    configuration: {
      numberOfStudents: 100,
      numberOfExams: 4,
      numberOfCourses: 30,
      numberOfAds: 0,
      trailPeriod: true,
    },
  };

  // Encrypt the object using the encrypt method of NextCrypto.
  // This will return a string that represents the encrypted data.
  const encryptedData = await crypto.encrypt(
    JSON.stringify(objectToBeEncrypted)
  );

  // If the encryption was successful, log the encrypted data to the console.
  if (encryptedData) {
    console.log("ENCRYPTED DATA: ", encryptedData);

    // Decrypt the data using the decrypt method of NextCrypto.
    // This will return the original object as a string.
    const decryptedData = await crypto.decrypt(encryptedData);

    // If the decryption was successful, log the decrypted data to the console.
    if (decryptedData) {
      console.log("DECRYPTED DATA: ", JSON.parse(decryptedData));
    }
  }
};

export const convertTimeToStringFormat = (time: string) => {
  // Split the time string into minutes and seconds using the colon (:) as the separator.
  // The result will be an array with two elements: minutes and seconds.
  const [minutes, seconds] = time.split(":");

  // Return a string that represents the time in the desired format.
  // The format is "X Min Y Sec" where X is the number of minutes and Y is the number of seconds.
  return `${minutes} Hour ${seconds} Min`;
};

/**
 * Returns the current year as a number.
 *
 * This function uses the Date object to get the current year.
 * The Date object is a built-in JavaScript object that stores the current date and time.
 * The getFullYear() method of the Date object returns the year as a number.
 * For example, if the current year is 2022, this function will return 2022.
 *
 * @returns The current year as a number.
 */
export const getCurrentYear = () => {
  return new Date().getFullYear();
};

export const renderCellClassName = (cell: any) => {
  // Get the value of the cell that we're currently rendering.
  const cellValue = cell.getValue();

  // Get the context of the cell that we're currently rendering.
  // The context contains information about the column that the cell is in.
  const cellContext = cell.getContext();

  // Get the ID of the column that the cell is in.
  // The ID is used to identify the column in the table.
  const columnId = cellContext.column.id;

  // If the value of the cell is false and the column ID is not "actions",
  // then we want to render the cell with a red background.
  if (cellValue === false && columnId !== "actions") {
    // The dark:bg-red-500 class sets the background color of the cell to red
    // when the table is in dark mode.
    // The bg-red-200 class sets the background color of the cell to a light red
    // when the table is in light mode.
    return "dark:bg-red-500 bg-red-500";
  }

  // If the value of the cell is true, then we want to render the cell with a green background.
  if (cellValue === true) {
    // The dark:bg-green-500 class sets the background color of the cell to green
    // when the table is in dark mode.
    // The bg-green-500 class sets the background color of the cell to green when
    // the table is in light mode.
    return "dark:bg-green-500 bg-green-500";
  }

  // If none of the above conditions are met, then we don't want to add any
  // classes to the cell, so we return an empty string.
  return "";
};

/**
 * This function takes in a question object and renders the correct component
 * for that question type. The rendered component is a child of the
 * StudentQuestionsAssessmentPage component.
 *
 * @param {IParsedQuestionsData} question - The question object to render.
 * @returns {JSX.Element} - The rendered question component.
 */
export const renderQuestion = (question: IParsedQuestionsData) => {
  // We use a switch statement to determine which component to render
  // based on the type of the question.
  switch (question.type) {
    // If the question is a multiple choice question, then we render
    // the StudentMcqQuestion component.
    case "mcq":
      return (
        <StudentMcqQuestion
          // We pass in the question ID as a prop to the component.
          key={question.id}
          // We pass in the question ID as a prop to the component.
          questionId={question.id}
          // We pass in the question text as a prop to the component.
          question={question.question}
          // We pass in the options as a prop to the component.
          options={question.options as string}
          // We pass in the correct answer as a prop to the component.
          correctAnswer={question.correctAnswer as string}
        />
      );

    // If the question is a short answer question, then we render
    // the StudentShortQuestion component.
    case "short-answer":
      return (
        <StudentShortQuestion
          // We pass in the question ID as a prop to the component.
          key={question.id}
          // We pass in the question ID as a prop to the component.
          questionId={question.id}
          // We pass in the keywords as a prop to the component.
          keywords={question.keywords as string}
          // We pass in the question text as a prop to the component.
          question={question.question}
        />
      );

    // If the question is an essay question, then we render
    // the StudentEssayQuestion component.
    case "essay":
      return (
        <StudentEssayQuestion
          // We pass in the question ID as a prop to the component.
          key={question.id}
          // We pass in the question ID as a prop to the component.
          questionId={question.id}
          // We pass in the question text as a prop to the component.
          question={question.question}
          // We pass in the keywords as a prop to the component.
          keywords={question.keywords as string}
        />
      );

    // If the question is a true/false question, then we render
    // the StudentTrueFalseQuestion component.
    case "true/false":
      return (
        <StudentTrueFalseQuestion
          // We pass in the question ID as a prop to the component.
          key={question.id}
          // We pass in the question ID as a prop to the component.
          questionId={question.id}
          // We pass in the question text as a prop to the component.
          question={question.question}
          // We pass in the correct answer as a prop to the component.
          correctAnswer={question.correctAnswer as string}
        />
      );

    // If the question is a fill-in-the-blanks question, then we render
    // the StudentFillInTheBlanksQuestion component.
    case "fill-in-the-blanks":
      return (
        <StudentFillInTheBlanksQuestion
          // We pass in the question ID as a prop to the component.
          key={question.id}
          // We pass in the question ID as a prop to the component.
          questionId={question.id}
          // We pass in the question text as a prop to the component.
          question={question.question}
          // We pass in the correct answer as a prop to the component.
          correctAnswer={question.correctAnswer as string}
        />
      );

    // If the question type is not recognized, then we return null.
    default:
      return null;
  }
};

export const evaluateTestAnswers = (
  answers: IAnswerPayload[]
): IEvaluationResult => {
  // First, we initialize some variables that will be used
  // to calculate the results of the test.
  //
  // The maximum marks for each question is 5.
  const maxMarks = 5;

  // The total number of questions is the length of the answers array.
  let totalQuestions = answers.length;

  // The number of correct answers is 0 initially.
  let correctAnswers = 0;

  // The number of wrong answers is 0 initially.
  let wrongAnswers = 0;

  // We then loop through each question in the answers array.
  answers.forEach(({ answer, correctAnswer, keywords }) => {
    // If the question has keywords, then we evaluate it
    // as a short-answer or essay question.
    if (keywords) {
      // We split the keywords string into an array of individual
      // keywords.
      const keywordList = keywords.split(",");

      // We convert the answer to lowercase so that we can compare
      // it to the keywords.
      const answerLower = answer.toLowerCase();

      // We then count the number of keywords that are present in
      // the answer.
      const keywordCount = keywordList.reduce((count, keyword) => {
        // If the answer contains the keyword, then we increment the count.
        return answerLower.includes(keyword.toLowerCase()) ? count + 1 : count;
      }, 0);

      // We then calculate the fraction marks for the question.
      // The fraction marks is the number of keywords present in the
      // answer divided by the total number of keywords.
      const obtainedMarks = (keywordCount / keywordList.length) * maxMarks;

      // If the number of keywords present in the answer is equal to
      // the total number of keywords, then we increment the correct
      // answers count. Otherwise, we increment the wrong answers count.
      if (keywordList.length === keywordCount) {
        correctAnswers++;
      } else {
        wrongAnswers++;
      }

      // If the question does not have keywords, then we evaluate it
      // as a multiple-choice or other type of question.
    } else {
      // We simply check if the answer matches the correct answer.
      if (answer.trim() === correctAnswer?.trim()) {
        // If the answer matches the correct answer, then we increment
        // the correct answers count.
        correctAnswers++;
      } else {
        // If the answer does not match the correct answer, then we
        // increment the wrong answers count.
        wrongAnswers++;
      }
    }
  });

  // Finally, we calculate the percentage score of the test.
  // The percentage score is the number of correct answers divided
  // by the total number of questions, multiplied by 100.
  const percentage = (correctAnswers / totalQuestions) * 100;

  // We return an object that contains the total number of questions,
  // the number of correct answers, the number of wrong answers, and
  // the percentage score.
  return {
    totalQuestions,
    correctAnswers,
    wrongAnswers,
    percentage,
  };
};

/**
 * Extracts the S3 file path from an upload URL.
 * @param uploadUrl - The full upload URL.
 * @returns The file path from the upload URL, excluding query parameters.
 */
export const getFilePathFromUrl = (uploadUrl: string): string => {
  return uploadUrl.split("/").slice(3).join("/").split("?")[0];
};
