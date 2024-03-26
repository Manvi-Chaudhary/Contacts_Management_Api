const asyncHandler = require("express-async-handler");
const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const  jwt = require("jsonwebtoken");

//@desc login
//@route POST /api/login
//@access public
const login = asyncHandler( async (req,res)=>{
    const { email , password } = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user1 = await user.findOne({ email });
    if(user && (await bcrypt.compare(password,user1.password))){
        const accessToken = jwt.sign({
            user : {
                username : user1.username,
                email : user1.email,
                id : user1.id

            },
        },process.env.ACCESS_TOKEN_SECRET,{ expiresIn : "60m"})
        res.json({"Access-Token" : accessToken});
    }
    else{
        res.status(401);
        throw new Error("Email or password is not valid");
    }
})

//@desc register the user
//@route POST /api/register
//@access public
const register = asyncHandler( async (req,res)=>{
    const { username,email,password } = req.body;
    if(!email || !username || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const isUserNotAvalilable = await user.findOne({email});
    if (isUserNotAvalilable){
        res.status(400);
        throw new Error("Email address is already taken");
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const result = await user.create({
        username,
        email,
        password : hashedPassword
    });
    res.status(201);
    res.json(result);
})

//@desc get current user
//@route POST /api/current
//@access private
const getCurrentUser = asyncHandler((req,res)=>{
    res.json(req.user);
})

module.exports = {
    login,
    register,
    getCurrentUser
}