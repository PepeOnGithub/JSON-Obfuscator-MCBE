document.getElementById('obfuscate-btn').addEventListener('click', function() {
    const input = document.getElementById('json-input').value;
    let obfuscated = '';

    const skipChars = ['{', '}', '[', ']', ',', ':'];

    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        if (skipChars.includes(char)) {
            obfuscated += char;
        } else {
            const code = char.charCodeAt(0).toString(16).padStart(4, '0');
            obfuscated += '\\u' + code;
        }
    }

    document.getElementById('json-output').value = obfuscated;
});
