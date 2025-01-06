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
    <div className='border-b-2 h-28 w-full flex bg-white justify-between px-6 items-center'>
        {/* logo div */}
      <Link href={'./'}>
        <Image src={'/name.png'} alt='company name'
        height={80} width={300}></Image>
      </Link>
      <div className='flex w-2/4 bg-pink-50 border-2 h-16 rounded-full items-center px-16'>
       <select className='flex w-full bg-pink-50 rounded-full
        text-center text-3xl
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
    <div className='w-1/12 flex justify-between'>
        <Sheet>
  <SheetTrigger>
        <Image src={'/cart.png'} alt='cart' height={40} width={40}></Image>
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
          <Link href={'/account'}>
        <Image src={'/user.png'} alt='user' height={40} width={40}></Image>
          </Link>
    </div>
      </div>
      </div>
  )
}

export default Header
