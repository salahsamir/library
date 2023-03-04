import { compareSync } from "bcrypt";
import { user } from "../../../../DB/models/user.model.js";
import { handleerror } from "../../../utils/errorhandl.js";
import { compare_password, hash_password } from "../../../utils/hash&compare.js";



export const getuser=handleerror(async(req,res,next)=>{
const finduser=await user.findById(req.user.id)
    return res.json({message:"done",finduser})
}
)
export const updatename=handleerror(
async(req,res,next)=>{
    const {username,age}=req.body
    // console.log({username,age});
    const updateuser=await user.findByIdAndUpdate(req.user._id,{username,age},{new:true})
    return res.status(200).json({message:"done",updateuser})
}
)
export const updatepassword=handleerror(
    async(req,res,next)=>{
        const {password,oldpassword}=req.body
        const finduser=await user.findById(req.user._id)
        const match=compare_password({ plantext1:oldpassword,plantext2:finduser.password})
        if(!match){
            return next(new Error('old password not match',{cause:403}))
        } 
        const hash=hash_password({plantext:password})
        // console.log(hash);
        const update=await user.findOneAndUpdate(req.user._id,{password:hash})
       
        return res.json({message:"done",update})

        
    }
    )
export const deleteuser=handleerror(
    async(req,res,next)=>{
        const deleteuser=await user.findByIdAndDelete(req.user._id)
        return res.json({message:"done",deleteuser})
    }
    )
export const softdelete=handleerror(
    async(req,res,next)=>{
        const result=await user.findByIdAndUpdate(req.user._id,{deleted:true},{new:true})
        return res.json({result})
    }
)

export const logout=handleerror(
    async(req,res,next)=>{
        const finduser=await user.findByIdAndUpdate(req.user._id,{status:"offline"},{new:true})
        // console.log(finduser);
        return res.json({message:"done",finduser})
    
    }
)