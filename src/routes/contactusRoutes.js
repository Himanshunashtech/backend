import { Router } from "express"
import queryMessage from "../controllers/contactusController.js"
const contactUs = Router()


contactUs.post("/contactus",queryMessage)

export default contactUs
