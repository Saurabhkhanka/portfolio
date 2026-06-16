import mongoose from "mongoose"
import clientModel from "../models/clientModel.js"

export const clientController = async (req, res) => {
    try {
        const { name, email, message } = req.body
        // validation
        if (!name) return res.status(400).send({ success: false, message: 'name required' })
        if (!email) return res.status(400).send({ success: false, message: 'email required' })
        if (!message) return res.status(400).send({ success: false, message: 'message required' })

        const userId = req.user.userId;

        // save
        const clientInfo = await new clientModel({ userId, email, name, message }).save()

        res.status(201).send({
            success:true,
            message:'Your request has been posted',
            clientInfo:{
                name:clientInfo.name,
                message:clientInfo.message
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'server error',
        })
    }
}

export const clientInfoController = async (req, res)=>{
    try {
    const messages = await clientModel.find({}).populate("userId", "name email role").sort({ createdAt: -1 }); // latest first
    res.status(200).send({
        success:true,
        message:"Messages List",
        messages
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

export const deleteClientInfoController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid message ID" });
        }
        const message = await clientModel.findByIdAndDelete(id);
        if (!message) {
            return res.status(404).json({ success: false, message: "Message not found" });
        }
        return res.status(200).json({
            success: true,
            message: "Message deleted successfully"
        });
    } catch (error) {
        console.error("Error in deleteClientInfoController:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while deleting message"
        });
    }
};

export const clearAllClientInfoController = async (req, res) => {
    try {
        await clientModel.deleteMany({});
        return res.status(200).json({
            success: true,
            message: "All messages cleared successfully"
        });
    } catch (error) {
        console.error("Error in clearAllClientInfoController:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while clearing messages"
        });
    }
};