import { useEffect, useState } from 'react'
import { ChatInput } from './components/ChatInput'
import ChatMessages from './components/ChatMessages'
import { Chatbot } from 'supersimpledev'
import './App.css'

function App() {
        const [chatMessages, setChatMessages] = useState(() => {
          const saved = localStorage.getItem('messages');
          return saved ? JSON.parse(saved) : [];
        });

        useEffect(() => {
          Chatbot.addResponses({
            'hello' : 'Hi there! How can I help you?',
            'how are you' : 'I am doing great, thanks for asking!',
            'life is good' : 'I think so too.'
          });
        }, []);

        useEffect(() => {
          localStorage.setItem('messages', JSON.stringify(chatMessages));
        }, [chatMessages]);

        return (
          <div className="app-container">
            {chatMessages.length === 0 && (
              <p className="welcome-message">
                Welcome to the chatbot project! Send a message using the textbox below.
              </p>
            )}
            <ChatMessages
              chatMessages={chatMessages}
            />
            <ChatInput
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
            />
          </div>
        );
      }

export default App
