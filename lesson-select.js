// Lesson Selection Page JavaScript
// Displays all available lessons in a grid format

const lessons = window.lessonData || [];
let completedLessons = [];

// Initialize lesson selection page
function initLessonSelect() {
    // Load completed lessons from save manager or localStorage
    if (window.saveManager) {
        completedLessons = window.saveManager.getCompletedLessons();
    } else {
        const stored = localStorage.getItem('completedLessons');
        if (stored) {
            completedLessons = JSON.parse(stored);
        }
    }

    renderLessonGrid();
    setupEventListeners();
}

// Render the lesson grid
function renderLessonGrid() {
    const gridContainer = document.getElementById('lessonGrid');
    gridContainer.innerHTML = '';

    // Group lessons by level
    const levels = {
        beginner: [],
        intermediate: [],
        advanced: []
    };

    lessons.forEach((lesson, index) => {
        const level = lesson.level || 'beginner';
        levels[level].push({ lesson, index });
    });

    // Level information
    const levelInfo = {
        beginner: { emoji: '🌱', title: 'Beginner', description: 'Start your JavaScript journey' },
        intermediate: { emoji: '⚔️', title: 'Intermediate', description: 'Level up your skills' },
        advanced: { emoji: '🏆', title: 'Advanced', description: 'Master advanced concepts' }
    };

    // Render each level section
    Object.keys(levels).forEach(levelKey => {
        if (levels[levelKey].length === 0) return;

        const levelSection = document.createElement('div');
        levelSection.className = 'level-section';

        // Level header
        const levelHeader = document.createElement('div');
        levelHeader.className = 'level-header';
        levelHeader.textContent = `${levelInfo[levelKey].emoji} ${levelInfo[levelKey].title} - ${levelInfo[levelKey].description}`;
        levelSection.appendChild(levelHeader);

        // Lessons container
        const lessonsContainer = document.createElement('div');
        lessonsContainer.className = 'level-lessons';

        // Add lesson cards
        levels[levelKey].forEach(({ lesson, index }) => {
            const card = createLessonCard(lesson, index);
            lessonsContainer.appendChild(card);
        });

        levelSection.appendChild(lessonsContainer);
        gridContainer.appendChild(levelSection);
    });
}

// Create a lesson card element
function createLessonCard(lesson, index) {
    const card = document.createElement('div');
    card.className = 'lesson-card';
    
    const isCompleted = completedLessons.includes(lesson.id);
    if (isCompleted) {
        card.classList.add('completed');
    }

    // Card content
    const cardHeader = document.createElement('div');
    cardHeader.className = 'lesson-card-header';

    const lessonNumber = document.createElement('div');
    lessonNumber.className = 'lesson-number';
    lessonNumber.textContent = `Lesson ${index + 1}`;
    cardHeader.appendChild(lessonNumber);

    card.appendChild(cardHeader);

    const title = document.createElement('div');
    title.className = 'lesson-card-title';
    // Remove "Lesson X: " prefix if it exists
    title.textContent = lesson.title.replace(/^Lesson \d+:\s*/, '');
    card.appendChild(title);

    // Extract a brief description from the explanation
    const description = document.createElement('div');
    description.className = 'lesson-card-description';
    description.textContent = getShortDescription(lesson);
    card.appendChild(description);

    // Status badge
    const status = document.createElement('div');
    status.className = 'lesson-status';
    if (isCompleted) {
        status.classList.add('completed');
        status.textContent = '✓ Completed';
    } else {
        status.classList.add('not-started');
        status.textContent = 'Not Started';
    }
    card.appendChild(status);

    // Click handler to navigate to lesson
    card.addEventListener('click', () => {
        window.location.href = `lesson-view.html?id=${lesson.id}`;
    });

    return card;
}

// Get a short description from the lesson explanation
function getShortDescription(lesson) {
    // Try to extract first paragraph from explanation
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = lesson.explanation;
    const firstP = tempDiv.querySelector('p');
    if (firstP) {
        let text = firstP.textContent.trim();
        // Remove emojis and truncate
        text = text.replace(/[^\x00-\x7F]/g, '').trim();
        if (text.length > 100) {
            text = text.substring(0, 100) + '...';
        }
        return text || 'Learn important JavaScript concepts';
    }
    return 'Learn important JavaScript concepts';
}

// Setup event listeners
function setupEventListeners() {
    // Back to game button
    document.getElementById('backToGame').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initLessonSelect);
