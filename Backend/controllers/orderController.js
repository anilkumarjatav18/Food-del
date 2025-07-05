import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js'
import Stripe from 'stripe'
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);


// placing user order for frontend
export const placeOrder =async(req,res)=>{
    const frontend_url ="http://localhost:5173" //variable for frontend url
    try{ // create new order
       const newOrder= new orderModel({
        userId:req.body.userId,
        items:req.body.items,
        amount:req.body.amount,
        address:req.body.address
       })  // save the order in the url
       await newOrder.save();
       await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})
       //neccessary for stripes
       const line_items=req.body.items.map((item)=>({
              price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*80
              },
              quantity:item.qauntity
       }))
       line_items.push({
        price_data:{
              currency:"inr",
              product_data:{
                name:"Delivery Charges"
              },
              unit_amount:2*100*80
        },
        quantity:1
       })
       const session =await stripe.checkout.sessions.create({
        line_items:line_items,
        mode:'payment',
        success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
       })
       res.json({success:true,session_url:session.url})
    }catch(error){
         console.log(error.message);
         res.json({success:false,message:"Error"})
    }
}
export const verifyOrder= async(req,res)=>{
 const {oredrId,success}=req.body
 try {
  if(success=="true"){
    await orderModel.findByIdAndUpdate(oredrId,{payment:true})
    res.json({success:true,message:"Paid"})
  }else{
    await orderModel.findByIdAndDelete(oredrId);
    res.json({success:false,message:"Not Paid"})
  }
 } catch (error) {
  console.log(error)
  res.json({success:false,message:Error})
 }
}
//user Order for Frontend
export const userOrder=async(req,res)=>{
   try {
    const orders=await orderModel.find({userId:req.body.userId})
    res.json({success:true,data:orders})
   } catch (error) {
    console.log(error)
    res.json({success:false,message:"Errors"})
   }
} 
//Listing order for admin panel
 export const listOrder=async(req,res)=>{
     try {
      const orders=await orderModel.find({});
      res.json({success:true,data:orders})
     } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"})
     }
}
// update order Status
export const updateStatus=async(req,res)=>{
       try {
        const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });

        res.json({success:true,message:"Status Updated"})
        
       } catch (error) {
        res.json({success:false,message:'Error'})
       }
}

