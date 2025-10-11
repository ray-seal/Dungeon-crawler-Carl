// Lesson data is now in lesson-data.js
// Reference to lessons array (loaded from lesson-data.js)
const lessons = window.lessonData || [];

// Lesson State
let currentLessonIndex = 0;
let completedLessons = [];

// Initialize lessons page
function initLessons() {
    // Load completed lessons from save manager or localStorage
    if (window.saveManager) {
        completedLessons = window.saveManager.getCompletedLessons();
    } else {
        const stored = localStorage.getItem('completedLessons');
        if (stored) {
            completedLessons = JSON.parse(stored);
        }
    }

    // Check if we came from a specific objective
    const urlParams = new URLSearchParams(window.location.search);
    const objective = urlParams.get('objective');
    
    if (objective) {
        // Find lesson matching the objective
        const lessonIndex = lessons.findIndex(l => l.objective === objective);
        if (lessonIndex !== -1) {
            currentLessonIndex = lessonIndex;
        }
    }

    renderLessonList();
    loadLesson(currentLessonIndex);
    setupEventListeners();
}

// Render the list of lessons in the sidebar
function renderLessonList() {
    const listContainer = document.getElementById('lessonList');
    listContainer.innerHTML = '';

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

    // Render each level group
    const levelInfo = {
        beginner: { emoji: '🌱', title: 'Beginner' },
        intermediate: { emoji: '⚔️', title: 'Intermediate' },
        advanced: { emoji: '🏆', title: 'Advanced' }
    };

    Object.keys(levels).forEach(levelKey => {
        if (levels[levelKey].length === 0) return;

        // Add level header
        const levelHeader = document.createElement('div');
        levelHeader.className = 'lesson-level-header';
        levelHeader.textContent = `${levelInfo[levelKey].emoji} ${levelInfo[levelKey].title}`;
        listContainer.appendChild(levelHeader);

        // Add lessons in this level
        levels[levelKey].forEach(({ lesson, index }) => {
            const item = document.createElement('div');
            item.className = 'lesson-item';
            
            if (index === currentLessonIndex) {
                item.classList.add('active');
            }
            
            if (completedLessons.includes(lesson.id)) {
                item.classList.add('completed');
                // Add checkmark for completed lessons
                const checkmark = document.createElement('span');
                checkmark.className = 'lesson-checkmark';
                checkmark.textContent = '✓ ';
                item.appendChild(checkmark);
            }

            const title = document.createElement('span');
            title.textContent = lesson.title;
            item.appendChild(title);

            item.addEventListener('click', () => {
                currentLessonIndex = index;
                loadLesson(index);
                renderLessonList();
            });

            listContainer.appendChild(item);
        });
    });
}

// Load a specific lesson
function loadLesson(index) {
    if (index < 0 || index >= lessons.length) return;

    const lesson = lessons[index];
    currentLessonIndex = index;

    // Update title
    document.getElementById('lessonTitle').textContent = lesson.title;

    // Update explanation
    document.getElementById('lessonExplanation').innerHTML = lesson.explanation;

    // Setup fill-in-the-blanks
    setupFillInBlanks(lesson.fillInBlanks);

    // Setup practice section
    document.getElementById('practicePrompt').textContent = lesson.practice.prompt;
    document.getElementById('practiceEditor').value = '';
    document.getElementById('practiceOutput').classList.remove('show');
    document.getElementById('practiceOutput').innerHTML = '';

    // Update navigation buttons
    document.getElementById('prevLesson').disabled = index === 0;
    document.getElementById('nextLesson').disabled = index === lessons.length - 1;

    // Clear results
    document.getElementById('blanksResult').classList.remove('show');
}

// Setup fill-in-the-blanks section
function setupFillInBlanks(fillInBlanks) {
    const container = document.getElementById('fillInBlanks');
    container.innerHTML = '';

    const parts = fillInBlanks.template.split('___');
    
    parts.forEach((part, index) => {
        // Add text part
        const textSpan = document.createElement('span');
        textSpan.textContent = part;
        container.appendChild(textSpan);

        // Add input for blank (except after last part)
        if (index < parts.length - 1) {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'blank-input';
            input.dataset.index = index;
            container.appendChild(input);
        }
    });
}

// Check fill-in-the-blanks answers
function checkFillInBlanks() {
    const lesson = lessons[currentLessonIndex];
    const inputs = document.querySelectorAll('.blank-input');
    const resultDiv = document.getElementById('blanksResult');
    let allCorrect = true;

    inputs.forEach((input, index) => {
        const userAnswer = input.value.trim();
        const correctAnswer = lesson.fillInBlanks.blanks[index];
        
        let isCorrect = false;
        if (correctAnswer.caseSensitive) {
            isCorrect = userAnswer === correctAnswer.answer;
            if (!isCorrect && correctAnswer.alternatives) {
                isCorrect = correctAnswer.alternatives.includes(userAnswer);
            }
        } else {
            isCorrect = userAnswer.toLowerCase() === correctAnswer.answer.toLowerCase();
            if (!isCorrect && correctAnswer.alternatives) {
                isCorrect = correctAnswer.alternatives.some(alt => 
                    alt.toLowerCase() === userAnswer.toLowerCase()
                );
            }
        }

        if (isCorrect) {
            input.classList.remove('incorrect');
            input.classList.add('correct');
        } else {
            input.classList.remove('correct');
            input.classList.add('incorrect');
            allCorrect = false;
        }
    });

    resultDiv.classList.add('show');
    if (allCorrect) {
        resultDiv.className = 'result-message show success';
        resultDiv.textContent = '✅ Correct! Great job!';
    } else {
        resultDiv.className = 'result-message show error';
        resultDiv.textContent = '❌ Not quite right. Try again!';
    }
}

// Run practice code
function runPracticeCode() {
    const code = document.getElementById('practiceEditor').value;
    const outputDiv = document.getElementById('practiceOutput');
    const lesson = lessons[currentLessonIndex];

    if (!code.trim()) {
        outputDiv.innerHTML = '<div class="error-line">❌ Please write some code first!</div>';
        outputDiv.classList.add('show');
        return;
    }

    // Execute code and capture output
    let output = '';
    let error = null;
    
    const originalLog = console.log;
    const logs = [];
    console.log = function(...args) {
        logs.push(args.join(' '));
        originalLog.apply(console, args);
    };
    
    try {
        eval(code);
        output = logs.join('\n');
    } catch (e) {
        error = e.message;
    } finally {
        console.log = originalLog;
    }

    // Display output
    outputDiv.innerHTML = '';
    
    if (error) {
        outputDiv.innerHTML = `<div class="error-line">❌ Error: ${error}</div>`;
    } else {
        if (output) {
            outputDiv.innerHTML += `<div class="output-line">Output: ${output}</div>`;
        } else {
            outputDiv.innerHTML += `<div class="output-line">No output produced.</div>`;
        }

        // Check if solution is correct
        if (lesson.practice.solution(output, code)) {
            outputDiv.innerHTML += '<div class="success-line">✅ Perfect! You solved it!</div>';
            
            // Mark lesson as completed
            if (!completedLessons.includes(lesson.id)) {
                completedLessons.push(lesson.id);
                // Use save manager if available, otherwise use localStorage
                if (window.saveManager) {
                    window.saveManager.saveLessonCompletion(lesson.id);
                } else {
                    localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
                }
                renderLessonList();
            }
        } else {
            outputDiv.innerHTML += '<div class="error-line">❌ Not quite right. Check the requirements and try again.</div>';
        }
    }

    outputDiv.classList.add('show');
}

// Setup event listeners
function setupEventListeners() {
    // Back to game button
    document.getElementById('backToGame').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Check blanks button
    document.getElementById('checkBlanks').addEventListener('click', checkFillInBlanks);

    // Run practice button
    document.getElementById('runPractice').addEventListener('click', runPracticeCode);

    // Navigation buttons
    document.getElementById('prevLesson').addEventListener('click', () => {
        if (currentLessonIndex > 0) {
            loadLesson(currentLessonIndex - 1);
            renderLessonList();
        }
    });

    document.getElementById('nextLesson').addEventListener('click', () => {
        if (currentLessonIndex < lessons.length - 1) {
            loadLesson(currentLessonIndex + 1);
            renderLessonList();
        }
    });

    // Allow Ctrl+Enter to run practice code
    document.getElementById('practiceEditor').addEventListener('keydown', (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
            event.preventDefault();
            runPracticeCode();
        }
    });

    // Clear result when typing in blanks
    document.getElementById('fillInBlanks').addEventListener('input', () => {
        document.getElementById('blanksResult').classList.remove('show');
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initLessons);
