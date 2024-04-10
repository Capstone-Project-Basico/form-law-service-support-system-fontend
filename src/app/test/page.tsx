import axiosClient from "@/lib/axiosClient";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import React, { useEffect } from "react";

const TestPage = () => {
  // useEffect(() => {
  //   const getDate = async () => {
  //     const res = await axiosClient.put('/contact/restoreContact/4');
  //     console.log(res?.data?.data);
  //   };
  //   getDate();
  // }, []);

  return (
    <Breadcrumbs>
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Music</BreadcrumbItem>
      <BreadcrumbItem>Artist</BreadcrumbItem>
      <BreadcrumbItem>Album</BreadcrumbItem>
      <BreadcrumbItem>Song</BreadcrumbItem>
    </Breadcrumbs>
  );
};

export default TestPage;
