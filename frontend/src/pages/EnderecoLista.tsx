import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { getEnderecos } from "../api/api";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Endereco, EnderecoListProps } from "../types/types";
import { EnderecoItem } from "./EnderecoItem";


export function EnderecoLista({ onEnderecoUpdated }: EnderecoListProps) {
    const [enderecos, setEnderecos] = useState<Endereco[]>([]);

    const buscaEnderecos = async () => {
        const data = await getEnderecos();
        setEnderecos(data);
    };

    useEffect(() => {
        buscaEnderecos();
    }, [onEnderecoUpdated]);

    const handlePrintPDF = () => {
        const doc = new jsPDF();

        // Obtém a largura da página
        const pageWidth = doc.internal.pageSize.width;

        // Calcula a posição central para o título
        const title = "Lista de Endereços";
        const titleWidth = doc.getTextWidth(title);
        const centerX = (pageWidth - titleWidth) / 2;

        // Adiciona o título centralizado
        doc.text(title, centerX, 10);

        enderecos.forEach((addr, index) => {
            doc.text(
                `${index + 1}. Nome: ${addr.nome}\n` +
                `   CPF: ${addr.cpf}\n` +
                `   Rua: ${addr.rua}\n` +
                `   Cidade: ${addr.cidade} - ${addr.estado}\n` +
                `   CEP: ${addr.cep}\n`,
                10,
                20 + index * 50
            );
        });
        doc.save("enderecos.pdf");
    };

    return (
        <Card className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto my-2">
            <CardContent className="p-4">
                <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">
                    Endereços Salvos
                </h2>


                {enderecos.length > 0 ? (
                    enderecos.map((addr) => (
                        <EnderecoItem
                            key={addr.id}
                            Endereco={addr}
                            onEnderecoUpdated={buscaEnderecos}
                        />
                    ))
                ) : (
                    <p className="text-sm text-gray-600">Não há endereços cadastrados.</p>
                )}

                <div className="flex flex-wrap gap-2 justify-center mt-4 w-full">
                    <Button onClick={handlePrintPDF} className="bg-blue-600 hover:bg-blue-700 text-white">
                        Imprimir PDF
                    </Button>
                </div>
            </CardContent>
        </Card>
    );




}
