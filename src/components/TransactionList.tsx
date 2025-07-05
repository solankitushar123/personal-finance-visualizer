"use client";
import { useEffect, useState } from "react";

export default function TransactionList({
  refresh,
  setChartData,
}: {
  refresh: boolean;
  setChartData: (data: any[]) => void;
}) {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    setTransactions(data);
    prepareChartData(data);
  };

  const prepareChartData = (data: any[]) => {
    const monthlyTotals: Record<string, number> = {};

    data.forEach((t: any) => {
      const month = new Date(t.date).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      monthlyTotals[month] = (monthlyTotals[month] || 0) + t.amount;
    });

    const chartData = Object.keys(monthlyTotals).map((month) => ({
      month,
      amount: monthlyTotals[month],
    }));

    setChartData(chartData);
  };

  useEffect(() => {
    fetchTransactions();
  }, [refresh]);

  const handleDelete = async (id: string) => {
    await fetch(`/api/transactions?id=${id}`, { method: "DELETE" });
    fetchTransactions();
  };

  return (
    <div className="space-y-4">
      {transactions.length === 0 ? (
        <p className="text-gray-500 text-sm">No transactions yet.</p>
      ) : (
        transactions.map((t: any) => (
          <div
            key={t._id}
            className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm flex justify-between items-start"
          >
            <div className="space-y-1">
              <p className="text-lg font-semibold text-gray-800">₹{t.amount}</p>
              <p className="text-sm text-gray-600">
                {new Date(t.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">{t.description}</p>
            </div>

            <button
              onClick={() => handleDelete(t._id)}
              className="text-red-600 text-sm font-medium hover:underline ml-4"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
