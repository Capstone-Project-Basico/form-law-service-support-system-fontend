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
} from "@nextui-org/react";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { PartnerType } from "@/constants/types/homeType";
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

  let newPartner = {
    name,
    avatar,
    link,
  };
  const imagesListRef = ref(storage, "partners/");
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  // const [selectedPartner, setSelectedPartner] = useState<PartnerType | null>(
  //   null
  // );

  useEffect(() => {
    switch (tabs) {
      case 1:
        fetchPartners();
        break;
      case 2:
        console.log("dang cho duyet ne");
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
        `${process.env.BASE_API}partner/getAllPartners`
      );
      setPartners(response.data.data);
      // setPartners((prevPartners) => [...prevPartners, response.data.data]);
    } catch (error) {
      console.error(error);
    }
  };

  //get all deleted items
  const fetchDeletedPartner = async () => {
    try {
      const response = await axios.get(
        `${process.env.BASE_API}partner/getAllDeletedPartners`
      );
      setPartners(response.data.data);
      // setPartners((prevPartners) => [...prevPartners, response.data.data]);
    } catch (error) {
      console.error(error);
    }
  };

  //delete
  const handleDelete = async (partnerId: number) => {
    const isConfirmed = window.confirm(
      "Bạn có chắc muốn xóa đối tác này không?"
    );
    if (isConfirmed) {
      try {
        const userString = localStorage.getItem("user"); // Assuming the token is stored with the key "token"
        if (!userString) {
          console.log("No user found");
          return;
        }
        const user = JSON.parse(userString);

        axios
          .delete(`${process.env.BASE_API}partner/deletePartner/${partnerId}`)
          .then(() => {
            toast.success("Xóa thành công");
            fetchPartners();
          }),
          {
            headers: authHeader(),
          };

        // setPartners((prevPartners) =>
        //   prevPartners.filter((partner) => partner.partnerId !== partnerId)
        // );
      } catch (error) {
        console.log(error);
      }
    }
  };

  //update
  const handleUpdateSubmit = async (selectedPartner: any) => {
    //if (!selectedPartner) return; // Check if a partner is selected

    // Example: PUT request to update partner details
    axios
      .put(
        `${process.env.BASE_API}partner/updatePartner/${selectedPartner.partnerId}`,
        {
          name: selectedPartner.name,
          avatar: selectedPartner.avatar,
          link: selectedPartner.link,
        }
      )
      .then((response) => {
        toast.success("Cập nhật thành công");
        fetchPartners();
      })
      .catch((error) => {
        console.error("Failed to update partner", error);
      });
  };

  // restore
  const restoreDelete = async (partnerId: number) => {
    try {
      axios
        .put(`${process.env.BASE_API}partner/restoreDelete/${partnerId}`)
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
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setAvatar(downloadURL);
        });
      }
    );
  };

  //add a new partner
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    axios
      .post(`${process.env.BASE_API}partner/createNewPartner`, newPartner)

      .then((response) => {
        setPartners((prevPartners) => [...prevPartners, response.data.data]);
      })
      .catch((error) => {
        console.log(error);
      });
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
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <form onSubmit={handleSubmit}>
                    <ModalHeader className="flex flex-col gap-1">
                      Thêm đối tác
                    </ModalHeader>
                    <ModalBody>
                      <Input
                        className="font-bold"
                        type="text"
                        label="Tên đối tác"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <input
                        className="py-3"
                        type="file"
                        onChange={(e) => uploadFile(e)}
                      />
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
                      <Button color="primary" onPress={onClose} type="submit">
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
            className={`bg-white ${
              tabs === 1 && "text-[#FF0004] border-b-2 border-[#FF0004]"
            }`}
            onClick={() => setTabs(1)}
            radius="none"
          >
            TẤT CẢ
          </Button>
        </div>
        <div>
          <Button className="bg-white" onClick={() => setTabs(2)} radius="none">
            CHỜ DUYỆT
          </Button>
        </div>
        <div>
          <Button
            className={`bg-white ${
              tabs === 3 &&
              "text-[#FF0004] border-b-[#FF0004] border-b-2 border-[#FF0004]"
            }`}
            radius="none"
            onClick={() => setTabs(3)}
          >
            ĐÃ XÓA
          </Button>
        </div>
      </div>

      <div>
        <Partners
          partners={partners}
          handleDelete={handleDelete}
          restoreDelete={restoreDelete}
          handleUpdateSubmit={handleUpdateSubmit}
        />
      </div>
    </div>
  );
};

export default Partner;
