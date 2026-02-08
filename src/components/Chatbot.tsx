'use client';

import { useEffect, useRef } from 'react';

/**
 * Chatbot component using the official @n8n/chat library.
 * This replaces the custom implementation with the library's embedded method
 * while maintaining the website's aesthetics (colors, fonts, etc.).
 */
export default function Chatbot() {
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        // 1. Add n8n chat styles
        const link = document.createElement('link');
        link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        // 2. Add n8n chat script and initialize
        const script = document.createElement('script');
        script.type = 'module';
        script.innerHTML = `
            import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

            createChat({
                webhookUrl: 'https://n8n.resto.guruweb.com.ar/webhook/e8139814-45bd-4f01-a15f-7154b0bb948d/chat',
                showWelcomeMessage: true,
                title: 'Pati',
                subtitle: 'En línea ahora',
                initialMessages: ['¡Hola! Soy Pati, tu asistente virtual. ¿En qué puedo ayudarte hoy?'],
                i18n: {
                    en: {
                        title: 'Pati',
                        subtitle: 'En línea ahora',
                        placeholder: 'Escribe tu mensaje aquí...',
                        welcomeMessage: '¡Hola! Soy Pati, tu asistente virtual. ¿En qué puedo ayudarte hoy?',
                        errorMessage: 'Error de conexión. Inténtalo de nuevo.',
                        sendButtonTooltip: 'Enviar',
                    }
                }
            });
        `;
        document.body.appendChild(script);

        return () => { };
    }, []);

    return (
        <style jsx global>{`
            :root {
                --chat--color--primary: #ea580c !important;
                --chat--color--primary-shade-50: #d94e06 !important;
                --chat--color--primary--shade-100: #c2410c !important;
                --chat--color--secondary: #ea580c !important;
                --chat--color-white: #ffffff !important;
                --chat--color-light: #f8fafc !important;
                --chat--color-dark: #0f172a !important;
                
                --chat--header--background: #ea580c !important;
                --chat--header--color: #ffffff !important;
                --chat--heading--font-size: 1.8rem !important;
                
                --chat--toggle--background: #ea580c !important;
                --chat--toggle--color: #ffffff !important;
                
                --chat--window--border-radius: 2.5rem !important;
                --chat--message--border-radius: 1.5rem !important;
                --chat--font-family: var(--font-outfit), sans-serif !important;
            }

            /* Overrides directos agresivos para asegurar que n8n tome estos estilos */
            #n8n-chat-container, .n8n-chat-widget {
                --chat--header--background: #ea580c !important;
                --chat--toggle--background: #ea580c !important;
                --chat--color--primary: #ea580c !important;
            }

            .n8n-chat-widget .n8n-chat-header-title {
                color: #0f172a !important;
                font-family: var(--font-outfit), sans-serif !important;
                font-weight: 900 !important;
                font-size: 1.6rem !important;
            }
        `}</style>
    );
}
