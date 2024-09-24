"use client";

import { Button } from "@/components";
import { useEffect } from "react";

const InstitutionDashboardErrorBoundary = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2 className="font-caladea text-3xl">Something went wrong!</h2>
      <p>{error.message}</p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
};

export default InstitutionDashboardErrorBoundary;
