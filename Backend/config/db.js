import mongoose, { connect } from "mongoose"
export const connectDb=async()=>{
    connect(process.env.MONGO_URI);
    console.log("Database connected successfully")
}
