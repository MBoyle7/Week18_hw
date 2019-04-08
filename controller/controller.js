const express = require("express");
const router = express.Router();
const path = require("path");

const request = require("request");
const cheerio = require("cheerio");

const Comment = require("../models/notes.js");
const Articles = require("../models/articles.js");

router.get("/", (req, res) => {
    res.redirect("/articles");
});

router.get("/scrape", (req, res) => {
    request("https://www.oann.com", (error, response, html) => {
        const $ = cheerio.load(html);
        const titlesArray = [];

        $("h3.content-grid-title").each((i, element) => {
            const results = [];

            results.title = $(this).children("a").attr("title");
            results.link = $(this).children("a").attr("href");
        });
        res.redirect("/");

        //check duplicates???
    });
});

router.get("/articles", (req, res) => {
    Articles.find().sort({_id: -1}).exec((err, doc) => {
        if(err) {
            console.log(err);
        }
        else {
            const artic= { articles: doc };
            res.render("index", artic);
        }
    })
});

router.get("/articles-json", (req, res) => {
    Articles.find({}, (err, doc) => {
        if(err) {
            console.log(err);
        }
        else {
            res.json(doc);
        }
    })
});

router.get("/clear", (req, res) => {
    Articles.remove({}, (err, doc) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log("removed articles");
        };
    });
    res.redirect("/articles.json");
});
Articles.findOne({ _id: articlesId })
    .populate("comment")
    .exec((err, doc) => {
        if(err) {
            console.log("Error: " + err)
        }
        else {
            exphbObj.articles = doc;
            const link = doc.link;
            request(link, (error, response, html) => {
                const $ = cheerio.load(html);

                $(".col").each((i, element) => {
                    exphbObj.body = $(this)
                        .children(".content-grid-title")
                        .children("a")
                        .attr("href")
                    //FIX THIS

                    res.render("articles", exphbObj);
                    return false;
                })
            })
        }
    });

router.post("/comment/:id", (req, res) => {
    const user = req.body.name;
    const content = req.body.comment;
    const articleId = req.params.id;

    const commentObj = {
        name: user,
        body: content,
    };

    const newComment = new Comment(commentObj);

    newComment.save((err, doc) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log(doc._id);
            console.log(articleId);

            Articles.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { comment: doc._id }},
                { new: true }
            ).exec((err, doc) => {
                if(err) {
                    console.log(err);
                }
                else {
                    res.redirect("/readArticle/" + articleId);
                }
            })
        }
    })
})

module.exports = router;