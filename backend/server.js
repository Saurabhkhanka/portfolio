import express, { json } from "express"
import dotenv from 'dotenv'
import connectDB from "./db.js"
import router from './routes/clientRoute.js'
import cors from 'cors'
dotenv.config()
connectDB()
const PORT = process.env.PORT || 3600
const app = express()

app.use(cors({
  origin: '*', // Or restrict to 'http://192.168.1.X:5173'
}));
app.use(express.json())

app.use('/api/v1/auth', router)
app.listen(PORT, ()=>{
    console.log(`your portfolio server is running on port number ${PORT}`);
})