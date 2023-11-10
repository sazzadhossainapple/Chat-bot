import React from 'react';
import './home.css';
import { FcGoogle } from 'react-icons/fc';

function Home() {
    return (
        <div className="home-container">
            <button className="btn">
                <FcGoogle /> Login
            </button>
        </div>
    );
}

export default Home;
