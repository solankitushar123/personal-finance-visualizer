import { dbConnect } from '@/lib/dbConnect';
import { Transaction } from '@/lib/models/Transaction';

export async function GET() {
  await dbConnect();
  const transactions = await Transaction.find().sort({ date: -1 });
  return Response.json(transactions);
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const transaction = await Transaction.create(body);
  return Response.json(transaction);
}

export async function DELETE(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return new Response('Transaction ID is missing', { status: 400 });
  }

  await Transaction.findByIdAndDelete(id);
  return new Response('Deleted successfully');
}
