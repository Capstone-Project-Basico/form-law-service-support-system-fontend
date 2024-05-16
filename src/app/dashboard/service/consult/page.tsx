"use client";

import authHeader from "@/components/authHeader/AuthHeader";
import User from "@/components/authHeader/User";
import {
  ConsultServiceType,
  PackType,
  ServiceType,
  UserLocal,
} from "@/constants/types/homeType";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { headers } from "next/headers";
import React, { FormEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

const Pack = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tabs, setTabs] = useState(1);
  const [services, setServices] = useState<ConsultServiceType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequestService, setSelectedRequestService] =
    useState<ConsultServiceType | null>();

  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();
  // const userInfo = User();
  const [packageRequestServiceName, setPackageRequestServiceName] = useState("");
  const [price, setPrice] = useState(0);
  const [totalOfRequest, setTotalOfRequest] = useState(0);
  const [createBy, setCreateBy] = useState("");
  const [description, setDescription] = useState("");
  let newRequestPack = {
    packageRequestServiceName,
    price,
    totalOfRequest,
    createBy,
    description,
  };
  const dataUpdate = {
    ...selectedRequestService,
    totalOfRequest: selectedRequestService?.totalRequest,
  };
  const getUserFromStorage = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
  };

  const user: UserLocal | null = getUserFromStorage();
  const userId = user?.data.data.userId;

  // console.log(userInfo?.email);
  useEffect(() => {
    getUserById();

    switch (tabs) {
      case 1:
        fetchServices();
        break;
      case 2:
        fetchPendingServices();
        break;
      case 3:
        fetchDeletedService();
        break;
      default:
        fetchServices();
        break;
    }
  }, [tabs, userId]);

  // useEffect(() => {
  //   getUserById();
  // });
  const getUserById = async () => {
    if (!user) return;
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_API}user/getUserById/${userId}`)
      .then((res) => {
        console.log(res.data.data.email);

        setCreateBy(res.data.data.email);
      })
      .catch((error) => {
        console.log("loi roi " + error);
      });
  };

  //get all items
  const fetchServices = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}packageRequestService/getAllPackageRequestService`
      );
      const filteredService = response.data.data.filter(
        (service: ConsultServiceType) =>
          service.deleted === false && service.processStatus === "ĐÃ DUYỆT"
      );

      setServices(filteredService);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPendingServices = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}packageRequestService/getAllPackageRequestService`
      );
      const filteredService = response.data.data.filter(
        (service: ConsultServiceType) =>
          service.deleted === false && service.processStatus === "CHỜ DUYỆT"
      );

      setServices(filteredService);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDeletedService = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}packageRequestService/getAllPackageRequestService`
      );
      const filteredService = response.data.data.filter(
        (service: ConsultServiceType) => service.deleted === true
      );
      setServices(filteredService);
    } catch (error) {
      console.error(error);
    }
  };

  //add a new service
  const handleSubmit = async (e: FormEvent, onClose: () => void) => {
    e.preventDefault();
    try {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_BASE_API}packageRequestService/createPackageRequestService`,
          newRequestPack,
          {
            headers: authHeader(),
          }
        )
        .then((response) => {
          toast.success("Tạo mới gói tư vấn thành công");
          onClose();
          fetchServices();
        })
        .catch((error) => {
          toast.error("Tạo gói thất bại");
        });
    } catch (error) {
      toast.error("Tạo mới gói thất bại!");
      console.log(error);
    }
  };

  //add a new service
  const handleUpdateSubmit = async (e: FormEvent, onClose: () => void) => {
    e.preventDefault();
    try {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_BASE_API}packageRequestService/updatePackageRequestService/${selectedRequestService?.packageServiceId}`,
          dataUpdate,
          {
            headers: authHeader(),
          }
        )
        .then((response) => {
          toast.success("Cập nhật gói tư vấn thành công");
          onClose();
          fetchPendingServices();
        })
        .catch((error) => {
          toast.error("Cập nhật gói thất bại!");
        });
    } catch (error) {
      toast.error("Cập nhật gói thất bại!");
      console.log(error);
    }
  };

  //search
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  // Filter partners based on search term
  const filteredPacks = services.filter((service) =>
    service.packageRequestServiceName
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  //pagination
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(filteredPacks.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredPacks.slice(start, end);
  }, [page, filteredPacks]);

  //delete
  const handleDelete = async (packageId: string) => {
    Swal.fire({
      title: "Bạn có muốn xóa gói này không?",
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: "Có",
      denyButtonText: `Không`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          axios
            .patch(
              `${process.env.NEXT_PUBLIC_BASE_API}packageRequestService/deletePackageRequestService/${packageId}`,
              {},
              { headers: authHeader() }
            )
            .then(() => {
              toast.success("Xóa thành công");
              fetchPendingServices();
            })
            .catch((err) => {
              toast.error("Xóa thất bại!");
            });
        } catch (error) {
          console.log(error);
        }
      } else if (result.isDenied) {
        Swal.fire("Bạn đã hủy xóa", "", "error");
        return;
      }
    });
  };

  // restore
  const restoreDelete = async (id: string) => {
    try {
      axios
        .patch(
          `${process.env.NEXT_PUBLIC_BASE_API}packageRequestService/restorePackageRequestService/${id}`,
          {},
          { headers: authHeader() }
        )
        .then((response) => {
          toast.success("Khôi phục thành công");
          fetchDeletedService();
        });
    } catch (error) {
      toast.error("Khôi phục thất bại!");
      console.log(error);
    }
  };

  // unApprove
  const unApprove = async (id: string) => {
    try {
      axios
        .patch(
          `${process.env.NEXT_PUBLIC_BASE_API}packageRequestService/unApprovePackageRequestService/${id}`,
          {},
          { headers: authHeader() }
        )
        .then((response) => {
          toast.success("Bạn đã chuyển dịch vụ này sang chờ duyệt");
          fetchServices();
        });
    } catch (error) {
      toast.error("Chuyển sang chờ duyệt thất bại");
      console.log(error);
    }
  };

  // Approve
  const approve = async (id: string) => {
    try {
      axios
        .patch(
          `${process.env.NEXT_PUBLIC_BASE_API}packageRequestService/approvePackageRequestService/${id}`,
          {},
          { headers: authHeader() }
        )
        .then((response) => {
          toast.success("Duyệt thành công");
          fetchPendingServices();
        });
    } catch (error) {
      toast.error("Duyệt thật bại, vui lòng kiểm tra lại!");
      console.log(error);
    }
  };

  return (
    <div className="w-full mt-5 ml-5 mr-5">
      <ToastContainer />
      <div className="grid grid-cols-2 border-b-2 pb-5">
        <Breadcrumbs color="danger" size="lg" className="text-3xl">
          <BreadcrumbItem>
            <p className="text-black font-bold text-3xl ">Quản lí dịch vụ</p>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <p className="text-[#FF0004] font-bold text-3xl">Gói dịch vụ</p>
          </BreadcrumbItem>
        </Breadcrumbs>

        <div className="flex justify-end">
          <Button
            className="flex justify-end w-[100px] bg-[#FF0004] text-white"
            radius="full"
            onPress={onOpen}
          >
            <FontAwesomeIcon icon={faPlus} />
            Tạo mới
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
            <ModalContent>
              {(onClose) => (
                <>
                  <form onSubmit={(e) => handleSubmit(e, onClose)}>
                    <ModalHeader className="flex flex-col gap-1 text-white text-2xl font-bold bg-[#FF0004] mb-5">
                      Thêm gói dịch vụ
                    </ModalHeader>
                    <ModalBody>
                      <Input
                        type="text"
                        isRequired
                        label="Tên gói"
                        onChange={(e) => {
                          setPackageRequestServiceName(e.target.value);
                        }}
                      />
                      <Input
                        type="number"
                        label="Giá gói"
                        endContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              Đồng
                            </span>
                          </div>
                        }
                        // value={newRequestPack.price.toString}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        min="1"
                      />
                      <Input
                        type="number"
                        label="Số lần gửi yêu cầu"
                        endContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              Lần
                            </span>
                          </div>
                        }
                        // value={newRequestPack.price.toString}
                        onChange={(e) =>
                          setTotalOfRequest(Number(e.target.value))
                        }
                        min="1"
                      />
                      <Textarea
                        type="text"
                        label="Chi tiết"
                        // value={serviceDescription}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Đóng
                      </Button>
                      <Button color="primary" type="submit">
                        Thêm
                      </Button>
                    </ModalFooter>
                  </form>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
      <div className="flex flex-row gap-10 font-bold border-b-1 my-5">
        <div>
          <Button
            className={`bg-white ${tabs === 1 && "text-[#FF0004] border-b-2 border-[#FF0004]"
              }`}
            onClick={() => {
              setTabs(1), setPage(1);
            }}
            radius="none"
          >
            TẤT CẢ
          </Button>
        </div>
        <div>
          <Button
            className="bg-white"
            onClick={() => {
              setTabs(2), setPage(1);
            }}
            radius="none"
          >
            CHỜ DUYỆT
          </Button>
        </div>
        <div>
          <Button
            className={`bg-white ${tabs === 3 &&
              "text-[#FF0004] border-b-[#FF0004] border-b-2 border-[#FF0004]"
              }`}
            radius="none"
            onClick={() => {
              setTabs(3), setPage(1);
            }}
          >
            KHÔNG SỬ DỤNG
          </Button>
        </div>
      </div>
      <Table
        aria-label="Example static collection table"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              showControls
              classNames={{
                wrapper: "gap-0 overflow-visible h-8 ",
                item: "w-8 h-8 text-small rounded-none bg-transparent",
                cursor:
                  "bg-gradient-to-b shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
              }}
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader className="">
          <TableColumn className=" bg-[#FF0004] text-white">
            Tên gói
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">Giá</TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Chi tiết
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Trạng thái
          </TableColumn>
          <TableColumn className="flex justify-center items-center bg-[#FF0004] text-white">
            Tương tác
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((pack, index) => (
            <TableRow key={index}>
              <TableCell>{pack.packageRequestServiceName}</TableCell>
              <TableCell>{pack.price.toLocaleString()} VND</TableCell>
              <TableCell>{pack.description}</TableCell>
              <TableCell>
                <span style={{ color: pack.deleted ? "red" : "green" }}>
                  {pack.deleted ? "Không sử dụng" : "Đang hoạt động"}
                </span>
              </TableCell>
              {pack.deleted === false ? (
                pack.processStatus === "CHỜ DUYỆT" ? (
                  <TableCell className="flex gap-2 items-center  justify-center">
                    <Button
                      className="bg-green-600 text-white"
                      onClick={() => approve(pack.packageServiceId)}
                    >
                      Duyệt
                    </Button>
                    <Button
                      className="bg-blue-600 text-white"
                      onPress={() => {
                        setSelectedRequestService(pack);
                        onOpenUpdate();
                      }}
                    >
                      Cập nhật
                    </Button>

                    <Button
                      className="bg-[#FF0004] text-white"
                      onClick={() => handleDelete(pack.packageServiceId)}
                    >
                      Xóa
                    </Button>
                  </TableCell>
                ) : (
                  <TableCell className="flex gap-2 items-center  justify-center ">
                    <Button
                      className="bg-blue-600 text-white"
                      onPress={() => {
                        unApprove(pack.packageServiceId);
                      }}
                    >
                      Chuyển chờ duyệt
                    </Button>
                  </TableCell>
                )
              ) : (
                <TableCell className="flex items-center justify-center">
                  <Button
                    className="bg-blue-600 text-white"
                    onClick={() => restoreDelete(pack.packageServiceId)}
                  >
                    Khôi phục
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* update modal */}
      <Modal isOpen={isOpenUpdate} onClose={onCloseUpdate} hideCloseButton>
        <ModalContent>
          <form onSubmit={(e) => handleUpdateSubmit(e, onCloseUpdate)}>
            <ModalHeader className="flex flex-col gap-1 text-white text-2xl font-bold bg-[#FF0004] mb-5">
              Cập nhật gói dịch vụ tư vấn
            </ModalHeader>
            <ModalBody>
              {selectedRequestService && (
                <>
                  <Input
                    type="text"
                    label="Tên công việc"
                    value={selectedRequestService.packageRequestServiceName}
                    onChange={(e: any) =>
                      setSelectedRequestService({
                        ...selectedRequestService,
                        packageRequestServiceName: e.target.value,
                      })
                    }
                  />
                  <Input
                    type="number"
                    label="Giá gói"
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">
                          Đồng
                        </span>
                      </div>
                    }
                    value={selectedRequestService.price.toString()}
                    onChange={(e: any) =>
                      setSelectedRequestService({
                        ...selectedRequestService,
                        price: e.target.value,
                      })
                    }
                    min="1"
                  />
                  <Input
                    type="number"
                    label="Số lần gửi yêu cầu"
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">Lần</span>
                      </div>
                    }
                    value={selectedRequestService.totalRequest.toString()}
                    onChange={(e: any) =>
                      setSelectedRequestService({
                        ...selectedRequestService,
                        totalRequest: e.target.value,
                      })
                    }
                    min="1"
                  />
                  <Textarea
                    type="text"
                    label="Chi tiết"
                    value={selectedRequestService.description}
                    onChange={(e: any) =>
                      setSelectedRequestService({
                        ...selectedRequestService,
                        description: e.target.value,
                      })
                    }
                  />
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onCloseUpdate}>
                Đóng
              </Button>
              <Button color="primary" type="submit">
                Cập nhật
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Pack;
