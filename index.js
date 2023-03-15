const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const autherRoute = require("./routes/author");
const bookRoute = require("./routes/book");

dotenv.config()
//CONNECT Database
mongoose.set("strictQuery", false);
myDbConnection()
async function myDbConnection() {
    try {
        await mongoose.connect(process.env.mongoDB_URL, { useNewUrlParser: true });
        console.log('Connected Successfully')
        // mongoose.connection.useDb('authors');
    } catch (error) {
        console.log('Error connecting to DB ::', error);
    }
}

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

app.get("/api", (req, res) => {
    res.status(200).json("hello");
})

//routers
app.use("/v1/author", autherRoute);

app.use("/v1/book", bookRoute);

app.listen(8000, () => {
    console.log("Server is running...");
})
