import { getBookedTimes, getBooks, newBook } from "../controllers/book.js";
import express from "express";

const router = express.Router();

router.post("/", newBook);
router.get("/booked/times", getBookedTimes);
router.get("/books", getBooks);

export default router;