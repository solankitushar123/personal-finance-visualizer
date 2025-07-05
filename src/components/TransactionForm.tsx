"use client";
import { useState } from "react";

export default function TransactionForm({ onAdd }: { onAdd: () => void }) {
  const [form, setForm] = useState({ amount: "", date: "", description: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.amount || !form.date || !form.description) {
      setError("⚠️ Please fill in all fields.");
      return;
    }

    setError("");
    await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify({
        amount: parseFloat(form.amount),
        date: new Date(form.date),
        description: form.description,
      }),
    });
    setForm({ amount: "", date: "", description: "" });
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-bold text-gray-800">Amount (₹)</label>
        <input
          type="number"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          placeholder="Enter amount in ₹"
          className="w-full border border-gray-300 bg-white rounded p-2 text-gray-900 placeholder-gray-400"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-bold text-gray-800">
          Date (dd-mm-yyyy)
        </label>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="w-full border border-gray-300 bg-white rounded p-2 text-gray-900 placeholder-gray-400"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-bold text-gray-800">
          Description
        </label>
        <input
          type="text"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Enter description (e.g. Grocery shopping)"
          className="w-full border border-gray-300 bg-white rounded p-2 text-gray-900 placeholder-gray-400"
          required
        />
      </div>

      {error && <div className="text-red-600">{error}</div>}

      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Add Transaction
      </button>
    </form>
  );
}
