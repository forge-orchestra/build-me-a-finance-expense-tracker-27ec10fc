import { useQuery, useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'https://api.example.com';

/**
 * Type representing an expense item.
 */
export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
}

/**
 * Type representing an error response from the API.
 */
interface ApiError {
  message: string;
}

/**
 * Fetch expenses from the API.
 * @returns {Promise<Expense[]>} A promise that resolves to an array of expenses.
 */
export const fetchExpenses = async (): Promise<Expense[]> => {
  try {
    const response = await axios.get<Expense[]>(`${API_BASE_URL}/expenses`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Add a new expense to the API.
 * @param {Expense} expense - The expense to add.
 * @returns {Promise<Expense>} A promise that resolves to the added expense.
 */
export const addExpense = async (expense: Expense): Promise<Expense> => {
  try {
    const response = await axios.post<Expense>(`${API_BASE_URL}/expenses`, expense);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Update an existing expense in the API.
 * @param {Expense} expense - The expense to update.
 * @returns {Promise<Expense>} A promise that resolves to the updated expense.
 */
export const updateExpense = async (expense: Expense): Promise<Expense> => {
  try {
    const response = await axios.put<Expense>(`${API_BASE_URL}/expenses/${expense.id}`, expense);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Delete an expense from the API.
 * @param {string} id - The ID of the expense to delete.
 * @returns {Promise<void>} A promise that resolves when the expense is deleted.
 */
export const deleteExpense = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/expenses/${id}`);
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Handle API errors.
 * @param {unknown} error - The error to handle.
 * @throws {Error} Throws an error with a message from the API or a generic message.
 */
const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const apiError = error.response?.data as ApiError;
    throw new Error(apiError?.message || 'An unexpected error occurred');
  }
  throw new Error('An unexpected error occurred');
};

/**
 * Initialize a new QueryClient.
 */
export const queryClient = new QueryClient();

/**
 * Provide the QueryClient to the application.
 * @param {React.ReactNode} children - The children components.
 * @returns {JSX.Element} The QueryClientProvider component.
 */
export const QueryClientProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

export { useQuery, useMutation };