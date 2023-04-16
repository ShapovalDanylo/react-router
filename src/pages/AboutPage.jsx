import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AboutPage = () => {
    return (
        <div>
            <h1>ABOUTPAGE</h1>
            <ul>
                <li>
                    <Link to="contacts">Our Contacts</Link>
                </li>
                <li>
                    <Link to="team">Our Team</Link>
                </li>
            </ul>
            <Outlet />
            {/* <Routes>
                <Route path="contacts" element={<p>Contacts</p>} />
                <Route path="team" element={<p>Team</p>} />
            </Routes> */}
        </div>
    );
};

export default AboutPage;