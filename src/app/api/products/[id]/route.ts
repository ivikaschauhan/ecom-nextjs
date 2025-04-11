import { NextRequest } from 'next/server';
import { connectToDB } from '../../db';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { db } = await connectToDB();

  const productId = context.params.id;

  const product = await db.collection('products').findOne({ id: productId });

  if (!product) {
    return new Response("Product not found", {
      status: 404,
    });
  }

  return new Response(JSON.stringify(product), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
