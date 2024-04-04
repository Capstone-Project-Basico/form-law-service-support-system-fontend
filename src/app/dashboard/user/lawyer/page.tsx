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
import { Lawyer } from "@/constants/types/homeType";
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
import Lawyers from "@/components/manage/Lawyer";
import { v4 as uuidv4 } from "uuid";

const Lawyer = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tabs, setTabs] = useState(1);

 //data
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [url, seturl] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [position, setPosition] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [roleName, setRoleName] = useState("");
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);

  let newLawyer = {
    userName,
    avatar,
    url,
    email,
    phoneNumber,
    position,
    introduce,
    roleName,
  };
  const imagesListRef = ref(storage, "lawyers/");
  const [imageUpload, setImageUpload] = useState<File | null>(null);

  useEffect(() => {
    switch (tabs) {
      case 1:
        fetchLawyers();
        break;
      
      case 2:
        fetchDeletedLawyer();
        break;
      default:
        fetchLawyers();
        break;
    }
  }, [tabs]);

  //get all items
  const fetchLawyers = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}user/getAllLawyers`
      );
      setLawyers(response.data.data);
    
    } catch (error) {
      console.error(error);
    }
  };

   //get all deleted items
   const fetchDeletedLawyer = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API}user/getAllDeletedLawyers`
      );
      setLawyers(response.data.data);
     
    } catch (error) {
      console.error(error);
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

  
  return (
    <div className="w-full mt-5 ml-5 mr-5">
      <div className="grid grid-cols-2">
        <Breadcrumbs color="danger" size="lg" className="text-3xl">
          <BreadcrumbItem>
            <p className="text-black font-bold text-3xl ">
              Quản lí người dùng
            </p>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <p className="text-[#FF0004] font-bold text-3xl">Luật sư</p>
          </BreadcrumbItem>
        </Breadcrumbs>

        {/* <div className="flex justify-end">
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
                      <input className="py-3" type="file" onChange={(e) => uploadFile(e)} />
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
        </div> */}
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
              tabs === 2 &&
              "text-[#FF0004] border-b-[#FF0004] border-b-2 border-[#FF0004]"
            }`}
            radius="none"
            onClick={() => setTabs(2)}
          >
            ĐÃ XÓA
          </Button>
        </div>
      </div>

      <div>
        <Lawyers lawyers={lawyers} 
                  
                  
        />
      </div>
    </div>
  );
};

export default Lawyers;
