export interface CrytoOrder
{
    cryptoOrderId: number;
    userId: number;
    cryptoId: number;
    orderPrice: number;
    quantity: number;
    orderType: string;
    orderTime: Date;
    crypto: string;
    user: string;
  }