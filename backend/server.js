const express = require("express")
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')


const app = express()

dotenv.config()

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
}, (err) => {
    if(err){
        console.log("Error: " + err)
    }
    else{
        console.log("डेटाबेस तेजी से चल रहा है")
    }
})

app.use(cors())
app.use(express.json())

const db = mongoose.connection;
