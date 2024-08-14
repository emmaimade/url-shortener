import express from "express";
import mongoose from "mongoose";
import isUrl from "is-url";

import URL from "../models/URL.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const baseUrl = req.get("host");

    const urls = await URL.find();
    res.render("index", {shortUrl: urls, baseUrl});
});

router.post("/shorten", async (req, res) => {
    try {
        const { fullUrl } = req.body;

        // checks if url is valid
        if (!isUrl(fullUrl)) {
            res.render("index", { error: "Please enter a valid URL" });
        }

        // checks if url is exist
        const url = await URL.findOne({ fullUrl });
        if (url) {
            return res.render("index", {shortUrl: url.shortUrl});
        }

        const shortUrl = new URL({
            fullUrl
        });

        await shortUrl.save();
        res.redirect("/");
        
    } catch (error) {
        console.log({error: error.message});        
    }
});


export default router;