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
        fillInBlanks: {
            template: '___ This is a comment',
            blanks: [
                { answer: '//', caseSensitive: true }
            ]
        },
        practice: {
            prompt: 'Write a comment that says "My first program", then print "Learning JavaScript!" to the console.',
            solution: (output, code) => {
                return code.includes('//') && 
                       code.includes('My first program') && 
                       output.includes('Learning JavaScript!');
            }
        }
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
        fillInBlanks: {
            template: '___ key = 42;',
            blanks: [
                { answer: 'let', alternatives: ['const', 'var'], caseSensitive: true }
            ]
        },
        practice: {
            prompt: 'Create a variable called "key" with the value 42, then print it using console.log().',
            solution: (output, code) => code.includes('key') && code.includes('42') && output.includes('42')
        }
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
        fillInBlanks: {
            template: 'let isAlive = ___;',
            blanks: [
                { answer: 'true', alternatives: ['false'], caseSensitive: true }
            ]
        },
        practice: {
            prompt: 'Create three variables: a number called "health" (100), a string called "name" (your choice), and a boolean called "alive" (true). Print all three.',
            solution: (output, code) => {
                return code.includes('health') && 
                       code.includes('name') && 
                       code.includes('alive') &&
                       code.includes('100') &&
                       code.includes('true');
            }
        }
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
        fillInBlanks: {
            template: 'let result = 10 ___ 5;  // equals 50',
            blanks: [
                { answer: '*', caseSensitive: true }
            ]
        },
        practice: {
            prompt: 'Calculate the result of (20 + 5) * 2 and store it in a variable called "damage". Then print the damage.',
            solution: (output, code) => {
                return code.includes('damage') && 
                       (output.includes('50') || code.includes('(20 + 5) * 2') || code.includes('25 * 2'));
            }
        }
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
        fillInBlanks: {
            template: 'let name = "carl"; let upper = name.___();',
            blanks: [
                { answer: 'toUpperCase', caseSensitive: true }
            ]
        },
        practice: {
            prompt: 'Create a string variable called "weapon" with value "sword". Convert it to uppercase and print it.',
            solution: (output, code) => {
                return code.includes('weapon') && 
                       code.includes('sword') &&
                       code.includes('toUpperCase') &&
                       output.includes('SWORD');
            }
        }
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
        fillInBlanks: {
            template: '___ (health > 0) { console.log("Alive"); }',
            blanks: [
                { answer: 'if', caseSensitive: true }
            ]
        },
        practice: {
            prompt: 'Create a variable "score" with value 85. Use an if/else statement to print "Pass" if score is 60 or higher, otherwise print "Fail".',
            solution: (output, code) => {
                return code.includes('score') && 
                       code.includes('if') &&
                       code.includes('85') &&
                       output.includes('Pass');
            }
        }
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
        fillInBlanks: {
            template: 'if (x ___ 10) { console.log("Greater"); }',
            blanks: [
                { answer: '>', caseSensitive: true }
            ]
        },
        practice: {
            prompt: 'Create two variables: "playerLevel" (5) and "enemyLevel" (3). Use a comparison to check if playerLevel is greater than enemyLevel, and print "Victory!" if true.',
            solution: (output, code) => {
                return code.includes('playerLevel') && 
                       code.includes('enemyLevel') &&
                       code.includes('>') &&
                       output.includes('Victory!');
            }
        }
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
        fillInBlanks: {
            template: '___ (count > 0) { count--; }',
            blanks: [
                { answer: 'while', caseSensitive: true }
            ]
        },
        practice: {
            prompt: 'Create a variable "countdown" with value 3. Use a while loop to print "countdown" each time and decrement it until it reaches 0.',
            solution: (output, code) => {
                return code.includes('while') && 
                       code.includes('countdown') &&
                       code.includes('--');
            }
        }
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
        fillInBlanks: {
            template: 'let items = ___1, 2, 3___;',
            blanks: [
                { answer: '[', caseSensitive: true },
                { answer: ']', caseSensitive: true }
            ]
        },
        practice: {
            prompt: 'Create an array called "inventory" with items "sword", "potion", and "key". Print the first item.',
            solution: (output, code) => {
                return code.includes('inventory') && 
                       code.includes('sword') &&
                       code.includes('potion') &&
                       code.includes('key') &&
                       output.includes('sword');
            }
        }
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
        fillInBlanks: {
            template: 'let arr = [1, 2]; arr.___(3);  // [1, 2, 3]',
            blanks: [
                { answer: 'push', caseSensitive: true }
            ]
        },
        practice: {
            prompt: 'Create an array "bag" with ["apple", "bread"]. Use push() to add "water", then print the array.',
            solution: (output, code) => {
                return code.includes('bag') && 
                       code.includes('push') &&
                       code.includes('water') &&
                       (output.includes('apple') || output.includes('bread') || output.includes('water'));
            }
        }
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
        fillInBlanks: {
            template: '___ openChest() { ___ "Treasure found!"; }',
            blanks: [
                { answer: 'function', caseSensitive: true },
                { answer: 'return', caseSensitive: true }
            ]
        },
        practice: {
            prompt: 'Write a function called "attack" that takes a "damage" parameter and returns "Dealt [damage] damage!". Call it with 25 and print the result.',
            solution: (output, code) => {
                return code.includes('function') && 
                       code.includes('attack') && 
                       code.includes('damage') &&
                       (output.includes('25') || output.includes('Dealt'));
            }
        }
    },
    {
        id: 'objects',
        level: 'advanced',
        title: 'Lesson 14: Objects - Structured Data',
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
            prompt: 'Create an object called "player" with properties: name (any string), level (5), and health (100). Print the entire object.',
            solution: (output, code) => {
                return code.includes('player') && 
                       code.includes('name') && 
                       code.includes('level') &&
                       code.includes('health');
            }
        }
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
        fillInBlanks: {
            template: '___ { riskyCode(); } ___ (error) { handleError(); }',
            blanks: [
                { answer: 'try', caseSensitive: true },
                { answer: 'catch', caseSensitive: true }
            ]
        },
        practice: {
            prompt: 'Write a try/catch block. In the try block, throw an error with message "Boss defeated!". In the catch block, print the error message.',
            solution: (output, code) => {
                return code.includes('try') && 
                       code.includes('catch') &&
                       code.includes('throw') &&
                       output.includes('Boss defeated!');
            }
        }
    }
];

// Export for use in lessons.js
if (typeof window !== 'undefined') {
    window.lessonData = lessonData;
}
