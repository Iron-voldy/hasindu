import React, { Component } from 'react'
import $ from 'jquery';
import ReactGA from 'react-ga4';

export class Terminal extends Component {
    constructor() {
        super();
        this.cursor = "";
        this.terminal_rows = 1;
        this.current_directory = "~";
        this.curr_dir_name = "root";
        this.prev_commands = [];
        this.commands_index = -1;
        this.child_directories = {
            root: ["projects", "skills", "languages", "experience", "interests"],
            skills: ["Full-stack development", "Java", "React.js", "Node.js", "SpringBoot", "MySQL", "MongoDB"],
            projects: ["IOT-Piano", "SAD_finalProject", "diatel-chatbot", "sliit-tableBooking", "foody", "shopease-androidJava"],
            interests: ["Software Engineering", "AI Automation", "IoT Applications"],
            languages: ["Java", "Javascript", "PHP", "Python"],
            experience: ["Aahaas-Full-Stack-Engineer", "Xsoftus-Junior-Developer", "Sysoft-Intern", "Destiny-Lab-Tutor"],
        };
        this.state = {
            terminal: [],
        }
    }

    componentDidMount() {
        this.reStartTerminal();
    }

    componentDidUpdate() {
        clearInterval(this.cursor);
        this.startCursor(this.terminal_rows - 2);
    }

    componentWillUnmount() {
        clearInterval(this.cursor);
    }

    reStartTerminal = () => {
        clearInterval(this.cursor);
        this.terminal_rows = 1;
        this.setState({ terminal: [] }, () => {
            this.appendWelcomeBanner();
            this.appendTerminalRow();
        });
    }

    appendWelcomeBanner = () => {
        let terminal = this.state.terminal;
        terminal.push(
            <div key="welcome-banner" className="mb-3 select-none">
                <div className="text-ubt-gedit-orange font-bold text-base mb-1">👋 Welcome to Hasindu's Terminal</div>
                <div className="text-gray-400 text-xs mb-2">Type a command below to get started.</div>
                <div className="border border-gray-600 rounded p-2 text-xs">
                    <div className="text-ubt-gedit-orange font-bold mb-1">Available Commands:</div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                        <span><span className="text-ubt-green">/me</span> <span className="text-gray-400">— About me</span></span>
                        <span><span className="text-ubt-green">/skills</span> <span className="text-gray-400">— My tech skills</span></span>
                        <span><span className="text-ubt-green">/projects</span> <span className="text-gray-400">— My projects</span></span>
                        <span><span className="text-ubt-green">/explore</span> <span className="text-gray-400">— Open my portfolio</span></span>
                        <span><span className="text-ubt-green">cd</span> <span className="text-gray-400">— Change directory</span></span>
                        <span><span className="text-ubt-green">ls</span> <span className="text-gray-400">— List directory</span></span>
                        <span><span className="text-ubt-green">pwd</span> <span className="text-gray-400">— Print directory</span></span>
                        <span><span className="text-ubt-green">echo</span> <span className="text-gray-400">— Print text</span></span>
                        <span><span className="text-ubt-green">code</span> <span className="text-gray-400">— Open VS Code</span></span>
                        <span><span className="text-ubt-green">spotify</span> <span className="text-gray-400">— Open Spotify</span></span>
                        <span><span className="text-ubt-green">chrome</span> <span className="text-gray-400">— Open Chrome</span></span>
                        <span><span className="text-ubt-green">sendmsg</span> <span className="text-gray-400">— Contact me</span></span>
                        <span><span className="text-ubt-green">clear</span> <span className="text-gray-400">— Clear terminal</span></span>
                        <span><span className="text-ubt-green">exit</span> <span className="text-gray-400">— Close terminal</span></span>
                    </div>
                </div>
            </div>
        );
        this.setState({ terminal });
    }

    appendTerminalRow = () => {
        let terminal = this.state.terminal;
        terminal.push(this.terminalRow(this.terminal_rows));
        this.setState({ terminal });
        this.terminal_rows += 2;
    }

    terminalRow = (id) => {
        return (
            <React.Fragment key={id}>
                <div className="flex w-full h-5">
                    <div className="flex">
                        <div className=" text-ubt-green">hasindu@Ubuntu</div>
                        <div className="text-white mx-px font-medium">:</div>
                        <div className=" text-ubt-blue">{this.current_directory}</div>
                        <div className="text-white mx-px font-medium mr-1">$</div>
                    </div>
                    <div id="cmd" onClick={this.focusCursor} className=" bg-transperent relative flex-1 overflow-hidden">
                        <span id={`show-${id}`} className=" float-left whitespace-pre pb-1 opacity-100 font-normal tracking-wider"></span>
                        <div id={`cursor-${id}`} className=" float-left mt-1 w-1.5 h-3.5 bg-white"></div>
                        <input id={`terminal-input-${id}`} data-row-id={id} onKeyDown={this.checkKey} onBlur={this.unFocusCursor} className=" absolute top-0 left-0 w-full opacity-0 outline-none bg-transparent" spellCheck={false} autoFocus={true} autoComplete="off" type="text" />
                    </div>
                </div>
                <div id={`row-result-${id}`} className={"my-2 font-normal"}></div>
            </React.Fragment>
        );

    }

    focusCursor = (e) => {
        clearInterval(this.cursor);
        this.startCursor($(e.target).data("row-id"));
    }

    unFocusCursor = (e) => {
        this.stopCursor($(e.target).data("row-id"));
    }

    startCursor = (id) => {
        clearInterval(this.cursor);
        $(`input#terminal-input-${id}`).trigger("focus");
        // On input change, set current text in span
        $(`input#terminal-input-${id}`).on("input", function () {
            $(`#cmd span#show-${id}`).text($(this).val());
        });
        this.cursor = window.setInterval(function () {
            if ($(`#cursor-${id}`).css('visibility') === 'visible') {
                $(`#cursor-${id}`).css({ visibility: 'hidden' });
            } else {
                $(`#cursor-${id}`).css({ visibility: 'visible' });
            }
        }, 500);
    }

    stopCursor = (id) => {
        clearInterval(this.cursor);
        $(`#cursor-${id}`).css({ visibility: 'visible' });
    }

    removeCursor = (id) => {
        this.stopCursor(id);
        $(`#cursor-${id}`).css({ display: 'none' });
    }

    clearInput = (id) => {
        $(`input#terminal-input-${id}`).trigger("blur");
    }

    checkKey = (e) => {
        if (e.key === "Enter") {
            let terminal_row_id = $(e.target).data("row-id");
            let command = $(`input#terminal-input-${terminal_row_id}`).val().trim();
            if (command.length !== 0) {
                this.removeCursor(terminal_row_id);
                this.handleCommands(command, terminal_row_id);
            }
            else return;
            // push to history
            this.prev_commands.push(command);
            this.commands_index = this.prev_commands.length - 1;

            this.clearInput(terminal_row_id);
        }
        else if (e.key === "ArrowUp") {
            let prev_command;

            if (this.commands_index <= -1) prev_command = "";
            else prev_command = this.prev_commands[this.commands_index];

            let terminal_row_id = $(e.target).data("row-id");

            $(`input#terminal-input-${terminal_row_id}`).val(prev_command);
            $(`#show-${terminal_row_id}`).text(prev_command);

            this.commands_index--;
        }
        else if (e.key === "ArrowDown") {
            let prev_command;

            if (this.commands_index >= this.prev_commands.length) return;
            if (this.commands_index <= -1) this.commands_index = 0;

            if (this.commands_index === this.prev_commands.length) prev_command = "";
            else prev_command = this.prev_commands[this.commands_index];

            let terminal_row_id = $(e.target).data("row-id");

            $(`input#terminal-input-${terminal_row_id}`).val(prev_command);
            $(`#show-${terminal_row_id}`).text(prev_command);

            this.commands_index++;
        }
    }

    childDirectories = (parent) => {
        let files = [];
        files.push(`<div class="flex justify-start flex-wrap">`)
        this.child_directories[parent].forEach(file => {
            files.push(
                `<span class="font-bold mr-2 text-ubt-blue">'${file}'</span>`
            )
        });
        files.push(`</div>`)
        return files;
    }

    closeTerminal = () => {
        $("#close-terminal").trigger('click');
    }

    handleCommands = (command, rowId) => {
        let words = command.split(' ').filter(Boolean);
        let main = words[0];
        words.shift()
        let result = "";
        let rest = words.join(" ");
        rest = rest.trim();
        switch (main) {
            case "cd":
                if (words.length === 0 || rest === "") {
                    this.current_directory = "~";
                    this.curr_dir_name = "root"
                    break;
                }
                if (words.length > 1) {
                    result = "too many arguments, arguments must be <1.";
                    break;
                }

                if (rest === "personal-documents") {
                    result = `bash /${this.curr_dir_name} : Permission denied 😏`;
                    break;
                }

                if (this.child_directories[this.curr_dir_name].includes(rest)) {
                    this.current_directory += "/" + rest;
                    this.curr_dir_name = rest;
                }
                else if (rest === "." || rest === ".." || rest === "../") {
                    result = "Type 'cd' to go back 😅";
                    break;
                }
                else {
                    result = `bash: cd: ${words}: No such file or directory`;
                }
                break;
            case "ls":
                let target = words[0];
                if (target === "" || target === undefined || target === null) target = this.curr_dir_name;

                if (words.length > 1) {
                    result = "too many arguments, arguments must be <1.";
                    break;
                }
                if (target in this.child_directories) {
                    result = this.childDirectories(target).join("");
                }
                else if (target === "personal-documents") {
                    result = "Nope! 🙃";
                    break;
                }
                else {
                    result = `ls: cannot access '${words}': No such file or directory                    `;
                }
                break;
            case "mkdir":
                if (words[0] !== undefined && words[0] !== "") {
                    this.props.addFolder(words[0]);
                    result = "";
                } else {
                    result = "mkdir: missing operand";
                }
                break;
            case "pwd":
                let str = this.current_directory;
                result = str.replace("~", "/home/hasindu")
                break;
            case "code":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("vscode");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands:[ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-vivek, todoist, trash, settings, sendmsg]";
                }
                break;
            case "echo":
                result = this.xss(words.join(" "));
                break;
            case "spotify":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("spotify");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-vivek, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "chrome":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("chrome");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-vivek, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "todoist":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("todo-ist");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-vivek, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "trash":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("trash");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-vivek, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "about-vivek":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("about-vivek");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-vivek, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "terminal":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("terminal");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-vivek, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "settings":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("settings");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-vivek, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "sendmsg":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("gedit");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ /me, /skills, /projects, /explore, cd, ls, pwd, echo, clear, exit, code, spotify, chrome, sendmsg ]";
                }
                break;
            case "/me":
                result = `
                    <div class="border border-gray-600 rounded p-3">
                        <div class="text-ubt-gedit-orange font-bold text-sm mb-2">👤 About Me</div>
                        <div class="mb-1"><span class="text-ubt-green">Name &nbsp;&nbsp;&nbsp;&nbsp;:</span> Hasindu Wanninayake</div>
                        <div class="mb-1"><span class="text-ubt-green">Role &nbsp;&nbsp;&nbsp;&nbsp;:</span> Full Stack Software Engineer</div>
                        <div class="mb-1"><span class="text-ubt-green">Company &nbsp;:</span> Aahaas (Lifestyle Travel Super-App)</div>
                        <div class="mb-1"><span class="text-ubt-green">Location &nbsp;:</span> Colombo, Sri Lanka</div>
                        <div class="mb-1"><span class="text-ubt-green">Email &nbsp;&nbsp;&nbsp;:</span> hasindutwm@gmail.com</div>
                        <div class="mb-1"><span class="text-ubt-green">GitHub &nbsp;&nbsp;:</span> <a class="underline text-ubt-blue" href="https://github.com/Iron-voldy" target="_blank">github.com/Iron-voldy</a></div>
                        <div class="mb-1"><span class="text-ubt-green">LinkedIn &nbsp;:</span> <a class="underline text-ubt-blue" href="https://www.linkedin.com/in/hasindu-wanninayake-1ab155276/" target="_blank">linkedin.com/in/hasindu-wanninayake</a></div>
                        <div class="mt-2 text-gray-400 text-xs">Passionate Full Stack Developer specializing in Java, MERN stack, and AI-powered automation systems.</div>
                    </div>`;
                break;
            case "/skills":
                result = `
                    <div class="border border-gray-600 rounded p-3">
                        <div class="text-ubt-gedit-orange font-bold text-sm mb-2">🛠️ Technical Skills</div>
                        <div class="mb-2">
                            <div class="text-ubt-green mb-1">Languages</div>
                            <div class="flex flex-wrap gap-1 ml-2">
                                <span class="px-2 py-0.5 border border-yellow-300 text-yellow-300 rounded-full text-xs">Java</span>
                                <span class="px-2 py-0.5 border border-yellow-300 text-yellow-300 rounded-full text-xs">JavaScript</span>
                                <span class="px-2 py-0.5 border border-purple-400 text-purple-400 rounded-full text-xs">PHP</span>
                                <span class="px-2 py-0.5 border border-blue-400 text-blue-400 rounded-full text-xs">Python</span>
                            </div>
                        </div>
                        <div class="mb-2">
                            <div class="text-ubt-green mb-1">Frameworks & Libraries</div>
                            <div class="flex flex-wrap gap-1 ml-2">
                                <span class="px-2 py-0.5 border border-green-400 text-green-400 rounded-full text-xs">SpringBoot</span>
                                <span class="px-2 py-0.5 border border-green-300 text-green-300 rounded-full text-xs">Node.js</span>
                                <span class="px-2 py-0.5 border border-blue-300 text-blue-300 rounded-full text-xs">React</span>
                                <span class="px-2 py-0.5 border border-blue-400 text-blue-400 rounded-full text-xs">Tailwind CSS</span>
                                <span class="px-2 py-0.5 border border-gray-400 text-gray-400 rounded-full text-xs">Hibernate</span>
                            </div>
                        </div>
                        <div class="mb-2">
                            <div class="text-ubt-green mb-1">Databases & Tools</div>
                            <div class="flex flex-wrap gap-1 ml-2">
                                <span class="px-2 py-0.5 border border-blue-400 text-blue-400 rounded-full text-xs">MySQL</span>
                                <span class="px-2 py-0.5 border border-green-400 text-green-400 rounded-full text-xs">MongoDB</span>
                                <span class="px-2 py-0.5 border border-red-400 text-red-400 rounded-full text-xs">Firebase</span>
                                <span class="px-2 py-0.5 border border-gray-300 text-gray-300 rounded-full text-xs">Git / GitHub</span>
                                <span class="px-2 py-0.5 border border-pink-400 text-pink-400 rounded-full text-xs">n8n</span>
                                <span class="px-2 py-0.5 border border-yellow-500 text-yellow-500 rounded-full text-xs">LLM / AI</span>
                            </div>
                        </div>
                    </div>`;
                break;
            case "/projects":
                result = `
                    <div class="border border-gray-600 rounded p-3">
                        <div class="text-ubt-gedit-orange font-bold text-sm mb-2">🚀 Projects</div>
                        <div class="mb-2 border-b border-gray-700 pb-2">
                            <div class="text-white font-semibold">AI Travel Itinerary <span class="text-gray-500 font-normal text-xs ml-2">Jan 2026 – Feb 2026</span></div>
                            <div class="text-gray-400 text-xs mt-0.5">AI-powered travel itinerary system for Aahaas using n8n &amp; LLM models</div>
                            <a class="text-ubt-blue underline text-xs" href="https://www.dev.aahaas.com" target="_blank">www.dev.aahaas.com</a>
                        </div>
                        <div class="mb-2 border-b border-gray-700 pb-2">
                            <div class="text-white font-semibold">AI Quotation System <span class="text-gray-500 font-normal text-xs ml-2">Feb 2026 – Mar 2026</span></div>
                            <div class="text-gray-400 text-xs mt-0.5">Intelligent quotation system powered by LLM models and n8n automation</div>
                            <a class="text-ubt-blue underline text-xs" href="https://ai.appleholidaysds.com/login" target="_blank">ai.appleholidaysds.com</a>
                        </div>
                        <div class="mb-2 border-b border-gray-700 pb-2">
                            <div class="text-white font-semibold">IoT Piano Visualizer <span class="text-gray-500 font-normal text-xs ml-2">Jun 2024 – Nov 2024</span></div>
                            <div class="text-gray-400 text-xs mt-0.5">ESP32 + RGB LED IoT piano with PHP web interface</div>
                            <a class="text-ubt-blue underline text-xs" href="https://github.com/Iron-voldy/IOT-Piano" target="_blank">github.com/Iron-voldy/IOT-Piano</a>
                        </div>
                        <div class="mb-2 border-b border-gray-700 pb-2">
                            <div class="text-white font-semibold">shopEase Android App <span class="text-gray-500 font-normal text-xs ml-2">Feb 2025 – Mar 2025</span></div>
                            <div class="text-gray-400 text-xs mt-0.5">Android e-commerce app with Java &amp; Firebase</div>
                            <a class="text-ubt-blue underline text-xs" href="https://github.com/Iron-voldy/shopease-androidJava" target="_blank">github.com/Iron-voldy/shopease-androidJava</a>
                        </div>
                        <div class="mb-2">
                            <div class="text-white font-semibold">foody E-Commerce <span class="text-gray-500 font-normal text-xs ml-2">Oct 2022 – Dec 2022</span></div>
                            <div class="text-gray-400 text-xs mt-0.5">Full-stack food ordering app with HTML, CSS, JS, PHP &amp; MySQL</div>
                            <a class="text-ubt-blue underline text-xs" href="https://github.com/Iron-voldy/foody" target="_blank">github.com/Iron-voldy/foody</a>
                        </div>
                    </div>`;
                break;
            case "/explore":
                window.open("https://hasindu-wanninayake.vercel.app/", "_blank");
                result = `<div class="text-ubt-green">🌐 Opening portfolio → <a class="underline text-ubt-blue" href="https://hasindu-wanninayake.vercel.app/" target="_blank">hasindu-wanninayake.vercel.app</a></div>`;
                break;
            case "clear":
                this.reStartTerminal();
                return;
            case "exit":
                this.closeTerminal();
                return;
            case "sudo":

                ReactGA.event({
                    category: "Sudo Access",
                    action: "lol",
                });

                result = "<img class=' w-2/5' src='./images/memes/used-sudo-command.webp' />";
                break;
            default:
                result = "Command '" + main + "' not found.<br>Available Commands: [ <span class='text-ubt-green'>/me, /skills, /projects, /explore</span>, cd, ls, pwd, echo, clear, exit, code, spotify, chrome, sendmsg ]";
        }
        document.getElementById(`row-result-${rowId}`).innerHTML = result;
        this.appendTerminalRow();
    }

    xss(str) {
        if (!str) return;
        return str.split('').map(char => {
            switch (char) {
                case '&':
                    return '&amp';
                case '<':
                    return '&lt';
                case '>':
                    return '&gt';
                case '"':
                    return '&quot';
                case "'":
                    return '&#x27';
                case '/':
                    return '&#x2F';
                default:
                    return char;
            }
        }).join('');
    }

    render() {
        return (
            <div className="h-full w-full bg-ub-drk-abrgn text-white text-sm font-bold" id="terminal-body">
                {
                    this.state.terminal
                }
            </div>
        )
    }
}

export default Terminal

export const displayTerminal = (addFolder, openApp) => {
    return <Terminal addFolder={addFolder} openApp={openApp}> </Terminal>;
}
