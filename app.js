const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const cors = require("cors");  // frontend ke connection ke liye
const requestRoutes = require("./routes/requestRoutes");
const userRoutes = require("./routes/userRoutes");
const User=require("./models/User.js");

const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));


const expressSession=require("express-session");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const sessionOptions={
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    },
}
app.use(expressSession(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// app.use(cors({
//     origin: 'http://localhost:5173'  // Yahan apna frontend ka URL daalo (Vite ka default localhost port 5173 hota hai)
//   }));
// // Middleware
// app.use(cors());                 // Allow frontend requests
// app.use(express.json());         // Parse incoming JSON data

// MongoDB Connection
let MONGO_URL = "mongodb+srv://varshneydeeksha71:munmun@cluster0.4qjgo.mongodb.net/cleanify?retryWrites=true&w=majority&appName=Cluster0";

async function main() {
    await mongoose.connect(MONGO_URL);
}
main()
.then(() => console.log('Connected! to db'))
.catch((err) => console.log(err));

// Routes
app.use("/requests", requestRoutes);
app.use('/user', userRoutes);


app.use((err,req,res,next)=>{
    // let{status=500,message="something went wrong!"}=err;
    // let message="something went wrong!";
   res.send("error");
  });


app.get("/",(req,res)=>{
    res.render("request/frontPage.ejs");
})

// Start Server
app.listen(8080, () => {
    console.log("Server started on port 8080");
});
