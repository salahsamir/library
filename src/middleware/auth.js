import jwt from 'jsonwebtoken'
import { user } from '../../DB/models/user.model.js'
export const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    // console.log(authorization?.startsWith(process.env.BEARER));
    if (!authorization?.startsWith(process.env.BEARER)) {
      return res.json({ message: 'in valid BEARER key ' })
    }
    const token = authorization.split(process.env.BEARER)[1]
    if (!token) {
      return res.json({ message: 'token is required ' })
    }
    const decoded = jwt.verify(token, process.env.SEGNITURE)
    // console.log(decoded);
    if (!decoded?.id) {
      return res.json({ message: 'in-valid token ' })
    }
    const finduser = await user
      .findById(decoded.id)
      .select('username email role')
    // console.log(finduser);
    if (!finduser) {
      return res.json({ message: 'id not exist' })
    }
    req.user = finduser
    return next()
  } catch (error) {
    return res.json({ message: 'catch error' })
  }
}
