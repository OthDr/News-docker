import { useState , useEffect} from "react";
import { useNavigate } from 'react-router-dom';

import ArticleValidation from "./ArticleValidation";


const  Author = () => {

	const accessToken = window.localStorage.getItem("accessToken");

	let headers = new Headers();
	headers.append('authorization','bearer '+accessToken);
	//console.log(accessToken);

    const [errors, setErrors] = useState({});

	const [profile , setProfile] = useState({});

    const [email , setEmail] = useState(null);
    const [firstname , setFname] = useState(null);
    const [lastname , setLname] = useState(null);
    const [authorId , setId] = useState(null);

    const [loading , setLoading] = useState(true);
    const [error , setError] = useState(null);


    const [err, setErr] = useState(null);
    const [isPending , setISPending] = useState(false);
    const [article , setArticle] = useState({
        title:"",
        country:"",
        category:"",
        urlToImage:"",
        description:"",
        content:""
    });

    let navigate = useNavigate(); 
    

    const logoutClick = (e) => {
        e.preventDefault();
        //localStorage.removeItem('accessToken');
        localStorage.clear();
        navigate('/signup');
    }


    const handleChange = (e) => {
        setArticle({

            ...article, [e.target.name]:e.target.value,
        });
    }

    useEffect(()=>{
        setProfile(null);
        fetch('http://localhost:3000/v2/api/authors/me',{
        	method: 'GET',
        	headers: headers,
        })
        .then(res => {
            if(!res.ok){
                throw Error('Oops ! something wrong happened');
            }else{
                return res.json();
            }
        })
        .then( (data) => {
            console.log(data);
            setEmail(data.email);
            get_user(data.email);
            setLoading(false);
            setError(null);
            console.log(profile);
        })
        .catch( (err) => {
            setLoading(false);
            setError(err.message);
            navigate('/signup');
        });
    },[]);

    const handleClick = (e) => {
        console.log("clickeeeeeeeeeeeeeeeeed");
        e.preventDefault();
        setErrors(ArticleValidation(article));
        console.log(article.title);

        if(isPending == false){
            if(!errors.title && !errors.content ){  
                let req_article = article;
                req_article.authorId = authorId;
                const req_body = req_article;
                console.log(authorId)
                setISPending(true);
                    fetch('http://localhost:3000/v2/api/news/article', {
                        method: 'POST',
                        headers: { "Content-Type":"application/json" },
                        body: JSON.stringify(req_article)
                    })
                    .then(async (response)=>{
                        const res = await response.json();
                        setISPending(false);
                        if(res.error == false){
                            navigate('/');
                        }
                    })
                    .catch((e)=>{
                        console.log(e.message);
                        setErr(e.message);
                        setISPending(false);
                    });
            }
        }
    }

    const get_user = (email) => {
        if(email){
            fetch('http://localhost:3000/v2/api/authors/email='+email)
            .then(res => {
                if(!res.ok){
                    throw Error('Sorry! Could not find the ressource');
                }else{
                    return res.json();
                }
            })
            .then( (data) => {
                setProfile(data);
                console.log(data);
                setEmail(data.email);
                setFname(data.firstname);
                setLname(data.lastname);
                setId(parseInt(data.id));
                console.log(data.id)
                setLoading(false);
                setError(null);
            })
            .catch( (err) => {
                setLoading(false);
                setError(err.message);
                console.log(error);
            });
        }
    }


    return (  
        <div className="page-profile">

            {error && <div className="error"> {error} </div>}
        	{!error &&
                
                <div className="main-profile">

                    <h1>Author Profile</h1>

                    <div className="logout-container">
                        <button onClick={logoutClick}>Disconnect</button>
                    </div>

                    <div className="profile-infos">
                        <h4 onChange={handleChange} name="authorId">{authorId}</h4> 
                        <h4>email: {email} </h4> 
                        <h4>firstname: {firstname} </h4>
                        <h4>lastname: {lastname} </h4>
                    </div>
                    

                    <div className="add-article">

                        <label htmlFor="title">title</label> 
                        <input 
                        className="title-input"
                        type="text"  
                        name="title"
                        onChange={handleChange}
                        />
                        {errors.title &&
                            <p className="error-msg">{errors.title}</p> 
                        }

                        <label htmlFor="country">country</label> 
                        <input 
                        className="country-input"
                        type="text"  
                        name="country"
                        onChange={handleChange}
                        />
                        {errors.country &&
                            <p className="error-msg">{errors.country}</p> 
                        }

                        <label htmlFor="category">category</label> 
                        <input 
                        className="category-input"
                        type="text"  
                        name="category"
                        onChange={handleChange}
                        />
                        {errors.category &&
                            <p className="error-msg">{errors.category}</p> 
                        }




                        <label htmlFor="urlToImage">image url</label> 
                        <input 
                        className="urlToImage-input"
                        type="text"  
                        name="urlToImage"
                        onChange={handleChange}
                        />

                        <label htmlFor="description">description</label> 
                        <textarea 
                        className="description-input"
                        type="text"  
                        name="description"
                        onChange={handleChange}
                        >
                        </textarea>
                        {errors.description &&
                            <p className="error-msg">{errors.description}</p> 
                        }

                        <label htmlFor="content">content</label> 
                        <textarea 
                        className="content-input"
                        type="text"  
                        name="content"
                        onChange={handleChange}
                        >
                        </textarea>
                        {errors.content &&
                            <p className="error-msg">{errors.content}</p> 
                        }

                        {isPending &&
                            <div className="or"> pending.. </div> 
                        }

                        <button onClick={handleClick}>create</button>


                    </div>
                </div>
            }
        </div>
    );
}

export default Author;