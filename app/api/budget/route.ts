import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import Cors from 'cors';

const prisma = new PrismaClient();
const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'],
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

type Budget = {
  id: number;
  name: string;
  limit: number;
  createdAt: Date;
  updatedAt: Date;
};

type ErrorResponse = {
  error: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Budget | Budget[] | ErrorResponse>) {
  await runMiddleware(req, res, cors);

  switch (req.method) {
    case 'GET':
      try {
        const budgets = await prisma.budget.findMany();
        res.status(200).json(budgets);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch budgets' });
      }
      break;
    case 'POST':
      try {
        const { name, limit } = req.body;
        if (!name || typeof limit !== 'number') {
          res.status(400).json({ error: 'Invalid input' });
          return;
        }
        const newBudget = await prisma.budget.create({
          data: {
            name,
            limit,
          },
        });
        res.status(201).json(newBudget);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create budget' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}

export default handler;