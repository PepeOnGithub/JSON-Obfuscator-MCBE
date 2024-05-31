<!DOCTYPE html>
<html>
<head>
    <title>JSON Obfuscator</title>
</head>
<body>
    <textarea id="json-input" rows="10" cols="50"></textarea><br>
    <button id="obfuscate-btn">Obfuscate JSON</button><br>
    <textarea id="json-output" rows="10" cols="50"></textarea>

    <script>
        document.getElementById('obfuscate-btn').addEventListener('click', function() {
            const input = document.getElementById('json-input').value;
            try {
                const jsonObject = JSON.parse(input);
                const obfuscatedObject = obfuscateJsonObject(jsonObject);
                const obfuscatedJson = JSON.stringify(obfuscatedObject, null, 4);
                document.getElementById('json-output').value = obfuscatedJson.replace(/\\\\/g, '\\');
            } catch (e) {
                alert('Invalid JSON input.');
            }
        });

        function obfuscateJsonObject(obj) {
            if (typeof obj === 'string') {
                return obfuscateString(obj);
            } else if (Array.isArray(obj)) {
                return obj.map(obfuscateJsonObject);
            } else if (typeof obj === 'object' && obj !== null) {
                const newObj = {};
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        const obfuscatedKey = obfuscateString(key);
                        newObj[obfuscatedKey] = obfuscateJsonObject(obj[key]);
                    }
                }
                return newObj;
            }
            return obj;
        }

        function obfuscateString(str) {
            let obfuscated = '';
            for (let i = 0; i < str.length; i++) {
                const code = str.charCodeAt(i).toString(16).padStart(4, '0');
                obfuscated += '\\u' + code;
            }
            return obfuscated;
        }
    </script>
</body>
</html>
