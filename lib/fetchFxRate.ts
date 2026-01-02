// lib/fetchFxRate.ts
import axios from 'axios';

/**
 * Fetch USD → targetCurrency rate from frankfurter.app (no key needed)
 */
export async function fetchFxRate(to: string): Promise<number> {
  const code = to.toUpperCase();
  try {
    const { data } = await axios.get('https://api.frankfurter.app/latest', {
      params: {
        from: 'USD',
        to: code,
      },
    });
    const rate = data.rates?.[code];
    if (typeof rate === 'number') return rate;
    console.warn(`No USD→${code} rate found, defaulting to 1`);
    return 1;
  } catch {
    return 1;
  }
}
