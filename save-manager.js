// Save Manager - Handles localStorage for game progress
const SAVE_KEY = 'dungeonCrawlerCarl_saveData';

// Save game state to localStorage
function saveGameState(gameState) {
    try {
        const saveData = {
            gameState: {
                currentRoom: gameState.currentRoom,
                inventory: gameState.inventory,
                health: gameState.health,
                experience: gameState.experience,
                level: gameState.level,
                completedChallenges: gameState.completedChallenges,
                unlockedDoors: gameState.unlockedDoors,
                defeatedEnemies: gameState.defeatedEnemies,
                exploredRooms: gameState.exploredRooms,
                visitedRooms: gameState.visitedRooms
            },
            timestamp: new Date().toISOString()
        };
        localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
        return true;
    } catch (error) {
        console.error('Failed to save game state:', error);
        return false;
    }
}

// Load game state from localStorage
function loadGameState() {
    try {
        const savedData = localStorage.getItem(SAVE_KEY);
        if (!savedData) return null;
        
        const parsed = JSON.parse(savedData);
        return parsed.gameState;
    } catch (error) {
        console.error('Failed to load game state:', error);
        return null;
    }
}

// Check if saved game exists
function hasSavedGame() {
    return localStorage.getItem(SAVE_KEY) !== null;
}

// Clear saved game
function clearSaveData() {
    try {
        localStorage.removeItem(SAVE_KEY);
        return true;
    } catch (error) {
        console.error('Failed to clear save data:', error);
        return false;
    }
}

// Get save timestamp
function getSaveTimestamp() {
    try {
        const savedData = localStorage.getItem(SAVE_KEY);
        if (!savedData) return null;
        
        const parsed = JSON.parse(savedData);
        return parsed.timestamp;
    } catch (error) {
        return null;
    }
}

// Save lesson completion status
function saveLessonCompletion(lessonId) {
    try {
        const completedLessons = getCompletedLessons();
        if (!completedLessons.includes(lessonId)) {
            completedLessons.push(lessonId);
            localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
        }
        return true;
    } catch (error) {
        console.error('Failed to save lesson completion:', error);
        return false;
    }
}

// Get completed lessons
function getCompletedLessons() {
    try {
        const data = localStorage.getItem('completedLessons');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        return [];
    }
}

// Clear lesson progress
function clearLessonProgress() {
    try {
        localStorage.removeItem('completedLessons');
        localStorage.removeItem('lessonQuestionResults');
        return true;
    } catch (error) {
        console.error('Failed to clear lesson progress:', error);
        return false;
    }
}

// Save question results for a specific lesson
function saveQuestionResults(lessonId, questionResults) {
    try {
        const allResults = getAllQuestionResults();
        allResults[lessonId] = questionResults;
        localStorage.setItem('lessonQuestionResults', JSON.stringify(allResults));
        return true;
    } catch (error) {
        console.error('Failed to save question results:', error);
        return false;
    }
}

// Get question results for a specific lesson
function getQuestionResults(lessonId) {
    try {
        const allResults = getAllQuestionResults();
        return allResults[lessonId] || {};
    } catch (error) {
        console.error('Failed to get question results:', error);
        return {};
    }
}

// Get all question results for all lessons
function getAllQuestionResults() {
    try {
        const data = localStorage.getItem('lessonQuestionResults');
        return data ? JSON.parse(data) : {};
    } catch (error) {
        return {};
    }
}

// Export functions
window.saveManager = {
    saveGameState,
    loadGameState,
    hasSavedGame,
    clearSaveData,
    getSaveTimestamp,
    saveLessonCompletion,
    getCompletedLessons,
    clearLessonProgress,
    saveQuestionResults,
    getQuestionResults,
    getAllQuestionResults
};
