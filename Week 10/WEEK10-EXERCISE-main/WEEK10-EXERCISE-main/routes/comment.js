const express = require("express");
const path = require("path")
const pool = require("../config");

const multer = require('multer')
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './static/uploads')// path to store image
  },
  filename: function (req, file, callback) {
    // set file name
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })

const router = express.Router();

// Get comment
router.get('/:blogId/comments', function (req, res, next) {
    
});

// Create new comment
router.post('/blogs/:blogId/comments',upload.single('myImage') , async function (req, res, next) {
    const file = req.file;
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }

    const commentRef = req.body.comment;

    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try {
        const [rows, fields] = await conn.query("INSERT INTO comments (comment, blog_id, comment_date) VALUES (?, ?, CURRENT_TIMESTAMP)", [
            commentRef, req.params.blogId, req.params.comment_date
        ])
        const blogId = rows.insertId;
        await conn.query(
            "INSERT INTO images(blog_id,comment_id, file_path, main) VALUES(?,?, ?, 1);",
            [blogId,rows.insertId, file.path.substr(6)])
        await conn.commit();
        res.redirect('/blogs/' + req.params.blogId);
    }
    catch (err) {
        await conn.rollback();
        next(err);
    }
    finally {
        conn.release();
    }
});

// Update comment
router.put('/comments/:commentId', function (req, res, next) {
    return
});

// Delete comment
router.delete('/comments/:commentId', function (req, res, next) {
    return
});

// Delete comment
router.put('/comments/addlike/:commentId', function (req, res, next) {
    return
});


exports.router = router