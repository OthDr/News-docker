import { useState , useEffect} from "react";
import Article from "./Article";

const ArticlesList = () => {

    const [articles , setArticle] = useState(null);
    const [loading , setLoading] = useState(true);
    const [error , setError] = useState(null);

    const [authorId , setId] = useState(null);
    
    useEffect(()=>{
        setArticle(null);
        fetch('http://localhost:3000/v2/api/news')
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
            setId(data.id)
            setError(null);
        })
        .catch((err) => {
            setLoading(false);
            setError(err.message);
        });
    },[]);
    return (
        <div className="articles-list">
            {error && <div className="error"> {error} </div>}
            {loading && <div className="loading">Loading..</div>}
            {
                articles &&
                articles.map( (article) => (
                    <Article article={article}  key={article.id}/>
                ))
            }
        </div>
    );
}

export default ArticlesList;