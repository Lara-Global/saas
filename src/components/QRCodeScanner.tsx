import React from "react";
import { QrReader } from "react-qr-reader";

type Props = {
    onScan: (result: string) => void;
    resultStatus: string;
    disabled: boolean; // Add disabled prop
};

const QRCodeScanner = ({ onScan, disabled, resultStatus }: Props) => {
    const handleScan = (result: any) => {
        if (result && result.getText) {
            onScan(result.getText()); // Use the getText method for Result class instances
        } else if (result && result.text) {
            onScan(result.text); // Access text if it's available
        } else if (result && typeof result === 'string') {
            onScan(result); // If result is just a string (plain QR code data)
        }
    };

    const handleError = (err: any) => {
        console.error(err);
    };

    return (
        <div className="w-full max-w-md">
            <div style={{ width: "100%" }}>
                {/* Render QrReader only if it's not disabled */}
                {!disabled ? (
                    <QrReader
                        onResult={(result, error) => {
                            if (!!result) {
                                handleScan(result);
                            }

                            if (!!error) {
                                handleError(error);
                            }
                        }}
                        constraints={{
                            facingMode: "environment",
                            width: 300,
                            height: 300,
                        }}
                    />
                ) : (
                    <div className="flex items-center justify-center h-48 rounded">
                        {resultStatus === "consomated" ? (
                            "The invoice is validated 100%"
                        ) : resultStatus === "expiry" ? (
                            "The invoice has expired; it is past 1 hour."
                        ) : (
                            resultStatus
                        )}
                    </div>

                )}
            </div>
        </div>
    );
};

export default QRCodeScanner;
