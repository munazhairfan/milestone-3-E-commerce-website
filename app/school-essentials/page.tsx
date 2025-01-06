import React from 'react'
import { createClient } from "@sanity/client";
import Image from 'next/image';
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import Link from 'next/link';

type School = {
  _id: string; 
  _createdAt: string; 
  _updatedAt: string;
  name: string;
  slug: {
    current: string; 
  };
  description: string;
  price: number;
  image: {
    asset: {
      _ref: string; 
      url : string,
    };
  };
  sku: string;
  stock: number;
  available: boolean;
};


const Page = async() => {
      const client = createClient({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        apiVersion: "2022-02-03",
        useCdn: false,
      });
      const query = '*[_type == "school_essentials" && available == true]'
      const products:School[] = await client.fetch(query)
      console.log(products)
      products.forEach(product => {
        console.log(product.image?.asset?._ref);
      })
      const builder = imageUrlBuilder(client)

      const urlFor = (source: SanityImageSource) => builder.image(source)

  return (
    <div className='p-10'>
      <h1 className='font-bold lg:text-6xl text-pink-700 font-dancing text-center
          xs:text-2xl md:text-5xl'>School Essentials</h1>
          <div className="grid lg:grid-cols-4 gap-8 mt-10
        xs:grid-cols-2 md:grid-cols-3">
          {products.map(product => (
            <div key={product._id}>
              <Link href={product.slug.current}>
              <div
                className="lg:h-[400px] bg-white p-7 rounded-xl shadow-lg flex flex-col
        transition hover:scale-105 items-center xs:h-[200px]"
              >
                <div className="xs:w-[100px] xs:h-[150px] overflow-hidden md:h-[150px]
                lg:h-[280px] lg:w-[200px]">
                  {product.image?.asset?._ref?(
                  <Image
                    src={urlFor(product.image.asset).width(500).height(280).url()}
                    alt={product.name}
                    height={280}
                    width={500}
                    className="object-cover"
                  />
                ) : (
                    <div>No image available</div>
                  )}
                </div>
                <div>
                  <p className="lg:text-[20px] font-bold
                  xs:text-sm">{product.name}</p>
                  <p className="text-gray-800 lg:text-[14px]
                  xs:text-[10px]">{product.description.slice(0,80)}...</p>
                  <p className="lg:text-2xl font-bold
                  xs:text-lg">${product.price}</p>
                </div>
                <button className="lg:w-[100px] lg:h-11 bg-pink-800 text-white
                rounded-xl ml-auto xs:h-5 xs:w-[60px] xs:text-[10px]
                lg:text-base flex items-center justify-center">Buy Now</button>
              </div>
              </Link>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Page

