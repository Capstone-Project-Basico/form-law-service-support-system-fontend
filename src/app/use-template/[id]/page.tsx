'use client';

import axiosClient from '@/lib/axiosClient';
import { DatePicker, Input, input } from '@nextui-org/react';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

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
            } select-none text-center text-sm inline-block min-w-[100px] h-6 border border-black p-0.5">${fieldValue}</span>`;
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
      console.log('error');
      setFormName({ ...formName, error: 'Tên biểu mẫu không được trống' });
      return;
    }

    const data = {
      name: formName.value,
      templateVersionId: Number(params.id),
      formData: formData,
    };
    await postUserForm(data);
  };

  const postUserForm = async (data: any) => {
    try {
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
    } catch (error: any) {
      if (error.response) {
        const contentType = error.response.headers['content-type'];
        if (contentType && contentType.includes('application/json')) {
          const reader = new FileReader();
          reader.onload = function (event) {
            const jsonResponse = JSON.parse(event.target?.result as string);
            if (
              jsonResponse.status === false &&
              jsonResponse.message === 'User has not bought this form template'
            ) {
              toast.error('Bạn chưa mua biểu mẫu này');
            }
            console.log(jsonResponse);
          };
          reader.readAsText(error.response.data);
        } else {
          console.log(error.response.data);
        }
      }
    }
  };

  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    let formattedValue = value;

    if (type === 'date') {
      const date = new Date(value);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear());

      formattedValue = `${day}-${month}-${year}`;
    }

    setFormData({ ...formData, [name]: formattedValue });
  };

  const renderField = (field: any, props?: any) => {
    switch (field.fieldType) {
      case 'day':
        return <Input {...props} type="number" min={1} max={31} step={1} />;
      case 'month':
        return <Input {...props} type="number" min={1} max={12} step={1} />;
      case 'year':
        return (
          <Input {...props} type="number" min={1900} max={2022} step={1} />
        );
      case 'date':
        const dateData = formData[field.fieldName];
        const [day, month, year] = dateData.split('-');
        const formattedDate = `${year}-${month}-${day}`;
        return <Input {...props} type="date" value={formattedDate} />;

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
          acc[field.fieldName] =
            `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
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
      <ToastContainer />
      <h1 className="text-left text-2xl font-semibold text-black">
        Sữ dụng biểu mẫu
      </h1>
      <div className="grid grid-cols-12">
        <div className="col-span-3 mx-12 my-2 mt-32 flex h-[50rem] flex-wrap gap-2 overflow-y-scroll border-2 p-4">
          <h3 className="my-1 text-xl font-semibold">Nhập thông tin</h3>
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
          <div className="mt-5 border-2 bg-white">
            <div className="basis-3/12 border-b-2 bg-white">
              <div className="p-4">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                  <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                      <div className="flex flex-shrink-0 items-center">
                        <Input
                          label="Tên biểu mẫu"
                          type="text"
                          name="formName"
                          variant="bordered"
                          value={formName.value}
                          onChange={(e: { target: { value: any } }) =>
                            setFormName({
                              value: e.target.value,
                              error: '',
                            })
                          }
                          isInvalid={formName.error !== ''}
                          errorMessage={'Tên biểu mẫu không được trống'}
                        />
                      </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                      {/* <button
                        onClick={handleSaveDraft}
                        className="ml-3 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white opacity-20"
                        aria-label="Save"
                      >
                        Lưu tạm
                      </button> */}
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="ml-3 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white"
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
            <div className="m-8 mx-auto w-[1000px] border p-8 ">
              <div className="h-[50rem] overflow-y-scroll">
                <div
                  className="min-h-[35rem] content-center p-10 "
                  ref={templateRef}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
