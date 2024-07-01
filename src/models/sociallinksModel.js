import mongoose from "mongoose";

const linksSchema = new mongoose.Schema({
     title:{
        type:String,
        required:true
     },
     url:{
        type:String,
        required:true,
        unique:true
     }
 

}
, { timestamps: true })

const SocialLinks = mongoose.model(" SocialLinks ",linksSchema)

export default SocialLinks

