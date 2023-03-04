import { user } from "../../DB/models/user.model.js";
import mongoose from 'mongoose'


export const Join=async(id)=>{
  

    const users = await user.aggregate([
        {
          $match: {
      _id: mongoose.Types.ObjectId(id)  
          }
        },
      
        {
          $lookup: {
            from: 'books',
            localField:"_id",
            foreignField:"person",
            as: 'books'
          }
        }
      ]);
    //   console.log(users);
      return users
}