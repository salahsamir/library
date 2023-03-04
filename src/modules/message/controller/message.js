import { handleerror } from "./../../../utils/errorhandl.js";
import { user } from "./../../../../DB/models/user.model.js";
import { message } from "../../../../DB/models/message.model.js";
import { hash_password } from "./../../../utils/hash&compare.js";
// to send message  to user
export const sendmessage = handleerror(async (req, res, next) => {
  const { reviserEmail } = req.params;
  const { code } = req.body;
  const finduser = await user.findOne({ email: reviserEmail });
  if (!finduser) {
    return next(new Error("email not exist",{cause:404}));
  }
  //to check if message exist before or not ,if exist >>update code ,else>>create new message
  const find = await message.findOne({ resiver: finduser._id });
  if (find) {
    const send = await message.findByIdAndUpdate(
      { _id: find._id },
      { code },
      { new: true }
    );
    return res.json({ message: "done", send });
  }
  const send = await message.create({ code, resiver: finduser._id });
  return res.json({ message: "done", send });
});
//send date
export const resivemessage = handleerror(async (req, res, next) => {
  const { reviserEmail } = req.params;
  const { code, password } = req.body;
  const finduser = await user.findOne({ email: reviserEmail });
  const resive = await message
    .find({ resiver: finduser._id })
    .populate("resiver");
  if (code != resive[0].code) {
    return next(new Error("code not match",{cause:400}));
  }
  const hash = hash_password({ plantext: password });
  const update = await user.findByIdAndUpdate(
    resive[0].resiver._id,
    { password: hash },
    { new: true }
  );
  return res.json({ message: "done", update });
});
