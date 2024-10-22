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
