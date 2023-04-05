const express = require('express');
const router = express.Router();
const Comment = require('../models/commentModel');
const { getComment } = require('../middlewares/commentMiddleware');

// Create a new comment
router.post('/', async (req, res) => {
    const { postId, author, content } = req.body;
    const comment = new Comment({ postId, author, content });
    try {
        const savedComment = await comment.save();
        res.status(201).json(savedComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all comments for a specific post
router.get('/post/:postId', async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific comment by ID
router.get('/:id', getComment, (req, res) => {
    res.json(res.comment);
});

// Update a specific comment by ID
router.patch('/:id', getComment, async (req, res) => {
    if (req.body.author != null) {
        res.comment.author = req.body.author;
    }
    if (req.body.content != null) {
        res.comment.content = req.body.content;
    }
    try {
        const updatedComment = await res.comment.save();
        res.json(updatedComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a specific comment by ID
router.delete('/:id', getComment, async (req, res) => {
    try {
        await res.comment.remove();
        res.json({ message: 'Comment deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




module.exports = router;
