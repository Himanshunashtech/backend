

import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from 'cors'
import cookieParser from "cookie-parser";
import router from "./routes/userRoutes.js";
import fileuploader from "./routes/galleryRoutes.js";
import contentuploader from "./routes/contentmanagementRoutes.js";
import uploadlinks from "./routes/sociallinksRoutes.js";
import contactUs from "./routes/contactusRoutes.js";

dotenv.config({
    path: "./.env",
});

const app = express();

const serverConnection = async () => {



    app.use(cors())
    app.use(express.static(path.join("views")))
    app.use(express.json());
    app.use(express.urlencoded({ extended: true, }));
    app.use(cookieParser());
    app.use(express.static("public"));




    app.use("/api/users", router)
    app.use("/api/videos", fileuploader)
    app.use("/api/content", contentuploader)
    app.use("/api/links", uploadlinks)
    app.use("/api",contactUs)


    app.get("/", (req, res) => {
        res.render(index)
    })

    app.listen(process.env.PORT, () => {
        console.log("server is running  http://localhost:8000");
    });
};
export { serverConnection };
