export interface ProductItem {
    id: number;
    title: string;
    image: string;
    price: number;
    stock: number;
    quantity: number;
    totalPrice: number;
}

export interface Cart {
    products: ProductItem[]
}

export interface Purchase {
    idOrder : number;
    totalPrice : number;
    products : ProductItem[];
}