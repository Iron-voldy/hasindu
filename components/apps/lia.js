import React, { useState, useRef, useEffect } from 'react';

function formatMessage(text) {
    const lines = text.split('\n');
    return lines.map((line, i) => {
        const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={j}>{part.slice(2, -2)}</strong>;
            } else if (part.startsWith('*') && part.endsWith('*')) {
                return <em key={j}>{part.slice(1, -1)}</em>;
            }
            return part;
        });
        return <span key={i}>{parts}{i < lines.length - 1 && <br />}</span>;
    });
}

const SIDEBAR_ITEMS = [
    { icon: '💼', label: 'Experience', query: "Tell me about Hasindu's work experience" },
    { icon: '🎓', label: 'Education', query: "What is Hasindu's educational background?" },
    { icon: '🚀', label: 'Projects', query: "Show me Hasindu's best projects" },
    { icon: '🛠️', label: 'Skills', query: "What technologies does Hasindu know?" },
    { icon: '📬', label: 'Contact', query: "How can I contact Hasindu?" },
];

const FEATURE_CARDS = [
    { icon: '💼', title: 'Work Experience', desc: '4 companies · Aahaas, Xsoftus & more', query: "Tell me about Hasindu's work experience and the companies he worked at" },
    { icon: '🚀', title: 'Projects', desc: '8 diverse full-stack projects', query: "Show me all of Hasindu's projects with descriptions" },
    { icon: '🛠️', title: 'Dev Assistant', desc: 'Ask about his tech stack & code', query: "What technologies, programming languages and frameworks does Hasindu use?" },
];

const CHAT_CHIPS = ['About Hasindu', "What's his top skill?", 'Best project?', 'How to contact?'];

export function LiaAI() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    const sendMessage = async (text) => {
        const msgText = (text !== undefined ? text : input).trim();
        if (!msgText || loading) return;

        const userMsg = { role: 'user', content: msgText };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('/api/lia-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages }),
            });
            const data = await res.json();
            const reply = data.reply || "Sorry, I couldn't get a response. Please try again.";
            setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
        } catch {
            setMessages(prev => [...prev, { role: 'assistant', content: "⚠️ Connection error. Please try again!" }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKey = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const hasMessages = messages.length > 0;

    return (
        <div
            className="flex h-full w-full overflow-hidden select-none"
            style={{ background: '#0f0f1a', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#e0e0f0' }}
        >
            {/* ── Sidebar ── */}
            <div
                className="flex flex-col flex-shrink-0 h-full border-r"
                style={{ width: '155px', background: '#11111e', borderColor: '#25253a' }}
            >
                {/* Logo */}
                <div className="flex items-center gap-2 px-3 py-3 border-b" style={{ borderColor: '#25253a' }}>
                    <div className="relative flex-shrink-0">
                        <img
                            src="./images/logos/lia-ai.gif"
                            alt="LIA"
                            className="w-7 h-7 rounded-full"
                            style={{ mixBlendMode: 'screen' }}
                        />
                        <span
                            className="absolute bottom-0 right-0 w-2 h-2 rounded-full border border-black"
                            style={{ background: '#4ade80' }}
                        />
                    </div>
                    <span className="font-bold text-white text-sm tracking-wide">LIA AI</span>
                </div>

                {/* New Chat */}
                <div className="px-3 pt-3 pb-2">
                    <button
                        onClick={() => setMessages([])}
                        className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold text-white cursor-pointer transition-opacity hover:opacity-80"
                        style={{ background: 'linear-gradient(135deg, #5b21b6, #7c3aed)' }}
                    >
                        <span className="text-sm font-bold">+</span> New Chat
                    </button>
                </div>

                {/* Nav items */}
                <div className="px-2 flex-1 overflow-y-auto">
                    <p className="text-xs font-semibold px-1 pb-1 pt-1" style={{ color: '#555' }}>ASK ABOUT</p>
                    {SIDEBAR_ITEMS.map(item => (
                        <button
                            key={item.label}
                            onClick={() => sendMessage(item.query)}
                            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg mb-0.5 text-xs text-left cursor-pointer transition-colors"
                            style={{ color: '#aaa' }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#1c1c32'; e.currentTarget.style.color = '#fff'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#aaa'; }}
                        >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>

                {/* Profile card */}
                <div className="px-2 pb-3 pt-2 border-t" style={{ borderColor: '#25253a' }}>
                    <div className="rounded-lg p-2 text-xs" style={{ background: '#191930' }}>
                        <p className="font-semibold text-white truncate">Hasindu Wanninayake</p>
                        <p style={{ color: '#777' }}>Full Stack Developer</p>
                        <p style={{ color: '#555' }}>Colombo, Sri Lanka 🇱🇰</p>
                    </div>
                </div>
            </div>

            {/* ── Main Content ── */}
            <div className="flex flex-col flex-1 min-w-0 h-full">
                {/* Top bar */}
                <div
                    className="flex items-center justify-between px-4 py-2 flex-shrink-0 border-b"
                    style={{ background: '#11111e', borderColor: '#25253a' }}
                >
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: '#4ade80' }} />
                        <span className="text-xs" style={{ color: '#666' }}>Linked Intelligence Assistant</span>
                    </div>
                    {hasMessages && (
                        <button
                            onClick={() => setMessages([])}
                            className="text-xs px-3 py-0.5 rounded-full border cursor-pointer transition-all"
                            style={{ borderColor: '#5b21b6', color: '#9b5de5' }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#5b21b6'; e.currentTarget.style.color = '#fff'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#9b5de5'; }}
                        >
                            Clear
                        </button>
                    )}
                </div>

                {!hasMessages ? (
                    /* ── Welcome Screen ── */
                    <div
                        className="flex-1 flex flex-col items-center justify-center px-6 py-6 overflow-y-auto"
                        style={{ background: 'radial-gradient(ellipse at 50% 0%, #1e0f40 0%, #0f0f1a 65%)' }}
                    >
                        {/* Glowing orb */}
                        <div className="relative mb-5" style={{ width: '80px', height: '80px' }}>
                            <div
                                className="absolute inset-0 rounded-full blur-xl opacity-70"
                                style={{ background: 'radial-gradient(circle, #7c3aed 0%, #a855f7 50%, transparent 100%)', transform: 'scale(1.6)' }}
                            />
                            <img
                                src="./images/logos/lia-ai.gif"
                                alt="LIA AI"
                                className="relative w-full h-full rounded-full z-10"
                                style={{ mixBlendMode: 'screen', filter: 'brightness(1.4)' }}
                            />
                        </div>

                        {/* Heading */}
                        <h1
                            className="text-xl font-bold text-center mb-1"
                            style={{
                                background: 'linear-gradient(135deg, #c084fc, #818cf8, #60a5fa)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Ask me about Hasindu
                        </h1>
                        <p className="text-xs text-center mb-6" style={{ color: '#666' }}>
                            Your AI-powered guide to Hasindu Wanninayake's portfolio
                        </p>

                        {/* Top action chips */}
                        <div className="flex flex-wrap justify-center gap-2 mb-5">
                            {[
                                { label: '✦ About Hasindu', query: 'Give me a summary of Hasindu Wanninayake' },
                                { label: '⚡ Brainstorm Skills', query: 'What technologies and skills does Hasindu have?' },
                                { label: '📁 View Projects', query: "Show me Hasindu's best projects" },
                            ].map(chip => (
                                <button
                                    key={chip.label}
                                    onClick={() => sendMessage(chip.query)}
                                    className="text-xs px-3 py-1.5 rounded-full border cursor-pointer transition-all"
                                    style={{ borderColor: '#2e2e50', color: '#c0c0e0', background: '#191930' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#7c3aed'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = '#231040'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#2e2e50'; e.currentTarget.style.color = '#c0c0e0'; e.currentTarget.style.background = '#191930'; }}
                                >
                                    {chip.label}
                                </button>
                            ))}
                        </div>

                        {/* Central textarea (MindSpark style) */}
                        <div
                            className="w-full rounded-2xl overflow-hidden border"
                            style={{ maxWidth: '440px', background: '#151528', borderColor: '#2a2a48' }}
                        >
                            <textarea
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={handleKey}
                                placeholder="✦  Write any request or question about Hasindu..."
                                rows={3}
                                className="w-full px-4 pt-4 pb-2 text-sm resize-none outline-none"
                                style={{ background: 'transparent', color: '#e0e0f0', caretColor: '#9b5de5' }}
                            />
                            <div className="flex items-center justify-between px-4 pb-3 pt-1">
                                <div className="flex gap-1.5">
                                    <button
                                        onClick={() => sendMessage("What technologies does Hasindu know?")}
                                        className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full cursor-pointer transition-all"
                                        style={{ color: '#888', background: '#1e1e38' }}
                                        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                        onMouseLeave={e => e.currentTarget.style.color = '#888'}
                                    >
                                        🔍 Skills
                                    </button>
                                    <button
                                        onClick={() => sendMessage("Show me Hasindu's projects")}
                                        className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full cursor-pointer transition-all"
                                        style={{ color: '#888', background: '#1e1e38' }}
                                        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                        onMouseLeave={e => e.currentTarget.style.color = '#888'}
                                    >
                                        📁 Projects
                                    </button>
                                </div>
                                <button
                                    onClick={() => sendMessage()}
                                    disabled={loading || !input.trim()}
                                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-white cursor-pointer disabled:opacity-40 transition-opacity hover:opacity-80"
                                    style={{ background: 'linear-gradient(135deg, #5b21b6, #7c3aed)' }}
                                >
                                    Generate <span>✦</span>
                                </button>
                            </div>
                        </div>

                        {/* Feature cards (Zyricon style) */}
                        <div className="grid grid-cols-3 gap-3 mt-6 w-full" style={{ maxWidth: '440px' }}>
                            {FEATURE_CARDS.map(card => (
                                <button
                                    key={card.title}
                                    onClick={() => sendMessage(card.query)}
                                    className="rounded-xl p-3 text-left border cursor-pointer transition-all"
                                    style={{ background: '#141428', borderColor: '#222240' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#7c3aed'; e.currentTarget.style.background = '#1a1a38'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#222240'; e.currentTarget.style.background = '#141428'; }}
                                >
                                    <div className="text-lg mb-1">{card.icon}</div>
                                    <div className="text-xs font-semibold text-white leading-tight mb-0.5">{card.title}</div>
                                    <div className="text-xs leading-tight" style={{ color: '#555' }}>{card.desc}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* ── Chat Messages ── */
                    <div
                        className="flex-1 overflow-y-auto px-4 py-4 windowMainScreen"
                        style={{ background: 'radial-gradient(ellipse at 50% 0%, #140b30 0%, #0f0f1a 60%)' }}
                    >
                        <div className="max-w-xl mx-auto space-y-4">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {msg.role === 'assistant' && (
                                        <img
                                            src="./images/logos/lia-ai.gif"
                                            alt="LIA"
                                            className="w-6 h-6 rounded-full flex-shrink-0 mb-1"
                                            style={{ mixBlendMode: 'screen' }}
                                        />
                                    )}
                                    <div
                                        className="px-4 py-2.5 text-sm leading-relaxed shadow"
                                        style={msg.role === 'user'
                                            ? {
                                                background: 'linear-gradient(135deg, #5b21b6, #7c3aed)',
                                                color: '#fff',
                                                borderRadius: '18px 18px 4px 18px',
                                                maxWidth: '70%',
                                            }
                                            : {
                                                background: '#1c1c34',
                                                color: '#d0d0f0',
                                                border: '1px solid #2a2a48',
                                                borderRadius: '18px 18px 18px 4px',
                                                maxWidth: '80%',
                                            }
                                        }
                                    >
                                        {formatMessage(msg.content)}
                                    </div>
                                </div>
                            ))}

                            {loading && (
                                <div className="flex justify-start items-end gap-2">
                                    <img
                                        src="./images/logos/lia-ai.gif"
                                        alt="LIA"
                                        className="w-6 h-6 rounded-full flex-shrink-0 mb-1"
                                        style={{ mixBlendMode: 'screen' }}
                                    />
                                    <div
                                        className="px-4 py-3 flex gap-1.5 items-center"
                                        style={{ background: '#1c1c34', border: '1px solid #2a2a48', borderRadius: '18px 18px 18px 4px' }}
                                    >
                                        {[0, 150, 300].map(delay => (
                                            <span
                                                key={delay}
                                                className="w-2 h-2 rounded-full animate-bounce"
                                                style={{ background: '#9b5de5', animationDelay: `${delay}ms` }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div ref={bottomRef} />
                        </div>
                    </div>
                )}

                {/* ── Bottom Input (chat mode) ── */}
                {hasMessages && (
                    <div
                        className="flex-shrink-0 border-t px-4 py-3"
                        style={{ background: '#11111e', borderColor: '#25253a' }}
                    >
                        {/* Quick chips */}
                        <div className="flex gap-2 mb-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                            {CHAT_CHIPS.map(chip => (
                                <button
                                    key={chip}
                                    onClick={() => sendMessage(chip)}
                                    className="flex-shrink-0 text-xs px-3 py-1 rounded-full border cursor-pointer transition-all"
                                    style={{ borderColor: '#2a2a50', color: '#9090b8', background: '#191930' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#7c3aed'; e.currentTarget.style.color = '#fff'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a50'; e.currentTarget.style.color = '#9090b8'; }}
                                >
                                    {chip}
                                </button>
                            ))}
                        </div>

                        {/* Input row */}
                        <div
                            className="flex items-center gap-2 rounded-full px-4 py-2"
                            style={{ background: '#1c1c34', border: '1px solid #2a2a50' }}
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={handleKey}
                                placeholder="Ask anything about Hasindu..."
                                className="flex-1 bg-transparent text-sm outline-none"
                                style={{ color: '#e0e0f0', caretColor: '#9b5de5' }}
                                disabled={loading}
                                autoFocus
                            />
                            <button
                                onClick={() => sendMessage()}
                                disabled={loading || !input.trim()}
                                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer disabled:opacity-40 transition-opacity hover:opacity-80"
                                style={{ background: 'linear-gradient(135deg, #5b21b6, #7c3aed)' }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" style={{ width: '14px', height: '14px' }}>
                                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LiaAI;

export const displayLiaAI = () => {
    return <LiaAI />;
};
