const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')
mongoose.connect(db)

const connectDb = async ()=>{
    try{
            await mongoose.connect(db);

            console.log("db connected")
    }catch(e){
            console.log(e.message)
            process.exit(1)
    }
}

module.exports = connectDb;