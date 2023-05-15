const express = require("express");
const path = require("path")
const pool = require("../config");

const router = express.Router();

// Get comment
router.get('/:blogId/comments', async function (req, res, next) {

});

// Create new comment
router.post('/:blogId/comments', async function (req, res, next) {
    try {
        const [rows1, fields1] = await pool.query("SELECT * FROM blogs WHERE id=?", [
            req.params.blogId]);
        const [rows, fields] = await pool.query("INSERT INTO comments (blog_id, comment, comments.like, comment_by_id) VALUES (?,?,?,?)", [
            req.params.blogId, req.body.comment, req.body.like, req.body.comment_by_id
        ]);
        console.log(rows1[0].id)
        console.log(req.params.blogId)
        if (rows1[0].id == req.params.blogId) {
            return res.json({
                "message": "A new comment is added (ID: " + rows.insertId + ")"
            })
        }
        else {
            return res.json({
                "message": "Error"
            })
        }
    } catch (err) {
        res.json({
            "message": "Error"
        })
        return next(err);
    }
});

// Update comment
router.put('/comments/:commentId', async function (req, res, next) {
    try {
        const [rows, fields] = await pool.query("UPDATE comments SET comment=? WHERE id=?", [
            req.body.comment, req.params.commentId
        ]);
        return res.json({
            "message": "Comment ID: " + req.params.commentId + " is updated.",
            "comment": {
                "comment": req.body.comment,
                "like": req.body.like,
                "comment_date": req.body.comment_date,
                "comment_by_id": req.body.comment_by_id,
                "blog_id": req.body.blog_id
            }
        })
    } catch (err) {
        return next(err);
    }
});

// Delete comment
router.delete('/comments/:commentId', async function (req, res, next) {
    try {
        const [rows, fields] = await pool.query("DELETE FROM comments WHERE id=?", [
            req.params.commentId
        ]);
        return res.json({
            "message": "Comment ID: " + req.params.commentId + " is deleted."
        })
    } catch (err) {
        return next(err);
    }
});

// Delete comment
router.put('/comments/addlike/:commentId', async function (req, res, next) {
    try {
        const [rows1, fields1] = await pool.query("SELECT * FROM comments WHERE id=?", [
            req.params.commentId]);
        console.log(rows1[0].like)
        const [rows, fields] = await pool.query("UPDATE comments SET comments.like=? WHERE id=?", [
            rows1[0].like + 1, req.params.commentId
        ]);
        console.log(rows)
        return res.json({
            "blogId": rows1[0].blog_id,
            "commentId": req.params.commentId,
            "likeNum": rows1[0].like
        })
    }
    catch (err) {
        return next(err);
    }
});


exports.router = router