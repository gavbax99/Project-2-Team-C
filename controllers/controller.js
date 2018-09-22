// Require burger.js file
var models = require('../models/models.js');


// Require express and build our router instance
var express = require("express");
var router = express.Router();


// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    models.all(function (data) {
        res.render("index");
    });
})


router.post("/api/game_log", function (req, res) {
    models.create([
        "burger_name"
    ], [
            req.body.burger_name
        ], function (result) {
            res.json({ id: result.insertId })
        });
});


router.put("/api/game_log/eat/:id", function (req, res) {

    var condition = "id = " + req.params.id;

    var objColVals = {
        devoured: 1,
        pooped: 0
    };
    

    models.update(objColVals, condition, function (result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});


router.put("/api/game_log/poop/:id", function (req, res) {

    var condition = "id = " + req.params.id;

    var objColVals = {
        devoured: 0,
        pooped: 1
    };

    models.update(objColVals, condition, function (result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});


router.delete("/api/game_log/:id", function (req, res) {

    var condition = "id = " + req.params.id;

    models.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});


// Export our router
module.exports = router;