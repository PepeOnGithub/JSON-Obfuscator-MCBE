document.getElementById('obfuscate-btn').addEventListener('click', function() {
    const input = document.getElementById('json-input').value;
    let obfuscated = '';

    for (let i = 0; i < input.length; i++) {
        const code = input.charCodeAt(i).toString(16).padStart(4, '0');
        obfuscated += '\\u' + code;
    }

    document.getElementById('json-output').value = obfuscated;
});
