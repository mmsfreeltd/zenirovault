'use client';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!container.current) return;

    // Clear existing widget so it doesn't stack
    container.current.innerHTML = '';

    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.type = 'text/javascript';
    script.async = true;

    script.innerHTML = `
    {
      "symbols": [
        { "proName": "FOREXCOM:SPXUSD", "title": "S&P 500 Index" },
        { "proName": "FOREXCOM:NSXUSD", "title": "US 100 Cash CFD" },
        { "proName": "FX_IDC:EURUSD", "title": "EUR to USD" },
        { "proName": "BITSTAMP:BTCUSD", "title": "Bitcoin" },
        { "proName": "BITSTAMP:ETHUSD", "title": "Ethereum" }
      ],
      "colorTheme": "${resolvedTheme === 'dark' ? 'dark' : 'light'}",
      "locale": "en",
      "isTransparent": false,
      "showSymbolLogo": true,
      "displayMode": "adaptive"
    }`;

    container.current.appendChild(script);
  }, [resolvedTheme]);

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget" ref={container} />
    </div>
  );
}

export default memo(TradingViewWidget);
