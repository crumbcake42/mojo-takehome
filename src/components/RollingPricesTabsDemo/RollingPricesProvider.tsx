import { useState, useEffect, FC } from "react";

import { PriceQuoteData, SOCKET_URL } from "@/lib/polygonio/types";
import {
    isSubscribedSuccessData,
    makeSubscribeMessage,
} from "@/lib/polygonio/helpers";

import { useAuthedWebSocket } from "./helpers";

interface RollingPricesProviderProps {
    children: FC<{ data: Record<string, PriceQuoteData[]> }>;
    socketUrl: SOCKET_URL;
    channels: string[];
    onNewPrice: (data: MessageEvent<any>) => PriceQuoteData | null;
    last?: number;
}

export const RollingPricesProvider: FC<RollingPricesProviderProps> = ({
    socketUrl,
    channels,
    children,
    onNewPrice,
    last = 20,
}) => {
    const { lastMessage, canSubscribe, sendMessage } =
        useAuthedWebSocket(socketUrl);

    const [data, setData] = useState<Record<string, PriceQuoteData[]>>({});

    useEffect(() => {
        if (canSubscribe) sendMessage(makeSubscribeMessage(channels));
    }, [canSubscribe]);

    useEffect(() => {}, []);
    useEffect(() => {
        if (lastMessage !== null) {
            const parsedData = JSON.parse(lastMessage.data);

            if (!Array.isArray(parsedData)) {
                console.error("data is not an array", parsedData);
                return;
            }

            // TODO: handle multiple messages in one frame
            parsedData.forEach((data) => {
                // If is a new price, add it to the data object
                const newPrice = onNewPrice(data);

                if (newPrice) {
                    setData((d) => {
                        const { pair } = newPrice;
                        if (!d[pair]) d[pair] = [];
                        const lastItem = d[pair][d[pair].length - 1];
                        if (d[pair][d[pair].length - 1]?.ts === newPrice.ts) {
                            newPrice.ts += 1;
                        }
                        console.log(
                            pair,
                            newPrice,
                            [newPrice, ...d[pair]].slice(0, last),
                            lastItem?.ts,
                            newPrice.ts
                        );
                        return {
                            ...d,
                            [pair]: [newPrice, ...d[pair]].slice(0, last),
                        };
                    });
                } else if (isSubscribedSuccessData(data)) {
                    // Remove the "subscribed to: " prefix so that we can use the
                    // channel as a key in our data object.
                    const [_, pair] = data.message
                        .substring("subscribed to: ".length)
                        .split(".");

                    setData((d) => {
                        if (!d[pair]) d[pair] = [];
                        return d;
                    });
                } else {
                    console.error("Unknown message", data);
                }
            });
        }
    }, [lastMessage]);

    return <>{children({ data })}</>;
};
