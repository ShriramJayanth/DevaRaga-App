import  express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import {register} from "./controllers/auth.js";
import {createPost} from "./controllers/posts.js";
import { verifytoken } from "./middleware/auth.js";
import User from "./models/user.js";
import Post from "./models/post.js";
import {users,posts} from "./data/index.js";


/*config*/
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
dotenv.config();
const app=express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use("/assets",express.static(path.join(__dirname,"public/assets")));

/*file storage*/
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/assets");
    },
    filename:function(req,file,cb){
        cd(null,file.originalname);
    }
});
const upload=multer({storage});

/*ROUTES WITH FILES*/
app.post("/auth/register",upload.single("picture"),verifytoken, register);
app.post("/posts",verifytoken,upload.single("picture"),createPost);

/*Routes*/
app.use("/auth",authRoutes);
app.use("/users",userRoutes);
app.use("/posts",postRoutes);
/*mongoose setup*/
const PORT=3003||6001;
mongoose.connect("mongodb+srv://sriram6132:APPLE@cluster0.s8r7sno.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(PORT,()=>console.log(`Server Port: ${PORT}`));
    // User.insertMany(users);
    // Post.insertMany(posts);
}) 
.catch((error)=>console.log(`${error} did not connect`));

