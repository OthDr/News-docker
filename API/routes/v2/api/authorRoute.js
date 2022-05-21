const express = require('express');
const authorController = require('./controllers/authorController');
const bParser = require('body-parser');
const jwt = require('../jwt');

const router = express.Router();

router.use(bParser.json());    // Parse the POST body json
router.use(bParser.urlencoded({extended : true}));  //Parse POST urlencoded 


//--------------------  get request  ------------------------------------
router.get('/v2/api/authors/me' , jwt.authenticateToken , authorController.get_me );
router.get('/v2/api/authors/email=:email' , authorController.get_by_email );
router.get('/v2/api/authors/:id' , authorController.get_byID_author );
router.get('/v2/api/authors' , authorController.get_all_authors );


//--------------------  POST request  ---------------------------------
router.post('/v2/api/authors',authorController.post_create_author);
router.post('/v2/api/login',authorController.post_login_author);


//--------------------  PUT request  ----------------------------
router.put('/v2/api/authors/:id' , jwt.authenticateToken , authorController.update_author_email);


 //------------------  DELETE request  ----------------------------
router.delete('/v2/api/authors/:id' , jwt.authenticateToken , authorController.delete_author);


module.exports = router;