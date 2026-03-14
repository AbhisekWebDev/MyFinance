import React, { useState } from 'react'
import axios from 'axios'

// 1. Accept the refreshData function as a prop
function Form({ refreshData }) { 
    const [text, setText] = useState('')
    const [amount, setAmount] = useState('')
    const [loading, setLoading] = useState(false) 

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if (!text || !amount) {
            alert('Please fill in all fields')
            return
        }

        const numericAmount = parseFloat(amount)

        const newTransaction = {
            text : text,
            amount : numericAmount,
            type : numericAmount >= 0 ? 'income' : 'expense',
        }

        try {
            setLoading(true);

            await axios.post('http://localhost:5000/api/transactions', newTransaction)

            setText('')
            setAmount('')

            // 2. THIS IS THE MAGIC! Tell App.jsx to instantly fetch the new data
            if (refreshData) {
                refreshData(); 
            }

        } catch (err) {
            console.error("Error saving transaction:", err)
            alert("Failed to save transaction. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body">
                <h2 className="card-title justify-center text-lg font-bold mb-4 uppercase tracking-wide">
                    Add New Transaction
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <label htmlFor="description" className="form-control w-full">
                        <div className="label"><span className="label-text font-semibold">Description</span></div>
                        <input id="description" name="description" type="text" placeholder="e.g. Salary, Rent, Coffee" 
                            className="input input-bordered w-full focus:input-primary" 
                            value={text} onChange={(e) => setText(e.target.value)} />
                    </label>

                    <label htmlFor="amount" className="form-control w-full">
                        <div className="label"><span className="label-text font-semibold">Amount</span></div>
                        <input id="amount" name="amount" type="number" placeholder="Enter amount..." 
                            className="input input-bordered w-full focus:input-primary" 
                            value={amount} onChange={(e) => setAmount(e.target.value)} />
                        <div className="label">
                            <span className="label-text-alt text-base-content/60">Positive for Income, Negative for Expense</span>
                        </div>
                    </label>

                    <div className="card-actions justify-end mt-4">
                        <button type="submit" className="btn btn-primary btn-block text-lg shadow-lg" disabled={loading}>
                            {loading ? "Saving..." : "Add Transaction"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Form