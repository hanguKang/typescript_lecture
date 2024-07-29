"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Logger(LogString) {
    return function (constructor) {
        console.log(LogString);
        console.log(constructor);
    };
}
function WithTemplate(template, hookId) {
    return function (constructor) {
        const hookEl = document.getElementById(hookId);
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('h2').textContent = p.name;
        }
    };
}
let Person_deco = class Person_deco {
    constructor() {
        this.name = 'Max';
        console.log('Creating person object~~!!!');
    }
};
Person_deco = __decorate([
    WithTemplate('<h2> My Person_deco Object</h2>', 'app')
], Person_deco);
const pers = new Person_deco();
console.log(pers);
