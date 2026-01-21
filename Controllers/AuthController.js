const ApiResponse=require("../Utils/ApiResponse");
const ApiError=require("../Utils/ApiError");
const user=require("../Models/user.model");
const asyncHandler = require("../Utils/asyncHandler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateAccessToken,generateRefreshToken } = require("../Utils/token");


const signUp=asyncHandler(async(req,res,next)=>{

    const {name,email,password} = req.body;

    let isExist=await user.findOne({email});

    const hashpass= await bcrypt.hash(password, 2);

    if(isExist){
       return res.status(409)
                 .json(new ApiError("User already Exist",409,"Email Already Exist"));
    }

    
    const createdUser = await user.create({ name, email, password:hashpass });
  
    if(!createdUser){
       return res.status(500)
                 .json(new ApiError("Account Not Created",500,"Internal Server Error"));
        
    }

    return res.status(201)
              .json(new ApiResponse("Account Created Successfully",201,createdUser));
});


const login = asyncHandler(async (req, res ,next) => {
  const { email, password } = req.body;

  const userExist = await user.findOne({ email });

  if (!userExist) {
    return res.status(404)
              .json( new ApiError("Invalid email or password",404,"Authentication failed"));
  }

  if (!bcrypt.compare(password, userExist.password)) {
    return res.status(401)
              .json(new ApiError("Invalid email or password",401,"Authentication failed"));
  }

  const AccessToken = generateAccessToken(userExist._id);
  const RefreshToken = generateRefreshToken(userExist._id);

  

  userExist.refreshToken = RefreshToken;
  await userExist.save();

  res.cookie("accessToken", AccessToken, {
  httpOnly: true,
  sameSite: "none",
  secure: true, 
  maxAge: 15 * 60 * 1000, 
});

res.cookie("refreshToken", RefreshToken, {
  httpOnly: true,
  sameSite: "none",
  secure: true,
  maxAge: 7 * 24 * 60 * 60 * 1000, 
});

  return res.status(200)
            .cookie()
            .json(new ApiResponse("Logged in successfully",200, {_id: userExist._id,name: userExist.name,email: userExist.email}));
});


const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json(
      new ApiError("Refresh token not found", 401, "Authentication failed")
    );
  }

  const decoded = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const userExist = await user.findById(decoded.userId);

  if (!userExist || userExist.refreshToken !== refreshToken) {
    return res.status(401).json(
      new ApiError("Invalid refresh token", 401, "Authentication failed")
    );
  }

  const newAccessToken = generateAccessToken(userExist._id);

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 15 * 60 * 1000,
  });

  return res.status(200)
            .json(new ApiResponse("User Verified Successfully",200));
});


const logout = asyncHandler(async (req,res)=>{
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return res.status(200)
            .json(new ApiResponse("Logout Successfull",200));
});

module.exports = {
    signUp,
    login,
    refreshAccessToken,
    logout
}
