import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import Form from './components/Form'
import ExpenseIncomeTable from './components/ExpenseIncomeTable'
import axios from 'axios'

function App() {

    // 1. Centralized State
  const [transactions, setTransactions] = useState([])

  // 2. Master function to fetch data
  const fetchTransactions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/transactions')
      const fetchedData = res.data.data || res.data;
      
      if (Array.isArray(fetchedData)) {
          setTransactions(fetchedData);
      } else {
          setTransactions([]);
      }
    } catch (err) {
      console.error("Error fetching transactions:", err)
    }
  }

  // 3. Fetch data when app loads
  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      {/* 1. Changed 'max-w-6xl' to 'max-w-7xl' to fill more of the screen 
         2. 'mx-auto' keeps the whole app perfectly centered
      */}
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10">
            <h1 className="text-5xl font-extrabold text-base-content tracking-tight">
                My Finance <span className="text-primary">Tracker</span>
            </h1>
            <p className="text-base text-base-content/70 mt-3 font-medium">
                Manage your wealth effectively
            </p>
        </div>

        {/* Main Grid Layout 
            - Changed to 'lg:grid-cols-2' for a perfect 50/50 split
            - Increased 'gap-8' to 'gap-10' for better spacing
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            
            {/* LEFT COLUMN: Stats & Input Form */}
            <div className="flex flex-col gap-8">
                {/* Stats Section */}
                <Dashboard transactions={transactions} />
                
                {/* Form Section */}
                <Form refreshData={fetchTransactions} />
            </div>

            {/* RIGHT COLUMN: Transaction History Table */}
            {/* 'h-full' ensures this column uses available vertical space */}
            <div className="h-full">
                <ExpenseIncomeTable transactions={transactions} />
            </div>

        </div>

      </div>
    </div>
  )
}

export default App