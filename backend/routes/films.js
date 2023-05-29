var express = require('express');
var ObjectID = require('mongodb').ObjectID;
const { getDb } = require('../server/conn');
var router = express.Router();

const collection = "films";


//Get film by Genre
router.get('/genre/:genre', async function(req, res, next)  {

    dbo = getDb()
    await dbo
    .collection(collection)
    .find({Genre:{ $regex: req.params.genre, $options: 'i' }}).limit(20)
    .toArray(function(err, result) {
        if (err) {
            res.status(500).send("Error fetching films");
        }else{
            res.status(200).json(result);
        }
    });
});


//Get film by Title and Genre
router.get('/filters', async function(req, res, next)  {

    let title = req.query.title;
    let genre = req.query.genre;

    let start = parseInt(req.query.start);
    let end = parseInt(req.query.end);

    if(start == undefined){
        start = 0;
    }
    if(end == undefined){
        end = 20;
    }

    dbo = getDb()
    await dbo
    .collection(collection)
    .find({Title:{ $regex: title, $options: 'i' }, Genre:{ $regex: genre, $options: 'i' }}).skip(start).limit(end)
    .toArray(function(err, result) {
        if (err) {
            res.status(500).send("Error fetching films");
        }else{
            res.status(200).json(result);
        }
    }
    );
});

//Get film by id
router.get('/ids', async function(req, res, next)  {

    let ids = req.body.ids;

    dbo = getDb()
    await dbo
    .collection(collection)
    .find({_id:{$in:ids}})
    .toArray(function(err, result) {
        if (err) {
            res.status(500).send("Error fetching films");
        }else{
            res.status(200).json(result);
        }
    }
    );
});


//Get liked films
router.get('/likes/:username', async function(req, res, next)  {

    let username = req.params.username;
    let start = parseInt(req.query.start);
    let end = parseInt(req.query.end);
    
    if(start == undefined){
        start = 0;
    }
    if(end == undefined){
        end = 16;
    }

    dbo = getDb()
    
    try {
        
        let user = await dbo.collection("users").findOne({username: username});
        let ids = user.liked_ids;
        let oids = ids.map(id => ObjectID(id));
        await dbo
        .collection(collection)
        .find({_id:{$in:oids}})
        .skip(start).limit(end)
        .toArray(function(err, result) {
            if (err) {
                res.status(500).send("Error fetching films");
            }else{
                res.status(200).json(result);
            }
        });
    }
    catch (err) {
        res.status(500).send("Error fetching liked films"+ err.message);
    }

    
});


//Get watchedLater films
router.get('/watchLater/:username', async function(req, res, next)  {

    let username = req.params.username;
    let start = parseInt(req.query.start);
    let end = parseInt(req.query.end);
    
    if(start == undefined){
        start = 0;
    }
    if(end == undefined){
        end = 16;
    }

    dbo = getDb()
    
    try {
        let user = await dbo.collection("users").findOne({username: username});
        let ids = user.watch_later_ids;
        let oids = ids.map(id => ObjectID(id));
        await dbo
        .collection(collection)
        .find({_id:{$in:oids}})
        .skip(start).limit(end)
        .toArray(function(err, result) {
            if (err) {
                res.status(500).send("Error fetching films");
            }else{
                res.status(200).json(result);
            }
        });
    }
    catch (err) {
        res.status(500).send("Error fetching watch later films");
    }
});


module.exports = router;


































module.exports = router;