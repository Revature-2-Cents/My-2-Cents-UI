import { Component, OnInit } from '@angular/core';

export interface InvestmentPortfolio {
  name: string;
  investmentBuyDate: Date;
  amountInvested: number;
  sharesOwned: number;
  pricePerShare: number;
  gainsLoss: number;
  dollarValue: number;
}

export const INVESTMENTPORTFOLIO_STOCKS_DATA: InvestmentPortfolio[] = [
  { name: 'APPLE', investmentBuyDate: new Date('2010-12-10'), amountInvested: 10000.00, sharesOwned: 300, pricePerShare: 10.00, gainsLoss: 10.00, dollarValue: 50.00 },
  { name: 'GOOGLE', investmentBuyDate: new Date(2010 / 12 / 9), amountInvested: 10000.00, sharesOwned: 654, pricePerShare: 10.00, gainsLoss: 10.00, dollarValue: 50.00 },
  { name: 'META', investmentBuyDate: new Date(2010 / 12 / 10), amountInvested: 10000.00, sharesOwned: 300, pricePerShare: 10.00, gainsLoss: 10.00, dollarValue: 50.00 },
  { name: 'AMAZON', investmentBuyDate: new Date(2010 / 12 / 10), amountInvested: 10000.00, sharesOwned: 300, pricePerShare: 10.00, gainsLoss: 10.00, dollarValue: 50.00 },
];

export const INVESTMENTPORTFOLIO_CRYTO_DATA: InvestmentPortfolio[] = [
  { name: 'BITCOIN', investmentBuyDate: new Date(2010 / 12 / 10), amountInvested: 10000.00, sharesOwned: 300, pricePerShare: 10.00, gainsLoss: 10.00, dollarValue: 50.00 },
  { name: 'SHIBA', investmentBuyDate: new Date(2010 / 12 / 10), amountInvested: 10000.00, sharesOwned: 654, pricePerShare: 10.00, gainsLoss: 10.00, dollarValue: 50.00 },
  { name: 'DOGE', investmentBuyDate: new Date(2010 / 12 / 10), amountInvested: 10000.00, sharesOwned: 300, pricePerShare: 10.00, gainsLoss: 10.00, dollarValue: 50.00 },
  { name: 'ETHEREUM', investmentBuyDate: new Date(2010 / 12 / 10), amountInvested: 10000.00, sharesOwned: 300, pricePerShare: 10.00, gainsLoss: 10.00, dollarValue: 50.00 },
];

@Component({
  selector: 'app-investment-portfolio-table',
  templateUrl: './investment-portfolio-table.component.html',
  styleUrls: ['./investment-portfolio-table.component.css']
})
export class InvestmentPortfolioTableComponent implements OnInit {
  title: string = "Investment Portfolio";
  subtitle: string[] = ['Stocks', 'Cryto'];
  displayColumns: string[] = ['Name', 'Stock Buy Date', 'Amount Invested', 'Shares Owned', 'Price Per Share', 'Gains/Losses', 'Dollar Value']
  stockDataSource = INVESTMENTPORTFOLIO_STOCKS_DATA;
  crytoDataSource = INVESTMENTPORTFOLIO_CRYTO_DATA;


  constructor() { } ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
