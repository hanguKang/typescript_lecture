class Control { private state: any; }
interface SelectableControl extends Control{
  select():void
}
class Button extends Control implements SelectableControl{
  select(){}
}
class Img extends Control {
  select(){}
}

enum Bool {Ture , False, FileNotFound}  //메
console.log(Bool[2]); // FileNotFound
console.log(Bool.FileNotFound); //2

const enum Bool2 {Ture , False, FileNotFound}  //메
console.log(Bool2[2]); // error const는 reverseMapping이 되지 않는다.  
console.log(Bool2.FileNotFound); //2



type A = {
  a1: string;
  a2: string;
}
type B = {
  b1: string;
  b2: string;
}

//keyof 연산자는 union타입으로 변환시킨다. 
type C = keyof (A&B); // A&B --> "a1", "a2", "b1", "b2"  keyof --> "a1" | "a2" | "b1" | "b2"
type D = keyof A | keyof B; 

let E : C = 'a1';



type AA = {
  kind:'AA';
  a: string;
  b: string;
}
type BB = {
  kind:'BB';
  a: string;
  b: string;
  c: number;
}
type CC = {
  kind:'CC';
  a: string;
  b: string;
  d: () => void;
}
type ABC = AA | BB | CC;

const data: ABC[] = [
  { kind:'AA',
    a: 'a', 
    b: 'b', 
    //c: 123, 
    //d: () => {} 
  },
];



interface Person {
  name: string;
  age: number;
}
interface Developer {
  name: string;
  skill: number;
}
// type (union) 합집합 - | person의 값도 있고, Developer의 값도 있어야 하기 때문에  /  교집합 intersection & - 2개의 객체의 키 값이 모두 있는 타입을 만들고 싶을 때 사용
type Capt = Person | Developer; // | ==> name : string, age:number , skill: number (합집합)     /       & ==> name:string (교집합)

const capt : Capt  = {
  name:"테스트",
  age:30,
}

let person : {} = {
  name:'mark', 
  age : 12
}

let val_any: any;
let val_unknown : unknown;
let user : string ;

if(typeof val_unknown === 'string') user = val_unknown;



person = {name:'miu', age:19}

const button = document.getElementById('btn')!;

function clickShow (message: string ){
  //console.log(this);
  console.log( message);
}

button.addEventListener('click', clickShow.bind(null, 'clicked'));

async function fetchAuthorName(postId:number){
  const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  const post = await postResponse.json();
  const userId = post.userId; 

  try{
    const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const user = await userResponse.json();
    return user.name;
  }catch(err){
    console.log("Fail to fetch user : ", err);
    return "Unknown"; 
  }
}

fetchAuthorName(1).then((name)=> console.log("name : ", name));

// this 알아내기
class Person100 {
  name = "person";

  getName() {
      return this.name;
  }

  getMyName = () => {
      return this.name;
  }
}

const person3 = new Person100();

console.log(person3.getName());      // person

const personName = person3.getName;
console.log('1번 this')
//console.log(personName());          // undefined

console.log('2번 this')
const personName2 = person3.getMyName;
console.log(personName2());         // person


let user1 :any = {
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
console.log('fullName');
console.log(user1.fullName);
user1.fullName='cake baskin';
console.log(user1.fullName);