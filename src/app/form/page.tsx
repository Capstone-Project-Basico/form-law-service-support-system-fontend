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

  useEffect(() => {
    const getForm = async () => {
      if (name) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}file/formfields/${name}`
          );
          const data = await res.json();
          setForm(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    getForm();
  }, [name]);

  //Fill form and download
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: string
  ) => {
    const { value } = e.target;
    const key = item;
    setInputValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      axios
        .post(
          `https://demo-production-b43a.up.railway.app/GenerateFile/${name}`,
          inputValues,
          { responseType: "blob" }
        )
        .then((response) => {
          const blob = response.data;
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${name}`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
        });
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
      <ul className="w-full text-black">
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
              placeholder="type here"
              value={inputValues[item] || ""}
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
