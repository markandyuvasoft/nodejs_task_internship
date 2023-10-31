import express from "express"
import dotenv from "dotenv"
dotenv.config()
import { connectDb } from "./config/db.js"
connectDb()

import { blogRouter } from "./src/routes/blogRouter.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", blogRouter)

const port = process.env.PORT || 3024

app.listen(port, () => {
    console.log(`server on at port ${port}`);
})
