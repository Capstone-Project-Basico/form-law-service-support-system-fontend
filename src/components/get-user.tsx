'use client'

import { UpdateContext } from '@/app/clientComponent';
import { UserLocal, UserType } from '@/constants/types/homeType';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'

const getUser = () => {
    const [updated, setUpdated] = useContext(UpdateContext)
    const [userData, setUserData] = useState<UserType>();


    const getUserFromStorage = () => {
        if (typeof window !== "undefined") {
            const storedUser = localStorage.getItem("user");
            return storedUser ? JSON.parse(storedUser) : null;
        }
    };

    const user: UserLocal | null = getUserFromStorage();
    const userId = user?.data.data.userId;

    const getUserById = async () => {
        if (!user) return;
        try {
            await axios
                .get(`${process.env.NEXT_PUBLIC_BASE_API}user/getUserById/${userId}`)
                .then((res) => {
                    setUserData(res.data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserById();
    }, [updated])

    return (
        userData
    )
}

export default getUser