import axios from 'axios';
import React, { FormEvent, useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Breadcrumbs,
  BreadcrumbItem,
  Button,
  Input,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Navbar,
  NavbarContent,
  NavbarItem,
  MenuItem,
  Pagination,
  Spinner,
} from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { PartnerType } from '@/constants/types/homeType';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '@/app/firebase';
import Image from 'next/image';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import authHeader from '../authHeader/AuthHeader';

type PartnersProps = {
  partners: PartnerType[];
  tabs: number;
  handleDelete: (id: number) => void;
  unApprove: (id: number) => void;
  restoreDelete: (id: number) => void;
  handleApprove: (id: number) => void;
  handleUpdateSubmit: (data: any) => void;
};

const Partners: React.FC<PartnersProps> = ({
  partners,
  unApprove,
  tabs,
  handleDelete,
  restoreDelete,
  handleApprove,
  handleUpdateSubmit,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPartner, setSelectedPartner] = useState<PartnerType | null>(
    null
  );

  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();
  //upload file
  // const [imageUrls, setImageUrls] = useState<string[]>([]);
  // const [imageUrl, setImageUrl] = useState<string>();
  const imagesListRef = ref(storage, 'partners/');
  const [uploading, setUploading] = useState(false);

  //search
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  // Filter partners based on search term
  const filteredPartners = partners.filter((partner) =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //pagination
  const [page, setPage] = useState(1);
  useEffect(() => {
    setPage(1);
  }, [tabs]);

  const rowsPerPage = 5;

  const pages = Math.ceil(filteredPartners.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredPartners.slice(start, end);
  }, [page, filteredPartners]);

  //upload update file
  const uploadUpdateFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    // First, check if the files array is not null and has at least one file
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]; // Safely access the first file

      // Create a unique file name for the storage to avoid name conflicts
      const uniqueFileName = `partners/${file.name}-${uuidv4()}`;
      const storageRef = ref(storage, uniqueFileName);

      const uploadTask = uploadBytesResumable(storageRef, file); // Start the file upload

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Optional: monitor upload progress
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error('Upload failed', error);
          setUploading(false); // Hide the spinner on error
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);

            if (!selectedPartner) {
              console.error('No partner selected for update.');
              return;
            }

            // Update the state with the new avatar URL
            setSelectedPartner({
              ...selectedPartner,
              avatar: downloadURL,
            });
            setUploading(false);
            // Optionally: Update the partner's information in the database or state here
            // This might involve calling an API endpoint or updating local state
          });
        }
      );
    } else {
      console.error('No file selected for upload.');
    }
  };

  return (
    <div>
      <ToastContainer />
      <div>
        <div className="my-10 flex flex-row">
          <Input
            classNames={{
              base: 'w-full sm:max-w-[10rem] h-10',
              mainWrapper: 'h-full w-96',
              input: 'text-small',
              inputWrapper:
                'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 ',
            }}
            placeholder="Từ khóa tìm kiếm .."
            size="sm"
            type="search"
            radius="none"
            value={searchTerm}
            onChange={handleSearchChange}
          />
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
            Tên đối tác
          </TableColumn>
          <TableColumn className=" items-center justify-center bg-[#FF0004] text-white">
            Hình ảnh
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Liên kết trang web
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Trạng thái
          </TableColumn>
          <TableColumn className="flex items-center justify-center bg-[#FF0004] text-white">
            Tương tác
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((partner, index) => (
            <TableRow key={index}>
              <TableCell className="font-bold">{partner.name}</TableCell>
              <TableCell>
                {
                  <Image
                    src={
                      partner.avatar
                        ? partner.avatar.startsWith('http')
                          ? partner.avatar
                          : `/${partner.avatar}`
                        : '/errorImage.png'
                    }
                    alt=""
                    width={100}
                    height={100}
                  />
                }
              </TableCell>
              <TableCell>
                <Link href={partner.link}>{partner.link}</Link>
              </TableCell>
              <TableCell>
                <span style={{ color: partner.delete ? 'red' : 'green' }}>
                  {partner.delete ? 'Không sử dụng' : 'Đang hoạt động'}
                </span>
              </TableCell>
              {!partner.delete ? (
                <TableCell className="mt-4 flex items-center justify-center gap-2">
                  {partner.processStatus === 'CHỜ DUYỆT' ? (
                    <>
                      {/* <Button
                        className="bg-blue-600 text-white"
                        onClick={() => handleApprove(partner.partnerId)}
                      >
                        Chập nhận
                      </Button> */}
                      <Button
                        className="bg-blue-600 text-white"
                        onPress={() => {
                          setSelectedPartner(partner);
                          onOpenUpdate();
                        }}
                      >
                        Cập nhật
                      </Button>
                      {/* <Button
                        className="bg-[#FF0004] text-white"
                        onClick={() => handleDelete(partner.partnerId)}
                      >
                        Từ chối và xóa
                      </Button> */}
                    </>
                  ) : (
                    <>
                      {/* <Button
                        className="bg-blue-600 text-white"
                        onClick={() => unApprove(partner.partnerId)}
                      >
                        Chuyển về chờ duyệt
                      </Button> */}
                    </>
                  )}
                </TableCell>
              ) : (
                <TableCell className="flex items-center justify-center gap-2">
                  <Button
                    className="bg-blue-600 text-white"
                    onClick={() => restoreDelete(partner.partnerId)}
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
          <ModalHeader className="mb-5 flex flex-col gap-1 bg-[#FF0004] text-2xl font-bold text-white">
            Cập nhật liên hệ
          </ModalHeader>
          <ModalBody>
            {selectedPartner && (
              <form
                id="partner"
                onSubmit={(e) => {
                  console.log(e);
                  e.preventDefault();
                  handleUpdateSubmit(selectedPartner);
                  onCloseUpdate();
                }}
              >
                <Input
                  type="text"
                  label="Name"
                  value={selectedPartner.name}
                  onChange={(e: any) =>
                    setSelectedPartner({
                      ...selectedPartner,
                      name: e.target.value,
                    })
                  }
                />
                <input
                  className="py-3"
                  type="file"
                  onChange={(e) => uploadUpdateFile(e)}
                />
                {uploading && <Spinner />}
                <Input
                  type="text"
                  label="Link"
                  value={selectedPartner.link}
                  onChange={(e: any) =>
                    setSelectedPartner({
                      ...selectedPartner,
                      link: e.target.value,
                    })
                  }
                />
              </form>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onCloseUpdate}>
              Đóng
            </Button>
            <Button
              color="primary"
              type="submit"
              form="partner"
              disabled={uploading}
            >
              Cập nhật
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Partners;
