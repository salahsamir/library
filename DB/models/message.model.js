import mongoose , { model, Schema, Types } from "mongoose";



const messageschema=new Schema({
    code:{
        type:String,
        required:true
    },
    resiver:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    }
    
 
})
export const message= mongoose.models.Message|| model('Message',messageschema)