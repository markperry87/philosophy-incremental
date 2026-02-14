'use strict';

// ============================================================================
// SECTION 0: VERSION & CHANGELOG
// ============================================================================

const GAME_VERSION = '0.2.1';

const CHANGELOG = [
    {
        version: '0.2.1',
        date: '2026-02-13',
        changes: [
            'Fixed: Restart Game now properly resets all progress',
        ],
    },
    {
        version: '0.2.0',
        date: '2026-02-13',
        changes: [
            'Reworked Automation: now capped at 3 slots that operate independently on different thinkers simultaneously',
            'Simplified Automation config: each slot just has "Buy up to" and "Wager above" targets',
            'Nerfed Transcendence: Wisdom bonus reduced from +10% to +3% per point',
            'Removed Buy x1/x10/Max buttons (always buys x1 now)',
            'Added this version history popup',
        ],
    },
    {
        version: '0.1.0',
        date: '2026-02-01',
        changes: [
            'Initial release of Philosophy Incremental',
            'Thinkers, Paradigms, Wagering, Automation, Transcendence',
            'Achievements, Metaphilosophy, Era themes',
        ],
    },
];

// ============================================================================
// SECTION 1: GAME CONFIGURATION
// ============================================================================

const THINKERS = [
    { name: 'Curious Man',          baseCost: 10,         costScale: 1.8,  baseTPS: 1 },
    { name: 'Storyteller',          baseCost: 150,        costScale: 1.9,  baseTPS: 2 },
    { name: 'Priest',               baseCost: 600,        costScale: 2.0,  baseTPS: 4 },
    { name: 'Philosopher',          baseCost: 3000,       costScale: 2.1,  baseTPS: 8 },
    { name: 'Alchemist',            baseCost: 15000,      costScale: 2.2,  baseTPS: 16 },
    { name: 'Scientist',            baseCost: 75000,      costScale: 2.3,  baseTPS: 32 },
    { name: 'Enlightenment Thinker',baseCost: 375000,     costScale: 2.4,  baseTPS: 64 },
    { name: 'Academic',             baseCost: 1500000,    costScale: 2.5,  baseTPS: 128 },
    { name: 'Psychologist',         baseCost: 7500000,    costScale: 2.6,  baseTPS: 256 },
    { name: 'Computer Scientist',   baseCost: 37500000,   costScale: 2.7,  baseTPS: 512 },
    { name: 'AI Researcher',        baseCost: 225000000,  costScale: 2.8,  baseTPS: 1024 },
    { name: 'Quantum Thinker',      baseCost: 1500000000, costScale: 2.9,  baseTPS: 2048 },
    { name: 'Posthuman',            baseCost: 15000000000, costScale: 3.0, baseTPS: 4096 },
    { name: 'Galactic Philosopher', baseCost: 150000000000, costScale: 3.1, baseTPS: 8192 },
    { name: 'Cosmic Deity',         baseCost: 1500000000000, costScale: 3.2, baseTPS: 16384 },
];

const PARADIGMS = [
    { name: 'Animism',              cost: 5000,            multi: 1.5,  desc: 'All things possess a spirit' },
    { name: 'Mythology',            cost: 25000,           multi: 1.5,  desc: 'Stories to explain the cosmos' },
    { name: 'Monotheism',           cost: 100000,          multi: 1.5,  desc: 'One truth, one divine source' },
    { name: 'Classical Philosophy', cost: 500000,          multi: 1.5,  desc: 'Reason as the path to knowledge' },
    { name: 'Scholasticism',        cost: 5000000,         multi: 1.5,  desc: 'Faith and reason reconciled' },
    { name: 'Renaissance Humanism', cost: 50000000,        multi: 2.0,  desc: 'Humanity at the center of inquiry' },
    { name: 'Rationalism',          cost: 250000000,       multi: 2.0,  desc: 'I think, therefore I am' },
    { name: 'Empiricism',           cost: 1000000000,      multi: 2.0,  desc: 'Knowledge through observation' },
    { name: 'Idealism',             cost: 5000000000,      multi: 2.0,  desc: 'Reality shaped by the mind' },
    { name: 'Modernism',            cost: 50000000000,     multi: 2.5,  desc: 'Progress through systematic thought' },
    { name: 'Existentialism',       cost: 500000000000,    multi: 2.5,  desc: 'Existence precedes essence' },
    { name: 'Postmodernism',        cost: 5000000000000,   multi: 3.0,  desc: 'All grand narratives questioned' },
    { name: 'Computationalism',     cost: 500000000000000, multi: 5.0,  desc: 'The universe as computation' },
];

const ERA_THEMES = [
    // [bg gradient, accent color, accent-glow, name]
    { bg: 'radial-gradient(ellipse at 30% 60%, #1a1008 0%, #0a0804 100%)', accent: '#c9a84c', name: 'The Age of Curiosity' },
    { bg: 'radial-gradient(ellipse at 50% 40%, #1a0f05 0%, #0d0802 100%)', accent: '#d4a847', name: 'The Age of Animism' },
    { bg: 'radial-gradient(ellipse at 40% 50%, #150a20 0%, #08040e 100%)', accent: '#b088d4', name: 'The Mythic Age' },
    { bg: 'radial-gradient(ellipse at 50% 50%, #101025 0%, #080812 100%)', accent: '#d4c477', name: 'The Age of Faith' },
    { bg: 'radial-gradient(ellipse at 60% 40%, #0f150f 0%, #060a06 100%)', accent: '#8fbc8f', name: 'The Classical Age' },
    { bg: 'radial-gradient(ellipse at 50% 60%, #1a1005 0%, #0d0803 100%)', accent: '#c4956a', name: 'The Scholastic Age' },
    { bg: 'radial-gradient(ellipse at 40% 40%, #1a0808 0%, #0d0404 100%)', accent: '#e8a04c', name: 'The Renaissance' },
    { bg: 'radial-gradient(ellipse at 50% 50%, #081520 0%, #040a10 100%)', accent: '#5b9bd5', name: 'The Age of Reason' },
    { bg: 'radial-gradient(ellipse at 60% 60%, #081a0a 0%, #040d05 100%)', accent: '#6bb86b', name: 'The Empirical Age' },
    { bg: 'radial-gradient(ellipse at 50% 40%, #120820 0%, #080410 100%)', accent: '#a078d0', name: 'The Idealist Age' },
    { bg: 'radial-gradient(ellipse at 40% 50%, #0a0a18 0%, #05050c 100%)', accent: '#e07050', name: 'The Modern Age' },
    { bg: 'radial-gradient(ellipse at 50% 50%, #0a0808 0%, #050404 100%)', accent: '#888888', name: 'The Existential Age' },
    { bg: 'radial-gradient(ellipse at 50% 50%, #120818 0%, #08040c 100%)', accent: '#d870a0', name: 'The Postmodern Age' },
    { bg: 'radial-gradient(ellipse at 50% 50%, #000a08 0%, #000504 100%)', accent: '#40d870', name: 'The Computational Age' },
];

const METAPHILOSOPHY = [
    { name: 'Divine Reason',          cost: 75000000,         multi: 2 },
    { name: 'Empiricism of Truth',    cost: 7500000000,       multi: 2 },
    { name: 'Multiplicity of Truths', cost: 750000000000,     multi: 2 },
    { name: 'Probabilistic Ontology', cost: 75000000000000,   multi: 3 },
    { name: 'Omniconsciousness',      cost: 7500000000000000, multi: 3 },
];

const WAGER_LEVEL_COSTS = [
    900, 3600, 14400, 72000, 360000, 1800000, 9000000, 45000000,
    225000000, 1125000000, 5625000000, 28125000000, 140625000000,
    703125000000, 3150000000000
];

const AUTO_SLOT_COSTS = [
    73000, 1460000, 29200000
];

const CLICK_UPGRADES = [
    { tpc: 1,    cost: 0 },
    { tpc: 2,    cost: 50 },
    { tpc: 5,    cost: 500 },
    { tpc: 10,   cost: 5000 },
    { tpc: 25,   cost: 50000 },
    { tpc: 100,  cost: 500000 },
    { tpc: 500,  cost: 5000000 },
    { tpc: 2500, cost: 50000000 },
    { tpc: 10000,cost: 500000000 },
    { tpc: 50000,cost: 5000000000 },
];

const ACHIEVEMENTS = [
    { id: 'first_thought',   name: 'Cogito',            desc: 'Generate your first thought',         icon: '\u2728', check: s => s.allTimeThoughts >= 1 },
    { id: 'thoughts_100',    name: 'Spark',             desc: 'Reach 100 all-time thoughts',         icon: '\u26A1', check: s => s.allTimeThoughts >= 100 },
    { id: 'thoughts_10k',    name: 'Illumination',      desc: 'Reach 10,000 all-time thoughts',      icon: '\u2600', check: s => s.allTimeThoughts >= 10000 },
    { id: 'thoughts_1m',     name: 'Enlightenment',     desc: 'Reach 1 million all-time thoughts',   icon: '\u{1F31F}', check: s => s.allTimeThoughts >= 1000000 },
    { id: 'thoughts_1b',     name: 'Transcendent Mind', desc: 'Reach 1 billion all-time thoughts',   icon: '\u{1F4AB}', check: s => s.allTimeThoughts >= 1000000000 },
    { id: 'thoughts_1t',     name: 'Cosmic Awareness',  desc: 'Reach 1 trillion all-time thoughts',  icon: '\u{1F30C}', check: s => s.allTimeThoughts >= 1000000000000 },
    { id: 'thinker_10',      name: 'Small Circle',      desc: 'Own 10 thinkers of any type',         icon: '\u{1F465}', check: s => s.thinkers.some(c => c >= 10) },
    { id: 'thinker_25',      name: 'Symposium',         desc: 'Own 25 thinkers of any type',         icon: '\u{1F3DB}', check: s => s.thinkers.some(c => c >= 25) },
    { id: 'thinker_50',      name: 'Academy',           desc: 'Own 50 thinkers of any type',         icon: '\u{1F3E6}', check: s => s.thinkers.some(c => c >= 50) },
    { id: 'all_types',       name: 'Polymath',          desc: 'Own at least 1 of every thinker type',icon: '\u{1F9E0}', check: s => s.thinkers.every(c => c >= 1) },
    { id: 'paradigm_1',      name: 'Paradigm Pioneer',  desc: 'Purchase your first paradigm',        icon: '\u{1F4D6}', check: s => s.paradigms.some(p => p) },
    { id: 'paradigm_5',      name: 'Era Walker',        desc: 'Purchase 5 paradigms',                icon: '\u{1F5FA}', check: s => s.paradigms.filter(p => p).length >= 5 },
    { id: 'paradigm_all',    name: 'History Complete',  desc: 'Purchase all paradigms',              icon: '\u{1F451}', check: s => s.paradigms.every(p => p) },
    { id: 'wager_win',       name: 'Leap of Faith',     desc: 'Win your first wager',                icon: '\u{1F3B2}', check: s => s.allTimeWagerWins >= 1 },
    { id: 'wager_10wins',    name: 'Fortune Favors',    desc: 'Win 10 wagers',                       icon: '\u{1F340}', check: s => s.allTimeWagerWins >= 10 },
    { id: 'wager_50wins',    name: 'Philosopher King',  desc: 'Win 50 wagers',                       icon: '\u{1F3C6}', check: s => s.allTimeWagerWins >= 50 },
    { id: 'meta_1',          name: 'Meta Thinker',      desc: 'Purchase a metaphilosophy upgrade',   icon: '\u{1F52E}', check: s => s.metaphilosophy.some(m => m) },
    { id: 'meta_all',        name: 'Ultimate Truth',    desc: 'Purchase all metaphilosophy',         icon: '\u267E',    check: s => s.metaphilosophy.every(m => m) },
    { id: 'auto_1',          name: 'Automation',        desc: 'Purchase your first auto-system',     icon: '\u2699',    check: s => s.autoSlots.length >= 1 },
    { id: 'transcend_1',     name: 'Reborn',            desc: 'Transcend for the first time',        icon: '\u{1F54A}', check: s => s.transcendenceCount >= 1 },
    { id: 'transcend_5',     name: 'Eternal Thinker',   desc: 'Transcend 5 times',                   icon: '\u{1F300}', check: s => s.transcendenceCount >= 5 },
    { id: 'click_1000',      name: 'Diligent Mind',     desc: 'Click 1,000 times',                   icon: '\u270B',    check: s => s.allTimeClicks >= 1000 },
    { id: 'tps_1000',        name: 'Thought Stream',    desc: 'Reach 1,000 thoughts per second',     icon: '\u{1F4A8}', check: s => s.currentTPS >= 1000 },
    { id: 'tps_1m',          name: 'Thought Torrent',   desc: 'Reach 1M thoughts per second',        icon: '\u{1F32A}', check: s => s.currentTPS >= 1000000 },
];

const ETERNAL_TRUTHS = [
    { name: 'Persistent Memory',    cost: 5,   desc: 'Start each run with 1,000 thoughts',  effect: 'startThoughts' },
    { name: 'Innate Wisdom',        cost: 10,  desc: 'All TPS permanently +50%',             effect: 'tpsMult' },
    { name: 'Rapid Insight',        cost: 15,  desc: 'Click value permanently x3',           effect: 'clickMult' },
    { name: 'Ancient Knowledge',    cost: 25,  desc: 'Start with first 3 paradigms free',    effect: 'freeParadigms' },
    { name: 'Wager Mastery',        cost: 20,  desc: 'Base wager chance +10%',               effect: 'wagerBonus' },
    { name: 'Infinite Potential',   cost: 50,  desc: 'All TPS permanently x2',               effect: 'tpsDouble' },
];

// ============================================================================
// SECTION 2: SVG ART
// ============================================================================

function getThinkerSVG(tier) {
    const svgs = [
        // 0: Curious Man - Eye with question mark
        `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="50" cy="50" rx="32" ry="22" stroke="#c9a84c" stroke-width="2.5" fill="rgba(201,168,76,0.08)"/>
            <circle cx="50" cy="50" r="10" fill="#c9a84c" opacity="0.7"/>
            <circle cx="50" cy="50" r="4" fill="#0a0a12"/>
            <path d="M50 18 Q56 10 62 18" stroke="#c9a84c" stroke-width="1.5" fill="none" opacity="0.6"/>
            <text x="62" y="22" font-size="14" fill="#c9a84c" font-family="serif" opacity="0.7">?</text>
            <circle cx="50" cy="50" r="2" fill="#c9a84c"/>
        </svg>`,

        // 1: Storyteller - Flame
        `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 15 Q65 35 60 55 Q55 65 50 70 Q45 65 40 55 Q35 35 50 15Z" fill="#e8a040" opacity="0.8"/>
            <path d="M50 25 Q58 40 55 52 Q53 58 50 62 Q47 58 45 52 Q42 40 50 25Z" fill="#f0c848" opacity="0.9"/>
            <path d="M50 38 Q54 48 52 54 Q51 57 50 58 Q49 57 48 54 Q46 48 50 38Z" fill="#fff8e0"/>
            <ellipse cx="50" cy="75" rx="18" ry="4" fill="#c9a84c" opacity="0.2"/>
            <line x1="50" y1="70" x2="50" y2="82" stroke="#8b7355" stroke-width="3" stroke-linecap="round"/>
            <line x1="42" y1="82" x2="58" y2="82" stroke="#8b7355" stroke-width="2"/>
        </svg>`,

        // 2: Priest - Gothic arch with light
        `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 85 L30 40 Q30 20 50 15 Q70 20 70 40 L70 85" stroke="#b088d4" stroke-width="2" fill="rgba(176,136,212,0.06)"/>
            <path d="M38 85 L38 45 Q38 28 50 24 Q62 28 62 45 L62 85" stroke="#b088d4" stroke-width="1.5" fill="rgba(176,136,212,0.04)"/>
            <circle cx="50" cy="40" r="6" fill="#b088d4" opacity="0.5"/>
            <line x1="50" y1="34" x2="50" y2="20" stroke="#b088d4" stroke-width="1" opacity="0.4"/>
            <line x1="44" y1="40" x2="56" y2="40" stroke="#b088d4" stroke-width="1" opacity="0.4"/>
            <line x1="50" y1="48" x2="50" y2="60" stroke="#d4c477" stroke-width="1" opacity="0.3"/>
            <line x1="46" y1="52" x2="54" y2="52" stroke="#d4c477" stroke-width="1" opacity="0.3"/>
        </svg>`,

        // 3: Philosopher - Greek column with laurel
        `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="40" y="25" width="20" height="55" rx="2" fill="rgba(143,188,143,0.15)" stroke="#8fbc8f" stroke-width="1.5"/>
            <rect x="36" y="20" width="28" height="6" rx="1" fill="rgba(143,188,143,0.2)" stroke="#8fbc8f" stroke-width="1.5"/>
            <rect x="36" y="79" width="28" height="6" rx="1" fill="rgba(143,188,143,0.2)" stroke="#8fbc8f" stroke-width="1.5"/>
            <line x1="44" y1="26" x2="44" y2="79" stroke="#8fbc8f" stroke-width="0.8" opacity="0.3"/>
            <line x1="50" y1="26" x2="50" y2="79" stroke="#8fbc8f" stroke-width="0.8" opacity="0.3"/>
            <line x1="56" y1="26" x2="56" y2="79" stroke="#8fbc8f" stroke-width="0.8" opacity="0.3"/>
            <path d="M42 16 Q50 10 58 16" stroke="#8fbc8f" stroke-width="1.5" fill="none" opacity="0.5"/>
        </svg>`,

        // 4: Alchemist - Flask with bubbles
        `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M42 20 L42 40 L28 70 Q25 80 35 82 L65 82 Q75 80 72 70 L58 40 L58 20" stroke="#e8a04c" stroke-width="2" fill="rgba(232,160,76,0.06)"/>
            <line x1="38" y1="20" x2="62" y2="20" stroke="#e8a04c" stroke-width="2"/>
            <ellipse cx="50" cy="68" rx="16" ry="8" fill="#e8a04c" opacity="0.15"/>
            <circle cx="45" cy="62" r="3" fill="#e8a04c" opacity="0.4"/>
            <circle cx="55" cy="58" r="2" fill="#e8a04c" opacity="0.3"/>
            <circle cx="48" cy="54" r="2.5" fill="#e8a04c" opacity="0.35"/>
            <circle cx="42" cy="48" r="1.5" fill="#e8a04c" opacity="0.25"/>
            <path d="M52 42 Q60 38 56 30" stroke="#e8a04c" stroke-width="1" opacity="0.3" fill="none"/>
        </svg>`,

        // 5: Scientist - Prism with spectrum
        `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50,20 25,75 75,75" stroke="#5b9bd5" stroke-width="2" fill="rgba(91,155,213,0.08)"/>
            <line x1="15" y1="48" x2="42" y2="48" stroke="#ffffff" stroke-width="1.5" opacity="0.5"/>
            <line x1="58" y1="52" x2="88" y2="38" stroke="#ff4444" stroke-width="1" opacity="0.6"/>
            <line x1="58" y1="55" x2="88" y2="48" stroke="#ff8800" stroke-width="1" opacity="0.6"/>
            <line x1="58" y1="58" x2="88" y2="55" stroke="#ffcc00" stroke-width="1" opacity="0.6"/>
            <line x1="58" y1="61" x2="88" y2="62" stroke="#44cc44" stroke-width="1" opacity="0.6"/>
            <line x1="58" y1="64" x2="88" y2="72" stroke="#4488ff" stroke-width="1" opacity="0.6"/>
            <line x1="58" y1="67" x2="88" y2="80" stroke="#8844ff" stroke-width="1" opacity="0.6"/>
        </svg>`,

        // 6: Enlightenment Thinker - Radiating sun
        `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="15" fill="#d4a847" opacity="0.3"/>
            <circle cx="50" cy="50" r="10" fill="#d4a847" opacity="0.5"/>
            <circle cx="50" cy="50" r="5" fill="#f0d890"/>
            ${[0,30,60,90,120,150,180,210,240,270,300,330].map(a => {
                const r = a * Math.PI / 180;
                const x1 = 50 + Math.cos(r) * 20, y1 = 50 + Math.sin(r) * 20;
                const x2 = 50 + Math.cos(r) * 35, y2 = 50 + Math.sin(r) * 35;
                return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#d4a847" stroke-width="1.5" opacity="0.4"/>`;
            }).join('')}
        </svg>`,

        // 7: Academic - Open book with light
        `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 30 Q50 25 50 55 Q50 25 80 30 L80 75 Q50 70 50 80 Q50 70 20 75 Z" stroke="#c4956a" stroke-width="2" fill="rgba(196,149,106,0.08)"/>
            <line x1="50" y1="28" x2="50" y2="80" stroke="#c4956a" stroke-width="1" opacity="0.3"/>
            <line x1="28" y1="40" x2="46" y2="38" stroke="#c4956a" stroke-width="0.8" opacity="0.3"/>
            <line x1="28" y1="48" x2="46" y2="46" stroke="#c4956a" stroke-width="0.8" opacity="0.3"/>
            <line x1="28" y1="56" x2="46" y2="54" stroke="#c4956a" stroke-width="0.8" opacity="0.3"/>
            <line x1="54" y1="38" x2="72" y2="40" stroke="#c4956a" stroke-width="0.8" opacity="0.3"/>
            <line x1="54" y1="46" x2="72" y2="48" stroke="#c4956a" stroke-width="0.8" opacity="0.3"/>
            <line x1="54" y1="54" x2="72" y2="56" stroke="#c4956a" stroke-width="0.8" opacity="0.3"/>
            <circle cx="50" cy="22" r="4" fill="#d4a847" opacity="0.3"/>
        </svg>`,

        // 8: Psychologist - Brain with connections
        `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 25 Q65 20 70 35 Q78 40 72 52 Q75 62 65 68 Q60 78 50 75 Q40 78 35 68 Q25 62 28 52 Q22 40 30 35 Q35 20 50 25Z" stroke="#a078d0" stroke-width="2" fill="rgba(160,120,208,0.08)"/>
            <path d="M50 28 Q50 50 50 72" stroke="#a078d0" stroke-width="1" opacity="0.3"/>
            <path d="M38 35 Q50 45 62 35" stroke="#a078d0" stroke-width="1" opacity="0.3" fill="none"/>
            <path d="M32 50 Q50 55 68 50" stroke="#a078d0" stroke-width="1" opacity="0.3" fill="none"/>
            <circle cx="42" cy="40" r="2" fill="#a078d0" opacity="0.5"/>
            <circle cx="58" cy="40" r="2" fill="#a078d0" opacity="0.5"/>
            <circle cx="50" cy="55" r="2" fill="#a078d0" opacity="0.5"/>
            <circle cx="38" cy="60" r="1.5" fill="#a078d0" opacity="0.4"/>
            <circle cx="62" cy="60" r="1.5" fill="#a078d0" opacity="0.4"/>
        </svg>`,

        // 9: Computer Scientist - Terminal
        `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="18" y="22" width="64" height="48" rx="4" stroke="#5b9bd5" stroke-width="2" fill="rgba(91,155,213,0.08)"/>
            <rect x="22" y="26" width="56" height="40" rx="2" fill="rgba(0,20,40,0.5)"/>
            <text x="28" y="42" font-size="9" fill="#40d870" font-family="monospace" opacity="0.8">&gt;_</text>
            <text x="28" y="54" font-size="7" fill="#5b9bd5" font-family="monospace" opacity="0.5">0 1 1 0</text>
            <rect x="35" y="72" width="30" height="4" rx="1" fill="#5b9bd5" opacity="0.3"/>
            <rect x="42" y="76" width="16" height="2" rx="1" fill="#5b9bd5" opacity="0.2"/>
        </svg>`,

        // 10: AI Researcher - Neural network nodes
        `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="25" y1="30" x2="50" y2="40" stroke="#40d870" stroke-width="1" opacity="0.3"/>
            <line x1="25" y1="50" x2="50" y2="40" stroke="#40d870" stroke-width="1" opacity="0.3"/>
            <line x1="25" y1="70" x2="50" y2="60" stroke="#40d870" stroke-width="1" opacity="0.3"/>
            <line x1="25" y1="30" x2="50" y2="60" stroke="#40d870" stroke-width="0.5" opacity="0.2"/>
            <line x1="25" y1="70" x2="50" y2="40" stroke="#40d870" stroke-width="0.5" opacity="0.2"/>
            <line x1="50" y1="40" x2="75" y2="50" stroke="#40d870" stroke-width="1" opacity="0.3"/>
            <line x1="50" y1="60" x2="75" y2="50" stroke="#40d870" stroke-width="1" opacity="0.3"/>
            <circle cx="25" cy="30" r="5" fill="#40d870" opacity="0.5"/>
            <circle cx="25" cy="50" r="5" fill="#40d870" opacity="0.5"/>
            <circle cx="25" cy="70" r="5" fill="#40d870" opacity="0.5"/>
            <circle cx="50" cy="40" r="6" fill="#40d870" opacity="0.6"/>
            <circle cx="50" cy="60" r="6" fill="#40d870" opacity="0.6"/>
            <circle cx="75" cy="50" r="7" fill="#40d870" opacity="0.7"/>
        </svg>`,

        // 11: Quantum Thinker - Orbital waves
        `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="5" fill="#a078d0" opacity="0.8"/>
            <ellipse cx="50" cy="50" rx="35" ry="12" stroke="#a078d0" stroke-width="1.5" opacity="0.4" transform="rotate(0 50 50)"/>
            <ellipse cx="50" cy="50" rx="35" ry="12" stroke="#a078d0" stroke-width="1.5" opacity="0.4" transform="rotate(60 50 50)"/>
            <ellipse cx="50" cy="50" rx="35" ry="12" stroke="#a078d0" stroke-width="1.5" opacity="0.4" transform="rotate(120 50 50)"/>
            <circle cx="85" cy="50" r="2.5" fill="#d870a0" opacity="0.6"/>
            <circle cx="32" cy="25" r="2.5" fill="#d870a0" opacity="0.6"/>
            <circle cx="32" cy="75" r="2.5" fill="#d870a0" opacity="0.6"/>
        </svg>`,

        // 12: Posthuman - Cybernetic eye
        `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 50 Q50 20 85 50 Q50 80 15 50Z" stroke="#40d870" stroke-width="2" fill="rgba(64,216,112,0.05)"/>
            <circle cx="50" cy="50" r="14" stroke="#40d870" stroke-width="1.5" fill="rgba(64,216,112,0.1)"/>
            <circle cx="50" cy="50" r="7" fill="#40d870" opacity="0.6"/>
            <circle cx="50" cy="50" r="3" fill="#0a0a12"/>
            <line x1="36" y1="50" x2="20" y2="50" stroke="#40d870" stroke-width="0.8" opacity="0.3"/>
            <line x1="64" y1="50" x2="80" y2="50" stroke="#40d870" stroke-width="0.8" opacity="0.3"/>
            <line x1="50" y1="36" x2="50" y2="28" stroke="#40d870" stroke-width="0.8" opacity="0.3"/>
            <line x1="50" y1="64" x2="50" y2="72" stroke="#40d870" stroke-width="0.8" opacity="0.3"/>
            <rect x="46" y="46" width="8" height="8" rx="1" stroke="#40d870" stroke-width="0.5" fill="none" opacity="0.3" transform="rotate(45 50 50)"/>
        </svg>`,

        // 13: Galactic Philosopher - Spiral galaxy
        `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="4" fill="#d870a0" opacity="0.8"/>
            <path d="M50 50 Q55 40 65 38 Q80 36 78 50 Q76 62 65 65 Q52 68 45 62 Q35 54 40 42 Q45 32 58 30 Q75 28 82 45 Q88 65 72 75 Q55 85 38 75 Q22 62 28 42" stroke="#d870a0" stroke-width="1.5" fill="none" opacity="0.4"/>
            <circle cx="65" cy="38" r="1.5" fill="#ffffff" opacity="0.3"/>
            <circle cx="78" cy="50" r="1" fill="#ffffff" opacity="0.2"/>
            <circle cx="38" cy="75" r="1" fill="#ffffff" opacity="0.2"/>
            <circle cx="28" cy="42" r="1.5" fill="#ffffff" opacity="0.3"/>
            <circle cx="72" cy="75" r="1" fill="#ffffff" opacity="0.2"/>
        </svg>`,

        // 14: Cosmic Deity - Mandala eye
        `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="38" stroke="#d4a847" stroke-width="1" opacity="0.2"/>
            <circle cx="50" cy="50" r="28" stroke="#d4a847" stroke-width="1" opacity="0.3"/>
            <circle cx="50" cy="50" r="18" stroke="#d4a847" stroke-width="1.5" opacity="0.4"/>
            <circle cx="50" cy="50" r="8" fill="#d4a847" opacity="0.5"/>
            <circle cx="50" cy="50" r="3" fill="#ffffff" opacity="0.8"/>
            ${[0,45,90,135,180,225,270,315].map(a => {
                const r = a * Math.PI / 180;
                const x1 = 50 + Math.cos(r) * 18, y1 = 50 + Math.sin(r) * 18;
                const x2 = 50 + Math.cos(r) * 38, y2 = 50 + Math.sin(r) * 38;
                return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#d4a847" stroke-width="0.8" opacity="0.2"/>`;
            }).join('')}
            <path d="M12 50 Q50 30 88 50 Q50 70 12 50Z" stroke="#d4a847" stroke-width="1.5" fill="rgba(212,168,71,0.05)" opacity="0.5"/>
        </svg>`,
    ];
    return svgs[tier] || svgs[0];
}

// ============================================================================
// SECTION 3: GAME STATE
// ============================================================================

function createDefaultState() {
    return {
        thoughts: 0,
        totalThoughts: 0,
        allTimeThoughts: 0,
        fractionalThoughts: 0,
        thinkers: new Array(THINKERS.length).fill(0),
        highestThinkerUnlocked: 0,
        paradigms: new Array(PARADIGMS.length).fill(false),
        highestParadigm: -1,
        metaphilosophy: new Array(METAPHILOSOPHY.length).fill(false),
        wagerLevel: 0,
        wagerWins: 0,
        wagerLosses: 0,
        allTimeWagerWins: 0,
        allTimeWagerLosses: 0,
        clickLevel: 0,
        totalClicks: 0,
        allTimeClicks: 0,
        autoSlots: [],
        achievements: {},
        wisdom: 0,
        transcendenceCount: 0,
        eternalTruths: [],
        startTime: Date.now(),
        playTime: 0,
        lastSaveTime: Date.now(),
        currentTPS: 0,
    };
}

let state = createDefaultState();
let lastFrameTime = 0;
let lastTPSUpdate = 0;
let lastAutoUpdate = 0;
let lastAchievementCheck = 0;
let lastWagerTime = 0;
let soundEnabled = true;
let audioCtx = null;
let activeTab = 'thinkers';
let headerDirty = true;
let tabDirty = true;
let confirmCallback = null;
let cachedAccentColor = '#c9a84c';

// ============================================================================
// SECTION 4: UTILITY FUNCTIONS
// ============================================================================

const SUFFIXES = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'UDc', 'DDc'];

function formatNumber(n) {
    if (n === Infinity) return 'Infinity';
    if (n !== n) return '0'; // NaN check
    if (n < 0) return '-' + formatNumber(-n);
    if (n < 1000) return Math.floor(n).toString();
    const tier = Math.floor(Math.log10(n) / 3);
    if (tier >= SUFFIXES.length) return n.toExponential(2);
    const suffix = SUFFIXES[tier];
    const scale = Math.pow(10, tier * 3);
    const scaled = n / scale;
    return (scaled < 10 ? scaled.toFixed(2) : scaled < 100 ? scaled.toFixed(1) : Math.floor(scaled)) + suffix;
}

function getThinkerCost(tier) {
    const t = THINKERS[tier];
    return Math.floor(t.baseCost * Math.pow(t.costScale, state.thinkers[tier]));
}

function getTPS() {
    let paradigmMulti = 1;
    for (let i = 0; i < PARADIGMS.length; i++) {
        if (state.paradigms[i]) paradigmMulti += PARADIGMS[i].multi;
    }
    let metaMulti = 1;
    for (let i = 0; i < METAPHILOSOPHY.length; i++) {
        if (state.metaphilosophy[i]) metaMulti *= METAPHILOSOPHY[i].multi;
    }
    let baseTPS = 0;
    for (let i = 0; i < THINKERS.length; i++) {
        baseTPS += state.thinkers[i] * THINKERS[i].baseTPS;
    }
    let achievementBonus = 1 + Object.keys(state.achievements).length * 0.02;
    let wisdomBonus = 1 + state.wisdom * 0.03;
    let eternalBonus = 1;
    if (state.eternalTruths.includes('tpsMult')) eternalBonus *= 1.5;
    if (state.eternalTruths.includes('tpsDouble')) eternalBonus *= 2;
    return baseTPS * paradigmMulti * metaMulti * achievementBonus * wisdomBonus * eternalBonus;
}

function getMultiplier() {
    let paradigmMulti = 1;
    for (let i = 0; i < PARADIGMS.length; i++) {
        if (state.paradigms[i]) paradigmMulti += PARADIGMS[i].multi;
    }
    let metaMulti = 1;
    for (let i = 0; i < METAPHILOSOPHY.length; i++) {
        if (state.metaphilosophy[i]) metaMulti *= METAPHILOSOPHY[i].multi;
    }
    let achievementBonus = 1 + Object.keys(state.achievements).length * 0.02;
    let wisdomBonus = 1 + state.wisdom * 0.03;
    let eternalBonus = 1;
    if (state.eternalTruths.includes('tpsMult')) eternalBonus *= 1.5;
    if (state.eternalTruths.includes('tpsDouble')) eternalBonus *= 2;
    return paradigmMulti * metaMulti * achievementBonus * wisdomBonus * eternalBonus;
}

function getThoughtsPerClick() {
    let base = CLICK_UPGRADES[state.clickLevel].tpc;
    let multi = getMultiplier();
    let clickMult = state.eternalTruths.includes('clickMult') ? 3 : 1;
    return Math.floor(base * multi * clickMult) || 1;
}

function getWinChance() {
    let base = 50 + state.wagerLevel;
    if (state.eternalTruths.includes('wagerBonus')) base += 10;
    return Math.min(base, 95);
}

function getCurrentEra() {
    return state.highestParadigm + 1; // 0 = default, 1 = animism purchased, etc.
}

// ============================================================================
// SECTION 5: CORE MECHANICS
// ============================================================================

function buyThinker(tier) {
    const cost = getThinkerCost(tier);
    if (state.thoughts < cost) return false;
    state.thoughts -= cost;
    state.thinkers[tier]++;
    if (tier >= state.highestThinkerUnlocked && tier < THINKERS.length - 1) {
        state.highestThinkerUnlocked = tier + 1;
    }
    playSound('buy');
    flashCard('thinker-' + tier, 'flash-buy');
    headerDirty = true;
    tabDirty = true;
    return true;
}

function doClick() {
    const amount = getThoughtsPerClick();
    state.thoughts += amount;
    state.totalThoughts += amount;
    state.allTimeThoughts += amount;
    state.totalClicks++;
    state.allTimeClicks++;
    spawnFloatingNumber(amount);
    spawnClickParticles();
    playSound('click');
    headerDirty = true;
}

function buyClickUpgrade() {
    if (state.clickLevel >= CLICK_UPGRADES.length - 1) return;
    const nextLevel = state.clickLevel + 1;
    const cost = CLICK_UPGRADES[nextLevel].cost;
    if (state.thoughts < cost) return;
    state.thoughts -= cost;
    state.clickLevel = nextLevel;
    playSound('buy');
    headerDirty = true;
    tabDirty = true;
}

// ============================================================================
// SECTION 6: PARADIGMS & METAPHILOSOPHY
// ============================================================================

function buyParadigm(index) {
    if (state.paradigms[index]) return;
    if (index > 0 && !state.paradigms[index - 1]) return; // Must buy sequentially
    if (state.thoughts < PARADIGMS[index].cost) return;
    state.thoughts -= PARADIGMS[index].cost;
    state.paradigms[index] = true;
    if (index > state.highestParadigm) {
        state.highestParadigm = index;
    }
    applyEraTheme(getCurrentEra());
    spawnParadigmParticles();
    playSound('paradigm');
    document.getElementById('era-overlay').classList.add('paradigm-shift-flash');
    setTimeout(() => document.getElementById('era-overlay').classList.remove('paradigm-shift-flash'), 1500);
    headerDirty = true;
    tabDirty = true;
}

function buyMetaphilosophy(index) {
    if (state.metaphilosophy[index]) return;
    if (state.thoughts < METAPHILOSOPHY[index].cost) return;
    state.thoughts -= METAPHILOSOPHY[index].cost;
    state.metaphilosophy[index] = true;
    playSound('paradigm');
    headerDirty = true;
    tabDirty = true;
}

function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function applyEraTheme(eraIndex) {
    const era = ERA_THEMES[Math.min(eraIndex, ERA_THEMES.length - 1)];
    const idx = Math.min(eraIndex, ERA_THEMES.length - 1);
    document.documentElement.style.setProperty('--era-bg-1', era.bg);
    document.documentElement.style.setProperty('--accent', era.accent);
    document.documentElement.style.setProperty('--accent-glow', hexToRgba(era.accent, 0.3));
    const overlay = document.getElementById('era-overlay');
    overlay.style.background = `url('assets/bg/era_${idx}.png') center/cover no-repeat, ${era.bg}`;
    document.getElementById('era-name').textContent = era.name;
    cachedAccentColor = era.accent;
}

// ============================================================================
// SECTION 7: PASCAL'S WAGER
// ============================================================================

function doWager(thinkerIndex, isAuto) {
    if (state.thinkers[thinkerIndex] <= 0) return;

    // Manual wagers have a click throttle; auto wagers are throttled by the 1s update loop
    if (!isAuto) {
        const now = Date.now();
        if (now - lastWagerTime < 500) return;
        lastWagerTime = now;
    }

    const count = state.thinkers[thinkerIndex];
    const winChance = getWinChance();
    const roll = Math.random() * 100;

    if (roll < winChance) {
        state.thinkers[thinkerIndex] = count * 2;
        state.wagerWins++;
        state.allTimeWagerWins++;
        flashCard('thinker-' + thinkerIndex, 'flash-win');
        showWagerResult(true, THINKERS[thinkerIndex].name, count, count * 2);
        playSound('win');
    } else {
        state.thinkers[thinkerIndex] = 0;
        state.wagerLosses++;
        state.allTimeWagerLosses++;
        flashCard('thinker-' + thinkerIndex, 'flash-lose');
        showWagerResult(false, THINKERS[thinkerIndex].name, count, 0);
        playSound('lose');
    }
    headerDirty = true;
    tabDirty = true;
}

function buyWagerLevel() {
    if (state.wagerLevel >= WAGER_LEVEL_COSTS.length) return;
    const cost = WAGER_LEVEL_COSTS[state.wagerLevel];
    if (state.thoughts < cost) return;
    state.thoughts -= cost;
    state.wagerLevel++;
    playSound('buy');
    headerDirty = true;
    tabDirty = true;
}

function showWagerResult(won, name, before, after) {
    const el = document.getElementById('wager-result-display');
    if (!el) return;
    el.className = 'wager-result ' + (won ? 'win' : 'lose');
    el.textContent = won
        ? `Won! ${name}: ${before} \u2192 ${after}`
        : `Lost! ${name}: ${before} \u2192 0`;
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 3000);
}

// ============================================================================
// SECTION 8: AUTO SYSTEMS
// ============================================================================

function buyAutoSlot() {
    const slotIndex = state.autoSlots.length;
    if (slotIndex >= AUTO_SLOT_COSTS.length) return;
    const cost = AUTO_SLOT_COSTS[slotIndex];
    if (state.thoughts < cost) return;
    state.thoughts -= cost;
    state.autoSlots.push({
        thinkerIndex: 0,
        buyTarget: 0,
        wagerAbove: 0,
        enabled: false,
    });
    playSound('buy');
    headerDirty = true;
    tabDirty = true;
}

function updateAutoSystems(now) {
    if (now - lastAutoUpdate < 1000) return;
    lastAutoUpdate = now;

    for (const slot of state.autoSlots) {
        if (!slot.enabled) continue;
        const ti = slot.thinkerIndex;
        if (ti < 0 || ti >= THINKERS.length) continue;

        // Migrate old slot format if needed
        if (slot.buyStop !== undefined) {
            slot.buyTarget = slot.buyStop || 0;
            slot.wagerAbove = slot.wagerStart || 0;
            delete slot.buyStop;
            delete slot.wagerStart;
            delete slot.wagerStop;
        }

        // Auto-buy: buy thinkers until we reach the target count
        if (slot.buyTarget > 0 && state.thinkers[ti] < slot.buyTarget) {
            const cost = getThinkerCost(ti);
            if (state.thoughts >= cost) {
                state.thoughts -= cost;
                state.thinkers[ti]++;
                if (ti >= state.highestThinkerUnlocked && ti < THINKERS.length - 1) {
                    state.highestThinkerUnlocked = ti + 1;
                }
                headerDirty = true;
                tabDirty = true;
            }
        }

        // Auto-wager: wager when count is at or above threshold
        if (slot.wagerAbove > 0 && state.thinkers[ti] >= slot.wagerAbove) {
            doWager(ti, true);
        }
    }
}

// ============================================================================
// SECTION 9: ACHIEVEMENTS
// ============================================================================

function checkAchievements() {
    let newAchievements = false;
    for (const ach of ACHIEVEMENTS) {
        if (state.achievements[ach.id]) continue;
        if (ach.check(state)) {
            state.achievements[ach.id] = true;
            showToast(`${ach.icon} Achievement: ${ach.name}`, 'achievement-toast');
            newAchievements = true;
        }
    }
    if (newAchievements) {
        playSound('achievement');
        headerDirty = true;
        tabDirty = true;
    }
}

// ============================================================================
// SECTION 10: TRANSCENDENCE (Prestige)
// ============================================================================

function getWisdomGain() {
    if (state.totalThoughts < 1e9) return 0;
    return Math.floor(Math.pow(state.totalThoughts / 1e9, 0.5));
}

function doTranscendence() {
    const wisdomGain = getWisdomGain();
    if (wisdomGain <= 0) return;

    state.wisdom += wisdomGain;
    state.transcendenceCount++;

    // Reset most progress (keep allTime counters)
    state.thoughts = state.eternalTruths.includes('startThoughts') ? 1000 : 0;
    state.totalThoughts = 0;
    state.fractionalThoughts = 0;
    state.thinkers = new Array(THINKERS.length).fill(0);
    state.highestThinkerUnlocked = 0;
    state.clickLevel = 0;
    state.totalClicks = 0;
    state.wagerLevel = 0;
    state.wagerWins = 0;
    state.wagerLosses = 0;
    state.autoSlots = [];
    // Note: allTimeClicks, allTimeWagerWins, allTimeWagerLosses, allTimeThoughts are preserved

    if (state.eternalTruths.includes('freeParadigms')) {
        state.paradigms = new Array(PARADIGMS.length).fill(false);
        state.paradigms[0] = true;
        state.paradigms[1] = true;
        state.paradigms[2] = true;
        state.highestParadigm = 2;
    } else {
        state.paradigms = new Array(PARADIGMS.length).fill(false);
        state.highestParadigm = -1;
    }
    state.metaphilosophy = new Array(METAPHILOSOPHY.length).fill(false);

    applyEraTheme(getCurrentEra());
    playSound('transcend');
    showToast(`Transcended! +${wisdomGain} Wisdom`, 'achievement-toast');
    headerDirty = true;
    tabDirty = true;
    saveGame();
}

function buyEternalTruth(effect) {
    const truth = ETERNAL_TRUTHS.find(t => t.effect === effect);
    if (!truth) return;
    if (state.eternalTruths.includes(effect)) return;
    if (state.wisdom < truth.cost) return;
    state.wisdom -= truth.cost;
    state.eternalTruths.push(effect);
    playSound('paradigm');
    headerDirty = true;
    tabDirty = true;
}

// ============================================================================
// SECTION 11: PARTICLE SYSTEM
// ============================================================================

const particles = [];
let particleCanvas, particleCtx;

function initParticles() {
    particleCanvas = document.getElementById('particles');
    particleCtx = particleCanvas.getContext('2d');
    resizeParticleCanvas();
    window.addEventListener('resize', resizeParticleCanvas);
}

function resizeParticleCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
}

function spawnClickParticles() {
    const btn = document.getElementById('think-btn');
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 * i) / 6 + Math.random() * 0.5;
        particles.push({
            x: cx, y: cy,
            vx: Math.cos(angle) * (1.5 + Math.random() * 2),
            vy: Math.sin(angle) * (1.5 + Math.random() * 2),
            life: 1,
            decay: 0.02 + Math.random() * 0.02,
            size: 2 + Math.random() * 2,
            color: cachedAccentColor,
        });
    }
}

function spawnParadigmParticles() {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 4;
        particles.push({
            x: cx, y: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
            decay: 0.008 + Math.random() * 0.01,
            size: 2 + Math.random() * 4,
            color: cachedAccentColor,
        });
    }
}

function spawnAmbientParticle() {
    if (particles.length > 80) return;
    const tps = state.currentTPS;
    if (tps <= 0) return;
    if (Math.random() > Math.min(0.3, tps / 1000)) return;
    particles.push({
        x: Math.random() * particleCanvas.width,
        y: particleCanvas.height + 5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(0.3 + Math.random() * 0.7),
        life: 1,
        decay: 0.003 + Math.random() * 0.005,
        size: 1 + Math.random() * 2,
        color: cachedAccentColor,
    });
}

function updateParticles() {
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0) {
            particles.splice(i, 1);
            continue;
        }
        particleCtx.globalAlpha = p.life * 0.6;
        particleCtx.fillStyle = p.color;
        particleCtx.beginPath();
        particleCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        particleCtx.fill();
    }
    particleCtx.globalAlpha = 1;
}

// ============================================================================
// SECTION 12: SOUND SYSTEM
// ============================================================================

function initAudio() {
    if (audioCtx) return;
    try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        soundEnabled = false;
    }
}

function playSound(type) {
    if (!soundEnabled || !audioCtx) return;
    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        const now = audioCtx.currentTime;

        switch (type) {
            case 'click':
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
                gain.gain.setValueAtTime(0.06, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                osc.start(now);
                osc.stop(now + 0.08);
                break;
            case 'buy':
                osc.frequency.setValueAtTime(400, now);
                osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
                osc.start(now);
                osc.stop(now + 0.15);
                break;
            case 'paradigm':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(300, now);
                osc.frequency.exponentialRampToValueAtTime(900, now + 0.3);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
                osc.start(now);
                osc.stop(now + 0.5);
                break;
            case 'win':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(500, now);
                osc.frequency.setValueAtTime(700, now + 0.1);
                osc.frequency.setValueAtTime(900, now + 0.2);
                gain.gain.setValueAtTime(0.06, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
                osc.start(now);
                osc.stop(now + 0.35);
                break;
            case 'lose':
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(300, now);
                osc.frequency.exponentialRampToValueAtTime(100, now + 0.3);
                gain.gain.setValueAtTime(0.04, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
                break;
            case 'achievement':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.setValueAtTime(800, now + 0.1);
                osc.frequency.setValueAtTime(1000, now + 0.2);
                osc.frequency.setValueAtTime(1200, now + 0.3);
                gain.gain.setValueAtTime(0.06, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
                osc.start(now);
                osc.stop(now + 0.5);
                break;
            case 'transcend':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(200, now);
                osc.frequency.exponentialRampToValueAtTime(1600, now + 1);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
                osc.start(now);
                osc.stop(now + 1.2);
                break;
        }
    } catch (e) { /* audio error, ignore */ }
}

// ============================================================================
// SECTION 13: UI RENDERING
// ============================================================================

function flashCard(id, className) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove(className);
    void el.offsetWidth; // force reflow
    el.classList.add(className);
    setTimeout(() => el.classList.remove(className), 600);
}

function spawnFloatingNumber(amount) {
    const btn = document.getElementById('think-btn');
    const rect = btn.getBoundingClientRect();
    const el = document.createElement('div');
    el.className = 'float-thought';
    el.textContent = '+' + formatNumber(amount);
    el.style.left = (rect.left + rect.width / 2 - 20) + 'px';
    el.style.top = (rect.top - 10) + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
}

function showToast(message, className) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast ' + (className || '');
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function showConfirm(title, message, callback) {
    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-message').textContent = message;
    document.getElementById('confirm-modal').classList.remove('hidden');
    confirmCallback = callback;
}

// --- Tab visibility logic ---
function updateTabVisibility() {
    const wagerTab = document.querySelector('[data-tab="wager"]');
    const autoTab = document.querySelector('[data-tab="auto"]');
    const transTab = document.querySelector('[data-tab="transcendence"]');

    // Wager: visible after buying first storyteller (tier 1)
    if (state.thinkers[1] >= 1 || state.allTimeWagerWins > 0 || state.allTimeWagerLosses > 0) {
        wagerTab.classList.remove('hidden');
    }

    // Auto: visible after buying first alchemist (tier 4)
    if (state.thinkers[4] >= 1 || state.autoSlots.length > 0) {
        autoTab.classList.remove('hidden');
    }

    // Transcendence: visible after 1M total thoughts or any previous transcendence
    if (state.totalThoughts >= 1e6 || state.transcendenceCount > 0 || state.wisdom > 0) {
        transTab.classList.remove('hidden');
    }
}

// --- Main UI render ---
function renderHeader() {
    if (!headerDirty) return;
    headerDirty = false;
    document.getElementById('thought-count').textContent = formatNumber(state.thoughts);
    document.getElementById('tps').textContent = formatNumber(state.currentTPS);
    document.getElementById('multiplier').textContent = formatNumber(getMultiplier());
    document.getElementById('think-value').textContent = '+' + formatNumber(getThoughtsPerClick());
    updateTabVisibility();
}

function renderActiveTab() {
    if (!tabDirty) return;
    tabDirty = false;
    switch (activeTab) {
        case 'thinkers': renderThinkers(); break;
        case 'paradigms': renderParadigms(); break;
        case 'wager': renderWager(); break;
        case 'auto': renderAuto(); break;
        case 'achievements': renderAchievements(); break;
        case 'transcendence': renderTranscendence(); break;
        case 'stats': renderStats(); break;
    }
}

function renderThinkers() {
    // Click upgrade
    const clickDiv = document.getElementById('click-upgrades');
    let clickHtml = '';
    if (state.clickLevel < CLICK_UPGRADES.length - 1) {
        const nextCost = CLICK_UPGRADES[state.clickLevel + 1].cost;
        const nextTPC = CLICK_UPGRADES[state.clickLevel + 1].tpc;
        const canAfford = state.thoughts >= nextCost;
        clickHtml = `<div class="click-upgrade-card ${canAfford ? '' : 'cant-afford'}" onclick="buyClickUpgrade()">
            <div>
                <div style="font-weight:600;font-size:0.9rem;">Deeper Thought (Lv ${state.clickLevel})</div>
                <div style="font-size:0.75rem;color:var(--text-secondary);">Next: ${formatNumber(nextTPC)} base thoughts per click</div>
            </div>
            <div style="text-align:right;">
                <div style="font-size:0.85rem;color:var(--accent);">Cost: ${formatNumber(nextCost)}</div>
            </div>
        </div>`;
    } else {
        clickHtml = `<div class="click-upgrade-card maxed">
            <div style="font-weight:600;font-size:0.9rem;">Deeper Thought (MAX)</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);">${formatNumber(CLICK_UPGRADES[state.clickLevel].tpc)} base thoughts per click</div>
        </div>`;
    }

    clickDiv.innerHTML = clickHtml;

    // Thinker grid
    const grid = document.getElementById('thinker-grid');
    let html = '';
    for (let i = 0; i <= state.highestThinkerUnlocked && i < THINKERS.length; i++) {
        const t = THINKERS[i];
        const cost = getThinkerCost(i);
        const canAfford = state.thoughts >= cost;
        const tps = t.baseTPS * state.thinkers[i];
        html += `<div class="thinker-card ${canAfford ? '' : 'cant-afford'}" id="thinker-${i}" onclick="buyThinker(${i})" title="${t.name}: ${t.baseTPS} base TPS each">
            <div class="thinker-icon"><img src="assets/thinkers/thinker_${i}.png" alt="${t.name}"></div>
            <div class="thinker-info">
                <div class="thinker-name">${t.name}</div>
                <div class="thinker-stats">
                    <span>${t.baseTPS} TPS each</span>
                    <span>${formatNumber(tps)} total</span>
                </div>
                <div class="thinker-cost">Cost: ${formatNumber(cost)}</div>
            </div>
            <div class="thinker-count">${state.thinkers[i]}</div>
        </div>`;
    }

    // Show next locked thinker as preview
    if (state.highestThinkerUnlocked < THINKERS.length - 1) {
        const nextIdx = state.highestThinkerUnlocked + 1;
        html += `<div class="thinker-card locked">
            <div class="thinker-icon" style="opacity:0.3"><img src="assets/thinkers/thinker_${nextIdx}.png" alt="?" style="filter:brightness(0.3)"></div>
            <div class="thinker-info">
                <div class="thinker-name" style="color:var(--text-muted);">???</div>
                <div class="thinker-stats"><span>Purchase a ${THINKERS[state.highestThinkerUnlocked].name} to reveal</span></div>
            </div>
        </div>`;
    }

    grid.innerHTML = html;
}

function renderParadigms() {
    const grid = document.getElementById('paradigm-grid');
    let html = '';

    // Find the first unpurchased paradigm index
    let firstUnpurchased = PARADIGMS.length;
    for (let i = 0; i < PARADIGMS.length; i++) {
        if (!state.paradigms[i]) { firstUnpurchased = i; break; }
    }

    for (let i = 0; i < PARADIGMS.length; i++) {
        const p = PARADIGMS[i];
        if (state.paradigms[i]) {
            // Already purchased
            html += `<div class="paradigm-card purchased">
                <span class="check-icon">\u2713</span>
                <div class="paradigm-name">${p.name}</div>
                <div class="paradigm-desc">${p.desc}</div>
                <div class="paradigm-effect">+${p.multi} to multiplier (active)</div>
            </div>`;
        } else if (i === firstUnpurchased) {
            // Next available
            const canAfford = state.thoughts >= p.cost;
            html += `<div class="paradigm-card ${canAfford ? '' : 'cant-afford'}" onclick="buyParadigm(${i})">
                <div class="paradigm-name">${p.name}</div>
                <div class="paradigm-desc">${p.desc}</div>
                <div class="paradigm-effect">+${p.multi} to multiplier</div>
                <div class="paradigm-cost">Cost: ${formatNumber(p.cost)}</div>
            </div>`;
        } else if (i === firstUnpurchased + 1) {
            // Preview of next
            html += `<div class="paradigm-card cant-afford" style="opacity:0.5">
                <div class="paradigm-name">${p.name}</div>
                <div class="paradigm-desc">${p.desc}</div>
                <div class="paradigm-effect">+${p.multi} to multiplier</div>
                <div class="paradigm-cost">Cost: ${formatNumber(p.cost)}</div>
            </div>`;
            break;
        } else {
            break;
        }
    }

    grid.innerHTML = html;

    // Metaphilosophy
    const metaSection = document.getElementById('metaphilosophy-section');
    if (state.highestParadigm >= 5) { // Unlocks after Renaissance Humanism
        metaSection.classList.remove('hidden');
        const metaGrid = document.getElementById('metaphilosophy-grid');
        let metaHtml = '';
        for (let i = 0; i < METAPHILOSOPHY.length; i++) {
            const m = METAPHILOSOPHY[i];
            if (state.metaphilosophy[i]) {
                metaHtml += `<div class="meta-card purchased">
                    <div style="font-weight:600">${m.name}</div>
                    <div style="font-size:0.85rem;color:var(--accent-secondary);margin-top:4px;">x${m.multi} (active)</div>
                </div>`;
            } else {
                const canAfford = state.thoughts >= m.cost;
                metaHtml += `<div class="meta-card ${canAfford ? '' : 'cant-afford'}" onclick="buyMetaphilosophy(${i})">
                    <div style="font-weight:600">${m.name}</div>
                    <div style="font-size:0.85rem;color:var(--accent-secondary);margin-top:4px;">x${m.multi} multiplier</div>
                    <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">Cost: ${formatNumber(m.cost)}</div>
                </div>`;
                break; // Show only next unpurchased
            }
        }
        metaGrid.innerHTML = metaHtml;
    } else {
        metaSection.classList.add('hidden');
    }
}

function renderWager() {
    const content = document.getElementById('wager-content');
    const hasStoryTeller = state.thinkers[1] >= 1 || state.wagerWins > 0 || state.allTimeWagerWins > 0;
    if (!hasStoryTeller) {
        content.innerHTML = '<p style="color:var(--text-secondary)">Purchase a Storyteller to unlock wagering.</p>';
        return;
    }
    // Skip re-render if user has the select focused
    if (content.contains(document.activeElement)) return;

    // Build thinker options for wager
    let options = '';
    for (let i = 0; i < THINKERS.length; i++) {
        if (state.thinkers[i] > 0) {
            options += `<option value="${i}">${THINKERS[i].name} (${state.thinkers[i]})</option>`;
        }
    }

    const winChance = getWinChance();

    let html = `<div class="wager-panel">
        <h3>Place Your Wager</h3>
        <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:12px;">
            Select a thinker type to wager. Win = double them. Lose = lose all of that type.
        </p>
        <select class="wager-select" id="wager-select">${options}</select>
        <div class="wager-info">
            <span>Win chance: <span class="win-chance">${winChance}%</span></span>
            <span>Wins: ${state.wagerWins} | Losses: ${state.wagerLosses}</span>
        </div>
        <button class="wager-btn" onclick="doWager(parseInt(document.getElementById('wager-select').value))" ${options ? '' : 'disabled'}>
            Take the Wager
        </button>
        <div id="wager-result-display" class="wager-result" style="display:none"></div>
    </div>`;

    // Wager level upgrade
    if (state.thinkers[2] >= 1 || state.wagerLevel > 0) {
        html += `<div class="wager-level-panel">
            <h3 style="font-size:1rem;color:var(--accent);margin-bottom:8px;">Improve Your Odds</h3>
            <p style="font-size:0.85rem;color:var(--text-secondary);">Current win chance: ${winChance}% (Level ${state.wagerLevel}/${WAGER_LEVEL_COSTS.length})</p>
            <div class="wager-level-bar">
                <div class="wager-level-fill" style="width:${(state.wagerLevel / WAGER_LEVEL_COSTS.length) * 100}%"></div>
            </div>`;
        if (state.wagerLevel < WAGER_LEVEL_COSTS.length) {
            const cost = WAGER_LEVEL_COSTS[state.wagerLevel];
            const canAfford = state.thoughts >= cost;
            html += `<button class="wager-upgrade-btn" onclick="buyWagerLevel()" ${canAfford ? '' : 'disabled'}>
                +1% Win Chance (Cost: ${formatNumber(cost)})
            </button>`;
        } else {
            html += `<p style="font-size:0.85rem;color:var(--accent);margin-top:8px;">Maximum level reached!</p>`;
        }
        html += `</div>`;
    }

    content.innerHTML = html;
}

function renderAuto() {
    const content = document.getElementById('auto-content');
    const hasAlchemist = state.thinkers[4] >= 1 || state.autoSlots.length > 0;
    if (!hasAlchemist) {
        content.innerHTML = '<p style="color:var(--text-secondary)">Purchase an Alchemist to unlock automation.</p>';
        return;
    }
    // Skip re-render if user is interacting with inputs in this section
    if (content.contains(document.activeElement) && document.activeElement.tagName !== 'BUTTON') return;

    let html = '<p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:16px;">Each slot operates independently. Set a thinker type, a buy target, and a wager threshold.</p>';

    // Render existing slots
    for (let i = 0; i < state.autoSlots.length; i++) {
        const slot = state.autoSlots[i];
        // Migrate old format
        if (slot.buyStop !== undefined) {
            slot.buyTarget = slot.buyStop || 0;
            slot.wagerAbove = slot.wagerStart || 0;
            delete slot.buyStop;
            delete slot.wagerStart;
            delete slot.wagerStop;
        }
        let options = '';
        for (let j = 0; j <= state.highestThinkerUnlocked && j < THINKERS.length; j++) {
            options += `<option value="${j}" ${slot.thinkerIndex === j ? 'selected' : ''}>${THINKERS[j].name}</option>`;
        }

        html += `<div class="auto-slot-panel ${slot.enabled ? 'active-slot' : ''}">
            <div class="auto-slot-header">
                <span style="font-weight:600;font-size:0.9rem;">Slot ${i + 1}</span>
                <button class="auto-toggle ${slot.enabled ? 'on' : ''}" onclick="toggleAutoSlot(${i})"></button>
            </div>
            <div class="auto-slot-config">
                <div class="auto-field" style="grid-column:1/-1">
                    <label>Thinker Type</label>
                    <select onchange="updateAutoSlot(${i},'thinkerIndex',parseInt(this.value))">${options}</select>
                </div>
                <div class="auto-field">
                    <label>Buy up to</label>
                    <input type="number" min="0" value="${slot.buyTarget}" onchange="updateAutoSlot(${i},'buyTarget',parseInt(this.value)||0)" placeholder="0 = off">
                </div>
                <div class="auto-field">
                    <label>Wager above</label>
                    <input type="number" min="0" value="${slot.wagerAbove}" onchange="updateAutoSlot(${i},'wagerAbove',parseInt(this.value)||0)" placeholder="0 = off">
                </div>
            </div>
        </div>`;
    }

    // Buy new slot button
    if (state.autoSlots.length < AUTO_SLOT_COSTS.length) {
        const cost = AUTO_SLOT_COSTS[state.autoSlots.length];
        const canAfford = state.thoughts >= cost;
        html += `<button class="buy-auto-btn" onclick="buyAutoSlot()" ${canAfford ? '' : 'disabled'}>
            + New Auto Slot (Cost: ${formatNumber(cost)})
        </button>`;
    } else {
        html += `<p style="font-size:0.85rem;color:var(--text-muted);margin-top:12px;text-align:center;">All 3 automation slots unlocked.</p>`;
    }

    content.innerHTML = html;
}

function toggleAutoSlot(index) {
    state.autoSlots[index].enabled = !state.autoSlots[index].enabled;
    tabDirty = true;
}

function updateAutoSlot(index, field, value) {
    state.autoSlots[index][field] = value;
}

function renderAchievements() {
    const progress = document.getElementById('achievement-progress');
    const unlocked = Object.keys(state.achievements).length;
    const total = ACHIEVEMENTS.length;
    const pct = total > 0 ? (unlocked / total * 100) : 0;
    progress.innerHTML = `<div style="display:flex;justify-content:space-between;font-size:0.9rem;">
        <span>${unlocked} / ${total} Achievements</span>
        <span style="color:var(--accent);">+${unlocked * 2}% bonus</span>
    </div>
    <div class="achievement-bar"><div class="achievement-bar-fill" style="width:${pct}%"></div></div>`;

    const grid = document.getElementById('achievement-grid');
    let html = '';
    for (const ach of ACHIEVEMENTS) {
        const isUnlocked = state.achievements[ach.id];
        html += `<div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'}">
            <span class="achievement-icon">${isUnlocked ? ach.icon : '\u{1F512}'}</span>
            <div class="achievement-name">${isUnlocked ? ach.name : '???'}</div>
            <div class="achievement-desc">${isUnlocked ? ach.desc : 'Keep playing to discover'}</div>
        </div>`;
    }
    grid.innerHTML = html;
}

function renderTranscendence() {
    const content = document.getElementById('transcendence-content');
    const wisdomGain = getWisdomGain();
    const canTranscend = wisdomGain > 0;

    let html = `<div class="transcend-panel">
        <h3>Wisdom</h3>
        <div class="wisdom-display">${state.wisdom}</div>
        <p style="font-size:0.85rem;color:var(--text-secondary);">
            Each point of Wisdom provides +3% to all production.<br>
            Transcendences: ${state.transcendenceCount}
        </p>
    </div>`;

    html += `<div class="transcend-panel">
        <h3>Transcend</h3>
        <p class="wisdom-preview">
            ${canTranscend
                ? `You will gain <strong style="color:var(--accent-secondary)">${wisdomGain}</strong> Wisdom from your ${formatNumber(state.totalThoughts)} thoughts.`
                : 'You need at least 1 billion total thoughts to transcend.'}
        </p>
        <p style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:16px;">
            Transcending resets: thoughts, thinkers, paradigms, wager level, and auto-systems.<br>
            Keeps: wisdom, eternal truths, achievements.
        </p>
        <button class="transcend-btn" ${canTranscend ? '' : 'disabled'} onclick="confirmTranscendence()">
            Transcend (+${wisdomGain} Wisdom)
        </button>
    </div>`;

    // Eternal Truths
    html += `<div class="transcend-panel">
        <h3>Eternal Truths</h3>
        <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:12px;">
            Permanent upgrades purchased with Wisdom.
        </p>`;

    for (const truth of ETERNAL_TRUTHS) {
        const owned = state.eternalTruths.includes(truth.effect);
        const canAfford = state.wisdom >= truth.cost;
        html += `<div class="eternal-truth-card ${owned ? 'purchased' : (canAfford ? '' : 'cant-afford')}" ${owned ? '' : `onclick="buyEternalTruth('${truth.effect}')"`}>
            <div style="display:flex;justify-content:space-between;align-items:center;">
                <div>
                    <div style="font-weight:600;font-size:0.9rem;">${truth.name} ${owned ? '\u2713' : ''}</div>
                    <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:2px;">${truth.desc}</div>
                </div>
                ${owned ? '' : `<div style="color:var(--accent-secondary);font-weight:600;">${truth.cost} W</div>`}
            </div>
        </div>`;
    }

    html += `</div>`;
    content.innerHTML = html;
}

function confirmTranscendence() {
    showConfirm('Transcend?', 'This will reset most of your progress in exchange for permanent Wisdom. Are you sure?', doTranscendence);
}

function renderStats() {
    const content = document.getElementById('stats-content');
    const playSeconds = Math.floor((state.playTime + (Date.now() - state.lastSaveTime)) / 1000);
    const hours = Math.floor(playSeconds / 3600);
    const minutes = Math.floor((playSeconds % 3600) / 60);
    const seconds = playSeconds % 60;

    const totalThinkers = state.thinkers.reduce((a, b) => a + b, 0);

    let html = `<div class="stats-panel">
        <h3>Production</h3>
        <div class="stat-row"><span class="stat-label">Current Thoughts</span><span class="stat-value">${formatNumber(state.thoughts)}</span></div>
        <div class="stat-row"><span class="stat-label">Thoughts Per Second</span><span class="stat-value">${formatNumber(state.currentTPS)}</span></div>
        <div class="stat-row"><span class="stat-label">Total Multiplier</span><span class="stat-value">x${formatNumber(getMultiplier())}</span></div>
        <div class="stat-row"><span class="stat-label">Thoughts Per Click</span><span class="stat-value">${formatNumber(getThoughtsPerClick())}</span></div>
    </div>`;

    html += `<div class="stats-panel">
        <h3>Progress</h3>
        <div class="stat-row"><span class="stat-label">Total Thoughts (this run)</span><span class="stat-value">${formatNumber(state.totalThoughts)}</span></div>
        <div class="stat-row"><span class="stat-label">All-Time Thoughts</span><span class="stat-value">${formatNumber(state.allTimeThoughts)}</span></div>
        <div class="stat-row"><span class="stat-label">Total Thinkers</span><span class="stat-value">${totalThinkers}</span></div>
        <div class="stat-row"><span class="stat-label">Paradigms Unlocked</span><span class="stat-value">${state.paradigms.filter(p => p).length} / ${PARADIGMS.length}</span></div>
        <div class="stat-row"><span class="stat-label">Total Clicks</span><span class="stat-value">${formatNumber(state.totalClicks)}</span></div>
        <div class="stat-row"><span class="stat-label">All-Time Clicks</span><span class="stat-value">${formatNumber(state.allTimeClicks)}</span></div>
    </div>`;

    html += `<div class="stats-panel">
        <h3>Wagering</h3>
        <div class="stat-row"><span class="stat-label">Wager Wins (this run)</span><span class="stat-value">${state.wagerWins}</span></div>
        <div class="stat-row"><span class="stat-label">Wager Losses (this run)</span><span class="stat-value">${state.wagerLosses}</span></div>
        <div class="stat-row"><span class="stat-label">All-Time Wins</span><span class="stat-value">${state.allTimeWagerWins}</span></div>
        <div class="stat-row"><span class="stat-label">Win Rate</span><span class="stat-value">${state.allTimeWagerWins + state.allTimeWagerLosses > 0 ? Math.round(state.allTimeWagerWins / (state.allTimeWagerWins + state.allTimeWagerLosses) * 100) : 0}%</span></div>
        <div class="stat-row"><span class="stat-label">Wager Level</span><span class="stat-value">${state.wagerLevel} / ${WAGER_LEVEL_COSTS.length}</span></div>
    </div>`;

    html += `<div class="stats-panel">
        <h3>Transcendence</h3>
        <div class="stat-row"><span class="stat-label">Wisdom</span><span class="stat-value">${state.wisdom}</span></div>
        <div class="stat-row"><span class="stat-label">Times Transcended</span><span class="stat-value">${state.transcendenceCount}</span></div>
        <div class="stat-row"><span class="stat-label">Eternal Truths</span><span class="stat-value">${state.eternalTruths.length} / ${ETERNAL_TRUTHS.length}</span></div>
        <div class="stat-row"><span class="stat-label">Achievements</span><span class="stat-value">${Object.keys(state.achievements).length} / ${ACHIEVEMENTS.length}</span></div>
    </div>`;

    html += `<div class="stats-panel">
        <h3>Session</h3>
        <div class="stat-row"><span class="stat-label">Play Time</span><span class="stat-value">${hours}h ${minutes}m ${seconds}s</span></div>
    </div>`;

    content.innerHTML = html;
}

// ============================================================================
// SECTION 14: PERSISTENCE (Save/Load)
// ============================================================================

function saveGame() {
    const saveData = {
        version: 3,
        state: {
            thoughts: state.thoughts,
            totalThoughts: state.totalThoughts,
            allTimeThoughts: state.allTimeThoughts,
            fractionalThoughts: state.fractionalThoughts,
            thinkers: state.thinkers,
            highestThinkerUnlocked: state.highestThinkerUnlocked,
            paradigms: state.paradigms,
            highestParadigm: state.highestParadigm,
            metaphilosophy: state.metaphilosophy,
            wagerLevel: state.wagerLevel,
            wagerWins: state.wagerWins,
            wagerLosses: state.wagerLosses,
            allTimeWagerWins: state.allTimeWagerWins,
            allTimeWagerLosses: state.allTimeWagerLosses,
            clickLevel: state.clickLevel,
            totalClicks: state.totalClicks,
            allTimeClicks: state.allTimeClicks,
            autoSlots: state.autoSlots,
            achievements: state.achievements,
            wisdom: state.wisdom,
            transcendenceCount: state.transcendenceCount,
            eternalTruths: state.eternalTruths,
            startTime: state.startTime,
            playTime: state.playTime + (Date.now() - state.lastSaveTime),
            currentTPS: state.currentTPS,
        },
        savedAt: Date.now(),
    };
    try {
        localStorage.setItem('philosophyIncremental', JSON.stringify(saveData));
    } catch (e) { /* storage full, ignore */ }
    state.lastSaveTime = Date.now();
}

function loadGame() {
    try {
        const raw = localStorage.getItem('philosophyIncremental');
        if (!raw) return false;
        const data = JSON.parse(raw);
        if (!data || !data.state) return false;

        const s = data.state;
        state.thoughts = s.thoughts || 0;
        state.totalThoughts = s.totalThoughts || 0;
        state.allTimeThoughts = s.allTimeThoughts || 0;
        state.fractionalThoughts = s.fractionalThoughts || 0;
        state.thinkers = s.thinkers || new Array(THINKERS.length).fill(0);
        state.highestThinkerUnlocked = s.highestThinkerUnlocked || 0;
        state.paradigms = s.paradigms || new Array(PARADIGMS.length).fill(false);
        state.highestParadigm = s.highestParadigm !== undefined ? s.highestParadigm : -1;
        state.metaphilosophy = s.metaphilosophy || new Array(METAPHILOSOPHY.length).fill(false);
        state.wagerLevel = s.wagerLevel || 0;
        state.wagerWins = s.wagerWins || 0;
        state.wagerLosses = s.wagerLosses || 0;
        state.allTimeWagerWins = s.allTimeWagerWins || 0;
        state.allTimeWagerLosses = s.allTimeWagerLosses || 0;
        state.clickLevel = s.clickLevel || 0;
        state.totalClicks = s.totalClicks || 0;
        state.allTimeClicks = s.allTimeClicks || 0;
        state.autoSlots = (s.autoSlots || []).slice(0, AUTO_SLOT_COSTS.length);
        // Migrate old slot format
        for (const slot of state.autoSlots) {
            if (slot.buyStop !== undefined) {
                slot.buyTarget = slot.buyStop || 0;
                slot.wagerAbove = slot.wagerStart || 0;
                delete slot.buyStop;
                delete slot.wagerStart;
                delete slot.wagerStop;
            }
        }
        state.achievements = s.achievements || {};
        state.wisdom = s.wisdom || 0;
        state.transcendenceCount = s.transcendenceCount || 0;
        state.eternalTruths = s.eternalTruths || [];
        state.startTime = s.startTime || Date.now();
        state.playTime = s.playTime || 0;
        state.lastSaveTime = Date.now();

        // Ensure thinkers array is correct length
        while (state.thinkers.length < THINKERS.length) state.thinkers.push(0);
        while (state.paradigms.length < PARADIGMS.length) state.paradigms.push(false);
        while (state.metaphilosophy.length < METAPHILOSOPHY.length) state.metaphilosophy.push(false);

        // Calculate offline progress
        if (data.savedAt) {
            const elapsed = (Date.now() - data.savedAt) / 1000;
            if (elapsed > 10) { // More than 10 seconds away
                const tps = s.currentTPS || 0;
                const offlineThoughts = Math.floor(tps * elapsed * 0.5); // 50% efficiency while offline
                if (offlineThoughts > 0) {
                    state.thoughts += offlineThoughts;
                    state.totalThoughts += offlineThoughts;
                    state.allTimeThoughts += offlineThoughts;
                    showOfflineModal(elapsed, offlineThoughts);
                }
            }
        }

        applyEraTheme(getCurrentEra());
        return true;
    } catch (e) {
        return false;
    }
}

function showOfflineModal(seconds, thoughts) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    let timeStr = '';
    if (hours > 0) timeStr += hours + 'h ';
    if (minutes > 0) timeStr += minutes + 'm ';
    timeStr += Math.floor(seconds % 60) + 's';

    document.getElementById('offline-message').innerHTML =
        `You were away for <strong>${timeStr}</strong>.<br>Your thinkers generated <strong style="color:var(--accent)">${formatNumber(thoughts)}</strong> thoughts while you were gone.`;
    document.getElementById('offline-modal').classList.remove('hidden');
}

let isRestarting = false;

function restartGame() {
    showConfirm('Restart Game?', 'This will permanently erase ALL progress, including wisdom and eternal truths. This cannot be undone.', () => {
        isRestarting = true;
        localStorage.removeItem('philosophyIncremental');
        location.reload();
    });
}

// ============================================================================
// SECTION 15: GAME LOOP
// ============================================================================

function gameLoop(timestamp) {
    if (!lastFrameTime) lastFrameTime = timestamp;
    const dt = Math.min((timestamp - lastFrameTime) / 1000, 0.1); // Cap at 100ms
    lastFrameTime = timestamp;

    // Thought accumulation
    const tps = getTPS();
    state.currentTPS = tps;
    const thoughtsThisFrame = tps * dt + state.fractionalThoughts;
    const wholeThoughts = Math.floor(thoughtsThisFrame);
    state.fractionalThoughts = thoughtsThisFrame - wholeThoughts;
    if (wholeThoughts > 0) {
        state.thoughts += wholeThoughts;
        state.totalThoughts += wholeThoughts;
        state.allTimeThoughts += wholeThoughts;
        headerDirty = true;
    }

    // Auto systems
    updateAutoSystems(timestamp);

    // Ambient particles
    spawnAmbientParticle();
    updateParticles();

    // Achievement check (throttled)
    if (timestamp - lastAchievementCheck > 2000) {
        lastAchievementCheck = timestamp;
        checkAchievements();
    }

    // TPS display throttle + periodic tab refresh for affordability updates
    if (timestamp - lastTPSUpdate > 500) {
        lastTPSUpdate = timestamp;
        tabDirty = true;
    }

    renderHeader();
    renderActiveTab();
    requestAnimationFrame(gameLoop);
}

// ============================================================================
// SECTION 16: EVENT HANDLERS & INITIALIZATION
// ============================================================================

function initEventHandlers() {
    // Tab switching
    document.getElementById('tabs').addEventListener('click', (e) => {
        const tab = e.target.closest('.tab');
        if (!tab || tab.classList.contains('hidden')) return;
        const tabName = tab.dataset.tab;
        if (tabName === activeTab) return;

        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tabName).classList.add('active');
        activeTab = tabName;
        headerDirty = true;
        tabDirty = true;
    });

    // Think button
    document.getElementById('think-btn').addEventListener('click', (e) => {
        initAudio();
        doClick();

        // Ripple effect
        const btn = e.currentTarget;
        const ripple = document.createElement('div');
        ripple.className = 'think-ripple';
        const rect = btn.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });

    // Header buttons
    document.getElementById('save-btn').addEventListener('click', () => {
        saveGame();
        showToast('Game saved!');
    });

    document.getElementById('sound-btn').addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        document.getElementById('sound-btn').textContent = soundEnabled ? '\u{1F50A}' : '\u{1F507}';
    });

    document.getElementById('restart-btn').addEventListener('click', restartGame);
    document.getElementById('changelog-btn').addEventListener('click', showChangelog);
    document.getElementById('changelog-dismiss').addEventListener('click', dismissChangelog);

    // Modal handlers
    document.getElementById('offline-dismiss').addEventListener('click', () => {
        document.getElementById('offline-modal').classList.add('hidden');
        initAudio();
    });

    document.getElementById('confirm-yes').addEventListener('click', () => {
        document.getElementById('confirm-modal').classList.add('hidden');
        if (confirmCallback) {
            confirmCallback();
            confirmCallback = null;
        }
    });

    document.getElementById('confirm-no').addEventListener('click', () => {
        document.getElementById('confirm-modal').classList.add('hidden');
        confirmCallback = null;
    });

    // Save on exit (unless restarting)
    window.addEventListener('beforeunload', () => {
        if (!isRestarting) saveGame();
    });

    // Auto-save every 5 seconds
    setInterval(saveGame, 5000);

    // Keyboard shortcut: space to think
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
        if (e.code === 'Space') {
            e.preventDefault();
            initAudio();
            doClick();
        }
    });
}

// ============================================================================
// SECTION 17: CHANGELOG SYSTEM
// ============================================================================

function renderChangelog() {
    const container = document.getElementById('changelog-entries');
    const lastSeen = localStorage.getItem('philosophyIncremental_lastVersion') || '0.0.0';
    let html = '';
    for (const entry of CHANGELOG) {
        const isNew = compareVersions(entry.version, lastSeen) > 0;
        html += `<div class="changelog-entry">
            <div class="changelog-version">v${entry.version}${isNew ? '<span class="changelog-new-badge">NEW</span>' : ''}</div>
            <div class="changelog-date">${entry.date}</div>
            <ul>${entry.changes.map(c => `<li>${c}</li>`).join('')}</ul>
        </div>`;
    }
    container.innerHTML = html;
}

function compareVersions(a, b) {
    const pa = a.split('.').map(Number);
    const pb = b.split('.').map(Number);
    for (let i = 0; i < 3; i++) {
        if ((pa[i] || 0) > (pb[i] || 0)) return 1;
        if ((pa[i] || 0) < (pb[i] || 0)) return -1;
    }
    return 0;
}

function showChangelog() {
    renderChangelog();
    document.getElementById('changelog-modal').classList.remove('hidden');
}

function dismissChangelog() {
    document.getElementById('changelog-modal').classList.add('hidden');
    localStorage.setItem('philosophyIncremental_lastVersion', GAME_VERSION);
}

function checkNewVersion() {
    const lastSeen = localStorage.getItem('philosophyIncremental_lastVersion') || '0.0.0';
    if (compareVersions(GAME_VERSION, lastSeen) > 0) {
        showChangelog();
    }
}

function init() {
    initParticles();
    loadGame();
    applyEraTheme(getCurrentEra());
    headerDirty = true;
    tabDirty = true;
    renderHeader();
    renderActiveTab();
    initEventHandlers();
    checkNewVersion();
    requestAnimationFrame(gameLoop);
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
