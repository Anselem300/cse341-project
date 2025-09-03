require("dotenv").config();
const express = require("express")
const app = express();
const route = require("./routes");
const mongodb = require("./database/mongodb")

const port = process.env.PORT || 3000;

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
