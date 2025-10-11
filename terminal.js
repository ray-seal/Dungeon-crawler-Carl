// Terminal Functions
const terminalHistory = [];
let historyIndex = -1;

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
            appendToTerminal(`You are a brave adventurer learning JavaScript! Level ${gameEngine.gameState.level}`);
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
    // Build help text using DOM manipulation to avoid innerHTML
    const container = document.createElement('div');
    
    const titleDiv = document.createElement('div');
    titleDiv.style.color = '#00ffff';
    titleDiv.textContent = 'Available Commands:';
    container.appendChild(titleDiv);
    container.appendChild(document.createElement('br'));
    
    const sections = [
        {
            title: 'Navigation:',
            commands: [
                'cd [direction]  - Move in a direction (north, south, east, west)',
                'ls / dir        - List exits from current room',
                'pwd             - Show current room',
                'look            - Examine the current room'
            ]
        },
        {
            title: 'Game Commands:',
            commands: [
                'hint            - Get a hint for the current challenge',
                'inventory       - Show your inventory',
                'status          - Show your health, level, and XP'
            ]
        },
        {
            title: 'System Commands:',
            commands: [
                'sudo [command]  - Execute with elevated privileges (special actions)',
                'help            - Show this help message',
                'man [command]   - Show manual for a command',
                'clear           - Clear the terminal',
                'history         - Show command history',
                'whoami          - Display player info',
                'echo [text]     - Print text to terminal',
                'cat [file]      - Read a file'
            ]
        }
    ];
    
    sections.forEach(section => {
        const strong = document.createElement('strong');
        strong.textContent = section.title;
        container.appendChild(strong);
        container.appendChild(document.createTextNode('\n'));
        
        section.commands.forEach(cmd => {
            container.appendChild(document.createTextNode('  ' + cmd + '\n'));
        });
        container.appendChild(document.createElement('br'));
    });
    
    const tipDiv = document.createElement('div');
    tipDiv.style.color = '#ffff00';
    tipDiv.textContent = 'Tip: Write JavaScript code in the Code Challenge box to solve puzzles!';
    container.appendChild(tipDiv);
    
    const terminal = document.getElementById('terminal');
    terminal.appendChild(container);
    terminal.scrollTop = terminal.scrollHeight;
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
        'help': 'help - display available commands\nUsage: help'
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
