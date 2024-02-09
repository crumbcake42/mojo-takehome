import {
    formatCryptoQuoteData,
    isCryptoQuoteData,
} from "@/lib/polygonio/helpers";
import { POLYGON_CRYPTO_API_URL } from "@/lib/polygonio/constants";

import { RollingPricesList } from "./RollingPricesList";
import { RollingPricesProvider } from "./RollingPricesProvider";
import { RollingPricesGraph } from "./RollingPricesGraph";

export const RollingCryptoPricesTabContent = () => (
    <RollingPricesProvider
        socketUrl={POLYGON_CRYPTO_API_URL}
        channels={["XQ.BTC-USD", "XQ.ETH-USD"]}
        onNewPrice={(data) =>
            isCryptoQuoteData(data) ? formatCryptoQuoteData(data) : null
        }
    >
        {(props) => (
            <>
                <RollingPricesGraph {...props} />
                <RollingPricesList {...props} />
            </>
        )}
    </RollingPricesProvider>
);
