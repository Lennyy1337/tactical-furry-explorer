"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

  return (
    <div className="max-w-screen max-h-screen flex bg-black min-h-screen min-w-screen overflow-hidden">
      <div className="flex flex-wrap justify-center w-full items-center">
        <div className="xl:w-1/2 xl:h-1/2 w-screen h-1/2 bg-gray-900 shadow-xl shadow-gray-900 xl:backdrop-blur-lg rounded-xl hover:-translate-y-2 transition-all ease-in-out text-center flex flex-col justify-center">
          <h1 className="text-red-700 text-bold xl:text-7xl text-4xl m-3">WARNING: 18+</h1>
          <p className="text-md text-white">If you aren&apos;t over 18 please click &quot;I am under 18&quot;</p>
          <div className="flex flex-row justify-center my-5 space-x-4">
            <Link className="border-2 border-red-900 rounded-xl px-6 py-2 text-center text-white transition-all ease-in-out hover:bg-red-900 duration-200" href={"/images"}>I am Over 18</Link>
            <Link className="border-2 border-red-900 rounded-xl px-6 py-2 text-center text-white transition-all ease-in-out hover:bg-red-900 duration-200" href={"https://google.com"}>I am Under 18</Link>
          </div>
          <p className="text-sm">why did i make this</p>
        </div>
        
      </div>
   
    </div>
  );
}
