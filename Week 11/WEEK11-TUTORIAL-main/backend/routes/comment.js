const express = require("express");
const path = require("path");
const router = express.Router();
const pool = require("../config");

// Require multer for file upload
const multer = require('multer')
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './static/uploads')
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })

// Get comment
router.get('/:blogId/comments',async function(req, res, next){
    try{
        const comments = await pool.query("SELECT * FROM comments WHERE blog_id=?", [req.params.blogId]);
        res.json(comments[0]);
    }catch(err){
        return next(err);
    }
});

// Create new comment
router.post('/:blogId/comments',upload.single('blog_image'), async function(req, res, next){
    const file = req.file;
    if (!file) {
        const error = new Error("Please upload a file");
        error.httpStatusCode = 400;
        return res.status(400).json(error)
        }
    try{
        const [rows, fields] = await pool.query("INSERT INTO comments (blog_id, comment) VALUES (?, ?)", [req.params.blogId, req.body.comment]);
        res.json(rows);
    }catch(err){
        return next(err);
    }
});

// Update comment
router.put('/comments/:commentId', function(req, res, next){
    return
});

// Delete comment
router.delete('/comments/:commentId', function(req, res, next){
    return
});

// Delete comment
router.put('/comments/addlike/:commentId', function(req, res, next){
    return
});


exports.router = router