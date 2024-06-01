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
                return obfuscateString(obj);
            } else if (Array.isArray(obj)) {
                return '[' + obj.map(obfuscateJson).join(',') + ']';
            } else if (typeof obj === 'object' && obj !== null) {
                const entries = Object.entries(obj).map(([key, value]) => 
                    obfuscateString(key) + ':' + obfuscateJson(value)
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
