"use client";

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
  Spinner,
} from "@nextui-org/react";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { PartnerType, UserLocal } from "@/constants/types/homeType";
import { ToastContainer, toast } from "react-toastify";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
  StorageReference,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "@/app/firebase";
import Partners from "@/components/manage/Partner";
import { v4 as uuidv4 } from "uuid";
import authHeader from "@/components/authHeader/AuthHeader";
import Swal from "sweetalert2";

const Partner = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tabs, setTabs] = useState(1);

  //data
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [link, setLink] = useState("");
  // const [imageRef, setImageRef] = useState<StorageReference | undefined>();
  const [partners, setPartners] = useState<PartnerType[]>([]);
  //const [selectedPartner, setSelectedPartner] = useState<PartnerType | null>(null);
  const getUserFromStorage = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
  };

  const user: UserLocal | null = getUserFromStorage();
  const userId = user?.data.data.userId;
  let newPartner = {
    name,
    avatar,
    link,
    userId,
  };
  const imagesListRef = ref(storage, "avatars/");
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  // const [selectedPartner, setSelectedPartner] = useState<PartnerType | null>(
  //   null
  // );
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    switch (tabs) {
      case 1:
        fetchPartners();
        break;
      case 2:
        fetchPendingPartners();
        break;
      case 3:
        fetchDeletedPartner();
        break;
      default:
        fetchPartners();
        break;
    }
  }, [tabs]);

  //get all items
  const fetchPartners = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}partner/getAllApprovePartner`
      );
      setPartners(response.data.data);
      // setPartners((prevPartners) => [...prevPartners, response.data.data]);
    } catch (error) {
      console.error(error);
    }
  };

  //get all pending partners
  const fetchPendingPartners = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}partner/getAllPartners`
      );
      const filteredPosts = response.data.data.filter(
        (partner: PartnerType) =>
          partner.processStatus === "CHỜ DUYỆT" && partner.delete === false
      );
      setPartners(filteredPosts);
    } catch (error) { }
  };

  //get all deleted items
  const fetchDeletedPartner = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}partner/getAllDeletedPartners`
      );
      setPartners(response.data.data);
      // setPartners((prevPartners) => [...prevPartners, response.data.data]);
    } catch (error) {
      console.error(error);
    }
  };

  //delete
  const handleDelete = async (partnerId: number) => {
    Swal.fire({
      text: "Bạn có muốn xóa bài viết này không?",
      showDenyButton: true,
      confirmButtonText: "Có",
      confirmButtonColor: '#00BB00',
      denyButtonText: `Không`,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios
            .delete(
              `${process.env.NEXT_PUBLIC_BASE_API}partner/deletePartner/${partnerId}`,
              {
                headers: authHeader(),
              }
            )
            .then(() => {
              toast.success("Xóa thành công");
              if (tabs === 1) {
                fetchPartners();
              } else {
                fetchPendingPartners();
              }
            }),
          {
            headers: authHeader(),
          };
        } catch (error) {
          console.log(error);
        }
      } else if (result.isDenied) {
        Swal.fire("Bạn đã hủy xóa", "", "error");
        return;
      }
    });
  };

  //update
  const handleUpdateSubmit = async (selectedPartner: any, onClose: () => void) => {
    try {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_BASE_API}partner/updatePartner/${selectedPartner.partnerId}`,
          {
            name: selectedPartner.name,
            avatar: selectedPartner.avatar,
            link: selectedPartner.link,
          }
        )
        .then((response) => {
          toast.success("Cập nhật thành công");
          fetchPendingPartners();
          onClose();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);

    }

  };

  // restore
  const restoreDelete = async (partnerId: number) => {
    try {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_BASE_API}partner/restoreDelete/${partnerId}`
        )
        .then((response) => {
          toast.success("Khôi phục thành công");
          fetchDeletedPartner();
        });
    } catch (error) {
      console.log(error);
    }
  };

  //upload file
  const uploadFile = (e: any) => {
    setUploading(true);
    setImageUpload(e.target.files[0]);
    let image = e.target.files[0];

    if (image == null) return;
    const storageRef = ref(storage, "/images/" + image.name + uuidv4()); // Create a reference to '/images/imageName'

    const uploadTask = uploadBytesResumable(storageRef, image); // Start the file upload

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Handle progress updates here, if you wish
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads here
        console.error(error);
        setUploading(false); // Hide the spinner on error
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setAvatar(downloadURL);
        });
        setUploading(false);
      }
    );
  };

  //add a new partner
  const handleSubmit = async (e: FormEvent, onClose: () => void) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_API}partner/createNewPartner`,
        newPartner
      )

      .then((response) => {
        // setPartners((prevPartners) => [...prevPartners, response.data.data]);
        toast.success("Tạo mới thành công");
        fetchPartners();
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // approve
  const handleApprove = async (partnerId: number) => {
    try {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_BASE_API}partner/approvePartner/${partnerId}`,
          {},
          {
            headers: authHeader(),
          }
        )
        .then((response) => {
          toast.success("Đối tác đã được chấp nhận");
          fetchPartners();
          fetchPendingPartners();
        })
        .catch(() => {
          toast.error("Duyệt thất bại!");
        });
    } catch (error) {
      console.log(error);
    }
  };

  // unApprove
  const unApprove = async (id: number) => {
    try {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_BASE_API}partner/unApprovePartner/${id}`,
          {},
          { headers: authHeader() }
        )
        .then((response) => {
          toast.success("Bạn đã chuyển đối tác này sang chờ duyệt thành công");
          fetchPartners();
        });
    } catch (error) {
      toast.error("Chuyển sang chờ duyệt thất bại");
      console.log(error);
    }
  };

  return (
    <div className="w-full mt-5 ml-5 mr-5">
      <div className="grid grid-cols-2">
        <Breadcrumbs color="danger" size="lg" className="text-3xl">
          <BreadcrumbItem>
            <p className="text-black font-bold text-3xl ">Quản lí thông tin</p>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <p className="text-[#FF0004] font-bold text-3xl">Đối tác</p>
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
                      Thêm đối tác
                    </ModalHeader>
                    <ModalBody>
                      <Input
                        className="font-bold"
                        type="text"
                        label="Tên đối tác"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        isRequired
                      />
                      <div>
                        <input
                          className="py-3"
                          type="file"
                          onChange={(e) => uploadFile(e)}
                        />
                        {uploading && <Spinner />}
                      </div>
                      <Input
                        type="text"
                        label="Link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Đóng
                      </Button>
                      <Button
                        color="primary"
                        type="submit"
                        disabled={uploading}
                      >
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

      <div className="flex flex-row gap-10 font-bold border-b-1 ">
        <div>
          <Button
            className={`bg-white ${tabs === 1 && "text-[#FF0004] border-b-2 border-[#FF0004]"
              }`}
            onClick={() => setTabs(1)}
            radius="none"
          >
            TẤT CẢ
          </Button>
        </div>

        <div>
          <Button
            className={`bg-white ${tabs === 2 && "text-[#FF0004] border-b-2 border-[#FF0004]"
              }`}
            onClick={() => setTabs(2)}
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
            onClick={() => setTabs(3)}
          >
            KHÔNG SỬ DỤNG
          </Button>
        </div>
      </div>

      <div>
        <Partners
          partners={partners}
          unApprove={unApprove}
          handleDelete={handleDelete}
          restoreDelete={restoreDelete}
          handleApprove={handleApprove}
          handleUpdateSubmit={handleUpdateSubmit}
          tabs={tabs}
        />
      </div>
    </div>
  );
};

export default Partner;
