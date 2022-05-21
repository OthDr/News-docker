const Author = require('../../../../models/author');
const Joi = require('joi');
const jwt = require('../../jwt');


//-------- get actual user ------------
const get_me = async (req,  res) =>{

    res.send(req.author);
}

//-----------get an author by id ----------
const get_byID_author = async (req,res) =>{
    let id = req.params.id;
    try{
        const  author = await Author.findByPk(id,{attributes: ['id','firstname', 'lastname','email']});
        if(author == null){ throw Error('no such a ressource');}
        else{res.status(201).json(author);}
    }
    catch(err){
        console.log(err.message);
        res.status(404).json({
            'error':true,
            'message':err.message
        });
    }
}

//---------------get an author by email -----
const get_by_email = async (req,res) => {
    let email = req.params.email;
    try{
        const  author = await Author.findOne({where: {email: email},attributes: ['id','firstname', 'lastname','email'] });
        if(author == null){ throw Error('no such a ressource');}
        else{res.status(201).json(author);}
    }
    catch(err){
        console.log(err.message);
        res.status(404).json({
            'error':true,
            'message':err.message
        });
    }
}


//-----------get all authors ----------
const get_all_authors = async (req,res) =>{
    try{
        const authors = await Author.findAll({attributes: ['firstname', 'lastname','email']});
        if(authors.length < 1 ){ throw Error('no such a ressource');}
        else{res.status(201).json(authors);}
    }
    catch(err){
        console.log(err.message);
        res.status(404).json({
            'error':true,
            'message':err.message
        });
    }
}

const isUsed = async (emailx) => {
    const author = await Author.findOne({where : { email:emailx } });
    if (!author) {return false;}
    else { return true;}
}
//-----------create author ----------
const post_create_author = async (req,res)=>{
    // -----  Request body valid schema ---
    const schema =Joi.object({              
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    
    if(req.body){ //request body isn't empty
        validation_data = schema.validate(req.body); // reslut of request body validation
        if(!validation_data.error)
        {   const result = await Author.count({where : { email:req.body.email } });
            if(result==0){
                try{
                    await Author.create(req.body);
                    console.log('author successfully created');
                    res.json({
                        'error':false,
                        'message':'author successfully created'
                    });
                }
                catch(err){
                    console.log(err.message);
                    res.json({
                        'error':true,
                        'message':err.message
                    });
                }
            } else {
                res.json({
                    'error':true,
                    'message':'email address is already used'
                });
            }
            
        }else{
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

//-----------login author ----------
const post_login_author = async (req,res)=>{
    // -----  Request body valid schema ---
    const schema =Joi.object({
        email: Joi.string().required(),
        password : Joi.string().required()
    });
    if(req.body){ //request body isn't empty
        validation_data = schema.validate(req.body); // reslut of request body validation
        if(!validation_data.error)
        {   
            let result = await Author.count({where : { email:req.body.email , password:req.body.password }});
                    if(result > 0){
                        console.log('author successfully logged in');
                        res.json({
                            'accessToken': jwt.generateAccessToken(req.body) ,
                            'error':false,
                            'message':'author successfully logged in'
                        });
                    } else {
                        res.status(401).json({
                            'error':true,
                            'message':'invalid credentials'
                        });
                    }
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


//---- * PUT * update user email -------------
const update_author_email = async (req,res) =>{

    let id = req.params.id;
    try{
        const author = await Author.findByPk(id)
        if(!author){ throw Error('Failed to get to ressources');}
        else{
            author.email = req.body.email;
            await author.save();
            res.status(201).json(author);
        }
    }
    catch(err){
        console.log(err.message);
        res.status(404).json({
            'error':true,
            'message':err.message
        });
    }
}

//---- * DELETE * delete user email -------------
const delete_author = async (req,res) =>{
    let id = req.params.id;
    const author = await Author.findByPk(id)
        if(!author){
            res.status(401).json({
                'error':true,
                'message':"user doesn't exists"
            });
        }
        else{
            try{
                const author = await Author.destroy({where: {uuid: id}});
                res.status(200).json({
                    'error':false,
                    'message':'author successfully deleted'
                });
            }
            catch(err){
                console.log(err.message);
                res.status(401).json({
                    'error':true,
                    'message':err.message
                });
            }
        }
    
}





module.exports = {
    get_me,
    get_byID_author,
    get_by_email,
    get_all_authors,
    post_create_author,
    post_login_author,
    update_author_email,
    delete_author
};