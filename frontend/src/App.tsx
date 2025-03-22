import './App.css';
import { useAddresses } from './hook/hook';
import { AddressForm } from './pages/AddressForm';
import { AddressList } from './pages/AddressList';

function App() {
  const { addresses, setAddresses } = useAddresses();

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-center">
        <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-4xl">
          <h1 className="text-2xl font-bold text-center mb-6">Consulta de CEP e Gerenciamento de Endereços</h1>
          <AddressForm onAddressSaved={() => setAddresses([...addresses])} />
          <AddressList addresses={addresses} onAddressUpdated={() => setAddresses([...addresses])} />
        </div>
      </div>
    </>
  )
}

export default App
