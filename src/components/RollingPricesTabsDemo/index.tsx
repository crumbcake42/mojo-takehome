import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { RollingForexPricesTabContent } from "./RollingForexPricesTabContent";
import { RollingCryptoPricesTabContent } from "./RollingCryptoPricesTabContent";

export const RollingPricesTabsDemo = () => {
    return (
        <div className="container">
            <Tabs defaultValue="forex">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="forex">Forex</TabsTrigger>
                    <TabsTrigger value="crypto">Crypto</TabsTrigger>
                </TabsList>
                <TabsContent value="forex">
                    <RollingForexPricesTabContent />
                </TabsContent>
                <TabsContent value="crypto">
                    <RollingCryptoPricesTabContent />
                </TabsContent>
            </Tabs>
        </div>
    );
};
