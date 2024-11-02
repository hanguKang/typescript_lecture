"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const capt = {
    name: "테스트",
    age: 11,
<<<<<<< HEAD
=======
    skill: 100
>>>>>>> refs/remotes/origin/main
};
let person_1 = {
    name: 'mark',
    age: 12
};
let val_unknown;
let user;
if (typeof val_unknown === 'string')
    user = val_unknown;
person_1 = { name: 'miu', age: 19 };
const button = document.getElementById('btn');
function clickShow(message) {
    console.log(message);
}
button.addEventListener('click', clickShow.bind(null, 'clicked'));
function fetchAuthorName(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        const postResponse = yield fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        const post = yield postResponse.json();
        const userId = post.userId;
        try {
            const userResponse = yield fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
            const user = yield userResponse.json();
            return user.name;
        }
        catch (err) {
            console.log("Fail to fetch user : ", err);
            return "Unknown";
        }
    });
}
fetchAuthorName(1).then((name) => console.log("name : ", name));
<<<<<<< HEAD
// this 알아내기
class Person100 {
=======
class Person_2 {
>>>>>>> refs/remotes/origin/main
    constructor() {
        this.name = "person";
        this.getMyName = () => {
            return this.name;
        };
    }
    getName() {
        return this.name;
    }
}
<<<<<<< HEAD
const person3 = new Person100();
console.log(person3.getName()); // person
const personName = person3.getName;
=======
const person2 = new Person_2();
console.log(person2.getName);
const personName = person2.getName;
>>>>>>> refs/remotes/origin/main
console.log('1번 this');
console.log('2번 this');
<<<<<<< HEAD
const personName2 = person3.getMyName;
console.log(personName2()); // person
=======
const personName2 = person2.getMyName;
console.log(personName2());
>>>>>>> refs/remotes/origin/main
let user1 = {
    name: "John",
    surname: "Smith"
};
Object.defineProperty(user1, 'fullName', {
    get() {
        return `${this.name} ${this.surname}`;
    },
    set(value) {
        [this.name, this.surname] = value.split(" ");
    }
});
<<<<<<< HEAD
//alert(user1.fullName); // John Smith
//for(let key in user1) alert(key); // name, surname
//  user1.fullName('Kang hangu');
console.log('fullName');
console.log(user1.fullName);
user1.fullName = 'cake baskin';
=======
>>>>>>> refs/remotes/origin/main
console.log(user1.fullName);
class Handler {
    constructor() {
        this.info = 'Hello world';
        this.onClickGood = (evnt) => {
            console.log('굿클릭');
        };
    }
}
let h = new Handler();
let uiElement = {
    addClickListener: (onclick) => { console.log('Event ~~~!!'); }
};
uiElement.addClickListener(h.onClickGood);
class Animal {
    constructor(theName) { this.name = theName; }
    show() {
        console.log(this.name);
    }
}
class Rhino extends Animal {
    constructor() { super("Rhino"); }
}
class Employee {
    constructor(theName) { this.name = theName; }
}
let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");
animal = rhino;
console.log(animal.show());
class Grid {
    calculateDistanceFromOrigin(point) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor(scale) {
        this.scale = scale;
    }
}
Grid.origin = { x: 0, y: 0 };
let grid1 = new Grid(1.0);
let grid2 = new Grid(5.0);
console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["ERROR"] = 0] = "ERROR";
    LogLevel[LogLevel["WARN"] = 1] = "WARN";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 3] = "DEBUG";
})(LogLevel || (LogLevel = {}));
function printImportant(key, message) {
    const num = LogLevel[key];
    if (num <= LogLevel.WARN) {
        console.log('Log level key is: ', key);
        console.log('Log level value is: ', num);
        console.log('Log level message is: ', message);
    }
}
printImportant('ERROR', 'This is a message');
var Bool;
(function (Bool) {
    Bool[Bool["True"] = 0] = "True";
    Bool[Bool["False"] = 1] = "False";
    Bool[Bool["FileNotFound"] = 2] = "FileNotFound";
})(Bool || (Bool = {}));
let value = Bool.FileNotFound;
console.log(value);
let value_2 = Bool[3];
console.log(value_2);
