import { LineChart, Line, XAxis, YAxis, Legend } from "recharts";

import { PriceQuoteData } from "@/lib/polygonio/types";
import { useEffect, useRef, useState } from "react";

type RollingPricesGraphProps = {
    data: Record<string, PriceQuoteData[]>;
};

function useInterval(callback: () => void, delay: number) {
    const savedCallback = useRef<() => void>(() => {});

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

type GraphData = {
    timestamp: number;
    ask: number;
    bid: number;
};

const processPrices = (
    prices: Record<string, PriceQuoteData[]>
): GraphData[][] => {
    return Object.keys(prices).map((name) => {
        return prices[name]
            .map((price) => ({
                timestamp: price.ts,
                ask: price.askPrice,
                bid: price.bidPrice,
            }))
            .filter((d): d is NonNullable<typeof d> => d !== null);
    });
};

export const RollingPricesGraph = (props: RollingPricesGraphProps) => {
    const [data, setData] = useState<GraphData[][]>(processPrices(props.data));

    useInterval(() => {
        // Rerender the graph every 500ms with new data
        setData(processPrices(props.data));
    }, 500);

    return (
        <div className="flex justify-around">
            {data.map((d, idx) => (
                <LineChart
                    key={`chart-${idx}`}
                    width={500}
                    height={(500 * 9) / 16}
                    data={d}
                >
                    <YAxis
                        type="number"
                        domain={["dataMin", "dataMax"]}
                        padding={{ top: 20, bottom: 20 }}
                    />
                    <XAxis
                        type="number"
                        dataKey="timestamp"
                        domain={["dataMin", "dataMax"]}
                        padding={{ left: 20, right: 20 }}
                        tickFormatter={(unixTime) =>
                            new Date(unixTime).toLocaleTimeString([], {
                                hour: "numeric",
                                minute: "2-digit",
                                second: "2-digit",
                            })
                        }
                    />
                    <Legend />
                    <Line
                        type="monotone"
                        isAnimationActive={false}
                        dataKey="ask"
                        stroke="#8884d8"
                    />
                    <Line
                        type="monotone"
                        isAnimationActive={false}
                        dataKey="bid"
                        stroke="#82ca9d"
                    />
                </LineChart>
            ))}
        </div>
    );
};
