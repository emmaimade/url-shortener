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
            return res.redirect("/");
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

router.get("/:shortUrl", async (req, res) => {
    const { shortUrl } = req.params;

    const url = await URL.findOne({ shortUrl });
    if (url) {
        url.clicks++;
        await url.save();
        return res.redirect(url.fullUrl);
    } else {
        console.log(error.message);
        return res.redirect("/");
    }

});

router.get("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await URL.findByIdAndDelete({ _id: id});
        res.redirect("/"); 
    } catch (error) {
        console.log({error: error.message});   
    }
});

export default router;