require("dotenv").config();
const express = require("express")
const app = express();
const route = require("./routes");
const mongodb = require("./database/mongodb")
const bodyParser = require("body-parser")

app.use(bodyParser.json())

const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

app.use("/", route)


mongodb.initDb((err) => {
    if(err){
        console.log(err);
    }
    else{
        app.listen(port, () => {
           console.log(`Database is listening and Node is running on localhost:${port}`);
        })
    }
})
