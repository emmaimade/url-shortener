import express from "express";
import mongoose from "mongoose";
import isUrl from "is-url";

import URL from "../models/URL.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.render("index");
});


export default router;