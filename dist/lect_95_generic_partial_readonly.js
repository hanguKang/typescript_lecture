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
        descriptionText = 'Got' + element.length + ' elements.';
    }
    return [element, descriptionText];
}
console.log(countAndDescribe('Hi there!'));
function extracAndConvert(obj, key) {
    return 'Value : ' + obj[key];
}
extracAndConvert({ name: 'Max' }, 'name');
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem('Max');
textStorage.addItem('Swartz');
textStorage.removeItem('Max');
console.log(textStorage.getItems());
const numberStroage = new DataStorage();
const objStorage = new DataStorage();
objStorage.addItem({ name: 'Max' });
objStorage.addItem({ name: 'Swartz' });
objStorage.removeItem({ name: 'Swartz' });
console.log(objStorage.getItems());
function createCourseGoal1(title, description, date) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal;
}
const names = ['Max', 'Anna'];
