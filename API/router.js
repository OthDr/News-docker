const express = require('express');

//const routes = require('./routes/v1/api/newsRoute');
//const authorRoutes = require('./routes/v1/api/authorRoute');
const newsRoutes = require('./routes/v2/api/newsRoute');
const authorRoutes2 = require('./routes/v2/api/authorRoute');

const sequelize = require('./data/database');


const morgan = require('morgan');
const port = process.env.PORT || 3000 ; // dinamic port based on machine ports otherwise use 3000


const app = express();

app.use(morgan('dev')); // morgan logger


// database connection 
sequelize.sync().then(()=>{
    console.log("db is ready");
    app.listen(port, ()=>{
        console.log(`Server is listening on port: ${port}`);
    });
});




// ----------- HOME endpoint -------
const get_home = (req,res)=>{
    res.status(200)
    .json({
        error:false,
        message:'home endpoint'
    });
}
app.get('/', get_home);
app.get('/v2', get_home);
app.get('/v2/api', get_home);

//-----------  Authors routes  ----------
//app.use(authorRoutes); //v1
app.use(authorRoutes2);//v2


//-----------  News routes  ----------
//app.use(routes); //v1
app.use(newsRoutes);//v2
    

//-----------  404 status  ----------
app.use((req,res)=>{
    res.status(404).json({
        'error':true,
        'message':"this ressource doesn't exists"
    });
});    



module.exports = app ;