const express = require("express")
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')

const User = require('./models/Users')
const Transaction = require('./models/Transactions')
const userData = require('./data/users')
const transactionData = require('./data/transactions')
const authRouter = require('./routes/authRouter')
const transactRouter = require('./routes/transactRouter')


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
        console.log("") 
    }
})

app.use(cors())
app.use(express.json()) 

const db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error: '))
db.once("open", async () => {
    if( (await User.countDocuments().exec()) > 0) return

    User.insertMany(userData)
        .then(() => console.log("Users added successfully"))
        .catch((err) => console.log("Error: " + err))
})

db.once("open", async () => {
    if( (await Transaction.countDocuments().exec()) > 0) return

    console.log()
    Transaction.insertMany(transactionData)
        .then(() => console.log("Transactions added successfully"))
        .catch((err) => console.log("Error: " + err))
})

app.use("/api/auth", authRouter)

app.use("/api/transact", transactRouter)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`server is up and running on port: ${port}`)
})
