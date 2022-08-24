const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');
const path = require('path')
const app = express();
console.log(typeof(app))
app.use(cors({origin:'*'}))
connectDb()




PORT =  process.env.PORT || 5000;

app.listen(PORT, ()=>{console.log(`server started on port ${PORT}`)})
app.use(express.json({extended:false}))



app.use('/api/users',require("./routers/users.js"))
app.use('/api/auth',require("./routers/auth.js"))
app.use('/api/profile',require("./routers/profile.js"))
app.use('/api/posts',require("./routers/posts.js"))

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}