import Link from "next/link";
import React from "react";
import Image from "next/image";

export default async function Home() {
  return (
    <div>
    <div className="flex items-center">
      <h1 className="absolute lg:text-[170px] w-full font-dancing text-white
      text-center font-bold xs:text-3xl md:text-8xl">Welcome To <br></br>The Art Station</h1>
      <Image src={'/art-bg.jpg'} alt="hero-image" width={2000} height={500}></Image>
    </div>

    <div className="w-full flex justify-around my-20 xs:flex-col lg:flex-row mx-auto">
      <Link href="/school-essentials" className="lg:w-[500px] lg:h-[400px] bg-white flex xs:size-64 xs:ml-auto xs:mr-auto 
      xs:mb-24 lg:mb-0 justify-center items-center">
        <Image src={'/school.png'} alt="school-essentials"
        width={500} height={500} className="object-cover xs:size-72"></Image>
      </Link>
      <Link href="/art-supplies" className="lg:w-[500px] lg:h-[400px] bg-white flex xs:size-64 xs:ml-auto xs:mr-auto 
      xs:mb-24 lg:mb-0 justify-center items-center">
        <Image src={'/art.jpg'} alt="school-essentials"
        width={500} height={500} className="object-cover xs:size-72"></Image>
      </Link>
      <Link href="/calligraphy" className="lg:w-[500px] lg:h-[400px] bg-white flex xs:size-64 xs:ml-auto xs:mr-auto 
      xs:mb-24 lg:mb-0 justify-center items-center">
        <Image src={'/calligraphy.jpg'} alt="school-essentials"
        width={500} height={500} className="object-cover xs:size-72"></Image>
      </Link>
    </div>
    </div>
  );
}