import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { signIn } = useAuth();
    const fromPage = location.state?.from || '/';

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const user = form.username.value;
        signIn(user, () => navigate(fromPage, {replace: true})); 
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name: <input type="text" name="username"/>
                </label>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default LoginPage;