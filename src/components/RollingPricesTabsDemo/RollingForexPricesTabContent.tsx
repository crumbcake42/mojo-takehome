import { POLYGON_FOREX_API_URL } from "@/lib/polygonio/constants";
import {
    formatForexQuoteData,
    isForexQuoteData,
} from "@/lib/polygonio/helpers";
import { RollingPricesList } from "./RollingPricesList";
import { RollingPricesProvider } from "./RollingPricesProvider";
import { RollingPricesGraph } from "./RollingPricesGraph";

export const RollingForexPricesTabContent = () => {
    console.log("render rolling forex prices tab content");
    return (
        <RollingPricesProvider
            socketUrl={POLYGON_FOREX_API_URL}
            channels={["C.EUR/USD,C.CHF/USD"]}
            onNewPrice={(data) =>
                isForexQuoteData(data) ? formatForexQuoteData(data) : null
            }
        >
            {(props) => (
                <>
                    <div className="flex justify-around">
                        {Object.keys(props.data).map((pair) => (
                            <div key={pair} className="text-center">
                                <h1 className="scroll-m-20  text-4xl font-extrabold text-center underline">
                                    {pair}
                                </h1>
                            </div>
                        ))}
                    </div>

                    <RollingPricesGraph {...props} />
                    <RollingPricesList {...props} />
                </>
            )}
        </RollingPricesProvider>
    );
};
