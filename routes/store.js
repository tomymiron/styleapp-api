import { getStore } from "../controllers/store.js";
import express from "express";

const router = express.Router();

router.get("/", getStore);


export default router;