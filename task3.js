class Product {
    name;
    price;
    quantity;
    description;

    constructor(name, price, quantity, description) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
    }
}

let products = [
    new Product('fdfirst', 2, 6, 'abc'),
    new Product('dfsecond', 2, 6, 'deabc'),
    new Product('thirdfd', 2, 8, 'fgcabc'),
    new Product('fdfourth', 2, 5, 'hiabc'),
    new Product('fiffdth', 1, 6, 'gkabc'),
    new Product('fdsixth', 2, 6, 'labcmn'),
    new Product('sevfdenth', 2, 5, 'oabcp')
];

function doQuery(query, products) {
    if (typeof query != 'string' || !query || !Array.isArray(products)) {
        return null;
    }
    for(let product of products) {
        if(!(product instanceof Product)) {
            return null;
        }
    }
    if (products.length < 1) {
        return [];
    }
 
    let result = products.concat();
    let conditions = query.split('&');
    for (let condition of conditions) {
        let parts = condition.split('-');
        if (parts.length > 3 || parts.length < 2) {
            return null;
        }

        let subject = parts[0];
        if (subject != 'name' && subject != 'price' && subject != 'quantity' && subject != 'description') {
            return null;
        }
        
        switch(parts[1]) {
            case 'contains':
                if (parts.length != 3 || typeof products[0][subject] != 'string') {
                    return null;
                }
                    
                for (let i = 0; i < result.length; i++) {
                    let product = result[i];
                    if (!product[subject].includes(parts[2])) {
                        result.splice(i, 1);
                        i--;
                    }
                }
                break;
            case 'starts':
                if (parts.length != 3 || typeof products[0][subject] != 'string') {
                    return null;
                }

                for (let i = 0; i < result.length; i++) {
                    let product = result[i];
                    if (!product[subject].startsWith(parts[2])) {
                        result.splice(i, 1);
                        i--;
                    }
                }
                break;
            case 'ends':
                if (parts.length != 3 || typeof products[0][subject] != 'string') {
                    return null;
                }

                for (let i = 0; i < result.length; i++) {
                    let product = result[i];
                    if (!product[subject].endsWith(parts[2])) {
                        result.splice(i, 1);
                        i--;
                    }
                }
                break;
            default:
                if (parts.length != 2 || typeof products[0][subject] != 'number') {
                    return null;
                }
                let exp = parts[1];
                switch (exp.charAt(0)) {
                    case '<':
                        if (exp.charAt(1) === '=') {
                            let value = exp.slice(2);
                            if (!isFinite(value)) {
                                return null;
                            }

                            for (let i = 0; i < result.length; i++) {
                                let product = result[i];
                                if (!(product[subject] <= +value)) {
                                    result.splice(i, 1);
                                    i--;
                                }
                            }
                        } else {
                            let value = exp.slice(1);
                            if (!isFinite(value)) {
                                return null;
                            }

                            for (let i = 0; i < result.length; i++) {
                                let product = result[i];
                                if (!(product[subject] < +value)) {
                                    result.splice(i, 1);
                                    i--;
                                }
                            }
                        }
                        break;
                    case '=':
                        let value = exp.slice(1);
                        if (!isFinite(value)) {
                            return null;
                        }

                        for (let i = 0; i < result.length; i++) {
                            let product = result[i];
                            if (product[subject] != +value) {
                                result.splice(i, 1);
                                i--;
                            }
                        }
                        break;
                    case '>':
                        if (exp.charAt(1) === '=') {
                            let value = exp.slice(2);
                            if (!isFinite(value)) {
                                return null;
                            }

                            for (let i = 0; i < result.length; i++) {
                                let product = result[i];
                                if (!(product[subject] >= +value)) {
                                    result.splice(i, 1);
                                    i--;
                                }
                            }
                        } else {
                            let value = exp.slice(1);
                            if (!isFinite(value)) {
                                return null;
                            }

                            for (let i = 0; i < result.length; i++) {
                                let product = result[i];
                                if (!(product[subject] > +value)) {
                                    result.splice(i, 1);
                                    i--;
                                }
                            }
                        }
                        break;
                    default:
                        return null;
                }
                break;
        }
    }
    return result;
}