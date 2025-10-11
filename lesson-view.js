// Lesson data is now in lesson-data.js
// Reference to lessons array (loaded from lesson-data.js)
const lessons = window.lessonData || [];

// Lesson State
let currentLessonIndex = 0;
let currentQuestionIndex = 0;
let completedLessons = [];
let questionResults = {}; // Track results for each question

// Initialize lessons page
function initLessons() {
    // Check if lesson data is loaded
    if (!lessons || lessons.length === 0) {
        console.error('Lesson data not loaded properly');
        document.getElementById('lessonTitle').textContent = 'Error: Lessons Not Loaded';
        document.getElementById('lessonExplanation').innerHTML = 
            '<p style="color: #ff0000;">Failed to load lesson data. Please refresh the page.</p>';
        return;
    }
    
    // Load completed lessons from save manager or localStorage
    if (window.saveManager) {
        completedLessons = window.saveManager.getCompletedLessons();
    } else {
        const stored = localStorage.getItem('completedLessons');
        if (stored) {
            completedLessons = JSON.parse(stored);
        }
    }

    // Get lesson ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get('id');
    const objective = urlParams.get('objective'); // Legacy support
    
    // Find lesson by ID or objective
    let lessonIndex = -1;
    if (lessonId) {
        lessonIndex = lessons.findIndex(l => l.id === lessonId);
    } else if (objective) {
        lessonIndex = lessons.findIndex(l => l.objective === objective);
    }
    
    // If no valid lesson found, redirect to lesson selection
    if (lessonIndex === -1) {
        window.location.href = 'lesson-select.html';
        return;
    }
    
    currentLessonIndex = lessonIndex;

    // Load saved question results for this lesson
    const lesson = lessons[lessonIndex];
    if (window.saveManager) {
        questionResults = window.saveManager.getQuestionResults(lesson.id);
    } else {
        try {
            const allResults = localStorage.getItem('lessonQuestionResults');
            if (allResults) {
                const parsed = JSON.parse(allResults);
                questionResults = parsed[lesson.id] || {};
            }
        } catch (error) {
            console.error('Failed to load question results:', error);
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
                // Navigate to this lesson
                window.location.href = `lesson-view.html?id=${lesson.id}`;
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
    currentQuestionIndex = 0; // Reset to first question
    
    // Load saved question results for this lesson instead of resetting
    if (window.saveManager) {
        questionResults = window.saveManager.getQuestionResults(lesson.id);
    } else {
        try {
            const allResults = localStorage.getItem('lessonQuestionResults');
            if (allResults) {
                const parsed = JSON.parse(allResults);
                questionResults = parsed[lesson.id] || {};
            } else {
                questionResults = {};
            }
        } catch (error) {
            console.error('Failed to load question results:', error);
            questionResults = {};
        }
    }

    // Update title
    document.getElementById('lessonTitle').textContent = lesson.title;

    // Update explanation
    document.getElementById('lessonExplanation').innerHTML = lesson.explanation;

    // Load first question
    loadQuestion(0);

    // Update navigation buttons
    document.getElementById('prevLesson').disabled = index === 0;
    document.getElementById('nextLesson').disabled = index === lessons.length - 1;
}

// Load a specific question
function loadQuestion(questionIndex) {
    const lesson = lessons[currentLessonIndex];
    
    // Handle missing or empty questions array
    if (!lesson.questions || lesson.questions.length === 0) {
        document.getElementById('questionContainer').innerHTML = 
            '<div class="no-questions-message">📝 Questions for this lesson are coming soon!</div>';
        document.getElementById('questionCounter').textContent = 'No questions available yet';
        document.getElementById('prevQuestion').disabled = true;
        document.getElementById('nextQuestion').disabled = true;
        document.getElementById('checkAnswer').style.display = 'none';
        return;
    }
    
    // Handle invalid question index
    if (questionIndex < 0 || questionIndex >= lesson.questions.length) return;

    // Show check answer button
    document.getElementById('checkAnswer').style.display = 'block';
    
    currentQuestionIndex = questionIndex;
    const question = lesson.questions[questionIndex];

    // Update question counter
    document.getElementById('questionCounter').textContent = 
        `Question ${questionIndex + 1} of ${lesson.questions.length}`;

    // Update question navigation buttons
    document.getElementById('prevQuestion').disabled = questionIndex === 0;
    document.getElementById('nextQuestion').disabled = questionIndex === lesson.questions.length - 1;

    // Clear previous content
    document.getElementById('questionContainer').innerHTML = '';
    document.getElementById('questionResult').classList.remove('show');
    document.getElementById('questionResult').className = 'result-message';

    // Render question based on type
    if (question.type === 'multiple-choice') {
        renderMultipleChoice(question);
    } else if (question.type === 'fill-in-blank') {
        renderFillInBlank(question);
    } else if (question.type === 'code') {
        renderCodeQuestion(question);
    }

    // Show previous result if exists
    if (questionResults[question.id]) {
        showQuestionResult(questionResults[question.id]);
    }
}

// Render multiple choice question
function renderMultipleChoice(question) {
    const container = document.getElementById('questionContainer');
    
    const questionText = document.createElement('div');
    questionText.className = 'question-text';
    questionText.textContent = question.question;
    container.appendChild(questionText);

    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'options-container';

    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option-item';
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'answer';
        radio.value = index;
        radio.id = `option-${index}`;
        
        const label = document.createElement('label');
        label.htmlFor = `option-${index}`;
        label.textContent = option;
        
        optionDiv.appendChild(radio);
        optionDiv.appendChild(label);
        optionsContainer.appendChild(optionDiv);

        // Add click handler to label for better UX
        label.addEventListener('click', () => {
            radio.checked = true;
        });
    });

    container.appendChild(optionsContainer);
}

// Render fill-in-the-blank question
function renderFillInBlank(question) {
    const container = document.getElementById('questionContainer');
    
    const questionText = document.createElement('div');
    questionText.className = 'question-text';
    questionText.textContent = question.question;
    container.appendChild(questionText);

    const blankContainer = document.createElement('div');
    blankContainer.className = 'fill-in-blanks';
    
    const parts = question.template.split('___');
    
    parts.forEach((part, index) => {
        const textSpan = document.createElement('span');
        textSpan.textContent = part;
        blankContainer.appendChild(textSpan);

        if (index < parts.length - 1) {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'blank-input';
            input.dataset.index = index;
            blankContainer.appendChild(input);
        }
    });

    container.appendChild(blankContainer);
}

// Render code question
function renderCodeQuestion(question) {
    const container = document.getElementById('questionContainer');
    
    const questionText = document.createElement('div');
    questionText.className = 'question-text';
    questionText.textContent = question.question;
    container.appendChild(questionText);

    const editor = document.createElement('textarea');
    editor.className = 'practice-editor';
    editor.id = 'codeEditor';
    editor.placeholder = '// Write your JavaScript code here...';
    container.appendChild(editor);

    const output = document.createElement('div');
    output.className = 'practice-output';
    output.id = 'codeOutput';
    container.appendChild(output);
}

// Check current question answer
function checkAnswer() {
    const lesson = lessons[currentLessonIndex];
    const question = lesson.questions[currentQuestionIndex];
    let isCorrect = false;
    let userAnswer = null;

    if (question.type === 'multiple-choice') {
        const selected = document.querySelector('input[name="answer"]:checked');
        if (!selected) {
            showFeedback('Please select an answer first!', 'error');
            return;
        }
        userAnswer = parseInt(selected.value);
        isCorrect = userAnswer === question.correctAnswer;
    } else if (question.type === 'fill-in-blank') {
        const inputs = document.querySelectorAll('.blank-input');
        isCorrect = true;
        
        inputs.forEach((input, index) => {
            const correctBlank = question.blanks[index];
            const userValue = input.value.trim();
            
            let isBlankCorrect = false;
            if (correctBlank.caseSensitive) {
                isBlankCorrect = userValue === correctBlank.answer;
                if (!isBlankCorrect && correctBlank.alternatives) {
                    isBlankCorrect = correctBlank.alternatives.includes(userValue);
                }
            } else {
                isBlankCorrect = userValue.toLowerCase() === correctBlank.answer.toLowerCase();
                if (!isBlankCorrect && correctBlank.alternatives) {
                    isBlankCorrect = correctBlank.alternatives.some(alt => 
                        alt.toLowerCase() === userValue.toLowerCase()
                    );
                }
            }

            if (isBlankCorrect) {
                input.classList.remove('incorrect');
                input.classList.add('correct');
            } else {
                input.classList.remove('correct');
                input.classList.add('incorrect');
                isCorrect = false;
            }
        });
    } else if (question.type === 'code') {
        const code = document.getElementById('codeEditor').value;
        if (!code.trim()) {
            showFeedback('Please write some code first!', 'error');
            return;
        }

        // Execute code and check solution
        const result = executeCode(code);
        if (result.error) {
            showFeedback(`❌ Error: ${result.error}`, 'error');
            return;
        }
        
        isCorrect = question.solution(result.output, code);
        
        // Show output
        const outputDiv = document.getElementById('codeOutput');
        outputDiv.innerHTML = result.output ? 
            `<div class="output-line">Output: ${result.output}</div>` : 
            `<div class="output-line">No output produced.</div>`;
        outputDiv.classList.add('show');
    }

    // Store result
    questionResults[question.id] = { correct: isCorrect, explanation: question.explanation };

    // Save question results to localStorage
    if (window.saveManager) {
        window.saveManager.saveQuestionResults(lesson.id, questionResults);
    } else {
        try {
            const allResults = localStorage.getItem('lessonQuestionResults');
            const parsed = allResults ? JSON.parse(allResults) : {};
            parsed[lesson.id] = questionResults;
            localStorage.setItem('lessonQuestionResults', JSON.stringify(parsed));
        } catch (error) {
            console.error('Failed to save question results:', error);
        }
    }

    // Show result
    showQuestionResult({ correct: isCorrect, explanation: question.explanation });

    // Mark lesson complete if all questions answered correctly
    checkLessonCompletion();
}

// Execute code safely
function executeCode(code) {
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

    return { output, error };
}

// Show question result
function showQuestionResult(result) {
    const resultDiv = document.getElementById('questionResult');
    resultDiv.classList.add('show');
    
    if (result.correct) {
        resultDiv.className = 'result-message show success';
        resultDiv.innerHTML = `✅ Correct! Great job!<br><small>${result.explanation}</small>`;
    } else {
        resultDiv.className = 'result-message show error';
        resultDiv.innerHTML = `❌ Not quite right. ${result.explanation}<br><small>Try again!</small>`;
    }
}

// Show temporary feedback
function showFeedback(message, type) {
    const resultDiv = document.getElementById('questionResult');
    resultDiv.classList.add('show');
    resultDiv.className = `result-message show ${type}`;
    resultDiv.textContent = message;
}

// Check if lesson is complete
function checkLessonCompletion() {
    const lesson = lessons[currentLessonIndex];
    const allCorrect = lesson.questions.every(q => 
        questionResults[q.id] && questionResults[q.id].correct
    );

    if (allCorrect && !completedLessons.includes(lesson.id)) {
        completedLessons.push(lesson.id);
        if (window.saveManager) {
            window.saveManager.saveLessonCompletion(lesson.id);
        } else {
            localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
        }
        renderLessonList();
        
        // Show completion message
        setTimeout(() => {
            showFeedback('🎉 Lesson Complete! All questions answered correctly!', 'success');
        }, 500);
    }
}

// Navigate to previous question
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        loadQuestion(currentQuestionIndex - 1);
    }
}

// Navigate to next question
function nextQuestion() {
    const lesson = lessons[currentLessonIndex];
    if (currentQuestionIndex < lesson.questions.length - 1) {
        loadQuestion(currentQuestionIndex + 1);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Back to lessons button
    document.getElementById('backToLessons').addEventListener('click', () => {
        window.location.href = 'lesson-select.html';
    });

    // Check answer button
    document.getElementById('checkAnswer').addEventListener('click', checkAnswer);

    // Question navigation
    document.getElementById('prevQuestion').addEventListener('click', previousQuestion);
    document.getElementById('nextQuestion').addEventListener('click', nextQuestion);

    // Lesson navigation buttons
    document.getElementById('prevLesson').addEventListener('click', () => {
        if (currentLessonIndex > 0) {
            const prevLesson = lessons[currentLessonIndex - 1];
            window.location.href = `lesson-view.html?id=${prevLesson.id}`;
        }
    });

    document.getElementById('nextLesson').addEventListener('click', () => {
        if (currentLessonIndex < lessons.length - 1) {
            const nextLesson = lessons[currentLessonIndex + 1];
            window.location.href = `lesson-view.html?id=${nextLesson.id}`;
        }
    });

    // Allow Ctrl+Enter to check answer/run code
    document.getElementById('questionContainer').addEventListener('keydown', (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
            event.preventDefault();
            checkAnswer();
        }
    });

    // Clear result when interacting with question
    document.getElementById('questionContainer').addEventListener('input', () => {
        document.getElementById('questionResult').classList.remove('show');
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initLessons);
