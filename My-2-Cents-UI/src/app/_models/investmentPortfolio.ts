export interface CryptoOrder {
  name: string;
  currentInvestment: number;
  initialInvestmentDate: string;
  ownedShares: number;
  transactionType: string
}

export interface StockOrder {
  name: string;
  currentInvestment: number;
  initialInvestmentDate: string;
  ownedShares: number;
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

export interface CryptoAsset {
  name: string;
  initialInvestmentDate: string;
  currentInvestment: number;
  ownedShares: number;
  sharePrice: number;
  returns: number;
  cryptoPrice: number
}

export interface TotalInvestment {
  userInvestmentSum: number;
}

