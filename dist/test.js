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
    age: 10,
    skill: 100
};
let person = {
    name: 'mark',
    age: 12
};
let val_unknown;
let user;
if (typeof val_unknown === 'string')
    user = val_unknown;
person = { name: 'miu', age: 19 };
const button = document.getElementById('btn');
function clickShow(message) {
    //console.log(this);
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
// this 알아내기
class Person {
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
const person1 = new Person();
console.log(person1.getName()); // person
const personName = person1.getName;
console.log('1번 this');
//console.log(personName());          // undefined
console.log('2번 this');
const personName2 = person1.getMyName;
console.log(personName2()); // person
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
//alert(user1.fullName); // John Smith
//for(let key in user1) alert(key); // name, surname
//  user1.fullName('Kang hangu');
console.log(user1.fullName);
