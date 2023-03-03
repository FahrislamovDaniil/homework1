function bigAdd(firstNum, secondNum) {
    let x = firstNum;
    let y = secondNum;

    if (typeof x != 'string' || typeof y != 'string' || x === '' || y === '' || !isFinite(x) || !isFinite(y)) {
        return null
    }

    if (x.includes('.') ||  y.includes('.')) {
        let isNegative = false;
        if (x.charAt(0) === '-' && y.charAt(0) != '-') {
            return bigSub(y, x.slice(1));
        } else if (x.charAt(0) != '-' && y.charAt(0) === '-') {
            return bigSub(x, y.slice(1));
        } else if (x.charAt(0) === '-' && y.charAt(0) === '-') {
            x = x.slice(1);
            y = y.slice(1);
            isNegative = true;
        }

        x = formatToNumber(x);
        y = formatToNumber(y);

        let xParts = x.split('.');
        let yParts = y.split('.');
        if(xParts.length < 2) {
            xParts.push('');
        }
        if(yParts.length < 2) {
            yParts.push('');
        }

        if (xParts[0].length < yParts[0].length) {
            while (xParts[0].length != yParts[0].length) {
                xParts[0] = '0' + xParts[0];
            } 
        } else if (xParts[0].length > yParts[0].length) {
            while (xParts[0].length != yParts[0].length) {
                yParts[0] = '0' + yParts[0];
            }
        }

        if (xParts[1].length < yParts[1].length) {
            while (xParts[1].length != yParts[1].length) {
                xParts[1] += '0';
            } 
        } else if (xParts[1].length > yParts[1].length) {
            while (xParts[1].length != yParts[1].length) {
                yParts[1] += '0';
            }
        }

        let tmp = 0;
        let result = '';
        for (let i = xParts[1].length - 1; i >= 0; i--) {
            let ans = tmp + +xParts[1][i] + +yParts[1][i];
            if(ans >= 10) {
                result = (ans - 10) + result;
                tmp = 1;
            } else {
                result = ans + result;
                tmp = 0
            }
        }

        result = '.' + result;

        for (let i = xParts[0].length - 1; i >= 0; i--) {
            let ans = tmp + +xParts[0][i] + +yParts[0][i];
            if(ans >= 10 && i != 0) {
                result = (ans - 10) + result;
                tmp = 1;
            } else {
                result = ans + result;
                tmp = 0
            }
        }

        result = formatToNumber(result);

        if (isNegative) {
            result = '-' +  result;
        }

        return result;
    }
    return (BigInt(x) + BigInt(y)).toString();
}

function bigSub(firstNum, secondNum) {
    let x = firstNum;
    let y = secondNum;

    if (typeof x != 'string' || typeof y != 'string' || x === '' || y === '' || !isFinite(x) || !isFinite(y)) {
        return null
    }

    if (x.includes('.') ||  y.includes('.')) {

        if (x.charAt(0) === '-' && y.charAt(0) != '-') {
            return bigAdd(x, '-' + y);
        } else if (x.charAt(0) != '-' && y.charAt(0) === '-') {
            return bigAdd(x, y.slice(1));
        } else if (x.charAt(0) === '-' && y.charAt(0) === '-') {
            return bigSub(y.slice(1), x.slice(1));
        }

        x = formatToNumber(x);
        y = formatToNumber(y);

        let xParts = x.split('.');
        let yParts = y.split('.');
        if(xParts.length < 2) {
            xParts.push('');
        }
        if(yParts.length < 2) {
            yParts.push('');
        }

        if (BigInt(xParts[0]) < BigInt(yParts[0])) {
            return '-' + bigSub(y, x);
        }
        if (BigInt(xParts[0]) === BigInt(yParts[0])) {
            if (BigInt(xParts[1]) < BigInt(yParts[1])) {
                return '-' + bigSub(y, x);
            }
        }

        if (xParts[0].length < yParts[0].length) {
            while (xParts[0].length != yParts[0].length) {
                xParts[0] = '0' + xParts[0];
            } 
        } else if (xParts[0].length > yParts[0].length) {
            while (xParts[0].length != yParts[0].length) {
                yParts[0] = '0' + yParts[0];
            }
        }

        if (xParts[1].length < yParts[1].length) {
            while (xParts[1].length != yParts[1].length) {
                xParts[1] += '0';
            } 
        } else if (xParts[1].length > yParts[1].length) {
            while (xParts[1].length != yParts[1].length) {
                yParts[1] += '0';
            }
        }

        let tmp = 0;
        let result = '';
        for (let i = xParts[1].length - 1; i >= 0; i--) {
            if (+xParts[1][i] - tmp < +yParts[1][i]) {
                result = (10 + +xParts[1][i] - tmp - +yParts[1][i]) + result;
                tmp = 1;
            } else {
                result = (+xParts[1][i] - tmp - +yParts[1][i]) + result;
                tmp = 0;
            }
        }

        result = '.' + result;

        for (let i = xParts[0].length - 1; i >= 0; i--) {
            if (+xParts[0][i] - tmp < +yParts[0][i]) {
                result = (10 + +xParts[0][i] - tmp - +yParts[0][i]) + result;
                tmp = 1;
            } else {
                result = (+xParts[0][i] - tmp - +yParts[0][i]) + result;
                tmp = 0;
            }
        }

        return formatToNumber(result);
    }
    return (BigInt(x) - BigInt(y)).toString();
}

function bigMul(firstNum, secondNum) {
    let x = firstNum;
    let y = secondNum;

    if (typeof x != 'string' || typeof y != 'string' || x === '' || y === '' || !isFinite(x) || !isFinite(y)) {
        return null
    }

    if (x.includes('.') ||  y.includes('.')) {
        let isNegative = false;

        if (x.charAt(0) === '-' && y.charAt(0) != '-') {
            x = x.slice(1);
            isNegative = true;
        } else if (x.charAt(0) != '-' && y.charAt(0) === '-') {
            y = y.slice(1);
            isNegative = true;
        } else if (x.charAt(0) === '-' && y.charAt(0) === '-') {
            x = x.slice(1);
            y = y.slice(1);
        }

        x = formatToNumber(x);
        y = formatToNumber(y);

        let posX = 0;
        let posY = 0;
        if (x.includes('.')) {
            posX = x.slice(x.indexOf('.') + 1).length;
        }
        if (y.includes('.')) {
            posY = y.slice(y.indexOf('.') + 1).length;
        }

        let intX = x.split('.').join('');
        let intY = y.split('.').join('');

        let result = (BigInt(intX) * BigInt(intY)).toString();
        if (result.length < (posX + posY)) {
            while (result.length != (posX + posY)) {
                result = '0' + result; 
            }
        }
        result = result.slice(0, result.length - (posX + posY)) + '.' + result.slice(result.length - (posX + posY));

        if (result.charAt(0) === '.') {
            result = '0' + result;
        }

        result = formatToNumber(result);

        if (isNegative) {
            result = '-' + result;
        }

        return result;
    }
    return (BigInt(x) * BigInt(y)).toString();
}

function bigDiv(firstNum, secondNum, accuracy = 40) {
    let x = firstNum;
    let y = secondNum;

    if (typeof x != 'string' || typeof y != 'string' || x === '' || y === '' || !isFinite(x) || !isFinite(y)) {
        return null
    }
    if (!Number.isInteger(accuracy)) {
        return null;
    }

    let isNegative = false;

    if (x.charAt(0) === '-' && y.charAt(0) != '-') {
        x = x.slice(1);
        isNegative = true;
    } else if (x.charAt(0) != '-' && y.charAt(0) === '-') {
        y = y.slice(1);
        isNegative = true;
    } else if (x.charAt(0) === '-' && y.charAt(0) === '-') {
        x = x.slice(1);
        y = y.slice(1);
    }

    x = formatToNumber(x);
    y = formatToNumber(y);

    if (x.includes('.') ||  y.includes('.')) {
        xParts = x.split('.');
        yParts = y.split('.');

        if(xParts.length < 2) {
            xParts.push('');
        }
        if(yParts.length < 2) {
            yParts.push('');
        }

        if (xParts[1].length < yParts[1].length) {
            while (xParts[1].length != yParts[1].length) {
                xParts[1] += '0'; 
            }
        } else if (yParts[1].length < xParts[1].length) {
            while (xParts[1].length != yParts[1].length) {
                yParts[1] += '0'; 
            }
        }

        x = xParts.join('');
        y = yParts.join('');

        while (x.charAt(0) === '0') {
            x = x.slice(1);
        }
        while (y.charAt(0) === '0') {
            y = y.slice(1);
        }
    }

    if (BigInt(y).toString() === '0') {
        return null;
    }

    let result = (BigInt(x) / BigInt(y)).toString();
    let remainder = (BigInt(x) - BigInt(y) * BigInt(result)).toString();

    if (remainder === '0') {
        return result;
    }

    let pos = result.length;
    if (result === '0') {
        pos = 0;
    }

    let currAccuracy = accuracy;
    let zeros = 0;

    while (remainder != '0' && currAccuracy > 0) {
        currAccuracy--;

        x += '0';
        result = (BigInt(x) / BigInt(y)).toString();
        if (result === '0') {
            zeros++;
        }
        remainder = (BigInt(x) - BigInt(y) * BigInt(result)).toString();
    }

    while (zeros != 0) {
        result = '0' + result;
        zeros--;
    }

    result = result.slice(0, pos) + '.' + result.slice(pos);
    if (result.charAt(0) === '.') {
        result = '0' + result;
    }

    result = formatToNumber(result);

    if (isNegative) {
        result = '-' + result;
    }

    return result;
}

function formatToNumber(number) {
    let x = number;

    x = x.split('+').join('');
    if (x.includes('.')) {
        while(x.charAt(0) === '0' && x.charAt(1) != '.') {
            x = x.slice(1);
        }

        while (x.charAt(x.length - 1) === '0' && x.charAt(x.length - 2) != '.') {
            x = x.slice(0, x.length - 1);
        }
        return x;
    }

    while(x.charAt(0) === '0' && x.length != 1) {
        x = x.slice(1);
    }
    return x;
}