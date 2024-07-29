"use strict";
function merge(objA, objB) {
    return Object.assign({}, objA, objB);
}
const mergedObj = merge({ name: "Max", hobbies: ['Sports'] }, { age: 30 });
console.log(mergedObj.age);
function countAndDescribe(element) {
    let descriptionText = 'Got no value.';
    if (Element.length === 1) {
        descriptionText = 'Got 1 element';
    }
    else if (Element.length > 0) {
        descriptionText = 'Got' + element.length + ' element. ';
    }
    return [element, descriptionText];
}
console.log(countAndDescribe('Hi there!'));
function extracAndConvert(obj, key) {
    return 'Value : ' + obj[key];
}
extracAndConvert({ name: 'Max' }, 'name');
