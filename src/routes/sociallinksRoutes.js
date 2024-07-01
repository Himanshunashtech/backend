import express, { Router } from "express"
import { addlinks, deletelinks, showlinks, updatelinks } from "../controllers/sociallinksController.js"
const uploadlinks = Router()

uploadlinks.get("/show",showlinks)
uploadlinks.post("/add",addlinks)
uploadlinks.post("/update/:id",updatelinks)
uploadlinks.delete("/delete/:id",deletelinks)

export default uploadlinks

