import bcrypt from "bcrypt"

export const hash_password=({plantext,salt_rounds=parseInt(process.env.SALT)}={})=>{
    const hash=bcrypt.hashSync(plantext,salt_rounds)
    return hash
}
export const compare_password=({plantext1,plantext2}={})=>{
    const compare=bcrypt.compareSync(plantext1,plantext2)
    return compare
}