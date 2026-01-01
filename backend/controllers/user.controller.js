
import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
// import cookie from 'cookie-parser';


//Register logic creating user 
export const register= async(req,res)=>{
    try{
        const{fullName,email,phoneNumber,password,role}=req.body // body se ye sb mujhe de do aisa keh rha 
        if(!fullName || !email || !password || !role){
            return res.status(400).json({
                message:"Something is missing ",
                success:false
            });

        };
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:'user already exist with this email',
                success:false
            })
        };
        //Creating User with hashing our password
        const hashedPassword=await bcrypt.hash(password,10);
        await User.create({
            fullName,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
        })
        return res.status(201).json({
            message:"Account created successfully",
            success:true
        });

    }catch(error){
        console.log(error);

    }
}
 //Loging user with his credentials 
export const login=async (req,res)=>{
    try{
        const {email,password,role}=req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message:'Something is missing ',
                success:false
            })
        };
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:'incorrect email or password',
                success:false,
            })
        }
        const isPasswordMatch=await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:'incorrect email or password',
                success:false,
            })            
        };
        if(role !== user.role){
            return res.status(400).json({
                message:"Account doesn't exist with current role",
                message:false
            })
        };

        const tokenData={
            userId:user._id,
            fullName:user.fullName,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }
        //creating json webtoken for authentication for accesign data to the right people 
        const token=await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'})
        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpsOnly:true,sameSite:'strict'}).json({

            message:`welcome back ${user.fullName}`,
            user,
            success:true,
        })

    }
    catch(error){
        console.log(error);
    }
}
//logout
export const logout=async(req,res)=>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"logged out successfully",
            success:true
        })
    }catch(error){
        console.log(error)
    }
}
//updating the profile details 
export const updateProfile=async (req,res)=>{
    try{
        const {fullName,email,phoneNumber,bio,skills}=req.body;
        let skillsArray;
        if(skills){
            skillsArray=skills.split(",");
        }
        const userId=req.id;
        let user=await User.findById(userId);
        if(!user){
            return res.status(400).json({
              message:"User not Found",
              success:false,  
            })
        }
        if(fullName) user.fullName=fullName
        if(email) user.email=email
        if(phoneNumber) user.phoneNumber=phoneNumber
        if(bio) user.bio=bio
        if (skills) user.profile.skills=skillsArray
        await user.save();

        user={
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }
        return res.status(200).json({
            message:"Profile updated Successfully",
            user,
            success:true,
        })
    }
    catch(error){
        console.log(error);
    }
}