import jwt from "jsonwebtoken";

export const verifytoken=async(req,res,next)=>{
    try{
        let token=req.header("authorization");

        if(!token){
            return res.status(403).send("acces denied");
        }

        if(token.startsWith("bearer ")){
            token=token.slice(7,token.length).trimLeft();
        }

        const verified=jwt.verify(token,process.env.JWT_SECRET);
        req.user=verified;
        next();

    }catch(err){
        res.status(500).json({error:err.message})
    }
}