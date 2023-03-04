

import mongoose, { model, Schema , Types} from "mongoose";

const bookschema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    path_image:{
        type:String,
        // required:true,
    
    },
    auther:{
        type:String,
        required:true,
        
    },
    desc:{
        type:String,
        required:true,
    
    },
    book:{
        type:Boolean,
        default:"false"
    },
    time_issues:{
        type:Date
    }
    ,
    time_return:{
        type:Date
    },
    late:{
        type:Number,
        default:0
    },
    fine:{
        type:Number,
        default:0
    }
    ,
    person:{
        type:Types.ObjectId,
        ref:"User"
    }

},{
    timestamps:true
})

export const book=mongoose.models.book|| model('book',bookschema)