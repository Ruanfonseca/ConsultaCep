import { useState } from "react";
import { deleteAddress, updateAddress } from "../api/api";
import '../App.css';
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
        <div className="container-Item">
            {editable ? (
                <>
                    <Input
                        placeholder="Nome"
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        className="input sm-text-base"
                    />
                    <Input
                        placeholder="CPF (000.000.000-00)"
                        value={data.cpf}
                        onChange={(e) => setData({ ...data, cpf: e.target.value })}
                        className="input sm-text-base"
                    />
                    <Input
                        placeholder="CEP"
                        value={data.zipCode}
                        onChange={(e) => setData({ ...data, zipCode: e.target.value })}
                        className="input sm-text-base"
                    />

                    <div className="button-container">
                        <Button onClick={handleSave} disabled={loading} className="button sm-w-auto">
                            {loading ? "Salvando..." : "Salvar"}
                        </Button>
                        <Button variant="outline" onClick={() => setEditable(false)} className="button button-outline sm-w-auto">
                            Cancelar
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <p className="text-sm"><strong>Nome:</strong> {address.name}</p>
                    <p className="text-sm"><strong>CPF:</strong> {address.cpf}</p>
                    <p className="text-sm"><strong>CEP:</strong> {address.zipCode}</p>

                    <div className="button-container">
                        <Button onClick={() => setEditable(true)} className="button sm-w-auto">
                            Editar
                        </Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={loading} className="button button-danger sm-w-auto">
                            {loading ? "Excluindo..." : "Excluir"}
                        </Button>
                    </div>
                </>
            )}
        </div>
    );


}
