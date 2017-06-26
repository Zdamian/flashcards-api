var express = require('express');
var mongoose = require('mongoose');
var bodyParser= require('body-parser');

var Word = require('./model/Word');
var Category = require('./model/Category');

var app = express();



/**
 * utils
 */
function error(res, status, message) {
    res.status(status).send({status: status, error: message});
}


/**
 * DB connection
 */

mongoose.connect('mongodb://localhost/flashcard_db');



/**
 * Http settings
 */

app.use(bodyParser.json());

app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 'Content-Type, X-Requested-With, authorization, X-BM-Filename');
    res.header("Access-Control-Expose-Headers", "Accept-Ranges, Content-Encoding, Content-Length, Content-Range");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
    next();
});

app.options("*", (req, res) => {
    res.send(200);
});

app.all('*', (req, res, next) => {
    setTimeout(next, 1000);
});



/**
 * FlashCards API
 */
// http://127.0.0.1:5551/flashcards/work
app.get('/flashcards/:category', (req, res) => {
    Category.find({
        name: req.params.category
    }, (err, entity) => {
        if (err) {
            error(res, 404, "Category not found");
        } else {
            Word.find({
                category: entity
            })
            .populate('category')
            .exec((err, entities) => {
                if (err) {
                    error(res, 400, "Server error");
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

app.get('/categories', (req, res) => {
    Category.find({}, (err, entities) => {
        if (err) {
            error(res, 400, "Server error");
        } else {
            res.send(entities);
        }
    });
});

app.get('/categories/:id', (req, res) => {
    Category.findById(req.params.id, (err, entity) => {
        if (err) {
            error(res, 404, "Category not found");
        } else {
            res.send(entity);
        }
    });
});

app.post('/categories', (req, res) => {
    if (!req.body.name) {
        error(res, 400, "Validation error");
    } else {
        var newCategory = new Category({
            name: req.body.name
        });

        newCategory.save((err, entity) => {
            if (err) {
                error(res, 400, "Server error");
            } else {
                res.send(entity);
            }
        });
    }
});

app.put('/categories/:id', (req, res) => {
    if (!req.body.name) {
        error(res, 400, "Validation error");
    } else {
        Category.findById(req.params.id, (err, updated) => {
            if (err) {
                error(res, 404, "Category not found");
            } else {
                updated.name = req.body.name;
                updated.save((err, entity) => {
                    if (err) {
                        error(res, 400, "Server error");
                    } else {
                        res.send(entity);
                    }
                });
            }
        });
    }
});

app.delete('/categories/:id', (req, res) => {
    Category.findById(req.params.id, (err, entity) => {
        if (err) {
            error(res, 404, "Category not found");
        } else {
            Word.find({
                category: entity
            })
            .populate('category')
            .exec((err, entities) => {
                if (err) {
                    error(res, 400, "Server error");
                } else {
                    if (entities.length === 0) {
                        Category.findByIdAndRemove(req.params.id, (err) => {
                            if (err) {
                                error(res, 404, "Category not found");
                            } else {
                                res.send({});
                            }
                        });
                    } else {
                        error(res, 400, "Cannot delete");
                    }
                }
            });
        }
    });
});



/**
 * Words API
 */

app.get('/words', (req, res) => {
    Word.find({})
    .populate('category')
    .exec((err, entities) => {
        if (err) {
            error(res, 400, "Server error");
        } else {
            res.send(entities);
        }
    });
});

app.get('/words/:id', (req, res) => {
    Word.findById(req.params.id)
        .populate('category')
        .exec((err, entity) => {
            if (err) {
                error(res, 404, "Word not found");
            } else {
                res.send(entity);
            }
        });
});

app.post('/words', (req, res) => {
    if (req.body.categoryId && req.body.polish && req.body.english) {
        Category.findById(req.body.categoryId, (err, category) => {
            if (err) {
                error(res, 404, "Category not found");
            } else {
                let word = new Word({
                    polish: req.body.polish,
                    english: req.body.english,
                    known: false,
                    category: category
                });

                word.save((err, saved) => {
                    if (err) {
                        error(res, 400, "Server error");
                    } else {
                        Word.findById(saved._id)
                            .populate('category')
                            .exec((err, entity) => {
                                if (err) {
                                    error(res, 404, "Word not found");
                                } else {
                                    res.send(entity);
                                }
                            });
                    }
                });
            }
        });
    } else {
        error(res, 400, "Validation error");
    }
});

app.put('/words/:id', (req, res) => {
    if (req.body.categoryId || req.body.polish || req.body.english || req.body.known !== undefined) {
        Word.findById(req.params.id, (err, entity) => {
            if (err) {
                error(res, 404, "Word not found");
            } else {
                if (!req.body.categoryId) {

                    if (req.body.polish) {
                        entity.polish = req.body.polish;
                    }

                    if (req.body.english) {
                        entity.english = req.body.english;
                    }

                    if (req.body.known !== undefined) {
                        entity.known = req.body.known;
                    }

                    entity.save((err, saved) => {
                        if (err) {
                            error(res, 400, "Server error");
                        } else {
                            Word.findById(saved._id)
                                .populate('category')
                                .exec((err, entity) => {
                                    if (err) {
                                        error(res, 404, "Word not found");
                                    } else {
                                        res.send(entity);
                                    }
                                });
                        }
                    });
                } else {
                    Category.findById(req.body.categoryId, (err, category) => {
                        if (err) {
                            error(res, 404, "Category not found");
                        } else {
                            entity.category = category;

                            if (req.body.polish) {
                                entity.polish = req.body.polish;
                            }

                            if (req.body.english) {
                                entity.english = req.body.english;
                            }

                            if (req.body.known !== undefined) {
                                entity.known = req.body.known;
                            }

                            entity.save((err, saved) => {
                                if (err) {
                                    error(res, 400, "Server error");
                                } else {
                                    Word.findById(saved._id)
                                        .populate('category')
                                        .exec((err, entity) => {
                                            if (err) {
                                                error(res, 404, "Word not found");
                                            } else {
                                                res.send(entity);
                                            }
                                        });
                                }
                            });
                        }
                    });
                }
            }
        });
    } else {
        error(res, 400, "Validation error");
    }
});

app.delete('/words/:id', (req, res) => {
    Word.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            error(res, 404, "Word not found");
        } else {
            res.send({});
        }
    });
});



/**
 * Run App
 */

app.listen(5551, () => {
    console.log('Node server is run on port 5551');
});
