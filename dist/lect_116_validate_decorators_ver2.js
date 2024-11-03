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
console.log(config);
const validate2 = (course) => {
    let isValid = { required: true, maxlength: 'less', positive: 'minus' };
    Object.entries(config).forEach(([input, types]) => {
        types.forEach(type => {
            console.log(type);
            switch (type) {
                case 'required':
                    isValid.required = course[input] ? false : true;
                    if (isValid.required) {
                        alert(input + '항목은 필수 항목입니다.');
                    }
                    break;
                case 'maxlength':
                    isValid.maxlength = (course[input].length < 5) ? 'less' : 'greater';
                    if (isValid.maxlength === 'greater' && !isValid.required) {
                        alert(input + '항목은 5글자 내로 작성합니다.');
                    }
                    break;
                case 'positive':
                    isValid.positive = (course[input] > 0) ? 'plus' : 'minus';
                    if (isValid.positive === 'minus') {
                        alert(input + '항목은 양수만 가능합니다.');
                    }
                    break;
            }
        });
    });
    return isValid;
};
class Course2 {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
}
__decorate([
    Maxlength2,
    Required2
], Course2.prototype, "title", void 0);
__decorate([
    Positive2,
    Required2
], Course2.prototype, "price", void 0);
const courseForm2 = document.querySelector('form');
courseForm2.addEventListener('submit', (e) => {
    e.preventDefault();
    const titleEl = document.getElementById('title');
    const priceEl = document.getElementById('price');
    const title = titleEl.value;
    const price = +priceEl.value;
    const course2 = new Course2(title, price);
    validate2(course2);
    console.log(course2);
});
