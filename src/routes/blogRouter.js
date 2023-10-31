import express from "express"
import { getBlogs, searchBlog } from "../controller/blogController.js"

export const blogRouter = express.Router()


blogRouter.get("/blog-stats", getBlogs)

blogRouter.get("/blog-search", searchBlog)