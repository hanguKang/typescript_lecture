"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const configValid = {};
const addValid = (input, type) => {
    configValid[input] =
        configValid[input]
            ? [...configValid[input], type]
            : [type];
};
const Required_1 = (target, propName) => addValid(propName, 'required');
const validateInput = (vals) => {
    let isValid = { required: false };
    Object.entries(configValid).forEach(([input, types]) => {
        types.forEach((type) => {
            switch (type) {
                case 'required':
                    isValid.required = vals ? false : true;
                    if (isValid.required) {
                        alert(input + '항목은 필수 항목입니다.');
                    }
                    break;
            }
        });
    });
    return isValid;
};
const AutoBind_1 = (target, methodName, descriptor) => {
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
class ProjectInput {
    constructor() {
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        console.log(this.templateElement);
        console.log(this.templateElement.content);
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
        const resultTitle = validateInput(enteredTitle);
        const resultDescription = validateInput(enteredDescription);
        const resultPeople = validateInput(enteredPeople);
        let resultInputVal = { required: true };
        if (resultTitle.required) {
            resultInputVal = resultTitle;
        }
        if (resultDescription.required) {
            resultInputVal = resultDescription;
        }
        if (resultPeople.required) {
            resultInputVal = resultPeople;
        }
        return resultInputVal;
    }
    submitHandler(event) {
        event.preventDefault();
        console.log(this.titleInputElement.value);
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
    Required_1
], ProjectInput.prototype, "titleInputElement", void 0);
__decorate([
    Required_1
], ProjectInput.prototype, "descriptionInputElement", void 0);
__decorate([
    Required_1
], ProjectInput.prototype, "peopleInputElement", void 0);
__decorate([
    AutoBind_1
], ProjectInput.prototype, "submitHandler", null);
const prjInput = new ProjectInput();
