const Article = require('../../../../models/article');
const Author = require('../../../../models/author');
const Joi = require('joi');


//------------------------ GET by ID --------------
const get_by_id = async (req,res)=>{
    let id = req.params.id;
    try{
        const article = await Article.findByPk(id, {
            include:[{
                model: Author ,
                attributes: ['firstname', 'lastname']
            }]
        });
        if(!article){ throw Error('Failed to get to ressources');}
        else{
            console.log(article.author.lastname);
            res.status(201).json(article);
        }
    }
    catch(err){
        console.log(err.message);
        res.status(404).json({
            'error':true,
            'message':'no such ressource'
        });
    }
}

//  --------------------GET Latest 10 articles ---------------
const get_news_latest = async (req,res)=>{ 
    try{
        const articles = await Article.findAll({
            limit: 14,
             order: [["createdAt", "DESC"]],
            include:[{
                model: Author ,
                attributes: ['firstname', 'lastname']
            }]
        });
        if(articles.length < 1){ throw Error('Failed to get to ressources');}
        else{res.status(201).json(articles);}
    }
    catch (err){
        res.status(404).json({
            'error':true,
            'message':'no such ressource'
        });
        console.log(err.message);
    }

}

//---------------------- GET by country -----------------
const get_by_country = async (req,res)=>{
    let code = req.params.c_code;
    try{
        const article = await Article.findAll({
            where: {country: code},
            include:[{
                model: Author ,
                attributes: ['firstname', 'lastname']
            }]
        });
        if(!article){ throw Error('Failed to get to ressources');}
        else{res.status(201).json(article);}
    }
    catch(err){
        console.log(err);
        res.status(404).json({
            'error':true,
            'message':err.message
        });
    }
}


//------------------------ GET by category --------------
const get_by_category = async (req,res)=>{
    let code = req.params.cat_code;
    try{
        const article = await Article.findAll({
            where: {category: code},
            include:[{
                model: Author ,
                attributes: ['firstname', 'lastname']
            }]
        });
        if(!article){ throw Error('Failed to get to ressources');}
        else{res.status(201).json(article);}
    }
    catch(err){
        console.log(err.message);
        res.status(404).json({
            'error':true,
            'message':err.message
        });
    }
}


//-----------get by author----------------------
const get_articles_by_author = async (req,res)=>{ 
    let id = req.params.uid;
    try{
        const articles = await Article.findAll({
            where: {authorId: id},
            include:[{
                model: Author ,
                attributes: ['firstname', 'lastname']
            }]
        });
        if(!articles){ throw Error('Failed to get to ressources');}
        else{res.status(201).json(articles);}
    }
    catch (err){
        res.status(204).json({
            'error':true,
            'message':"empty ressource"
        });
        console.log(err.message);
    }

}




//--------------------  POST request  --------------------------
const post_create_article =async(req,res)=>{
    // -----  Request body valid schema ---
    const schema =Joi.object({              
        authorId: Joi.number().required(),
        title: Joi.string().min(4).required(),
        description: Joi.string().min(4).required(),
        url: Joi.string().uri(),
        urlToImage: Joi.string().uri(),
        content: Joi.string().min(4).required(),
        category: Joi.string().min(4).required(),
        country: Joi.string().min(2).max(2).required()
    });
    if(req.body){ //request body isn't empty
        console.log(req.body)
        req.body.authorId = parseInt(req.body.authorId);
        validation_data = schema.validate(req.body); // reslut of request body validation
        if(!validation_data.error)
        {   
            await Article.create(req.body).then(()=>{
                console.log('article successfully created');
                res.status(200).json({
                    'error':false,
                    'message':'article successfully created'
                });
            });
        }else{
                res.status(401);
                res.json({
                    'error':true,
                    'message':`${validation_data.error.message}`
                });
                console.log(validation_data.error.message);
        }
    }else{
        res.json({
            'error':true,
            'message':"ressource body is missing"
        });
        console.log('ressource body is missing');
    }
    
}



//---------------------------------  PUT request  ----------------------------
const patch_article = async (req,res)=>{

    let id = req.params.id;
    try{
        let pub = await Article.findOne({id:id});
        res.send('found');
    }
    catch{
        console.log('error: ressource not found');
        res.status(404).json({
            error:true,
            messsage:'post not found'
        });
    }
}


 //---------------------------------  DELETE request  ----------------------------
const delete_article_by_id = async(req,res)=>{
    let id = req.params.id;
    try{
        //await article.deleteOne({id:id});
        res.json({
            error:false,
            messsage:'post successfully deleted'
        }) ;
    }
    catch{
        console.log('error: ressource not found');
        res.status(404).json({
            error:true,
            messsage:'post not found'
        });
    }
}


module.exports = {
    get_news_latest,
    get_by_country,
    get_by_category,
    get_by_id,
    get_articles_by_author,
    post_create_article,
    patch_article,
    delete_article_by_id,
}