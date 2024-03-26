const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const dotenv = require("dotenv").config();
const app = express();
const connectionTODB = require("./config/dbConnection")

connectionTODB.connectToDB()
const port = process.env.PORT || 5001 ;
app.listen(port,()=>{
    console.log("server is listening",port);
})

app.use(express.json());
app.use("/api/contacts",require("./routes/contactsRoutes"));
app.use("/api/user",require("./routes/userRoutes"));
app.use(errorHandler);

app.get("/",(req,res)=>{
    console.log(req.url);
    res.json({message : "This is contacts api"});
})



