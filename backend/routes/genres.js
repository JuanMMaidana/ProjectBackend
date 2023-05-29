var express = require('express');
let Genre = require('../models/genre.model').Genre;
//const Genre = genre.Genre;
const { getDb } = require('../server/conn');
const { route } = require('./users');
var router = express.Router();

const collection = 'genres';


/* GET genres listing. */
router.get('/', async function(req, res, next) {

    dbo = getDb();
    try {
        let genres = await dbo.collection(collection).find({}).sort({genre:1}).toArray();
        genres = genres.map((genre) => {
            return Genre(genre.genre);
        });
        res.send(genres);
    }
    catch (e) {
        res.send(500, 'Error: ' + e);
    }
    
});
module.exports = router;