import React from "react";

const InstitutionDashboardSuspenseBoundary = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="h-8 w-8 bg-app-purple rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-8 w-8 bg-app-purple rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-8 w-8 bg-app-purple rounded-full animate-bounce"></div>
    </div>
  );
};

export default InstitutionDashboardSuspenseBoundary;
