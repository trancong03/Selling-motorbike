import React from 'react';

const IntroductionSection = () => {
    return (
        <section className="bg-gray-100 py-16">
            <div className="container mx-auto px-6 md:px-12 text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Our Website</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, 
                    nisl nisi scelerisque justo, eu suscipit justo nisi vel velit. Quisque vestibulum, ex eget elementum
                    volutpat, arcu massa lacinia nisl, nec auctor eros lorem eu nunc. Phasellus vel libero nec sapien 
                    tincidunt bibendum.
                </p>
                <div className="flex justify-center gap-6 mt-8">
                    <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700">
                        Learn More
                    </button>
                    <button className="px-6 py-3 bg-gray-200 text-gray-800 font-bold rounded-md hover:bg-gray-300">
                        Contact Us
                    </button>
                </div>
            </div>
        </section>
    );
};

export default IntroductionSection;
