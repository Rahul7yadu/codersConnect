const express = require('express');
const routes = express.Router()

routes.post('/',(req, res) => {
    console.log(req.body)
    res.send("posts")})

module.exports = routes