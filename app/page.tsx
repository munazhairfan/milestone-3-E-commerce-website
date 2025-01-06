import Link from "next/link";
import React from "react";
import Image from "next/image";

export default async function Home() {
  return (
    <div>
    <div className="flex items-center">
      <h1 className="absolute text-[170px] w-full font-dancing text-white
      text-center font-bold">Welcome To <br></br>The Art Station</h1>
      <Image src={'/art-bg.jpg'} alt="hero-image" width={2000} height={500}></Image>
    </div>

    <div className="w-full flex justify-around my-20">
      <Link href="/school-essentials" className="w-[500px] h-[400px] bg-white flex">
        <Image src={'/school.png'} alt="school-essentials"
        width={500} height={500} className="object-cover"></Image>
      </Link>
      <Link href="/art-supplies" className="w-[500px] h-[400px] bg-white flex">
        <Image src={'/art.jpg'} alt="school-essentials"
        width={500} height={500} className="object-cover"></Image>
      </Link>
      <Link href="/calligraphy" className="w-[500px] h-[400px] bg-white flex">
        <Image src={'/calligraphy.jpg'} alt="school-essentials"
        width={500} height={500} className="object-cover"></Image>
      </Link>
    </div>
    </div>
  );
}