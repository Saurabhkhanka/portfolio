import mongoose from "mongoose"
import clientModel from "../models/clientModel.js"

export const clientController = async (req, res) => {
    try {
        const { name, email, message } = req.body
        // validation
        if (!name) return res.send({ message: 'name required' })
        if (!email) return res.send({ message: 'email required' })
        if (!message) return res.send({ message: 'message required' })

        // save
        const clientInfo = await new clientModel({email,name,message}).save()

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
    const messages = await clientModel.find({}); // latest first
    res.status(200).send({
        success:true,
        message:"Messages List",
        messages
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}