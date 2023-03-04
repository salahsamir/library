import jwt from "jsonwebtoken"
export const generate_token=(text={},signature=process.env.SEGNITURE)=>{
    const token=jwt.sign(text,signature)
    return token
}