//1.1
function toSentenceCase(str) {
    if (typeof str != 'string') {
        return null;
    }

    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

//1.2
function correctSpaces(str) {
    if (typeof str != 'string') {
        return null;
    }

    let marks = [',', '.', '!', '?', ';', ':', '…'];
    let parts = str.split(' ').filter(part => part);

    for (let mark of marks) {
        while (parts.includes(mark)) {
            let i = parts.indexOf(mark);
            parts[i - 1] = parts[i - 1] + mark;
            parts.splice(i, 1);
        }

        for (let i = 0; i < parts.length; i++) {
            if (parts[i].startsWith(mark)) {
                parts[i - 1] = parts[i - 1] + mark;
                parts[i] = parts[i].slice(1)
            }
            let pos = -1;
            while ((pos = parts[i].slice(0, parts[i].length - 1).indexOf(mark, pos + 1)) != -1) {
                parts[i] = parts[i].slice(0, pos + 1) + ' ' + parts[i].slice(pos + 1);
            }
        }
    }

    let result = parts.join(' ');
    return result;
}

//1.3
function countWords(str) {
    if (typeof str != 'string') {
        return null;
    }

    let isLastLetter = false;
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if ((str[i].toUpperCase() === str[i].toLowerCase() && !isFinite(str[i]) && str[i] != '-')
        || str[i] === ' ') {
            isLastLetter = false;
            continue;
        }
        if (!isLastLetter) {
            count++;
            isLastLetter = true;
        }
    }
    return count;
}

//1.4
function countUnique(str) {
    if (typeof str != 'string') {
        return null;
    }

    let fin = str + '.';
    let word = '';
    let result = new Map();
    for (let i = 0; i < fin.length; i++) {
        if ((fin[i].toUpperCase() === fin[i].toLowerCase() && !isFinite(fin[i]) && fin[i] != '-')
        || fin[i] === ' ') {
            if(word) {
                let key = word.toLowerCase();
                let count = result.get(key);
                if (!count) {
                    count = 0;
                }
                result.set(key, ++count);
                word = '';
            }
            continue;
        }
        word += fin[i];
    }
    return result;
}