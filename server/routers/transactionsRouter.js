import express from "express"

import transactions from "../schemas/transactions.js"

import { authenticate, authorizeRoles } from "../middleware/authMiddleware.js"

const router = express.Router()

router.use(authenticate) // Apply authentication to all routes in this router

// --------------------------------------------------------
// GET route for Dashboard Summary (Zorvyn Requirement #3)
// Allowed Roles: Analysts and Admins
// --------------------------------------------------------
router.get("/summary", authorizeRoles('analyst', 'admin'), async (req, res) => {
    try {
        // 1. Pipeline for Total Income and Total Expense
        const totalsPipeline = [
            {
                $group: {
                    _id: "$type", // Groups all records by 'income' or 'expense'
                    totalAmount: { $sum: "$amount" } // Adds up the amounts
                }
            }
        ];
        const totals = await transactions.aggregate(totalsPipeline);

        // 2. Pipeline for Category-wise expenses (Requirement #3)
        const categoryPipeline = [
            { $match: { type: "expense" } }, // Filter: Only look at expenses
            {
                $group: {
                    _id: "$category", // Group by the category (e.g., Food, Rent)
                    totalAmount: { $sum: "$amount" }
                }
            },
            { $sort: { totalAmount: 1 } } // Sort them
        ];
        const categoryTotals = await transactions.aggregate(categoryPipeline);

        // 3. Format the data cleanly for the frontend
        let income = 0;
        let expense = 0;

        totals.forEach(item => {
            if (item._id === 'income') income = item.totalAmount;
            if (item._id === 'expense') expense = item.totalAmount;
        });

        // Calculate Net Balance 
        // (Since your expenses are stored as negative numbers, we add them: 12000 + (-400) = 11600)
        const netBalance = income + expense;

        return res.status(200).json({
            success: true,
            data: {
                overview: {
                    totalIncome: income,
                    totalExpense: Math.abs(expense), // Send absolute value for clean UI display
                    netBalance: netBalance
                },
                categoryBreakdown: categoryTotals
            }
        });

    } catch (error) {
        console.log("Aggregation Error:", error);
        return res.status(500).json({ success: false, error: "Failed to generate dashboard summary." });
    }
})

// GET: Viewers, Analysts, and Admins can view transactions
router.get("/", authorizeRoles('viewer', 'analyst', 'admin'), async (req, res) => {
    try {
        const allTransactions = await transactions.find().sort({ createdAt: -1 }); // Sort newest first
        return res.status(200).json({ success: true, data: allTransactions });
    } catch (error) {
        // return res.status(500).json({ success: false, error: "Server Error" })
        console.log("Database Error:", error); 
        return res.status(500).json({ 
            success: false, 
            error: error.message 
        })
    }
})

// POST: ONLY Admins can create new transactions
router.post("/", authorizeRoles('admin'), async (req, res) => {
    try {
        // Now expecting category from frontend
        const { text, amount, type, category } = req.body;

        // Requirement 5: Validation
        if (!text || !amount || !type || !category) {
            return res.status(400).json({ success: false, error: 'Please provide all required fields.' });
        }

        const newTransaction = await transactions.create({ text, amount, type, category });
        
        return res.status(201).json({ success: true, data: newTransaction });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
})

// // GET route to fetch all transactions
// // Note: We use '/' here because we mount it as '/api/transactions' in server.js
// router.get("/", async (req, res) => {
//     try {
//         // Find all transactions in the database
//         const allTransactions = await transactions.find();
        
//         return res.status(200).json(
//             {
//                 success: true,
//                 data: allTransactions
//             }
//         )
//     } catch (error) {
//         return res.status(500).json(
//             { 
//                 success: false, 
//                 error: error.message 
//             }
//         )
//     }
// })

// // POST route to add a transaction
// // Note: We use '/' here because we mount it as '/api/transactions' in server.js
// router.post(
//     "/", async (req, res) => {
//         try {

//             // 1. Extract the data based on your NEW schema
//             const { text, amount, type } = req.body

//             // 2. Create a new transaction in the database
//             const newTransaction = await transactions.create(
//                 { text, amount, type }
//             )

//             // 3. Send back a success response with the new transaction
//             return res.status(201).json({
//                 success: true,
//                 data: newTransaction
//             })

//         } catch (error) {
//             res.status(400).json(
//                 { 
//                     error: error.message,
//                     success: false
//                 }
//             )
//         }
//     }
// )

export default router