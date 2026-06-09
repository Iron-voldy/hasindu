import React from 'react';

const ACTIONS = [
    {
        icon: '👤', title: 'About Me',    desc: 'Story & background',
        accent: '#E95420', glow: '233,84,32',
        action: (o) => o('about-vivek'),
    },
    {
        icon: '🚀', title: 'Projects',    desc: '8 full-stack & AI builds',
        accent: '#a78bfa', glow: '167,139,250',
        action: (o) => { localStorage.setItem('about-section','projects'); o('about-vivek'); },
    },
    {
        icon: '🤖', title: 'LIA AI',      desc: 'Chat with my AI assistant',
        accent: '#34d399', glow: '52,211,153',
        action: (o) => o('lia-ai'),
    },
    {
        icon: '📬', title: 'Contact',     desc: "Let's work together",
        accent: '#60a5fa', glow: '96,165,250',
        action: (o) => o('gedit'),
    },
];

export default function WelcomeOverlay({ onClose, openApp }) {
    const go = (action) => { onClose(); action(openApp); };

    return (
        <>
            {/* ── Backdrop ── */}
            <div
                className="wb-backdrop absolute inset-0 flex items-center justify-center px-4"
                style={{ zIndex:90, background:'rgba(0,0,0,0.88)', backdropFilter:'blur(14px)' }}
            >

                {/* ── Rotating gradient border shell ── */}
                <div className="wb-border-ring wb-card" style={{ maxWidth:472, width:'100%' }}>

                    {/* ── Glass card ── */}
                    <div
                        className="relative overflow-hidden"
                        style={{
                            borderRadius: 21,
                            background: 'rgba(9,9,9,0.93)',
                            backdropFilter: 'blur(22px)',
                        }}
                    >

                        {/* ── Aurora orbs ── */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            {/* Orange — top-right */}
                            <div className="wb-orb-a absolute" style={{
                                width:320, height:320, top:-110, right:-90,
                                background:'radial-gradient(circle, rgba(233,84,32,.3) 0%, transparent 65%)',
                                filter:'blur(36px)', borderRadius:'50%',
                            }}/>
                            {/* Aubergine — bottom-left */}
                            <div className="wb-orb-b absolute" style={{
                                width:260, height:260, bottom:-80, left:-70,
                                background:'radial-gradient(circle, rgba(119,33,111,.38) 0%, transparent 65%)',
                                filter:'blur(36px)', borderRadius:'50%',
                            }}/>
                            {/* Violet — center */}
                            <div className="wb-orb-m absolute" style={{
                                width:180, height:180, top:'38%', left:'42%',
                                background:'radial-gradient(circle, rgba(147,51,234,.22) 0%, transparent 65%)',
                                filter:'blur(28px)', borderRadius:'50%',
                            }}/>
                            {/* Dot-grid texture */}
                            <div className="absolute inset-0" style={{
                                backgroundImage:'radial-gradient(rgba(255,255,255,.035) 1px, transparent 1px)',
                                backgroundSize:'22px 22px',
                            }}/>
                            {/* Top edge highlight */}
                            <div className="absolute top-0 left-0 right-0" style={{
                                height:1,
                                background:'linear-gradient(90deg, transparent 0%, rgba(233,84,32,.6) 35%, rgba(119,33,111,.6) 65%, transparent 100%)',
                            }}/>
                        </div>

                        {/* ── Content ── */}
                        <div className="relative z-10 p-6">

                            {/* Header */}
                            <div className="flex items-center gap-4 mb-5">

                                {/* Avatar */}
                                <div className="wb-avatar-wrap flex-shrink-0" style={{ padding:2.5, background:'linear-gradient(135deg,#E95420,#ff8040,#77216F)' }}>
                                    <img
                                        src="./images/logos/bitmoji.png"
                                        alt="Hasindu"
                                        className="w-14 h-14 rounded-full block"
                                        style={{ background:'#fff' }}
                                    />
                                </div>

                                <div className="min-w-0">
                                    {/* Status badge */}
                                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full mb-1.5" style={{
                                        background:'rgba(74,222,128,.1)',
                                        border:'1px solid rgba(74,222,128,.22)',
                                    }}>
                                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{
                                            background:'#4ade80',
                                            boxShadow:'0 0 7px rgba(74,222,128,.9)',
                                        }}/>
                                        <span className="text-xs font-medium" style={{ color:'#4ade80' }}>
                                            Available for work
                                        </span>
                                    </div>

                                    <h1 className="text-lg font-bold text-white leading-tight">
                                        Hasindu Wanninayake
                                    </h1>
                                    <p className="text-sm font-medium" style={{ color:'#E95420' }}>
                                        Full Stack Software Engineer
                                    </p>
                                    <p className="text-xs mt-0.5" style={{ color:'#4b5563' }}>
                                        Colombo, Sri Lanka 🇱🇰
                                    </p>
                                </div>
                            </div>

                            {/* Welcome bar */}
                            <div className="text-sm mb-5 px-3.5 py-2.5 rounded-xl leading-relaxed" style={{
                                background:'rgba(233,84,32,.07)',
                                borderLeft:'2px solid #E95420',
                                color:'#a0a0a0',
                            }}>
                                You're inside an{' '}
                                <span className="text-white font-semibold">interactive Ubuntu-style desktop</span>.
                                {' '}Pick where to start 👇
                            </div>

                            {/* 2 × 2 action grid */}
                            <div className="grid grid-cols-2 gap-2 mb-4">
                                {ACTIONS.map(item => (
                                    <button
                                        key={item.title}
                                        onClick={() => go(item.action)}
                                        className="wb-action text-left p-3 rounded-xl"
                                        style={{
                                            background:'rgba(255,255,255,.025)',
                                            border:'1px solid rgba(255,255,255,.07)',
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.background  = `rgba(${item.glow},.1)`;
                                            e.currentTarget.style.borderColor = `rgba(${item.glow},.45)`;
                                            e.currentTarget.style.boxShadow   = `0 6px 24px rgba(${item.glow},.15)`;
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.background  = 'rgba(255,255,255,.025)';
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,.07)';
                                            e.currentTarget.style.boxShadow   = 'none';
                                        }}
                                    >
                                        {/* Icon box */}
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base mb-2.5" style={{
                                            background:`rgba(${item.glow},.14)`,
                                            border:`1px solid rgba(${item.glow},.32)`,
                                            boxShadow:`0 0 14px rgba(${item.glow},.2)`,
                                        }}>
                                            {item.icon}
                                        </div>
                                        <div className="text-sm font-semibold text-white leading-tight">{item.title}</div>
                                        <div className="text-xs mt-0.5" style={{ color:'#4b5563' }}>{item.desc}</div>
                                    </button>
                                ))}
                            </div>

                            {/* Terminal nav hint */}
                            <div className="wb-term flex items-center gap-1 text-xs px-3 py-2.5 rounded-xl mb-5 font-mono overflow-x-auto" style={{
                                background:'rgba(0,0,0,.55)',
                                border:'1px solid rgba(255,255,255,.05)',
                                whiteSpace:'nowrap',
                            }}>
                                <span style={{ color:'#E95420' }}>~$</span>
                                <span className="wb-cursor" style={{ color:'#E95420', marginLeft:2, marginRight:6 }}>▌</span>
                                <span style={{ color:'#555' }}>sidebar</span>
                                <span style={{ color:'#2d2d2d', margin:'0 4px' }}>=</span>
                                <span style={{ color:'#666' }}>dock</span>
                                <span style={{ color:'#2d2d2d', margin:'0 8px' }}>·</span>
                                <span style={{ color:'#555' }}>desktop&nbsp;icons</span>
                                <span style={{ color:'#2d2d2d', margin:'0 4px' }}>=</span>
                                <span style={{ color:'#666' }}>shortcuts</span>
                                <span style={{ color:'#2d2d2d', margin:'0 8px' }}>·</span>
                                <span style={{ color:'#555' }}>right-click</span>
                                <span style={{ color:'#2d2d2d', margin:'0 4px' }}>=</span>
                                <span style={{ color:'#666' }}>menu</span>
                            </div>

                            {/* CTA row */}
                            <div className="flex gap-2.5">
                                <button
                                    onClick={() => go(ACTIONS[0].action)}
                                    className="wb-cta flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
                                    style={{
                                        background:'linear-gradient(135deg, #bf3a14, #E95420, #f06030)',
                                        boxShadow:'0 4px 24px rgba(233,84,32,.42)',
                                    }}
                                >
                                    Start Exploring →
                                </button>
                                <button
                                    onClick={onClose}
                                    className="wb-skip px-4 py-2.5 rounded-xl text-sm"
                                    style={{
                                        border:'1px solid rgba(255,255,255,.09)',
                                        color:'#555',
                                        background:'rgba(255,255,255,.02)',
                                    }}
                                >
                                    Skip
                                </button>
                            </div>

                        </div>{/* /content */}
                    </div>{/* /glass card */}
                </div>{/* /border ring */}
            </div>{/* /backdrop */}
        </>
    );
}
