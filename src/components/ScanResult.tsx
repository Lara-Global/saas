import React from "react";

type Props = {
    result: string;
};

const ScanResult = ({ result }: Props) => {
    return (
        <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded">
            <p>{result}</p>
        </div>
    );
};

export default ScanResult;
