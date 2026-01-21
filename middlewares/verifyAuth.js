const jwt = require("jsonwebtoken");
const asyncHandler=require("../Utils/asyncHandler");
const ApiError=require("../Utils/ApiError")

const verifyAuth=asyncHandler(async(req,res,next)=>{

    
    const token = req.cookies.accessToken;
   
    if(!token){
       return res.status(401)
                 .json(new ApiError("User Not Autherized",401,"Authentication Failed"));
    }

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
      if(err){
       return res.status(401)
                 .json(new ApiError("Verification Failed",401,err.name));
      }

       req.user = decoded;
    })

    next();

})

module.exports = verifyAuth;