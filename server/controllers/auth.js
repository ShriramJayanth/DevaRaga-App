import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

/*register user*/
export const register=async(req,res)=>{
    try{
        const {
            firstname,
            lastname,
            email,
            password,
            picturepath,
            friends,
            location,
            occupation
        }=req.body;

        const salt=await bcrypt.genSalt();
        const passw=await bcrypt.hash(password,salt);

        const newuser= new User({
            firstname,
            lastname,
            email,
            password:passw,
            picturepath,
            friends,
            location,
            occupation,
            viewedprofile:Math.floor(Math.random()*10000),
            impressions:Math.floor(Math.random()*10000)
            
        });
        const saveduser=await newuser.save();
        res.status(201).json(saveduser);
    }catch(err){
        res.satus(500).json({error:err.message});
    }
};

/*log in*/
export const login=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email:email});
        if(!user) return res.status(400).json({msg:"user does not exist"});

        const ismatch =await bcrypt.compare(password,user.password);
        if(!ismatch)return res.status(400).join({msg:"Invalid creds"});
        
        const token =jwt.sign({id:user._id},process.env.JWT_SECRET);
        delete user.password;
        res.staus(200).json({token,user});
    }catch(err){
        res.status(500).json({err:err.message});
    }
}