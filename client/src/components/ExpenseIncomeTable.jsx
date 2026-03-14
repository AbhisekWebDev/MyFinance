import React from 'react'

// 1. Accept transactions as a prop from App.jsx!
function ExpenseIncomeTable({ transactions = [] }) { 

  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 h-full">
        <div className="card-body">
            <h2 className="card-title text-lg font-bold uppercase tracking-wide mb-4">
                Recent Transactions
            </h2>

            {transactions.length === 0 ? (
                <div className="text-center text-base-content/60 py-8">
                    No transactions found. Add one on the left!
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead className="bg-base-200 text-base-content uppercase text-xs font-bold">
                            <tr>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((item) => (
                                <tr key={item._id} className="hover">
                                    <td className="font-medium">{item.text}</td>
                                    <td className={`font-bold ${item.type === 'income' ? 'text-success' : 'text-error'}`}>
                                        {item.type === 'income' ? '+' : '-'}₹{Math.abs(item.amount).toLocaleString()}
                                    </td>
                                    <td className="text-sm opacity-70">
                                        {new Date(item.createdAt || Date.now()).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <div className={`badge ${item.type === 'income' ? 'badge-success badge-outline' : 'badge-error badge-outline'} gap-2`}>
                                            {item.type}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    </div>
  )
}

export default ExpenseIncomeTable