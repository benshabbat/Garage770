import express from "express";
import {
    updateUser,
    deleteUser,
    getUser,
    getUsers,
  } from "../controllers/user.js";
const router = express.Router();
import { verifyAdmin, verifyToken,verifyUser } from "../utils/verifyToken.js";
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

//UPDATE
router.put("/:id",verifyUser, updateUser);
//DELETE
router.delete("/:id",verifyUser, deleteUser);
//GET
router.get("/:id",verifyUser, getUser);
//GET ALL
router.get("/",verifyAdmin, getUsers);

export default router