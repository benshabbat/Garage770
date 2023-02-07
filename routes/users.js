import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  createUser,
  getUsersWithCars,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();
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
router.post("/create", createUser);

//UPDATE
router.put("/:id", verifyAdmin, updateUser);
//DELETE
router.delete("/:id", verifyAdmin, deleteUser);
//GET
router.get("/:id", verifyUser, getUser);
//GET ALL
router.get("/populate/cars", verifyAdmin, getUsersWithCars);
router.get("/", verifyAdmin, getUsers);

export default router;
