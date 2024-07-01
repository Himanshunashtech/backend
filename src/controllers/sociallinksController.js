import SocialLinks from "../models/sociallinksModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addlinks= asyncHandler(async(req,res)=>{
   try {
     const{title,url}=req.body
     if(!title||!url){
         res.status(400).json({sucess:false,message:"provide all the fields"})
 
     }
     const sociallinks = await SocialLinks.create({title,url})
     res.status(201).json({sucess:true,message:"social links added successfully",sociallinks
         })
 
   } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ sucess: false, error: "Internal server error" });
   }
})

const updatelinks = asyncHandler(async()=>{
   try {
     const id = req.params.id
     if(!id){
         res.status(400).json({sucess:false,message:"provide the link"})
     }
         const sociallinks = await SocialLinks.findByIdAndUpdate(id,req.body.url,{new:true})
 
      res.status(201).json({sucess:true,message:"link updated",sociallinks})
   } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ sucess: false, error: "Internal server error" });
   }

})

const deletelinks= asyncHandler(async(req,res)=>{
  try {
      const id=req.params.id
      if(!id){
          res.status(400).json({sucess:false,message:"provide the link"})
          }
          await SocialLinks.findByIdAndDelete(id)
          res.status(200).json({sucess:true,message:"link deleted successfully"})
  
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ sucess: false, error: "Internal server error" });
  }
})

const showlinks =asyncHandler(async(req,res)=>{
    try {
        const sociallinks = await SocialLinks.find({})
        if(!sociallinks||sociallinks.length===0){
            res.status(404).json({sucess:false,message:"no links found"})
        }
        res.status(200).json({sucess:true,message:"social links",sociallinks})
    } catch (error) {
        console.error("Error:", error);
    return res.status(500).json({ sucess: false, error: "Internal server error" });
    }
})

export {addlinks,updatelinks,showlinks,deletelinks}