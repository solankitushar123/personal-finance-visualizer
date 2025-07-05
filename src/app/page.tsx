"use client";
import { useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import ExpenseChart from "@/components/ExpenseChart";

export default function HomePage() {
  const [refresh, setRefresh] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);

  return (
    <main className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-3xl mx-auto space-y-10">
        <h1 className="text-2xl font-bold text-center text-indigo-600">
          Personal Finance Visualizer
        </h1>

        <section className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Add New Transaction
          </h2>
          <TransactionForm onAdd={() => setRefresh(!refresh)} />
        </section>

        <section className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Transactions List
          </h2>

          <TransactionList refresh={refresh} setChartData={setChartData} />
        </section>

        <section className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Monthly Expenses
          </h2>
          <ExpenseChart data={chartData} />
        </section>
      </div>
    </main>
  );
}
