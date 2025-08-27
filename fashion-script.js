// Variables to track user selections
var currentWeather = '';
var currentPalette = 'neutrals'; // 0=neutrals, 1=monochrome, 2=brights
var hasJacket = false;
var hasHat = false;
var hasSunglasses = false;

// Badge status variables
var rainReadyBadge = false;
var cozyCoolBadge = false;
var sunSmartBadge = false;
var monochromeMoodBadge = false;
var statementStyleBadge = false;

// Function to update palette display
function updatePaletteDisplay() {
    var slider = document.getElementById('palette-slider');
    var display = document.getElementById('palette-value');
    
    var value = slider.value;
    
    if (value === '0') {
        currentPalette = 'neutrals';
        display.textContent = 'Neutrals';
        display.style.background = '#f3f4f6';
        display.style.color = '#6b7280';
    } else if (value === '1') {
        currentPalette = 'monochrome';
        display.textContent = 'Monochrome';
        display.style.background = '#374151';
        display.style.color = 'white';
    } else {
        currentPalette = 'brights';
        display.textContent = 'Brights';
        display.style.background = '#f59e0b';
        display.style.color = 'white';
    }
}

// Function to check criteria and update badges (triggered by button)
function checkCriteria() {
    // Get current selections
    currentWeather = document.getElementById('weather-select').value;
    hasJacket = document.getElementById('jacket-check').checked;
    hasHat = document.getElementById('hat-check').checked;
    hasSunglasses = document.getElementById('sunglasses-check').checked;
    
    // Check all badges with nested conditionals
    if (currentWeather === 'rainy') {
        if (hasJacket) {
            if (!rainReadyBadge) {
                rainReadyBadge = true;
                earnBadge('rain-ready-badge');
            }
        }
    }
    
    if (currentWeather === 'cold') {
        if (hasJacket) {
            if (!cozyCoolBadge) {
                cozyCoolBadge = true;
                earnBadge('cozy-cool-badge');
            }
        }
    }
    
    if (currentWeather === 'sunny') {
        if (hasHat || hasSunglasses) {
            if (!sunSmartBadge) {
                sunSmartBadge = true;
                earnBadge('sun-smart-badge');
            }
        }
    }
    
    if (currentPalette === 'monochrome') {
        var accessoryCount = 0;
        if (hasHat) {
            accessoryCount = accessoryCount + 1;
        }
        if (hasSunglasses) {
            accessoryCount = accessoryCount + 1;
        }
        
        if (accessoryCount <= 1) {
            if (!monochromeMoodBadge) {
                monochromeMoodBadge = true;
                earnBadge('monochrome-mood-badge');
            }
        }
    }
    
    if (currentPalette === 'brights') {
        var accessoryCount = 0;
        if (hasHat) {
            accessoryCount = accessoryCount + 1;
        }
        if (hasSunglasses) {
            accessoryCount = accessoryCount + 1;
        }
        
        if (accessoryCount === 1) {
            if (!statementStyleBadge) {
                statementStyleBadge = true;
                earnBadge('statement-style-badge');
            }
        }
    }
}

// Function to reset all badges and selections
function resetAll() {
    // Reset badge status
    rainReadyBadge = false;
    cozyCoolBadge = false;
    sunSmartBadge = false;
    monochromeMoodBadge = false;
    statementStyleBadge = false;
    
    // Reset selections
    currentWeather = '';
    currentPalette = 'neutrals';
    hasJacket = false;
    hasHat = false;
    hasSunglasses = false;
    
    // Reset form elements
    document.getElementById('weather-select').value = '';
    document.getElementById('palette-slider').value = '0';
    document.getElementById('jacket-check').checked = false;
    document.getElementById('hat-check').checked = false;
    document.getElementById('sunglasses-check').checked = false;
    
    // Reset all badge displays
    loseBadge('rain-ready-badge');
    loseBadge('cozy-cool-badge');
    loseBadge('sun-smart-badge');
    loseBadge('monochrome-mood-badge');
    loseBadge('statement-style-badge');
    
    // Update display
    updatePaletteDisplay();
}

// Function to visually show a badge as earned
function earnBadge(badgeId) {
    var badge = document.getElementById(badgeId);
    badge.className = 'badge earned';
    
    var statusText = badge.querySelector('.badge-status');
    statusText.textContent = 'Earned!';
}

// Function to visually show a badge as not earned
function loseBadge(badgeId) {
    var badge = document.getElementById(badgeId);
    badge.className = 'badge';
    
    var statusText = badge.querySelector('.badge-status');
    statusText.textContent = 'Not Earned';
}

// Function to set up event listeners
function setupEventListeners() {
    // Palette slider
    document.getElementById('palette-slider').oninput = updatePaletteDisplay;
    
    // Check criteria button
    document.getElementById('check-criteria-btn').onclick = checkCriteria;
    
    // Reset button
    document.getElementById('reset-btn').onclick = resetAll;
}

// Function to initialize the app
function initializeApp() {
    setupEventListeners();
    document.getElementById('palette-slider').value = '0';
    updatePaletteDisplay();
}

// Start the app when page loads
window.onload = initializeApp;
