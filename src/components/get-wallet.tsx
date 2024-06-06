
import { UpdateContext } from '@/app/clientComponent';
import { UserLocal } from '@/constants/types/homeType';
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'

const GetWallet = () => {
    const [updated, setUpdated] = useContext(UpdateContext)
    const [money, setMoney] = useState();

    const getUserFromStorage = () => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        }
    };
    const user: UserLocal | null = getUserFromStorage();
    const userId = user?.data.data.userId;

    const getWalletAmount = async () => {
        try {
            await axios
                .get(`${process.env.NEXT_PUBLIC_BASE_API}wallet/getWalletByUser/${userId}`)
                .then((response) => {
                    setMoney(response.data.data.balance.toLocaleString());
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getWalletAmount();
    }, [updated])

    return (
        money
    )
}

export default GetWallet