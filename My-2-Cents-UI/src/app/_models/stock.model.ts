export interface Stock {
    stockId: number;
    currentPrice: number;
    priceChange: number;
    priceChangePercentage: number;
    name: string;
    shortenedName: string;
    lastUpdate: string;
}
