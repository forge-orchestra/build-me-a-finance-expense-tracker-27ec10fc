import { LucideIcon } from 'lucide-react';

/**
 * Represents an expense item.
 */
export type Expense = {
  id: string;
  amount: number;
  category: string;
  date: Date;
  description?: string;
};

/**
 * Represents a budget item.
 */
export type Budget = {
  category: string;
  limit: number;
};

/**
 * Calculates the total expenses from a list of expenses.
 * @param expenses - Array of Expense objects.
 * @returns The total amount of expenses.
 */
export function calculateTotalExpenses(expenses: Expense[]): number {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

/**
 * Filters expenses by category.
 * @param expenses - Array of Expense objects.
 * @param category - The category to filter by.
 * @returns An array of expenses belonging to the specified category.
 */
export function filterExpensesByCategory(expenses: Expense[], category: string): Expense[] {
  return expenses.filter(expense => expense.category === category);
}

/**
 * Validates if an expense is within the budget.
 * @param expense - The expense to validate.
 * @param budget - The budget to compare against.
 * @returns True if the expense is within the budget, otherwise false.
 */
export function isExpenseWithinBudget(expense: Expense, budget: Budget): boolean {
  return expense.amount <= budget.limit;
}

/**
 * Formats a date to a readable string.
 * @param date - The date to format.
 * @returns A formatted date string.
 */
export function formatDate(date: Date): string {
  try {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Invalid date provided:', error);
    return '';
  }
}

/**
 * Retrieves an icon component based on the category.
 * @param category - The category to get the icon for.
 * @returns A LucideIcon component.
 */
export function getCategoryIcon(category: string): LucideIcon {
  switch (category) {
    case 'Food':
      return 'Utensils';
    case 'Transport':
      return 'Car';
    case 'Entertainment':
      return 'Music';
    default:
      return 'Tag';
  }
}

export {
  Expense,
  Budget,
  calculateTotalExpenses,
  filterExpensesByCategory,
  isExpenseWithinBudget,
  formatDate,
  getCategoryIcon,
};