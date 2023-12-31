import React, { useContext, useState } from 'react';
import './home.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext/UserContext';
import toast from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

function Home() {
    const { logInUser } = useContext(AuthContext);
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;

        // Check if email is empty
        if (!email.trim()) {
            setEmailError('Email is required');
            return;
        }

        // Check if password is empty
        if (!password.trim()) {
            setPasswordError('Password is required');
            return;
        }

        logInUser(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                form.reset();
                toast.success('User login successfully');
                navigate('/dashboard');
            })
            .catch((err) => {
                console.error(err);
                toast.error(err.message);
            });
    };

    return (
        <div className="home-container">
            <div className="form-content shadow">
                <h3 className="text-white mb-3 text-center">Sign In</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label text-white label-text">
                            Email address
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="form-control py-2"
                        />
                        <p
                            className="text-danger mt-1"
                            style={{ fontSize: '12px' }}
                        >
                            {emailError}
                        </p>
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-white label-text">
                            Password
                        </label>

                        <div className="position-relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                className="form-control py-2 me-3"
                            />
                            <span className="eye-icon">
                                {showPassword ? (
                                    <>
                                        <AiFillEye
                                            onClick={togglePassword}
                                            className="login-icon"
                                        ></AiFillEye>
                                    </>
                                ) : (
                                    <>
                                        <AiFillEyeInvisible
                                            onClick={(e) => setShowPassword(e)}
                                            className="login-icon"
                                        ></AiFillEyeInvisible>
                                    </>
                                )}
                            </span>
                            <p
                                className="text-danger mt-1"
                                style={{ fontSize: '12px' }}
                            >
                                {passwordError}
                            </p>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-submit w-100">
                        Submit
                    </button>
                </form>
                <div className="mt-3">
                    <div className="form-text login-text">
                        Create a New account?{' '}
                        <Link
                            to="/sign-up"
                            className="Link text-white link-text"
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
