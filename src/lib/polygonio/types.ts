import {
    POLYGON_CRYPTO_API_URL,
    POLYGON_CRYPTO_SUBSCR_MSSG,
    POLYGON_FOREX_API_URL,
    POLYGON_FOREX_SUBSCR_MSSG,
} from "./constants";

export type SUBSCR_MSSG =
    | typeof POLYGON_CRYPTO_SUBSCR_MSSG
    | typeof POLYGON_FOREX_SUBSCR_MSSG;

export type SOCKET_URL =
    | typeof POLYGON_FOREX_API_URL
    | typeof POLYGON_CRYPTO_API_URL;

export interface StatusData {
    ev: "status";
    status: string;
    message: string;
}

export interface AuthSuccessData extends StatusData {
    status: "auth_success";
    message: "authenticated";
}

export interface SubscribedSuccessData extends StatusData {
    message: `subscribed to: ${string}`; // "subscribed to: C.EUR/USD"
    status: "success";
}

export type PolygonQuoteEventTypes = "C" | "XQ";

export interface PolygonQuoteData<T extends PolygonQuoteEventTypes> {
    ev: T; // event type
}
export interface ForexQuoteData extends PolygonQuoteData<"C"> {
    p: string; // currency pair
    x: string; // exchange id (see https://polygon.io/docs/forex/get_v3_reference_exchanges)
    a: number; // ask price
    b: number; // bid price
    t: number; // unix ms timestamp
}
export interface CryptoQuoteData extends PolygonQuoteData<"XQ"> {
    pair: string; // currency pair
    bp: number; // bid price
    bs: number; // bid size
    ap: number; // ask price
    as: number; // ask size
    t: number; // unix ms timestamp
    x: number; // exchange id (see https://polygon.io/docs/crypto/get_v3_reference_exchanges)
    r: number; // timestamp tick received by polygon.io
}

export interface PriceQuoteData {
    type: "crypto" | "forex"; // event type
    pair: string; // currency pair
    id: string | number; // exchange id
    askPrice: number; // ask price
    bidPrice: number; // bid price
    ts: number; // unix ms timestamp
}
