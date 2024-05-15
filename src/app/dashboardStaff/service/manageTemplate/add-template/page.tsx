'use client'
import FileUpload from '@/components/file-upload'
import Loading from '@/components/loading'
import { FormTemplate } from '@/constants/types/FormTemplate'
import { SideNavItem } from '@/constants/types/homeType'
import axiosClient from '@/lib/axiosClient'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/breadcrumbs'
import { Button, Input, Textarea } from '@nextui-org/react'
import { Select, SelectItem } from '@nextui-org/select'
import { usePathname, useRouter } from 'next/navigation'
import * as React from 'react'

export interface IAddTemplatePageProps {}

export default function AddTemplatePage(props: IAddTemplatePageProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [file, setFile] = React.useState<File | null>(null)
  const [titleInputError, setTitleInputError] = React.useState<string>('')
  const [formTypes, setFormTypes] = React.useState<FormType[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    async function fetchformTypes() {
      setIsLoading(true)
      const res = await axiosClient
        .get('/formType/getAllFormTypes')
        .catch((err) => console.log(err))
      if (res && res.status === 200) {
        setIsLoading(false)
        setFormTypes(res.data)
      }
    }
    fetchformTypes()
  }, [])

  const currentYear = new Date().getFullYear()
  const range = (start: number, stop: number, step: number) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    )
  const listYears = range(currentYear, 1980, -1)

  function getPathnameOrder(pathname: string) {
    const parts = pathname.split('/').filter(Boolean) // filter out empty strings from the array

    const paths = []
    let currentPath = ''

    for (let part of parts) {
      currentPath += '/' + part
      paths.push(currentPath)
    }

    return paths
  }

  function findSidebarItemByPath(
    path: string,
    items: SideNavItem[]
  ): SideNavItem | undefined {
    for (let item of items) {
      if (item.path === path) {
        return item
      }

      if (item.subMenu && item.subMenuItems) {
        // Add a check for item.subMenuItems
        const subItem = findSidebarItemByPath(path, item.subMenuItems)
        if (subItem) {
          return subItem
        }
      }
    }

    return undefined
  }

  //handle form submit
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const formValues: { [key: string]: string } = {}

    formData.forEach((value, key) => {
      formValues[key] = value.toString()
    })

    // Use the formValues object to access the form data
    const formTemplate: FormTemplate = {
      formTypeId: parseInt(formValues.formTypeId),
      title: formValues.title,
      description: formValues.description,
    }
    const formTemplateId = await postFormTemplate(formTemplate)

    const formTemplateVersion: FormTemplateVersionReq = {
      message: formValues.description,
      price: parseInt(formValues.price),
      file: file as File,
      formTemplateId,
    }
    const res = await postFormTemplateVersion(formTemplateVersion)
    if (res) {
      router.push('/dashboard/service/manageTemplate')
    }
  }

  async function handleOnTitleInputFocusChanged(
    e: React.FocusEvent<Element, Element>
  ) {
    const value = (e.target as HTMLInputElement).value

    const res = await axiosClient.get(
      `/formTemplate/getFormTemplateByTitle?title=${value}`
    )
    if (res.status === 200) {
      const data = res.data
      console.log(data)
      if (data.message !== 'Not found!!!') {
        setTitleInputError('Tên biểu mẫu đã tồn tại')
      } else {
        setTitleInputError('')
      }
    }
  }

  async function postFormTemplate(data: FormTemplate) {
    // const res = await useApi({ method: 'POST', url: '/formTemplate/createFormTemplate', body: data });
    const res = await axiosClient.post('/formTemplate/createFormTemplate', data)
    if (res.status === 200) {
      console.log(res.data)
      return res.data.formTemplateId
    }
    // console.log(res);
  }

  async function postFormTemplateVersion(data: FormTemplateVersionReq) {
    const formData = new FormData()
    formData.append('message', data.message)
    formData.append('price', data.price.toString())
    formData.append('file', data.file)
    formData.append('formTemplateId', data.formTemplateId.toString())
    const res = await axiosClient.post('/formTemplateVersion', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    if (res.status === 200) {
      console.log(res.data)
      await axiosClient.put(
        `formTemplateVersion/status/${res.data.id}?status=PENDING`
      )
      return res
    }
    return null
  }

  if (isLoading) {
    return <Loading className="h-full pb-20" />
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 w-full p-4">
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
            <div className="grid grid-cols-2 gap-4">
              <Select
                name="formTypeId"
                variant="bordered"
                label="Loại biểu mẫu"
              >
                {formTypes &&
                  formTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.typeName}
                    </SelectItem>
                  ))}
              </Select>
              <Select name="year" variant="bordered" label="năm">
                {listYears.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year.toString()}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <Input name="price" variant="bordered" label="Giá" type="text" />
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
        />
      </div>
      <div className="mt-9 grid w-full grid-cols-2 gap-2">
        <Button variant="bordered" className="bg-white ">
          Quay lại
        </Button>
        <Button type="submit" className="bg-red-500 text-white">
          Tạo mới
        </Button>
      </div>
    </form>
  )
}
