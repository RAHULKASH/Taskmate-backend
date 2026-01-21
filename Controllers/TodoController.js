const todo = require("../Models/todo.model");
const user = require("../Models/user.model");
const ApiError=require("../Utils/ApiError");
const ApiResponse=require("../Utils/ApiResponse");
const asyncHandler=require("../Utils/asyncHandler");


const addTodo = asyncHandler(async(req,res,next) =>{

    const {user,title,description,priority} = req.body;

    if(!user || !title || !description || !priority){
        return res.status(400)
                  .json(new ApiError("Mention all Details",400,"Bad Request"));
    }

    const isAdded=await todo.insertOne({user,title,description,priority});

    if(!isAdded){
        return res.status(500)
                  .json(new ApiError("Internal Server Error",500,"Item Not Added"));
    }

    return res.status(201)
              .json(new ApiResponse("Todo Added",201,isAdded));

});


const removeTodo= asyncHandler(async(req,res,next)=>{
    const _id = req.params._id;
    const user=req.user.userId;

    const isExist=await todo.findOne({_id,user});

    if(!isExist){
        return res.status(404)
                  .json(new ApiError("Todo Not Available",404,"Bad Request"));
    }

    const remove= await todo.deleteOne({_id,user});

    return res.status(200)
              .json(new ApiResponse("Todo Removed",200,remove))

});


const updateTodo=asyncHandler(async(req,res,next)=>{
    
    const {_id,user,title,description,priority} = req.body;

    const isExist=await todo.findOne({_id,user});

    if(!isExist){
        return res.status(404)
                  .json("Todo Not Available",404,"Not found");
    }

    const updated= await todo.updateOne({_id,user},{$set:{title,description,priority}});

    return res.status(200)
              .json(new ApiResponse("Todo Updated Successfully",200,updated))

});


const getAllTodo= asyncHandler(async(req,res,next)=>{
    
    const user = req.user.userId;

    const todos=await todo.find({user});

    if(!todos){
        return res.status(400)
                  .json("Todos Not Available",400,"Bad Request");
    }


    return res.status(200)
              .json(new ApiResponse("Todos List",200,todos));

});

const updateStatus=asyncHandler(async(req,res)=>{

    const _id = req.params._id;
    const user = req.user.userId;

    const isExist=await todo.findOne({_id,user});

    if(!isExist){
        return res.status(404)
                  .json("Todo Not Available",404,"Not found");
    }

    const updated= await todo.updateOne({_id,user},{$set:{completed:true}});

    return res.status(200)
              .json(new ApiResponse("Marked as completed",200,updated))
})


module.exports={
    addTodo,
    removeTodo,
    updateTodo,
    getAllTodo,
    updateStatus
}