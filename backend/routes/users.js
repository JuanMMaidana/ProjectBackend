var express = require('express');
let User = require('../models/user.model').User;
//const User = user.User;
const { getDb } = require('../server/conn');
var router = express.Router();

const collection = 'users';


/* GET users listing. */
router.get('/login/:username/:password', async function(req, res, next) {
  dbo = getDb();
  const password = req.params.password;
  const username = req.params.username;
  console.log(password , username);
  try {
    await dbo.collection(collection).findOne({username: username, password : password}, function(err, result) {
      if (result != null) {
        res.send(true);
      } else {
        res.send(false);
      }
    });
  }
  catch (e) {
    res.send(500, 'Error: ' + e);
  }
  
});



// get users
router.get('/:username', async function(req, res, next) {
  dbo = getDb();
  const username = req.params.username;
  try {
    await dbo.collection(collection).findOne({username: username}, function(err, result) {
      if (result != null) {
        let _user = User(result.username, result.password, result.email, result.firstName, result.lastName, result.liked_ids, result.watch_later_ids);
        res.send(_user);
      } else {
        res.status(404).send('User not found');
      }
    });
  }
  catch (e) {
    res.send(500, 'Error: ' + e);
  }

});

//add film to user's liked list
router.post('/like/:username/:film_id', async function(req, res, next) {

  dbo = getDb();

  const username = req.params.username;
  const film_id = req.params.film_id;

console.log(username, film_id);

  await dbo
  .collection(collection)
  .findOneAndUpdate
  (
    {username: username},
    {$push: {liked_ids: film_id}},
    {returnOriginal: false},
    function(err, result) {
      if (err) {
        res.status(500).send("Error adding film to liked list");
      }else{
        res.status(200).json(result);
      }
    }
  );
});

//delete film to user's liked list
router.post('/unlike/:username/:film_id', async function(req, res, next) {

  dbo = getDb();

  const username = req.params.username;
  const film_id = req.params.film_id;

  await dbo
  .collection(collection)
  .findOneAndUpdate
  (
    {username: username},
    {$pull: {liked_ids: film_id}},
    {returnOriginal: false},
    function(err, result) {
      if (err) {
        res.status(500).send("Error removing film from liked list");
      }else{
        res.status(200).json(result);
      }
    }
  );
});


router.post('/watchLater/:username/:film_id', async function(req, res, next) {

  dbo = getDb();

  const username = req.params.username;
  const film_id = req.params.film_id;

  await dbo
  .collection(collection)
  .findOneAndUpdate
  (
    {username: username},
    {$push: {watch_later_ids: film_id}},
    {returnOriginal: false},
    function(err, result) {
      if (err) {
        res.status(500).send("Error adding film to watchLater list");
      }else{
        res.status(200).json(result);
      }
    }
  );
});

//delete film to user's liked list
router.post('/notWatchLater/:username/:film_id', async function(req, res, next) {

  dbo = getDb();

  const username = req.params.username;
  const film_id = req.params.film_id;

  await dbo
  .collection(collection)
  .findOneAndUpdate
  (
    {username: username},
    {$pull: {watch_later_ids: film_id}},
    {returnOriginal: false},
    function(err, result) {
      if (err) {
        res.status(500).send("Error removing film from watchLater list");
      }else{
        res.status(200).json(result);
      }
    }
  );
});

 



module.exports = router;
