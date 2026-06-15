import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    action: {
        type: String,
        required: true,
        enum: ["login", "logout"]
    },
    ip: {
        type: String,
        default: "unknown"
    },
    userAgent: {
        type: String,
        default: "unknown"
    }
}, { timestamps: true });

export default mongoose.model("activity_logs", activityLogSchema);
