import React from 'react';
import { Link } from 'react-router-dom';
import './errorPage.css';

function ErrorPage() {
    return (
        <div className="">
            <h1 className="mb-1">404 Error</h1>
            <p className="text-center">
                <b>Opps! Page not found.</b>
            </p>
            <p className="zoom-area">
                The page you’re looking for doesn’t exist.
            </p>

            <section className="error-container">
                <span className="four">
                    <span className="screen-reader-text">4</span>
                </span>
                <span className="zero">
                    <span className="screen-reader-text">0</span>
                </span>
                <span className="four">
                    <span className="screen-reader-text">4</span>
                </span>
            </section>
            <div className="link-container">
                <Link to="/" class="more-link">
                    Back Home
                </Link>
            </div>
        </div>
    );
}

export default ErrorPage;
