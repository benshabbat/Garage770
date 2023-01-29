import express from "express";
import {
    updateUser,
    deleteUser,
    getUser,
    getUsers,
    createUser
  } from "../controllers/user.js";
const router = express.Router();
//import { verifyAdmin, verifyToken,verifyUser } from "../utils/verifyToken.js";
/*
router.get("/checkauthentication",verifyToken,(req,res,next)=>{
    res.send("logged in")
})
router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
    res.send("hello user logged in :)")
})
router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
    res.send("hello admin logged in :)")
})
*/
//TEST CREATE USER
//CREATE
router.post("/create",createUser);



//UPDATE
router.put("/:id" ,updateUser);
//DELETE
router.delete("/:id",deleteUser);
//GET
router.get("/:id", getUser);
//GET ALL
router.get("/", getUsers);

export default router