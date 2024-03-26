const asyncHandler = require("express-async-handler")
const contacts = require("../models/contactModel");
const { emit } = require("nodemon");

//@desc get all contacts
//@route GET /api/contacts
//@access private
const getAllContacts = asyncHandler(async (req,res)=>{
    const res1 = await contacts.find({ user_id : req.user.id });
    res.json(res1);
})

//@desc get contact with id
//@route GET /api/contacts/:id
//@access private
const getContactWithID = asyncHandler(async (req,res)=>{
    const res1 = await contacts.findById(req.params.id)
    if (!res1){
        res.status(404);
        throw new Error("Contact is not found",req,res)
    }
    console.log(res1); 
    res.json(res1);
})

//@desc Create a contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req,res)=>{
    const { name, email, phone } = req.body ;
    const res1 = await contacts.create({
        user_id : req.user.id,
        name,
        email,
        phone,
    })
    console.log(req.body)
    if (!name || !phone || !email){
        res.status(400);
        throw new Error("All fields are mandatory",req,res)
    }
    res.status(201).json(res1);
})

//@desc Update a contact with ID
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req,res)=>{
    const res1 = await contacts.findById(req.params.id);
    if (!res1){
        res.status(404);
        throw new Error("Contact is not found",req,res)
    }
    if(res1.user_id.toString() == req.user.id){
        const updatedContact = await contacts.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new : true} 
        )
        res.json({message : `contact with id : ${req.params.id} is updated`});
        
    }
    else {
        res.status(403);
        throw new Error("User cannot update other user's contacts");
    }
    
    
})

//@desc Delete a contact with ID
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req,res)=>{
    const res1 = await contacts.findById(req.params.id);
    if (!res1){
        res.status(404);
        throw new Error("Contact is not found",req,res)
    }
    if(res1.user_id.toString() == req.user.id){
        await contacts.deleteOne({ _id : req.params.id})
        res.json({message : `contact with id : ${req.params.id} is deleted`});
        
    }
    else {
        res.status(403);
        throw new Error("User cannot delete other user's contacts");
    }
})

module.exports = {
    getAllContacts,
    getContactWithID,
    createContact,
    updateContact,
    deleteContact
}