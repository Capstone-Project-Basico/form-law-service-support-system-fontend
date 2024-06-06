'use client';
import FileUpload from '@/components/file-upload';
import Loading from '@/components/loading';
import {
  FormTemplate,
  FormTemplateRequest,
} from '@/constants/types/FormTemplate';
import { SideNavItem } from '@/constants/types/homeType';
import axiosClient from '@/lib/axiosClient';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/breadcrumbs';
import { Button, Input, Textarea } from '@nextui-org/react';
import { Select, SelectItem } from '@nextui-org/select';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

type Props = {};

const AddTemplate = (props: Props) => {
  const router = useRouter();
  const [file, setFile] = React.useState<File | null>(null);
  const [titleInputError, setTitleInputError] = React.useState<string>('');
  const [formTypes, setFormTypes] = React.useState<FormType[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isError, setIsError] = React.useState<boolean>(false);

  const validatePrice = (value: string) => {
    // value < 100 > 1000000
    if (parseInt(value) < 2000 || parseInt(value) > 1000000) {
      setIsError(true);
      return 'Giá phải từ 2000 đến 1,000,000';
    }
    setIsError(false);
    return '';
  };

  const validateDescription = (value: string) => {
    //max length 500
    if (value.length > 500) {
      setIsError(true);
      return 'Mô tả không quá 500 ký tự';
    }
    setIsError(false);
    return '';
  };

  const getUserFromStorage = () => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) return null;
      return JSON.parse(storedUser)?.data?.data
        ? JSON.parse(storedUser).data.data
        : null;
    }
  };

  //handle form submit
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      if (isError) {
        toast.warn('Vui lòng kiểm tra lại thông tin');
        return;
      }

      const formData = new FormData(e.currentTarget);
      const formValues: { [key: string]: string } = {};

      formData.forEach((value, key) => {
        formValues[key] = value.toString();
      });

      // check if value is empty
      if (Object.values(formValues).some((value) => value === '')) {
        toast.warn('Vui lòng điền đầy đủ thông tin');
        return;
      }

      // Use the formValues object to access the form data
      const formTemplate: FormTemplateRequest = {
        formTypeId: parseInt(formValues.formTypeId),
        title: formValues.title,
        description: formValues.description,
      };
      const formTemplateId = await postFormTemplate(formTemplate);

      const formTemplateVersion: FormTemplateVersionReq = {
        message: formValues.description,
        price: parseInt(formValues.price),
        file: file as File,
        formTemplateId,
      };
      const res = await postFormTemplateVersion(formTemplateVersion);
      if (res) {
        if (res.status === 200) {
          if (res.data.message === 'Please check the tag in the document')
            toast.error(
              'Có lỗi kí tự trong file biểu mẫu, vui lòng kiểm tra lại'
            );
          else toast.success('Tạo mới biểu mẫu thành công');
          // pause for 2s then redirect to manageTemplate
          setTimeout(() => {
            const user = getUserFromStorage();
            if (user) {
              if (user.roleName === 'ROLE_MANAGER')
                router.push('/dashboard/service/manageTemplate');
              if (user.roleName === 'ROLE_STAFF')
                router.push('/dashboardStaff/service/manageTemplate');
            }
          }, 2000);
        }
      }
    } catch (error) {}
  }

  async function handleOnTitleInputFocusChanged(
    e: React.FocusEvent<Element, Element>
  ) {
    const value = (e.target as HTMLInputElement).value;

    if (value === '') {
      setTitleInputError('Tên biểu mẫu không được để trống');
      return;
    }

    const res = await axiosClient.get(
      `/formTemplate/getFormTemplateByTitle?title=${value}`
    );
    if (res.status === 200) {
      const data = res.data;
      if (data.message !== 'Not found!!!') {
        setTitleInputError('Tên biểu mẫu đã tồn tại');
      } else {
        setTitleInputError('');
      }
    }
  }

  async function postFormTemplate(data: FormTemplateRequest) {
    // const res = await useApi({ method: 'POST', url: '/formTemplate/createFormTemplate', body: data });
    const res = await axiosClient.post(
      '/formTemplate/createFormTemplate',
      data
    );
    if (res.status === 200) {
      return res.data.formTemplateId;
    }
    // console.log(res);
  }

  async function postFormTemplateVersion(data: FormTemplateVersionReq) {
    const formData = new FormData();
    formData.append('message', data.message);
    formData.append('price', data.price.toString());
    formData.append('file', data.file);
    formData.append('formTemplateId', data.formTemplateId.toString());
    const res = await axiosClient.post('/formTemplateVersion', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (res.status === 200) {
      console.log(res.data);
      return res;
    }
    return null;
  }

  useEffect(() => {
    async function fetchformTypes() {
      setIsLoading(true);
      const res = await axiosClient
        .get('/formType/getAllFormTypes')
        .catch((err) => console.log(err));
      if (res && res.status === 200) {
        setIsLoading(false);
        setFormTypes(res.data);
      }
    }
    fetchformTypes();
  }, []);

  if (isLoading) {
    return <Loading className="h-full pb-20" />;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 w-full p-4">
      <ToastContainer />
      <div className="py-4">
        <Breadcrumbs color="danger" size="lg" className="text-3xl">
          <BreadcrumbItem>
            <p className="text-3xl font-bold text-black ">Quản lí dịch vụ</p>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <p className="text-3xl font-bold text-black">Biểu mẫu</p>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <p className="text-3xl font-bold text-[#FF0004]">Tạo mới</p>
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="flex w-full gap-4 py-4">
        <div className="m-auto  basis-7/12 rounded-md border-1 border-gray-400 bg-white p-5 ">
          <h4 className="my-auto mb-9 text-base font-semibold">
            Thông tin biểu mẫu
          </h4>
          <div className="grid grid-rows-3 gap-2">
            <Input
              isInvalid={titleInputError !== ''}
              errorMessage={titleInputError}
              onBlur={handleOnTitleInputFocusChanged}
              name="title"
              variant="bordered"
              label="Tên biểu mẫu"
              type="text"
            />
            <Select name="formTypeId" variant="bordered" label="Loại biểu mẫu">
              {formTypes &&
                formTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.typeName}
                  </SelectItem>
                ))}
            </Select>
            <Input
              name="price"
              variant="bordered"
              label="Giá"
              type="number"
              validate={validatePrice}
            />
          </div>
        </div>
        <div className="h-auto basis-5/12 rounded-md border-1 border-gray-400 bg-white p-5 ">
          <h4 className="mb-9 pt-2 text-base font-semibold">
            Chen bieu mau luat
          </h4>
          <FileUpload file={file} setFile={setFile} className="" />
        </div>
      </div>
      <div className=" w-full rounded-md border-1 border-gray-400 p-5  ">
        <h3 className="mb-9 text-base font-semibold">Thông tin mô tả</h3>
        <Textarea
          name="description"
          variant="bordered"
          className="w-full"
          label="Ghi chú"
          validate={validateDescription}
        />
      </div>
      <div className="mt-9 grid w-full grid-cols-2 gap-2">
        <Button
          onClick={() => {
            router.back();
          }}
          variant="bordered"
          className="bg-white "
        >
          Quay lại
        </Button>
        <Button type="submit" className="bg-red-500 text-white">
          Tạo mới
        </Button>
      </div>
    </form>
  );
};

export default AddTemplate;
