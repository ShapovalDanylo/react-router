import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div>
            <div>
                <h1>HEADER</h1>
                <NavLink to="/" style={{margin: "10px"}}>HomePage</NavLink>
                <NavLink to="/about" style={{margin: "10px"}}>AboutPage</NavLink>
                <NavLink to="/posts" style={{margin: "10px"}}>PostsPage</NavLink>
            </div>     
            <Outlet />
            <div>
                FOOTER
            </div>
        </div>
    );
};

export default Layout;