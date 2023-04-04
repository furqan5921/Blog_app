const Blog = require('../models/blogModel');
const validateMongodbId = require('../utils/validateMongoId');

// Get all blog posts
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ date: -1 });
        res.json(blogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// Get a single blog post
const getaBlog = async (req, res) => {
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
}

// Create a blog post
const postBlog = async (req, res) => {
    try {
        const newBlog = new Blog({
            title: req.body.title,
            content: req.body.content,
            author: req.user.id
        });
        const blog = await newBlog.save();
        res.json(blog);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// Update a blog post
const updateBlog = async (req, res) => {
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
}

// Delete a blog post
const deleteBlog = async (req, res) => {
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
}

module.exports = { getAllBlogs, getaBlog, postBlog, updateBlog, deleteBlog }