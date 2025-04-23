"use strict";
const errorBag = {
    email: 'Not a valid email!',
    username: 'Must start with a capital character!'
};
let person3;
const employee3 = {
    name: 'Sanghyeon',
    job: 'Developer',
};
person3 = employee3;
function union(input) {
}
function intersection(input) {
}
const person4 = { name: 'Sanghyeon' };
const employee4 = { name: 'Sanghyeon', job: 'Developer' };
let person5 = { name: 'name' };
let employee5 = { name: 'name1', job: 'job' };
person5 = employee5;
let person6;
person6 = {
    name: 'a',
};
let personExtra = { job: 'b' };
person6 = Object.assign(Object.assign({}, person6), personExtra);
function sayHi(person) {
    console.log(`Hi! my name is ${person.name}.`);
}
const person_A = {
    name: "ramin",
    age: 27,
    hobbies: "coding",
};
sayHi(person_A);
const you = {
    name: "choi",
    age: 30,
    hobbies: "trip",
};
const extraProperty_A = you;
function testDrive(vehicle) {
    console.log(`Testing ${vehicle.brand}`);
    vehicle.accelerate();
    console.log(`Speed: ${vehicle.speed}`);
}
const myCar = {
    brand: "Tesla",
    speed: 0,
    accelerate() {
        this.speed += 10;
        console.log("Car is accelerating");
    }
};
const myBoat = {
    brand: "Yamaha",
    speed: 0,
    sail() {
        this.speed += 5;
        console.log("Boat is sailing");
    }
};
testDrive(myCar);
let AB3 = {
    a: 'aaa',
    b: 1000,
};
let ABC5;
ABC5 = { a: 'aaa', b: 123, c: true };
let arr3 = [];
arr3 = [{ b: 1 }, { b: 2 }];
let arr4 = [];
let hero;
let tmp = { name: 'Captain', location: 'Pangyo' };
hero = tmp;
console.log(hero);
let AB = {
    a: 'aaa',
    b: 1000,
};
let arrTest = [];
arrTest = [1, 2, 3, 'a', 'b'];
let arrTest2 = [];
let arrTest3 = [];
arrTest3 = [{ b: 1 }, { b: 2 }];
arrTest3 = [{ c: true }, { c: false }];
let arr = [1, 2, 3];
let obj = { 0: 1, 1: '2' };
let CatorDog = {
    name: 'cat',
    purs: false,
};
let CatandDog = {
    name: 'cat',
    purs: false,
    barks: false,
    wags: false
};
const Universal2Type = 12;
const Univeral3Type = 1;
let printSuper = param => {
    console.log(param);
};
let printSub = param => {
    console.log(param);
};
printSub = printSuper;
function add_fn2(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        if (b) {
            return a.toString() + b.toString();
        }
        return a.toString();
    }
    if (b) {
        return a + b;
    }
    return a;
}
const result2 = add_fn2('Max', ' Schwarz');
const result3 = add_fn2('Max', ' Schwarz');
result3.split(' ');
const add_2 = (a, b) => a + b;
const sub_2 = (a, b) => a - b;
const multiply_2 = (a, b) => a * b;
const divide_2 = (a, b) => a / b;
const add_3 = (a, b) => a + b;
add_3(1, 2);
add_3.name;
