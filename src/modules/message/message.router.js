import { Router } from 'express';
import { resivemessage, sendmessage } from './controller/message.js';
import { message_validtion } from './../auth/auth.validtion.js';
import { validation } from '../../middleware/validation.js';
export const router_message=Router()
router_message.post('/:reviserEmail',sendmessage)
router_message.put('/:reviserEmail',validation(message_validtion),resivemessage)

