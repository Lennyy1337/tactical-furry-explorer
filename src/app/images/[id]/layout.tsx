import React from "react";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
const inter = Inter({ subsets: ["latin"] });

interface fullProps {
    children: React.ReactNode;
    params: {url: string}
}

export default function Fulllayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body className={`${inter.className} dark`}>{children}</body>
      </html>
    );
  }
  