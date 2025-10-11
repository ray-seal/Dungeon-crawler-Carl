// UI Components Module - Reusable UI component functions

// Header Component - Initialize header with lessons button
function initializeHeader() {
    const lessonsButton = document.getElementById('lessonsButton');
    if (lessonsButton) {
        lessonsButton.addEventListener('click', navigateToLessons);
    }
}

// Navigate to lessons page
function navigateToLessons() {
    const room = window.gameEngine ? window.gameEngine.rooms[window.gameEngine.gameState.currentRoom] : null;
    const currentObjective = room && room.challenge ? room.challenge.id : null;
    
    if (currentObjective) {
        window.location.href = `lessons.html?objective=${currentObjective}`;
    } else {
        window.location.href = 'lessons.html';
    }
}

// Code Editor Component - Initialize code editor
function initializeCodeEditor() {
    const runCodeButton = document.getElementById('runCode');
    const codeEditor = document.getElementById('codeEditor');
    
    if (runCodeButton && codeEditor) {
        runCodeButton.addEventListener('click', function() {
            const code = codeEditor.value;
            
            if (!code.trim()) {
                window.gameEngine.appendToGameplay('<p class="enemy">❌ Please write some code first!</p>');
                return;
            }
            
            window.gameEngine.appendToGameplay('<p class="highlight">Running your code...</p>');
            window.gameEngine.checkChallenge(code);
        });
        
        // Allow Ctrl+Enter to run code
        codeEditor.addEventListener('keydown', function(event) {
            if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
                event.preventDefault();
                runCodeButton.click();
            }
        });
    }
}

// Adventure Log Component - Helper functions for gameplay text
function appendToAdventureLog(text) {
    const gameplayDiv = document.getElementById('gameplayText');
    if (gameplayDiv) {
        gameplayDiv.innerHTML += text;
        gameplayDiv.scrollTop = gameplayDiv.scrollHeight;
    }
}

function clearAdventureLog() {
    const gameplayDiv = document.getElementById('gameplayText');
    if (gameplayDiv) {
        gameplayDiv.innerHTML = '';
    }
}

// Terminal Component - Already implemented in terminal.js
// Just export reference functions if needed
function getTerminalElement() {
    return document.getElementById('terminal');
}

function getTerminalInput() {
    return document.getElementById('terminalInput');
}

// Export UI component functions
window.uiComponents = {
    initializeHeader,
    navigateToLessons,
    initializeCodeEditor,
    appendToAdventureLog,
    clearAdventureLog,
    getTerminalElement,
    getTerminalInput
};
