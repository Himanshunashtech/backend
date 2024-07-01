import { Router } from "express"
const fileuploader = Router()
import { upload } from "../middlewares/multer.js"

import {   updateTitle, videohandler,imagehandler, deleteitem, show } from "../controllers/galleryController.js"
import { updatemedialink, uploadMedia } from "../controllers/pressmanagementController.js"



fileuploader.post("/uploadvideo", upload.fields([
    {
        name: "videoFile",
        maxCount: 1
    }]), videohandler
)
fileuploader.post("/uploadimage", upload.fields([
    {
        name: "imageFile",
        maxCount: 1
    }]),imagehandler
)
fileuploader.get("/show",show)
fileuploader.post("/uploadmedia",uploadMedia)
fileuploader.delete("/media/delete/:id",deleteitem)
fileuploader.put("/media/update/:id",updatemedialink)
fileuploader.post("/updatetitle/:id",updateTitle)
fileuploader.delete("/delete/:id",deleteitem)


export default fileuploader