export interface CartItemModel {
  productId: number;
  quantity: number;
  price: number;
  name: string;
  description: string;
  image: string;
  availableQuantity: number;
  userId: string;
}

const mockCartItems: CartItemModel[] = [
  {
    productId: 1,
    name: 'Item 1',
    price: 100,
    quantity: 2,
    description: 'Description of Item 1',
    image: 'url-to-image-1',
    availableQuantity: 5,
    userId: 'user123',
  },
  {
    productId: 2,
    name: 'Item 2',
    price: 50,
    quantity: 1,
    description: 'Description of Item 2',
    image: 'url-to-image-2',
    availableQuantity: 10,
    userId: 'user123',
  },
];
