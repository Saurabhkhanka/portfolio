import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true,
        trim: true
    }
}, { timestamps: true })

export default mongoose.model('clients', clientSchema)