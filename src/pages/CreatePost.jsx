import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const { signOut } = useAuth();
    const nagivate = useNavigate();

    return (
        <div>
            <h1>CreatePost</h1>
            <button onClick={() => signOut(() => nagivate('/', {replace: true}))}>Sign out</button>
        </div>
    );
};

export default CreatePost;