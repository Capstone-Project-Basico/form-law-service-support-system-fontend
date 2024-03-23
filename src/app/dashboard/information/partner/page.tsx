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
  const [searchTerm, setSearchTerm] = useState("");
  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();
  //upload file
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  // const [imageUrls, setImageUrls] = useState<string[]>([]);
  // const [imageUrl, setImageUrl] = useState<string>();

  const imagesListRef = ref(storage, "partners/");

  //data
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [link, setLink] = useState("");
  // const [imageRef, setImageRef] = useState<StorageReference | undefined>();
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  let newPartner = {
    name,
    avatar,
    link,
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  //search
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  // Filter partners based on search term
  const filteredPartners = partners.filter((partner) =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  //get all items
  const fetchPartners = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}partner/getAllPartners`
      );
      setPartners(response.data.data);
      // setPartners((prevPartners) => [...prevPartners, response.data.data]);
    } catch (error) {
      console.error(error);
    }
  };

  // };
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

  //upload update file
  const uploadUpdateFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    // First, check if the files array is not null and has at least one file
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]; // Safely access the first file

      // Create a unique file name for the storage to avoid name conflicts
      const uniqueFileName = `partners/${file.name}-${uuidv4()}`;
      const storageRef = ref(storage, uniqueFileName);

      const uploadTask = uploadBytesResumable(storageRef, file); // Start the file upload

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optional: monitor upload progress
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error("Upload failed", error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);

            if (!selectedPartner) {
              console.error("No partner selected for update.");
              return;
            }

            // Update the state with the new avatar URL
            setSelectedPartner({
              ...selectedPartner,
              avatar: downloadURL,
            });

            // Optionally: Update the partner's information in the database or state here
            // This might involve calling an API endpoint or updating local state
          });
        }
      );
    } else {
      console.error("No file selected for upload.");
    }
  };

  //add a new partner
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_API}partner/createNewPartner`,
        newPartner
      )

      .then((response) => {
        setPartners((prevPartners) => [...prevPartners, response.data.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //update
  const handleUpdateSubmit = async () => {
    if (!selectedPartner) return; // Check if a partner is selected

    // Example: PUT request to update partner details
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
        fetchPartners();
        console.log("Partner updated successfully", response);
      })
      .catch((error) => {
        console.error("Failed to update partner", error);
      });
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

        axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_API}partner/deletePartner/${partnerId}`
        ),
          {
            headers: {
              Authorization: user.data.data.token,
            },
          };

        setPartners((prevPartners) =>
          prevPartners.filter((partner) => partner.partnerId !== partnerId)
        );
      } catch (error) {
        console.log(error);
      }
    }
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
      <div>
        <div className="my-10 flex flex-row">
          <Input
            classNames={{
              base: "w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Từ khóa tìm kiếm .."
            size="sm"
            type="search"
            radius="none"
            value={searchTerm}
            onChange={handleSearchChange}
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
          {filteredPartners.map((partner, index) => (
            <TableRow key={index}>
              <TableCell>{partner.name}</TableCell>
              <TableCell>
                {
                  <Image
                    src={
                      partner.avatar
                        ? partner.avatar.startsWith("http")
                          ? partner.avatar
                          : `/${partner.avatar}`
                        : "/errorImage.png"
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
                <Button
                  className="bg-[#FF0004] text-white"
                  onPress={() => {
                    setSelectedPartner(partner);
                    onOpenUpdate();
                  }}
                >
                  Update
                </Button>

                <Button
                  className="bg-[#FF0004] text-white"
                  onClick={() => handleDelete(partner.partnerId)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* update modal */}
      <Modal isOpen={isOpenUpdate} onClose={onCloseUpdate}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Cập nhật đối tác
          </ModalHeader>
          <ModalBody>
            {selectedPartner && (
              <form onSubmit={handleUpdateSubmit}>
                <Input
                  type="text"
                  label="Name"
                  value={selectedPartner.name}
                  onChange={(e) =>
                    setSelectedPartner({
                      ...selectedPartner,
                      name: e.target.value,
                    })
                  }
                />
                <input type="file" onChange={(e) => uploadUpdateFile(e)} />
                <Input
                  type="text"
                  label="Link"
                  value={selectedPartner.link}
                  onChange={(e) =>
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
              onPress={() => {
                handleUpdateSubmit();
                onCloseUpdate();
              }}
              type="submit"
            >
              Cập nhật
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Partner;
