const chai = require('chai');
const expect = chai.expect;
const should = chai.should;
const chaiHttp = require('chai-http');
const { x } = require('joi');

const router = require('../router');

const token = '';

chai.use(chaiHttp);


describe("Routes Testing",()=>{
    const countries = ['dz','us','fr','ru','in','de','tr','eg','br','ca','cz','it','ua']; 
    const categories =['business','entertaiment','general','health','science','sports','technologie'];

    it("'GET /' should return a correct status" ,()=>{

        chai.request(router)
        .get('/')
        .end((err,res)=>{

            expect(res.status).to.equal(200);
            expect(res.body.error).to.be.false;
            console.log(res.body.message);

        });

    });


    /*it("'POST /login' should return good status",()=>{

        chai.request(router)
        .post('/api/login')
        .end((err,res)=>{
            token = res.body.accessToken;
            console.log('tested',token)
        });

    });*/

    /*it("'POST /authors/1' should be authorized",()=>{
        
        chai.request(router)
        .post(`api/authors/1`)
        .set('authorization':`Bearer ${token}`)
        .end((err,res)=>{
            console.log('tested',res)
        });

    });*/

    /*
    it("GET '/news should' return a json array",()=>{
        chai.request(router)
        .get('/news')
        .end((err,res)=>{

            res.should.have.status(200);
            res.body.should.be.a('array');

        });
    });

    it("'GET /news/category=:cat_code' should return an object",()=>{

        chai.request(router)
        .get(`/news/category=business`)
        .end((err,res)=>{

            res.should.have.status(200);
            
        });

    });

    
    it("'GET /news/country=:c_code' should return an oject",()=>{

        chai.request(router)
        .get(`/news/country=dz`)
        .end((err,res)=>{

            res.should.have.status(200);
            
        });

    });


    it("'GET /news/:id' should return an oject",()=>{

        chai.request(router)
        .get(`api/news/10`)
        .end((err,res)=>{

            res.should.have.status(200);
            
        });

    });

    
    it("'POST /add_news' should return good status",()=>{

        let post =
        {
            "author": "Danny Haseley",
            "title": "In hac habitasse platea dictumst.",
            "description": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
            "url": "http://ehow.com/nulla/eget/eros/elementum/pellentesque/quisque.xml?in=rutrum&porttitor=neque&pede=aenean",
            "urlToImage": "http://dummyimage.com/175x100.png/dddddd/000000",
            "publishedAt": "1/1/2022",
            "content": "Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
            "category": "entertaiment",
            "country": "ca"
        };

        chai.request(router)
        .post(`/add_news`)
        .send(post)
        .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            
        });

    });*/










});
