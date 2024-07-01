import Content from "../models/contentmanagementModel.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const createcontent = asyncHandler(async (req, res) => {

    try {
        const { title, description, creator,heading } = req.body
    
        if (!title || !description || !creator||!heading) {
            res.status(400).json({ sucess: false, message: "Please fill all fields" })
    
    
        }
    
        const presentcontent = await Content.findOne({ title })
        if (presentcontent) {
            res.status(400).json({ sucess: false, message: "Title already exist" })
        }
    
        const newcontent = await Content.create({
            title,
            description,
            creator,
            heading
        })
    
        res.status(201).json({ sucess: true, message: "Content created successfully", newcontent })
    } catch (error) {
        console.log("server error")
        return res.status(500).json({ sucess:false, error: "Internal server error" });

    }



})

const updateContent = asyncHandler(async (req, res) => {

   try {
     const id = req.params.id
 
     const newcontent = Content.findById(id)
 
     const { newdescription } = req.body
     
     if (!newdescription) {
         res.status(400).json({
             sucess: false, message: "Please fill all fields"
         })
     }
 
     newcontent.description = newdescription
 
     await newcontent.save()
 
     res.status(200).json({ sucess: true, message: "Content updated successfully", newcontent })
 
   } catch (error) {
    console.log("server error")
    return res.status(500).json({ sucess:false, error: "Internal server error" });

   }

})

const deletecontent = asyncHandler(async (req, res) => {

   try {
     const id = req.params.id
 
     const content = await Content.findByIdAndDelete(id)
 
     if (!content) {
 
         res.status(404).json({ sucess: false, message: "Content not found" })
     }
 
     res.status(200).json({ sucess: true, message: "Content deleted successfully" })
   } catch (error) {
    console.log("server error")
    return res.status(500).json({ sucess:false, error: "Internal server error" });
   }

})


const showcontent= asyncHandler(async(req,res)=>{
    try {
        const content = await Content.find({})
        if(!content||content.length === 0){
            res.status(404).json({sucess:false,message:"No content found" })
        }
        res.status(200).json({sucess:true,content})
    } catch (error) {
        console.log("server error")
        return res.status(500).json({ sucess:false, error: "Internal server error" });6
    }
})




export { createcontent, updateContent, deletecontent,showcontent }