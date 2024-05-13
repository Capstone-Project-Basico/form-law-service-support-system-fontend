'use client';

import axiosClient from '@/lib/axiosClient';
import { DatePicker, Input, input } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

type Props = {};

const Page = (props: Props) => {
  const params = useParams<{ id: string }>();

  const templateRef = useRef<HTMLDivElement>(null);

  const [htmlContent, setHtmlContent] = useState<string>(''); // store html content
  const [formFields, setFormFields] = useState<any>([]);
  const [formData, setFormData] = useState<any>({}); // store form data
  const [formName, setFormName] = useState<any>({
    value: '',
    error: '',
  }); // store form name
  const [fieldOnSelect, setFieldOnSelect] = useState<string>(''); // store field on select

  const getFile = async (id: number) => {
    // fetch file
    const res = await axiosClient.get('formTemplateVersion/download/' + id, {
      responseType: 'blob',
    });
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

  const getFormFields = async (id: number) => {
    const res = await axiosClient.get('formField/templateVersionId/' + id);
    const fields = res.data;
    return fields;
  };

  // function replaceFieldWithInput(htmlContent: string) {
  //   let decodedHtml = htmlContent.replace(/&lt;/g, '<').replace(/&gt;/g, '>');

  //   // Regex to find the pattern <<key**value>>
  //   const regex = /<<([^*]+)\*\*([^>]+)>>/g;

  //   const result = decodedHtml.replace(regex, (match, fieldName, fieldType) => {
  //     console.log(fieldType, fieldName);
  //     // Generate an input tag based on fieldType
  //     return `<input class="w-[100px] border border-black m-1 p-1" placeholder="${fieldName}" name="${fieldName}" type="${fieldType}" />`;
  //   });

  //   return result;
  // }

  // replace test with value
  function replaceFieldWithValue(value: any) {
    // Regex to find the pattern <<key**value>>
    const regex = /\{\{([^*]+)\*\*([^}]+)\}\}/g;

    const result = htmlContent.replace(regex, (match, fieldName, fieldType) => {
      if (fieldName) {
        const isSelected = fieldOnSelect === fieldName;

        if (value && value[fieldName]) {
          const fieldValue = value[fieldName];
          // Generate an input tag based on fieldType
          return `<span
            onclick="document.getElementById('${fieldName}').focus()"
            class="${
              isSelected && 'bg-orange-200'
            } select-none text-center text-sm inline-block min-w-[50px] h-6 border border-black p-0.5">${fieldValue}</span>`;
        }

        return `<span
          onclick="document.getElementById('${fieldName}').focus()"
          class="${isSelected && 'bg-orange-200'} select-none text-center text-sm inline-block w-[50px] h-6 border border-black p-0.5">&nbsp;</span>`;
      }

      return ` `;
    });

    return result;
  }

  const handleSubmit = async () => {
    if (formName.value === '') {
      setFormName({ ...formName, error: 'Tên biểu mẫu không được trống' });
      return;
    }

    const data = {
      name: formName.value,
      templateVersionId: Number(params.id),
      formData: formData,
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

  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const renderField = (field: any, props?: any) => {
    switch (field.fieldType) {
      case 'day':
        return <Input {...props} type="number" min={1} max={31} step={1} />;
      case 'month':
        return <Input {...props} type="number" min={1} max={12} step={1} />;
      case 'year':
        return <Input {...props} type="number" min={1900} max={2022} step={1} />;
      default:
        return <Input {...props} />;
    }
  };

  // const renderField2 = (fields: [any]): React.ReactElement<any, any> => {
  //   let processedFields: any[] = [];
  //   let skipIds = new Set();
  //   fields.forEach((field: any, index: number) => {
  //     if (skipIds.has(field.id)) return;

  //     if (field.fieldType === 'day' && fields[index + 1]?.fieldType === 'month' && fields[index + 2]?.fieldType === 'year') {
  //       processedFields.push({
  //         fieldName: field.fieldName,
  //         fieldType: 'date',
  //         key: [field.fieldName, fields[index + 1].fieldName, fields[index + 2].fieldName],
  //       });
  //       skipIds.add(fields[index + 1].id);
  //       skipIds.add(fields[index + 2].id);
  //     }
  //     fields.forEach((field: any) => {
  //       if (!skipIds.has(field.id)) {
  //         processedFields.push(field);
  //       }
  //     });
  //   });
  //   const result = processedFields.map((field: any) => {
  //     if (skipIds.has(field.id)) return;
  //     return <Input value={formData[field.fieldName]} />;
  //   });
  //   return <></>;
  // };

  const setDefaultFormData = (fields: any) => {
    // const draft = JSON.parse(localStorage.getItem('draft') || '{}');
    // if (draft || draft.templateVersionId === Number(params.id)) {
    //   setFormData(draft.formData);
    //   setFormName({ value: draft.name });
    //   return;
    // }
    const date = new Date();
    const defaultData = fields.reduce((acc: any, field: any) => {
      switch (field.fieldType) {
        case 'day':
          acc[field.fieldName] = date.getDate();
          break;
        case 'month':
          acc[field.fieldName] = date.getMonth() + 1;
          break;
        case 'year':
          acc[field.fieldName] = date.getFullYear();
          break;
        case 'number':
          acc[field.fieldName] = 0;
          break;
        case 'date':
          acc[field.fieldName] = date.toISOString().slice(0, 10);
          break;
        default:
          acc[field.fieldName] = '';
          break;
      }
      switch (field.fieldName) {
        default:
          if (!acc[field.fieldName]) {
            acc[field.fieldName] = '';
          }
          break;
      }
      return acc;
    }, {});

    setFormData(defaultData);
  };

  const handleSaveDraft = () => {
    const data = {
      name: formName.value,
      templateVersionId: Number(params.id),
      formData: formData,
    };
    localStorage.setItem('draft', JSON.stringify(data));
  };

  useEffect(() => {
    const fetchData = async () => {
      // fetch html content
      const htmlRes = await getFile(Number(params.id));

      // fetch form fields
      const fields = await getFormFields(Number(params.id));
      setFormFields(fields);
      setHtmlContent(htmlRes);
      setDefaultFormData(fields);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (templateRef.current) {
      const replacedHtml = replaceFieldWithValue(formData);
      templateRef.current.innerHTML = replacedHtml;
    }
  }, [formData, htmlContent, fieldOnSelect]);

  return (
    <div className="p-5 md:mx-20">
      <h1 className="text-2xl font-semibold text-left text-black">Use Template</h1>
      <div className="grid grid-cols-12">
        <div className="col-span-3 flex flex-wrap gap-2 mx-12 my-2 mt-32 p-4 border-2 overflow-y-scroll h-[50rem]">
          <h3 className="text-xl font-semibold my-1">Nhập thông tin</h3>
          {formFields.map((field: any) =>
            renderField(field, {
              id: field.fieldName,
              key: field.id,
              label: field.fieldName,
              name: field.fieldName,
              variant: 'bordered',
              type: field.fieldType,
              value: formData[field.fieldName],
              onChange: handleFormDataChange,
              onFocus: () => setFieldOnSelect(field.fieldName),
              onBlur: () => setFieldOnSelect(''),
            })
          )}
        </div>

        <div className="col-span-9">
          <div className="bg-white border-2 mt-5">
            <div className="bg-white basis-3/12 border-b-2">
              <div className="p-4">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                  <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                      <div className="flex-shrink-0 flex items-center">
                        <Input
                          label="Tên biểu mẫu"
                          type="text"
                          name="formName"
                          variant="bordered"
                          value={formName.value}
                          onChange={(e: { target: { value: any } }) => setFormName({ value: e.target.value })}
                          errorMessage={formName.error}
                        />
                      </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                      {/* <button disabled className="bg-primary opacity-20 text-white px-4 py-2 rounded-md text-sm font-medium" aria-label="Preview">
                      Xem trước
                    </button> */}
                      <button
                        onClick={handleSaveDraft}
                        className="bg-primary opacity-20 text-white px-4 py-2 ml-3 rounded-md text-sm font-medium"
                        aria-label="Save"
                      >
                        Lưu tạm
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-primary text-white px-4 py-2 ml-3 rounded-md text-sm font-medium"
                        aria-label="Download"
                      >
                        Lưu và tải xuống
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <Input className="m-2 w-40" variant="bordered" label="Tên biểu mẫu" type="text" name="formName" /> */}
            </div>
            <div className="w-[825px] m-8 mx-auto p-8 border ">
              <div className="overflow-y-scroll h-[50rem]">
                <div className="content-center min-h-[35rem] p-10 " ref={templateRef}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
