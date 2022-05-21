import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import Signup from './components/Signup'
import Register from './components/Register'
import Single from './components/Single'
import Author from './components/Author'


import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App({article_id}) {
  return (
	 <Router>
	 	<div className="App">
	      <Navbar />
	      
	      <div className="content">
	      
	        <Routes>
	        	<Route  exact path="/" element={<Home/>} />
	        	<Route  exact path="/register" element={<Register/>} />
	        	<Route exact path="/signup" element={<Signup/>} />} />
	        	<Route exact path="/author" element={<Author/>} />} />
	        	<Route exact path="/article/:id" element={<Single article_id ={article_id} />} />
	        </Routes>
	        
	      <Footer />
	      </div>
	    </div>
	 </Router>


  );
}

export default App;
