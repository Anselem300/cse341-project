require("dotenv").config();
const express = require("express")
const app = express();
const route = require("./routes");

const port = process.env.PORT || 3000;

app.use("/", route)

app.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
})