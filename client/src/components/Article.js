import { useState } from "react";
const Article = ({article}) => {

	const article_id = article.id ;

    return (  
        <div className="article-preview" key={article.id}>

            <a href={`/article/${article.id}`}>  Title:  {article.title} </a>
            <img src={article.urlToImage}></img>
            <p>Description: {article.description}</p>
            <span> { article.createdAt.split('T')[0] }</span>
        </div>
    );
}
export default Article;