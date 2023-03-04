import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import * as book from './controller/book.js'
export const router_book=Router()
router_book.get('/',book.getallbook)
router_book.post('/',book.addbooks)
router_book.put('/',auth,book.books)

//books 
router_book.get('/profile',auth,book.profile)
router_book.get('/search',auth,book.search)
//not returned book
router_book.put('/fine',auth,book.fine_book)
router_book.patch('/',auth,book.return_book)
router_book.patch('/paid_fine',auth,book.paid_fine)




