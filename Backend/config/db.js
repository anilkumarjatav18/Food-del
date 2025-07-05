import mongoose, { connect } from "mongoose"
export const connectDb=async()=>{
    connect("mongodb+srv://anilkumarjatav188:anilkumar12@cluster0.89csj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Database connected successfully")
}