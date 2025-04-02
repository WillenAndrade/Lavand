"use client";
import Image from "next/image";
import "./style.css"

import { WineStore } from "./components/WineStore";
import { WineCarousel } from "./components/WineCarousel";

export default function Home() {
  return (
    <div className="homeContainer"> 
      <WineStore />
    </div>
  );
}


