import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import {
  FaUtensils, FaPlane, FaShoppingCart, FaTag, FaHeart,
  FaBook, FaFilm, FaBolt, FaUserCircle, FaMoon, FaSun, FaWallet,
  FaPlus, FaChartBar, FaSearch, FaTrash, FaPen
} from "react-icons/fa";
import { motion } from "framer-motion";

const categoryIcons = {
  Food: <FaUtensils />,
  Travel: <FaPlane />,
  Shopping: <FaShoppingCart />,
  Health: <FaHeart />,
  Education: <FaBook />,
  Entertainment: <FaFilm />,
  Utilities: <FaBolt />,
  PersonalCare: <FaUserCircle />,
  Other: <FaTag />,
};

const Dashboard = () => {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  const [budgetInput, setBudgetInput] = useState("");
  const [budget, setBudget] = useState(() => {
    return Number(localStorage.getItem("budget")) || 0;
  });
  const [search, setSearch] = useState("");
  const [showChart, setShowChart] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editFields, setEditFields] = useState({});
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return navigate("/");
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await api.get("/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(res.data);
      setError("");
    } catch {
      setError("Failed to load expenses");
    }
  };

  const handleBudgetSet = () => {
    const value = Number(budgetInput);
    if (!value || value < 0) {
      setError("Enter a valid budget");
      return;
    }
    setBudget(value);
    localStorage.setItem("budget", value);
    setBudgetInput("");
    setError("");
  };

  const addExpense = async () => {
    if (!amount || !description || !date) {
      return setError("Fill all fields");
    }

    try {
      await api.post(
        "/expenses",
        { amount, description, category, date },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAmount("");
      setDescription("");
      setDate("");
      setCategory("Food");
      fetchExpenses();
      setError("");
    } catch {
      setError("Failed to add expense");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await api.delete(`/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchExpenses();
    } catch {
      setError("Failed to delete expense");
    }
  };

  const startEdit = (exp) => {
    setEditId(exp._id);
    setEditFields({
      description: exp.description,
      amount: exp.amount,
      category: exp.category,
      date: exp.date?.slice(0, 10),
    });
  };

  const saveEdit = async (id) => {
    try {
      await api.put(`/expenses/${id}`, editFields, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditId(null);
      setEditFields({});
      fetchExpenses();
    } catch {
      setError("Failed to update expense");
    }
  };

  const filtered = expenses.filter(
    (e) =>
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase())
  );

  const total = expenses.reduce((a, b) => a + Number(b.amount || 0), 0);
  const remaining = budget ? budget - total : 0;

  const chartData = expenses.reduce((acc, e) => {
    const found = acc.find((x) => x.category === e.category);
    if (found) found.amount += Number(e.amount);
    else acc.push({ category: e.category, amount: Number(e.amount) });
    return acc;
  }, []);

  const bgClass = darkMode ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-900";
  const cardClass = darkMode
    ? "bg-slate-900/80 border border-slate-800 shadow-2xl"
    : "bg-white border border-slate-200 shadow-lg";

  return (
    <div className={`${bgClass} min-h-screen transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <p className="text-sm text-indigo-500 font-semibold">Welcome back</p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Expense Dashboard
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Track spending, manage budget, and stay in control.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
              {darkMode ? "Light" : "Dark"}
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
              className="px-4 py-2 rounded-xl bg-rose-600 text-white hover:bg-rose-700 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-rose-600">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <div className={`${cardClass} rounded-2xl p-5`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Spent</p>
                <h3 className="text-2xl font-bold mt-1">₹{total}</h3>
              </div>
              <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
                <FaWallet />
              </div>
            </div>
          </div>

          <div className={`${cardClass} rounded-2xl p-5`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Budget</p>
                <h3 className="text-2xl font-bold mt-1">₹{budget}</h3>
              </div>
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600">
                <FaChartBar />
              </div>
            </div>
          </div>

          <div className={`${cardClass} rounded-2xl p-5`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Remaining</p>
                <h3 className="text-2xl font-bold mt-1">₹{remaining}</h3>
              </div>
              <div className="p-3 rounded-xl bg-amber-100 text-amber-600">
                <FaPlus />
              </div>
            </div>
          </div>

          <div className={`${cardClass} rounded-2xl p-5`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Transactions</p>
                <h3 className="text-2xl font-bold mt-1">{expenses.length}</h3>
              </div>
              <div className="p-3 rounded-xl bg-pink-100 text-pink-600">
                <FaPen />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <div className={`${cardClass} rounded-2xl p-6`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Budget</h2>
                <span className="text-sm text-slate-500">Set your monthly limit</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="number"
                  className="w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter budget amount"
                  value={budgetInput}
                  onChange={(e) => setBudgetInput(e.target.value)}
                />
                <button
                  onClick={handleBudgetSet}
                  className="px-5 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition"
                >
                  Set Budget
                </button>
              </div>
            </div>

            <div className={`${cardClass} rounded-2xl p-6`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Add Expense</h2>
                <span className="text-sm text-slate-500">Save a new transaction</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <input
                  className="rounded-xl border border-slate-300 bg-transparent px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  type="number"
                  className="rounded-xl border border-slate-300 bg-transparent px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <input
                  type="date"
                  className="rounded-xl border border-slate-300 bg-transparent px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <select
                  className="rounded-xl border border-slate-300 bg-transparent px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {Object.keys(categoryIcons).map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={addExpense}
                className="mt-4 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                <FaPlus />
                Add Expense
              </button>
            </div>

            <div className={`${cardClass} rounded-2xl p-6`}>
              <div className="flex items-center justify-between mb-4 gap-4">
                <h2 className="text-lg font-semibold">Recent Expenses</h2>
                <div className="relative w-full max-w-sm">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    className="w-full rounded-xl border border-slate-300 bg-transparent pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Search by description or category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                {filtered.length === 0 ? (
                  <div className="text-center py-10 text-slate-500">
                    No expenses found.
                  </div>
                ) : (
                  filtered.map((e) => (
                    <motion.div
                      key={e._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
                    >
                      {editId === e._id ? (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                          <input
                            className="rounded-xl border border-slate-300 px-3 py-2 bg-white"
                            value={editFields.description || ""}
                            onChange={(ev) =>
                              setEditFields({ ...editFields, description: ev.target.value })
                            }
                          />
                          <input
                            className="rounded-xl border border-slate-300 px-3 py-2 bg-white"
                            value={editFields.amount || ""}
                            onChange={(ev) =>
                              setEditFields({ ...editFields, amount: ev.target.value })
                            }
                          />
                          <input
                            type="date"
                            className="rounded-xl border border-slate-300 px-3 py-2 bg-white"
                            value={editFields.date || ""}
                            onChange={(ev) =>
                              setEditFields({ ...editFields, date: ev.target.value })
                            }
                          />
                          <select
                            className="rounded-xl border border-slate-300 px-3 py-2 bg-white"
                            value={editFields.category || "Food"}
                            onChange={(ev) =>
                              setEditFields({ ...editFields, category: ev.target.value })
                            }
                          >
                            {Object.keys(categoryIcons).map((c) => (
                              <option key={c}>{c}</option>
                            ))}
                          </select>

                          <div className="md:col-span-4 flex gap-2">
                            <button
                              onClick={() => saveEdit(e._id)}
                              className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditId(null)}
                              className="px-4 py-2 rounded-xl bg-slate-500 text-white hover:bg-slate-600"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-lg">
                              {categoryIcons[e.category] || <FaTag />}
                            </div>

                            <div>
                              <p className="font-semibold text-lg">{e.description}</p>
                              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 mt-1">
                                <span>{e.category}</span>
                                <span>•</span>
                                <span>{e.date?.slice(0, 10)}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <p className="text-lg font-bold text-indigo-600">₹{e.amount}</p>
                            <button
                              onClick={() => startEdit(e)}
                              className="px-3 py-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition"
                            >
                              <FaPen />
                            </button>
                            <button
                              onClick={() => deleteExpense(e._id)}
                              className="px-3 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`${cardClass} rounded-2xl p-6`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Spending Chart</h2>
                <button
                  onClick={() => setShowChart(!showChart)}
                  className="px-3 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition"
                >
                  {showChart ? "Hide" : "Show"}
                </button>
              </div>

              {showChart && chartData.length > 0 ? (
                <div className="w-full h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="amount" fill="#6366f1" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-slate-500">
                  No chart data yet.
                </div>
              )}
            </div>

            <div className={`${cardClass} rounded-2xl p-6`}>
              <h2 className="text-lg font-semibold mb-4">Quick Tips</h2>
              <ul className="space-y-3 text-sm text-slate-500">
                <li>• Keep budget above your monthly total.</li>
                <li>• Add expenses daily for better tracking.</li>
                <li>• Search to quickly find category-wise spend.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;