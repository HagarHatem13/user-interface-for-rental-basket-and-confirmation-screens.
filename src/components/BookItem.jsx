import React from "react";
import { Trash2, Plus, Minus } from "lucide-react"; // Optional: use icon library

const BookItem = ({ book, onIncrement, onDecrement, onRemove }) => (
  <li className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md flex justify-between items-center transition hover:shadow-lg">
    {/* Book Info */}
    <div className="text-left">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{book.title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">Quantity: {book.quantity}</p>
    </div>

    {/* Controls */}
    <div className="flex items-center gap-4">
      {/* Decrement */}
      <button
        onClick={() => onDecrement(book.id)}
        className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-800 dark:text-white rounded-full transition"
        aria-label="Decrease quantity"
      >
        <Minus size={18} />
      </button>

      {/* Increment */}
      <button
        onClick={() => onIncrement(book.id)}
        className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-800 dark:text-white rounded-full transition"
        aria-label="Increase quantity"
      >
        <Plus size={18} />
      </button>

      {/* Remove */}
      <button
        onClick={() => onRemove(book.id)}
        className="flex items-center gap-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition"
        aria-label="Remove book"
      >
        <Trash2 size={16} />
        Remove
      </button>
    </div>
  </li>
);

export default BookItem;
