import '../App.css';
import { Card } from '../components/ui/card';
import { useEndereco } from '../hook/hook';
import { EnderecoForm } from '../pages/EnderecoForm';
import { EnderecoLista } from '../pages/EnderecoLista';
import EnderecoPesquisa from '../pages/EnderecoPesquisa';


export default function Home() {
    const { enderecos, setEnderecos } = useEndereco();
    return (
        <div className="container-root">
            <Card className="card">
                <h1 className="title">Consulta de CEP e Gerenciamento de Endereços</h1>
                <div className="content">
                    <EnderecoPesquisa />
                    <EnderecoForm onEnderecoSalvo={() => setEnderecos([...enderecos])} />
                    <EnderecoLista Enderecos={enderecos} onEnderecoUpdated={() => setEnderecos([...enderecos])} />
                </div>
            </Card>
        </div>
    );
}