import React from 'react'
import img1 from '../../src/assets/img-1.jpg'
import img2 from '../../src/assets/img-2.jpg'
import img3 from '../../src/assets/img-3.jpg'
import img4 from '../../src/assets/img-4.jpg'
import img5 from '../../src/assets/img-5.jpg'
import img6 from '../../src/assets/img-6.jpg'
import { MdEmail } from 'react-icons/md'
import { FaFacebookSquare, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { RxLinkedinLogo } from "react-icons/rx";
import { Link } from 'react-router'


export default function AboutUsPage() {
    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4 sm:p-8">
            <div className='max-w-11/12 w-full bg-white rounded-2xl shadow-xl overflow-hidden'>
                <div className='bg-blue-600 text-white p-8 text-center rounded-t-2xl'>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2">About Our Website</h1>
                    <p className="text-lg opacity-80">Building a better experience, together.</p>
                </div>
                <div className='p-6 sm:p-10 space-y-12'>
                    <section className="text-center">
                        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
                        <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            Welcome to our platform! We are dedicated to providing insightful and useful resources to help you with your daily tasks. Our goal is to create a seamless and enjoyable experience, making complex information accessible and easy to understand. We believe in the power of simplicity and clarity to empower our users.
                        </p>
                    </section>
                    {/* what we offer section */}
                    <section className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Transparency</h3>
                            <p className="text-gray-600">
                                We are committed to open and honest communication. Our goal is to provide you with all the information you need, without any hidden clauses.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">User-Centric</h3>
                            <p className="text-gray-600">
                                Your needs are at the heart of our design. We continuously work to improve our platform based on your feedback and suggestions.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Innovation</h3>
                            <p className="text-gray-600">
                                We constantly explore new technologies to deliver innovative solutions and features that make your life easier and more productive.
                            </p>
                        </div>
                    </section>
                    {/* photo sections */}
                    <section>
                        <h2 className='text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center'>Photo Gallery</h2>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
                                <img src={img1} alt="Photo of the team" className="object-cover w-full h-full" />
                            </div>
                            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
                                <img src={img2} alt="Photo of the office" className="object-cover w-full h-full" />
                            </div>
                            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
                                <img src={img3} alt="Photo of a team meeting" className="object-cover w-full h-full" />
                            </div>
                            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
                                <img src={img4} alt="Photo from an event" className="object-cover w-full h-full" />
                            </div>
                            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
                                <img src={img5} alt="Photo from a celebration" className="object-cover w-full h-full" />
                            </div>
                            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
                                <img src={img6} alt="Photo from a product launch" class="object-cover w-full h-full" />
                            </div>
                        </div>
                    </section>
                    {/* contact information */}
                    <section>
                        <h2 class="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center">Contact Us</h2>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div class="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                <h3 class="text-xl font-bold text-gray-800 mb-2">Get in Touch</h3>
                                <p class="text-gray-600 mb-4">Have a question or a suggestion? We'd love to hear from you!</p>
                                <ul class="space-y-2 text-gray-700">
                                    <li class="flex items-center space-x-2">
                                        <span class="text-blue-500">
                                            <MdEmail></MdEmail>
                                        </span>
                                        <span>smmutasim7@gmail.com</span>
                                    </li>
                                    <li class="flex items-center space-x-2">
                                        <span class="text-blue-500">
                                            <FaWhatsapp></FaWhatsapp>
                                        </span>
                                        <span>+880 1795-400015</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                <h3 class="text-xl font-bold text-gray-800 mb-2">Also find</h3>
                                <p class="text-gray-600 mb-4">Stay updated with our latest news and announcements.</p>
                                <div class="flex space-x-4">

                                    <a
                                        href="https://www.facebook.com/mutasimBillah7"
                                        target='_blank'
                                        className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                                        <FaFacebookSquare className='text-blue-500 text-2xl'></FaFacebookSquare>
                                    </a>
                                    <a
                                        target='_blank'
                                        href="https://www.instagram.com/smmutasim__billah/?hl=en" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                                        <FaInstagram className='text-red-500 text-2xl'></FaInstagram>
                                    </a>
                                    <a href="https://www.linkedin.com/in/smmutasim7/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                                        <RxLinkedinLogo className='text-blue-500 text-2xl'></RxLinkedinLogo>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* redirect to home */}
                    <section class="text-center bg-blue-50 p-8 rounded-2xl shadow-inner">
                        <h2 class="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">Ready to Get Started?</h2>
                        <p class="text-gray-600 max-w-2xl mx-auto mb-6">
                            Join our community and discover all the features our platform.
                        </p>
                        <Link to='/home' class="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300">Start Your Journey</Link>
                    </section>
                </div>
            </div>
        </div>
    )
}
