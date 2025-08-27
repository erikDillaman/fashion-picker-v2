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
    
    updateFeedback();
}

// Function to handle weather selection
function updateWeather() {
    var weatherSelect = document.getElementById('weather-select');
    currentWeather = weatherSelect.value;
    
    updateFeedback();
}

// Function to handle accessory changes
function updateAccessories() {
    hasJacket = document.getElementById('jacket-check').checked;
    hasHat = document.getElementById('hat-check').checked;
    hasSunglasses = document.getElementById('sunglasses-check').checked;
    
    updateFeedback();
}

// Function to check criteria and update badges (triggered by button)
function checkCriteria() {
    checkAllBadges();
    updateFeedback();
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
    currentPalette = 'monochrome';
    hasJacket = false;
    hasHat = false;
    hasSunglasses = false;
    
    // Reset form elements
    document.getElementById('weather-select').value = '';
    document.getElementById('palette-slider').value = '1';
    document.getElementById('jacket-check').checked = false;
    document.getElementById('hat-check').checked = false;
    document.getElementById('sunglasses-check').checked = false;
    
    // Reset all badge displays
    loseBadge('rain-ready-badge');
    loseBadge('cozy-cool-badge');
    loseBadge('sun-smart-badge');
    loseBadge('monochrome-mood-badge');
    loseBadge('statement-style-badge');
    
    // Update displays
    updatePaletteDisplay();
    updateFeedback();
}

// Function to check all badge conditions
function checkAllBadges() {
    checkRainReady();
    checkCozyCool();
    checkSunSmart();
    checkMonochromeMood();
    checkStatementStyle();
}

// Badge checking functions - only earn badges, never lose them
function checkRainReady() {
    var shouldEarn = (currentWeather === 'rainy' && hasJacket);
    
    if (shouldEarn && !rainReadyBadge) {
        rainReadyBadge = true;
        earnBadge('rain-ready-badge');
    }
}

function checkCozyCool() {
    var shouldEarn = (currentWeather === 'cold' && hasJacket);
    
    if (shouldEarn && !cozyCoolBadge) {
        cozyCoolBadge = true;
        earnBadge('cozy-cool-badge');
    }
}

function checkSunSmart() {
    var shouldEarn = (currentWeather === 'sunny' && (hasHat || hasSunglasses));
    
    if (shouldEarn && !sunSmartBadge) {
        sunSmartBadge = true;
        earnBadge('sun-smart-badge');
    }
}

function checkMonochromeMood() {
    var accessoryCount = 0;
    if (hasHat) accessoryCount = accessoryCount + 1;
    if (hasSunglasses) accessoryCount = accessoryCount + 1;
    
    var shouldEarn = (currentPalette === 'monochrome' && accessoryCount <= 1);
    
    if (shouldEarn && !monochromeMoodBadge) {
        monochromeMoodBadge = true;
        earnBadge('monochrome-mood-badge');
    }
}

function checkStatementStyle() {
    var accessoryCount = 0;
    if (hasHat) accessoryCount = accessoryCount + 1;
    if (hasSunglasses) accessoryCount = accessoryCount + 1;
    
    var shouldEarn = (currentPalette === 'brights' && accessoryCount === 1);
    
    if (shouldEarn && !statementStyleBadge) {
        statementStyleBadge = true;
        earnBadge('statement-style-badge');
    }
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

// Function to update feedback panel
function updateFeedback() {
    var feedbackDiv = document.getElementById('feedback-content');
    var feedback = [];
    
    // Current selections summary
    var weatherText = currentWeather || 'Not selected';
    var paletteText = currentPalette;
    
    var accessories = [];
    if (hasJacket) accessories.push('Jacket');
    if (hasHat) accessories.push('Hat');
    if (hasSunglasses) accessories.push('Sunglasses');
    var accessoryText = accessories.length > 0 ? accessories.join(', ') : 'None selected';
    
    feedback.push('<h3>Your Current Look:</h3>');
    feedback.push('<p><strong>Weather:</strong> ' + weatherText + '</p>');
    feedback.push('<p><strong>Color Palette:</strong> ' + paletteText + '</p>');
    feedback.push('<p><strong>Accessories:</strong> ' + accessoryText + '</p>');
    
    // Badge progress and tips
    feedback.push('<h3>Badge Progress & Tips:</h3>');
    
    // Rain Ready tips
    if (currentWeather === 'rainy' && !hasJacket && !rainReadyBadge) {
        feedback.push('<div class="tip-item"><p> Add a jacket to earn the Rain Ready badge!</p></div>');
    } else if (currentWeather === 'rainy' && hasJacket && !rainReadyBadge) {
        feedback.push('<p> Rain Ready badge criteria met! Click "Check Criteria" to earn it!</p>');
    } else if (rainReadyBadge) {
        feedback.push('<p> Rain Ready badge already earned!</p>');
    }
    
    // Cozy Cool tips
    if (currentWeather === 'cold' && !hasJacket && !cozyCoolBadge) {
        feedback.push('<div class="tip-item"><p> Add a jacket to earn the Cozy Cool badge!</p></div>');
    } else if (currentWeather === 'cold' && hasJacket && !cozyCoolBadge) {
        feedback.push('<p> Cozy Cool badge criteria met! Click "Check Criteria" to earn it!</p>');
    } else if (cozyCoolBadge) {
        feedback.push('<p> Cozy Cool badge already earned!</p>');
    }
    
    // Sun Smart tips
    if (currentWeather === 'sunny' && !hasHat && !hasSunglasses && !sunSmartBadge) {
        feedback.push('<div class="tip-item"><p> Add a hat or sunglasses to earn the Sun Smart badge!</p></div>');
    } else if (currentWeather === 'sunny' && (hasHat || hasSunglasses) && !sunSmartBadge) {
        feedback.push('<p> Sun Smart badge criteria met! Click "Check Criteria" to earn it!</p>');
    } else if (sunSmartBadge) {
        feedback.push('<p> Sun Smart badge already earned!</p>');
    }
    
    // Monochrome Mood tips
    if (currentPalette === 'monochrome' && !monochromeMoodBadge) {
        var accessoryCount = 0;
        if (hasHat) accessoryCount = accessoryCount + 1;
        if (hasSunglasses) accessoryCount = accessoryCount + 1;
        
        if (accessoryCount > 1) {
            feedback.push('<div class="tip-item"><p> For Monochrome Mood, use 1 or fewer accessories (hat/sunglasses)!</p></div>');
        } else {
            feedback.push('<p> Monochrome Mood badge criteria met! Click "Check Criteria" to earn it!</p>');
        }
    } else if (monochromeMoodBadge) {
        feedback.push('<p> Monochrome Mood badge already earned!</p>');
    }
    
    // Statement Style tips
    if (currentPalette === 'brights' && !statementStyleBadge) {
        var accessoryCount = 0;
        if (hasHat) accessoryCount = accessoryCount + 1;
        if (hasSunglasses) accessoryCount = accessoryCount + 1;
        
        if (accessoryCount === 0) {
            feedback.push('<div class="tip-item"><p> Add exactly one accessory (hat or sunglasses) for Statement Style!</p></div>');
        } else if (accessoryCount > 1) {
            feedback.push('<div class="tip-item"><p> Use exactly one accessory (hat or sunglasses) for Statement Style!</p></div>');
        } else {
            feedback.push('<p> Statement Style badge criteria met! Click "Check Criteria" to earn it!</p>');
        }
    } else if (statementStyleBadge) {
        feedback.push('<p> Statement Style badge already earned!</p>');
    }
    
    // Default message if no specific tips
    if (feedback.length === 5) { // Only has the headers and current look
        feedback.push('<p>Make your selections and click "Check Criteria" to see badge progress!</p>');
    }
    
    feedbackDiv.innerHTML = feedback.join('');
}

// Function to set up all event listeners
function setupEventListeners() {
    // Weather dropdown
    document.getElementById('weather-select').onchange = updateWeather;
    
    // Palette slider
    document.getElementById('palette-slider').oninput = updatePaletteDisplay;
    
    // Accessory checkboxes
    document.getElementById('jacket-check').onchange = updateAccessories;
    document.getElementById('hat-check').onchange = updateAccessories;
    document.getElementById('sunglasses-check').onchange = updateAccessories;
    
    // Check criteria button
    document.getElementById('check-criteria-btn').onclick = checkCriteria;
    
    // Reset button
    document.getElementById('reset-btn').onclick = resetAll;
}

// Function to initialize the app
function initializeApp() {
    setupEventListeners();
    updatePaletteDisplay();
    updateFeedback();
}

// Start the app when page loads
window.onload = initializeApp;
