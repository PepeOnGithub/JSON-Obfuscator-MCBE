document.getElementById('obfuscate-btn').addEventListener('click', function() {
    const input = document.getElementById('json-input').value;
    let obfuscated = '';
    let insideQuotes = false;

    const skipChars = ['{', '}', '[', ']', ',', ':', '\n', '\r', ' '];

    for (let i = 0; i < input.length; i++) {
        const char = input[i];

        if (char === '"') {
            insideQuotes = !insideQuotes; 
            obfuscated += char;
            continue;
        }

        if (insideQuotes) {
            const code = char.charCodeAt(0).toString(16).padStart(4, '0');
            obfuscated += '\\u' + code;
        } else if (skipChars.includes(char)) {
            obfuscated += char;
        } else {
            obfuscated += char;
        }
    }

    document.getElementById('json-output').value = obfuscated;
});
