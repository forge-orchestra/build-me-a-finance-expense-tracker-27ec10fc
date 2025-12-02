import { NextApiRequest, NextApiResponse } from 'next';
import { Expense, validateExpense } from '@/models/expense';
import { connectToDatabase } from '@/utils/db';
import Cors from 'cors';

// Initialize CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);

  const { db } = await connectToDatabase();

  switch (req.method) {
    case 'GET':
      try {
        const expenses = await db.collection('expenses').find({}).toArray();
        res.status(200).json(expenses);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch expenses' });
      }
      break;

    case 'POST':
      try {
        const { error } = validateExpense(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const newExpense: Expense = req.body;
        const result = await db.collection('expenses').insertOne(newExpense);
        res.status(201).json(result.ops[0]);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create expense' });
      }
      break;

    case 'PUT':
      try {
        const { id, ...data } = req.body;
        const { error } = validateExpense(data);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const result = await db.collection('expenses').updateOne({ _id: id }, { $set: data });
        if (result.matchedCount === 0) return res.status(404).json({ error: 'Expense not found' });

        res.status(200).json({ message: 'Expense updated successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to update expense' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.body;
        const result = await db.collection('expenses').deleteOne({ _id: id });
        if (result.deletedCount === 0) return res.status(404).json({ error: 'Expense not found' });

        res.status(200).json({ message: 'Expense deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete expense' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}