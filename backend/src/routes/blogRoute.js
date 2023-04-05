const express = require('express');
const router = express.Router();

const { isAdmin, isAuthor, isAuthorOrAdmin, authMiddleware } = require('../middlewares/authMiddleware');

const { getAllBlogs, getaBlog, postBlog, updateBlog, deleteBlog } = require('../controller/blogControl');



router.get('/', getAllBlogs);


router.get('/:id', getaBlog);


router.post('/createBlog', authMiddleware, isAuthor, postBlog);


router.put('/:id', isAuthorOrAdmin, updateBlog);


router.delete('/:id', isAuthorOrAdmin, deleteBlog);

module.exports = router;
