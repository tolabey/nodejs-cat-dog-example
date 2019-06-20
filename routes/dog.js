const _ = require('lodash');
const Dog = require('../models/dog.js');

module.exports = function (app) {

    _dogs = [];

    /* Create */
    app.post('/dog', function (req, res) {
        var newDog = new Dog(req.body);
        newDog.save(function (err) {
            if(err) {
                res.json({info: "error during dog create"});
            } else {
                res.json({info: 'dog created succesfully'});
            }
        });
    });

    /* Read */
    app.get('/dog', function (req, res) {
        Dog.find(function (err, dogs) {
            if(err) {
                res.json({info: 'error during find dogs'});
            } else {
                res.json({info: 'dogs found succesfully', data: dogs});
            }
        });
    });

    app.get('/dog/:id', function (req, res) {
        Dog.findById(req.params.id, function (err, dog) {
            if(err) {
                res.json({info: 'error during find cat', error: err});
            } else {
                if(dog) {
                    res.json({info: 'cat found successfully', data: dog});
                } else {
                    res.json({info: 'cat not found'});
                }
            }
        });
    });

    /* Update */
    app.put('/dog/:id', function (req, res) {
        Dog.findById(req.params.id, function (err, dog) {
            if(err) {
                res.json({info: "error during find dog"});
            } else {
                if(dog) {
                    _.merge(dog, req.body);
                    dog.save(function (err) {
                        if(err) {
                            res.json({info: "error during dog update", error: err});
                        }
                        res.json({info: "dog updated succesfully"});
                    });
                } else {
                    res.json({info: "dog not found"});
                }
            }
        });
    });

    /* Delete */
    app.delete('/dog/:id', function (req, res) {
        Dog.findByIdAndRemove(req.params.id, function(err) {
            if(err) {
                res.json({info: "error during remove dog", error: err});
            } else {
                res.json({info: "dog removed successfully "});
            }
        });
    });
};