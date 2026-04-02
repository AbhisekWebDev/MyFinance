import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema(
    {
        text : {
            type: String,
            required : [true, 'Please add some text'], // e.g., "Salary" or "Coffee"
            trim : true
        },

        amount : {
            type : Number,
            required : [true, 'Please add a positive or negative number']
        },

        // This is the secret sauce: We use a "type" to tell them apart
        type : {
            type : String,
            enum : ['income', 'expense'], // Restricts value to ONLY these two
            required : true
        },

        category: {
            type: String,
            required: [true, 'Please specify a category'],
            default: 'General'
        },

        // Automatically track when this happened
        createdAt : {
            type : Date,
            default : Date.now
        }
    }
)

export default mongoose.model('Transaction', transactionSchema)