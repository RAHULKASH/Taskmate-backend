const mongoose=require("mongoose");

const todoSchema=new mongoose.Schema(
    {
    user:{
        type:mongoose.Schema.Types.ObjectId,
        requried:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    priority:{
        type:String,
        required:true
    },
    completed: {
      type: Boolean,
      default: false, 
    }
    },
    {
        timestamps:true
    }
)

const todo=mongoose.model("todo",todoSchema);

module.exports= todo ;