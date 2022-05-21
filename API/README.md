# News API

## Express.JS REST API for news 
### **How to use:**
- `npm install` to install all node-modules.<br />
- `npm start` start server.<br />
- `npm test` run test.<br />

### HTTP : GET POST PUT DELETE
- [x] **JSON request & response.**
- [x] **URlemncoded(*x-www-form-urlencoded*) requests.**

### JWT : json-web-token 
**jwt is used to authorize users get some routes:<br />** *GET('/v2/api/authors/me') ,<br />PUT('/v2/api/author') ,<br />DELETE('/v2/api/author')*<br /> not authenticated used are not able to request these routes .
- #### **to access these routes:** Inside request header, in the 'authorization' field  put the **token** provided in your **login response**.


### Database SQLite : 
**database is stored in a local file :** [dev.sqlite](dev.sqlite)**,so it's portable**
- [x] **Table 1: for news articles**
- [x] **Table 2: for news authors**


### POST request body validation & Errors
using Joi object schema **`const Joi = require('joi')`**
- [x] **Used Joi package :** Created an object schema to validate the *req.body*.<br />
- [x] **Send back the error** on the response. <br/>
### **Middleware**
#### **body-parser `const bParser = require('body-parser')`:** To parse request body  *JSON or urlencoded* .
#### **authenticateToken `jwt.authenticateToken`:** to authorize routes basing on a token  *JWT* .

## **Versioning routes:**
### **v1:**
#### articles routes : 
- #### GET('/v1/api/news') *recent news* <br/>
- #### GET('/v1/api/news/country=:c_code') *news based on country code* <br/>
- #### GET('/v1/api/news/category=:cat_code') *news based on category* <br/>
- #### GET('/v1/api/news/:id') *get a post by it's ID* <br/>
- #### GET('/v1/api/authors/:uid/articles') *get all articles by an author* <br/>

- #### POST('/v1/api/news/article') *create a new post* <br/>

- #### PUT('/v1/api/news/:id') *update an existing post in the database* <br/>

### author routes : 
- #### GET('/v1/api/authors/me') *author's profile* <br/>
- #### GET('/v1/api/authors') *authors list* <br/>
- #### GET('/v1/api/authors/:id') *get author profile by ID* <br/>

- #### POST('/v1/api/authors') *register an author* <br/>

- #### PUT('/v1/api/authors') *update author's email* <br/>


### **v2:**
#### articles routes : 
- #### GET('/v2/api/news') *recent news* <br/>
- #### GET('/v2/api/news/country=:c_code') *news based on country code* <br/>
- #### GET('/v2/api/news/category=:cat_code') *news based on category* <br/>
- #### GET('/v2/api/news/:id') *get a post by it's ID* <br/>
- #### GET('/v2/api/authors/:uid/articles') *get all articles by an author* <br/>

- #### POST('/v2/api/news/article') *create a new post* <br/>

- #### PUT('/v2/api/news/:id') *update an existing post in the database* <br/>

- #### DELETE('/v2/api/news/:id') *delete a post from the databse* <br/>
### author routes : 
- #### GET('/v2/api/authors/me') *author's profile* <br/>
- #### GET('/v2/api/authors') *authors list* <br/>
- #### GET('/v2/api/authors/:id') *get author profile by ID* <br/>

- #### POST('/v2/api/authors') *register an author* <br/>

- #### PUT('/v2/api/authors') *update author's email* <br/>

- #### DELETE('/v2/api/authors') *delete an author from database* <br/>



## **testing**
### Mocha & chai
`"scripts": {
    "test": "mocha --exit"
}`
<br/>
**chai-http (request testing), should & expect (Assertions)**

## About news:
- [x] **News countries:** `countries = ['dz','us','fr','ru','in','de','tr','eg','br','ca','cz','it','ua']`
- [x] **News categories:** `categories =['business','entertaiment','general','health','science','sports','technologie']`
### example URL : 
**"http://localhost:3000/v1/api/news/category=sports"**
<br/>
**"http://localhost:3000/v1/api/authors"**
<br/>
**"http://localhost:3000/v1/api/author/2"**
<br/>
**"http://localhost:3000/v1/api/news/country=dz"**
