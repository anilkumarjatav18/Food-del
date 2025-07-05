import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


//Login user
const loginUser= async (req,res)=>{
    const {email,password}=req.body;
     try {
        const user=await userModel.findOne({email});
        if(!user){
           return  res.json({success:false,message:"user Doesnot Exist"})
        }
        const isMatch =await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"Enter correct password"})
        }
        const token=createToken(user._id);
        res.json({success:true,token});
     } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
     }
}

//register User

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
const registerUser=async(req,res)=>{
      const {name,password,email}=req.body;
      try {
        const exists=await userModel.findOne({email});
        //checking the user exist or not
        if(exists){
            return res.json({success:false,message:"user Already exist"})
        }

        //validating email and password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"please enter valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"please enter  a strong password"})
        }
        //hashing user password
        const salt =await bcrypt.genSalt(10)
        const hashedPassword =await bcrypt.hash(password,salt);
        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

       const user= await newUser.save()
       const token=createToken(user._id)
       res.json({success:true,token})
      } catch (error) {
          console.log(error)
          res.json({success:true,message:"error"})
      }
}
export{loginUser,registerUser}