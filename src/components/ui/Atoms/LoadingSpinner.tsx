"use client";

const LoadingSpinner = () => {
  return (
    <div
      className={`flex space-x-2 justify-center items-center bg-opacity-50 h-screen w-screen`}
    >
      <div className="h-8 w-8 bg-app-purple rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-8 w-8 bg-app-purple rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-8 w-8 bg-app-purple rounded-full animate-bounce"></div>
    </div>
  );
};

export default LoadingSpinner;
