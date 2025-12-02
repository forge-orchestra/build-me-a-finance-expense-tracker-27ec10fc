'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BarChart2, DollarSign } from 'lucide-react';
import { fetchExpenses, fetchBudget } from '@/lib/api'; // Assume these are defined
import { Expense, Budget } from '@/types'; // Assume these types are defined

const DashboardPage: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [expensesData, budgetData] = await Promise.all([fetchExpenses(), fetchBudget()]);
        setExpenses(expensesData);
        setBudget(budgetData);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex items-center mb-2">
            <DollarSign className="w-6 h-6 text-green-500" />
            <h2 className="ml-2 text-xl font-semibold">Budget</h2>
          </div>
          <p className="text-lg">${budget?.total || 0}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex items-center mb-2">
            <BarChart2 className="w-6 h-6 text-blue-500" />
            <h2 className="ml-2 text-xl font-semibold">Expenses</h2>
          </div>
          <ul className="space-y-2">
            {expenses.map((expense) => (
              <li key={expense.id} className="flex justify-between">
                <span>{expense.name}</span>
                <span>${expense.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;