import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { fetchAddressByZip, saveAddress } from "../api/api";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Address, AddressFormProps } from "../types/types";
import { addressSchema } from "../types/validation";

export function AddressForm({ onAddressSaved }: AddressFormProps) {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Address>({
        resolver: zodResolver(addressSchema),
    });


    const [loading, setLoading] = useState(false);


    const handleZipBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        const zip = e.target.value;
        if (zip.length === 8) {
            setLoading(true);
            const data = await fetchAddressByZip(zip);
            if (data) {
                setValue("street", data.street || "");
                setValue("neighborhood", data.neighborhood || "");
                setValue("city", data.city || "");
                setValue("state", data.state || "");
            }
            setLoading(false);
        }
    };

    const onSubmit = async (data: Address) => {
        setLoading(true);
        try {
            await saveAddress(data);
            console.log("Endereço salvo com sucesso!");
            onAddressSaved();
        } catch (error) {
            console.error("Erro ao salvar endereço:", error);
        }
        setLoading(false);
    };


    return (
        <>
            <Card className="p-4 max-w-2xl mx-auto w-full">
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <Input placeholder="Nome" {...register("name")} />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Input placeholder="CPF (000.000.000-00)" {...register("cpf")} />
                            {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf.message}</p>}
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Input placeholder="CEP" {...register("zipCode")} onBlur={handleZipBlur} />
                            {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode.message}</p>}
                        </div>

                        <div className="col-span-2">
                            <Input placeholder="Logradouro" {...register("street")} disabled />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Input placeholder="Bairro" {...register("neighborhood")} disabled />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Input placeholder="Cidade" {...register("city")} disabled />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Input placeholder="Estado" {...register("state")} disabled />
                        </div>

                        <div className="col-span-2 flex justify-center">
                            <Button type="submit" className="w-full md:w-auto" disabled={loading}>
                                {loading ? "Carregando..." : "Salvar"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

        </>
    );
}