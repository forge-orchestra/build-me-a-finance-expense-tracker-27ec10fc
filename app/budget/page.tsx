"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Budget, Expense } from '../../types';
import { PlusCircle, AlertCircle } from 'lucide-react';
import { getBudgets, addBudget } from '../../services/budgetService';
import { getExpenses } from '../../services/expenseService';

const BudgetPage: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [budgetsData, expensesData] = await Promise.all([getBudgets(), getExpenses()]);
        setBudgets(budgetsData);
        setExpenses(expensesData);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddBudget = async () => {
    try {
      const newBudget = await addBudget();
      setBudgets([...budgets, newBudget]);
    } catch (err) {
      setError('Failed to add budget');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <AlertCircle className="mr-2" /> {error}
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Budgets</h1>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleAddBudget}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <PlusCircle className="mr-2" /> Add Budget
        </button>
      </div>
      <ul className="space-y-4">
        {budgets.map((budget) => (
          <li key={budget.id} className="p-4 bg-white shadow rounded">
            <div className="flex justify-between">
              <span className="font-medium">{budget.name}</span>
              <span>${budget.amount.toFixed(2)}</span>
            </div>
            <div className="text-sm text-gray-500">
              {expenses
                .filter((expense) => expense.budgetId === budget.id)
                .reduce((acc, expense) => acc + expense.amount, 0)
                .toFixed(2)}{' '}
              spent
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetPage;