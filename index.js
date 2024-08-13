const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const dbURI = process.env.DB_URI;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => { 
    console.log("Connected to Database");    
})
.catch((err) => {
    console.log("Error connecting to Database", err);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});