// Game State
const gameState = {
    currentRoom: 'entrance',
    inventory: [],
    health: 100,
    experience: 0,
    level: 1,
    completedChallenges: [],
    unlockedDoors: [],
    defeatedEnemies: []
};

// Room Definitions
const rooms = {
    entrance: {
        name: 'Dungeon Entrance',
        description: 'You stand at the entrance of a dark dungeon. The air is cold and musty. A door lies ahead.',
        challenge: {
            id: 'hello_world',
            description: 'Print "Hello, Dungeon!" to the console to unlock the door.',
            hint: 'Use console.log() to print text',
            solution: (output) => output.includes('Hello, Dungeon!')
        },
        exits: { north: 'corridor' },
        locked: { north: 'hello_world' }
    },
    corridor: {
        name: 'Dark Corridor',
        description: 'A long corridor stretches before you. Torches flicker on the walls. There are paths to the east and north.',
        challenge: {
            id: 'variable_door',
            description: 'Create a variable called "key" with the value 42 to proceed.',
            hint: 'Use: let key = ...',
            solution: (output, code) => code.includes('key') && code.includes('42')
        },
        exits: { south: 'entrance', east: 'armory', north: 'treasure_room' },
        locked: { east: 'variable_door' }
    },
    armory: {
        name: 'Armory',
        description: 'Weapons and armor line the walls. A skeleton warrior guards a chest.',
        enemy: {
            name: 'Skeleton Warrior',
            health: 50,
            weakness: 'loop_attack'
        },
        challenge: {
            id: 'loop_attack',
            description: 'Use a for loop to attack 5 times. Each attack should console.log("Attack!")',
            hint: 'for(let i = 0; i < 5; i++) { ... }',
            solution: (output) => {
                const attacks = (output.match(/Attack!/g) || []).length;
                return attacks === 5;
            }
        },
        exits: { west: 'corridor', north: 'puzzle_room' },
        locked: { north: 'loop_attack' }
    },
    puzzle_room: {
        name: 'Puzzle Chamber',
        description: 'Ancient runes cover the walls. A magical barrier blocks your path.',
        challenge: {
            id: 'array_puzzle',
            description: 'Create an array with the numbers [1, 2, 3, 4, 5] and calculate their sum.',
            hint: 'Use array.reduce() or a loop to sum the numbers',
            solution: (output, code) => {
                return code.includes('[1, 2, 3, 4, 5]') && 
                       (output.includes('15') || code.includes('reduce'));
            }
        },
        exits: { south: 'armory', east: 'boss_room' },
        locked: { east: 'array_puzzle' }
    },
    treasure_room: {
        name: 'Treasure Room',
        description: 'Gold and jewels sparkle in the dim light. You find a mysterious scroll.',
        challenge: {
            id: 'function_treasure',
            description: 'Write a function called "openChest" that returns "Treasure found!"',
            hint: 'function openChest() { return ... }',
            solution: (output, code) => {
                return code.includes('function') && 
                       code.includes('openChest') && 
                       (output.includes('Treasure found!') || code.includes('return'));
            }
        },
        exits: { south: 'corridor' }
    },
    boss_room: {
        name: 'Boss Chamber',
        description: 'A massive dragon sleeps on a pile of gold. This is the final challenge!',
        enemy: {
            name: 'Ancient Dragon',
            health: 100,
            weakness: 'dragon_defeat'
        },
        challenge: {
            id: 'dragon_defeat',
            description: 'Create an object representing the dragon with properties: name, health, and defeated. Set defeated to true.',
            hint: 'const dragon = { name: "...", health: 0, defeated: true }',
            solution: (output, code) => {
                return code.includes('dragon') && 
                       code.includes('defeated') && 
                       code.includes('true');
            }
        },
        exits: { west: 'puzzle_room' }
    }
};

// Game Functions
function displayRoom() {
    const room = rooms[gameState.currentRoom];
    let text = `<p class="highlight">== ${room.name} ==</p>`;
    text += `<p>${room.description}</p>`;
    
    if (room.enemy && !gameState.defeatedEnemies.includes(room.enemy.name)) {
        text += `<p class="enemy">⚔️ A ${room.enemy.name} blocks your path!</p>`;
    }
    
    if (room.challenge && !gameState.completedChallenges.includes(room.challenge.id)) {
        text += `<p class="highlight">📝 CHALLENGE: ${room.challenge.description}</p>`;
    }
    
    text += `<p>Exits: ${Object.keys(room.exits).join(', ')}</p>`;
    text += `<p>HP: ${gameState.health} | Level: ${gameState.level} | XP: ${gameState.experience}</p>`;
    
    appendToGameplay(text);
}

function appendToGameplay(text) {
    const gameplayDiv = document.getElementById('gameplayText');
    gameplayDiv.innerHTML += text;
    gameplayDiv.scrollTop = gameplayDiv.scrollHeight;
}

function clearGameplay() {
    document.getElementById('gameplayText').innerHTML = '';
}

function movePlayer(direction) {
    const room = rooms[gameState.currentRoom];
    
    if (!room.exits[direction]) {
        appendToGameplay(`<p>You cannot go ${direction} from here.</p>`);
        return false;
    }
    
    const nextRoom = room.exits[direction];
    
    // Check if door is locked
    if (room.locked && room.locked[direction]) {
        const requiredChallenge = room.locked[direction];
        if (!gameState.completedChallenges.includes(requiredChallenge)) {
            appendToGameplay(`<p class="enemy">🔒 The door is locked! Complete the challenge to proceed.</p>`);
            return false;
        }
    }
    
    gameState.currentRoom = nextRoom;
    appendToGameplay(`<p>You move ${direction}...</p>`);
    displayRoom();
    return true;
}

function executeCode(code) {
    let output = '';
    let error = null;
    
    // Create a safe console.log that captures output
    const originalLog = console.log;
    const logs = [];
    console.log = function(...args) {
        logs.push(args.join(' '));
        originalLog.apply(console, args);
    };
    
    try {
        // Execute the code
        eval(code);
        output = logs.join('\n');
    } catch (e) {
        error = e.message;
    } finally {
        console.log = originalLog;
    }
    
    return { output, error };
}

function checkChallenge(code) {
    const room = rooms[gameState.currentRoom];
    
    if (!room.challenge) {
        appendToGameplay(`<p>There is no challenge in this room.</p>`);
        return false;
    }
    
    if (gameState.completedChallenges.includes(room.challenge.id)) {
        appendToGameplay(`<p>You've already completed this challenge!</p>`);
        return false;
    }
    
    const result = executeCode(code);
    
    if (result.error) {
        appendToGameplay(`<p class="enemy">❌ Error: ${result.error}</p>`);
        return false;
    }
    
    appendToGameplay(`<p>Output: ${result.output || '(no output)'}</p>`);
    
    if (room.challenge.solution(result.output, code)) {
        gameState.completedChallenges.push(room.challenge.id);
        gameState.experience += 50;
        
        if (gameState.experience >= gameState.level * 100) {
            gameState.level++;
            gameState.health = 100;
            appendToGameplay(`<p class="success">⭐ LEVEL UP! You are now level ${gameState.level}!</p>`);
        }
        
        // Check if enemy defeated
        if (room.enemy && room.enemy.weakness === room.challenge.id) {
            gameState.defeatedEnemies.push(room.enemy.name);
            appendToGameplay(`<p class="success">⚔️ You defeated the ${room.enemy.name}!</p>`);
        }
        
        appendToGameplay(`<p class="success">✅ Challenge completed! +50 XP</p>`);
        
        if (room.challenge.id === 'dragon_defeat') {
            appendToGameplay(`<p class="success">🎉 CONGRATULATIONS! You've completed the dungeon and mastered JavaScript basics!</p>`);
        }
        
        return true;
    } else {
        appendToGameplay(`<p class="enemy">❌ Challenge not solved. Try again!</p>`);
        return false;
    }
}

function getHint() {
    const room = rooms[gameState.currentRoom];
    if (room.challenge && !gameState.completedChallenges.includes(room.challenge.id)) {
        return `💡 Hint: ${room.challenge.hint}`;
    }
    return 'No hints available for this room.';
}

function showInventory() {
    if (gameState.inventory.length === 0) {
        return 'Your inventory is empty.';
    }
    return `Inventory: ${gameState.inventory.join(', ')}`;
}

function getStatus() {
    return `Health: ${gameState.health}/100 | Level: ${gameState.level} | XP: ${gameState.experience} | Room: ${rooms[gameState.currentRoom].name}`;
}

// Initialize game
function initGame() {
    clearGameplay();
    appendToGameplay(`<p class="highlight">🎮 Welcome to Dungeon Crawler Carl!</p>`);
    appendToGameplay(`<p>Learn JavaScript by solving coding challenges in this text-based adventure.</p>`);
    appendToGameplay(`<p>Use the terminal below for commands (type "help" for available commands).</p>`);
    appendToGameplay(`<p>Write code in the Code Challenge box and click "Run Code" to solve puzzles.</p>`);
    appendToGameplay(`<p class="highlight">═══════════════════════════════════════════════════</p>`);
    displayRoom();
}

// Export functions
window.gameEngine = {
    initGame,
    movePlayer,
    checkChallenge,
    getHint,
    showInventory,
    getStatus,
    displayRoom,
    appendToGameplay,
    gameState,
    rooms
};
