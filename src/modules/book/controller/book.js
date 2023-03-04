import moment from "moment/moment.js";
import { book } from "../../../../DB/models/books.models.js";
import { handleerror } from "../../../utils/errorhandl.js";
import { Join } from "../../../utils/join.js";


export const getallbook = handleerror(async (req, res, next) => {
  const all_book = await book.find({});
  return res.json({ message: "done", all_book });
});
export const addbooks = handleerror(async (req, res, next) => {
  const { name, auther, desc } = req.body;
  const addbook = await book.create({ name, auther, desc });
  return res.status(201).json({ message: "done", addbook });
});
//الحجز
export const books = handleerror(async (req, res, next) => {
  ///time issued and return
  const date = new Date();
  const dateStr = date;
  const newdate = new Date(dateStr);
  newdate.setDate(newdate.getDate() + 5);
  const { _id } = req.user;
  const { name } = req.body;
  const findbook = await book.findOne({ name });
  if (findbook?.book) {
    return res.json({ message: "book not allowed now" });
  }
  //  const findbook=await book.findOneAndUpdate({name},{book:true,person:_id,time_issues:date,time_return:newdate.toISOString()},{new:true})

  //  console.log(findbook);
  findbook.book = true;
  findbook.person = _id;
  findbook.time_issues = date;
  findbook.time_return = newdate.toISOString();
  findbook.save();
  return res.json({ message: "done", findbook });
});
export const fine_book = handleerror(async (req, res, next) => {
  const books = await book.find({ person: req.user._id,book:true });
  
  for (let index = 0; index < books.length; index++) {
    const diff = moment(books[index].time_return).diff(
      moment(new Date()),
      "days"
    );
    if (diff < 0) {
      const book_fine=await books[index].updateOne({late:diff,fine: -diff * 100})
      // books[index].late = diff;
      // books[index].fine = -diff * 100;
      // books[index].save();
    }
  }
  const late_book = await book.find({ late: { $lt: 0 } });
  return res.json({message:"done",late_book});
});
export const profile = handleerror(async (req, res, next) => {
  const books=await book.find({person:req.user.id,book:true}).select('name')
  // const user = await Join(req.user.id);
  return res.json({ message: "done", books });
});
export const search = handleerror(async (req, res, next) => {
  const { name } = req.body;
  const search = await book.findOne({
    person: req.user._id,
    name: { $regex: `^${name}` },
    book:true
  });
  if (!search) {
    return next(new Error("not found", { cause: 404 }));
  }
  return res.status(200).json({ message: "done", search });
});
export const return_book = handleerror(async (req, res, next) => {
  const { name } = req.body;
  const books = await book.find({ person: req.user._id ,name,book:true});
  console.log(books);
  if(!books.length){
  return res.json({message:"not found this book"})

  }
  const diff =  moment(books[0].time_return).diff(
    moment(new Date())
    ,
    "days"
  );
  if(diff>=0){
  const remove  = await book.findOneAndUpdate({ person: req.user._id ,name},{book:false});
  return res.json(remove)
  }
  else{
    return res.json({message:"you must paid fine"})
  //   if(!books[0].fine){
  // const remove  = await book.findOneAndUpdate({ person: req.user._id ,name},{book:false,late:0,fine:0});
  // return res.json({message:"the fine is paid",remove})

  //   }else{
  //     return res.json({message:"you must paid fine"})

  //   }

  }
 
  
});
export const paid_fine=handleerror(
  async(req,res,next)=>{
    const{_id}=req.user
    const {name,fine}=req.body
  const books = await book.find({ person: req.user._id ,name});

  if(books[0].fine==fine){
    const books = await book.findOneAndUpdate({ person: req.user._id ,name},{book:false,late:0,fine:0},{new:true});
    return res.json({message:"done",books})

  }else{
    return res.json({message:"input wrong"})

  }

    
  }
)