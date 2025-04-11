import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/app/api/db'; 

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  const { db } = await connectToDB();
  const product = await db.collection('products').findOne({ id });

  if (!product) {
    return new NextResponse('Product not found', { status: 404 });
  }

  return NextResponse.json(product);
}
