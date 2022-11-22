const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI') || process.env.mongoUri
mongoose.connect(db)

const connectDb = async ()=>{
    try{
            await mongoose.connect(db);

            
    }catch(e){
            
            process.exit(1)
    }
}

module.exports = connectDb;