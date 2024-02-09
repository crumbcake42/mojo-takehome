import { PriceQuoteData } from "@/lib/polygonio/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type RollingPricesListProps = {
    data: Record<string, PriceQuoteData[]>;
};

export const RollingPricesList = ({ data }: RollingPricesListProps) => (
    <div className="flex justify-around m-auto">
        {Object.keys(data).map((pair) => (
            <div className="m-5">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Timestamp</TableHead>
                            <TableHead>Ask</TableHead>
                            <TableHead>Bid</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data[pair].map(
                            ({ type, askPrice, bidPrice, ts, id }, idx) => (
                                <TableRow key={`${type}-${ts}-${id}-${idx}`}>
                                    <TableCell className="px-2 ">
                                        {new Date(ts).toLocaleString([], {
                                            hour: "numeric",
                                            minute: "2-digit",
                                            second: "2-digit",
                                        })}
                                    </TableCell>
                                    <TableCell className="px-2 ">
                                        {askPrice.toFixed(5)}
                                    </TableCell>
                                    <TableCell className="px-2 ">
                                        {bidPrice.toFixed(5)}
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </div>
        ))}
    </div>
);
