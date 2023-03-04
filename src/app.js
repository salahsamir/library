
import { Connection_DB} from './../DB/connectiondb.js';
import { router_auth } from './modules/auth/auth.router.js';
import { router_book } from './modules/book/book_router.js';
import { router_message } from './modules/message/message.router.js';
import { router_user } from './modules/user/user.router.js';
import { global_error } from './utils/errorhandl.js';

export const Initapp=(app,express)=>{
    app.use(express.json())
    app.use('/auth',router_auth)
    app.use('/user',router_user)
    app.use('/message',router_message)
    app.use('/book',router_book)
    app.get('/', (req, res) => res.send('Hello World!'))
    app.all('*',(req,res,next)=>res.send('no page found'))
    app.use(global_error)
    Connection_DB()
}