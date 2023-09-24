import Post from "../models/post.js";
import User from "../models/user.js";

/*create*/
export const createPost=async(req,res)=>{
    try{
      const{userID,description,pictuePath}=req.body;
      const user=await User.findById(userID);
      const newPost=new Post({
        userID,
        firstName:user.firstName,
        lastName:user.lastName,
        location:user.location,
        description,
        userPicturePath:user.picturePath,
        pictuePath,
        likes:{},
        comments:[]
      })
      await newPost.save();
      const post =await Post.find();
      res.status(201).json(post);
    }catch(err){
        res.status(409).json({message:err.message})
    }
}

/*read*/
export const getFeedPosts=async(req,res)=>{
    try{
        const post=await Post.find();
        res.status(200).json(post);

    }catch(err){
        res.status(404).json({message:err.message})
    }
}

export const getUserPosts=async(req,res)=>{
    try{
        const {userID}=req.params;
        const post=await post.find({userID});
        res.status(200).json(post);
    }catch(err){
        res.status(404).json({message:err.message})

    }
}

/*update*/
export const likePost= async(req,res)=>{
    try{
        const{id}=req.params;
        const {userID}=req.body;
        const post=await Post.findById(id);
        const isLiked=post.likes.get(userID);

        if(isLiked){
            post.likes.delete(userID);
        }
        else{
            post.likes.set(userId,true);
        }
        const updatedPost=await Post.findByIdAndUpdate(
            id,
            {likes:post,likes},
            {new:true}
        );
        res.status(200).json();
    }catch(err){
        res.status(404).json({message:err.message})
    }
}