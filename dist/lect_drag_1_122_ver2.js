"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const configValid_1 = {};
const addValid_1 = (input, type) => {
    configValid_1[input] =
        configValid_1[input]
            ? [...configValid_1[input], type]
            : [type];
};
const Password_1 = (target, propName) => addValid_1(propName, 'password');
const MinMax_1 = (target, propName) => addValid_1(propName, 'minmax');
const Maxlength_2 = (target, propName) => addValid_1(propName, 'maxlength');
const Required_2 = (target, propName) => addValid_1(propName, 'required');
const validateInput_1 = (_this) => {
    let isValid = { required: true, maxlength: true, minMax: true, password: true };
    let validRequiredKeep = true;
    let validMaxLengthKeep = true;
    let validMinMaxhKeep = true;
    let validPasswordKeep = true;
    Loop1: for (const [input, types] of Object.entries(configValid)) {
        Loop2: for (const type of types) {
            switch (type) {
                case 'required':
                    const hasValueRequired = (!!_this[input].value && validRequiredKeep);
                    if (!hasValueRequired) {
                        isValid.required = false;
                        validRequiredKeep = false;
                        alert(input + '항목은 필수 항목입니다.');
                        break Loop1;
                    }
                    break;
                case 'maxlength':
                    const hasValueMaxlength = (_this[input].value.length >= 5 && validMaxLengthKeep);
                    if (hasValueMaxlength) {
                        isValid.maxlength = false;
                        validMaxLengthKeep = false;
                        alert(input + '항목은 5글자 미만으로 작성하시오.');
                        break Loop1;
                    }
                    break;
                case 'minmax':
                    const hasValueMinMax = ((_this[input].value.length >= 8 && _this[input].value.length <= 15) && validMinMaxhKeep);
                    if (!hasValueMinMax) {
                        isValid.minMax = false;
                        validMinMaxhKeep = false;
                        alert(input + '항목은 8글자 이상 15글자 이하로 작성하시오.');
                        break Loop1;
                    }
                    break;
                case 'password':
                    const pattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~@#$!%*?&])[a-zA-Z\d~@#$!%*?&]+$/;
                    const hasValuePassword = ((!/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(_this[input].value) && pattern.test(_this[input].value)) && validPasswordKeep);
                    if (!hasValuePassword) {
                        isValid.password = false;
                        validPasswordKeep = false;
                        alert(input + '항목은 한글이 포함되지 말아야 하며, 특수문자 숫자 영문자 포함해야 합니다.');
                        break Loop1;
                    }
                    break;
            }
        }
    }
    return isValid;
};
const AutoBind_2 = (_, _2, descriptor) => {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            let boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
};
class ProjectInput_1 {
    constructor() {
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = 'user-input';
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.configure();
        this.attach();
    }
    gatehrUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = +this.peopleInputElement.value;
        let resultInputVal = { required: true };
        resultInputVal = validateInput(this);
        return resultInputVal;
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatehrUserInput();
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}
__decorate([
    Maxlength_2,
    Required_2
], ProjectInput_1.prototype, "titleInputElement", void 0);
__decorate([
    Password_1,
    MinMax_1,
    Required_2
], ProjectInput_1.prototype, "descriptionInputElement", void 0);
__decorate([
    Required_2
], ProjectInput_1.prototype, "peopleInputElement", void 0);
__decorate([
    AutoBind_2
], ProjectInput_1.prototype, "gatehrUserInput", null);
__decorate([
    AutoBind_2
], ProjectInput_1.prototype, "submitHandler", null);
const prjInput_1 = new ProjectInput_1();
