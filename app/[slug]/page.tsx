"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { useParams } from "next/navigation";
import Image from "next/image";

type Product = {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  description: string;
  price: number;
  image: {
    asset: {
      _ref: string;
      url: string;
    };
  };
  sku: string;
  stock: number;
  available: boolean;
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2022-02-03",
  useCdn: false,
});
const builder = imageUrlBuilder(client);
const urlFor = (source: Product["image"]["asset"]) => builder.image(source);

const SlugPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const query = `*[_type in ["art_supplies", "office_items", "school_essentials", "adhesive","calligraphy"] && slug.current == $slug][0]`;

    client
      .fetch(query, { slug })
      .then((data: Product) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [slug]);

  if (loading)
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <div
          className="lg:h-[80px] lg:w-[80px] xs:h-[40px] xs:w-[40px] lg:border-8
    xs:border-4 border-gray-300
 border-t-gray-600 rounded-full animate-spin"
        ></div>
        </div>
    );
  if (!product) return <div>Product not found</div>;

  const addToCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingProductIndex = savedCart.findIndex(
      (item: CartItem) => item.id === product._id
    );
    if (existingProductIndex > -1) {
      savedCart[existingProductIndex].quantity += 1;
    } else {
      savedCart.push({
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image?.asset
          ? urlFor(product.image.asset).width(100).height(100).url()
          : "/logo.png",
      });
    }

    localStorage.setItem("cart", JSON.stringify(savedCart));

    alert(`${product.name} added to cart`);
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto my-20">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          {product.image?.asset?._ref ? (
            <Image
              src={urlFor(product.image.asset).width(400).height(400).url()}
              alt={product.name}
              height={400}
              width={400}
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            />
          ) : (
            <div className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded">
              No image available
            </div>
          )}
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.name}
            </h1>
            <p className="leading-relaxed">{product.description}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
            {product.available ? (
                <p>In Stock: {product.stock} available</p>
              ) : (
                <p>Out of Stock</p>
              )}
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                ${product.price}
              </span>
              <button
                onClick={addToCart}
                className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SlugPage;
