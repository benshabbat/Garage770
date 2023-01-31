import express from "express";
import {
    updateCar,
    deleteCar,
    getCar,
    getCars,
    createCar
  } from "../controllers/car.js";
  const router = express.Router();
  /*
  import { verifyAdmin, verifyToken,verifyUser } from "../utils/verifyToken.js";
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
router.post("/create",createCar);

//UPDATE
router.put("/:id", updateCar);
//DELETE
router.delete("/:id", deleteCar);
//GET
router.get("/:id", getCar);
//GET ALL
router.get("/", getCars);

export default router