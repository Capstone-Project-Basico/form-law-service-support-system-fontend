'use client';

import authHeader from '@/components/authHeader/AuthHeader';
import User from '@/components/authHeader/User';
import {
    ConsultServiceType,
    PackType,
    RequestWithdrawalType,
    ServiceType,
    UserLocal,
} from '@/constants/types/homeType';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
} from '@nextui-org/react';
import axios from 'axios';
import { headers } from 'next/headers';
import React, { FormEvent, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Page = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [tabs, setTabs] = useState(1);
    const [requests, setRequests] = useState<RequestWithdrawalType[]>([]);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        switch (tabs) {
            case 1:
                fetchRequestWithdrawal();
                break;
            case 2:
                fetchDoneRequestWithdrawal();
                break;
            case 3:
                fetchDeleteRequestWithdrawal();
                break;
            default:
                fetchRequestWithdrawal();
                break;
        }
    }, [tabs]);

    const fetchRequestWithdrawal = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_API}request-withdrawal/getAllRequests`
            );
            const filteredRequest = response.data.data.filter(
                (service: RequestWithdrawalType) =>
                    service.deleted === false && service.processStatus === 'CHỜ THANH TOÁN'
            );

            setRequests(filteredRequest);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDoneRequestWithdrawal = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_API}request-withdrawal/getAllRequests`
            );
            const filteredRequest = response.data.data.filter(
                (service: RequestWithdrawalType) =>
                    service.deleted === false && service.processStatus === 'ĐÃ THANH TOÁN'
            );

            setRequests(filteredRequest);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDeleteRequestWithdrawal = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_API}request-withdrawal/getAllDeletedRequestss`
            );
            setRequests(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Filter partners based on search term
    const filteredPacks = requests.filter((request) =>
        request.fullName
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


    //complete
    const complete = async (id: string) => {
        Swal.fire({
            text: 'Bạn đã hoàn thành yêu cầu này?',
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: 'Có',
            denyButtonText: `Không`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                try {
                    axios
                        .put(
                            `${process.env.NEXT_PUBLIC_BASE_API}request-withdrawal/completeRequest/${id}`,
                            {},
                            { headers: authHeader() }
                        )
                        .then((response) => {
                            toast.success('Bạn đã giải quyết yêu cầu này');
                            fetchRequestWithdrawal();
                        }).catch((error) => {
                            toast.error('Giải quyết yêu cầu này thất bại');
                        });
                } catch (error) {
                    toast.error('Giải quyết yêu cầu này thất bại');
                    console.log(error);
                }
            } else if (result.isDenied) {
                Swal.fire('Tiếp tục giải quyết công việc này');
                return;
            }
        });
    };

    const handleDelete = async (packageId: string) => {
        Swal.fire({
            text: 'Bạn có muốn xóa yêu cầu này không?',
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: 'Có',
            denyButtonText: `Không`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                try {
                    axios
                        .patch(
                            `${process.env.NEXT_PUBLIC_BASE_API}request-withdrawal/softDeleteRequest/${packageId}`,
                            {},
                            { headers: authHeader() }
                        )
                        .then(() => {
                            toast.success('Xóa thành công');
                            fetchRequestWithdrawal();
                        })
                        .catch((err) => {
                            toast.error('Xóa thất bại!');
                        });
                } catch (error) {
                    console.log(error);
                }
            } else if (result.isDenied) {
                Swal.fire('Bạn đã hủy xóa', '', 'error');
                return;
            }
        });
    };

    const restoreDelete = async (packageId: string) => {
        try {
            axios
                .patch(
                    `${process.env.NEXT_PUBLIC_BASE_API}request-withdrawal/restoreRequest/${packageId}`,
                    {},
                    { headers: authHeader() }
                )
                .then(() => {
                    toast.success('Khôi phục thành công');
                    fetchDeleteRequestWithdrawal();
                })
                .catch((err) => {
                    toast.error('Khôi phục thất bại!');
                });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="ml-5 mr-5 mt-5 w-full">
            <ToastContainer />
            <div className="grid grid-cols-2 border-b-2 pb-5">
                <Breadcrumbs color="danger" size="lg" className="text-3xl">
                    <BreadcrumbItem>
                        <p className="text-3xl font-bold text-[#FF0004]">Quản lí yêu cầu rút tiền</p>
                    </BreadcrumbItem>
                </Breadcrumbs>
            </div>

            <div className="my-5 flex flex-row gap-10 border-b-1 font-bold">
                <div>
                    <Button
                        className={`bg-white ${tabs === 1 && 'border-b-2 border-[#FF0004] text-[#FF0004]'
                            }`}
                        onClick={() => {
                            setTabs(1), setPage(1);
                        }}
                        radius="none"
                    >
                        CHỜ DUYỆT
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
                        ĐÃ HOÀN THÀNH
                    </Button>
                </div>
                <div>
                    <Button
                        className="bg-white"
                        onClick={() => {
                            setTabs(3), setPage(1);
                        }}
                        radius="none"
                    >
                        SPAM
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
                }
            >
                <TableHeader className="">
                    <TableColumn className=" bg-[#FF0004] text-white">
                        Tên tài khoản
                    </TableColumn>
                    <TableColumn className=" w-[200px] bg-[#FF0004] text-white">
                        Số tiền muốn rút
                    </TableColumn>
                    <TableColumn className=" bg-[#FF0004] text-white">
                        Tên ngân hàng
                    </TableColumn>
                    <TableColumn className=" bg-[#FF0004] text-white">
                        Số tài khoản
                    </TableColumn>
                    <TableColumn className="flex items-center justify-center bg-[#FF0004] text-white">
                        Tương tác
                    </TableColumn>
                </TableHeader>
                <TableBody>
                    {items.map((request, index) => (
                        <TableRow key={index}>
                            <TableCell>{request.fullName}</TableCell>
                            <TableCell className=" w-[200px]">
                                {request.balance.toLocaleString()} VND
                            </TableCell>
                            <TableCell>{request.bankName}</TableCell>
                            <TableCell>{request.bankNumber}</TableCell>

                            {request.deleted === false ? (
                                request.processStatus === 'CHỜ THANH TOÁN' ? (
                                    <TableCell className="flex items-center justify-center  gap-2">
                                        <Button
                                            className="bg-blue-600 text-white"
                                            onClick={() => complete(request.requestId)}
                                        >
                                            Hoàn thành
                                        </Button>
                                        <Button
                                            className="bg-[#FF0004] text-white"
                                            onClick={() => handleDelete(request.requestId)}
                                        >
                                            Xóa
                                        </Button>
                                    </TableCell>
                                ) : (
                                    <TableCell className="flex items-center justify-center  gap-2 ">
                                        <Button
                                            className="bg-green-600 text-white"
                                            onPress={() => {
                                                // unApprove(request.packageServiceId);
                                            }}
                                            disabled
                                        >
                                            Đã hoàn thành
                                        </Button>
                                    </TableCell>
                                )
                            ) : (
                                <TableCell className="flex items-center justify-center">
                                    <Button
                                        className="bg-blue-600 text-white"
                                        onClick={() => restoreDelete(request.requestId)}
                                    >
                                        Khôi phục
                                    </Button>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default Page