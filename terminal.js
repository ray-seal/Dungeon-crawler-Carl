// Terminal Functions
const terminalHistory = [];
let historyIndex = -1;

// Modular help content configuration
const HELP_CONTENT = {
    introduction: {
        title: "Welcome to Dungeon Crawler Carl!",
        text: "You are Carl, a brave adventurer who has awoken in a mysterious dungeon. Your goal is to solve JavaScript coding challenges to unlock doors, defeat enemies, and escape to freedom. Use the terminal for commands and the Code Challenge box to write JavaScript code."
    },
    sections: [
        {
            title: 'Navigation Commands:',
            commands: [
                { name: 'cd [direction]', desc: 'Move in a direction (north, south, east, west)' },
                { name: 'ls / dir', desc: 'List exits from current room' },
                { name: 'pwd', desc: 'Show current room' },
                { name: 'look', desc: 'Examine the current room' }
            ]
        },
        {
            title: 'Game Commands:',
            commands: [
                { name: 'hint', desc: 'Get a hint for the current challenge' },
                { name: 'inventory', desc: 'Show your inventory' },
                { name: 'status', desc: 'Show your health, level, and XP' },
                { name: 'lessons', desc: 'Open interactive lessons page' },
                { name: 'newgame', desc: 'Reset progress and start a new game' }
            ]
        },
        {
            title: 'System Commands:',
            commands: [
                { name: 'sudo [command]', desc: 'Execute with elevated privileges (special actions)' },
                { name: 'help', desc: 'Show this help message' },
                { name: 'man [command]', desc: 'Show manual for a command' },
                { name: 'clear', desc: 'Clear the terminal' },
                { name: 'history', desc: 'Show command history' },
                { name: 'whoami', desc: 'Display player info' },
                { name: 'echo [text]', desc: 'Print text to terminal' },
                { name: 'cat [file]', desc: 'Read a file' }
            ]
        }
    ],
    tips: [
        "Write JavaScript code in the Code Challenge box to solve puzzles!",
        "Use the terminal to navigate through the dungeon and check your status.",
        "Type 'hint' if you're stuck on a challenge.",
        "Your progress is automatically saved as you play."
    ]
};

function appendToTerminal(text, type = 'output') {
    const terminal = document.getElementById('terminal');
    const line = document.createElement('div');
    
    if (type === 'command') {
        const span = document.createElement('span');
        span.style.color = '#ffff00';
        span.textContent = `$ ${text}`;
        line.appendChild(span);
    } else if (type === 'error') {
        const span = document.createElement('span');
        span.style.color = '#ff0000';
        span.textContent = text;
        line.appendChild(span);
    } else if (type === 'success') {
        const span = document.createElement('span');
        span.style.color = '#00ffff';
        span.textContent = text;
        line.appendChild(span);
    } else {
        line.textContent = text;
    }
    
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
}

function clearTerminal() {
    document.getElementById('terminal').innerHTML = '';
}

function processCommand(commandLine) {
    const [command, ...args] = commandLine.trim().split(' ');
    
    appendToTerminal(commandLine, 'command');
    terminalHistory.push(commandLine);
    historyIndex = terminalHistory.length;
    
    // Check for newgame confirmation
    if (command.toLowerCase() === 'newgame' && args[0] && args[0].toLowerCase() === 'confirm') {
        if (window._newGamePending) {
            confirmNewGame();
            return;
        } else {
            appendToTerminal('No pending new game request. Type "newgame" first.', 'error');
            return;
        }
    }
    
    // Reset newgame flag if user types something else
    if (window._newGamePending && command.toLowerCase() !== 'newgame') {
        window._newGamePending = false;
    }
    
    switch (command.toLowerCase()) {
        case 'help':
            showHelp();
            break;
            
        case 'cd':
            handleCd(args[0]);
            break;
            
        case 'ls':
        case 'dir':
            handleLs();
            break;
            
        case 'sudo':
            handleSudo(args);
            break;
            
        case 'hint':
            appendToTerminal(gameEngine.getHint(), 'success');
            break;
            
        case 'inventory':
        case 'inv':
            appendToTerminal(gameEngine.showInventory());
            break;
            
        case 'status':
        case 'stats':
            appendToTerminal(gameEngine.getStatus());
            break;
            
        case 'look':
            gameEngine.displayRoom();
            appendToTerminal('Room description updated in Adventure Log.');
            break;
            
        case 'clear':
        case 'cls':
            clearTerminal();
            break;
            
        case 'pwd':
            appendToTerminal(`/dungeon/${gameEngine.gameState.currentRoom}`);
            break;
            
        case 'man':
            showManual(args[0]);
            break;
            
        case 'whoami':
            appendToTerminal(`You are ${gameEngine.gameState.playerName}, a brave adventurer learning JavaScript! Level ${gameEngine.gameState.level}`);
            break;
            
        case 'history':
            showHistory();
            break;
            
        case 'echo':
            appendToTerminal(args.join(' '));
            break;
            
        case 'cat':
            handleCat(args[0]);
            break;
            
        case 'lessons':
            handleLessons();
            break;
            
        case 'newgame':
            handleNewGame();
            break;
            
        case 'exit':
        case 'quit':
            appendToTerminal('There is no escape from the dungeon! (Use the browser to close)', 'error');
            break;
            
        case '':
            // Empty command, do nothing
            break;
            
        default:
            appendToTerminal(`Command not found: ${command}. Type "help" for available commands.`, 'error');
    }
}

function showHelp() {
    // Open the help modal
    openHelpModal();
    
    // Also log to terminal that help was opened
    appendToTerminal('Opening help guide...', 'success');
}

function openHelpModal() {
    const modal = document.getElementById('helpModal');
    const helpBody = document.getElementById('helpBody');
    
    if (!modal || !helpBody) return;
    
    // Clear previous content
    helpBody.innerHTML = '';
    
    // Build help content
    const container = document.createElement('div');
    
    // Add introduction
    const introDiv = document.createElement('div');
    introDiv.className = 'help-intro';
    const introTitle = document.createElement('strong');
    introTitle.textContent = HELP_CONTENT.introduction.title;
    introTitle.style.display = 'block';
    introTitle.style.marginBottom = '10px';
    introDiv.appendChild(introTitle);
    const introText = document.createElement('p');
    introText.textContent = HELP_CONTENT.introduction.text;
    introText.style.margin = '0';
    introDiv.appendChild(introText);
    container.appendChild(introDiv);
    
    // Add command sections
    HELP_CONTENT.sections.forEach(section => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'help-section';
        
        const sectionTitle = document.createElement('div');
        sectionTitle.className = 'help-section-title';
        sectionTitle.textContent = section.title;
        sectionDiv.appendChild(sectionTitle);
        
        section.commands.forEach(cmd => {
            const cmdDiv = document.createElement('div');
            cmdDiv.className = 'help-command';
            
            const cmdName = document.createElement('span');
            cmdName.className = 'help-command-name';
            cmdName.textContent = cmd.name;
            
            const separator = document.createTextNode(' - ');
            
            const cmdDesc = document.createElement('span');
            cmdDesc.className = 'help-command-desc';
            cmdDesc.textContent = cmd.desc;
            
            cmdDiv.appendChild(cmdName);
            cmdDiv.appendChild(separator);
            cmdDiv.appendChild(cmdDesc);
            sectionDiv.appendChild(cmdDiv);
        });
        
        container.appendChild(sectionDiv);
    });
    
    // Add tips
    const tipsDiv = document.createElement('div');
    tipsDiv.className = 'help-tip';
    const tipsTitle = document.createElement('strong');
    tipsTitle.textContent = '💡 Tips:';
    tipsTitle.style.display = 'block';
    tipsTitle.style.marginBottom = '8px';
    tipsDiv.appendChild(tipsTitle);
    
    HELP_CONTENT.tips.forEach(tip => {
        const tipP = document.createElement('p');
        tipP.textContent = '• ' + tip;
        tipP.style.margin = '5px 0';
        tipsDiv.appendChild(tipP);
    });
    
    container.appendChild(tipsDiv);
    
    // Add to help body
    helpBody.appendChild(container);
    
    // Show modal
    modal.style.display = 'flex';
}

function closeHelpModal() {
    const modal = document.getElementById('helpModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Initialize help modal event listeners
function initHelpModal() {
    const closeButton = document.getElementById('closeHelp');
    const modal = document.getElementById('helpModal');
    
    if (closeButton) {
        closeButton.addEventListener('click', closeHelpModal);
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeHelpModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modal = document.getElementById('helpModal');
            if (modal && modal.style.display === 'flex') {
                closeHelpModal();
            }
        }
    });
}

function handleCd(direction) {
    if (!direction) {
        appendToTerminal('Usage: cd [direction]', 'error');
        return;
    }
    
    const validDirections = ['north', 'south', 'east', 'west', 'n', 's', 'e', 'w'];
    const fullDirection = {
        'n': 'north', 's': 'south', 'e': 'east', 'w': 'west',
        'north': 'north', 'south': 'south', 'east': 'east', 'west': 'west'
    }[direction.toLowerCase()];
    
    if (!fullDirection) {
        appendToTerminal(`Invalid direction: ${direction}`, 'error');
        return;
    }
    
    if (gameEngine.movePlayer(fullDirection)) {
        appendToTerminal(`Changed directory to ${fullDirection}`, 'success');
    } else {
        appendToTerminal(`Cannot move ${fullDirection}`, 'error');
    }
}

function handleLs() {
    const room = gameEngine.rooms[gameEngine.gameState.currentRoom];
    const exits = Object.keys(room.exits);
    
    appendToTerminal('Available exits:');
    exits.forEach(exit => {
        const isLocked = room.locked && room.locked[exit] && 
                        !gameEngine.gameState.completedChallenges.includes(room.locked[exit]);
        const status = isLocked ? '[LOCKED]' : '[OPEN]';
        appendToTerminal(`  ${exit}/ ${status}`);
    });
}

function handleSudo(args) {
    if (args.length === 0) {
        appendToTerminal('Usage: sudo [command]', 'error');
        return;
    }
    
    const subCommand = args[0].toLowerCase();
    
    switch (subCommand) {
        case 'unlock':
            appendToTerminal('Permission denied: You must solve the challenge to unlock doors!', 'error');
            break;
            
        case 'heal':
            if (gameEngine.gameState.level >= 2) {
                gameEngine.gameState.health = 100;
                appendToTerminal('Health restored to 100!', 'success');
            } else {
                appendToTerminal('Permission denied: Insufficient level!', 'error');
            }
            break;
            
        case 'reveal':
            const room = gameEngine.rooms[gameEngine.gameState.currentRoom];
            if (room.challenge) {
                appendToTerminal(`Challenge ID: ${room.challenge.id}`, 'success');
            }
            break;
            
        case 'tips':
            showTipsGuide();
            break;
            
        default:
            appendToTerminal(`sudo: ${subCommand}: command not found`, 'error');
    }
}

function showManual(command) {
    if (!command) {
        appendToTerminal('Usage: man [command]', 'error');
        return;
    }
    
    const manuals = {
        'cd': 'cd - change directory (move between rooms)\nUsage: cd [north|south|east|west]',
        'ls': 'ls - list directory contents (show exits)\nUsage: ls',
        'sudo': 'sudo - execute command with elevated privileges\nUsage: sudo [heal|reveal|unlock|tips]',
        'hint': 'hint - display a hint for the current challenge\nUsage: hint',
        'help': 'help - display available commands\nUsage: help',
        'lessons': 'lessons - open interactive lessons page to learn JavaScript concepts\nUsage: lessons'
    };
    
    appendToTerminal(manuals[command.toLowerCase()] || `No manual entry for ${command}`);
}

function showHistory() {
    if (terminalHistory.length === 0) {
        appendToTerminal('No command history.');
        return;
    }
    
    terminalHistory.forEach((cmd, index) => {
        appendToTerminal(`${index + 1}  ${cmd}`);
    });
}

function handleCat(filename) {
    if (!filename) {
        appendToTerminal('Usage: cat [filename]', 'error');
        return;
    }
    
    const files = {
        'readme.txt': 'Welcome to the Dungeon! Solve JavaScript challenges to progress.',
        'hints.txt': 'Use the terminal command "hint" to get help with challenges.',
        'journal.txt': `Day 1: Entered the dungeon.\nDay 2: Learning JavaScript...\nDay ${gameEngine.gameState.level}: Still alive!`
    };
    
    appendToTerminal(files[filename] || `cat: ${filename}: No such file or directory`, files[filename] ? undefined : 'error');
}

function handleLessons() {
    const room = gameEngine.rooms[gameEngine.gameState.currentRoom];
    const currentObjective = room.challenge ? room.challenge.id : null;
    
    appendToTerminal('📚 Opening lessons page...', 'success');
    appendToTerminal('Learn the concepts you need to solve challenges!');
    
    // Navigate to lessons page with current objective
    if (currentObjective) {
        window.location.href = `lessons.html?objective=${currentObjective}`;
    } else {
        window.location.href = 'lessons.html';
    }
}

function handleNewGame() {
    appendToTerminal('⚠️  Are you sure you want to start a new game?', 'error');
    appendToTerminal('This will reset ALL progress (game state and lessons).', 'error');
    appendToTerminal('Type "newgame confirm" to proceed.', 'success');
    
    // Store flag to track confirmation
    window._newGamePending = true;
}

function confirmNewGame() {
    if (gameEngine && gameEngine.resetGame) {
        gameEngine.resetGame();
        appendToTerminal('🎮 New game started! All progress has been reset.', 'success');
        clearTerminal();
        initTerminal();
    } else {
        appendToTerminal('Failed to reset game.', 'error');
    }
    window._newGamePending = false;
}

function showTipsGuide() {
    // Build tips guide using DOM manipulation
    const container = document.createElement('div');
    
    const titleDiv = document.createElement('div');
    titleDiv.style.color = '#00ffff';
    titleDiv.style.fontWeight = 'bold';
    titleDiv.textContent = '📚 Programming & Terminal Commands Guide';
    container.appendChild(titleDiv);
    container.appendChild(document.createElement('br'));
    
    const sections = [
        {
            title: 'Programming Commands:',
            color: '#ffff00',
            commands: [
                { name: 'console.log', desc: 'Prints output to the browser console (JavaScript).' },
                { name: 'print', desc: 'Prints output (Python).' },
                { name: 'if', desc: 'Conditional statement (JavaScript, Python, etc.).' }
            ]
        },
        {
            title: 'Terminal Commands:',
            color: '#00ff00',
            commands: [
                { name: 'cd', desc: 'Change directory.' },
                { name: 'sudo', desc: 'Run command with superuser privileges.' },
                { name: 'ls', desc: 'List files in the current directory.' },
                { name: 'mkdir', desc: 'Create a new directory.' },
                { name: 'rm', desc: 'Remove files or directories.' }
            ]
        }
    ];
    
    sections.forEach(section => {
        const sectionTitle = document.createElement('div');
        sectionTitle.style.color = section.color;
        sectionTitle.style.fontWeight = 'bold';
        sectionTitle.style.marginTop = '10px';
        sectionTitle.textContent = section.title;
        container.appendChild(sectionTitle);
        
        section.commands.forEach(cmd => {
            const cmdDiv = document.createElement('div');
            cmdDiv.style.marginLeft = '10px';
            cmdDiv.style.marginTop = '5px';
            
            const cmdName = document.createElement('span');
            cmdName.style.color = '#00ffff';
            cmdName.style.fontWeight = 'bold';
            cmdName.textContent = cmd.name + ': ';
            
            const cmdDesc = document.createElement('span');
            cmdDesc.style.color = '#ffffff';
            cmdDesc.textContent = cmd.desc;
            
            cmdDiv.appendChild(cmdName);
            cmdDiv.appendChild(cmdDesc);
            container.appendChild(cmdDiv);
        });
        
        container.appendChild(document.createElement('br'));
    });
    
    const footerDiv = document.createElement('div');
    footerDiv.style.color = '#ffff00';
    footerDiv.style.marginTop = '10px';
    footerDiv.textContent = '💡 Tip: Use these commands to navigate and solve challenges!';
    container.appendChild(footerDiv);
    
    const terminal = document.getElementById('terminal');
    terminal.appendChild(container);
    terminal.scrollTop = terminal.scrollHeight;
}

// Terminal initialization
function initTerminal() {
    appendToTerminal('Dungeon Crawler Carl Terminal v1.0', 'success');
    appendToTerminal('Type "help" for available commands.');
    appendToTerminal('═══════════════════════════════════════════════════');
    
    // Initialize help modal
    initHelpModal();
}

// Event listeners for terminal input
document.getElementById('terminalInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const command = this.value.trim();
        if (command) {
            processCommand(command);
        }
        this.value = '';
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            this.value = terminalHistory[historyIndex];
        }
    } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (historyIndex < terminalHistory.length - 1) {
            historyIndex++;
            this.value = terminalHistory[historyIndex];
        } else {
            historyIndex = terminalHistory.length;
            this.value = '';
        }
    }
});

// Event listener for Send Command button
document.getElementById('sendCommand').addEventListener('click', function() {
    const terminalInput = document.getElementById('terminalInput');
    const command = terminalInput.value.trim();
    if (command) {
        processCommand(command);
        terminalInput.value = '';
    }
    terminalInput.focus();
});

// Export terminal functions
window.terminal = {
    appendToTerminal,
    clearTerminal,
    processCommand,
    initTerminal
};
