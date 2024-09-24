import { IQuestionsNavigationTabProps } from "@/types";
import { TfiControlBackward, TfiControlForward } from "react-icons/tfi";

const QuestionsNavigationTab = ({
  totalPages,
  currentPage,
  onPageChange,
}: IQuestionsNavigationTabProps & { currentPage: number }) => {
  const visiblePages = 10; // Number of pages to show at a time

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <div className="relative w-full h-[4.375rem] flex justify-center items-center gap-[1.63rem] rounded-[0.625rem] bg-badge-background">
      <div
        className={`absolute -left-4 bg-background-app rounded-full border-2 border-badge-background w-[2.5rem] h-[2.5rem] flex justify-center items-center ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={handlePreviousPage}
      >
        <TfiControlBackward />
      </div>

      {pageNumbers.map((page) => (
        <div
          key={page}
          className={`rounded-full border-2 w-[2.5rem] h-[2.5rem] flex justify-center items-center cursor-pointer ${
            page === currentPage
              ? "bg-app-green text-white"
              : "border-[#7D7DAC]"
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </div>
      ))}

      <div
        className={`absolute -right-4 bg-background-app rounded-full border-2 border-badge-background w-[2.5rem] h-[2.5rem] flex justify-center items-center ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }`}
        onClick={handleNextPage}
      >
        <TfiControlForward />
      </div>
    </div>
  );
};

export default QuestionsNavigationTab;
