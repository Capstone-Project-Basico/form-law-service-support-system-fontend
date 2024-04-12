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

    const converterURL = process.env.NEXT_PUBLIC_CONVERTER_API;
    if (!converterURL) {
      console.error('Converter API is not defined');
      return 'Server error';
    }
    const htmlRes = await axiosClient.post(converterURL, form, {
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
      return `<input class="w-[100px] border border-black m-1 p-1" placeholder="${fieldName}" name="${fieldName}" type="${fieldType}" />`;
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
    const res = await axiosClient.post('userForm', data, {
      responseType: 'blob',
    });
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
      <h1 className="text-2xl font-semibold text-left text-white">Use Template</h1>
      <form onSubmit={handleSubmit} className="bg-white">
        <div className="bg-white basis-3/12 mt-5 border">
          <div className="p-4">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 flex items-center">
                    <input
                      className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                      placeholder="Tên biểu mẫu"
                      type="text"
                      name="formName"
                    />
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button disabled className="bg-primary opacity-20 text-white px-4 py-2 rounded-md text-sm font-medium" aria-label="Preview">
                    Xem trước
                  </button>
                  <button disabled className="bg-primary opacity-20 text-white px-4 py-2 ml-3 rounded-md text-sm font-medium" aria-label="Save">
                    Lưu lại
                  </button>
                  <button type="submit" className="bg-primary text-white px-4 py-2 ml-3 rounded-md text-sm font-medium" aria-label="Download">
                    Lưu và tải xuống
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <Input className="m-2 w-40" variant="bordered" label="Tên biểu mẫu" type="text" name="formName" /> */}
        </div>
        <div className="w-[793px] mx-auto">
          <div className="overflow-y-scroll max-h-[39rem] min-h-[39rem]  border-2">
            <div className="content-center min-h-[35rem] p-10 border-1 border-black" ref={templateRef}></div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
