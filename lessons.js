// Lesson Definitions
const lessons = [
    {
        id: 'hello_world',
        title: 'Lesson 1: Introduction to console.log()',
        objective: 'hello_world',
        explanation: `
            <p>Welcome to your first JavaScript lesson! 🎉</p>
            <p><code>console.log()</code> is one of the most important tools in JavaScript. It prints messages to the browser's console, which helps you:</p>
            <ul>
                <li>See what your code is doing</li>
                <li>Debug problems in your code</li>
                <li>Test if your code works correctly</li>
            </ul>
            <p><strong>Syntax:</strong></p>
            <pre><code>console.log("Your message here");</code></pre>
            <p>The text you want to print goes inside quotes (either "double" or 'single' quotes).</p>
            <p><strong>Example:</strong></p>
            <pre><code>console.log("Hello, World!");  // Prints: Hello, World!</code></pre>
        `,
        fillInBlanks: {
            template: 'console.___("Hello, Dungeon!");',
            blanks: [
                { answer: 'log', caseSensitive: true }
            ]
        },
        practice: {
            prompt: 'Now it\'s your turn! Write code to print "Hello, Dungeon!" to the console.',
            solution: (output) => output.includes('Hello, Dungeon!')
        }
    },
    {
        id: 'variables',
        title: 'Lesson 2: Variables - Storing Data',
        objective: 'variable_door',
        explanation: `
            <p>Variables are like labeled boxes that store data. You can put information in them and use it later! 📦</p>
            <p>In JavaScript, we create variables using keywords like <code>let</code>, <code>const</code>, or <code>var</code>:</p>
            <ul>
                <li><code>let</code> - for values that can change</li>
                <li><code>const</code> - for values that stay the same</li>
            </ul>
            <p><strong>Syntax:</strong></p>
            <pre><code>let variableName = value;</code></pre>
            <p><strong>Examples:</strong></p>
            <pre><code>let playerName = "Carl";
let health = 100;
let key = 42;

console.log(playerName);  // Prints: Carl
console.log(health);      // Prints: 100</code></pre>
            <p>Variables can store numbers, text (strings), and more!</p>
        `,
        fillInBlanks: {
            template: '___ key = 42;',
            blanks: [
                { answer: 'let', alternatives: ['const', 'var'], caseSensitive: true }
            ]
        },
        practice: {
            prompt: 'Create a variable called "key" with the value 42, then print it using console.log().',
            solution: (output, code) => code.includes('key') && code.includes('42')
        }
    },
    {
        id: 'loops',
        title: 'Lesson 3: For Loops - Repeating Actions',
        objective: 'loop_attack',
        explanation: `
            <p>Loops let you repeat code multiple times without writing it over and over! 🔁</p>
            <p>The <code>for</code> loop is perfect when you know how many times you want to repeat something.</p>
            <p><strong>Syntax:</strong></p>
            <pre><code>for (let i = 0; i < 5; i++) {
    // Code to repeat goes here
}</code></pre>
            <p>Let's break it down:</p>
            <ul>
                <li><code>let i = 0</code> - Start at 0</li>
                <li><code>i < 5</code> - Keep going while i is less than 5</li>
                <li><code>i++</code> - Add 1 to i after each loop</li>
            </ul>
            <p><strong>Example:</strong></p>
            <pre><code>for (let i = 0; i < 3; i++) {
    console.log("Attack!");
}
// Prints "Attack!" three times</code></pre>
        `,
        fillInBlanks: {
            template: 'for (let i = 0; i ___ 5; i___) { }',
            blanks: [
                { answer: '<', caseSensitive: true },
                { answer: '++', caseSensitive: true }
            ]
        },
        practice: {
            prompt: 'Use a for loop to print "Attack!" exactly 5 times.',
            solution: (output) => {
                const attacks = (output.match(/Attack!/g) || []).length;
                return attacks === 5;
            }
        }
    },
    {
        id: 'arrays',
        title: 'Lesson 4: Arrays - Lists of Data',
        objective: 'array_puzzle',
        explanation: `
            <p>Arrays are like lists that can hold multiple values in a single variable! 📝</p>
            <p>They're perfect for storing collections of related data.</p>
            <p><strong>Syntax:</strong></p>
            <pre><code>let arrayName = [item1, item2, item3];</code></pre>
            <p><strong>Examples:</strong></p>
            <pre><code>let numbers = [1, 2, 3, 4, 5];
let weapons = ["sword", "bow", "staff"];

console.log(numbers[0]);  // Prints: 1 (first item)
console.log(weapons[1]);  // Prints: bow (second item)</code></pre>
            <p>Arrays are zero-indexed (first item is at position 0).</p>
            <p><strong>Array Methods:</strong></p>
            <pre><code>// Sum all numbers in an array
let sum = 0;
for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
}
console.log(sum);  // Prints: 15</code></pre>
        `,
        fillInBlanks: {
            template: 'let numbers = [1, 2, 3, 4, 5];',
            blanks: [
                { answer: '[', caseSensitive: true },
                { answer: ']', caseSensitive: true }
            ]
        },
        practice: {
            prompt: 'Create an array with numbers [1, 2, 3, 4, 5] and calculate their sum. Print the sum.',
            solution: (output, code) => {
                return code.includes('[1, 2, 3, 4, 5]') && 
                       (output.includes('15') || code.includes('reduce'));
            }
        }
    },
    {
        id: 'functions',
        title: 'Lesson 5: Functions - Reusable Code',
        objective: 'function_treasure',
        explanation: `
            <p>Functions are reusable blocks of code that perform specific tasks! ⚡</p>
            <p>Instead of writing the same code multiple times, you write it once in a function and call it whenever needed.</p>
            <p><strong>Syntax:</strong></p>
            <pre><code>function functionName() {
    // Code to run
    return result;
}</code></pre>
            <p><strong>Examples:</strong></p>
            <pre><code>function greet() {
    return "Hello, adventurer!";
}

function add(a, b) {
    return a + b;
}

console.log(greet());      // Prints: Hello, adventurer!
console.log(add(5, 3));    // Prints: 8</code></pre>
            <p>Functions can take inputs (parameters) and give back outputs (return values).</p>
        `,
        fillInBlanks: {
            template: '___ openChest() { ___ "Treasure found!"; }',
            blanks: [
                { answer: 'function', caseSensitive: true },
                { answer: 'return', caseSensitive: true }
            ]
        },
        practice: {
            prompt: 'Write a function called "openChest" that returns "Treasure found!", then call it and print the result.',
            solution: (output, code) => {
                return code.includes('function') && 
                       code.includes('openChest') && 
                       (output.includes('Treasure found!') || code.includes('return'));
            }
        }
    },
    {
        id: 'objects',
        title: 'Lesson 6: Objects - Structured Data',
        objective: 'dragon_defeat',
        explanation: `
            <p>Objects let you group related data together using key-value pairs! 🗝️</p>
            <p>They're perfect for representing real-world things with multiple properties.</p>
            <p><strong>Syntax:</strong></p>
            <pre><code>let objectName = {
    property1: value1,
    property2: value2
};</code></pre>
            <p><strong>Example:</strong></p>
            <pre><code>const dragon = {
    name: "Smaug",
    health: 100,
    defeated: false
};

console.log(dragon.name);      // Prints: Smaug
console.log(dragon.health);    // Prints: 100

// Update properties
dragon.defeated = true;
dragon.health = 0;</code></pre>
            <p>Use dot notation (<code>object.property</code>) to access or change values.</p>
        `,
        fillInBlanks: {
            template: 'const dragon = { name: "Dragon", health: 0, defeated: ___ };',
            blanks: [
                { answer: 'true', caseSensitive: true }
            ]
        },
        practice: {
            prompt: 'Create an object called "dragon" with properties: name (any string), health (set to 0), and defeated (set to true). Then print the dragon object.',
            solution: (output, code) => {
                return code.includes('dragon') && 
                       code.includes('defeated') && 
                       code.includes('true');
            }
        }
    }
];

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

    lessons.forEach((lesson, index) => {
        const item = document.createElement('div');
        item.className = 'lesson-item';
        
        if (index === currentLessonIndex) {
            item.classList.add('active');
        }
        
        if (completedLessons.includes(lesson.id)) {
            item.classList.add('completed');
        }

        item.textContent = lesson.title;
        item.addEventListener('click', () => {
            currentLessonIndex = index;
            loadLesson(index);
            renderLessonList();
        });

        listContainer.appendChild(item);
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
