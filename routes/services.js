import express from "express";
import {
    createService

  } from "../controllers/service.js";
  import { verifyAdmin, verifyToken,verifyUser } from "../utils/verifyToken.js";
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
router.post("/:carId",verifyAdmin,createService);

//UPDATE
router.put("/:id",verifyAdmin, updateCar);
//DELETE
router.delete("/:id/:userId",verifyAdmin, deleteCar);
//GET
router.get("/:id",verifyUser, getCar);
//GET ALL
router.get("//",verifyAdmin, getCarsWithOwner);
router.get("/",verifyAdmin, getCars);


export default router