import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { getAddresses } from "../api/api";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Address, AddressListProps } from "../types/types";
import { AddressItem } from "./AddressItem";

export function AddressList({ onAddressUpdated }: AddressListProps) {
    const [addresses, setAddresses] = useState<Address[]>([]);

    const fetchAddresses = async () => {
        const data = await getAddresses();
        setAddresses(data);
    };

    useEffect(() => {
        fetchAddresses();
    }, [onAddressUpdated]);

    const handlePrintPDF = () => {
        const doc = new jsPDF();
        doc.text("Lista de Endereços", 10, 10);

        addresses.forEach((addr, index) => {
            doc.text(`${index + 1}. ${addr.street}, ${addr.city} - ${addr.state}`, 10, 20 + index * 10);
        });

        doc.save("enderecos.pdf");
    };

    return (
        <Card className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto my-2">
            <CardContent className="p-4">
                <h2 className="text-lg sm:text-xl font-bold mb-4 text-left">
                    Endereços Salvos
                </h2>

                {addresses.length > 0 ? (
                    addresses.map((addr) => (
                        <AddressItem
                            key={addr.id}
                            address={addr}
                            onAddressUpdated={fetchAddresses}
                        />
                    ))
                ) : (
                    <p className="text-sm text-gray-600">Não há endereços cadastrados.</p>
                )}

                <div className="flex flex-wrap gap-2 justify-start mt-4">
                    <Button onClick={handlePrintPDF} className="bg-blue-600 hover:bg-blue-700 text-white">
                        Imprimir PDF
                    </Button>
                </div>
            </CardContent>
        </Card>
    );




}
