const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();


const PORT = 8000;

//conection
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log("Mongo Err", err));

//schema

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String,
  }, 
}, {timestamps: true},
);

const User = mongoose.model("user", userSchema);

//middleware
app.use(express.urlencoded({ extended: false }));
// app.use((req,res, next)=> {
//     console.log("Hello From Middleware 1");
//     next()
//     // return res.json({msg:"Hello from Middleware 1"})

// })

// app.use((req,res, next)=> {
//     fs.appendFile('log.txt', `${Date.now()}: ${req.method}:${req.path}`, (err,data)=>{
//         next()
//     })

// })

app.get("/users", async(req, res) => {
    const allDbUsers = await User.find({})
  const html = `
    <ul>
    ${allDbUsers.map((user) => ` <li>${user.firstName}-${user.email} </li> `).join("")}
    </ul>

    `;
  res.send(html);
});

app.get("/api/users", async(req, res) => {
    const allDbUsers = await User.find({})
 
  return res.json(allDbUsers);
});

// app.get("/api/users/:id");

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({error:"User not Found"})
    return res.json(user);
  })
  .patch(async(req, res) => {
    await User.findByIdAndUpdate(req.params.id, { lastName: "Changed"})
    return res.json({ status: "success" });
  })
  .delete(async(req, res) => {
    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: "success" });
  });

app.post("/api/users", async (req, res) => {
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
 return res.status(201).json({msg:"sucess"})
});
// app.patch('api/users/:id', (req,res)=>{
//     return res.json({status:"pending"})
// })

app.delete("api/users/:id", (req, res) => {
  return res.json({ status: "pending" });
});

app.listen(PORT, () => console.log(`Server started at Port:${PORT}`));
