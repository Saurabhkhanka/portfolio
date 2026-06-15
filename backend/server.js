import express from "express"
import dotenv from 'dotenv'
import connectDB from "./db.js"
import router from './routes/clientRoute.js'
import authRouter from './routes/authRoute.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()
connectDB()
const PORT = process.env.PORT || 3600
const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(cookieParser())
app.use(express.json())

app.use('/api/v1/auth', router)
app.use('/api/v1/auth', authRouter)

app.listen(PORT, ()=>{
    console.log(`your portfolio server is running on port number ${PORT}`);
})