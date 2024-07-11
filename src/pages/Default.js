import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import resumeIcon from '../Files/Resume_icon.png';
import Cookies from 'js-cookie';
import api from '../api';
import '../styles/Home.css';

function Default() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userId = Cookies.get('user_id');
        if (userId) {
            // Fetch user data from the backend
            api.get(`/users/${userId}`).then(response => {
                setUser(response.data);
            }).catch(error => {
                console.error('Error fetching user data:', error);
                Cookies.remove('user_id');
                Cookies.remove('session_id');
            });
        }
    }, []);

    const handleLogout = () => {
        api.post('/logout/').then(response => {
            Cookies.remove('user_id');
            Cookies.remove('session_id');
            setUser(null);
            window.location.reload();
        }).catch(error => {
            console.error('Error logging out:', error);
        });
    };

    return (
        <div className="bg-blue-white">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img className="h-16 w-auto" src={resumeIcon} alt=""/> 
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                            <span className="sr-only">Open main menu</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        <Link to="/ResumeMaker" className="text-sm font-semibold leading-6 text-blue-gray">Resume Maker</Link>
                        <Link to="/ResumeViewer" className="text-sm font-semibold leading-6 text-blue-gray">Resume Viewer</Link>
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        {user ? (
                            <div>
                                <span className="text-sm font-semibold leading-6 text-blue-gray">Hello, {user.email}</span>
                                <button onClick={handleLogout} className="ml-4 text-sm font-semibold leading-6 text-blue-gray">Logout</button>
                            </div>
                        ) : (
                            <Link to="/login" className="text-sm font-semibold leading-6 text-blue-gray">Log in <span aria-hidden="true"></span></Link>
                        )}
                    </div>
                </nav>
                <div className="lg:hidden" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 z-50"></div>
                    <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-blue-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700">
                                <span className="sr-only">Close menu</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-300 to-blue-500 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
                </div>
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                    </div>
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-blue-gray sm:text-6xl">Create Your Perfect Resume Today!</h1>
                        <p className="mt-6 text-lg leading-8 text-blue-gray">Effortlessly build stunning resumes with our AI-powered resume builder. Get started in seconds and land your dream job faster.</p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link to="/ResumeMaker" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create Your First Resume Now!</Link>
                            <Link to="/ResumeViewer" className="text-sm font-semibold leading-6 text-blue-gray">View Created Resumes <span aria-hidden="true">→</span></Link>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
                    <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-blue-300 to-blue-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
                </div>
            </div>
        </div>
    );
}

export default Default;
