import { Box } from "@mui/material";

const UserImage=({image,size="60px"})=>{
    return(
        <Box wisth={size} height={size}>
            <img
             style={{objectFit:"cover",borderRadius:"50%"}}
             width={size}
             height={size}
             alt="user"
             src={`http://localhost:3003/assets/${image}`}
             />
        </Box>
    )
};

export default UserImage;