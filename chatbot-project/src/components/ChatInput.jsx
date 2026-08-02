import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import './ChatInput.css'
import LoadingImage from '../assets/loading-spinner.gif'

export function ChatInput({ chatMessages, setChatMessages }) {
    const [inputText, setInputText] = useState('');

    function saveInputText(event) {
        setInputText(event.target.value);
    }

    async function sendMessage() {
        // 공백 입력 방지
        if (!inputText.trim()) return;

        const userText = inputText;
        setInputText('');

        const newChatMessages = [
        ...chatMessages,
        {
            message: userText,
            sender: 'user',
            id: crypto.randomUUID()
        }
        ];

        setChatMessages([
        ...newChatMessages,
        {
            message: <img src={LoadingImage} className="loading-spinner" />,
            sender: 'robot',
            id: crypto.randomUUID()
        }
        ]);

        const response = await Chatbot.getResponseAsync(userText);
        setChatMessages([
        ...newChatMessages,
        {
            message: response,
            sender: 'robot',
            id: crypto.randomUUID()
        }
        ]);
    }

    function clearMessage() {
        localStorage.clear();
        setInputText('');
        setChatMessages([]);
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
        sendMessage();
        } else if (event.key === 'Escape' || event.key === 'Esc') {
        setInputText('');
        }
    }

    return (
        <div className="chat-input-container">
        <input
            placeholder="Send a message to Chatbot"
            size="30"
            onChange={saveInputText}
            onKeyDown={handleKeyDown}
            value={inputText}
            className="chat-input"
        />
        <button
            onClick={sendMessage}
            className="send-button"
        >
            Send
        </button>
        <button
            onClick={clearMessage}
            className="clear-button"
        >
            Clear
        </button>
        </div>
    );
}