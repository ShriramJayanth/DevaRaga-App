import express from "express";
import {getFeedPosts,getUserPosts,likePost} from "../controllers/posts.js";
import { verifytoken } from "../middleware/auth.js";

const router =express.Router();

/*read*/
router.get("/",verifytoken,getfeedposts);
router.get("/:userid/posts",verifytoken,getuserposts);

/*update*/
router.patch("/:id?like",verifytoken,likeposts);

export default router;