import React, { Component, useState } from 'react';
import ReactGA from 'react-ga4';

export class AboutVivek extends Component {

    constructor() {
        super();
        this.screens = {};
        this.state = {
            screen: () => { },
            active_screen: "about",
            navbar: false,
        }
    }

    componentDidMount() {
        this.screens = {
            "about": <About />,
            "education": <Education />,
            "skills": <Skills />,
            "projects": <Projects />,
            "resume": <Credentials />,
        }

        let lastVisitedScreen = localStorage.getItem("about-section");
        if (lastVisitedScreen === null || lastVisitedScreen === undefined) {
            lastVisitedScreen = "about";
        }
        this.changeScreen(document.getElementById(lastVisitedScreen));
    }

    changeScreen = (e) => {
        const screen = e.id || e.target.id;
        localStorage.setItem("about-section", screen);
        ReactGA.send({ hitType: "pageview", page: `/${screen}`, title: "Custom Title" });
        this.setState({ screen: this.screens[screen], active_screen: screen });
    }

    showNavBar = () => {
        this.setState({ navbar: !this.state.navbar });
    }

    renderNavLinks = () => {
        return (
            <>
                <div id="about" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "about" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="about" src="./themes/Yaru/status/about.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">About Me</span>
                </div>
                <div id="education" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "education" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="education" src="./themes/Yaru/status/education.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Education</span>
                </div>
                <div id="skills" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "skills" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="skills" src="./themes/Yaru/status/skills.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Skills</span>
                </div>
                <div id="projects" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "projects" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="projects" src="./themes/Yaru/status/projects.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Projects</span>
                </div>
                <div id="resume" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "resume" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="credentials" src="./themes/Yaru/status/download.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Credentials</span>
                </div>
            </>
        );
    }

    render() {
        return (
            <div className="w-full h-full flex bg-ub-cool-grey text-white select-none relative">
                <div className="md:flex hidden flex-col w-1/4 md:w-1/5 text-sm overflow-y-auto windowMainScreen border-r border-black">
                    {this.renderNavLinks()}
                </div>
                <div onClick={this.showNavBar} className="md:hidden flex flex-col items-center justify-center absolute bg-ub-cool-grey rounded w-6 h-6 top-1 left-1">
                    <div className=" w-3.5 border-t border-white"></div>
                    <div className=" w-3.5 border-t border-white" style={{ marginTop: "2pt", marginBottom: "2pt" }}></div>
                    <div className=" w-3.5 border-t border-white"></div>
                    <div className={(this.state.navbar ? " visible animateShow z-30 " : " invisible ") + " md:hidden text-xs absolute bg-ub-cool-grey py-0.5 px-1 rounded-sm top-full mt-1 left-0 shadow border-black border border-opacity-20"}>
                        {this.renderNavLinks()}
                    </div>
                </div>
                <div className="flex flex-col w-3/4 md:w-4/5 justify-start items-center flex-grow bg-ub-grey overflow-y-auto windowMainScreen">
                    {this.state.screen}
                </div>
            </div>
        );
    }
}

export default AboutVivek;

export const displayAboutVivek = () => <AboutVivek />;


/* ─────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────── */
function About() {
    return (
        <>
            <div className="w-20 md:w-28 my-4 bg-white rounded-full">
                <img className="w-full" src="./images/logos/bitmoji.png" alt="Hasindu Wanninayake" />
            </div>

            {/* AI-first identity */}
            <div className="mt-4 md:mt-6 text-center px-2">
                <div className="text-lg md:text-2xl font-bold">Hasindu Wanninayake</div>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                    <span className="text-xs md:text-sm px-2.5 py-1 rounded-full font-semibold" style={{ background: 'rgba(233,84,32,0.18)', color: '#E95420', border: '1px solid rgba(233,84,32,0.35)' }}>
                        🤖 AI Engineer
                    </span>
                    <span className="text-xs md:text-sm px-2.5 py-1 rounded-full font-semibold" style={{ background: 'rgba(96,165,250,0.15)', color: '#60a5fa', border: '1px solid rgba(96,165,250,0.3)' }}>
                        ⚡ Full Stack Developer
                    </span>
                    <span className="text-xs md:text-sm px-2.5 py-1 rounded-full font-semibold" style={{ background: 'rgba(52,211,153,0.12)', color: '#34d399', border: '1px solid rgba(52,211,153,0.28)' }}>
                        ● Available for Work
                    </span>
                </div>
            </div>

            <div className="mt-4 relative md:my-6 pt-px bg-white w-32 md:w-48">
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-0"></div>
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-0"></div>
            </div>

            {/* AI cert highlight */}
            <div className="mx-4 mb-4 px-3 py-2.5 rounded-xl w-5/6 md:w-3/4" style={{ background: 'rgba(233,84,32,0.08)', border: '1px solid rgba(233,84,32,0.22)' }}>
                <div className="flex items-start gap-2">
                    <span className="text-base mt-0.5">🏆</span>
                    <div>
                        <div className="text-xs font-bold" style={{ color: '#E95420' }}>Anthropic Certified — Claude Code in Action</div>
                        <div className="text-xs mt-0.5 text-gray-400">Official certification in agentic AI development &amp; Model Context Protocol (MCP)</div>
                    </div>
                </div>
            </div>

            <ul className="mt-2 leading-tight tracking-tight text-sm md:text-base w-5/6 md:w-3/4 emoji-list pb-6">
                <li className="list-pc">I build <span className="font-medium">AI-powered systems and full-stack applications</span> — currently working at <u><a href="https://www.aahaas.com" target="_blank">Aahaas</a></u> where I architected their AI travel itinerary and hotel automation systems. ( <a className="text-underline" href="mailto:hasindutwm@gmail.com"><u>hasindutwm@gmail.com</u></a> )</li>
                <li className="mt-3 list-building">I integrate <span className="font-medium text-ubt-gedit-orange">LLM APIs, n8n workflows, and REST APIs</span> into production systems — from prompt engineering to deployment and automation pipelines.</li>
                <li className="mt-3 list-time">Strong full-stack foundation in <span className="font-medium">MERN stack, Java Spring Boot, PHP</span>, and mobile dev — I build the backend and frontend around the AI, not just plug it in.</li>
                <li className="mt-3 list-star">Passionate about <span className="font-medium">LLM fine-tuning, agentic workflows, and AI-powered business automation</span> — this portfolio's chat assistant (LIA AI) is my own build!</li>
            </ul>
        </>
    );
}


/* ─────────────────────────────────────────────
   EDUCATION + WORK EXPERIENCE + CERTIFICATIONS
───────────────────────────────────────────── */
function Education() {
    return (
        <>
            <div className="font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Education
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className="w-10/12 mt-4 ml-4 px-0 md:px-1">
                <li className="list-disc">
                    <div className="text-lg md:text-xl text-left font-bold leading-tight">Sri Lanka Institute of Information Technology (SLIIT)</div>
                    <div className="text-sm text-gray-400 mt-0.5">2024 – Present</div>
                    <div className="text-sm md:text-base">BSc (Hons) in Information Technology</div>
                </li>
                <li className="list-disc mt-5">
                    <div className="text-lg md:text-xl text-left font-bold leading-tight">IIC University</div>
                    <div className="text-sm text-gray-400 mt-0.5">2022 – 2026</div>
                    <div className="text-sm md:text-base">BEng (Hons) in Software Engineering</div>
                </li>
            </ul>

            <div className="font-medium relative text-2xl mt-8 md:mt-10 mb-4">
                Work Experience
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className="w-10/12 mt-4 ml-4 px-0 md:px-1">
                <li className="list-disc">
                    <div className="text-lg md:text-xl text-left font-bold leading-tight">Full Stack Software Engineer — Aahaas</div>
                    <div className="text-sm text-gray-400 mt-0.5">Nov 2025 – May 2026 · Colombo, Sri Lanka</div>
                    <div className="text-sm md:text-base mt-1">Sole developer on AI travel itinerary system, hotel rate automation, Apple Holidays quotation platform, Verteil flight API integration, and frontend development for the Aahaas platform.</div>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                        {['LLM APIs','n8n','Node.js','REST API','MySQL','React'].map(t => (
                            <span key={t} className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(233,84,32,0.12)', color: '#E95420', border: '1px solid rgba(233,84,32,0.25)' }}>{t}</span>
                        ))}
                    </div>
                </li>
                <li className="list-disc mt-5">
                    <div className="text-lg md:text-xl text-left font-bold leading-tight">Junior Software Developer — Xsoftus</div>
                    <div className="text-sm text-gray-400 mt-0.5">2024 – 2025</div>
                    <div className="text-sm md:text-base mt-1">Built and maintained client websites and full-stack solutions. Contributed to multiple enterprise-level projects with clean, efficient code delivery.</div>
                </li>
                <li className="list-disc mt-5">
                    <div className="text-lg md:text-xl text-left font-bold leading-tight">Software Development Tutor — Destiny Lab</div>
                    <div className="text-sm text-gray-400 mt-0.5">2022 – 2025</div>
                    <div className="text-sm md:text-base mt-1">Taught Java, web development, Android, OOP, and software fundamentals to beginner and intermediate students.</div>
                </li>
                <li className="list-disc mt-5">
                    <div className="text-lg md:text-xl text-left font-bold leading-tight">Software Developer Intern — Sysoft Developers</div>
                    <div className="text-sm text-gray-400 mt-0.5">May 2022 – Oct 2022</div>
                    <div className="text-sm md:text-base mt-1">Developed client websites and software features; supported full-stack tasks including UI, backend logic, database changes, and deployment.</div>
                </li>
            </ul>

            {/* Certifications */}
            <div className="font-medium relative text-2xl mt-8 md:mt-10 mb-4">
                Certifications &amp; Awards
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <div className="w-10/12 mt-4 ml-4 space-y-3 pb-6">
                {/* Anthropic cert — featured */}
                <div className="rounded-xl p-3" style={{ background: 'rgba(233,84,32,0.09)', border: '1px solid rgba(233,84,32,0.28)' }}>
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">🏆</span>
                        <div>
                            <div className="font-bold text-sm md:text-base" style={{ color: '#E95420' }}>Claude Code in Action — Anthropic</div>
                            <div className="text-xs text-gray-400 mt-0.5">Official certification · Agentic AI development, Model Context Protocol (MCP), LLM integration in dev workflows</div>
                        </div>
                    </div>
                </div>
                {[
                    { icon: '🥈', title: 'Young Computer Scientist — Merit Award', org: '2018 · Java game development' },
                    { icon: '🥈', title: 'Young Computer Scientist — Merit Award', org: '2017 · Java game development' },
                    { icon: '🥈', title: 'SLIIT Codefest — Merit Award', org: '2017 · Java game development' },
                ].map((c, i) => (
                    <div key={i} className="flex items-start gap-3 px-3 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <span className="text-xl">{c.icon}</span>
                        <div>
                            <div className="font-semibold text-sm text-white">{c.title}</div>
                            <div className="text-xs text-gray-400">{c.org}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}


/* ─────────────────────────────────────────────
   SKILLS
───────────────────────────────────────────── */
function Skills() {
    return (
        <>
            <div className="font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Technical Skills
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>

            {/* AI & Automation — featured block */}
            <div className="w-10/12 mt-4 rounded-xl p-4" style={{ background: 'rgba(233,84,32,0.07)', border: '1px solid rgba(233,84,32,0.25)' }}>
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">🤖</span>
                    <span className="font-bold text-sm md:text-base" style={{ color: '#E95420' }}>AI &amp; Automation (Primary Focus)</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                    {['LLM API Integration','Prompt Engineering','n8n Workflow Automation','AI Chatbot Development','OpenRouter','Claude Code (MCP)','Conversational AI','wit.ai NLP','AI Business Automation','RAG Pipelines'].map(s => (
                        <span key={s} className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(233,84,32,0.15)', color: '#fba07a', border: '1px solid rgba(233,84,32,0.3)' }}>{s}</span>
                    ))}
                </div>
            </div>

            <ul className="tracking-tight text-sm md:text-base w-10/12 emoji-list mt-4">
                <li className="list-arrow text-sm md:text-base mt-2 leading-tight">
                    Strong full-stack foundation across <strong className="text-ubt-gedit-orange">Java, MERN stack, and PHP</strong> — I build the systems that AI runs inside.
                </li>
            </ul>

            <div className="w-full md:w-10/12 flex mt-4">
                <div className="text-sm text-center md:text-base w-1/2 font-bold">Languages &amp; Tools</div>
                <div className="text-sm text-center md:text-base w-1/2 font-bold">Frameworks &amp; Libraries</div>
            </div>
            <div className="w-full md:w-10/12 flex justify-center items-start font-bold text-center">
                <div className="px-2 w-1/2">
                    <div className="flex flex-wrap justify-center items-start w-full mt-2">
                        <img className="m-1" src="https://img.shields.io/badge/Java-ED8B00?style=flat&logo=openjdk&logoColor=white" alt="java" />
                        <img className="m-1" src="https://img.shields.io/badge/-JavaScript-%23F7DF1C?style=flat&logo=javascript&logoColor=000000&labelColor=%23F7DF1C&color=%23FFCE5A" alt="javascript" />
                        <img className="m-1" src="https://img.shields.io/badge/PHP-777BB4?style=flat&logo=php&logoColor=white" alt="php" />
                        <img className="m-1" src="http://img.shields.io/badge/-Python-3776AB?style=flat&logo=python&logoColor=ffffff" alt="python" />
                        <img className="m-1" src="https://img.shields.io/badge/MySQL-00000F?style=flat&logo=mysql&logoColor=white" alt="mysql" />
                        <img className="m-1" src="https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white" alt="mongodb" />
                        <img className="m-1" src="https://img.shields.io/badge/-Git-%23F05032?style=flat&logo=git&logoColor=%23ffffff" alt="git" />
                        <img className="m-1" src="https://img.shields.io/badge/REST_API-4A90D9?style=flat&logo=fastapi&logoColor=white" alt="rest api" />
                    </div>
                </div>
                <div className="px-2 flex flex-wrap items-start w-1/2">
                    <div className="flex flex-wrap justify-center items-start w-full mt-2">
                        <img className="m-1" src="https://img.shields.io/badge/Spring_Boot-F2F4F9?style=flat&logo=spring-boot" alt="springboot" />
                        <img className="m-1" src="https://img.shields.io/badge/-Nodejs-339933?style=flat&logo=Node.js&logoColor=ffffff" alt="nodejs" />
                        <img className="m-1" src="https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=ffffff" alt="react" />
                        <img className="m-1" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white" alt="tailwind" />
                        <img className="m-1" src="https://img.shields.io/badge/n8n-EA4B71?style=flat&logo=n8n&logoColor=white" alt="n8n" />
                        <img className="m-1" src="https://img.shields.io/badge/Hibernate-59666C?style=flat&logo=Hibernate&logoColor=white" alt="hibernate" />
                        <img className="m-1" src="https://img.shields.io/badge/Android-3DDC84?style=flat&logo=android&logoColor=white" alt="android" />
                    </div>
                </div>
            </div>
            <ul className="tracking-tight text-sm md:text-base w-10/12 emoji-list mt-4 pb-6">
                <li className="list-arrow text-sm md:text-base mt-4 leading-tight">
                    <span>And of course,</span> <img className="inline ml-1" src="http://img.shields.io/badge/-Linux-0078D6?style=plastic&logo=linux&logoColor=ffffff" alt="linux" /> <span>!</span>
                </li>
            </ul>
        </>
    );
}


/* ─────────────────────────────────────────────
   PROJECTS  (with filter tabs)
───────────────────────────────────────────── */
function Projects() {
    const [filter, setFilter] = useState('all');

    const project_list = [
        {
            name: "AI Travel Itinerary System",
            date: "Jan 2026 – Feb 2026",
            link: "https://www.dev.aahaas.com",
            description: ["AI-powered travel itinerary system for Aahaas built with LLM APIs, n8n workflows, Node.js services, and MySQL. Generates personalized and generic travel plans."],
            domains: ["llm", "n8n", "node.js", "mysql"],
            category: "ai",
        },
        {
            name: "AI Quotation Automation System",
            date: "Feb 2026 – Mar 2026",
            link: "https://ai.appleholidaysds.com/login",
            description: ["LLM-powered quotation platform for Apple Holidays using prompt engineering and n8n automation to generate business quotations with reduced manual effort."],
            domains: ["llm", "n8n", "mysql", "web-app"],
            category: "ai",
        },
        {
            name: "Hotel Rate Automation System",
            date: "2025 – 2026",
            link: "https://www.aahaas.com",
            description: ["Automation system for hotel rate management built with n8n workflows and web integration. Reduces manual rate update effort across properties."],
            domains: ["n8n", "automation", "web-app"],
            category: "ai",
        },
        {
            name: "Verteil Flight API Integration",
            date: "2025 – 2026",
            link: "https://www.aahaas.com",
            description: ["Backend integration of the Verteil flight booking API to streamline reservation and booking processes for the Aahaas travel platform."],
            domains: ["node.js", "rest-api", "mysql"],
            category: "fullstack",
        },
        {
            name: "IoT Piano Visualizer",
            date: "Jun 2024 – Nov 2024",
            link: "https://github.com/Iron-voldy/IOT-Piano",
            description: ["IoT-based piano visualizer using ESP32, RGB LEDs, and sensors with a PHP web application interface for real-time visualization."],
            domains: ["php", "esp32", "iot", "web-app"],
            category: "fullstack",
        },
        {
            name: "Hotel Table Reservation System",
            date: "Feb 2025 – Mar 2025",
            link: "https://github.com/Iron-voldy/sliit-tableBooking",
            description: ["Full-stack reservation platform with booking management, availability handling, and QR code check-in, built with Java Spring Boot."],
            domains: ["java", "spring-boot", "mysql"],
            category: "fullstack",
        },
        {
            name: "shopEase Android App",
            date: "Feb 2025 – Mar 2025",
            link: "https://github.com/Iron-voldy/shopease-androidJava",
            description: ["Android e-commerce app with Java and Firebase for real-time data management, authentication, and product catalog."],
            domains: ["java", "android", "firebase"],
            category: "mobile",
        },
        {
            name: "Diatel AI Chat Application",
            date: "Jun 2023",
            link: "https://github.com/Iron-voldy/diatel-chatbot",
            description: ["Conversational chatbot web app using PHP and wit.ai NLP for intent recognition, response routing, and multi-step conversations."],
            domains: ["php", "wit.ai", "web-app"],
            category: "ai",
        },
        {
            name: "Ravana Health Care Application",
            date: "Feb 2023 – Apr 2023",
            link: "https://github.com/Iron-voldy/SAD_finalProject",
            description: ["Hospital management system built with Java, QR code integration, and patient database management."],
            domains: ["java", "qr-code", "mysql"],
            category: "fullstack",
        },
        {
            name: "foody E-Commerce App",
            date: "Oct 2022 – Dec 2022",
            link: "https://github.com/Iron-voldy/foody",
            description: ["Full-stack food ordering web app with product catalog, cart management, order processing, and MySQL backend."],
            domains: ["html5", "javascript", "php", "mysql"],
            category: "fullstack",
        },
    ];

    const tag_colors = {
        "javascript": "yellow-300", "firebase": "red-600", "android": "green-400",
        "java": "red-400", "php": "purple-400", "mysql": "blue-400",
        "iot": "green-300", "esp32": "gray-400", "wit.ai": "blue-300",
        "web-app": "purple-500", "html5": "pink-600", "qr-code": "gray-300",
        "llm": "yellow-600", "n8n": "pink-400", "node.js": "green-500",
        "rest-api": "blue-300", "spring-boot": "green-400", "automation": "orange-400",
    };

    const filters = [
        { key: 'all',       label: '✦ All' },
        { key: 'ai',        label: '🤖 AI & Automation' },
        { key: 'fullstack', label: '⚡ Full Stack' },
        { key: 'mobile',    label: '📱 Mobile' },
    ];

    const visible = filter === 'all' ? project_list : project_list.filter(p => p.category === filter);

    return (
        <>
            <div className="font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Projects
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2 px-4 mb-4 mt-2">
                {filters.map(f => (
                    <button
                        key={f.key}
                        onClick={() => setFilter(f.key)}
                        className="text-xs px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer"
                        style={filter === f.key
                            ? { background: '#E95420', color: '#fff', border: '1px solid #E95420' }
                            : { background: 'rgba(255,255,255,0.05)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.12)' }
                        }
                    >
                        {f.label}
                    </button>
                ))}
                <span className="text-xs self-center" style={{ color: '#4b5563' }}>{visible.length} project{visible.length !== 1 ? 's' : ''}</span>
            </div>

            {visible.map((project, index) => {
                const projectNameFromLink = project.link.split('/');
                const projectName = projectNameFromLink[projectNameFromLink.length - 1];
                return (
                    <a key={index} href={project.link} target="_blank" rel="noreferrer" className="flex w-full flex-col px-4 mb-1">
                        <div className="w-full py-1 px-2 my-1 border border-gray-50 border-opacity-10 rounded hover:bg-gray-50 hover:bg-opacity-5 cursor-pointer">
                            <div className="flex flex-wrap justify-between items-center">
                                <div className="flex justify-center items-center gap-2">
                                    <div className="text-base md:text-lg">{project.name.toLowerCase()}</div>
                                    {project.category === 'ai' && (
                                        <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(233,84,32,0.15)', color: '#E95420', border: '1px solid rgba(233,84,32,0.3)' }}>AI</span>
                                    )}
                                    {project.link.includes('github.com') && (
                                        <iframe src={`https://ghbtns.com/github-btn.html?user=Iron-voldy&repo=${projectName}&type=star&count=true`} frameBorder="0" scrolling="0" width="80" height="20" title={project.name + "-star"}></iframe>
                                    )}
                                </div>
                                <div className="text-gray-300 font-light text-sm">{project.date}</div>
                            </div>
                            <ul className="tracking-normal leading-tight text-sm font-light ml-4 mt-1">
                                {project.description.map((desc, i) => (
                                    <li key={i} className="list-disc mt-1 text-gray-100">{desc}</li>
                                ))}
                            </ul>
                            <div className="flex flex-wrap items-start justify-start text-xs py-2">
                                {project.domains && project.domains.map((domain, i) => (
                                    <span key={i} className={`px-1.5 py-0.5 w-max border border-${tag_colors[domain] || 'gray-500'} text-${tag_colors[domain] || 'gray-400'} m-1 rounded-full`}>{domain}</span>
                                ))}
                            </div>
                        </div>
                    </a>
                );
            })}
            <div className="pb-4" />
        </>
    );
}


/* ─────────────────────────────────────────────
   CREDENTIALS  (CV + Service Letter + Recommendation)
───────────────────────────────────────────── */
function Credentials() {
    const [active, setActive] = useState(null);

    const docs = [
        {
            id: 'cv',
            icon: '📄',
            title: 'Curriculum Vitae',
            subtitle: 'Hasindu Wanninayake',
            org: 'Full Stack Engineer · AI Integration',
            date: 'Updated June 2026',
            accent: '#E95420',
            glow: '233,84,32',
            file: './files/Hasindu-Wanninayake-Resume.pdf',
            desc: '2-page professional CV covering AI & automation experience, full-stack skills, projects, and education.',
        },
        {
            id: 'service',
            icon: '🏢',
            title: 'Employment & Experience Letter',
            subtitle: 'Apple Holidays Destination Services',
            org: 'Issued by Managing Director · Aahaas (Pvt) Ltd',
            date: 'May 14, 2026',
            accent: '#60a5fa',
            glow: '96,165,250',
            file: './files/Hasindu_Wanninayake_Service_Letter.pdf',
            desc: 'Formal verification of employment as Full Stack Software Engineer at Aahaas, confirming 6 AI & automation projects.',
        },
        {
            id: 'rec',
            icon: '✉️',
            title: 'Letter of Recommendation',
            subtitle: 'XSoftUs Software & Technology Co.',
            org: 'Issued by Chief HR Officer · XSoftUs',
            date: 'November 15, 2025',
            accent: '#34d399',
            glow: '52,211,153',
            file: './files/Hasindu_Wanninayake_Recommendation_XSoftUs.pdf',
            desc: 'Recommendation from XSoftUs confirming strong technical skills, enterprise-level project contributions, and professionalism.',
        },
    ];

    if (active !== null) {
        const doc = docs[active];
        return (
            <div className="w-full h-full flex flex-col">
                <div className="flex items-center gap-3 px-4 py-2 flex-shrink-0" style={{ background: '#1a1a1a', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <button
                        onClick={() => setActive(null)}
                        className="text-xs px-3 py-1.5 rounded-full cursor-pointer"
                        style={{ background: 'rgba(255,255,255,0.08)', color: '#ccc' }}
                    >
                        ← Back
                    </button>
                    <span className="text-sm font-medium text-white truncate">{doc.title}</span>
                    <a
                        href={doc.file}
                        download
                        className="ml-auto text-xs px-3 py-1.5 rounded-full font-semibold"
                        style={{ background: `rgba(${doc.glow},0.2)`, color: doc.accent, border: `1px solid rgba(${doc.glow},0.35)` }}
                        onClick={e => e.stopPropagation()}
                    >
                        ↓ Download
                    </a>
                </div>
                <iframe className="flex-1 w-full" src={doc.file} title={doc.title} frameBorder="0" />
            </div>
        );
    }

    return (
        <>
            <div className="font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Credentials
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>

            <p className="text-sm text-gray-400 px-4 mb-5 mt-2">
                Official documents verifying employment, experience, and professional recommendations.
            </p>

            <div className="w-full px-4 space-y-3 pb-6">
                {docs.map((doc, i) => (
                    <div
                        key={doc.id}
                        className="rounded-xl p-4 cursor-pointer transition-all"
                        style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid rgba(${doc.glow},0.2)` }}
                        onMouseEnter={e => { e.currentTarget.style.background = `rgba(${doc.glow},0.07)`; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                        onClick={() => setActive(i)}
                    >
                        <div className="flex items-start gap-3">
                            {/* Icon */}
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0" style={{ background: `rgba(${doc.glow},0.15)`, border: `1px solid rgba(${doc.glow},0.3)` }}>
                                {doc.icon}
                            </div>

                            {/* Text */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 flex-wrap">
                                    <div>
                                        <div className="font-semibold text-sm md:text-base text-white">{doc.title}</div>
                                        <div className="text-sm font-medium mt-0.5" style={{ color: doc.accent }}>{doc.subtitle}</div>
                                        <div className="text-xs text-gray-500 mt-0.5">{doc.org}</div>
                                    </div>
                                    <span className="text-xs text-gray-500 flex-shrink-0">{doc.date}</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-2 leading-relaxed">{doc.desc}</p>
                                <div className="flex gap-2 mt-3">
                                    <button
                                        className="text-xs px-3 py-1.5 rounded-full font-medium cursor-pointer"
                                        style={{ background: `rgba(${doc.glow},0.15)`, color: doc.accent, border: `1px solid rgba(${doc.glow},0.3)` }}
                                        onClick={e => { e.stopPropagation(); setActive(i); }}
                                    >
                                        View Document
                                    </button>
                                    <a
                                        href={doc.file}
                                        download
                                        className="text-xs px-3 py-1.5 rounded-full font-medium cursor-pointer"
                                        style={{ background: 'rgba(255,255,255,0.06)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.1)' }}
                                        onClick={e => e.stopPropagation()}
                                    >
                                        ↓ Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
