"use client";

import Image from "next/image";
import { Product } from "./product-data";
import Link from "next/link";
import { useState } from "react";

export default function ProductsList({
  products,
  initialCartProducts = [],
}: {
  products: Product[];
  initialCartProducts: Product[];
}) {
  const [cartProducts, setCartProducts] = useState(initialCartProducts);

  async function addToCart(productId: string) {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SITE_URL + "/api/users/1/cart",
      {
        method: "POST",
        body: JSON.stringify({ productId }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const updatedCartProducts = await response.json();
    setCartProducts(updatedCartProducts);
  }
  async function removeFromCart(productId: string) {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SITE_URL + "/api/users/1/cart",
      {
        method: "DELETE",
        body: JSON.stringify({ productId }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const updatedCartProducts = await response.json();
    setCartProducts(updatedCartProducts);
  }

  function productIsInCart(productId: string) {
    return cartProducts.some((cp) => cp.id === productId);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={"/products/" + product.id}
          className="block bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          <Image
            src={"/" + product.imageUrl}
            alt="Product image"
            width={150}
            height={150}
            className="w-full h-80 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {product.name}
            </h2>
            <p className="text-gray-600 mt-2">${product.price}</p>
            {productIsInCart(product.id) ? (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
                onClick={(e) => {
                  e.preventDefault();
                  removeFromCart(product.id);
                }}
              >
                Remove from cart
              </button>
            ) : (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product.id);
                }}
              >
                Add to Cart
              </button>
            )}

            {/* <button type="button" className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 ">Add to Cart</button> */}
          </div>
        </Link>
      ))}
    </div>
  );
}
