import express from "express";
import {
    updateReview,
    deleteReview,
    getReview,
    getReviews,
    createReview,
  } from "../controllers/review.js";
  import { verifyAdmin, verifyToken,verifyUser } from "../utils/verifyToken.js";
  const router = express.Router();

//GET ALL
router.get("/",verifyAdmin, getReviews);
//CREATE
router.post("/:userId",verifyAdmin,createReview);
//UPDATE
router.put("/:id",verifyAdmin, updateReview);
//DELETE
router.delete("/:id/:userId",verifyAdmin, deleteReview);
//GET
router.get("/:id",verifyUser, getReview);
