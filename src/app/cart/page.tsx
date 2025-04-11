export const dynamic = "force-dynamic";
import ShoppingCartList from "./shoppingCartList"
import Link from "next/link";


export default async function CartPage() {
  const response = await fetch('http://localhost:3000/api/users/1/cart',{
    cache: 'no-cache',
    
  }) 
  if (!response.ok) {
    throw new Error(`Failed to fetch cart: ${response.status}`);
  }
  const cartProducts = await response.json()



  if (!cartProducts || cartProducts.length === 0) {
    return(
      <>
      <img style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}src="/shopping.png" alt="Shopping Cart" />
    </>
    )
  }
  
 //add abutton to go to the checkout page
 
  
  return(
    <div style={{ padding: "20px" }}>
    <ShoppingCartList initialCartProducts={cartProducts} />
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Link href="/checkout">
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Checkout
        </button>
      </Link>
    </div>
  </div>
    
  );
}
