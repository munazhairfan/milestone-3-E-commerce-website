"use client"
import React from "react";
import { useState } from "react";
import Link from "next/link";

function chkemail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email); 
  }

  function sanitizeInput(value: string): string | null {
    const invalidPattern = /[<>/{}]/;
    if (invalidPattern.test(value)) {
      return null; 
    }
    return value.trim();
  }

const Page = () => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

 const [errorEmail, setErrorEmail] = useState("");
 const [errorName, setErrorName] = useState("");
  
 const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrorEmail("");
    setErrorName("");

    const sanitizedEmail = sanitizeInput(email);
    const sanitizedName = sanitizeInput(name);
    
    let formIsValid = true;

    if (!sanitizedName) {
      setErrorName("Name is required.");
      formIsValid = false;
    }

    if (!sanitizedEmail || !chkemail(sanitizedEmail)) {
      setErrorEmail("Please enter a valid email address.");
      formIsValid = false;
    }

    if (!formIsValid) {
        return; 
    }
    alert("You've successfully signed up..")
  };
    

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-3xl text-gray-900">
              Welcome to The Art Station
            </h1>
            <p className="leading-relaxed mt-4">
              At The Art Station, the focus is on providing not only top-notch
              materials but also inspiration. The store features a curated
              collection of unique art pieces, prints, and crafts, allowing
              customers to explore and discover new ideas. The friendly and
              knowledgeable staff is always on hand to offer expert advice,
              recommend products, and share techniques to help you enhance your
              creative journey.
            </p>
          </div>
          <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <form onSubmit={handleSubmit}>
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Sign Up
            </h2>
            <div className="relative mb-4">
              <label
                htmlFor="full-name"
                className="leading-7 text-sm text-gray-600"
              >
                Full Name
              </label>
              <input
                type="text"
                id="full-name"
                name="full-name"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                onChange={(e) => {
                    setName(e.target.value);
                  }}
              ></input>
                {errorName && <p style={{ color: "red" }}>{errorName}</p>}
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                onChange={(e) => {
                    setEmail(e.target.value);
                  }}
              ></input>
                {errorEmail && <p style={{ color: "red" }}>{errorEmail}</p>}
            </div>
            <input type="submit" 
            className="text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg">
            </input>
          </form>
          <p className="text-center">Already have an account? </p>
          <Link href='/login' className="text-center underline">Login in</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
