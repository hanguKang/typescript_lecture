"use strict";
class Person1 {
    constructor(_name, _age) {
        this.name = _name;
        this.age = _age;
    }
    setname(_name) {
        this.name = _name;
    }
    print() {
        console.log(`${this.name} , ${this.age}`);
    }
}
function createPerson(construct, name, age) {
    return new construct(name, age);
}
const person1 = createPerson(Person1, 'Charles', 26);
person1.print();
class Control {
}
class Button extends Control {
    select() { }
}
class TextBox extends Control {
    select() { }
}
class Clock {
    constructor(h, m) {
        this.currentTime = new Date();
    }
    tick() {
        console.log("tick tock");
    }
}
function createClock(ctor, hour, minute) {
    return new ctor(hour, minute);
}
let clock = createClock(Clock, 10, 20);
