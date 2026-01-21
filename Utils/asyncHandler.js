const asyncHandler =(fn)=> async (req,res,next)=>{
    try{
       return await fn(req,res,next);
    } catch (error){
        res.status(error.code || 500).json({
            sucess:false,
            message:"Internal Server Error"
        })
    }
}

module.exports = asyncHandler;
