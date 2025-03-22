import { useEffect, useState } from "react";
import { Address } from "../types/types";
import { getAddresses } from './../api/api';

export const useAddresses = () => {
    const [addresses, setAddresses] = useState<Address[]>([]);

    useEffect(() => {
        const fetchAddress = async () => {
            const data = await getAddresses();
            setAddresses(data);
        }
        fetchAddress();
    }, []);

    return { addresses, setAddresses };
}

