import { useEffect, useState } from "react";
import axios from "axios";
import { UserLocal, UserType } from "@/constants/types/homeType";

export default function useUser() {
  const [userInformation, setUserInformation] = useState<UserType>();

  useEffect(() => {
    const getUserFromStorage = () => {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
      }
    };

    const user: UserLocal | null = getUserFromStorage();

    const fetchUserInfo = async (userId: number) => {
      if (!user) return;
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API}user/getUserById/${userId}`
        );
        setUserInformation(response.data.data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    if (user) {
      fetchUserInfo(user.data.data.userId);
    } else return;
  }, []); // Empty dependency array ensures this effect runs only once after the component mounts.

  return userInformation;
}
