"use client";

import React, { Suspense } from "react";
import EditProduct from "./EditProduct"; // Assuming the component is named EditProduct

export default function EditProductPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditProduct />
        </Suspense>
    );
}
