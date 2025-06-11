// clock.js

let is24Hour = JSON.parse(localStorage.getItem('is24Hour')) ?? true;
let currentTheme = parseInt(localStorage.getItem('currentTheme')) || 1;
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

    document.getElementById('clock').textContent = `${hoursStr}:${minutes}:${seconds}`;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date').textContent = now.toLocaleDateString(undefined, options);

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    document.getElementById('timezone').textContent = `⏳ Timezone: ${timeZone}`;
}

function toggleFormat() {
    is24Hour = !is24Hour;
    localStorage.setItem('is24Hour', JSON.stringify(is24Hour));
    document.getElementById('format-toggle').textContent = is24Hour ? '24H' : '12H';
    updateClock();
}

function toggleTheme() {
    currentTheme = (currentTheme % themeCount) + 1;
    localStorage.setItem('currentTheme', currentTheme);
    document.body.className = `theme-${currentTheme}`;
}

document.getElementById('format-toggle').addEventListener('click', toggleFormat);
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

function init() {
    document.body.className = `theme-${currentTheme}`;
    document.getElementById('format-toggle').textContent = is24Hour ? '24H' : '12H';
    setInterval(updateClock, 1000);
    updateClock(); // Initial run
}

init();
