import {
    AuthSuccessData,
    CryptoQuoteData,
    ForexQuoteData,
    PriceQuoteData,
    StatusData,
    SubscribedSuccessData,
} from "./types";

export const isForexQuoteData = (data: any): data is ForexQuoteData => {
    return data.ev === "C";
};

export const isCryptoQuoteData = (data: any): data is CryptoQuoteData => {
    return data.ev === "XQ";
};

function isStatusData(data: any): data is StatusData {
    return data.ev === "status";
}

export const isAuthSuccessData = (data: any): data is AuthSuccessData => {
    return (
        isStatusData(data) &&
        data.status === "auth_success" &&
        data.message === "authenticated"
    );
};

function isSubscribedMessage(
    message: any
): message is SubscribedSuccessData["message"] {
    return typeof message === "string" && message.startsWith("subscribed to");
}

export const isSubscribedSuccessData = (
    data: any
): data is SubscribedSuccessData => {
    return (
        isStatusData(data) &&
        data.status === "success" &&
        isSubscribedMessage(data.message)
    );
};

export const formatCryptoQuoteData = (
    data: CryptoQuoteData
): PriceQuoteData => {
    const { pair, x, ap, bp, t } = data;
    return {
        type: "crypto",
        pair,
        id: x,
        askPrice: ap,
        bidPrice: bp,
        ts: t,
    };
};

export const formatForexQuoteData = (data: ForexQuoteData): PriceQuoteData => {
    const { p, x, a, b, t } = data;
    return {
        type: "forex",
        pair: p,
        id: x,
        askPrice: a,
        bidPrice: b,
        ts: t,
    };
};

export function formatPriceQuoteData(
    data: CryptoQuoteData | ForexQuoteData
): PriceQuoteData {
    if (isCryptoQuoteData(data)) return formatCryptoQuoteData(data);
    if (isForexQuoteData(data)) return formatForexQuoteData(data);
    throw new Error("Invalid data type");
}

export const makeSubscribeMessage = (channels: string[]) =>
    JSON.stringify({ action: "subscribe", params: channels.join(",") });
