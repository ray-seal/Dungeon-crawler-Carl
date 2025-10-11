// Lesson Data - Comprehensive JavaScript curriculum
// Organized by difficulty level: Beginner, Intermediate, Advanced

const lessonData = [
    // === BEGINNER LEVEL ===
    {
        id: 'hello_world',
        level: 'beginner',
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
        questions: [
            {
                id: 1,
                type: 'multiple-choice',
                question: 'What does console.log() do?',
                options: [
                    'Prints messages to the browser console',
                    'Creates a new variable',
                    'Deletes code from your program',
                    'Closes the browser window'
                ],
                correctAnswer: 0,
                explanation: 'console.log() prints messages to the browser\'s console, which helps you debug and test your code.'
            },
            {
                id: 2,
                type: 'multiple-choice',
                question: 'Which quotes can you use with console.log()?',
                options: [
                    'Only double quotes (")',
                    'Only single quotes (\')',
                    'Both single and double quotes',
                    'No quotes are needed'
                ],
                correctAnswer: 2,
                explanation: 'JavaScript allows both single (\') and double (") quotes for strings.'
            },
            {
                id: 3,
                type: 'fill-in-blank',
                question: 'Complete the code to print "Hello, Dungeon!" to the console:',
                template: 'console.___("Hello, Dungeon!");',
                blanks: [
                    { answer: 'log', caseSensitive: true }
                ],
                explanation: 'The correct method is console.log() which outputs to the console.'
            },
            {
                id: 4,
                type: 'fill-in-blank',
                question: 'Fill in the missing quotes:',
                template: 'console.log(___Hello___);',
                blanks: [
                    { answer: '"', alternatives: ["'"], caseSensitive: true },
                    { answer: '"', alternatives: ["'"], caseSensitive: true }
                ],
                explanation: 'Strings must be wrapped in matching quotes (either " or \').'
            },
            {
                id: 5,
                type: 'multiple-choice',
                question: 'What will console.log("JavaScript") print?',
                options: [
                    'JavaScript',
                    '"JavaScript"',
                    'console.log',
                    'Nothing'
                ],
                correctAnswer: 0,
                explanation: 'console.log() prints the text without the quotes.'
            },
            {
                id: 6,
                type: 'code',
                question: 'Write code to print "Welcome to the dungeon!" to the console.',
                solution: (output) => output.includes('Welcome to the dungeon!'),
                explanation: 'Use console.log("Welcome to the dungeon!"); to print the message.'
            },
            {
                id: 7,
                type: 'code',
                question: 'Write code to print your name to the console (replace "YourName" with your actual name).',
                solution: (output, code) => {
                    return code.includes('console.log') && output.length > 0;
                },
                explanation: 'Use console.log("YourName"); replacing YourName with your actual name.'
            },
            {
                id: 8,
                type: 'multiple-choice',
                question: 'Can you print multiple things with console.log()?',
                options: [
                    'No, only one thing at a time',
                    'Yes, separated by commas',
                    'Yes, but only numbers',
                    'Only with special permission'
                ],
                correctAnswer: 1,
                explanation: 'console.log() can print multiple items separated by commas: console.log("Hello", "World");'
            }
        ]
    },
    {
        id: 'comments',
        level: 'beginner',
        title: 'Lesson 2: Comments - Documenting Your Code',
        objective: 'comments',
        explanation: `
            <p>Comments are notes you write in your code that JavaScript ignores! 📝</p>
            <p>They help you (and others) understand what your code does.</p>
            <p><strong>Single-line comments:</strong></p>
            <pre><code>// This is a single-line comment
console.log("Hello!");  // This comment explains the code</code></pre>
            <p><strong>Multi-line comments:</strong></p>
            <pre><code>/* This is a multi-line comment
   It can span multiple lines
   Use it for longer explanations */
console.log("Hello!");</code></pre>
            <p>Comments are essential for:</p>
            <ul>
                <li>Explaining complex code</li>
                <li>Leaving notes for yourself or teammates</li>
                <li>Temporarily disabling code during testing</li>
            </ul>
        `,
        questions: [
            {
                id: 1,
                type: 'multiple-choice',
                question: 'What do comments do in JavaScript?',
                options: [
                    'They execute code faster',
                    'They are notes that JavaScript ignores',
                    'They delete variables',
                    'They print to the console'
                ],
                correctAnswer: 1,
                explanation: 'Comments are ignored by JavaScript and are only for human readers.'
            },
            {
                id: 2,
                type: 'fill-in-blank',
                question: 'Complete this single-line comment:',
                template: '___ This is a comment',
                blanks: [
                    { answer: '//', caseSensitive: true }
                ],
                explanation: 'Single-line comments start with //'
            },
            {
                id: 3,
                type: 'multiple-choice',
                question: 'How do you start a multi-line comment?',
                options: [
                    '//',
                    '/*',
                    '##',
                    '--'
                ],
                correctAnswer: 1,
                explanation: 'Multi-line comments start with /* and end with */'
            },
            {
                id: 4,
                type: 'fill-in-blank',
                question: 'Complete the multi-line comment:',
                template: '___ Comment here ___',
                blanks: [
                    { answer: '/*', caseSensitive: true },
                    { answer: '*/', caseSensitive: true }
                ],
                explanation: 'Multi-line comments use /* to start and */ to end.'
            },
            {
                id: 5,
                type: 'code',
                question: 'Write a comment saying "My first program" and then print "Learning JavaScript!"',
                solution: (output, code) => {
                    return code.includes('//') && 
                           code.includes('My first program') && 
                           output.includes('Learning JavaScript!');
                },
                explanation: 'Use // My first program followed by console.log("Learning JavaScript!");'
            },
            {
                id: 6,
                type: 'multiple-choice',
                question: 'Why are comments useful?',
                options: [
                    'They make code run faster',
                    'They help explain what code does',
                    'They are required in JavaScript',
                    'They fix bugs automatically'
                ],
                correctAnswer: 1,
                explanation: 'Comments explain code to humans but don\'t affect execution.'
            },
            {
                id: 7,
                type: 'code',
                question: 'Write a multi-line comment explaining what console.log does, then use console.log to print "Comments are useful!"',
                solution: (output, code) => {
                    return code.includes('/*') && 
                           code.includes('*/') && 
                           output.includes('Comments are useful!');
                },
                explanation: 'Use /* multi-line comment */ followed by console.log statement.'
            }
        ]
    },
    {
        id: 'variables',
        level: 'beginner',
        title: 'Lesson 3: Variables - Storing Data',
        objective: 'variable_door',
        explanation: `
            <p>Variables are like labeled boxes that store data. You can put information in them and use it later! 📦</p>
            <p>In JavaScript, we create variables using keywords like <code>let</code>, <code>const</code>, or <code>var</code>:</p>
            <ul>
                <li><code>let</code> - for values that can change</li>
                <li><code>const</code> - for values that stay the same</li>
            </ul>
            <p><strong>Syntax:</strong></p>
            <pre><code>let variableName = value;
const constantName = value;</code></pre>
            <p><strong>Examples:</strong></p>
            <pre><code>let playerName = "Carl";
let health = 100;
const MAX_LEVEL = 99;

console.log(playerName);  // Prints: Carl
console.log(health);      // Prints: 100</code></pre>
            <p>Variables can store numbers, text (strings), and more!</p>
        `,
        questions: [
            {
                id: 1,
                type: 'multiple-choice',
                question: 'Which keyword creates a variable that can change?',
                options: ['const', 'let', 'static', 'final'],
                correctAnswer: 1,
                explanation: 'let creates variables that can be reassigned new values.'
            },
            {
                id: 2,
                type: 'multiple-choice',
                question: 'Which keyword creates a variable that cannot change?',
                options: ['let', 'var', 'const', 'fixed'],
                correctAnswer: 2,
                explanation: 'const creates constants that cannot be reassigned.'
            },
            {
                id: 3,
                type: 'fill-in-blank',
                question: 'Create a variable called "key" with value 42:',
                template: '___ key = 42;',
                blanks: [
                    { answer: 'let', alternatives: ['const', 'var'], caseSensitive: true }
                ],
                explanation: 'Use let, const, or var to declare a variable.'
            },
            {
                id: 4,
                type: 'fill-in-blank',
                question: 'Store the text "Carl" in a variable named "name":',
                template: 'let name = ___;',
                blanks: [
                    { answer: '"Carl"', alternatives: ["'Carl'"], caseSensitive: false }
                ],
                explanation: 'Strings must be wrapped in quotes.'
            },
            {
                id: 5,
                type: 'code',
                question: 'Create a variable called "key" with value 42, then print it.',
                solution: (output, code) => code.includes('key') && code.includes('42') && output.includes('42'),
                explanation: 'Use let key = 42; then console.log(key);'
            },
            {
                id: 6,
                type: 'multiple-choice',
                question: 'What does this code print? let x = 10; console.log(x);',
                options: ['x', '10', 'let', 'undefined'],
                correctAnswer: 1,
                explanation: 'console.log(x) prints the value stored in x, which is 10.'
            },
            {
                id: 7,
                type: 'code',
                question: 'Create two variables: "health" with value 100 and "name" with your name. Print both.',
                solution: (output, code) => {
                    return code.includes('health') && 
                           code.includes('name') && 
                           code.includes('100') &&
                           output.includes('100');
                },
                explanation: 'Create two variables and use console.log for each.'
            },
            {
                id: 8,
                type: 'multiple-choice',
                question: 'Can you change the value of a const variable?',
                options: ['Yes, anytime', 'No, never', 'Only once', 'Only numbers'],
                correctAnswer: 1,
                explanation: 'const variables cannot be reassigned once set.'
            }
        ]
    },
    {
        id: 'data_types',
        level: 'beginner',
        title: 'Lesson 4: Data Types - Numbers, Strings, Booleans',
        objective: 'data_types',
        explanation: `
            <p>JavaScript has different types of data you can work with! 🎲</p>
            <p><strong>Numbers:</strong> For math and counting</p>
            <pre><code>let score = 100;
let price = 19.99;</code></pre>
            <p><strong>Strings:</strong> For text (use quotes)</p>
            <pre><code>let name = "Carl";
let message = 'Welcome to the dungeon!';</code></pre>
            <p><strong>Booleans:</strong> For true/false values</p>
            <pre><code>let isDoorLocked = true;
let hasKey = false;</code></pre>
            <p>You can check the type using <code>typeof</code>:</p>
            <pre><code>console.log(typeof 42);        // "number"
console.log(typeof "hello");   // "string"
console.log(typeof true);      // "boolean"</code></pre>
        `,
        questions: [
            {
                id: 1,
                type: 'multiple-choice',
                question: 'Which data type is "Hello"?',
                options: ['Number', 'String', 'Boolean', 'Variable'],
                correctAnswer: 1,
                explanation: 'Text in quotes is a string data type.'
            },
            {
                id: 2,
                type: 'multiple-choice',
                question: 'Which data type is 42?',
                options: ['String', 'Boolean', 'Number', 'Text'],
                correctAnswer: 2,
                explanation: '42 is a number data type.'
            },
            {
                id: 3,
                type: 'multiple-choice',
                question: 'What are the only two boolean values?',
                options: ['yes and no', 'on and off', 'true and false', '1 and 0'],
                correctAnswer: 2,
                explanation: 'Booleans can only be true or false.'
            },
            {
                id: 4,
                type: 'fill-in-blank',
                question: 'Create a boolean variable:',
                template: 'let isAlive = ___;',
                blanks: [
                    { answer: 'true', alternatives: ['false'], caseSensitive: true }
                ],
                explanation: 'Booleans are true or false (lowercase, no quotes).'
            },
            {
                id: 5,
                type: 'code',
                question: 'Create three variables: health (100), name (any string), and alive (true). Print all three.',
                solution: (output, code) => {
                    return code.includes('health') && 
                           code.includes('name') && 
                           code.includes('alive') &&
                           code.includes('100') &&
                           code.includes('true');
                },
                explanation: 'Create three variables with different data types.'
            },
            {
                id: 6,
                type: 'multiple-choice',
                question: 'What does typeof "JavaScript" return?',
                options: ['"text"', '"string"', '"word"', '"JavaScript"'],
                correctAnswer: 1,
                explanation: 'typeof returns "string" for text values.'
            },
            {
                id: 7,
                type: 'fill-in-blank',
                question: 'Store a number in a variable:',
                template: 'let score = ___;',
                blanks: [
                    { answer: '100', alternatives: ['0', '50', '99'], caseSensitive: false }
                ],
                explanation: 'Numbers don\'t need quotes.'
            },
            {
                id: 8,
                type: 'code',
                question: 'Use typeof to check the type of the number 123 and print the result.',
                solution: (output, code) => {
                    return code.includes('typeof') && 
                           output.includes('number');
                },
                explanation: 'Use console.log(typeof 123); to see "number".'
            }
        ]
    },
    {
        id: 'math_operators',
        level: 'beginner',
        title: 'Lesson 5: Math Operators - Arithmetic',
        objective: 'math_operators',
        explanation: `
            <p>JavaScript can do math! Use operators to perform calculations. 🧮</p>
            <p><strong>Basic operators:</strong></p>
            <ul>
                <li><code>+</code> Addition</li>
                <li><code>-</code> Subtraction</li>
                <li><code>*</code> Multiplication</li>
                <li><code>/</code> Division</li>
                <li><code>%</code> Modulo (remainder)</li>
            </ul>
            <p><strong>Examples:</strong></p>
            <pre><code>let damage = 10 + 5;     // 15
let health = 100 - 25;   // 75
let total = 5 * 3;       // 15
let half = 10 / 2;       // 5
let remainder = 10 % 3;  // 1

console.log(damage);     // Prints: 15</code></pre>
            <p>You can also use <code>++</code> to add 1 and <code>--</code> to subtract 1:</p>
            <pre><code>let count = 5;
count++;  // Now count is 6
count--;  // Now count is 5 again</code></pre>
        `,
        questions: [
            {
                id: 1,
                type: 'multiple-choice',
                question: 'What operator is used for multiplication?',
                options: ['x', '*', 'X', 'mult'],
                correctAnswer: 1,
                explanation: 'The * symbol is used for multiplication in JavaScript.'
            },
            {
                id: 2,
                type: 'multiple-choice',
                question: 'What does 10 + 5 equal?',
                options: ['105', '15', '50', '5'],
                correctAnswer: 1,
                explanation: 'Addition: 10 + 5 = 15'
            },
            {
                id: 3,
                type: 'fill-in-blank',
                question: 'Complete the multiplication:',
                template: 'let result = 10 ___ 5;  // equals 50',
                blanks: [
                    { answer: '*', caseSensitive: true }
                ],
                explanation: 'Use * for multiplication: 10 * 5 = 50'
            },
            {
                id: 4,
                type: 'multiple-choice',
                question: 'What does the % operator do?',
                options: [
                    'Calculates percentage',
                    'Returns the remainder',
                    'Divides by 100',
                    'Multiplies'
                ],
                correctAnswer: 1,
                explanation: 'The % (modulo) operator returns the remainder of division.'
            },
            {
                id: 5,
                type: 'code',
                question: 'Calculate (20 + 5) * 2 and store it in "damage". Print the result.',
                solution: (output, code) => {
                    return code.includes('damage') && 
                           (output.includes('50') || code.includes('(20 + 5) * 2') || code.includes('25 * 2'));
                },
                explanation: 'First add 20 + 5 = 25, then multiply by 2 to get 50.'
            },
            {
                id: 6,
                type: 'fill-in-blank',
                question: 'What operation gives 3? (Hint: 10 divided by something)',
                template: 'let result = 10 ___ 3;  // equals 3 remainder',
                blanks: [
                    { answer: '%', caseSensitive: true }
                ],
                explanation: '10 % 3 gives remainder 1, but 10 / 3 gives 3.333...'
            },
            {
                id: 7,
                type: 'code',
                question: 'Create a variable "count" with value 5. Increase it by 1 using ++, then print it.',
                solution: (output, code) => {
                    return code.includes('count') && 
                           code.includes('++') &&
                           output.includes('6');
                },
                explanation: 'Use count++; to increment by 1.'
            },
            {
                id: 8,
                type: 'multiple-choice',
                question: 'What does 100 - 25 equal?',
                options: ['125', '75', '25', '100'],
                correctAnswer: 1,
                explanation: 'Subtraction: 100 - 25 = 75'
            }
        ]
    },
    {
        id: 'string_methods',
        level: 'beginner',
        title: 'Lesson 6: String Methods - Working with Text',
        objective: 'string_methods',
        explanation: `
            <p>Strings have special methods to manipulate text! 📜</p>
            <p><strong>Common string methods:</strong></p>
            <pre><code>let message = "Hello, Dungeon!";

// Length of string
console.log(message.length);        // 15

// Uppercase and lowercase
console.log(message.toUpperCase()); // "HELLO, DUNGEON!"
console.log(message.toLowerCase()); // "hello, dungeon!"

// Get a character at position
console.log(message[0]);            // "H"

// Check if string includes something
console.log(message.includes("Dungeon"));  // true</code></pre>
            <p><strong>String concatenation (combining):</strong></p>
            <pre><code>let firstName = "Carl";
let lastName = "Smith";
let fullName = firstName + " " + lastName;
console.log(fullName);  // "Carl Smith"</code></pre>
        `,
        questions: [
            {
                id: 1,
                type: 'multiple-choice',
                question: 'Which method converts text to uppercase?',
                options: ['toUpper()', 'toUpperCase()', 'uppercase()', 'UPPER()'],
                correctAnswer: 1,
                explanation: 'Use .toUpperCase() to convert strings to uppercase.'
            },
            {
                id: 2,
                type: 'fill-in-blank',
                question: 'Convert "carl" to uppercase:',
                template: 'let name = "carl"; let upper = name.___();',
                blanks: [
                    { answer: 'toUpperCase', caseSensitive: true }
                ],
                explanation: 'Use .toUpperCase() method on the string.'
            },
            {
                id: 3,
                type: 'multiple-choice',
                question: 'What property gives you the length of a string?',
                options: ['size', 'count', 'length', 'len'],
                correctAnswer: 2,
                explanation: 'Use .length to get the number of characters in a string.'
            },
            {
                id: 4,
                type: 'code',
                question: 'Create "weapon" with value "sword". Convert to uppercase and print it.',
                solution: (output, code) => {
                    return code.includes('weapon') && 
                           code.includes('sword') &&
                           code.includes('toUpperCase') &&
                           output.includes('SWORD');
                },
                explanation: 'Use weapon.toUpperCase() to convert to "SWORD".'
            },
            {
                id: 5,
                type: 'multiple-choice',
                question: 'How do you combine two strings?',
                options: [
                    'string1.add(string2)',
                    'string1 + string2',
                    'string1.concat(string2)',
                    'Both B and C'
                ],
                correctAnswer: 3,
                explanation: 'Both + operator and .concat() method work to combine strings.'
            },
            {
                id: 6,
                type: 'code',
                question: 'Create two variables: firstName "Carl" and lastName "Smith". Combine them with a space and print full name.',
                solution: (output, code) => {
                    return code.includes('firstName') && 
                           code.includes('lastName') &&
                           (output.includes('Carl Smith') || output.includes('Carl  Smith'));
                },
                explanation: 'Use firstName + " " + lastName to combine with a space.'
            },
            {
                id: 7,
                type: 'fill-in-blank',
                question: 'Check if "Hello World" includes "World":',
                template: 'let text = "Hello World"; let has = text.___("World");',
                blanks: [
                    { answer: 'includes', caseSensitive: true }
                ],
                explanation: 'Use .includes() to check if a string contains a substring.'
            }
        ]
    },

    // === INTERMEDIATE LEVEL ===
    {
        id: 'conditionals',
        level: 'intermediate',
        title: 'Lesson 7: Conditionals - If/Else Statements',
        objective: 'conditionals',
        explanation: `
            <p>Conditionals let your code make decisions! 🤔</p>
            <p>Use <code>if</code>, <code>else if</code>, and <code>else</code> to run different code based on conditions.</p>
            <p><strong>Syntax:</strong></p>
            <pre><code>if (condition) {
    // Code runs if condition is true
} else if (anotherCondition) {
    // Code runs if first is false, this is true
} else {
    // Code runs if all conditions are false
}</code></pre>
            <p><strong>Example:</strong></p>
            <pre><code>let health = 50;

if (health > 75) {
    console.log("Healthy!");
} else if (health > 25) {
    console.log("Wounded!");
} else {
    console.log("Critical!");
}
// Prints: "Wounded!"</code></pre>
        `,
        questions: [
            {
                id: 1,
                type: 'multiple-choice',
                question: 'What keyword starts a conditional statement?',
                options: ['when', 'if', 'check', 'condition'],
                correctAnswer: 1,
                explanation: 'Use the if keyword to start a conditional statement.'
            },
            {
                id: 2,
                type: 'fill-in-blank',
                question: 'Complete the if statement:',
                template: '___ (health > 0) { console.log("Alive"); }',
                blanks: [
                    { answer: 'if', caseSensitive: true }
                ],
                explanation: 'Use if to check a condition.'
            },
            {
                id: 3,
                type: 'multiple-choice',
                question: 'What happens if the if condition is false and there is no else?',
                options: [
                    'Code crashes',
                    'Nothing happens, code continues',
                    'Variable is deleted',
                    'Browser closes'
                ],
                correctAnswer: 1,
                explanation: 'If the condition is false and there\'s no else, the if block is skipped.'
            },
            {
                id: 4,
                type: 'code',
                question: 'Create "score" with value 85. Print "Pass" if 60 or higher, else print "Fail".',
                solution: (output, code) => {
                    return code.includes('score') && 
                           code.includes('if') &&
                           code.includes('85') &&
                           output.includes('Pass');
                },
                explanation: 'Use if (score >= 60) to check the condition.'
            },
            {
                id: 5,
                type: 'multiple-choice',
                question: 'Which keyword provides an alternative when if is false?',
                options: ['otherwise', 'then', 'else', 'or'],
                correctAnswer: 2,
                explanation: 'The else keyword handles the case when if condition is false.'
            },
            {
                id: 6,
                type: 'fill-in-blank',
                question: 'Complete the if-else statement:',
                template: 'if (x > 10) { console.log("Big"); } ___ { console.log("Small"); }',
                blanks: [
                    { answer: 'else', caseSensitive: true }
                ],
                explanation: 'Use else for the alternative code path.'
            },
            {
                id: 7,
                type: 'code',
                question: 'Create "age" with value 16. Print "Adult" if 18+, "Teen" if 13-17, else "Child".',
                solution: (output, code) => {
                    return code.includes('age') && 
                           code.includes('if') &&
                           code.includes('else') &&
                           output.includes('Teen');
                },
                explanation: 'Use if, else if, and else to handle multiple conditions.'
            }
        ]
    },
    {
        id: 'comparisons',
        level: 'intermediate',
        title: 'Lesson 8: Comparison Operators',
        objective: 'comparisons',
        explanation: `
            <p>Compare values to make decisions in your code! ⚖️</p>
            <p><strong>Comparison operators:</strong></p>
            <ul>
                <li><code>===</code> Equal to (strict)</li>
                <li><code>!==</code> Not equal to (strict)</li>
                <li><code>&gt;</code> Greater than</li>
                <li><code>&lt;</code> Less than</li>
                <li><code>&gt;=</code> Greater than or equal to</li>
                <li><code>&lt;=</code> Less than or equal to</li>
            </ul>
            <p><strong>Examples:</strong></p>
            <pre><code>console.log(5 === 5);   // true
console.log(5 !== 3);   // true
console.log(10 > 5);    // true
console.log(3 < 7);     // true
console.log(5 >= 5);    // true</code></pre>
            <p><strong>Logical operators (combine conditions):</strong></p>
            <pre><code>// AND (both must be true)
if (health > 0 && hasKey) { }

// OR (at least one must be true)  
if (isDead || isDefeated) { }

// NOT (reverses boolean)
if (!isDoorLocked) { }</code></pre>
        `,
        questions: [
            {
                id: 1,
                type: 'multiple-choice',
                question: 'Which operator checks if two values are equal?',
                options: ['==', '===', '=', 'equals'],
                correctAnswer: 1,
                explanation: 'Use === for strict equality comparison.'
            },
            {
                id: 2,
                type: 'fill-in-blank',
                question: 'Check if x is greater than 10:',
                template: 'if (x ___ 10) { console.log("Greater"); }',
                blanks: [
                    { answer: '>', caseSensitive: true }
                ],
                explanation: 'Use > to check if value is greater than another.'
            },
            {
                id: 3,
                type: 'multiple-choice',
                question: 'What does && mean in JavaScript?',
                options: ['OR', 'AND', 'NOT', 'EQUALS'],
                correctAnswer: 1,
                explanation: '&& is the logical AND operator - both conditions must be true.'
            },
            {
                id: 4,
                type: 'multiple-choice',
                question: 'What does 5 >= 5 return?',
                options: ['true', 'false', 'error', '5'],
                correctAnswer: 0,
                explanation: '>= checks greater than or equal, so 5 >= 5 is true.'
            },
            {
                id: 5,
                type: 'code',
                question: 'Create "playerLevel" (5) and "enemyLevel" (3). Print "Victory!" if player level is greater.',
                solution: (output, code) => {
                    return code.includes('playerLevel') && 
                           code.includes('enemyLevel') &&
                           code.includes('>') &&
                           output.includes('Victory!');
                },
                explanation: 'Use if (playerLevel > enemyLevel) to compare.'
            },
            {
                id: 6,
                type: 'fill-in-blank',
                question: 'Complete the OR condition:',
                template: 'if (dead ___ defeated) { console.log("Game Over"); }',
                blanks: [
                    { answer: '||', caseSensitive: true }
                ],
                explanation: '|| is the OR operator - at least one condition must be true.'
            },
            {
                id: 7,
                type: 'code',
                question: 'Create "health" (100) and "hasPotion" (true). Print "Safe" if health > 50 AND has potion.',
                solution: (output, code) => {
                    return code.includes('health') && 
                           code.includes('hasPotion') &&
                           code.includes('&&') &&
                           output.includes('Safe');
                },
                explanation: 'Use && to combine conditions: if (health > 50 && hasPotion)'
            }
        ]
    },
    {
        id: 'loops',
        level: 'intermediate',
        title: 'Lesson 9: For Loops - Repeating Actions',
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
                <li><code>i &lt; 5</code> - Keep going while i is less than 5</li>
                <li><code>i++</code> - Add 1 to i after each loop</li>
            </ul>
            <p><strong>Example:</strong></p>
            <pre><code>for (let i = 0; i < 3; i++) {
    console.log("Attack!");
}
// Prints "Attack!" three times</code></pre>
        `,
        questions: [
            {
                id: 1,
                type: 'multiple-choice',
                question: 'What keyword starts a for loop?',
                options: ['loop', 'for', 'repeat', 'iterate'],
                correctAnswer: 1,
                explanation: 'Use the for keyword to start a for loop.'
            },
            {
                id: 2,
                type: 'fill-in-blank',
                question: 'Complete the for loop:',
                template: 'for (let i = 0; i ___ 5; i___) { }',
                blanks: [
                    { answer: '<', caseSensitive: true },
                    { answer: '++', caseSensitive: true }
                ],
                explanation: 'Use < to check the condition and ++ to increment.'
            },
            {
                id: 3,
                type: 'multiple-choice',
                question: 'What does i++ do in a for loop?',
                options: ['Decreases i by 1', 'Increases i by 1', 'Multiplies i by 2', 'Resets i to 0'],
                correctAnswer: 1,
                explanation: 'i++ increments the value of i by 1 after each iteration.'
            },
            {
                id: 4,
                type: 'code',
                question: 'Use a for loop to print "Attack!" exactly 5 times.',
                solution: (output) => {
                    const attacks = (output.match(/Attack!/g) || []).length;
                    return attacks === 5;
                },
                explanation: 'Use for (let i = 0; i < 5; i++) { console.log("Attack!"); }'
            },
            {
                id: 5,
                type: 'multiple-choice',
                question: 'In "for (let i = 0; i < 10; i++)", how many times does the loop run?',
                options: ['9', '10', '11', 'infinite'],
                correctAnswer: 1,
                explanation: 'The loop runs from i=0 to i=9, which is 10 times total.'
            },
            {
                id: 6,
                type: 'code',
                question: 'Create a for loop that prints numbers 1 through 3.',
                solution: (output) => {
                    return output.includes('1') && output.includes('2') && output.includes('3');
                },
                explanation: 'Use for (let i = 1; i <= 3; i++) { console.log(i); }'
            },
            {
                id: 7,
                type: 'fill-in-blank',
                question: 'Loop from 0 to less than 10:',
                template: 'for (let i = ___; i < ___; i++) { }',
                blanks: [
                    { answer: '0', caseSensitive: false },
                    { answer: '10', caseSensitive: false }
                ],
                explanation: 'Start at 0 and go while i is less than 10.'
            }
        ]
    },
    {
        id: 'while_loops',
        level: 'intermediate',
        title: 'Lesson 10: While Loops - Conditional Repetition',
        objective: 'while_loops',
        explanation: `
            <p>While loops repeat code as long as a condition is true! 🔄</p>
            <p>They're perfect when you don't know exactly how many times you need to loop.</p>
            <p><strong>Syntax:</strong></p>
            <pre><code>while (condition) {
    // Code to repeat
    // Make sure to update the condition!
}</code></pre>
            <p><strong>Example:</strong></p>
            <pre><code>let health = 100;
while (health > 0) {
    console.log("Still fighting!");
    health -= 20;
}
console.log("Defeated!");
// Prints "Still fighting!" 5 times, then "Defeated!"</code></pre>
            <p><strong>⚠️ Important:</strong> Always make sure the condition will eventually become false, or you'll create an infinite loop!</p>
        `,
        questions: [
            {
                id: 1,
                type: 'multiple-choice',
                question: 'What keyword starts a while loop?',
                options: ['loop', 'repeat', 'while', 'do'],
                correctAnswer: 2,
                explanation: 'Use the while keyword to start a while loop.'
            },
            {
                id: 2,
                type: 'fill-in-blank',
                question: 'Complete the while loop:',
                template: '___ (count > 0) { count--; }',
                blanks: [
                    { answer: 'while', caseSensitive: true }
                ],
                explanation: 'Use while to create a loop that runs while a condition is true.'
            },
            {
                id: 3,
                type: 'multiple-choice',
                question: 'What happens if a while loop condition never becomes false?',
                options: ['Loop stops after 100 iterations', 'Creates an infinite loop', 'Code crashes immediately', 'Loop runs once'],
                correctAnswer: 1,
                explanation: 'An infinite loop occurs when the condition never becomes false.'
            },
            {
                id: 4,
                type: 'code',
                question: 'Create "countdown" with value 3. Use while loop to print and decrement until 0.',
                solution: (output, code) => {
                    return code.includes('while') && 
                           code.includes('countdown') &&
                           code.includes('--');
                },
                explanation: 'Use while (countdown > 0) { console.log(countdown); countdown--; }'
            },
            {
                id: 5,
                type: 'multiple-choice',
                question: 'When should you use a while loop vs a for loop?',
                options: [
                    'Never use while loops',
                    'When you don\'t know exactly how many iterations',
                    'When you need exactly 10 iterations',
                    'They are exactly the same'
                ],
                correctAnswer: 1,
                explanation: 'While loops are best when iteration count is unknown beforehand.'
            },
            {
                id: 6,
                type: 'code',
                question: 'Create "x" with value 1. Double it while x < 100, then print final value.',
                solution: (output, code) => {
                    return code.includes('while') && 
                           code.includes('x') &&
                           (output.includes('128') || output.includes('64'));
                },
                explanation: 'Use while (x < 100) { x = x * 2; } then console.log(x);'
            }
        ]
    },
    {
        id: 'arrays',
        level: 'intermediate',
        title: 'Lesson 11: Arrays - Lists of Data',
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
console.log(weapons[1]);  // Prints: bow (second item)
console.log(numbers.length);  // Prints: 5</code></pre>
            <p>Arrays are zero-indexed (first item is at position 0).</p>
            <p><strong>Looping through arrays:</strong></p>
            <pre><code>let sum = 0;
for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
}
console.log(sum);  // Prints: 15</code></pre>
        `,
        questions: [
            {
                id: 1,
                type: 'multiple-choice',
                question: 'How do you create an array?',
                options: ['Using { }', 'Using [ ]', 'Using ( )', 'Using < >'],
                correctAnswer: 1,
                explanation: 'Arrays are created using square brackets [ ].'
            },
            {
                id: 2,
                type: 'fill-in-blank',
                question: 'Create an array with 1, 2, 3:',
                template: 'let items = ___1, 2, 3___;',
                blanks: [
                    { answer: '[', caseSensitive: true },
                    { answer: ']', caseSensitive: true }
                ],
                explanation: 'Arrays use square brackets: [1, 2, 3]'
            },
            {
                id: 3,
                type: 'multiple-choice',
                question: 'What index is the first element of an array?',
                options: ['1', '0', '-1', 'first'],
                correctAnswer: 1,
                explanation: 'Arrays are zero-indexed, so the first element is at index 0.'
            },
            {
                id: 4,
                type: 'code',
                question: 'Create array "inventory" with "sword", "potion", "key". Print the first item.',
                solution: (output, code) => {
                    return code.includes('inventory') && 
                           code.includes('sword') &&
                           code.includes('potion') &&
                           code.includes('key') &&
                           output.includes('sword');
                },
                explanation: 'Use inventory[0] to access the first element.'
            },
            {
                id: 5,
                type: 'multiple-choice',
                question: 'What property gives you the number of items in an array?',
                options: ['size', 'count', 'length', 'total'],
                correctAnswer: 2,
                explanation: 'Use .length to get the number of elements in an array.'
            },
            {
                id: 6,
                type: 'code',
                question: 'Create array [10, 20, 30]. Use a loop to print all elements.',
                solution: (output, code) => {
                    return code.includes('for') && 
                           output.includes('10') &&
                           output.includes('20') &&
                           output.includes('30');
                },
                explanation: 'Use for loop with array.length to iterate through all elements.'
            },
            {
                id: 7,
                type: 'fill-in-blank',
                question: 'Access the second element:',
                template: 'let arr = [5, 10, 15]; let second = arr___;',
                blanks: [
                    { answer: '[1]', caseSensitive: false }
                ],
                explanation: 'Second element is at index 1: arr[1]'
            }
        ]
    },
    {
        id: 'array_methods',
        level: 'intermediate',
        title: 'Lesson 12: Array Methods - Manipulating Lists',
        objective: 'array_methods',
        explanation: `
            <p>Arrays have powerful methods to add, remove, and transform data! 🛠️</p>
            <p><strong>Adding items:</strong></p>
            <pre><code>let items = ["sword", "shield"];
items.push("potion");     // Add to end: ["sword", "shield", "potion"]
items.unshift("helmet");  // Add to start: ["helmet", "sword", "shield", "potion"]</code></pre>
            <p><strong>Removing items:</strong></p>
            <pre><code>items.pop();      // Remove from end: ["helmet", "sword", "shield"]
items.shift();    // Remove from start: ["sword", "shield"]</code></pre>
            <p><strong>Finding items:</strong></p>
            <pre><code>let index = items.indexOf("sword");  // Returns: 0
let hasSword = items.includes("sword");  // Returns: true</code></pre>
            <p><strong>Joining arrays:</strong></p>
            <pre><code>let text = items.join(", ");  // "sword, shield"</code></pre>
        `,
        questions: [
            {
                id: 1,
                type: 'multiple-choice',
                question: 'Which method adds an item to the end of an array?',
                options: ['add()', 'push()', 'append()', 'insert()'],
                correctAnswer: 1,
                explanation: 'Use .push() to add items to the end of an array.'
            },
            {
                id: 2,
                type: 'fill-in-blank',
                question: 'Add 3 to end of array:',
                template: 'let arr = [1, 2]; arr.___(3);  // [1, 2, 3]',
                blanks: [
                    { answer: 'push', caseSensitive: true }
                ],
                explanation: 'Use push() to add to the end.'
            },
            {
                id: 3,
                type: 'multiple-choice',
                question: 'Which method removes the last item from an array?',
                options: ['pop()', 'remove()', 'delete()', 'shift()'],
                correctAnswer: 0,
                explanation: 'Use .pop() to remove the last element.'
            },
            {
                id: 4,
                type: 'code',
                question: 'Create array "bag" with ["apple", "bread"]. Use push() to add "water", then print.',
                solution: (output, code) => {
                    return code.includes('bag') && 
                           code.includes('push') &&
                           code.includes('water') &&
                           (output.includes('apple') || output.includes('bread') || output.includes('water'));
                },
                explanation: 'Use bag.push("water"); to add water to the array.'
            },
            {
                id: 5,
                type: 'multiple-choice',
                question: 'What does indexOf() return?',
                options: [
                    'The value at an index',
                    'The index of a value',
                    'The length of array',
                    'True or false'
                ],
                correctAnswer: 1,
                explanation: 'indexOf() returns the position (index) of a value in the array.'
            },
            {
                id: 6,
                type: 'code',
                question: 'Create [1, 2, 3]. Use pop() to remove last item, then print array.',
                solution: (output, code) => {
                    return code.includes('pop') && 
                           (output.includes('[1, 2]') || (output.includes('1') && output.includes('2') && !output.includes(',3')));
                },
                explanation: 'Use arr.pop(); to remove the last element.'
            }
        ]
    },

    // === ADVANCED LEVEL ===
    {
        id: 'functions',
        level: 'advanced',
        title: 'Lesson 13: Functions - Reusable Code',
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
        questions: [
            {
                id: 1,
                type: 'multiple-choice',
                question: 'What keyword defines a function?',
                options: ['func', 'function', 'def', 'fun'],
                correctAnswer: 1,
                explanation: 'Use the function keyword to define a function.'
            },
            {
                id: 2,
                type: 'fill-in-blank',
                question: 'Create a function called openChest:',
                template: '___ openChest() { ___ "Treasure found!"; }',
                blanks: [
                    { answer: 'function', caseSensitive: true },
                    { answer: 'return', caseSensitive: true }
                ],
                explanation: 'Use function to define and return to give back a value.'
            },
            {
                id: 3,
                type: 'multiple-choice',
                question: 'What does the return keyword do?',
                options: [
                    'Deletes the function',
                    'Sends back a value from the function',
                    'Calls the function',
                    'Creates a loop'
                ],
                correctAnswer: 1,
                explanation: 'return sends a value back from the function to where it was called.'
            },
            {
                id: 4,
                type: 'code',
                question: 'Write function "attack" that takes "damage" parameter and returns "Dealt [damage] damage!". Call it with 25.',
                solution: (output, code) => {
                    return code.includes('function') && 
                           code.includes('attack') && 
                           code.includes('damage') &&
                           (output.includes('25') || output.includes('Dealt'));
                },
                explanation: 'function attack(damage) { return "Dealt " + damage + " damage!"; }'
            },
            {
                id: 5,
                type: 'multiple-choice',
                question: 'What are the inputs to a function called?',
                options: ['arguments', 'parameters', 'variables', 'both A and B'],
                correctAnswer: 3,
                explanation: 'Function inputs are called parameters (in definition) or arguments (when called).'
            },
            {
                id: 6,
                type: 'code',
                question: 'Create function "multiply" that takes two numbers and returns their product. Call it with 6 and 7.',
                solution: (output, code) => {
                    return code.includes('function') && 
                           code.includes('multiply') &&
                           output.includes('42');
                },
                explanation: 'function multiply(a, b) { return a * b; } then call multiply(6, 7);'
            },
            {
                id: 7,
                type: 'fill-in-blank',
                question: 'Call a function called heal:',
                template: 'let result = ___();',
                blanks: [
                    { answer: 'heal', caseSensitive: true }
                ],
                explanation: 'Use function name followed by () to call it.'
            }
        ]
    },
    {
        id: 'objects',
        level: 'advanced',
        title: 'Lesson 14: Objects - Structured Data',
        objective: 'object_practice',
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
        questions: [
            {
                id: 1,
                type: 'multiple-choice',
                question: 'How do you create an object?',
                options: ['Using [ ]', 'Using { }', 'Using ( )', 'Using < >'],
                correctAnswer: 1,
                explanation: 'Objects are created using curly braces { }.'
            },
            {
                id: 2,
                type: 'fill-in-blank',
                question: 'Complete the object with defeated property:',
                template: 'const dragon = { name: "Dragon", health: 0, defeated: ___ };',
                blanks: [
                    { answer: 'true', caseSensitive: true }
                ],
                explanation: 'Use true or false for boolean properties.'
            },
            {
                id: 3,
                type: 'multiple-choice',
                question: 'How do you access an object property?',
                options: [
                    'object[property]',
                    'object.property',
                    'object->property',
                    'Both A and B'
                ],
                correctAnswer: 3,
                explanation: 'You can use dot notation (object.property) or bracket notation (object["property"]).'
            },
            {
                id: 4,
                type: 'code',
                question: 'Create object "player" with name (any string), level (5), and health (100). Print the object.',
                solution: (output, code) => {
                    return code.includes('player') && 
                           code.includes('name') && 
                           code.includes('level') &&
                           code.includes('health');
                },
                explanation: 'Use { name: "Carl", level: 5, health: 100 } syntax.'
            },
            {
                id: 5,
                type: 'multiple-choice',
                question: 'What separates properties in an object?',
                options: ['semicolon (;)', 'comma (,)', 'period (.)', 'colon (:)'],
                correctAnswer: 1,
                explanation: 'Properties are separated by commas, but key-value pairs use colons.'
            },
            {
                id: 6,
                type: 'code',
                question: 'Create object "weapon" with type "sword" and damage 25. Print the damage value.',
                solution: (output, code) => {
                    return code.includes('weapon') && 
                           code.includes('type') &&
                           code.includes('damage') &&
                           output.includes('25');
                },
                explanation: 'Access property using weapon.damage'
            },
            {
                id: 7,
                type: 'fill-in-blank',
                question: 'Update an object property:',
                template: 'let player = {score: 0}; player.___ = 100;',
                blanks: [
                    { answer: 'score', caseSensitive: true }
                ],
                explanation: 'Use dot notation to update: player.score = 100;'
            }
        ]
    },
    {
        id: 'dragon_battle',
        level: 'advanced',
        title: 'Lesson 15: Final Boss Battle - Putting It All Together',
        objective: 'dragon_defeat',
        explanation: `
            <p>🐉 It's time for your final challenge! You'll write a complete battle simulation script that combines everything you've learned!</p>
            <p>Your script will simulate an epic battle between you and the Ancient Dragon, using:</p>
            <ul>
                <li><strong>Variables:</strong> To track health and damage</li>
                <li><strong>Loops:</strong> To simulate multiple rounds of combat</li>
                <li><strong>Conditionals (if/else):</strong> To determine hits, dodges, and victory</li>
                <li><strong>console.log():</strong> To narrate the battle as it unfolds</li>
            </ul>
            <p><strong>Example Battle Script Structure:</strong></p>
            <pre><code>// Initialize health
let dragonHealth = 100;
let playerHealth = 100;

// Battle loop - fight for 5 rounds or until someone is defeated
for (let round = 1; round <= 5; round++) {
    console.log("=== Round " + round + " ===");
    
    // Player attacks
    let playerDamage = 30;
    
    // Check if dragon dodges (30% chance if health > 50)
    if (dragonHealth > 50 && Math.random() < 0.3) {
        console.log("Dragon dodged your attack!");
    } else {
        dragonHealth = dragonHealth - playerDamage;
        console.log("You hit the dragon for " + playerDamage + " damage!");
        console.log("Dragon health: " + dragonHealth);
    }
    
    // Check if dragon is defeated
    if (dragonHealth <= 0) {
        console.log("Victory! You defeated the Ancient Dragon!");
        break;  // Exit the loop
    }
    
    // Dragon counter-attacks
    let dragonDamage = 18;
    
    // Check if player dodges (40% chance if health > 60)
    if (playerHealth > 60 && Math.random() < 0.4) {
        console.log("You dodged the dragon's attack!");
    } else {
        playerHealth = playerHealth - dragonDamage;
        console.log("Dragon hits you for " + dragonDamage + " damage!");
        console.log("Your health: " + playerHealth);
    }
    
    // Check if player is defeated
    if (playerHealth <= 0) {
        console.log("Defeat! You have been defeated by the dragon...");
        break;
    }
}

console.log("=== Battle Complete ===");</code></pre>
            <p><strong>Tips for your battle script:</strong></p>
            <ul>
                <li>Start both characters with 100 health</li>
                <li>Use a for loop or while loop for multiple rounds</li>
                <li>Player damage should be 25-35, dragon damage 15-20</li>
                <li>Use if/else to check dodge conditions</li>
                <li>Print health status after each action</li>
                <li>Check for victory/defeat conditions</li>
                <li>Use break to exit the loop when battle ends</li>
            </ul>
            <p>Remember: The goal is to demonstrate that you understand how all these concepts work together!</p>
        `,
        questions: [
            {
                id: 1,
                type: 'multiple-choice',
                question: 'What JavaScript concept is best for repeating attack rounds?',
                options: ['Variables', 'Loops', 'Objects', 'Functions'],
                correctAnswer: 1,
                explanation: 'Loops (for or while) are perfect for repeating actions like combat rounds.'
            },
            {
                id: 2,
                type: 'multiple-choice',
                question: 'What operator is used to reduce health when taking damage?',
                options: ['+=', '-=', '*=', '=='],
                correctAnswer: 1,
                explanation: '-= subtracts and assigns: health -= 20 is the same as health = health - 20'
            },
            {
                id: 3,
                type: 'fill-in-blank',
                question: 'Check if dragon is defeated:',
                template: 'if (dragonHealth ___ 0) { console.log("Victory!"); }',
                blanks: [
                    { answer: '<=', alternatives: ['<', '===', '=='], caseSensitive: true }
                ],
                explanation: 'Use <= to check if health is less than or equal to 0.'
            },
            {
                id: 4,
                type: 'multiple-choice',
                question: 'What keyword exits a loop early?',
                options: ['exit', 'stop', 'break', 'end'],
                correctAnswer: 2,
                explanation: 'break exits the current loop immediately.'
            },
            {
                id: 5,
                type: 'code',
                question: 'Write a simple 3-round battle: Start with enemyHealth=60. Each round, deal 20 damage and print health. Print "Won!" when health <= 0.',
                solution: (output, code) => {
                    return code.includes('for') || code.includes('while') &&
                           code.includes('enemyHealth') &&
                           code.includes('20') &&
                           (output.toLowerCase().includes('won') || output.toLowerCase().includes('victory'));
                },
                explanation: 'Use a loop to repeat attacks, subtract damage each round, check for victory.'
            },
            {
                id: 6,
                type: 'multiple-choice',
                question: 'In a battle script, when should you check if health <= 0?',
                options: [
                    'Before the battle starts',
                    'After each attack',
                    'Only at the end',
                    'Never'
                ],
                correctAnswer: 1,
                explanation: 'Check after each attack to determine if the battle should end.'
            },
            {
                id: 7,
                type: 'code',
                question: 'Create a dodge mechanic: if playerHealth > 50, print "Dodged!", else reduce health by 15 and print new health.',
                solution: (output, code) => {
                    return code.includes('if') &&
                           code.includes('else') &&
                           code.includes('playerHealth') &&
                           (output.toLowerCase().includes('dodge') || output.includes('15'));
                },
                explanation: 'Use if/else to check condition and take different actions based on health.'
            }
        ]
    },
    {
        id: 'error_handling',
        level: 'advanced',
        title: 'Lesson 15: Error Handling - Try/Catch',
        objective: 'error_handling',
        explanation: `
            <p>Error handling lets you gracefully deal with problems in your code! 🛡️</p>
            <p>Use <code>try/catch</code> to prevent crashes and handle errors elegantly.</p>
            <p><strong>Syntax:</strong></p>
            <pre><code>try {
    // Code that might cause an error
} catch (error) {
    // Code to handle the error
}</code></pre>
            <p><strong>Example:</strong></p>
            <pre><code>try {
    let result = riskyOperation();
    console.log("Success:", result);
} catch (error) {
    console.log("Error occurred:", error.message);
}</code></pre>
            <p><strong>Throwing errors:</strong></p>
            <pre><code>function checkHealth(health) {
    if (health <= 0) {
        throw new Error("Player is dead!");
    }
    return "Player is alive";
}

try {
    console.log(checkHealth(-10));
} catch (error) {
    console.log("Caught:", error.message);
}
// Prints: "Caught: Player is dead!"</code></pre>
        `,
        questions: [
            {
                id: 1,
                type: 'multiple-choice',
                question: 'What keyword catches errors?',
                options: ['error', 'catch', 'handle', 'except'],
                correctAnswer: 1,
                explanation: 'Use catch to handle errors that occur in try block.'
            },
            {
                id: 2,
                type: 'fill-in-blank',
                question: 'Complete the try/catch:',
                template: '___ { riskyCode(); } ___ (error) { handleError(); }',
                blanks: [
                    { answer: 'try', caseSensitive: true },
                    { answer: 'catch', caseSensitive: true }
                ],
                explanation: 'Use try for risky code and catch to handle errors.'
            },
            {
                id: 3,
                type: 'multiple-choice',
                question: 'What keyword throws a new error?',
                options: ['throw', 'raise', 'error', 'crash'],
                correctAnswer: 0,
                explanation: 'Use throw to create and throw a new error.'
            },
            {
                id: 4,
                type: 'code',
                question: 'Write try/catch. In try, throw error "Boss defeated!". In catch, print the error message.',
                solution: (output, code) => {
                    return code.includes('try') && 
                           code.includes('catch') &&
                           code.includes('throw') &&
                           output.includes('Boss defeated!');
                },
                explanation: 'Use try { throw new Error("Boss defeated!"); } catch (e) { console.log(e.message); }'
            },
            {
                id: 5,
                type: 'multiple-choice',
                question: 'What happens if an error occurs without try/catch?',
                options: [
                    'Nothing, code continues',
                    'Program crashes/stops',
                    'Error is ignored',
                    'Code runs faster'
                ],
                correctAnswer: 1,
                explanation: 'Without try/catch, uncaught errors will crash the program.'
            },
            {
                id: 6,
                type: 'code',
                question: 'Create function that checks if number is positive. Throw error if negative. Test with -5 in try/catch.',
                solution: (output, code) => {
                    return code.includes('try') && 
                           code.includes('catch') &&
                           code.includes('throw') &&
                           code.includes('function');
                },
                explanation: 'Use try/catch to handle the error from your function.'
            }
        ]
    }
];

// Export for use in lessons.js
if (typeof window !== 'undefined') {
    window.lessonData = lessonData;
}
