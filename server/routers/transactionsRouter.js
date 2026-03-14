import express from "express"

import transactions from "../schemas/transactions.js"

const router = express.Router()

// GET route to fetch all transactions
// Note: We use '/' here because we mount it as '/api/transactions' in server.js
router.get("/", async (req, res) => {
    try {
        // Find all transactions in the database
        const allTransactions = await transactions.find();
        
        return res.status(200).json(
            {
                success: true,
                data: allTransactions
            }
        )
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                error: error.message 
            }
        )
    }
})

// POST route to add a transaction
// Note: We use '/' here because we mount it as '/api/transactions' in server.js
router.post(
    "/", async (req, res) => {
        try {

            // 1. Extract the data based on your NEW schema
            const { text, amount, type } = req.body

            // 2. Create a new transaction in the database
            const newTransaction = await transactions.create(
                { text, amount, type }
            )

            // 3. Send back a success response with the new transaction
            return res.status(201).json({
                success: true,
                data: newTransaction
            })

        } catch (error) {
            res.status(400).json(
                { 
                    error: error.message,
                    success: false
                }
            )
        }
    }
)

export default router