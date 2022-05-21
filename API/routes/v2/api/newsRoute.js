const express = require('express');
const newsController = require('./controllers/newsController');
const bParser = require('body-parser');

const router = express.Router();

router.use(bParser.json());    // Parse the POST body json
router.use(bParser.urlencoded({extended : true}));  //Parse POST urlencoded 


//  --------------------GET  articles ---------------
router.get('/v2/api/news',newsController.get_news_latest);

//---------------------- GET by country -----------------
router.get('/v2/api/news/country=:c_code',newsController.get_by_country);

//------------------------ GET by category --------------
router.get('/v2/api/news/category=:cat_code',newsController.get_by_category);

//------------------------ GET by ID --------------
router.get('/v2/api/news/:id',newsController.get_by_id);

//--------------------  POST request  --------------------------
router.post('/v2/api/news/article',newsController.post_create_article);

//--------------------  get by AuthorID  --------------------------
router.get('/v2/api/authors/:uid/articles',newsController.get_articles_by_author);

//---------------------------------  PUT request  ----------------------------
router.patch('/v2/api/news/:id',newsController.patch_article);

 //---------------------------------  DELETE request  ----------------------------
router.delete('/v2/api/news/:id',newsController.delete_article_by_id);


module.exports = router;
