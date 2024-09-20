import express from "express";
import { Login, Logout, Sighup } from "../controllers/auth.controlllers.js";

const router = express.Router();

router.post("/signup", Sighup);
// router.post("/signup", () => console.log("sighup"));

router.post("/login", Login);
router.post("/logout", Logout);

export default router;
