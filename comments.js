// create web server

// import express
const express = require('express');
const app = express();

// import comments
const comments = require('./comments');

// import body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// import cors
const cors = require('cors');
app.use(cors());

// import express-validator
const { body, validationResult } = require('express-validator');

// get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// get comment by id
app.get('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        res.status(404).json({ message: 'Comment not found' });
    } else {
        res.json(comment);
    }
});

// add a new comment
app.post('/comments', [
    body('text').isLength({ min: 5 }).withMessage('Text is required and must be at least 5 characters long'),
    body('username').isLength({ min: 3 }).withMessage('Username is required and must be at least 3 characters long')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const comment = {
        id: comments.length + 1,
        username: req.body.username,
        text: req.body.text
    };
    comments.push(comment);
    res.status(201).json(comment);
});

// update a comment
app.put('/comments/:id', [
    body('text').isLength({ min: 5 }).withMessage('Text is required and must be at least 5 characters long'),
    body('username').isLength({ min: 3 }).withMessage('Username is required and must be at least 3 characters long')
], (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    comment.username = req.body.username;
    comment.text = req.body.text;
    res.json(comment);
});

//