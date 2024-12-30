"use client";

import React, { Suspense } from "react";
import EditUser from "./EditUser"; 

export default function EditUserPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditUser />
        </Suspense>
    );
}
