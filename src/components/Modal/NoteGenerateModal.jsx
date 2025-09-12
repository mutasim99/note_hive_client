import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { ImSpinner9 } from 'react-icons/im';
import NoteCard from '../card/NoteCard';

const NoteGenerateModal = ({ isOpen, setIsOpen }) => {
    const [topic, setTopic] = useState('');
    const [generatedNote, setGeneratedNote] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const generateNote = async () => {
        if (!topic) {
            setError('please enter a topic');
            return;
        }
        setIsLoading(true);
        setGeneratedNote(null);
        setError(null);
        try {
            const apiKey = import.meta.env.VITE_GEMINI_APIKEY;

            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

            const systemPrompt = `You are an expert academic note-taker and educator. Your task is to generate a comprehensive, well-structured, and easy-to-read set of class notes on the user's provided topic.
            Format your response using the following structure:

            1. Title: Provide a clear, descriptive title for the notes. 
            2. Introduction: Write 2-3 sentences explaining the importance and context of the topic. 
            3. Key Concepts: Use concise bullet points to highlight main ideas, definitions, and explanations. Each point should be informative and student-friendly. 
            4. Summary: End with a short recap (3-4 sentences) that reinforces the key takeaways.

            Guidelines:
            - Keep the overall response length around 3-4 paragraphs. 
            - Ensure clarity, accuracy, and logical flow. 
            - Write in a formal but approachable tone, suitable for students. 
            - Preserve proper formatting (headings, bullet points, line breaks) for readability.
            - Do not include extra commentary, instructions, or irrelevant content.`;

            const userQuery = `Generate notes on the topic: "${topic}".`;

            const payload = {
                contents: [{ parts: [{ text: userQuery }] }],
                systemInstruction: { parts: [{ text: systemPrompt }] } // This is an object
            }

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (text) {
                setGeneratedNote({
                    title: `Notes on ${topic}`,
                    content: text
                });
            } else {
                throw new Error("Failed to generate note. Please try again.");
            }

        } catch (error) {
            console.log(error);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className='text-white bg-gray-800'>
                <DialogHeader>
                    <DialogTitle>Note-Genius ✨</DialogTitle>
                </DialogHeader>
                <p className="text-gray-400 mb-6">Enter a topic and let our AI generate a draft note for you!</p>
                <div className="mb-6">
                    <input
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        type="text"
                        placeholder="e.g., The Water Cycle"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                    />
                </div>
                <div className="flex justify-end mb-6">
                    <button
                        onClick={generateNote}
                        disabled={isLoading}
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {isLoading ? (
                            <ImSpinner9 className='text-xl font-medium text-green-500 animate-spin'></ImSpinner9>
                        ) : (
                            'Generate Note ✨'
                        )}
                    </button>
                </div>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                {
                    generatedNote && (
                        <div className='mt-8'>
                            <h3 className="text-xl font-bold text-gray-300 mb-4">Your Generated Note</h3>
                            <NoteCard
                                title={generatedNote.title}
                                content={generatedNote.content}
                                course='AI Generated'
                                uploader='Note-Genius ✨'
                            ></NoteCard>
                        </div>
                    )
                }
            </DialogContent>
        </Dialog>
    );
};

export default NoteGenerateModal;