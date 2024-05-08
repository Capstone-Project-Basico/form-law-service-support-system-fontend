"use client";

import { storage } from "@/app/firebase";
import {
  ProfileSidebarItem,
  UserType,
  WalletType,
} from "@/constants/types/homeType";
import { profileSidebar } from "@/lib/profileSidebar";
import { faCamera, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Navbar,
  NavbarContent,
  NavbarItem,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import authHeader from "../authHeader/AuthHeader";

interface UserLocal {
  data: {
    data: {
      userId: string;
    };
  };
}

const ProfileSidebar = () => {
  const [profileData, setProfileData] = useState<UserType>();
  const [wallet, setWallet] = useState<WalletType>();
  const [walletError, setWalletError] = useState<string | null>(null);
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [avatar, setAvatar] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getUserFromStorage = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
  };

  const user: UserLocal | null = getUserFromStorage();
  const userId = user?.data.data.userId;

  const getDataUser = () => {
    try {
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_API}user/getUserById/${userId}`)
        .then((response) => {
          setProfileData(response.data.data);
        });
    } catch (error) {}
  };

  const getWallet = () => {
    setWalletError(null);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_API}wallet/getWalletByUser/${userId}`
      )
      .then((response) => {
        setWallet(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching wallet:", error);
        setWalletError(
          "Failed to fetch wallet details. Please try again later."
        );
      });
  };

  useEffect(() => {
    getDataUser();
    getWallet();
  }, [avatar]);

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

  const handleUpdateAvatar = () => {
    if (!profileData) return;
    axios
      .put(
        `${process.env.NEXT_PUBLIC_BASE_API}user/updateProfile/${userId}`,
        { avatar: avatar },
        { headers: authHeader() }
      )
      .then((response) => {
        toast.success("Cập nhật ảnh đại diện thành công");
        getDataUser();
      })
      .catch((error) => {
        toast.error("Cập nhật ảnh đại diện thất bại!");
      });
  };
  return (
    <div className="">
      <div className="flex flex-col w-[387px] gap-2 ">
        <div className="bg-white rounded-2xl py-3">
          <div className="flex flex-row">
            <div className="flex flex-col -space-x-2 overflow-hidden w-[100px] ml-5 relative">
              <Image
                key={avatar}
                src={profileData?.avatar ?? "/User-avatar.png"}
                alt=""
                width="0"
                height="0"
                sizes="100vw"
                priority
                className="rounded-full h-[80px] w-[80px]"
              />

              <div className="flex justify-end items-end">
                <Button
                  isIconOnly
                  radius="full"
                  size="sm"
                  className="absolute bg-[#FF0004]"
                  onPress={onOpen}
                >
                  <FontAwesomeIcon
                    icon={faCamera}
                    className="text-white size-4"
                  />
                </Button>
              </div>
            </div>
            <div className="ml-3">
              <p>Chào mừng bạn,</p>
              <h2 className="font-bold">{profileData?.userName}</h2>
              <Button
                className="border bg-[#F2F2F2]"
                onClick={() => router.push("/profile/wallet")}
              >
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  className="size-5 text-[#FF0004]"
                />
                {walletError ? 0 : wallet?.balance.toLocaleString()} VNĐ
              </Button>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white rounded-2xl ">
            <Navbar className="flex items-start w-[350px] h-[425px] pt-10 rounded-2xl">
              <NavbarContent className="flex flex-col gap-8 items-start">
                <NavbarItem className="text-xl">
                  <div className="flex flex-col space-y-2 ">
                    {profileSidebar.map((item, idx) => {
                      return <MenuItem key={idx} item={item} />;
                    })}
                  </div>
                </NavbarItem>
              </NavbarContent>
            </Navbar>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div>
                  <input
                    className="py-3"
                    type="file"
                    onChange={(e) => uploadFile(e)}
                  />
                  {uploading && <Spinner />}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Đóng
                </Button>
                <Button
                  color="primary"
                  disabled={uploading}
                  onClick={() => {
                    handleUpdateAvatar();
                    onClose();
                  }}
                >
                  Cập nhật
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProfileSidebar;

const MenuItem = ({ item }: { item: ProfileSidebarItem }) => {
  const pathname = usePathname();

  return (
    <div>
      <Link
        href={item.path}
        className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:text-[#FF0004] ${
          item.path === pathname ? "text-[#FF0004]" : ""
        }`}
      >
        {item.icon}
        <span className="font-semibold text-xl flex">{item.title}</span>
      </Link>
    </div>
  );
};
