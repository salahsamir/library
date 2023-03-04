import { user } from "../../DB/models/user.model.js"
///to check if user delete or not >>check delete flag
export const soft=async(req,res,next)=>{
try {
  const {_id}=req.user._id
const checkuser=await user.findById(_id)
if(checkuser.deleted){
  return next(new Error('user is deleted'))
}
return next()
} catch (error) {
  return next(new Error('user is deleted'))
}

}