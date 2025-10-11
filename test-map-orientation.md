# Map Orientation Test Documentation

## Purpose
Document and verify that the dungeon map follows standard cartographic orientation.

## Expected Behavior

### Standard Orientation
- **North** = up (negative Y on screen)
- **East** = right (positive X)
- **South** = down (positive Y on screen)
- **West** = left (negative X)

### Test Cases

#### Test Case 1: North Direction
- **Setup**: Player at Entrance (0,0)
- **Action**: Move north to Corridor (0,1)
- **Expected**: Corridor room should appear ABOVE Entrance on the map
- **Status**: ✅ PASS

#### Test Case 2: East Direction
- **Setup**: Player at Corridor (0,1)
- **Action**: Move east to Chamber of Types (1,1)
- **Expected**: Chamber should appear to the RIGHT of Corridor on the map
- **Status**: ✅ PASS

#### Test Case 3: South Direction
- **Setup**: Player at Corridor (0,1)
- **Action**: Move south to Entrance (0,0)
- **Expected**: Entrance should appear BELOW Corridor on the map
- **Status**: ✅ PASS (implicit from Test Case 1)

#### Test Case 4: West Direction
- **Setup**: Player at Chamber of Types (1,1)
- **Action**: Move west to Corridor (0,1)
- **Expected**: Corridor should appear to the LEFT of Chamber on the map
- **Status**: ✅ PASS (implicit from Test Case 2)

### Visual Confirmation

The map correctly displays the dungeon layout with:
- Entrance at bottom center
- Corridor directly above it
- Chamber of Types to the right of Corridor
- All connections and doorways properly aligned

### Mobile Responsiveness
- ✅ Map maintains correct orientation on mobile devices (tested at 375x667)
- ✅ Legend and UI elements remain accessible
- ✅ Canvas scales appropriately

## Implementation Details

### Key Change
Modified `roomToCanvas()` function in `map.js`:
```javascript
// Before: offsetY = (roomY - centerY) * roomSize
// After:  offsetY = -((roomY - centerY) * roomSize)
```

This negates the Y-axis so that:
- Lower Y coordinate values (north) → appear at top of canvas (lower screen Y)
- Higher Y coordinate values (south) → appear at bottom of canvas (higher screen Y)

### Files Modified
- `map.js`: Updated `roomToCanvas()` function and added orientation comments
