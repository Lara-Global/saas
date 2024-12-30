import { useState } from "react";
import { Button } from "@/components/ui/button"; // Replace with your Button component path
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/Select"; // Import custom select component
import { DatePickerWithRange } from "@/components/DateRangePicker"; // Replace with the correct path for DatePickerWithRange
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetDescription } from "@/components/ui/sheet"; // Replace with the correct path for Sheet components

type FilterInvoiceProps = {
    onFilter: (status: string, startDate: string, endDate: string) => void;
};

const FilterInvoice: React.FC<FilterInvoiceProps> = ({ onFilter }) => {
    const [status, setStatus] = useState<string>(""); // Status filter
    const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined }); // Date range filter
    const [isSheetOpen, setIsSheetOpen] = useState(false); // State to manage the sheet visibility

    const handleFilter = () => {
        if (dateRange.from && dateRange.to) {
            const startDate = dateRange.from.toISOString().split('T')[0]; // Convert Date to YYYY-MM-DD
            const endDate = dateRange.to.toISOString().split('T')[0];
            onFilter(status, startDate, endDate); // Pass the selected filters to the parent
        } else {
            onFilter(status, "", ""); // Handle empty date range
        }
        setIsSheetOpen(false); // Close the sheet after applying the filter
    };

    return (
        
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen} >
            <SheetTrigger asChild>
                <Button variant="default" onClick={() => setIsSheetOpen(true)}>Open Filter</Button>
            </SheetTrigger>
            <SheetContent side="bottom" >
                <SheetHeader>
                    <SheetTitle>Filter Invoices</SheetTitle>
                    <SheetDescription>Apply filters to narrow down your invoice search.</SheetDescription>
                </SheetHeader>

                <div className="flex flex-col gap-4 mt-4">
                    {/* Status Filter */}
                    <div>
                        <Select value={status} onValueChange={(value) => setStatus(value)}>
                            <SelectTrigger className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary">
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="validated">Validated</SelectItem>
                                <SelectItem value="canceled">Canceled</SelectItem>
                                <SelectItem value="consomated">Consomated</SelectItem>
                                <SelectItem value="expiry">Expiry</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Date Picker */}
                    <div>
                        <DatePickerWithRange
                            className="w-full"
                            onDateChange={setDateRange} // Pass the setDateRange function
                        />
                    </div>
                </div>

                <SheetFooter>
                    <Button onClick={handleFilter} variant="default">Apply Filter</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default FilterInvoice;
