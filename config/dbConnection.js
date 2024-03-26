const mongoose = require("mongoose") 

const connectToDB = ( async ()=>{
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log(`connected to database : ${connect.connection.host} and ${connect.connection.name}`)
    }catch (err) {
        console.log("Connection failed :",err)
    }
})

module.exports = {
    connectToDB
}