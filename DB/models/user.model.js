

import mongoose, { model, Schema } from "mongoose";

const userschema=new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    age:Number,
    status:{
        type:String,
        default:"offline"
    },
    role:{
        type:String,
        default:"user",
        enum:['user','admin']
    },
    ///to soft delete 
    deleted:{
        type:Boolean,
        default:false
    }
})

export const user=mongoose.models.User|| model('User',userschema)