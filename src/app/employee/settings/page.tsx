"use client";

import React from "react";
import PageTitle from "@/components/PageTitle";
import TabsDemo from "@/components/updateAccData";
type Props = {};
import Toaster from "@/components/Toaster";
interface Setting {
  category: string;
  value: string | number | boolean;
}

export default function SettingsPage({ }: Props) {


  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Settings" />
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md">
          <Toaster />
          <TabsDemo />
        </div>
      </div>
    </div>
  );
}
