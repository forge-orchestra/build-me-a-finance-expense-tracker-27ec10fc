import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface BudgetOverviewProps {
  totalBudget: number;
  spentAmount: number;
}

const BudgetOverview: React.FC<BudgetOverviewProps> = ({ totalBudget, spentAmount }) => {
  const remainingBudget = totalBudget - spentAmount;
  const isOverBudget = remainingBudget < 0;
  const budgetPercentage = (spentAmount / totalBudget) * 100;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Budget Overview</h2>
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-600">Total Budget:</span>
        <span className="font-medium text-gray-900">${totalBudget.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-600">Spent Amount:</span>
        <span className="font-medium text-gray-900">${spentAmount.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-600">Remaining Budget:</span>
        <span className={`font-medium ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
          ${remainingBudget.toFixed(2)}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-600">Budget Usage:</span>
        <div className="flex items-center">
          <div className="w-32 h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${isOverBudget ? 'bg-red-600' : 'bg-green-600'}`}
              style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
            ></div>
          </div>
          <span className="ml-2 font-medium text-gray-900">{budgetPercentage.toFixed(1)}%</span>
        </div>
      </div>
      <div className="mt-4">
        {isOverBudget ? (
          <div className="flex items-center text-red-600">
            <AlertCircle className="w-5 h-5 mr-2" aria-hidden="true" />
            <span role="alert">You are over budget!</span>
          </div>
        ) : (
          <div className="flex items-center text-green-600">
            <CheckCircle className="w-5 h-5 mr-2" aria-hidden="true" />
            <span role="alert">You are within your budget.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetOverview;