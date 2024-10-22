"use strict";
const errorBag = {
    email: 'Not a valid email!',
    username: 'Must start with a capital character!'
};
let printSuper = param => {
    console.log(param);
};
let printSub = param => {
    console.log(param);
};
printSub = printSuper;
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
const add_2 = (a, b) => a + b;
const sub_2 = (a, b) => a - b;
const multiply_2 = (a, b) => a * b;
const divide_2 = (a, b) => a / b;
const add_3 = (a, b) => a + b;
add_3(1, 2);
add_3.name;
