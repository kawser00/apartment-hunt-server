require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs-extra')
const fileUpload = require('express-fileupload')
const MongoClient = require('mongodb').MongoClient;

const PORT = process.env.PORT || 5000
const app = express()

// Middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('public/uploads'))
app.use(fileUpload())

// Controllers
const houseController = require('./controllers/houseController')

// database 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7clce.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log('database connected');
    const userCollection = client.db(process.env.DB_NAME).collection("users");
    const houseCollection = client.db(process.env.DB_NAME).collection("houses");

    // add new apartment API
    app.post('/addHouse', houseController.addHouse)


});





app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(PORT, () => {
    console.log(`server is running on  http://localhost:${PORT}`);
})

