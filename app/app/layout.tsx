"use client";

import React, { ReactNode } from "react";
import { AppNav } from "@/components/layout/AppNav";
import { Footer } from "@/components/layout/Footer";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#29252F]">
      <AppNav />
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
      <Footer />
    </div>
  );
}
