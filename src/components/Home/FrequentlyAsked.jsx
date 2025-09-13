"use client";

import React, { useState } from "react";
export default function GradientAccordion() {
    const faqData = [{
        question: "How do I upload my notes??",
        answer: "Click Dashboard on the homepage, then select Become a Contributor to upload your notes and join our growing community"
    }, {
        question: "Is Note-Hive free to use??",
        answer: "Yes, Note-Hive is completely free for all users. We believe that access to educational resources should be available to everyone."
    }, {
        question: "Can I edit the notes I find?",
        answer: "Notes on Note-Hive are read-only to preserve the integrity of the original content. However, you can download them for personal use and make your own edits.Notes on Note-Hive are read-only to preserve the integrity of the original content. However, you can download them for personal use and make your own edits."
    }, {
        question: "How does Note-Genius work?",
        answer: "Note-Genius uses an AI model to generate a structured draft of notes based on the topic you provide. It's a great way to get started or summarize a subject quickly."
    }];
    return <div className="max-w-11/12 bg-gray-100 dark:bg-gray-800 rounded-xl px-10 md:px-16 lg:px-20 py-16 mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center">
            Frequently Asked Questions
        </h1>
        <p className="my-2 text-gray-700 text-center dark:text-gray-400">Find answers to the most common questions about our platform.</p>
        <div className="space-y-4">
            {faqData.map((item, index) => <AccordionItem key={index} question={item.question} answer={item.answer} />)}
        </div>
    </div>;
}
function AccordionItem({
    question,
    answer
}) {
    const [isOpen, setIsOpen] = useState(false);
    return <div className="p-0.5 rounded-lg bg-gradient-to-r from-cyan-400 to-pink-500 dark:from-cyan-500 dark:to-pink-600">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-md">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left p-4 focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ">
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                    {question}
                </span>
                <span className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>

            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-300">{answer}</p>
                </div>
            </div>
        </div>
    </div>
}