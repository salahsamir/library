import { Router } from "express";
import { validation } from "../../middleware/validation.js";
import { signinvalidition, signupvalidition } from "./auth.validtion.js";
import * as authcontroller from './controller/auth.js'
export const router_auth=Router()
router_auth.post('/signup',validation(signupvalidition),authcontroller.signup)
router_auth.post('/signin',validation(signinvalidition) ,authcontroller.signin)
