import express from "express";
import { GoogleAuth, Logout } from "../controllers/auth.controlllers.js";

const router = express.Router();

router.post("/logout", Logout);
router.post("/google",GoogleAuth)

export default router;
