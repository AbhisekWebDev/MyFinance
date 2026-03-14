import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

// Import the routes file created
import transactionsRouter from './routers/transactionsRouter.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

// Middleware (Must come BEFORE routes)
app.use(cors())
app.use(express.json())

// This tells the server "When someone goes to /api/v1/transactions, use the logic in that file"
app.use('/api/transactions', transactionsRouter)

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("DB Connection Error:", err))

// Routes
app.get('/', (req, res) => 
    {
        res.send('Hi, server is running on port ' + process.env.PORT)
    }
)

// Start Server (Always at the bottom)
app.listen(PORT, () => 
    {
        console.log(`Server is running on port: ${PORT}`)
    }
)