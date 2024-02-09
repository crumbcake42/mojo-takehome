export const POLYGON_API_KEY = import.meta.env.VITE_POLYGON_API_KEY;

export const WS_AUTH_MESSAGE =
    `{"action":"auth","params":"${POLYGON_API_KEY}"}` as const;

export const POLYGON_CRYPTO_SUBSCR_MSSG =
    `{"action":"subscribe","params":"XQ.BTC-USD,XQ.ETH-USD"}` as const;
export const POLYGON_FOREX_SUBSCR_MSSG =
    `{"action":"subscribe","params":"C.EUR/USD,C.CHF/USD"}` as const;

export const POLYGON_FOREX_API_URL = "wss://socket.polygon.io/forex" as const;
export const POLYGON_CRYPTO_API_URL = "wss://socket.polygon.io/crypto" as const;
