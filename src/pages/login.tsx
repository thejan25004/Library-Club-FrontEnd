import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/authService.ts';
import { useAuth } from '../context/useAuth.ts';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login: authenticate } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const user = await login({ email, password });
            authenticate(user.accessToken);
            navigate('/dashboard');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.message);
            } else {
                setError('Something went wrong');
                toast.error('Something went wrong');
            }
        }
    };

    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-red-950 to-black flex items-center justify-center px-4">
            <div className="w-full max-w-4xl flex flex-col md:flex-row bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-red-500 transform transition-all hover:scale-[1.02] hover:border-red-400 duration-300">
                {/* Left Side: Library Image */}
                <div className="md:w-1/2 h-64 md:h-auto bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/1106468/pexels-photo-1106468.jpeg)' }}>
                </div>

                {/* Right Side: Login Form */}
                <div className="md:w-1/2 p-6 md:p-10">
                    <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-center text-red-400">Library Login</h2>

                    {error && (
                        <div className="bg-red-900 text-red-200 p-3 rounded-lg mb-6 text-sm animate-pulse">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-white mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 border border-red-500 rounded-lg text-white bg-gray-800 outline-none focus:ring-2 focus:ring-red-400 transition duration-200 placeholder:text-gray-400 placeholder:italic"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white mb-1">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 border border-red-500 rounded-lg text-white bg-gray-800 outline-none focus:ring-2 focus:ring-red-400 transition duration-200 placeholder:text-gray-400 placeholder:italic"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-200 font-semibold text-lg"
                        >
                            Login
                        </button>
                    </form>

                    <p className="mt-4 text-center text-sm text-white">
                        Don't have an account?{' '}
                        <Link
                            to='/signup'
                            className="font-medium text-red-400 hover:text-red-200 focus:outline-none focus:underline transition ease-in-out duration-150"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;