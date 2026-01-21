const express=require("express");
const {addTodo,removeTodo,updateTodo,getAllTodo,updateStatus} = require("../Controllers/TodoController");
const verifyAuth=require("../middlewares/verifyAuth")
const router=express.Router();

router.post("/addTodo",verifyAuth,addTodo);
router.put("/updateTodo",verifyAuth,updateTodo);
router.delete("/removeTodo/:_id",verifyAuth,removeTodo);
router.get("/getAllTodo",verifyAuth,getAllTodo);
router.put("/updateStatus/:_id",verifyAuth,updateStatus);

module.exports = router;
