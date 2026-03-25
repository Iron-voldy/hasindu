import React, { Component } from 'react';
import ReactGA from 'react-ga4';

export class AboutVivek extends Component {

    constructor() {
        super();
        this.screens = {};
        this.state = {
            screen: () => { },
            active_screen: "about", // by default 'about' screen is active
            navbar: false,
        }
    }

    componentDidMount() {
        this.screens = {
            "about": <About />,
            "education": <Education />,
            "skills": <Skills />,
            "projects": <Projects />,
            "resume": <Resume />,
        }

        let lastVisitedScreen = localStorage.getItem("about-section");
        if (lastVisitedScreen === null || lastVisitedScreen === undefined) {
            lastVisitedScreen = "about";
        }

        // focus last visited screen
        this.changeScreen(document.getElementById(lastVisitedScreen));
    }

    changeScreen = (e) => {
        const screen = e.id || e.target.id;

        // store this state
        localStorage.setItem("about-section", screen);

        // google analytics
        ReactGA.send({ hitType: "pageview", page: `/${screen}`, title: "Custom Title" });


        this.setState({
            screen: this.screens[screen],
            active_screen: screen
        });
    }

    showNavBar = () => {
        this.setState({ navbar: !this.state.navbar });
    }

    renderNavLinks = () => {
        return (
            <>
                <div id="about" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "about" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="about vivek" src="./themes/Yaru/status/about.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">About Me</span>
                </div>
                <div id="education" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "education" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="vivek' education" src="./themes/Yaru/status/education.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Education</span>
                </div>
                <div id="skills" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "skills" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="vivek' skills" src="./themes/Yaru/status/skills.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Skills</span>
                </div>
                <div id="projects" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "projects" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="vivek' projects" src="./themes/Yaru/status/projects.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Projects</span>
                </div>
                <div id="resume" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "resume" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="hasindu's resume" src="./themes/Yaru/status/download.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Resume</span>
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

export const displayAboutVivek = () => {
    return <AboutVivek />;
}


function About() {
    return (
        <>
            <div className="w-20 md:w-28 my-4 bg-white rounded-full">
                <img className="w-full" src="./images/logos/bitmoji.png" alt="Hasindu Wanninayake Logo" />
            </div>
            <div className=" mt-4 md:mt-8 text-lg md:text-2xl text-center px-1">
                <div>my name is <span className="font-bold">Hasindu Wanninayake</span> ,</div>
                <div className="font-normal ml-1">I'm a <span className="text-pink-600 font-bold">Full Stack Developer!</span></div>
            </div>
            <div className=" mt-4 relative md:my-8 pt-px bg-white w-32 md:w-48">
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-0"></div>
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-0"></div>
            </div>
            <ul className=" mt-4 leading-tight tracking-tight text-sm md:text-base w-5/6 md:w-3/4 emoji-list">
                <li className=" list-pc">I'm a <span className=" font-medium">passionate Full Stack Developer</span> currently working at <u className=' cursor-pointer '><a href="https://www.aahaas.com" target={"_blank"}>Aahaas</a></u>, building AI-powered automation systems and modern web applications. ( Reach me at <a className='text-underline' href='mailto:hasindutwm@gmail.com'><u>hasindutwm@gmail.com</u></a> :) )</li>
                <li className=" mt-3 list-building"> I build scalable, secure, and user-focused digital solutions using Java, PHP, Python, MERN stack, and mobile technologies.</li>
                <li className=" mt-3 list-time"> When I am not coding, I love exploring emerging technologies, experimenting with AI automation and IoT applications.</li>
                <li className=" mt-3 list-star"> I have a strong interest in LLM fine-tuning, Prompt Engineering, and AI-powered workflow automation!</li>
            </ul>
        </>
    )
}
function Education() {
    return (
        <>
            <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Education
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className=" w-10/12  mt-4 ml-4 px-0 md:px-1">
                <li className="list-disc">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        Sri Lanka Institute of Information Technology (SLIIT)
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">2024 - Present</div>
                    <div className=" text-sm md:text-base">BSc (Hons) in Information Technology</div>
                </li>
                <li className="list-disc mt-5">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        IIC University
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">2022 - 2026</div>
                    <div className=" text-sm md:text-base">BEng (Hons) in Software Engineering</div>
                </li>
            </ul>
            <div className=" font-medium relative text-2xl mt-8 md:mt-10 mb-4">
                Work Experience
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className=" w-10/12 mt-4 ml-4 px-0 md:px-1">
                <li className="list-disc">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        Full Stack Software Engineer — Aahaas
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">2025 – Present</div>
                    <div className=" text-sm md:text-base mt-1">Developing and maintaining web applications for Aahaas, a lifestyle travel super-app. Led the AI-powered travel itinerary system as the sole developer on the team.</div>
                </li>
                <li className="list-disc mt-4">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        Junior Software Developer — Xsoftus
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">2024 – 2025</div>
                    <div className=" text-sm md:text-base mt-1">Developed websites and software solutions for various client needs, ensuring timely delivery and code quality.</div>
                </li>
                <li className="list-disc mt-4">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        Tutor — Destiny Lab
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">2022 – 2025</div>
                    <div className=" text-sm md:text-base mt-1">Instructed students in software development including Java, web development, and mobile app development.</div>
                </li>
                <li className="list-disc mt-4">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        Software Developer Intern — Sysoft Developers
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">May 2022 – Oct 2022</div>
                    <div className=" text-sm md:text-base mt-1">Developed websites and software solutions for clients, focusing on high-quality code and client satisfaction.</div>
                </li>
            </ul>
        </>
    )
}
function Skills() {
    return (
        <>
            <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Technical Skills
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className=" tracking-tight text-sm md:text-base w-10/12 emoji-list">
                <li className=" list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    I've worked with a wide variety of programming languages & frameworks.
                </li>
                <li className=" list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    <div> My areas of expertise are <strong className="text-ubt-gedit-orange">full-stack development, Java & the MERN stack!</strong></div>
                </li>
                <li className=" list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    <div>Here are my most frequently used</div>
                </li>
            </ul>
            <div className="w-full md:w-10/12 flex mt-4">
                <div className=" text-sm text-center md:text-base w-1/2 font-bold">Languages & Tools</div>
                <div className=" text-sm text-center md:text-base w-1/2 font-bold">Frameworks & Libraries</div>
            </div>
            <div className="w-full md:w-10/12 flex justify-center items-start font-bold text-center">
                <div className="px-2 w-1/2">
                    <div className="flex flex-wrap justify-center items-start w-full mt-2">
                        <img className="m-1" src="https://img.shields.io/badge/Java-ED8B00?style=flat&logo=openjdk&logoColor=white" alt="hasindu java" />
                        <img className="m-1" src="https://img.shields.io/badge/-JavaScript-%23F7DF1C?style=flat&logo=javascript&logoColor=000000&labelColor=%23F7DF1C&color=%23FFCE5A" alt="hasindu javascript" />
                        <img className="m-1" src="https://img.shields.io/badge/PHP-777BB4?style=flat&logo=php&logoColor=white" alt="hasindu php" />
                        <img className="m-1" src="http://img.shields.io/badge/-Python-3776AB?style=flat&logo=python&logoColor=ffffff" alt="hasindu python" />
                        <img className="m-1" src="https://img.shields.io/badge/MySQL-00000F?style=flat&logo=mysql&logoColor=white" alt="hasindu mysql" />
                        <img className="m-1" src="https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white" alt="hasindu mongodb" />
                        <img src="https://img.shields.io/badge/-Git-%23F05032?style=flat&logo=git&logoColor=%23ffffff" alt="hasindu git" className="m-1" />
                        <img className="m-1" src="https://img.shields.io/badge/REST_API-4A90D9?style=flat&logo=fastapi&logoColor=white" alt="hasindu rest api" />
                    </div>
                </div>
                <div className="px-2 flex flex-wrap items-start w-1/2">
                    <div className="flex flex-wrap justify-center items-start w-full mt-2">
                        <img className=" m-1" src="https://img.shields.io/badge/Spring_Boot-F2F4F9?style=flat&logo=spring-boot" alt="hasindu springboot" />
                        <img src="https://img.shields.io/badge/-Nodejs-339933?style=flat&logo=Node.js&logoColor=ffffff" alt="hasindu node.js" className="m-1" />
                        <img className=" m-1" src="https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=ffffff" alt="hasindu react" />
                        <img className="m-1" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white" alt="hasindu tailwind css" />
                        <img className="m-1" src="https://img.shields.io/badge/Hibernate-59666C?style=flat&logo=Hibernate&logoColor=white" alt="hasindu hibernate" />
                        <img className="m-1" src="https://img.shields.io/badge/Mongoose-880000?style=flat&logo=mongoose&logoColor=white" alt="hasindu mongoose" />
                        <img className="m-1" src="https://img.shields.io/badge/Android-3DDC84?style=flat&logo=android&logoColor=white" alt="hasindu android" />
                    </div>
                </div>
            </div>
            <ul className=" tracking-tight text-sm md:text-base w-10/12 emoji-list mt-4">
                <li className=" list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    <span> And of course,</span> <img className=" inline ml-1" src="http://img.shields.io/badge/-Linux-0078D6?style=plastic&logo=linux&logoColor=ffffff" alt="hasindu linux" /> <span>!</span>
                </li>
            </ul>
        </>
    )
}

function Projects() {
    const project_list = [
        {
            name: "AI Travel Itinerary",
            date: "Jan 2026 – Feb 2026",
            link: "https://www.dev.aahaas.com",
            description: [
                "AI-powered travel itinerary system built for Aahaas lifestyle travel super-app using n8n automation and LLM models.",
            ],
            domains: ["n8n", "llm", "mysql"]
        },
        {
            name: "AI Quotation System",
            date: "Feb 2026 – Mar 2026",
            link: "https://ai.appleholidaysds.com/login",
            description: [
                "Intelligent quotation system powered by LLM models and n8n automation workflows for streamlined business operations.",
            ],
            domains: ["llm", "n8n", "mysql", "web-app"]
        },
        {
            name: "IoT Piano Visualizer",
            date: "Jun 2024 – Nov 2024",
            link: "https://github.com/Iron-voldy/IOT-Piano",
            description: [
                "An IoT-based piano visualizer using ESP32, RGB LEDs, and sensors with a PHP web application interface.",
            ],
            domains: ["php", "esp32", "iot", "web-app"]
        },
        {
            name: "Hotel Table Reservation System",
            date: "Feb 2025 – Mar 2025",
            link: "https://github.com/Iron-voldy/sliit-tableBooking",
            description: [
                "Web-based hotel table reservation system with QR code integration, built with Java and complete database management.",
            ],
            domains: ["java", "qr-code", "mysql"]
        },
        {
            name: "shopEase",
            date: "Feb 2025 – Mar 2025",
            link: "https://github.com/Iron-voldy/shopease-androidJava",
            description: [
                "Android e-commerce mobile application built with Java and Firebase for real-time data management and authentication.",
            ],
            domains: ["java", "android", "firebase"]
        },
        {
            name: "Diatel AI Chat Application",
            date: "Jun 2023",
            link: "https://github.com/Iron-voldy/diatel-chatbot",
            description: [
                "An AI-powered chatbot web application built with PHP and wit.ai for natural language processing and intent recognition.",
            ],
            domains: ["php", "wit.ai", "web-app"]
        },
        {
            name: "Ravana Health Care Application",
            date: "Feb 2023 – Apr 2023",
            link: "https://github.com/Iron-voldy/SAD_finalProject",
            description: [
                "Hospital management system built with Java, featuring QR code integration and complete patient database management.",
            ],
            domains: ["java", "qr-code", "mysql"]
        },
        {
            name: "foody E-Commerce App",
            date: "Oct 2022 – Dec 2022",
            link: "https://github.com/Iron-voldy/foody",
            description: [
                "Full-stack e-commerce web application built with HTML, CSS, JavaScript, PHP, and MySQL for online food ordering.",
            ],
            domains: ["html5", "javascript", "php", "mysql"]
        },
    ];

    const tag_colors = {
        "javascript": "yellow-300",
        "firebase": "red-600",
        "android": "green-400",
        "java": "red-400",
        "php": "purple-400",
        "mysql": "blue-400",
        "iot": "green-300",
        "esp32": "gray-400",
        "wit.ai": "blue-300",
        "web-app": "purple-500",
        "html5": "pink-600",
        "qr-code": "gray-300",
        "llm": "yellow-600",
        "n8n": "pink-400",
    }

    return (
        <>
            <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Projects
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            {
                project_list.map((project, index) => {
                    const projectNameFromLink = project.link.split('/')
                    const projectName = projectNameFromLink[projectNameFromLink.length - 1]
                    return (
                        <a key={index} href={project.link} target="_blank" rel="noreferrer" className="flex w-full flex-col px-4">
                            <div className="w-full py-1 px-2 my-2 border border-gray-50 border-opacity-10 rounded hover:bg-gray-50 hover:bg-opacity-5 cursor-pointer">
                                <div className="flex flex-wrap justify-between items-center">
                                    <div className='flex justify-center items-center'>
                                        <div className=" text-base md:text-lg mr-2">{project.name.toLowerCase()}</div>
                                        {project.link.includes('github.com') && <iframe src={`https://ghbtns.com/github-btn.html?user=Iron-voldy&repo=${projectName}&type=star&count=true`} frameBorder="0" scrolling="0" width="150" height="20" title={project.name.toLowerCase()+"-star"}></iframe>}
                                    </div>
                                    <div className="text-gray-300 font-light text-sm">{project.date}</div>
                                </div>
                                <ul className=" tracking-normal leading-tight text-sm font-light ml-4 mt-1">
                                    {
                                        project.description.map((desc, index) => {
                                            return <li key={index} className="list-disc mt-1 text-gray-100">{desc}</li>;
                                        })
                                    }
                                </ul>
                                <div className="flex flex-wrap items-start justify-start text-xs py-2">
                                    {
                                        (project.domains ?
                                            project.domains.map((domain, index) => {
                                                return <span key={index} className={`px-1.5 py-0.5 w-max border border-${tag_colors[domain]} text-${tag_colors[domain]} m-1 rounded-full`}>{domain}</span>
                                            })

                                            : null)
                                    }
                                </div>
                            </div>
                        </a>
                    )
                })
            }
        </>
    )
}
function Resume() {
    return (
        <iframe className="h-full w-full" src="./files/Hasindu-Wanninayake-Resume.pdf" title="Hasindu Wanninayake Resume" frameBorder="0"></iframe>
    )
}