"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const registeredValidators1 = {};
function Required1(target, propName) {
    registeredValidators1[target.constructor.name] = {
        [propName]: ['required']
    };
}
function PositiveNumber1(target, propName) {
    registeredValidators1[target.constructor.name] = {
        [propName]: ['positive']
    };
}
function validate1(obj) {
    const objValidatorConfig = registeredValidators1[obj.constructor.name];
    console.log(objValidatorConfig);
    if (!objValidatorConfig) {
        return true;
    }
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    return !!obj[prop];
                case 'positive':
                    return obj[prop] > 0;
            }
        }
    }
    return true;
}
class Course1 {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Required1
], Course1.prototype, "title", void 0);
__decorate([
    PositiveNumber1
], Course1.prototype, "price", void 0);
const courseForm1 = document.querySelector('form');
courseForm1.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title');
    const priceEl = document.getElementById('price');
    const title = titleEl.value;
    const price = +priceEl.value;
    const createdCourse = new Course1(title, price);
    if (!validate1(createdCourse)) {
        alert('Invalid input, please try again!');
        return;
    }
    console.log(createdCourse);
});
