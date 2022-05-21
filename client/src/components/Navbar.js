const  Navbar = () => {
    return (  
        <nav className="navbar">
            <h1>Doth News</h1>
            <div className="links">
                <a href="/" >Latest News</a>
                <a href="/author">Profile</a>
                <a href="/Register">Login</a>
            </div>
        </nav>
    );
}

export default Navbar;