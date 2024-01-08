const express = require("express");

const UserRouter = require('./routes/user')

const {connectMongoDb} = require('./connection')
const {logreqRes} = require('./middleware')
const app = express();


const PORT = 8000;

//conection
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1").then(()=> console.log("MongoDB connected"));


// mongoose
//   .connect("mongodb://127.0.0.1:27017/youtube-app-1")
//   .then(() => console.log("MongoDb Connected"))
//   .catch((err) => console.log("Mongo Err", err));

//schema




//middleware
app.use(express.urlencoded({extended: false}));
app.use(logreqRes('log.txt'))
// app.use((req,res, next)=> {
//     console.log("Hello From Middleware 1");
//     next()
//     // return res.json({msg:"Hello from Middleware 1"})

// })

// app.use((req,res, next)=> {
//     

// })c


app.use("/api/users", UserRouter)

app.listen(PORT, () => console.log(`Server started at Port:${PORT}`));
