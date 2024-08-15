import mongoose from "mongoose";
import { nanoid }  from "nanoid";

const urlSchema = new mongoose.Schema(
    {
        fullUrl: {
            type: String,
            required: true
        },
        shortUrl: {
            type: String,
            required: true,
            unique: true,
            default: () => nanoid(8)
        },
        clicks: {
            type: Number,
            required: true,
            default: 0
        }
    },
    { timestamps: true }
);

export default mongoose.model("URL", urlSchema);