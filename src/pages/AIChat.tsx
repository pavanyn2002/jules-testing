import React, { useState, useEffect, useRef } from 'react';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Mock AI response
    setTimeout(() => {
      const aiResponse: Message = {
        text: "This is a mocked response. To enable the real AI assistant, please provide an API key.",
        sender: 'ai'
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-4xl font-thin mb-6 text-center text-noir-accent">AI Quant Assistant</h1>

      <div className="flex flex-col h-[70vh] border border-noir-border rounded-lg bg-gray-900 shadow-lg shadow-noir-accent/10">
        {/* Message Display Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`p-3 rounded-lg max-w-lg ${
                  msg.sender === 'user'
                    ? 'bg-noir-accent text-noir-bg'
                    : 'bg-gray-800 text-noir-text'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
                <div className="p-3 rounded-lg bg-gray-800 text-noir-text">
                    Thinking...
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-noir-border">
          <div className="flex">
            <input
              type="text"
              className="flex-1 p-2 rounded-l-lg bg-gray-800 border border-noir-border text-noir-text focus:ring-2 focus:ring-noir-accent focus:outline-none"
              placeholder="Ask a question about quantitative finance..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
              disabled={isLoading}
            />
            <button
              className="bg-noir-accent text-noir-bg font-bold px-6 rounded-r-lg transition-colors duration-300 hover:bg-opacity-80 disabled:bg-gray-500"
              onClick={handleSend}
              disabled={isLoading}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
