import express from "express";
import {
    createMessage,
    updateMessage,
    deleteMessage,
    getMessage,
    getMessages

} from "../controllers/message.js";
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

// //GET ALL BY POPULATE
// router.get("/populate", verifyAdmin, getServicesByType);
//CREATE
router.post("/:from/:to", createMessage);
//UPDATE
router.put("/:idMessage", verifyUser, updateMessage);
//DELETE
router.delete("/:id", verifyUser, deleteMessage);
//GET
router.get("/:id", verifyUser, getMessage);
//GET ALL
router.get("/", verifyAdmin, getMessages);

export default router;
