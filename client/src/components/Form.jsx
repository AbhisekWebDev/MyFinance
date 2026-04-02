import React, { useState } from 'react'
import axios from 'axios'

// 1. Accept the refreshData function as a prop
function Form({ refreshData }) { 
    const [text, setText] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('General')
    const [type, setType] = useState('expense')
    const [loading, setLoading] = useState(false) 

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if (!text || !amount || !category) {
            alert('Please fill in all fields')
            return
        }

        let numericAmount = Math.abs(parseFloat(amount))

        //  Automatically make it negative if they selected "expense"
        if (type === 'expense') {
            numericAmount = -numericAmount;
        }

        const newTransaction = {
            text : text,
            amount : numericAmount,
            type : type,
            category: category
        }

        try {
            setLoading(true);

            await axios.post('http://localhost:5000/api/transactions', newTransaction, {
                headers: { 'Authorization': 'token-admin-789' }
            })

            setText('')
            setAmount('')
            setCategory('General')
            setType('expense')

            // 2. THIS IS THE MAGIC! Tell App.jsx to instantly fetch the new data
            if (refreshData) {
                refreshData(); 
            }

        } catch (err) {
            console.error("Error saving transaction:", err)
            alert(err.response?.data?.error ||"Failed to save transaction. Please try again.")
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

                    <div className="flex gap-4">
                        {/* Type Dropdown */}
                        <label htmlFor="type" className="form-control w-1/3">
                            <div className="label"><span className="label-text font-semibold">Type</span></div>
                            <select id="type" className="select select-bordered w-full focus:select-primary"
                                value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>
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
                    </div>

                    {/* NEW: Category Dropdown */}
                    <label htmlFor="category" className="form-control w-full">
                        <div className="label"><span className="label-text font-semibold">Category</span></div>
                        <select id="category" className="select select-bordered w-full focus:select-primary"
                            value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="General">General</option>
                            <option value="Salary">Salary</option>
                            <option value="Food & Dining">Food & Dining</option>
                            <option value="Rent & Utilities">Rent & Utilities</option>
                            <option value="Investments">Investments</option>
                            <option value="Entertainment">Entertainment</option>
                        </select>
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