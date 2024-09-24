import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/custom/tabs";
import StudentExamListPage from "@/_pages/Dashboard/Student/StudentExamListPage";
import StudentQuizListPage from "@/_pages/Dashboard/Student/StudentQuizListPage";
const StudentExamAndQuizList = () => {
  return (
    <div>
      <Tabs defaultValue="exam-list">
        <TabsList>
          <TabsTrigger value="exam-list">Exams</TabsTrigger>
          <TabsTrigger value="quiz-list">Quizes</TabsTrigger>
        </TabsList>
        <TabsContent value="exam-list">
          <StudentExamListPage />
        </TabsContent>
        <TabsContent value="quiz-list">
          <StudentQuizListPage />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentExamAndQuizList;
