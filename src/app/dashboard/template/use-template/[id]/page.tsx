'use client';

import axiosClient from '@/lib/axiosClient';
import { Input } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

type Props = {};

const Page = (props: Props) => {
  const params = useParams<{ id: string }>();

  const templateRef = useRef<HTMLDivElement>(null);

  const getFile = async (id: number) => {
    // fetch file
    const res = await axiosClient.get('formTemplateVersion/download/' + id, { responseType: 'blob' });
    const file = new Blob([res.data]);

    const form = new FormData();
    form.append('file', file);

    const htmlRes = await axiosClient.post('https://demo-converter-to-html.onrender.com/api/documents/convert', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const html = htmlRes.data;
    return html;
  };

  function replaceFieldWithInput(htmlContent: string) {
    // Regular expression to match the pattern {{fieldName##fieldType}}
    const regex = /{{([^#]+)##([^}]+)}}/g;

    // Replace each occurrence with an input tag
    const result = htmlContent.replace(regex, (match, fieldName, fieldType) => {
      // Generate an input tag based on fieldType
      return `<input class="border border-black rounded-md m-1 p-1" placeholder="${fieldName}" name="${fieldName}" type="${fieldType}" />`;
    });

    return result;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const object = Object.fromEntries(formData);
    const name = object.formName;
    delete object.formName;

    const data = {
      name: name,
      templateVersionId: Number(params.id),
      formData: object,
    };
    console.log(data);
    await postUserForm(data);
  };

  const postUserForm = async (data: any) => {
    const res = await axiosClient.post('userForm', data, { responseType: 'blob' });
    const file = new Blob([res.data]);
    const url = URL.createObjectURL(file);

    const a = document.createElement('a');
    a.href = url;
    document.body.appendChild(a);

    a.download = data.name + '.docx';
    a.click();
  };

  useEffect(() => {
    const renderPage = async (): Promise<void> => {
      const html = await getFile(Number(params.id));
      // const html = "'Hello, this is a test: {{username##text}}, and this is a number: {{age##number}}.';";
      const replacedHtml = replaceFieldWithInput(html);
      if (templateRef.current) templateRef.current.innerHTML = replacedHtml;
    };
    renderPage();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold text-left">Use Template</h1>
      <form onSubmit={handleSubmit} className="">
        <div className="basis-3/12 mt-5">
          <Input className="m-2 w-40" variant="bordered" label="Tên biểu mẫu" type="text" name="formName" />
        </div>
        <div className="w-[850px] mx-auto">
          <div className="overflow-y-scroll max-h-[39rem] min-h-[39rem]  mx-auto p-10 border-2">
            <div className="content-center min-h-[35rem] p-10 border-1 border-black" ref={templateRef}></div>
          </div>
          <button type="submit" className="w-full bg-primary hover:bg-red-400 text-white font-bold py-2 px-4 rounded m-5">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
