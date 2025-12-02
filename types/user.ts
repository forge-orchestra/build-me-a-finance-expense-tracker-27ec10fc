import { LucideIcon } from 'lucide-react';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  profileImage?: string;
  currency: string;
}

export interface UserSettings {
  theme: 'light' | 'dark';
  notificationsEnabled: boolean;
  defaultCurrency: string;
  language: string;
}

export interface UserExpense {
  id: string;
  userId: string;
  amount: number;
  category: string;
  date: Date;
  description?: string;
  icon?: LucideIcon;
}

export interface UserBudget {
  id: string;
  userId: string;
  totalAmount: number;
  spentAmount: number;
  category: string;
  startDate: Date;
  endDate: Date;
}

export interface UserAnalytics {
  userId: string;
  totalExpenses: number;
  totalIncome: number;
  monthlyExpenses: Record<string, number>;
  monthlyIncome: Record<string, number>;
}