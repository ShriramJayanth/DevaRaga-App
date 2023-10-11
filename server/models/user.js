import mongoose from "mongoose";
const Userschema= new mongoose.Schema({
    firstname:{
        type:String,
        require:true,
        min:2,
        max:50,
    },
    lastname:{
        type:String,
        require:true,
        min:2,
        max:50,
    },
    email:{
        type:String,
        require:true,
        min:2,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:5,
    },
    picturepath:{
        type:String,
        default:"",
    },
    friends:{
        type:Array,
        default:[],
    },
    location:String,
    occupation:String,
    musicalprofession:String,
    viewedprofile:Number,
    impressions:Number,

},
{timestamps:true}
);

const User=mongoose.model("User",Userschema);
export default User;