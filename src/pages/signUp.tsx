import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../api/authService.ts';
import { toast } from 'react-toastify';
import { showError } from '../utils/showToast.ts';

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            toast.error('Please fill in all fields');
        } else if (password !== confirmPassword) {
            setError('Passwords do not match');
            toast.error('Passwords do not match');
        } else {
            try {
                const user = await signUp({ name, email, password, role: 'staff' });
                if (user.message) {
                    navigate('/');
                }
            } catch (error) {
                showError(error);
            }
        }
    };

    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-red-950 to-black flex items-center justify-center px-4">
            <div className="w-full max-w-4xl flex flex-col md:flex-row bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-red-500 transform transition-all hover:scale-[1.02] hover:border-red-400 duration-300">
                {/* Left Side: Library Image */}
                <div
                    className="md:w-1/2 h-64 md:h-auto bg-cover bg-center bg-gray-900"
                    style={{ backgroundImage: 'url(https://images.pexels.com/photos/1106468/pexels-photo-1106468.jpeg)' }}
                ></div>

                {/* Right Side: Signup Form */}
                <div className="md:w-1/2 p-6 md:p-10">
                    <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-center text-red-400">Library Sign Up</h2>

                    {error && (
                        <div className="bg-red-900 text-red-200 p-3 rounded-lg mb-6 text-sm animate-pulse">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSignUp} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-white mb-1">Full Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 border border-red-500 rounded-lg text-white bg-gray-800 outline-none focus:ring-2 focus:ring-red-400 transition duration-200 placeholder:text-gray-400 placeholder:italic"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="Enter your full name"
                            />
                        </div>

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

                        <div>
                            <label className="block text-sm font-medium text-white mb-1">Confirm Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 border border-red-500 rounded-lg text-white bg-gray-800 outline-none focus:ring-2 focus:ring-red-400 transition duration-200 placeholder:text-gray-400 placeholder:italic"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="Confirm your password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-200 font-semibold text-lg"
                        >
                            Sign Up
                        </button>
                    </form>

                    <p className="mt-4 text-center text-sm text-white">
                        Already have an account?{' '}
                        <Link
                            to="/"
                            className="font-medium text-red-400 hover:text-red-200 focus:outline-none focus:underline transition ease-in-out duration-150"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;