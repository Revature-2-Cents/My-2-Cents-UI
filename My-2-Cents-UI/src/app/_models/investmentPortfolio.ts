export interface CrytoOrder {
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

export interface StockOrder {
  // stockOrderId : number;
  // userId: number;
  // stockId: number;
  // orderPrice: number;
  // quantity: number;
  // orderType: string;
  // orderTime: Date;
  // stock: string;
  // user: string;
  name: string,
  currentInvestment: number,
  initialInvestmentDate: Date,
  ownedShares: number,
  transactionType: string
}


export interface StockAsset {
  name: string;
  initialInvestmentDate: string;
  currentInvestment: number;
  ownedShares: number;
  sharePrice: number;
  returns: number;
  stockPrice: number;

}
