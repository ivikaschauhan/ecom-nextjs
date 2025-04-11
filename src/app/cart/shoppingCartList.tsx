"use client";
import { useState } from "react";
import Image from "next/image";
import { Product } from "../product-data";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ShoppingCartList({initialCartProducts}:{initialCartProducts: Product[]}) {
    const [cartProducts,setCartProducts] = useState(initialCartProducts);

    const router = useRouter();

    
//   const cartProducts = cartIds.map(
//     (id) => products.find((product) => product.id === id)!
//   );

async function removeFromCart(productId:string) {
    const response = await fetch('http://localhost:3000/api/users/1/cart',{
        method: 'DELETE',
        body: JSON.stringify({ productId }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    router.refresh(); 
    const updatedCartProducts = await response.json();
    setCartProducts(updatedCartProducts);

}

  return (
    <>
      <h1 style={{ textAlign: "center" }} className="text-2xl font-bold ">Cart</h1>
      <div className="flex flex-wrap gap-6 justify-center mt-10">
      {cartProducts.map((product) => (
        <Link key={product.id} href={"/products/" + product.id}>
          <Image
            src={"/" + product.imageUrl}
            alt="Product image"
            width={200}
            height={100}
             className="w-80 h-80 object-cover rounded-md"
          />
          <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
          <p className="text-gray-600 mt-2">${product.price}</p>
            <button
                onClick={(e) => {
                e.preventDefault();
                removeFromCart(product.id);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
            >
            Remove from cart
            </button>
        </Link>
      ))}{" "}

        </div>

    </>
  );




}