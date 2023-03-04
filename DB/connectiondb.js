import mongoose from "mongoose"

export const Connection_DB=()=>{
    return mongoose.connect(process.env.DBURI).then(res=>{
        console.log("DBconnected");
    }).catch(err=>{
        console.log("fail db");
    })
}