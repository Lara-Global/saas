import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text"; // Assuming there's a Text component for typography

type InvoiceSummaryProps = {
    invoices: { status: string }[]; // Assuming each invoice has a 'status' field
};

const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({ invoices }) => {
    // Count total invoices
    const totalInvoices = invoices.length;

    // Count invoices based on status
    const validatedInvoices = invoices.filter(invoice => invoice.status === 'validated').length;
    const canceledInvoices = invoices.filter(invoice => invoice.status === 'canceled').length;
    const ExpiryInvoices = invoices.filter(invoice => invoice.status === 'expiry').length;
    const consomatedInvoices = invoices.filter(invoice => invoice.status === 'consomated').length;


    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Invoice Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {/* Total Invoices */}
                <div className="flex justify-between">
                    <Text className="text-muted-foreground">Total Invoices:</Text>
                    <Text className="font-medium">{totalInvoices}</Text>
                </div>
                <div className="flex justify-between">
                    <Text className="text-muted-foreground">Validated Invoices:</Text>
                    <Text className="font-medium text-muted-foreground">{validatedInvoices}</Text>
                </div>
              
                <div className="flex justify-between">
                    <Text className="text-muted-foreground">Consomated Invoices:</Text>
                    <Text className="font-medium text-muted-foreground">{consomatedInvoices}</Text>
                </div>
                <div className="flex justify-between">
                    <Text className="text-muted-foreground">Expiry Invoices:</Text>
                    <Text className="font-medium text-muted-foreground">{ExpiryInvoices}</Text>
                </div>
                <div className="flex justify-between">
                    <Text className="text-muted-foreground">Canceled Invoices:</Text>
                    <Text className="font-medium text-muted-foreground">{canceledInvoices}</Text>
                </div>

              
            </CardContent>
        </Card>
    );
};

export default InvoiceSummary;
