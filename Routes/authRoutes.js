const express=require("express");
const {signUp,login,refreshAccessToken,logout}=require("../Controllers/AuthController");

const router=express.Router();

router.post("/signUp",signUp);
router.post("/login",login);
router.post("/refresh-token",refreshAccessToken);
router.post("/logout",logout);

module.exports=router;