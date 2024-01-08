const User = require('../models/user')

const HandleGetallUser = async (req,res)=>{
    const allDbUsers = await User.find({})
 return res.json(allDbUsers);
}

const getUserbyId = async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({error:"User not Found"})
    return res.json(user);
}
const HandleUpdateuserByid = async(req,res)=>{
    await User.findByIdAndUpdate(req.params.id, { lastName: "Changed"})
    return res.json({ status: "success" });
}
const HandledeleteuserByid = async(req,res)=>{
    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: "success" });
}

const HandleCreateNewUser = async(req,res)=>{
    const body = req.body;
    if (
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.gender ||
      !body.job_title
    ) {
      return res.status(400).json({ msg: "All feilds are req..." });
    }
    const result = await User.create({ 
      firstName: body.first_name,
      lastName: body.last_name,
      email:body.email ,
      gender:body.gender,
      jobTitle:body.job_title,
   });
   console.log("result", result);
   return res.status(201).json({msg:"success", id:result._id})
}

module.exports = {
    HandleGetallUser,
    getUserbyId,
    HandleUpdateuserByid,
    HandledeleteuserByid,
    HandleCreateNewUser
}