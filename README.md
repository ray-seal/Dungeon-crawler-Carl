# Dungeon Crawler Carl 🏰

A Progressive Web App (PWA) that teaches JavaScript through an interactive text-based dungeon crawler adventure!

## Features

- 🎮 **Interactive Dungeon Crawler**: Explore rooms, solve puzzles, and defeat enemies
- 💻 **Learn JavaScript**: Write real JavaScript code to progress through the game
- 📱 **PWA Support**: Install on mobile devices for offline play
- 🖥️ **Terminal Interface**: Use terminal commands (cd, ls, sudo, etc.) to navigate
- 🎯 **Code Challenges**: Practice JavaScript concepts like variables, loops, functions, arrays, and objects
- 🗺️ **Multiple Rooms**: Entrance, corridors, armory, puzzle chamber, treasure room, and boss chamber

## How to Play

1. **Read the Challenge**: Each room presents a JavaScript coding challenge
2. **Write Code**: Use the code editor to write your solution
3. **Run Code**: Click "Run Code" or press Ctrl+Enter to execute your code
4. **Navigate**: Use terminal commands like `cd north`, `cd south`, `cd east`, `cd west` to move between rooms
5. **Get Help**: Type `help` in the terminal for available commands, or `hint` for challenge hints

## Terminal Commands

- `help` - Show all available commands
- `cd [direction]` - Move to another room (north, south, east, west)
- `ls` / `dir` - List exits from current room
- `hint` - Get a hint for the current challenge
- `inventory` - Show your items
- `status` - Display your health, level, and XP
- `sudo heal` - Restore health (requires level 2+)
- `look` - Examine current room
- `clear` - Clear the terminal
- `whoami` - Show player info

## Deploy to Vercel

1. Fork this repository
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with default settings
4. Your app will be live!

## Local Development

Simply open `index.html` in a web browser, or serve it with a local web server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then open http://localhost:8000 in your browser.

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Service Worker API (for PWA functionality)
- Web App Manifest

## Learning Objectives

Players will learn:
- JavaScript syntax and basics
- Variables and data types
- Loops and iteration
- Functions
- Arrays and array methods
- Objects
- Problem-solving with code

## License

MIT License - feel free to use and modify!

## Credits

Created as an educational tool to make learning JavaScript fun and interactive.