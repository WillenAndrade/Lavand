"use client";
import { Cart } from "./Cart"; // Import from same directory
import { ReactNode } from "react";

export default function ClientProvider({ children }: { children: ReactNode }) {
  return <Cart>{children}</Cart>;
}