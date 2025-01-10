'use client'
import React from 'react'
import Image from 'next/image'
import Cart from '@/app/cart/page'
import Link from 'next/link'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


const Header = () => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedCategory = event.target.value;
  
      if (selectedCategory) {
        window.location.href = `/${selectedCategory.toLowerCase()}`;
      }
    };
  return (
    <div className='font-poppins'>
    <div className='border-b-2 h-28 w-full flex bg-white justify-between px-6 items-center xs:flex-col
    lg:flex-row'>
        {/* logo div */}
      <Link href={'./'}>
        <Image src={'/name.png'} alt='company name'
        height={80} width={300}></Image>
      </Link>
      <div className='flex lg:w-2/4 bg-pink-50 border-2 lg:h-16 rounded-full items-center lg:px-16
      xs:w-6/12 xs:p-2 xs:h-8 xs:mb-2'>
       <select className='flex w-full bg-pink-50 rounded-full
        text-center lg:text-2xl xs:text-[10px]
         items-center focus:outline-none focus:border-none' onChange={handleChange}>
            <option value={''}>ALL CATEGORIES</option>
            <option value={'./'}>HOME</option>
            <option value={'art-supplies'}>ART SUPPLIES</option>
            <option value={'office-items'}>OFFICE ITEMS</option>
            <option value={'school-essentials'}>SCHOOL ESSENTIALS</option>
            <option value={'adhesive'}>ADHESIVE</option>
            <option value={'calligraphy'}>CALLIGRAPHY</option>
        </select>
    {/* </div> */}
        </div>
    <div className='xs:w-1/6 flex justify-between xs:absolute xs:right-2 xs:top-20
    md:top-[68px] md:w-2/12 lg:relative lg:top-0 lg:w-1/12'>
        <Sheet>
  <SheetTrigger>
        <Image src={'/cart.png'} alt='cart' height={40} width={40}
        className='xs:h-7 xs:w-7'></Image>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle className='flex border-b-4'>
        <Image src={'/logo.png'} alt='logo' height={60} width={60}></Image>
        <Image src={'/name.png'} alt='logo' height={60} width={250}></Image>
      </SheetTitle>
      <SheetDescription>
        <Cart/>
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
          <Link href={'/account'} className='xs:ml-3 xs:w-7 xs:h-7'>
        <Image src={'/user.png'} alt='user' height={40} width={40}></Image>
          </Link>
    </div>
      </div>
      </div>
  )
}

export default Header
