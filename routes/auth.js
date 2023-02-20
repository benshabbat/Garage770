import express from "express";
import { register,login } from "../controllers/auth.js";
import { verifyAdmin} from "../utils/verifyToken.js";
const router = express.Router();

router.post("/register",verifyAdmin,register );
router.post("/login",login );

export default router