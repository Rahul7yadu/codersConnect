const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI') || process.env.mongoUri
const mUri="mongodb+srv://rahulyadu17:HJyA2W6burpAsFNn@cluster0.k4csh2w.mongodb.net/?retryWrites=true&w=majority"
console.log(db)
mongoose.set('strictQuery',true)

const connectDb = async ()=>{
    try{
           const mongoReturn= await mongoose.connect(mUri);
            
    }catch(e){
            console.log(e)
            process.exit(1)
    }
}

module.exports = connectDb;