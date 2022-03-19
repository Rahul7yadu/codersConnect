const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');
const app = express();
console.log(typeof(app))
app.use(cors({origin:'*'}))
connectDb()




PORT =  process.env.PORT || 5000;

app.listen(PORT, ()=>{console.log(`server started on port ${PORT}`)})
app.use(express.json({extended:false}))
app.get('/',(req,res)=>{
    res.send(' API working')
})

app.use('/api/users',require("./routers/users.js"))
app.use('/api/auth',require("./routers/auth.js"))
app.use('/api/profile',require("./routers/profile.js"))
app.use('/api/posts',require("./routers/posts.js"))