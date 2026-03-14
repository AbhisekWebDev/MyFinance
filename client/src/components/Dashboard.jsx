import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

function Dashboard({ transactions = [] }) { // accept transactions as a prop

    // Dynamically calculate totals
    const totalIncome = transactions
        .filter(item => item.type === 'income')
        .reduce((acc, item) => acc + item.amount, 0);

    const totalExpense = transactions
        .filter(item => item.type === 'expense')
        .reduce((acc, item) => acc + Math.abs(item.amount), 0)

  return (
    // Grid Layout: 2 Columns
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Income Card */}
        <div className="card bg-base-100 shadow-xl border-b-4 border-success">
            <div className="card-body flex flex-row items-center justify-between px-6 py-4">
                <div>
                    <h2 className="text-base-content/60 text-xs font-bold uppercase tracking-widest mb-1">
                        Total Income
                    </h2>
                    <p className="text-2xl font-black text-success">
                        +₹{totalIncome.toLocaleString()}
                    </p>
                </div>
                <div className="p-3 rounded-full bg-success/10">
                    <FaArrowUp className="text-success text-xl" />
                </div>
            </div>
        </div>

        {/* Expense Card */}
        <div className="card bg-base-100 shadow-xl border-b-4 border-error">
            <div className="card-body flex flex-row items-center justify-between px-6 py-4">
                <div>
                    <h2 className="text-base-content/60 text-xs font-bold uppercase tracking-widest mb-1">
                        Total Expenses
                    </h2>
                    <p className="text-2xl font-black text-error">
                        -₹{totalExpense.toLocaleString()}
                    </p>
                </div>
                <div className="p-3 rounded-full bg-error/10">
                    <FaArrowDown className="text-error text-xl" />
                </div>
            </div>
        </div>

    </div>
  );
}

export default Dashboard;