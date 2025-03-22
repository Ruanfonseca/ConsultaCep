import { useState } from "react";
import { deleteAddress, updateAddress } from "../api/api";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { AddressItemProps } from "../types/types";

export function AddressItem({ address, onAddressUpdated }: AddressItemProps) {
    const [editable, setEditable] = useState(false);
    const [data, setData] = useState(address);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        await updateAddress(data.id!, data);
        setLoading(false);
        setEditable(false);
        onAddressUpdated(); // Atualiza a lista após edição
    };

    const handleDelete = async () => {
        if (window.confirm("Tem certeza que deseja excluir este endereço?")) {
            setLoading(true);
            await deleteAddress(data.id!);
            setLoading(false);
            onAddressUpdated();
        }
    };

    return (
        <div className="border-b p-4 flex flex-col gap-4">
            {editable ? (
                <>
                    <Input
                        placeholder="Nome"
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                    />
                    <Input
                        placeholder="CPF (000.000.000-00)"
                        value={data.cpf}
                        onChange={(e) => setData({ ...data, cpf: e.target.value })}
                    />
                    <Input
                        placeholder="CEP"
                        value={data.zipCode}
                        onChange={(e) => setData({ ...data, zipCode: e.target.value })}
                    />

                    <div className="flex flex-wrap gap-2 justify-between">
                        <Button onClick={handleSave} disabled={loading}>
                            {loading ? "Salvando..." : "Salvar"}
                        </Button>
                        <Button variant="outline" onClick={() => setEditable(false)}>
                            Cancelar
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <p><strong>Nome:</strong> {address.name}</p>
                    <p><strong>CPF:</strong> {address.cpf}</p>
                    <p><strong>CEP:</strong> {address.zipCode}</p>

                    <div className="flex flex-wrap gap-2 justify-between">
                        <Button onClick={() => setEditable(true)}>Editar</Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={loading}>
                            {loading ? "Excluindo..." : "Excluir"}
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
