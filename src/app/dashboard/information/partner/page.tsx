"use client";

import { Partner } from "@/constants/types/homeType";
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
} from "@nextui-org/react";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
  StorageReference,
  uploadBytesResumable,
} from "firebase/storage";
// import { storage } from "@/app/firebase";

// import * as admin from "firebase-admin";
import { storage } from "@/app/firebase";
import Image from "next/image";
const Partner = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Fallback image URL
  const [imageError, setImageError] = useState(false);
  const fallbackImageUrl = "/fallback-image.png";

  //upload file
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string>();

  const imagesListRef = ref(storage, "partners/");

  //data
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [link, setLink] = useState("");
  const [imageRef, setImageRef] = useState<StorageReference | undefined>();

  let newPartner = {
    name,
    avatar,
    link,
  };

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API}partner/getAllPartners`
        );
        console.log(response.data);
        setPartners(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPartners();
  }, []);

  useEffect(() => {
    getURL();
  }, [imageRef]);
  const getURL = () => {
    console.log(imageRef?.fullPath);
    if (imageRef?.fullPath != null) {
      getDownloadURL(imageRef).then((url) => console.log(url));
    }
  };
  //upload file
  const uploadFile = (e: any) => {
    setImageUpload(e.target.files[0]);
    let image = e.target.files[0];

    if (image == null) return;
    // const imgref = ref(storage, `partners/${image.name + uuidv4()}`);
    // setImageRef(imgref);

    // uploadBytes(imgref, image).then((snapshot) => {
    //   getDownloadURL(snapshot.ref).then((url) => {
    //     setImageUrls((prev) => [...prev, url]);
    //   });
    // });

    // listAll(imagesListRef).then((response) => {
    //   response.items.forEach((item) => {
    //     // if(item.path ==)
    //   });
    // });

    // const firebase = admin.initializeApp();
    // const storage = firebase.storage;

    //2
    // storage
    //   .ref("/images/" + image.name)
    //   .put(image)
    //   .on("State_changed", alert("success"), alert, () => {
    //     storage
    //       .ref("images")
    //       .child(image.name)
    //       .getDownloadURL()
    //       .then((url: any) => console.log(url));
    //   });
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_API}partner/createNewPartner`,
        newPartner
      )
      .then((response) => {
        console.log("thanh cong");
      })
      .catch((error) => {});
  };
  return (
    <div className="w-full mt-5 ml-5 mr-5">
      <div className="grid grid-cols-2">
        <Breadcrumbs color="danger" size="lg" className="text-3xl">
          <BreadcrumbItem>
            <p className="text-black font-bold text-3xl ">
              Quản lí thông tin đối tác
            </p>
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
                        type="text"
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <input type="file" onChange={(e) => uploadFile(e)} />
                      <Input
                        type="text"
                        label="Link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" onPress={onClose} type="submit">
                        Action
                      </Button>
                    </ModalFooter>
                  </form>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
      <div>
        <div className="my-10 flex flex-row">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Từ khóa tìm kiếm"
            size="sm"
            type="search"
            radius="none"
          />
          <Button className="bg-[#FF0004] text-white ml-3" radius="none">
            Tìm kiếm
          </Button>
        </div>
      </div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn className="bg-[#FF0004] text-white">
            Tên đối tác
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">
            Hình ảnh
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">
            Liên kết trang web
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">
            Trạng thái
          </TableColumn>
          <TableColumn className="bg-[#FF0004] text-white">
            Tương tác
          </TableColumn>
        </TableHeader>
        <TableBody>
          {partners.map((partner, index) => (
            <TableRow key={index}>
              <TableCell>{partner.name}</TableCell>
              <TableCell>
                {
                  <Image
                    src={
                      partner.avatar.startsWith("http")
                        ? partner.avatar
                        : `/${partner.avatar}`
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
                {partner.delete ? "Không sử dụng" : "Đang hoạt động"}
              </TableCell>
              <TableCell className="flex gap-2 items-center">
                <Button>Update</Button>
                <Button>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Partner;
