import ProductsList from "../ProductsList";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const response = await fetch(
    process.env.NEXT_PUBLIC_SITE_URL + "/api/products"
  );
  const products = await response.json();
  const response2 = await fetch(
    process.env.NEXT_PUBLIC_SITE_URL + "/api/users/1/cart",
    {
      cache: "no-cache",
    }
  );
  const cartProducts = await response2.json();
  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-center mt-10">Products</h1>
      <ProductsList products={products} initialCartProducts={cartProducts} />
    </>
  );
}
