import './App.css';
import { Card } from './components/ui/card';
import { useAddresses } from './hook/hook';
import { AddressForm } from './pages/AddressForm';
import { AddressList } from './pages/AddressList';

function App() {
  const { addresses, setAddresses } = useAddresses();

  return (
    <div className="container-root">
      <Card className="card">
        <h1 className="title">Consulta de CEP e Gerenciamento de Endereços</h1>
        <div className="content">
          <AddressForm onAddressSaved={() => setAddresses([...addresses])} />
          <AddressList addresses={addresses} onAddressUpdated={() => setAddresses([...addresses])} />
        </div>
      </Card>
    </div>
  );

}

export default App
