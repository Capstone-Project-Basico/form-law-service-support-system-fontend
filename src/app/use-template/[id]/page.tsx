'use client';

import { UserLocal } from '@/constants/types/homeType';
import axiosClient from '@/lib/axiosClient';
import { DatePicker, Input, input } from '@nextui-org/react';
import { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

type Props = {};

const validateNumber = (value: string) => {
  // max length 10
  if (value.length > 50) {
    return 'Số không được quá 50 kí tự';
  }
  return '';
};
const validateText = (value: string) => {
  //max length 100
  if (value.length > 100) {
    return 'Văn bản không được quá 100 kí tự';
  }
  return '';
};

const validateDay = (value: string) => {
  //1 - 31
  if (parseInt(value) < 1 || parseInt(value) > 31) {
    return 'Ngày phải từ 1 đến 31';
  }
  return '';
};
const validateMonth = (value: string) => {
  //1 - 12
  if (parseInt(value) < 1 || parseInt(value) > 12) {
    return 'Tháng phải từ 1 đến 12';
  }
  return '';
};
const validateYear = (value: string) => {
  //1900 - 3000
  if (parseInt(value) < 1900 || parseInt(value) > 3000) {
    return 'Năm phải từ 1900 đến 3000';
  }
  return '';
};
const validateDate = (value: string) => {
  if (
    new Date(value).getFullYear() < 1900 ||
    new Date(value).getFullYear() > 3000
  ) {
    return 'Năm phải từ 1900 đến 3000';
  }
  return '';
};

const Page = (props: Props) => {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const templateRef = useRef<HTMLDivElement>(null);

  const [htmlContent, setHtmlContent] = useState<string>(''); // store html content
  const [formFields, setFormFields] = useState<any>([]);
  const [formData, setFormData] = useState<any>({}); // store form data
  const [formName, setFormName] = useState<any>({
    value: '',
    error: '',
  }); // store form name
  const [fieldOnSelect, setFieldOnSelect] = useState<string>(''); // store field on select

  const getUserFromStorage = () => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    }
  };

  const user: UserLocal | null = getUserFromStorage();

  console.log(user);

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

  const getFormTypeByName = (name: string) => {
    try {
      const type = formFields.find(
        (field: any) => field.fieldName === name
      ).fieldType;
      return type;
    } catch (error) {
      console.log(name);
    }
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
            onclick="var el = document.getElementById('${fieldName}'); if(el) el.focus();"
            class="${
              isSelected && 'bg-orange-200'
            } select-none text-center text-sm  h-6 border border-black p-0.5">${fieldValue}</span>`;
        }

        return `<span
          onclick="document.getElementById('${fieldName}').focus()"
          class="${isSelected && 'bg-orange-200'} select-none text-center text-sm inline-block w-[50px] h-6 border border-black p-0.5">&nbsp;</span>`;
      }

      return ` `;
    });

    // remove more than ... from the result
    const moreThanRegex = /\.\.\./g;
    const resultWithoutMoreThan = result.replace(moreThanRegex, '');

    return resultWithoutMoreThan;
  }

  const handleSubmit = async () => {
    if (formName.value === '') {
      setFormName({ ...formName, error: 'Tên biểu mẫu không được trống' });
      return;
    }
    //max length of name is 50
    if (formName.value.length > 50) {
      setFormName({
        ...formName,
        error: 'Tên biểu mẫu không được quá 50 kí tự',
      });
      return;
    }

    //check all fields is valid
    for (const key in formData) {
      if (getFormTypeByName(key) === 'number') {
        if (validateNumber(formData[key]) !== '') {
          toast.error('Thông tin không hợp lệ, vui lòng kiểm tra lại');
          return;
        }
      }
      if (getFormTypeByName(key) === 'text') {
        if (validateText(formData[key]) !== '') {
          toast.error('Thông tin không hợp lệ, vui lòng kiểm tra lại');
          return;
        }
      }
      if (getFormTypeByName(key) === 'day') {
        if (validateDay(formData[key]) !== '') {
          toast.error('Thông tin không hợp lệ, vui lòng kiểm tra lại');
          return;
        }
      }
      if (getFormTypeByName(key) === 'month') {
        if (validateMonth(formData[key]) !== '') {
          toast.error('Thông tin không hợp lệ, vui lòng kiểm tra lại');
          return;
        }
      }
      if (getFormTypeByName(key) === 'year') {
        if (validateYear(formData[key]) !== '') {
          toast.error('Thông tin không hợp lệ, vui lòng kiểm tra lại');
          return;
        }
      }
      if (getFormTypeByName(key) === 'date') {
        if (validateDate(formData[key]) !== '') {
          toast.error('Thông tin không hợp lệ, vui lòng kiểm tra lại');
          return;
        }
      }
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
        return (
          <Input
            {...props}
            type="number"
            min={1}
            max={31}
            step={1}
            validate={validateDay}
          />
        );
      case 'month':
        return (
          <Input
            {...props}
            type="number"
            min={1}
            max={12}
            step={1}
            validate={validateMonth}
          />
        );
      case 'year':
        return (
          <Input
            {...props}
            type="number"
            min={1900}
            max={3000}
            step={1}
            validate={validateYear}
          />
        );
      case 'date':
        try {
          const dateData = formData[field.fieldName];
          const [day, month, year] = dateData.split('-');
          const formattedDate = `${year}-${month}-${day}`;
          return (
            <Input
              {...props}
              type="date"
              value={formattedDate}
              validate={validateDate}
            />
          );
        } catch (error: any) {
          return <Input {...props} type="date" />;
        }
      case 'number':
        return <Input {...props} type="number" validate={validateNumber} />;
      case 'text':
        return <Input {...props} type="text" validate={validateText} />;

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
    const draft = localStorage.getItem('draft');
    if (draft) {
      const data = new Map(JSON.parse(draft));
      const draftData: any = data.get(params.id);
      // create obj by field name
      const formData = fields.reduce((acc: any, field: any) => {
        acc[field?.fieldName] = draftData?.formData[field?.fieldName] || '';
        return acc;
      }, {});

      if (draftData) {
        setFormData(formData);
        setFormName({ value: draftData.name, error: '' });
        return;
      }
    }

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
    const dataJson = localStorage.getItem('draft');
    let data = new Map<String, Object>();

    // parse data to map
    if (dataJson) {
      data = new Map(JSON.parse(dataJson));
    }

    data.set(params.id, {
      name: formName.value,
      formData: formData,
    });

    localStorage.setItem('draft', JSON.stringify(Array.from(data.entries())));

    toast.success('Lưu bản nháp thành công');
  };

  useEffect(() => {
    if (user === null) {
      toast.error('Vui lòng đăng nhập để sử dụng chức năng này');
      //sleep 2s then redirect to login page
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }

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
      <div>
        <form className="grid grid-cols-12">
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
                            errorMessage={formName.error}
                          />
                        </div>
                      </div>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button
                          onClick={() => {
                            router.push('/profile/manageTemplate');
                          }}
                          className="ml-3 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white"
                          aria-label="Save"
                          type="button"
                        >
                          Đóng
                        </button>
                        <button
                          onClick={handleSaveDraft}
                          className="ml-3 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white "
                          aria-label="Save"
                          type="button"
                        >
                          Lưu
                        </button>
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
        </form>
      </div>
    </div>
  );
};

export default Page;
