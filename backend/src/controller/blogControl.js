const Blog = require('../models/blogModel');
const validateMongodbId = require('../utils/validateMongoId');
const asyncHandler = require("express-async-handler")

// Get all blog posts
const getAllBlogs = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1; // default to page 1
    const limit = parseInt(req.query.limit) || 10; // number of items per page
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
 
    try {
        const blogs = await Blog.find()
            .sort({ date: -1 })
            .skip(startIndex)
            .limit(limit);

        const total = await Blog.countDocuments();

        const pagination = {
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            hasPrevPage: page > 1,
            hasNextPage: endIndex < total,
            prevPage: page - 1,
            nextPage: page + 1
        };

        res.json({
            pagination,
            data: blogs
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get a single blog post
const getaBlog = asyncHandler(async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ msg: 'Blog post not found' });
        }
        res.json(blog);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Blog post not found' });
        }
        res.status(500).send('Server Error');
    }
})

// Create a blog post
const postBlog = asyncHandler(async (req, res) => {
    try {
        const newBlog = new Blog({
            title: req.body.title,
            content: req.body.content,
            author: req.user
        });
        const blog = await newBlog.save();
        res.json(blog);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// Update a blog post
const updateBlog = asyncHandler(async (req, res) => {
    validateMongodbId(id);
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ msg: 'Blog post not found' });
        }
        blog.title = req.body.title;
        blog.content = req.body.content;
        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Blog post not found' });
        }
        res.status(500).send('Server Error');
    }
})

// Delete a blog post
const deleteBlog = asyncHandler(async (req, res) => {
    validateMongodbId(id);
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ msg: 'Blog post not found' });
        }
        await blog.remove();
        res.json({ msg: 'Blog post removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Blog post not found' });
        }
        res.status(500).send('Server Error');
    }
})

module.exports = { getAllBlogs, getaBlog, postBlog, updateBlog, deleteBlog }