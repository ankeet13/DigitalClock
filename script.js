let is24Hour = true;
let currentTheme = 1;
const themeCount = 3;

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    if (!is24Hour) {
        hours = hours % 12 || 12;
    }
    const hoursStr = String(hours).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const timeString = `${hoursStr}:${minutes}:${seconds}`;
    document.getElementById('clock').textContent = timeString;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date').textContent = now.toLocaleDateString(undefined, options);
}

document.getElementById('format-toggle').addEventListener('click', () => {
    is24Hour = !is24Hour;
    document.getElementById('format-toggle').textContent = is24Hour ? '24H' : '12H';
    updateClock();
});

document.getElementById('theme-toggle').addEventListener('click', () => {
    currentTheme = currentTheme % themeCount + 1;
    document.body.className = `theme-${currentTheme}`;
});

// Update every second
setInterval(updateClock, 1000);
updateClock(); // Initial call
