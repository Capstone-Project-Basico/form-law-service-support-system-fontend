"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { InputValues } from "@/constants/types/homeType";
import axios from "axios";

const Page = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [form, setForm] = useState([]);
  const [inputValues, setInputValues] = useState<InputValues>({});

  const getForm = async () => {
    if (name) {
      try {
        const res = await fetch(
          `https://demo-production-b43a.up.railway.app/file/formfields/${name}`
        );
        const data = await res.json();
        setForm(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getForm();
  }, [name]);

  //Fill form and download
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: string
  ) => {
    const { value } = e.target;
    const key = `"${item}"`;
    setInputValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      console.log(JSON.stringify(inputValues));

      const response = await fetch(
        `https://demo-production-b43a.up.railway.app/GenerateFile/${name}`,
        {
          method: "POST", // Specify the method
          headers: {
            "Content-Type": "application/json", // Specify content type
          },
          body: JSON.stringify(inputValues), // Convert inputValues to JSON string
        }
      );

      //download by http
      if (response) {
        const blob = await response.blob();
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = `${name}`;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(downloadUrl); // Clean up
        a.remove(); // Clean up
      } else {
        console.error("Server responded with ", response);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {name && (
        <div className="w-full text-center">
          <h1 className="font-bold">Biểu mẫu {name}</h1>
        </div>
      )}
      <ul className="w-full">
        {form.map((item, index) => (
          <div
            key={index}
            className="flex w-full flex-wrap md:flex-nowrap gap-4 justify-center"
          >
            <li key={index} className="w-44">
              {item}
            </li>
            <Input
              className="w-44"
              type="text"
              placeholder="nhap di ..."
              value={inputValues[`"${item}"`] || ""}
              onChange={(e) => handleInputChange(e, item)}
            />
          </div>
        ))}
      </ul>

      <Button color="primary" onClick={handleSubmit}>
        Tải về
      </Button>
    </div>
  );
};

export default Page;
