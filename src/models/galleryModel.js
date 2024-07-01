import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const gallerySchema = new mongoose.Schema(
    {
        videoFile:{
            type:String,
            
        },
        
        tittle:{
            type:String,
            required:true
        },
        imageFile:{
            type:String,
            
        },
        //value 0 for gallery management and 1 for press management
        mediaId : {
            type:Number,
            required: true,
            
            
        },
        mediaLink: {
            type:String,
            
        },
        creatorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'  
        },
        type:{
            type:Number,
            required:true,
            
        }

    },
    {timestamps:true}
)
 gallerySchema.plugin(mongooseAggregatePaginate)



export const Gallery = mongoose.model("Gallery",gallerySchema)