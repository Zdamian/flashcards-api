var express = require('express');
var mongoose = require('mongoose');
var bodyParser= require('body-parser');

var Category = require('./model/FlashCard');

var app = express();


mongoose.connect('mongodb://localhost/categories_2');

app.use(bodyParser.urlencoded({extended: true}));

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 'Content-Type, X-Requested-With, authorization, X-BM-Filename');
    res.header("Access-Control-Expose-Headers", "Accept-Ranges, Content-Encoding, Content-Length, Content-Range");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
    next();
});

app.options("*", function(req, res) {
    res.send(200);
});

app.all('*', function(req, res, next) {
    setTimeout(next, 1000);
});

app.get('/categories', function(req, res) {
    Category.find({}, function(err, categories) {
        if (err) {
            res.send(404);
        } else {
            res.send(categories)
        }
    });
});

app.get('/categories/:id', function(req, res) {
    console.log(req.params);
    Category.findById(req.params.id, function(err, category) {
        if (err) {
            res.send(404);
        } else {
            res.send(category);
        }
    });
});

app.post('/categories', function(req, res) {
    console.log(req.body);
    var category = new Category({
        category: req.body.category,
        words: [
            {
                english: req.body.english,
                polish: req.body.polish,
                known: req.body.known
            }
        ]
    });
    category.save(function(err, category) {
        if (err) {
            res.send(404);
        } else {
            res.send(category);
        }
    });
});

app.listen(5555, function(){
    console.log('Node server on port 5555');
});