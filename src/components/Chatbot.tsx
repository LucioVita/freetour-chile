'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface Message {
    id: string;
    role: 'user' | 'bot';
    content: string;
    timestamp: Date;
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'bot',
            content: '¡Hola! Soy Pati, tu asistente virtual. ¿En qué puedo ayudarte hoy?',
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize sessionId securely
    const getSessionId = () => {
        if (typeof window === 'undefined') return '';
        let storedId = localStorage.getItem('chat_session_id');
        if (!storedId) {
            // Robust UUID generation with fallback
            if (typeof crypto !== 'undefined' && crypto.randomUUID) {
                storedId = crypto.randomUUID();
            } else {
                storedId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            }
            localStorage.setItem('chat_session_id', storedId);
        }
        return storedId;
    };

    useEffect(() => {
        setSessionId(getSessionId());
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const handleOpenChat = () => setIsOpen(true);
        window.addEventListener('open-chatbot', handleOpenChat);
        return () => window.removeEventListener('open-chatbot', handleOpenChat);
    }, []);

    const handleSendMessage = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const currentSessionId = getSessionId();
        console.log('Sending message to n8n:', { message: inputValue, sessionId: currentSessionId });

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await fetch('https://n8n.resto.guruweb.com.ar/webhook/carlos-responde', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage.content,
                    sessionId: currentSessionId
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to get response from Pati: ${response.status}`);
            }

            let data;
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                try {
                    const responseClone = response.clone();
                    data = await responseClone.json();
                } catch (e) {
                    console.warn('Failed to parse JSON response, falling back to text:', e);
                    data = await response.text();
                }
            } else {
                data = await response.text();
            }

            console.log("n8n Raw Response:", data);

            // Attempt to extract response string from data
            let botContent = '';

            if (typeof data === 'string') {
                botContent = data;
            } else if (Array.isArray(data) && data.length > 0) {
                const firstItem = data[0];
                botContent = typeof firstItem === 'string'
                    ? firstItem
                    : (firstItem.output || firstItem.response || firstItem.message || '');
            } else if (data && typeof data === 'object') {
                botContent = (data as any).output || (data as any).response || (data as any).message || '';
            }

            if (!botContent || botContent === 'Workflow was started') {
                console.warn("n8n returned empty or default content:", botContent);
                botContent = 'Lo siento, estoy teniendo problemas para procesar tu mensaje. ¿Podrías intentar de nuevo?';
            }

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'bot',
                content: botContent,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Error contacting chatbot:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'bot',
                content: 'Hubo un error al conectar con Pati. Por favor, intenta de nuevo más tarde.',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
                    >
                        {/* Header */}
                        <div className="bg-accent p-4 flex items-center justify-between text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <Bot size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-white">Pati - IA</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                        <span className="text-xs text-white/80">En línea ahora</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                                aria-label="Cerrar chat"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={cn(
                                        "flex w-full mb-2",
                                        message.role === 'user' ? "justify-end" : "justify-start"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "max-w-[80%] p-3 rounded-2xl text-sm shadow-sm",
                                            message.role === 'user'
                                                ? "bg-accent text-white rounded-tr-none"
                                                : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                                        )}
                                    >
                                        <p className="leading-relaxed">{message.content}</p>
                                        <p className={cn(
                                            "text-[10px] mt-1 opacity-70",
                                            message.role === 'user' ? "text-right" : "text-left"
                                        )}>
                                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start mb-2">
                                    <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                                        <Loader2 size={16} className="animate-spin text-accent" />
                                        <span className="text-xs text-gray-500 italic">Pati está pensando...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form
                            onSubmit={handleSendMessage}
                            className="p-4 bg-white border-t border-gray-100 flex items-center gap-2"
                        >
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Escribe un mensaje..."
                                className="flex-grow p-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 border-none transition-all"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim() || isLoading}
                                className={cn(
                                    "p-2.5 rounded-xl transition-all flex items-center justify-center",
                                    inputValue.trim() && !isLoading
                                        ? "bg-accent text-white hover:brightness-110 shadow-md transform hover:scale-105 active:scale-95"
                                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                )}
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <div className="relative">
                {!isOpen && (
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.2, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute inset-0 bg-accent rounded-full -z-10"
                    />
                )}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300",
                        isOpen ? "bg-white text-accent border border-accent/10 rotate-90" : "bg-accent text-white"
                    )}
                    aria-label="Abrir chat"
                >
                    {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
                    {!isOpen && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
                        />
                    )}
                </motion.button>
            </div>
        </div>
    );
}
