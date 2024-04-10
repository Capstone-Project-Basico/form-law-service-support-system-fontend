"use client";

interface UserLocal {
  data: {
    data: {
      token: string;
    };
  };
}

export default function authHeader() {
  const getUserFromStorage = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
  };

  const user: UserLocal | null = getUserFromStorage();

  if (user && user.data.data.token) {
    return { Authorization: "Bearer " + user.data.data.token };
  } else {
    return {};
  }
}
