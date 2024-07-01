
import { Gallery} from "../models/galleryModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadtAtCloudinary } from "../utils/cloudinary.js";




const videohandler = asyncHandler(async (req, res) => {
    const {  tittle,type,creatorId  } = req.body

    if ( !tittle ||!type||!creatorId) {
        return res.status(400).json({sucess:false, message: "Please fill all fields" })
    }

    const videoLocalFilePath = req.files?.videoFile[0]?.path;

    if (!videoLocalFilePath) {
        return res.status(400).json({ sucess:false,error: "video not found" });
    }

    try {
        const videoFiles = await uploadtAtCloudinary(videoLocalFilePath);


        const newVideo = await Gallery.create({
            thumbnail, tittle, videoFile: videoFiles, creatorId,type
        })

        return res.status(201).json({sucess:true, message:"new file uploaded",newVideo})
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ sucess:false, error: "Internal server error" });
    }


})

const imagehandler = asyncHandler(async (req, res) => {
    const {  tittle ,creatorId,type } = req.body

    if ( !tittle||!creatorId||!type ) {
        return res.status(400).json({sucess:false, message: "Please fill all fields" })
    }

    const imageLocalFilePath = req.files?.imageFile[0]?.path;

    if (!imageLocalFilePath) {
        return res.status(400).json({ sucess:false,error: "image not found" });
    }

    try {
        const imageFiles = await uploadtAtCloudinary(imageLocalFilePath);


        const newimage = await Gallery.create({
            thumbnail, tittle, imageFile: imageFiles, creatorId,type
        
        })

        return res.status(201).json({sucess:true, message:"new file uploaded",newimage})
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ sucess:false, error: "Internal server error" });
    }


})





 const show = asyncHandler(async(req,res)=>{
    try {
         const item = await Gallery .find({type})
         if(!item){
            return res.status(400).json({sucess:false, message:"no video found"})
            }
          if(item.type===0){
            return res.status(200).json({sucess:true,message:"videos",item})
          }
          if(item.type===1){
            return res.status(200).json({sucess:true,message:"images",item})
          }
           
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ sucess: false, error: "Internal server error" });
       }
    }
    

      )


const deleteitem = asyncHandler(async (req, res) => {
   try {
     const id = req.params.id
     const item= await Gallery.findByIdAndDelete(id)
     if (!item) {
         return res.status(404).json({sucess:false, error: "item not found" });
     }
     return res.status(200).json({sucess:true, message: "item deleted successfully" });
 
   } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ sucess: false, error: "Internal server error" });
   }


})
     


const updateTitle = asyncHandler(async (req, res) => {
    const id = req.params.id
    const item = await Gallery.findById(id)
    if (!item) {
        return res.status(404).json({sucess:false, error: "item not found" });
    }
    const title = req.body.title
    if (!title) {
        return res.status(400).json({sucess:false ,error: "Please provide title" });
    }
    item.title = title
    await item.save()
    return res.status(200).json({sucess:true, message: "Title updated successfully" });

})




export { videohandler, deleteitem, updateTitle,show,imagehandler }