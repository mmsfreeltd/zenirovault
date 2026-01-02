// TradingViewWidget.jsx
'use client';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef, memo } from 'react';
function TradingViewWidget() {
  const { resolvedTheme } = useTheme();

  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!container.current) return;
    // Prevent double script injection in dev mode
    // if (container.current.getAttribute('data-widget-loaded') === 'true') return;
    // container.current.setAttribute('data-widget-loaded', 'true');

    // Clear existing widget so it doesn't stack
    container.current.innerHTML = '';

    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
        {
          "market": "forex",
          "showToolbar": true,
          "defaultColumn": "overview",
          "defaultScreen": "general",
          "isTransparent": false,
          "locale": "en",
          "colorTheme": "${resolvedTheme === 'dark' ? 'dark' : 'light'}",
          "width": "100%",
          "height": "100%"
        }`;
    container.current.appendChild(script);
  }, [resolvedTheme]);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(TradingViewWidget);
