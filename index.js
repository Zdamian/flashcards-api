var express = require('express');
var mongoose = require('mongoose');
var bodyParser= require('body-parser');

var Word = require('./model/Word');
var Category = require('./model/Category');

var app = express();



/**
 * DB connection
 */

mongoose.connect('mongodb://localhost/flashcard_db');



/**
 * Http settings
 */

app.use(bodyParser.json());

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



/**
 * FlashCards API
 */
// http://127.0.0.1:5551/flashcards/work
app.get('/flashcards/:category', function(req, res) {
    Category.find({
        name: req.params.category
    }, function(err, entity) {
        if (err) {
            res.status(400).send({status: 400, error: "error message"});
        } else {
            Word.find({
                category: entity
            })
            .populate('category')
            .exec(function(err, entities) {
                if (err) {
                    res.status(400).send({status: 400, error: "error message"});
                } else {
                    res.send(entities)
                }
            });
        }
    });
});



/**
 * Categories API
 */

app.get('/categories', function(req, res) {
    Category.find({}, function(err, entities) {
        if (err) {
            res.status(400).send({status: 400, error: "error message"});
        } else {
            res.send(entities);
        }
    });
});

app.get('/categories/:id', function(req, res) {
    Category.findById(req.params.id, function(err, entity) {
        if (err) {
            res.status(400).send({status: 400, error: "error message"});
        } else {
            res.send(entity);
        }
    });
});

app.post('/categories', function(req, res) {
    var newCategory = new Category({
        name: req.body.name
    });

    newCategory.save(function(err, entity) {
        if (err) {
            res.status(400).send({status: 400, error: "error message"});
        } else {
            res.send(entity);
        }
    });
});

app.put('/categories/:id', function(req, res) {
    Category.findById(req.params.id, function(err, updatedCategory) {
        if (err) {
            res.status(400).send({status: 400, error: "error message"});
        } else {
            updatedCategory.name = req.body.name;
            updatedCategory.save(function(err, entity) {
                if (err) {
                    res.status(400).send({status: 400, error: "error message"});
                } else {
                    res.send(entity);
                }
            });
        }
    });
});

app.delete('/categories/:id', function(req, res) {
    Category.findById(req.params.id, function(err, entity) {
        if (err) {
            res.status(400).send({status: 400, error: "error message"});
        } else {
            Word.find({
                category: entity
            })
            .populate('category')
            .exec(function(err, entities) {
                if (err) {
                    res.status(400).send({status: 400, error: "error message"});
                } else {
                    if (entities.length === 0) {
                        Category.findByIdAndRemove(req.params.id, function(err) {
                            if (err) {
                                res.status(400).send({status: 400, error: "error message"});
                            } else {
                                res.send({});
                            }
                        });
                    } else {
                        res.status(400).send({status: 400, error: "error message"});
                    }
                }
            });
        }
    });
});



/**
 * Words API
 */

app.get('/words', function(req, res) {
    Word.find({})
    .populate('category')
    .exec(function(err, entities) {
        if (err) {
            res.status(400).send({status: 400, error: "error message"});
        } else {
            res.send(entities);
        }
    });
});

app.get('/words/:id', function(req, res) {
    Word.findById(req.params.id)
        .populate('category')
        .exec(function(err, entity) {
            if (err) {
                res.status(400).send({status: 400, error: "error message"});
            } else {
                res.send(entity);
            }
        });
});

app.post('/words', function(req, res) {
    if (req.body.categoryId && req.body.polish && req.body.english) {
        Category.findById(req.body.categoryId, function(err, category) {
            if (err) {
                res.status(400).send({status: 400, error: "error message"});
            } else {
                let word = new Word({
                    polish: req.body.polish,
                    english: req.body.english,
                    known: false,
                    category: category
                });

                word.save(function(err, entity) {
                    if (err) {
                        res.status(400).send({status: 400, error: "error message"});
                    } else {
                        res.send(entity);
                    }
                });
            }
        });
    } else {
        res.status(400).send({status: 400, error: "error message"});
    }
});

app.put('/words/:id', function(req, res) {
    Word.findById(req.params.id, function(err, entity) {
        if (err) {
            res.status(400).send({status: 400, error: "error message"});
        } else {
            if (!req.body.categoryId) {
                let edit = false;
                if (req.body.polish) {
                    entity.polish = req.body.polish;
                    edit = true;
                }
                if (req.body.english) {
                    entity.english = req.body.english;
                    edit = true;
                }
                if (req.body.known !== undefined) {
                    entity.known = req.body.known;
                    edit = true;
                }

                if (edit) {
                    entity.save(function(err, word) {
                        if (err) {
                            res.status(400).send({status: 400, error: "error message"});
                        } else {
                            res.send(word);
                        }
                    });
                } else {
                    res.status(400).send({status: 400, error: "error message"});
                }
            } else {
                Category.findById(req.body.categoryId, function(err, category) {
                    if (err) {
                        res.status(400).send({status: 400, error: "error message"});
                    } else {
                        entity.category = categoty;
                        entity.save(function(err, word) {
                            if (err) {
                                res.status(400).send({status: 400, error: "error message"});
                            } else {
                                res.send(word);
                            }
                        });
                    }
                });
            }
        }
    });
});

app.delete('/words/:id', function(req, res) {

    Word.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.status(400).send({status: 400, error: "error message"});
        } else {
            res.send({});
        }
    });
});



/**
 * Run App
 */

app.listen(5551, function(){
    console.log('Node server is run on port 5551');
});
