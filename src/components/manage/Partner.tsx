import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
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
import { usePathname } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { Partner } from "@/constants/types/homeType";
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
import Link from "next/link";

type PartnersProps = {
  partners: Partner[];
};

const Partners: React.FC<PartnersProps> = ({ partners }) => {
  // const [partners, setPartners] = useState<Partner[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();
  //upload file
  // const [imageUrls, setImageUrls] = useState<string[]>([]);
  // const [imageUrl, setImageUrl] = useState<string>();

  const imagesListRef = ref(storage, "partners/");

  //search
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  // Filter partners based on search term
  const filteredPartners = partners.filter((partner) =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // useEffect(() => {
  //   fetchPartners();
  // }, []);

  // //get all items
  // const fetchPartners = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_BASE_API}partner/getAllPartners`
  //     );
  //     setPartners(response.data.data);
  //     // setPartners((prevPartners) => [...prevPartners, response.data.data]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
        // fetchPartners();
        console.log("Partner updated successfully", response);
      })
      .catch((error) => {
        console.error("Failed to update partner", error);
      });
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

        // setPartners((prevPartners) =>
        //   prevPartners.filter((partner) => partner.partnerId !== partnerId)
        // );
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
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
        </div>
      </div>
      <Table aria-label="Example static collection table">
        <TableHeader className="">
          <TableColumn className=" bg-[#FF0004] text-white">
            Tên đối tác
          </TableColumn>
          <TableColumn className=" justify-center items-center bg-[#FF0004] text-white">
            Hình ảnh
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Liên kết trang web
          </TableColumn>
          <TableColumn className=" bg-[#FF0004] text-white">
            Trạng thái
          </TableColumn>
          <TableColumn className="flex justify-center items-center bg-[#FF0004] text-white">
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
              <TableCell className="flex gap-2 items-center  justify-center ">
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

export default Partners;
