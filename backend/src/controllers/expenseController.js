import Expense from "../models/Expense.js";

// CREATE
export const addExpense = async (req, res) => {
  try {
    const { description, amount, category, date } = req.body;

    const expense = await Expense.create({
      userId: req.user.id, // ✅ FIXED
      description,
      amount,
      category,
      date,
    });

    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE (SECURITY FIX)
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id, // ✅ prevents deleting others data
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE (SECURITY FIX)
export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      req.body,
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};