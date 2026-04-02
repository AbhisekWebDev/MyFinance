import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

// 1. We now accept the 'summary' prop passed from App.jsx
function Dashboard({ summary }) { 

  // Look mom, no math! The backend did it all.

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Income Card */}
        <div className="card bg-base-100 shadow-xl border-b-4 border-success">
            <div className="card-body flex flex-row items-center justify-between px-6 py-4">
                <div>
                    <h2 className="text-base-content/60 text-xs font-bold uppercase tracking-widest mb-1">
                        Total Income
                    </h2>
                    <p className="text-2xl font-black text-success">
                        {/* 2. Directly display the backend's aggregated totalIncome */}
                        +₹{(summary?.totalIncome || 0).toLocaleString()}
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
                        {/* 3. Directly display the backend's aggregated totalExpense */}
                        -₹{(summary?.totalExpense || 0).toLocaleString()}
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