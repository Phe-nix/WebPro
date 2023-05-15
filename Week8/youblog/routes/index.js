const express = require('express')
const router = express.Router()
var article = require('../article-db')

router.get("/", function (req, res, next) {
    var searchFilter = req.query.search;
    if (searchFilter) {
        var getarticle = article.filter(function (article) {
            return (
                article.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                article.author.toLowerCase().includes(searchFilter.toLowerCase())
            );
        });
    } else {
        var getarticle = article;
    }
    var data = { article: getarticle };
    res.render("index", data);
});
router.get("/blog/:id", function (req, res, next) {
    var id = req.params.id;
    var getArticle = article.find(function (article) {
        if (article.id == id) {
            return article.id == id;
        }
        else {
            return false;
        }
    });
    var data = { article: getArticle };
    if (!getArticle) {
        res.status(404).render('notfound')
    }
    else {

        res.render("detail", data);
    }
});

module.exports = router