const express = require('express');
const router = express.Router();

const { isAdmin, isAuthor, isAuthorOrAdmin, authMiddleware } = require('../middlewares/authMiddleware');

const { getAllBlogs, getaBlog, postBlog, updateBlog, deleteBlog } = require('../controller/blogControl');



router.get('/', getAllBlogs);


router.get('/:id', getaBlog);


router.post('/createBlog', authMiddleware, isAuthor, postBlog);


router.put('/:id', authMiddleware, isAuthorOrAdmin, updateBlog);


router.delete('/:id', authMiddleware, isAuthorOrAdmin, deleteBlog);

module.exports = router;
