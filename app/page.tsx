'use client';

import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { LucideIcon } from 'lucide-react';
import { Loader } from 'lucide-react';

const Page: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate data fetching
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin h-8 w-8 text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Forge App</h1>
          <p className="mt-2">Efficiently manage your personal finances</p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-10">
        <section className="text-center mb-12">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <LucideIcon name="dollar-sign" className="h-8 w-8 mx-auto text-blue-600 mb-4" />
              <h3 className="text-lg font-medium mb-2">Expense Tracking</h3>
              <p>Track your expenses effortlessly with our intuitive interface.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <LucideIcon name="pie-chart" className="h-8 w-8 mx-auto text-blue-600 mb-4" />
              <h3 className="text-lg font-medium mb-2">Budget Management</h3>
              <p>Set and manage budgets to achieve your financial goals.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <LucideIcon name="bar-chart-2" className="h-8 w-8 mx-auto text-blue-600 mb-4" />
              <h3 className="text-lg font-medium mb-2">Detailed Analytics</h3>
              <p>Gain insights into your spending habits with detailed analytics.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Page;