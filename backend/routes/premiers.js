var express = require('express');
const { getDb } = require('../server/conn');
var router = express.Router();

const collection = "premiers";

//Get premier films
router.get('/', async function(req, res, next) {
    
      dbo = getDb()
      await dbo
      .collection(collection)
      .find({})
      .toArray(function(err, result) {
     if (err) {
          res.status(500).send("Error fetching films");
     }else{
          res.status(200).json(result);
     }
      });
    }
);

module.exports = router;