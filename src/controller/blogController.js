import { StatusCodes } from "http-status-codes";
import lodash from "lodash"
import axios from "axios";



export const getBlogs = async (req, res) => {

    try {
        const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
          headers: {
            'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
          },
        });
    
        // Extract the blogs array from the response
        const blogs = response.data.blogs;
    
        // Check if the extracted data is an array
        if (!Array.isArray(blogs)) {
          throw new Error('Invalid response data format');
        }
    
        const totalBlogs = blogs.length;
        const longestBlog = lodash.maxBy(blogs, 'title.length');
        const blogsWithPrivacy = blogs.filter(blog => blog.title.toLowerCase().includes('privacy'));
        const uniqueTitles = lodash.uniqBy(blogs, 'title').map(blog => blog.title);
    
        res.json({
          totalBlogs,
          longestBlog: longestBlog ? longestBlog.title : null,
          blogsWithPrivacy: blogsWithPrivacy.length,
          uniqueTitles,
        });

      } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message
        })
      }
}


export const searchBlog = async (req, res) => {

    const { query } = req.query;

    try {
      const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
        headers: {
          'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
        },
      });
  
      // Extract the blogs array from the response
      const blogs = response.data.blogs;
  
      // Check if the extracted data is an array
      if (!Array.isArray(blogs)) {
        throw new Error('Invalid response data format');
      }
  
      const matchingBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(query.toLowerCase())
      );
  
      res.status(StatusCodes.OK).json(matchingBlogs);
    
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}