const mongoose = require("mongoose");
const nanoId = require("nanoid");

const urlSchema = new mongoose.Schema(
    {
        fullUrl: {
            type: String,
            required: true
        },
        shortUrl: {
            type: String,
            required: true,
            default: () => nanoId(8)
        },
        clicks: {
            type: Number,
            required: true,
            default: 0
        }
    }
);

module.exports = mongoose.model("URL", urlSchema);