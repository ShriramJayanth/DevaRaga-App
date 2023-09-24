import mongoose from "mongoose";

const postSchema=mongoose.Schema(
    {
        userID:{
            type:String,
            required:true,
        },
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String,
            required:true,
        },
        location:String,
        description:String,
        picturePath:String,
        userPicturepath:String,
        likes:{
            type:Map,
            of:Boolean,
        },
        comments:{
            types:Array,
            default:[]
        }


    },
    {timestamp:true}
);

const Post=mongoose.model("Post",postSchema);
export default Post;