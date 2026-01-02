// @/lib/fetchCoin.ts
import axios from "axios";

export interface CoinData {
  name: string;
  symbol: string;
  changePercent: number;
  price: number;
  change24h: number;
  change7d: number;
}
export async function fetchCoinData(coinId: string) {
  try {
    const res = await axios.get(
      `https://api.coinpaprika.com/v1/tickers/${coinId}`
    );
    const data = res.data;
    return {
      name: data.name,
      symbol: data.symbol,
      price: data.quotes.USD.price,
      changePercent: data.quotes.USD.percent_change_24h,
      marketCap: data.quotes.USD.market_cap,
      change24h: data.quotes.USD.percent_change_24h,
      change7d: data.quotes.USD.percent_change_7d,
    };
  } catch {
    throw new Error("Failed to fetch coin data");
  }
}
