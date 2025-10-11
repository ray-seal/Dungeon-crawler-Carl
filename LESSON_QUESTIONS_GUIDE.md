# Lesson Questions Guide

## Adding New Questions to Lessons

This guide explains how to add new questions to the Dungeon Crawler Carl lessons system.

## Question Format Structure

Each lesson in `lesson-data.js` has a `questions` array containing question objects. Each question follows this structure:

```javascript
{
    id: 1,                    // Unique ID within the lesson
    type: 'question-type',    // Type of question (see below)
    question: 'Your question text here',
    // ... additional fields based on type
    explanation: 'Explanation shown after answering'
}
```

## Question Types

### 1. Multiple Choice

Users select one correct answer from multiple options.

```javascript
{
    id: 1,
    type: 'multiple-choice',
    question: 'What does console.log() do?',
    options: [
        'Prints messages to the browser console',  // Index 0
        'Creates a new variable',                  // Index 1
        'Deletes code from your program',          // Index 2
        'Closes the browser window'                // Index 3
    ],
    correctAnswer: 0,  // Index of correct answer
    explanation: 'console.log() prints messages to the browser\'s console.'
}
```

### 2. Fill-in-the-Blank

Users complete missing parts of code or text.

**Single Blank:**
```javascript
{
    id: 2,
    type: 'fill-in-blank',
    question: 'Complete the code:',
    template: 'console.___("Hello!");',  // Use ___ for blanks
    blanks: [
        { 
            answer: 'log', 
            caseSensitive: true 
        }
    ],
    explanation: 'Use console.log() to print to console.'
}
```

**Multiple Blanks:**
```javascript
{
    id: 3,
    type: 'fill-in-blank',
    question: 'Fill in both quotes:',
    template: 'console.log(___Hello___);',
    blanks: [
        { 
            answer: '"', 
            alternatives: ["'"],  // Optional: accept alternatives
            caseSensitive: true 
        },
        { 
            answer: '"', 
            alternatives: ["'"],
            caseSensitive: true 
        }
    ],
    explanation: 'Strings must be wrapped in matching quotes.'
}
```

**Blank Options:**
- `answer` - The correct answer (required)
- `alternatives` - Array of alternative correct answers (optional)
- `caseSensitive` - Whether to check case (default: false)

### 3. Code Exercise

Users write and execute actual JavaScript code.

```javascript
{
    id: 4,
    type: 'code',
    question: 'Write code to print "Hello World" to the console.',
    solution: (output, code) => {
        // Return true if answer is correct
        return output.includes('Hello World');
    },
    explanation: 'Use console.log("Hello World"); to print the message.'
}
```

**Solution Function Parameters:**
- `output` - String containing all console.log output
- `code` - The actual code the user wrote

**Solution Function Examples:**

Check for specific output:
```javascript
solution: (output) => output.includes('expected text')
```

Check for specific code patterns:
```javascript
solution: (output, code) => {
    return code.includes('if') && 
           code.includes('else') &&
           output.includes('result');
}
```

Check output matches pattern:
```javascript
solution: (output) => {
    const attacks = (output.match(/Attack!/g) || []).length;
    return attacks === 5;
}
```

## Adding Questions to a Lesson

1. Open `lesson-data.js`
2. Find the lesson you want to add questions to
3. Add question objects to the `questions` array:

```javascript
{
    id: 'lesson_name',
    level: 'beginner',
    title: 'Lesson Title',
    objective: 'objective_name',
    explanation: `...`,
    questions: [
        {
            id: 1,
            type: 'multiple-choice',
            question: 'First question?',
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 0,
            explanation: 'Why A is correct'
        },
        {
            id: 2,
            type: 'fill-in-blank',
            question: 'Complete this:',
            template: 'let x = ___;',
            blanks: [{ answer: '5', caseSensitive: false }],
            explanation: 'Numbers don\'t need quotes'
        },
        {
            id: 3,
            type: 'code',
            question: 'Write code to...',
            solution: (output, code) => output.includes('expected'),
            explanation: 'Here\'s how to do it'
        }
        // Add more questions...
    ]
}
```

## Best Practices

### Question Design
- Write clear, concise questions
- Cover different aspects of the lesson concept
- Progress from easy to challenging
- Include 5-10 questions per lesson
- Mix question types for variety

### Explanations
- Always provide helpful explanations
- Explain WHY the answer is correct
- Reference the lesson content
- Keep explanations brief but informative

### Code Exercises
- Start with simple tasks
- Build complexity gradually
- Test for both output AND code patterns when needed
- Allow for multiple valid solutions when possible

### Fill-in-the-Blank
- Use alternatives for equivalent answers (e.g., both quote types)
- Set `caseSensitive: false` for keywords unless case matters
- Keep blanks short and focused

### Multiple Choice
- Make options clearly distinct
- Avoid trick questions
- Include plausible wrong answers
- Keep all options roughly the same length

## Testing Your Questions

After adding questions, test them by:

1. Starting the local server:
   ```bash
   python3 -m http.server 8080
   ```

2. Navigate to the lesson in your browser

3. Try each question with:
   - Correct answers
   - Incorrect answers
   - Edge cases
   - Alternative valid answers

4. Verify:
   - Feedback is clear and helpful
   - Navigation works correctly
   - Questions display properly
   - Code execution works (for code questions)

## Example: Complete Lesson

```javascript
{
    id: 'example_lesson',
    level: 'beginner',
    title: 'Example Lesson',
    objective: 'example',
    explanation: `
        <p>This lesson teaches you about X...</p>
        <pre><code>// Example code</code></pre>
    `,
    questions: [
        {
            id: 1,
            type: 'multiple-choice',
            question: 'What is X?',
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correctAnswer: 1,
            explanation: 'X is B because...'
        },
        {
            id: 2,
            type: 'fill-in-blank',
            question: 'Complete the X statement:',
            template: 'X is ___;',
            blanks: [{ answer: 'value', caseSensitive: false }],
            explanation: 'X requires this value because...'
        },
        {
            id: 3,
            type: 'code',
            question: 'Write code that does X.',
            solution: (output, code) => {
                return code.includes('X') && output.includes('result');
            },
            explanation: 'Use X to achieve this result.'
        }
    ]
}
```

## Troubleshooting

**Questions not showing:**
- Check that the lesson has a `questions` array
- Verify question objects have all required fields
- Check browser console for JavaScript errors

**Code execution fails:**
- Ensure solution function is valid JavaScript
- Check for syntax errors in the solution function
- Verify the function returns true/false

**Wrong validation:**
- Double-check correctAnswer index for multiple-choice
- Verify blank answers are correct (case sensitivity!)
- Test solution function logic with console.log

## Questions Structure is Modular

The system is designed to be easily extensible:
- All question rendering is in `lesson-view.js`
- Each question type has its own render function
- Adding new types requires implementing render + validation
- No changes needed to HTML structure
- CSS classes follow consistent naming

This makes it easy to add new features like:
- Drag-and-drop questions
- Matching questions
- True/False questions
- Short answer questions
- And more!
