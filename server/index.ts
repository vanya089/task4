import express = require("express");
import cors = require("cors");
const mongoose = require('mongoose').default;
require("dotenv").config();
import ApiErrorHandler from "./src/error/ApiErrorHandler";
import router = require("./router");


const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

const app = express();

app.use(express.json());
app.use(cors());
app.use(ApiErrorHandler);
app.use("/api", router)


async function startApp() {
    try {
        await mongoose.set("strictQuery", false);
        await mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true,});
        app.listen(PORT, () => console.log("SERVER STARTED ON PORT " + PORT));
    } catch (e) {
        console.log(e);
    }
}

startApp();
