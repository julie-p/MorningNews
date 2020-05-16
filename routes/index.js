const express = require('express');
const router = express.Router();

const userModel = require('../Models/User');
const articleModel = require('../Models/Article');

const uid2 = require('uid2');
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

router.post('/sign-up', async function (req, res, next) {

  let error = [];
  let result = false;
  let user = null;
  let token = null;

  const searchUser = await userModel.findOne({
    email: req.body.email
  });

  if (searchUser !== null) {
    error.push('Email déjà enregistré');
  };

  if (req.body.username === '' ||
    req.body.email === '' ||
    req.body.password === '') {
    error.push('Les informations saisies sont invalides ou manquantes');
  };

  if (error.length === 0) {
    const salt = uid2(32);

    const newUser = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: SHA256(req.body.password + salt).toString(encBase64),
      salt: salt,
      token: uid2(32)
    });

    user = await newUser.save();

    if (user) {
      result = true;
      token = user.token;
    };
  };

  res.json({ result, user, error, token });
});

router.post('/sign-in', async function (req, res, next) {

  let error = [];
  let result = false;
  let token = null;
  let user = null;

  if (req.body.email == ''
    || req.body.password == ''
    ) {
    error.push('champs vides')
  };

  if (error.length == 0) {
    const user = await userModel.findOne({
      email: req.body.email,
    });
  
    
    if (user) {
      const passwordEncrypt = SHA256(req.body.password + user.salt).toString(encBase64)

      if(passwordEncrypt == user.password){
        result = true
        token = user.token
      } else {
        result = false
        error.push('mot de passe incorrect')
      }
      
    } else {
      error.push('email incorrect')
    }
  };

  res.json({ result, user, error, token });
});

//Route post article-wishlist
router.post('/wishlist-article', async function(req, res, next) {

  let result = false;

  const user = await userModel.findOne({token: req.body.token});

  if (user != null) {
    const newArticle = new articleModel({
      title: req.body.name, 
      description: req.body.desc, 
      urlToImage: req.body.img, 
      content: req.body.content,
      lang: req.body.lang,
      userId: user._id
    });
 
    const articleSave = await newArticle.save();

    if (articleSave.name) {
      result = true;
    };
  };

  res.json({result});
});

//Route get wishlist-article
router.get('/wishlist-article', async function(req, res, next) {

  let articles = [];

  const user = await userModel.findOne({token: req.query.token});

  if (user != null) {
    if (req.query.lang != '') {
      articles = await articleModel.find({userId: user._id, lang: req.query.lang});
    } else {
      articles = await articleModel.find({userId: user._id});
    }
  };

  res.json({articles});
});

//Route delete wishlist-article
router.delete('/wishlist-article', async function(req, res, next) {

  let result = false;

  const user = await userModel.findOne({token: req.body.token});

  if (user != null) {
    const articleDB = await articleModel.deleteOne({title: req.body.title, userId: user._id})

    if (articleDB.deletedCount == 1) {
      result = true;
    };  
  };

  res.json({result});
});

//Route get language
router.get('/user-language', async function(req, res, next) {

  let lang = null;

  const user = await userModel.findOne({token: req.query.token});

  if (user != null) {
    lang = user.lang;
  };

  res.json({lang});
});

//Route post language
router.post('/user-language', async function(req, res, next) {

  let result = false;

  const user = await userModel.updateOne({token: req.body.token}, {lang: req.body.lang});

  if (user != null) {
    result = true;
  };

  res.json({result});
});


module.exports = router;