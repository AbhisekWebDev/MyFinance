// schemas/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['viewer', 'analyst', 'admin'], // Zorvyn's exact requirement
        default: 'viewer'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);