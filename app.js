// Main Application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize UI components
    if (window.uiComponents) {
        window.uiComponents.initializeHeader();
        window.uiComponents.initializeCodeEditor();
    } else {
        // Fallback if modules not loaded
        initializeFallback();
    }
    
    // Initialize game and terminal
    gameEngine.initGame();
    terminal.initTerminal();
});

// Fallback initialization if modules not loaded
function initializeFallback() {
    // Lessons button handler
    const lessonsButton = document.getElementById('lessonsButton');
    if (lessonsButton) {
        lessonsButton.addEventListener('click', () => {
            window.location.href = 'lessons.html';
        });
    }
    
    // Run Code button handler
    document.getElementById('runCode').addEventListener('click', function() {
        const code = document.getElementById('codeEditor').value;
        
        if (!code.trim()) {
            gameEngine.appendToGameplay('<p class="enemy">❌ Please write some code first!</p>');
            return;
        }
        
        gameEngine.appendToGameplay('<p class="highlight">Running your code...</p>');
        gameEngine.checkChallenge(code);
    });
    
    // Allow Ctrl+Enter to run code
    document.getElementById('codeEditor').addEventListener('keydown', function(event) {
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
            event.preventDefault();
            document.getElementById('runCode').click();
        }
    });
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js')
            .then(function(registration) {
                console.log('ServiceWorker registered:', registration.scope);
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}

// PWA Install prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install hint
    terminal.appendToTerminal('💡 Tip: You can install this app on your device!', 'success');
});

window.addEventListener('appinstalled', () => {
    terminal.appendToTerminal('App installed successfully! 🎉', 'success');
    deferredPrompt = null;
});
