import { userInfo } from "../controllers/user.js";
import express from "express";

const router = express.Router();

router.get("/info", userInfo);

export default router;
