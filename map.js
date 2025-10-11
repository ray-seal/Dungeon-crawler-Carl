// Dungeon Map Module - Handles the dungeon map visualization

// Map Configuration
const MAP_CONFIG = {
    roomSize: 60,          // Size of each room square in pixels
    padding: 20,           // Padding around the map
    visibilityRadius: 10,  // 10m visibility radius
    scale: 6               // 1 grid unit = ~6 pixels (for 10m radius)
};

// Initialize map
function initializeMap() {
    const mapButton = document.getElementById('mapButton');
    const mapModal = document.getElementById('mapModal');
    const closeMapButton = document.getElementById('closeMap');
    
    if (mapButton) {
        mapButton.addEventListener('click', openMap);
    }
    
    if (closeMapButton) {
        closeMapButton.addEventListener('click', closeMap);
    }
    
    // Close map when clicking outside
    if (mapModal) {
        mapModal.addEventListener('click', function(event) {
            if (event.target === mapModal) {
                closeMap();
            }
        });
    }
}

// Open map modal
function openMap() {
    const mapModal = document.getElementById('mapModal');
    if (mapModal) {
        mapModal.style.display = 'flex';
        updateMap();
    }
}

// Close map modal
function closeMap() {
    const mapModal = document.getElementById('mapModal');
    if (mapModal) {
        mapModal.style.display = 'none';
    }
}

// Update and render the map
function updateMap() {
    const canvas = document.getElementById('mapCanvas');
    if (!canvas || !window.gameEngine) return;
    
    const ctx = canvas.getContext('2d');
    const gameState = window.gameEngine.gameState;
    const rooms = window.gameEngine.rooms;
    
    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Calculate map bounds
    const bounds = calculateMapBounds(rooms);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Draw all explored rooms and connections
    drawRooms(ctx, rooms, gameState, centerX, centerY, bounds);
    
    // Draw visibility circle around player
    drawVisibilityCircle(ctx, rooms, gameState, centerX, centerY, bounds);
    
    // Draw player position
    drawPlayer(ctx, rooms, gameState, centerX, centerY, bounds);
}

// Calculate bounds of the map
function calculateMapBounds(rooms) {
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    
    for (const roomId in rooms) {
        const room = rooms[roomId];
        if (room.coordinates) {
            minX = Math.min(minX, room.coordinates.x);
            maxX = Math.max(maxX, room.coordinates.x);
            minY = Math.min(minY, room.coordinates.y);
            maxY = Math.max(maxY, room.coordinates.y);
        }
    }
    
    return { minX, maxX, minY, maxY };
}

// Convert room coordinates to canvas coordinates
function roomToCanvas(roomX, roomY, centerX, centerY, bounds) {
    const offsetX = (roomX - (bounds.minX + bounds.maxX) / 2) * MAP_CONFIG.roomSize;
    const offsetY = (roomY - (bounds.minY + bounds.maxY) / 2) * MAP_CONFIG.roomSize;
    
    return {
        x: centerX + offsetX,
        y: centerY + offsetY
    };
}

// Draw rooms on the map
function drawRooms(ctx, rooms, gameState, centerX, centerY, bounds) {
    const exploredRooms = gameState.exploredRooms || ['entrance'];
    
    // Draw connections first (under rooms)
    for (const roomId in rooms) {
        if (!exploredRooms.includes(roomId)) continue;
        
        const room = rooms[roomId];
        const roomPos = roomToCanvas(room.coordinates.x, room.coordinates.y, centerX, centerY, bounds);
        
        // Draw connections to adjacent rooms
        for (const direction in room.exits) {
            const exitRoomId = room.exits[direction];
            const exitRoom = rooms[exitRoomId];
            
            if (!exitRoom || !exitRoom.coordinates) continue;
            
            const exitPos = roomToCanvas(exitRoom.coordinates.x, exitRoom.coordinates.y, centerX, centerY, bounds);
            
            // Draw line connecting rooms
            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(roomPos.x, roomPos.y);
            ctx.lineTo(exitPos.x, exitPos.y);
            ctx.stroke();
            
            // Draw door indicator at midpoint
            const midX = (roomPos.x + exitPos.x) / 2;
            const midY = (roomPos.y + exitPos.y) / 2;
            
            // Check if door is locked
            const isLocked = room.locked && room.locked[direction] && 
                           !gameState.completedChallenges.includes(room.locked[direction]);
            
            ctx.fillStyle = isLocked ? '#ff0000' : '#00ff00';
            ctx.beginPath();
            ctx.arc(midX, midY, 4, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Draw rooms
    for (const roomId in rooms) {
        if (!exploredRooms.includes(roomId)) continue;
        
        const room = rooms[roomId];
        const pos = roomToCanvas(room.coordinates.x, room.coordinates.y, centerX, centerY, bounds);
        
        // Draw room square
        const halfSize = MAP_CONFIG.roomSize / 2 - 5;
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2;
        ctx.strokeRect(pos.x - halfSize, pos.y - halfSize, halfSize * 2, halfSize * 2);
        
        // Fill room with semi-transparent background
        ctx.fillStyle = 'rgba(0, 255, 0, 0.1)';
        ctx.fillRect(pos.x - halfSize, pos.y - halfSize, halfSize * 2, halfSize * 2);
        
        // Draw room name
        ctx.fillStyle = '#00ff00';
        ctx.font = '10px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(room.name.substring(0, 12), pos.x, pos.y - halfSize - 10);
        
        // Draw enemy marker if enemy present
        if (room.enemy && !gameState.defeatedEnemies.includes(room.enemy.name)) {
            drawCross(ctx, pos.x, pos.y, 8, '#ff0000', 2);
        }
        
        // Draw NPC marker (future expansion - currently none defined)
        // This is a placeholder for NPCs that might be added later
        if (room.npc && !room.npc.talked) {
            drawCross(ctx, pos.x, pos.y, 8, '#ffffff', 2);
        }
    }
}

// Draw visibility circle around player
function drawVisibilityCircle(ctx, rooms, gameState, centerX, centerY, bounds) {
    const currentRoom = rooms[gameState.currentRoom];
    if (!currentRoom || !currentRoom.coordinates) return;
    
    const pos = roomToCanvas(currentRoom.coordinates.x, currentRoom.coordinates.y, centerX, centerY, bounds);
    
    // 10m radius = 10 * scale pixels
    const radius = 10 * MAP_CONFIG.scale;
    
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
}

// Draw player position
function drawPlayer(ctx, rooms, gameState, centerX, centerY, bounds) {
    const currentRoom = rooms[gameState.currentRoom];
    if (!currentRoom || !currentRoom.coordinates) return;
    
    const pos = roomToCanvas(currentRoom.coordinates.x, currentRoom.coordinates.y, centerX, centerY, bounds);
    
    // Draw green cross for player
    drawCross(ctx, pos.x, pos.y, 12, '#00ff00', 3);
}

// Helper function to draw a cross
function drawCross(ctx, x, y, size, color, lineWidth) {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    
    ctx.beginPath();
    ctx.moveTo(x - size, y);
    ctx.lineTo(x + size, y);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x, y + size);
    ctx.stroke();
}

// Export functions
window.dungeonMap = {
    initializeMap,
    openMap,
    closeMap,
    updateMap
};
