import { useState , useEffect} from "react";
import Article from "./Article";
import { useParams} from 'react-router-dom';

const Single = () => {


	const [article , setArticle] = useState(null);
	const [loading , setLoading] = useState(true);
	const [error , setError] = useState(null);

	const {id} = useParams();

	useEffect(()=>{
	        setArticle(null);
	        fetch('http://localhost:3000/v2/api/news/'+id)
	        .then(res => {
	            if(!res.ok){
	                throw Error('Sorry! Could not find the ressource');
	            }else{
	                return res.json();
	            }
	        })
	        .then((data)=>{
	            setArticle(data);
	            setLoading(false);
	            setError(null);
	        })
	        .catch((err) => {
	            setLoading(false);
	            setError(err.message);
	        });
	},[]);

	return(
		<div className="main-single-article">

			{error && <div className="error"> {error} </div>}
	        {loading && <div className="loading">Loading..</div>}
	        { article &&
			<div className="single-article" >
		        <h2><span>Title : </span>  {article.title} </h2>
	            <img src={article.urlToImage}></img>
	            <h4>description:</h4>
	            <p>description :{article.description}</p>
	            <p>{article.content}</p>
	            <h5>by : {article.author.firstname +' '+article.author.lastname}</h5>
	            <span> { article.createdAt.split('T')[0] }</span>
        	</div>
        	}
		</div>
	);
}

export default Single ;