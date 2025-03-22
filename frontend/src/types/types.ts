export interface Address {
    id?: number;
    name: string;
    cpf: string;
    zipCode: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
}

export interface AddressFormProps {
    onAddressSaved: () => void;
}

export interface AddressListProps {
    addresses: Address[];
    onAddressUpdated: () => void;
}

export interface AddressItemProps {
    address: Address;
    onAddressUpdated: () => void;
}
