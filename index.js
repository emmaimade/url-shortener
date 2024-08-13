import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import urlRoutes from "./routes/url.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const dbURI = process.env.DB_URI;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

mongoose.connect(dbURI)
    .then(() => { 
        console.log("Connected to Database");    
    })
    .catch((err) => {
        console.log("Error connecting to Database", err);
    });

app.use("/", urlRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});