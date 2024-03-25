"use client";

import FormDownload from "@/components/form/FormDownload";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FormDownload />
    </Suspense>
  );
};

export default Page;
