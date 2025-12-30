import express from "express";
import { createEntry, updateEntry, getTodayEntry, getAllEntries } from "../controllers/entryController.js";
import { protect } from "../middleware/authMiddleware.js";
import { getWeeklySummary } from "../controllers/entryController.js";

const router = express.Router();

router.post("/", protect, createEntry);   // create today's entry
router.put("/", protect, updateEntry); 
router.get("/", protect, getAllEntries)   // update today's entry
router.get("/today", protect, getTodayEntry); // fetch today's entry
router.get("/summary/week", protect, getWeeklySummary);


export default router;
