import ExamListPage from "@/_pages/Dashboard/Institution/ExamListpage";
import QuizListPage from "@/_pages/Dashboard/Institution/QuizListPage";
import { options } from "@/app/api/auth/[...nextauth]/options";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/custom/tabs";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Quiz And Exam List",
  description: "Quiz And Exam List",
};

const QuizAndExamList = async () => {
  const session = await getServerSession(options);
  const instituteId: string = session?.user?.id;

  return (
    <div>
      <Tabs defaultValue="exam-list">
        <TabsList>
          <TabsTrigger value="exam-list">Exams</TabsTrigger>
          <TabsTrigger value="quiz-list">Quizes</TabsTrigger>
        </TabsList>
        <TabsContent value="exam-list">
          <ExamListPage instituteId={instituteId} />
        </TabsContent>
        <TabsContent value="quiz-list">
          <QuizListPage instituteId={instituteId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuizAndExamList;
