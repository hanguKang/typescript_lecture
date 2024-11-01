"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const config = {};
const addValidator = (input, type) => {
    config[input] = config[input]
        ? [...config[input], type]
        : [type];
};
const Required2 = (_, input) => addValidator(input, 'required');
const Maxlength2 = (_, input) => addValidator(input, 'maxlength');
const Positive2 = (_, input) => addValidator(input, 'positive');
const validate2 = (course) => {
    let isValidStr = '';
    Object.entries(config).every(([input, types]) => types.every(type => {
        switch (type) {
            case 'required':
                isValidStr += course[input] ? 'being' : 'required';
            case 'positive':
                isValidStr += (course[input] > 0) ? 'positive' : 'negative';
            case 'maxlength':
                isValidStr += (course[input].length < 5) ? 'ok less 5' : 'no over 5';
        }
        return isValidStr;
    }));
};
class Course2 {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
}
__decorate([
    Required2,
    Maxlength2
], Course2.prototype, "title", void 0);
__decorate([
    Required2,
    Positive2
], Course2.prototype, "price", void 0);
const courseForm2 = document.querySelector('form');
courseForm2.addEventListener('submit', (e) => {
    e.preventDefault();
    const titleEl = document.getElementById('title');
    const priceEl = document.getElementById('price');
    const title = titleEl.value;
    const price = +priceEl.value;
    const course2 = new Course2(title, price);
    alert(validate2(course2));
    console.log(course2);
});
