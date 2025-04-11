export default async function FetchTest() {
    const response = await fetch('http://localhost:3000/api/products');
    const data= await response.json();
  return <h1>{JSON.stringify(data)}</h1>

  
}