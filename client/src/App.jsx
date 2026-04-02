import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import Form from './components/Form'
import ExpenseIncomeTable from './components/ExpenseIncomeTable'
import axios from 'axios'

import CategoryChart from './components/CategoryCharts'

function App() {

  // 1. Centralized States
  const [transactions, setTransactions] = useState([]);
  // NEW: State for our aggregated summary data
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, netBalance: 0 });

  // 2. Master function to fetch ALL data
  const fetchData = async () => {
    try {
      // Fetch 1: Get the transactions for the table
      const txRes = await axios.get('http://localhost:5000/api/transactions', {
          headers: { 'Authorization': 'token-admin-789' }
      });
      
      // Fetch 2: Get the aggregated summary for the dashboard
      const sumRes = await axios.get('http://localhost:5000/api/transactions/summary', {
          headers: { 'Authorization': 'token-admin-789' }
      });
      
      // Update Transactions State
      const fetchedTx = txRes.data.data || txRes.data;
      setTransactions(Array.isArray(fetchedTx) ? fetchedTx : []);

      // NEW: Update Summary State using the backend's math
      if (sumRes.data.success) {
          setSummary(
            {
              ...sumRes.data.data.overview, // Spread the overview numbers (income, expense)
              categoryBreakdown: sumRes.data.data.categoryBreakdown // explicitly add the array!
            }
          )
      }

    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }

  // 3. Fetch data when app loads
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-10">
            <h1 className="text-5xl font-extrabold text-base-content tracking-tight">
                My Finance <span className="text-primary">Tracker</span>
            </h1>
            <p className="text-base text-base-content/70 mt-3 font-medium">
                Manage your wealth effectively
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            
            <div className="flex flex-col gap-8">
                {/* 4. Pass the 'summary' object to the Dashboard instead of transactions */}
                <Dashboard summary={summary} />

                <CategoryChart categoryData={summary.categoryBreakdown} />
                
                <Form refreshData={fetchData} />
            </div>

            <div className="h-full">
                <ExpenseIncomeTable transactions={transactions} />
            </div>

        </div>
      </div>
    </div>
  )
}

export default App