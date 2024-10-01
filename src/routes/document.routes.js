import express from "express"
import {viewFile,viewSingleFile,createFile,deleteFile,editFile} from "../controllers/document.controllers.js"
import { protectRoute } from "../middlewares/protectRoute.js"

const router=express.Router()

router.get("/view",protectRoute,viewFile)
router.get("/view/:id",protectRoute,viewSingleFile)
router.post("/create/:title",protectRoute,createFile)
router.delete("/file/:id",protectRoute,deleteFile)
router.post("/file/:id",protectRoute,editFile)

export default router