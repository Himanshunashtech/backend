import express, { Router } from "express"
import { createcontent, deletecontent, showcontent, updateContent } from "../controllers/contentmanagementContoller.js"
const contentuploader = Router()


contentuploader.get("/show",showcontent)
contentuploader.post("/upload",createcontent)
contentuploader.post("/update",updateContent)
contentuploader.delete("/delete/:id",deletecontent)

export default contentuploader