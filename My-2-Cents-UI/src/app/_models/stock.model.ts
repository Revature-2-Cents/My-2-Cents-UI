export interface Stock {
    // symbol: string;
    // marketCap: number;
    // longName: string;
    // name: string;
    // regularMarketPrice: number;
    // regularMarketChange: number;
    // regularMarketChangePercent: number;
    // regularMarketDayHigh: number;
    // regularMarketDayLow: number;
    // regularMarketVolume: number;
    // fiftyTwoWeekLowChange: number;
    // fiftyTwoWeekLowChangePercent: number;
    // fiftyTwoWeekRange: number;
    // fiftyTwoWeekHighChange: number;
    // fiftyTwoWeekHighChangePercent: number;
    // fiftyTwoWeekLow: number;
    // fiftyTwoWeekHigh: number;
    
    stockId: number;
    currentPrice: number;
    priceChange: number;
    priceChangePercentage: number;
    name: string;
    shortenedName: string;
    lastUpdate: string;

}