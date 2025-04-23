"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const Config3 = {};
function addConfig(input, validType) {
    Config3[input] = Config3[input] ? [...Config3[input], validType] : [validType];
}
function MaxLengh3(target, name) { addConfig(name, 'maxLength'); }
function Required3(target, name) { addConfig(name, 'required'); }
function PositiveNumber3(target, name) { addConfig(name, 'positive'); }
function validateForm3(instanceForm) {
    const isValidate = { required: true, maxLength: 'less', positive: 'minus' };
    Object.entries(Config3).forEach(([input, types]) => {
        if (input in instanceForm) {
            types.forEach((type) => {
                switch (type) {
                    case 'required':
                        isValidate.required = !!instanceForm[input] ? true : false;
                        break;
                    case 'maxLength':
                        isValidate.maxLength = instanceForm[input].length > 5 ? 'ok' : 'less';
                        break;
                    case 'positive':
                        isValidate.positive = instanceForm[input] > 0 ? 'positive' : 'negative';
                        break;
                }
            });
        }
    });
    return isValidate;
}
class Validator {
    constructor(t, n) {
        this.title = t;
        this.price = n;
    }
}
__decorate([
    MaxLengh3,
    Required3
], Validator.prototype, "title", void 0);
__decorate([
    PositiveNumber3,
    Required3
], Validator.prototype, "price", void 0);
const courseForm3 = document.querySelector('form');
courseForm3.addEventListener('submit', () => {
    const tit3 = document.querySelector('#inputTitle');
    const num3 = document.querySelector('#inputPrice');
    const tit3_val = tit3.value;
    const num3_val = +num3.value;
    const validInputs3 = new Validator(tit3_val, num3_val);
    const validResult = validateForm3(validInputs3);
    console.log(validResult);
});
