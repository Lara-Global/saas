"use client";

import React, { Suspense } from "react";
import InvD from "./INVD";

export default function EditUserPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <InvD />
        </Suspense>
    );
}
