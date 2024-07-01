import { Gallery } from "../models/galleryModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadtAtCloudinary } from "../utils/cloudinary.js";



const uploadMedia = asyncHandler(async (req, res) => {
    const { mediaId, creatorId, type, mediaLink } = req.body
    if (!mediaId || !creatorId || !type) {
        return res.status(400).json({ success: false, message: "Please provide all the required fields" })
    }
    const imageLocalFilePath = req.files?.imageFile[0]?.path;

    if (!imageLocalFilePath) {
        return res.status(400).json({ sucess: false, error: "image not found" });
    }
    try {
        const imageFiles = await uploadtAtCloudinary(imageLocalFilePath);
        const gallery = await Gallery.create({ mediaId, mediaLink, creatorId, type, imageFile: imageFiles })
        res.status(201).json({ sucess: true, message: "new file uploaded", gallery })
    } catch (error) {

        console.error("Error:", error);
        return res.status(500).json({ sucess: false, error: "Internal server error" });
    }


})

const deleteitem = asyncHandler(async (req, res) => {
   try {
     const id = req.params.id
     const item = await Gallery.findByIdAndDelete(id)
     if (!item) {
         return res.status(404).json({ sucess: false, error: "item not found" });
     }
     return res.status(200).json({ sucess: true, message: "item deleted successfully" });
 
 
 
   } catch (error) {
    console.error("Error:", error);
        return res.status(500).json({ sucess: false, error: "Internal server error" });
   }
})

const updatemedialink = asyncHandler(async () => {
   try {
     const { id, mediaLink } = req.body
     const item = await Gallery.findByIdAndUpdate(id, { mediaLink })
     if (!item) {
         return res.status(404).json({
             sucess: false, error: "item not found"
         });
     }
     return res.status(200).json({
         sucess: true, message: "item updated successfully"
     });
   } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ sucess: false, error: "Internal server error" });
   }
})













export { uploadMedia, deleteitem ,updatemedialink}