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