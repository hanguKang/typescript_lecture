"use strict";
const errorBag = {
    email: 'Not a valid email!',
    username: 'Must start with a capital character!'
};
function add_fn2(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        if (b) {
            return a.toString() + b.toString();
        }
        return a.toString();
    }
    if (b) {
        return a + b;
    }
    return a;
}
const result2 = add_fn2('Max', ' Schwarz');
const result3 = add_fn2('Max', ' Schwarz');
result3.split(' ');
