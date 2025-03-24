import jsPDF from "jspdf";
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
                <button
                    onClick={handlePrintPDF}
                    className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Imprimir PDF
                </button>
            </CardContent>
        </Card>
    );
}
