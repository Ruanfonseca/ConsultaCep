import { useEffect, useState } from "react";
import { getAddresses } from "../api/api";
import { Card, CardContent } from "../components/ui/card";
import { Address, AddressListProps } from "../types/types";
import { AddressItem } from "./AddressItem";

export function AddressList({ onAddressUpdated }: AddressListProps) {
    const [addresses, setAddresses] = useState<Address[]>([]);

    const fetchAddresses = async () => {
        const data = await getAddresses();
        setAddresses(data);
    };

    // Chama a função de atualização de endereços sempre que onAddressUpdated for chamada
    useEffect(() => {
        fetchAddresses();
    }, [onAddressUpdated]);

    return (
        <Card className="p-4 max-w-lg mx-auto mt-6">
            <CardContent>
                <h2 className="text-xl font-bold mb-4">Endereços Salvos</h2>
                {addresses.length > 0 ? (
                    addresses.map((addr) => (
                        <AddressItem
                            key={addr.id}
                            address={addr}
                            onAddressUpdated={fetchAddresses}
                        />
                    ))
                ) : (
                    <p>Não há endereços cadastrados.</p>
                )}
            </CardContent>
        </Card>
    );
}
