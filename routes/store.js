import { getStore, getStoreBooking } from "../controllers/store.js";
import express from "express";

const router = express.Router();

router.get("/", getStore);
router.get("/booking", getStoreBooking)


export default router;