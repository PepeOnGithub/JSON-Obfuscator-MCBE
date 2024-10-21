// Obfuscation functionality
document.getElementById('obfuscate-btn').addEventListener('click', function() {
    const input = document.getElementById('json-input').value;
    try {
        const jsonObject = JSON.parse(input);
        const obfuscatedJson = obfuscateJson(jsonObject);
        document.getElementById('json-output').value = obfuscatedJson.replace(/\\\\/g, '\\');
    } catch (e) {
        alert('Invalid JSON input.');
    }
});

document.getElementById('copy-btn').addEventListener('click', function() {
    const output = document.getElementById('json-output');
    output.select();
    document.execCommand('copy');
    alert('Copied to clipboard!');
});

function obfuscateJson(obj) {
    if (typeof obj === 'string') {
        return '"' + obfuscateString(obj) + '"';
    } else if (Array.isArray(obj)) {
        return '[' + obj.map(obfuscateJson).join(',') + ']';
    } else if (typeof obj === 'object' && obj !== null) {
        const entries = Object.entries(obj).map(([key, value]) => 
            '"' + obfuscateString(key) + '":' + obfuscateJson(value)
        );
        return '{' + entries.join(',') + '}';
    }
    return JSON.stringify(obj);
}

function obfuscateString(str) {
    let obfuscated = '';
    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i).toString(16).padStart(4, '0');
        obfuscated += '\\u' + code;
    }
    return obfuscated;
}

const container = document.querySelector('.container');

toggleButton.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    body.classList.toggle('dark-mode', isDarkMode);
    container.classList.toggle('dark-mode', isDarkMode);  // Add this line
    toggleButton.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Dark mode toggle functionality
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;
let isDarkMode = false;

toggleButton.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    body.classList.toggle('dark-mode', isDarkMode);
    toggleButton.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});
