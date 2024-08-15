import express from "express";

import URL from "../models/URL.js";

const router = express.Router();

// get endpoint
router.get("/", async (req, res) => {
    const baseUrl = req.get("host");

    const urls = await URL.find();
    res.render("index", {shortUrl: urls, baseUrl});
});

// post endpoint
router.post("/shorten", async (req, res) => {
    try {
        const { fullUrl } = req.body;
        const baseUrl = req.get("host");

        // checks if url exists
        const existingUrl = await URL.findOne({ fullUrl });
        if (existingUrl) {
            const allUrls = await URL.find();
            return res.render(
                "index", 
                {
                    error: 'Url exists',
                    existingUrl,
                    shortUrl: allUrls,
                    baseUrl
                }
            );
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

// get shortUrl endpoint
router.get("/:shortUrl", async (req, res) => {
    const { shortUrl } = req.params;

    const url = await URL.findOne({ shortUrl });
    if (url) {
        url.clicks++;
        await url.save();
        return res.redirect(url.fullUrl);
    } else {
        return res.redirect("/");
    }

});

// delete endpoint
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