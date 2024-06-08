'use client';

import authHeader from '@/components/authHeader/AuthHeader';
import { ConfigType } from '@/constants/types/homeType';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
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
  useDisclosure,
} from '@nextui-org/react';
import axios from 'axios';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Page = () => {
  const [tabs, setTabs] = useState(1);
  const [configs, setConfigs] = useState<ConfigType[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();
  const [selectedConfig, setSelectedConfig] = useState<ConfigType>();
  //new config data
  const [configName, setConfigName] = useState('');
  const [configParam, setConfigParam] = useState('');
  const [configValue, setConfigValue] = useState('');
  let newConfig = {
    configName,
    configParam,
    configValue,
  };

  useEffect(() => {
    switch (tabs) {
      case 1:
        fetchConfigs();
        break;
      case 2:
        fetchDeletedConfigs();
        break;
      default:
        fetchConfigs();
        break;
    }
  }, [tabs]);

  //get all items
  const fetchConfigs = async () => {
    try {
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_API}systemConfig/getAllConfigs`, {
          headers: authHeader(),
        })
        .then((response) => {
          setConfigs(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDeletedConfigs = async () => {
    try {
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_API}systemConfig/getAllConfigs`, {
          headers: authHeader(),
        })
        .then((response) => {
          setConfigs(
            response.data.data.filter(
              (config: ConfigType) => config.deleted === true
            )
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  //pagination
  const [page, setPage] = useState(1);
  useEffect(() => {
    setPage(1);
  }, [tabs]);
  const rowsPerPage = 5;

  const pages = Math.ceil(configs.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return configs.slice(start, end);
  }, [page, configs]);

  //add new
  const handleSubmit = async (e: FormEvent, onClose: () => void) => {
    e.preventDefault();

    try {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_BASE_API}systemConfig/createConfig`,
          newConfig,
          { headers: authHeader() }
        )
        .then((response) => {
          toast.success('Tạo mới thành công');
          fetchConfigs();
          onClose();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  //add new
  const handleUpdateSubmit = async (e: FormEvent, onClose: () => void) => {
    e.preventDefault();

    try {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_BASE_API}systemConfig/updateConfig/${selectedConfig?.id}`,
          selectedConfig,
          { headers: authHeader() }
        )
        .then((response) => {
          toast.success('Cập nhật thành công');
          fetchConfigs();
          onClose();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  //delete
  const handleDelete = (id: string) => {
    try {
      axios
        .delete(
          `${process.env.NEXT_PUBLIC_BASE_API}systemConfig/deleteConfig/${id}`,
          { headers: authHeader() }
        )
        .then(() => {
          fetchConfigs();
          toast.success('Xóa thành công');
        })
        .catch(() => {
          toast.error('Xóa thất bại vui lòng kiểm tra lại!');
        });
    } catch (error) {}
  };

  //restore
  const restoreDelete = (id: string) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ml-5 mr-5 mt-5 w-full">
      <ToastContainer />

      <div className="grid grid-cols-2">
        <div className="text-3xl font-bold text-black ">Quản lí hệ thống</div>

        <div className="flex justify-end">
          <Button
            className="flex w-[100px] justify-end bg-[#FF0004] text-white"
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
                    <ModalHeader className="mb-5 flex flex-col gap-1 bg-[#FF0004] text-2xl font-bold text-white">
                      Thêm cài đặt hệ thống
                    </ModalHeader>
                    <ModalBody>
                      <Input
                        className="font-bold"
                        type="text"
                        label="Tên cài đặt"
                        value={configName}
                        onChange={(e) => setConfigName(e.target.value)}
                        isRequired
                      />
                      <Input
                        isRequired
                        type="text"
                        label="Biến cài đặt"
                        value={configParam}
                        onChange={(e) => setConfigParam(e.target.value)}
                      />
                      <Input
                        isRequired
                        type="number"
                        label="Giá trị"
                        value={configValue}
                        onChange={(e) => setConfigValue(e.target.value)}
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

      <div className="flex flex-row gap-10 border-b-1 pb-10 font-bold">
        <div>
          {/* <Button
            className={`bg-white ${
              tabs === 1 && 'border-b-2 border-[#FF0004] text-[#FF0004]'
            }`}
            onClick={() => setTabs(1)}
            radius="none"
          >
            TẤT CẢ
          </Button> */}
        </div>
        <div>
          {/* <Button
            className={`bg-white ${
              tabs === 2 && 'border-b-2 border-[#FF0004] text-[#FF0004]'
            }`}
            onClick={() => setTabs(2)}
            radius="none"
          >
            KHÔNG SỬ DỤNG
          </Button> */}
        </div>
      </div>
      <Table
        aria-label="Example static collection table"
        bottomContent={
          pages > 1 && (
            <div className="flex w-full justify-center">
              <Pagination
                showControls
                classNames={{
                  wrapper: 'gap-0 overflow-visible h-8 ',
                  item: 'w-8 h-8 text-small rounded-none bg-transparent',
                  cursor:
                    'bg-gradient-to-b shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold',
                }}
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          )
        }
      >
        <TableHeader className="">
          <TableColumn className=" bg-[#FF0004] text-white">
            Tên cài đặt
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Biến cài đặt
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Giá trị
          </TableColumn>
          <TableColumn className="flex items-center justify-center bg-[#FF0004] text-white">
            Tương tác
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((config, index) => (
            <TableRow key={index}>
              <TableCell className="font-bold">{config.configName}</TableCell>
              <TableCell>{config.configParam}</TableCell>
              <TableCell>{config.configValue}</TableCell>
              {!config.deleted ? (
                <TableCell className="flex items-center justify-center gap-2">
                  <Button
                    className="bg-orange-600 text-white"
                    onPress={() => {
                      setSelectedConfig(config);
                      onOpenUpdate();
                    }}
                  >
                    Cập nhật
                  </Button>
                  {/* <Button
                    className="bg-[#FF0004] text-white"
                    onClick={() => handleDelete(config.id)}
                  >
                    Xóa
                  </Button> */}
                  {/* <Button
                    className="bg-green-600 text-white"
                  onClick={() => {
                    setSelectedPost(post);
                    onOpen();
                  }}
                  >
                    Chi tiết
                  </Button> */}
                </TableCell>
              ) : (
                <TableCell className="flex items-center justify-center gap-2">
                  <Button
                    className="bg-blue-600 text-white"
                    onClick={() => restoreDelete(config.id)}
                  >
                    Khôi phục
                  </Button>
                  <Button
                    className="bg-green-600 text-white"
                    onClick={() => {
                      // setSelectedPost(post);
                      // onOpen();
                    }}
                  >
                    Chi tiết
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal update */}
      <Modal isOpen={isOpenUpdate} onOpenChange={onCloseUpdate} hideCloseButton>
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={(e) => handleUpdateSubmit(e, onClose)}>
                <ModalHeader className="mb-5 flex flex-col gap-1 bg-[#FF0004] text-2xl font-bold text-white">
                  Chỉnh sửa cài đặt hệ thống
                </ModalHeader>
                <ModalBody>
                  {selectedConfig && (
                    <>
                      <Input
                        className="font-bold"
                        type="text"
                        label="Tên cài đặt"
                        value={selectedConfig.configName}
                        onChange={(e) =>
                          setSelectedConfig({
                            ...selectedConfig,
                            configName: e.target.value,
                          })
                        }
                        isRequired
                      />
                      <Input
                        isRequired
                        type="text"
                        label="Biến cài đặt"
                        readOnly
                        value={selectedConfig.configParam}
                        onChange={(e) =>
                          setSelectedConfig({
                            ...selectedConfig,
                            configParam: e.target.value,
                          })
                        }
                      />
                      <Input
                        isRequired
                        type="number"
                        label="Giá trị"
                        value={selectedConfig.configValue}
                        onChange={(e) =>
                          setSelectedConfig({
                            ...selectedConfig,
                            configValue: e.target.value,
                          })
                        }
                      />
                    </>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Đóng
                  </Button>
                  <Button color="primary" type="submit">
                    Cập nhật
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Page;
