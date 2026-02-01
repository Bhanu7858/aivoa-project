import React from 'react';
import InteractionForm from './InteractionForm';
import AIChatWindow from './AIChatWindow';

const LogInteractionPage = () => {
    return (
        <div className="h-[calc(100vh-64px)] overflow-hidden">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 px-1">Log HCP Interaction</h1>
            <div className="flex gap-4 h-[calc(100%-60px)]">
                <div className="w-[60%] h-full">
                    <InteractionForm />
                </div>
                <div className="w-[40%] h-full">
                    <AIChatWindow />
                </div>
            </div>
        </div>
    );
};

export default LogInteractionPage;
