import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    formData: {
        hcpName: '',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        type: 'Meeting',
        attendees: '',
        topics: '',
        materials: [],
        samples: [],
        sentiment: 'Neutral',
        outcomes: '',
        followUpActions: ''
    },
    chatMessages: [
        {
            id: 1,
            sender: 'ai',
            text: 'Log interaction details here (e.g., "Met Dr. Smith, discussed Product X efficacy, positive sentiment, shared brochure") or ask for help.'
        }
    ],
    aiSuggestions: [
        "+ Schedule follow-up meeting in 2 weeks",
        "+ Send OncoBoost Phase III PDF",
        "+ Add Dr. Sharma to advisory board invite list"
    ]
};

const interactionSlice = createSlice({
    name: 'interaction',
    initialState,
    reducers: {
        updateField: (state, action) => {
            const { field, value } = action.payload;
            state.formData[field] = value;
        },
        addMessage: (state, action) => {
            state.chatMessages.push({
                id: Date.now(),
                sender: 'user',
                text: action.payload
            });
            // Mock AI response
            state.chatMessages.push({
                id: Date.now() + 1,
                sender: 'ai',
                text: "I've updated the interaction details based on your input."
            });
        },
        addMaterial: (state, action) => {
            state.formData.materials.push(action.payload);
        },
        setSentiment: (state, action) => {
            state.formData.sentiment = action.payload;
        }
    }
});

export const { updateField, addMessage, addMaterial, setSentiment } = interactionSlice.actions;
export default interactionSlice.reducer;
