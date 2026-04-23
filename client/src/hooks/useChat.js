import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export const useChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi there! I'm DietBuddy 🥗. What's your health goal today? (e.g., lose weight, gain muscle, stay fit)",
      suggestions: ['Lose Weight', 'Gain Muscle', 'Maintain Fitness'],
      links: []
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await axios.post('/api/dialogflow', { text });
      const { reply, suggestions, links } = response.data;

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: reply,
        suggestions: suggestions || [],
        links: links || []
      }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: "Something went wrong. Please try again.",
        suggestions: [],
        links: []
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    sendMessage,
    isLoading,
    isOpen,
    setIsOpen
  };
};
