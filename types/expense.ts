import { LucideIcon } from 'lucide-react';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: Date;
  category: string;
  icon: LucideIcon;
}

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
}

export type ExpenseFormInputs = {
  title: string;
  amount: number;
  date: string;
  category: string;
};