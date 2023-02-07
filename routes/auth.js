import express from "express";
import { register,login } from "../controllers/auth.js";
import { verifyAdmin, verifyToken,verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/register",verifyAdmin,register );
router.post("/login",login );

export default router