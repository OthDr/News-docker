import ArticlesList from "./ArticlesList";
import Register from "./Register";
const Home = () => {

    return ( 
        <div className="home">
            <h1 className="news-header">Latest news</h1>
            <ArticlesList />
        </div>
    );
   
}


export default Home;