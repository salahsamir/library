import { handleerror } from '../../../utils/errorhandl.js'
import { compare_password, hash_password } from '../../../utils/hash&compare.js'
import { generate_token } from '../../../utils/token.js'
import { user } from './../../../../DB/models/user.model.js'

export const signup = handleerror(async (req, res, next) => {
  // pass & cpass matched >>joi verify that
  const { username, email, password, cpassword, age } = req.body
  //to check if user exist or not
  const finduser = await user.findOne({ email })
  if (finduser) {
    return next(new Error('email exist', { cause: 409 }))
  }
  ///hash password to send db
  const hash = hash_password({ plantext: password })
  const newUser = await user.create({ username, email, password: hash, age })
  return res.status(201).json({ message: 'done', newUser })
})
export const signin = handleerror(async (req, res, next) => {
  const { password, email } = req.body
  //to find user in db
  const finduser = await user.findOne({ email })
  if (!finduser) {
    return next(Error('email not exit', { cause: 401 }))
  }
  //to check if pass matched >hash_pass value
  const match = compare_password({
    plantext1: password,
    plantext2: finduser.password,
  })
  if (!match) {
    return next(Error('in-valid password', { cause: 403 }))
  }
  // to generate token
  const token = generate_token({
    id: finduser._id,
    islogged: true,
    role: 'user',
  })
  // /to change (update)  statue flag  and save it
  finduser.status = 'online'
  finduser.save()
  return res.status(200).json({ message: 'done', token })
})
