import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import activityLogModel from "../models/activityLogModel.js";


export const getActivityLogsController = async (req, res) => {
    try {
        const logs = await activityLogModel.find({}).sort({ createdAt: -1 }).limit(50);
        return res.status(200).json({
            success: true,
            logs
        });
    } catch (error) {
        console.error("Error in getActivityLogsController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while fetching activity logs"
        });
    }
};

export const getUsersController = async (req, res) => {
    try {
        const users = await userModel.find({}).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        console.error("Error in getUsersController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while fetching users list"
        });
    }
};

export const deleteActivityLogController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid log ID" });
        }
        const log = await activityLogModel.findByIdAndDelete(id);
        if (!log) {
            return res.status(404).json({ success: false, message: "Log not found" });
        }
        return res.status(200).json({
            success: true,
            message: "Activity log deleted successfully"
        });
    } catch (error) {
        console.error("Error in deleteActivityLogController:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while deleting log entry"
        });
    }
};

export const clearAllActivityLogsController = async (req, res) => {
    try {
        await activityLogModel.deleteMany({});
        return res.status(200).json({
            success: true,
            message: "All activity logs cleared successfully"
        });
    } catch (error) {
        console.error("Error in clearAllActivityLogsController:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while clearing activity logs"
        });
    }
};
