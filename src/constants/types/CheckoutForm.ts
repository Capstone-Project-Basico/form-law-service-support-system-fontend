type CartItem = {
  itemId: number;
  itemUUID: string | null;
  orderDetailUUID: string | null;
  price: number;
  itemName: string;
  quantity: number;
  totalRequest: number;
};

type CheckoutForm = {
  orderId: string;
  email: string;
  cart: CartItem[];
  orderStatus: string;
  dateCreated: string;
  transactionId: string;
  deleted: boolean;
};
