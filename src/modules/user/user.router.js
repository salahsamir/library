import { Router } from "express";
import * as authcontroller from './controller/user.js'
import { auth } from './../../middleware/auth.js';
import { soft } from "../../middleware/soft.js";

export const router_user=Router()
router_user.get('/',auth,soft,authcontroller.getuser)
router_user.put('/',auth,soft,authcontroller.updatename)
router_user.patch('/',auth,soft,authcontroller.updatepassword)
router_user.delete('/',auth,soft,authcontroller.deleteuser)
router_user.delete('/softdelete',auth,soft,authcontroller.softdelete)
router_user.get('/logout',auth,soft,authcontroller.logout)

