// Game State
const gameState = {
    currentRoom: 'entrance',
    inventory: [],
    health: 100,
    experience: 0,
    level: 1,
    completedChallenges: [],
    unlockedDoors: [],
    defeatedEnemies: [],
    exploredRooms: ['entrance'],
    visitedRooms: ['entrance']
};

// Room Definitions
const rooms = {
    entrance: {
        name: 'Dungeon Entrance',
        description: 'You stand at the entrance of a dark dungeon. The air is cold and musty. A door lies ahead.',
        coordinates: { x: 0, y: 0 },
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
        coordinates: { x: 0, y: 1 },
        challenge: {
            id: 'variable_door',
            description: 'Create a variable called "key" with the value 42 to proceed.',
            hint: 'Use: let key = ...',
            solution: (output, code) => code.includes('key') && code.includes('42')
        },
        exits: { south: 'entrance', east: 'data_chamber', north: 'treasure_room' },
        locked: { east: 'variable_door' }
    },
    data_chamber: {
        name: 'Chamber of Types',
        description: 'Strange symbols glow on the walls representing different data types. You must understand them to proceed.',
        coordinates: { x: 1, y: 1 },
        challenge: {
            id: 'data_types',
            description: 'Create three variables: "health" (number: 100), "name" (string: any name), and "alive" (boolean: true). Print all three.',
            hint: 'Remember: numbers have no quotes, strings need quotes, booleans are true/false',
            solution: (output, code) => {
                return code.includes('health') && 
                       code.includes('name') && 
                       code.includes('alive') &&
                       code.includes('100') &&
                       code.includes('true') &&
                       (code.includes('"') || code.includes("'"));
            }
        },
        exits: { west: 'corridor', east: 'calculation_hall' },
        locked: { east: 'data_types' }
    },
    calculation_hall: {
        name: 'Hall of Calculations',
        description: 'Ancient machinery fills this hall. Mathematical symbols are etched everywhere.',
        coordinates: { x: 2, y: 1 },
        challenge: {
            id: 'math_operators',
            description: 'Calculate the total damage: (10 + 5) * 2 and store it in variable "totalDamage". Print the result.',
            hint: 'Use parentheses for order of operations: (10 + 5) * 2',
            solution: (output, code) => {
                return code.includes('totalDamage') && 
                       (output.includes('30') || code.includes('(10 + 5) * 2') || code.includes('15 * 2'));
            }
        },
        exits: { west: 'data_chamber', north: 'string_shrine' },
        locked: { north: 'math_operators' }
    },
    string_shrine: {
        name: 'Shrine of Words',
        description: 'Scrolls and books float in the air. Ancient text manipulation magic permeates this place.',
        coordinates: { x: 2, y: 2 },
        challenge: {
            id: 'string_methods',
            description: 'Create variable "weapon" with value "sword". Convert it to uppercase using .toUpperCase() and print it.',
            hint: 'Use weapon.toUpperCase() to convert to uppercase',
            solution: (output, code) => {
                return code.includes('weapon') && 
                       code.includes('sword') &&
                       code.includes('toUpperCase') &&
                       output.includes('SWORD');
            }
        },
        exits: { south: 'calculation_hall', west: 'decision_chamber' },
        locked: { west: 'string_methods' }
    },
    decision_chamber: {
        name: 'Chamber of Decisions',
        description: 'Two paths diverge before you. Only those who can make logical decisions may choose wisely.',
        coordinates: { x: 1, y: 2 },
        challenge: {
            id: 'conditionals',
            description: 'Create variable "score" with value 85. Use if/else: print "Pass" if score >= 60, else print "Fail".',
            hint: 'if (score >= 60) { console.log("Pass"); } else { console.log("Fail"); }',
            solution: (output, code) => {
                return code.includes('score') && 
                       code.includes('if') &&
                       code.includes('85') &&
                       output.includes('Pass');
            }
        },
        exits: { east: 'string_shrine', west: 'comparison_cave', south: 'armory' },
        locked: { west: 'comparison_cave' }
    },
    comparison_cave: {
        name: 'Cave of Comparisons',
        description: 'A mystical cave where values are weighed and compared. Understanding comparison is key.',
        coordinates: { x: 0, y: 2 },
        challenge: {
            id: 'comparisons',
            description: 'Create "playerLevel" (5) and "enemyLevel" (3). Print "Victory!" if playerLevel is greater than enemyLevel.',
            hint: 'Use > to compare: if (playerLevel > enemyLevel)',
            solution: (output, code) => {
                return code.includes('playerLevel') && 
                       code.includes('enemyLevel') &&
                       code.includes('>') &&
                       output.includes('Victory!');
            }
        },
        exits: { east: 'decision_chamber', north: 'treasure_room' }
    },
    armory: {
        name: 'Armory',
        description: 'Weapons and armor line the walls. A skeleton warrior guards a chest.',
        coordinates: { x: 1, y: 3 },
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
        exits: { north: 'decision_chamber', east: 'puzzle_room' },
        locked: { east: 'loop_attack' }
    },
    puzzle_room: {
        name: 'Puzzle Chamber',
        description: 'Ancient runes cover the walls. A magical barrier blocks your path.',
        coordinates: { x: 2, y: 3 },
        challenge: {
            id: 'array_puzzle',
            description: 'Create an array with the numbers [1, 2, 3, 4, 5] and calculate their sum.',
            hint: 'Use array.reduce() or a loop to sum the numbers',
            solution: (output, code) => {
                return code.includes('[1, 2, 3, 4, 5]') && 
                       (output.includes('15') || code.includes('reduce'));
            }
        },
        exits: { west: 'armory', north: 'boss_antechamber' },
        locked: { north: 'array_puzzle' }
    },
    treasure_room: {
        name: 'Treasure Room',
        description: 'Gold and jewels sparkle in the dim light. You find a mysterious scroll about functions.',
        coordinates: { x: 0, y: 3 },
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
        exits: { south: 'comparison_cave' }
    },
    boss_antechamber: {
        name: 'Antechamber',
        description: 'You stand before massive golden doors. Heat radiates from beyond. This is your final test before the boss.',
        coordinates: { x: 2, y: 4 },
        challenge: {
            id: 'object_practice',
            description: 'Create an object "hero" with properties: name (string), health (100), and level (1). Print the hero object.',
            hint: 'const hero = { name: "...", health: 100, level: 1 };',
            solution: (output, code) => {
                return code.includes('hero') && 
                       code.includes('name') && 
                       code.includes('health') &&
                       code.includes('level') &&
                       code.includes('100');
            }
        },
        exits: { south: 'puzzle_room', north: 'boss_room' },
        locked: { north: 'object_practice' }
    },
    boss_room: {
        name: 'Dragon\'s Lair',
        description: 'A massive ancient dragon sleeps on a pile of gold. The air is thick with heat and danger. This is your final challenge!',
        coordinates: { x: 2, y: 5 },
        enemy: {
            name: 'Ancient Dragon',
            health: 100,
            weakness: 'dragon_defeat'
        },
        challenge: {
            id: 'dragon_defeat',
            description: `Write a complete battle script that simulates fighting the dragon! Your script must:
            
1. Use console.log() to output the battle progress
2. Create variables for dragonHealth (100) and playerHealth (100)
3. Use a loop (for or while) for multiple attack rounds (at least 3 rounds)
4. Each round: player attacks for 25-35 damage (use random or fixed)
5. Use if/else to check if dragon dodges (when dragonHealth > 50, 30% chance to dodge)
6. If dragon doesn't dodge, reduce dragonHealth and print "Dragon hit! Dragon health: X"
7. Dragon counter-attacks for 15-20 damage if still alive
8. Use if/else to check if player dodges (if playerHealth > 60, player dodges 40% of the time)
9. Print remaining health after each round
10. End when dragonHealth <= 0, print "Victory! Dragon defeated!"

The battle should play out dynamically in the console!`,
            hint: `Example structure:
let dragonHealth = 100;
let playerHealth = 100;
for (let round = 1; round <= 5; round++) {
    console.log("Round " + round);
    // Player attacks
    // Check if dragon dodges
    // Dragon counter-attacks
    // Check if player dodges
    // Print health status
    // Check if dragon is defeated
}`,
            solution: (output, code) => {
                // Check for required elements
                const hasLoop = code.includes('for') || code.includes('while');
                const hasIfElse = code.includes('if') && (code.includes('else') || code.match(/if.*if/));
                const hasConsoleLog = (code.match(/console\.log/g) || []).length >= 3;
                const hasDragonHealth = code.includes('dragonHealth') || code.includes('dragon_health') || code.includes('dragon');
                const hasPlayerHealth = code.includes('playerHealth') || code.includes('player_health') || code.includes('player');
                const hasVictoryMessage = output.toLowerCase().includes('victory') || 
                                         output.toLowerCase().includes('defeat') || 
                                         output.toLowerCase().includes('win');
                const hasHealthOutput = output.match(/health|Health|HP|hp/gi) && output.match(/\d+/g);
                const hasRounds = output.split('\n').length >= 5; // At least 5 lines of output
                
                // Check if battle simulation is reasonable
                const hasAttackLogic = code.includes('-') || code.includes('--') || code.includes('-=');
                
                return hasLoop && hasIfElse && hasConsoleLog && hasDragonHealth && 
                       hasPlayerHealth && hasVictoryMessage && hasHealthOutput && 
                       hasRounds && hasAttackLogic;
            }
        },
        exits: { south: 'boss_antechamber' }
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
    
    // Track explored rooms
    if (!gameState.exploredRooms.includes(nextRoom)) {
        gameState.exploredRooms.push(nextRoom);
    }
    if (!gameState.visitedRooms.includes(nextRoom)) {
        gameState.visitedRooms.push(nextRoom);
    }
    
    appendToGameplay(`<p>You move ${direction}...</p>`);
    displayRoom();
    
    // Update map if available
    if (window.dungeonMap) {
        window.dungeonMap.updateMap();
    }
    
    // Auto-save progress
    if (window.saveManager) {
        window.saveManager.saveGameState(gameState);
    }
    
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
        
        // Auto-save progress
        if (window.saveManager) {
            window.saveManager.saveGameState(gameState);
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
    // Try to load saved game state
    if (window.saveManager && window.saveManager.hasSavedGame()) {
        const savedState = window.saveManager.loadGameState();
        if (savedState) {
            // Restore saved state
            gameState.currentRoom = savedState.currentRoom;
            gameState.inventory = savedState.inventory || [];
            gameState.health = savedState.health;
            gameState.experience = savedState.experience;
            gameState.level = savedState.level;
            gameState.completedChallenges = savedState.completedChallenges || [];
            gameState.unlockedDoors = savedState.unlockedDoors || [];
            gameState.defeatedEnemies = savedState.defeatedEnemies || [];
            gameState.exploredRooms = savedState.exploredRooms || ['entrance'];
            gameState.visitedRooms = savedState.visitedRooms || ['entrance'];
            
            clearGameplay();
            appendToGameplay(`<p class="highlight">🎮 Welcome back to Dungeon Crawler Carl!</p>`);
            appendToGameplay(`<p class="success">💾 Progress loaded! Continuing from where you left off...</p>`);
            appendToGameplay(`<p class="highlight">═══════════════════════════════════════════════════</p>`);
            displayRoom();
            return;
        }
    }
    
    // Start new game
    clearGameplay();
    appendToGameplay(`<p class="highlight">🎮 Welcome to Dungeon Crawler Carl!</p>`);
    appendToGameplay(`<p>Learn JavaScript by solving coding challenges in this text-based adventure.</p>`);
    appendToGameplay(`<p>Use the terminal below for commands (type "help" for available commands).</p>`);
    appendToGameplay(`<p>Write code in the Code Challenge box and click "Run Code" to solve puzzles.</p>`);
    appendToGameplay(`<p class="highlight">═══════════════════════════════════════════════════</p>`);
    displayRoom();
}

// Reset game to initial state
function resetGame() {
    gameState.currentRoom = 'entrance';
    gameState.inventory = [];
    gameState.health = 100;
    gameState.experience = 0;
    gameState.level = 1;
    gameState.completedChallenges = [];
    gameState.unlockedDoors = [];
    gameState.defeatedEnemies = [];
    gameState.exploredRooms = ['entrance'];
    gameState.visitedRooms = ['entrance'];
    
    // Clear saved data
    if (window.saveManager) {
        window.saveManager.clearSaveData();
        window.saveManager.clearLessonProgress();
    }
    
    // Update map if available
    if (window.dungeonMap) {
        window.dungeonMap.updateMap();
    }
    
    // Reinitialize game display
    clearGameplay();
    appendToGameplay(`<p class="highlight">🎮 Starting New Game...</p>`);
    appendToGameplay(`<p>All progress has been reset.</p>`);
    appendToGameplay(`<p class="highlight">═══════════════════════════════════════════════════</p>`);
    displayRoom();
}

// Export functions
window.gameEngine = {
    initGame,
    resetGame,
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
