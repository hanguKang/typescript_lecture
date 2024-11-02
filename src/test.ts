interface PersonA {
  name: string;
  age: number;
}
interface Developer {
  name: string;
  skill: number;
}
//합집합 union | : person의 값도 있고, Developer의 값도 있고  /  교집합(intersection) & : 하나의 객체의 키 값이 만족하면서 다른 객체의 키 값도 또 만족해야 한다. 즉, 모든 타입을 만족해야한다.
// 합집합 교집합의 개념에서 한단계 더 가짓 수가 있다고 생각해야 하나? union은 A만 만족해도 되고, B만 만쪽해도 되고 또는 A와 B 중 무엇이 들어가도 만족해야 한다. 
// intersection은 A와 둘을 모두 만족 시켜야 한다. A이면서 B도 동시에 모두 만족
type Capt = PersonA & Developer; // | ==> name : string, age:number , skill: number    /    & ==> name:string , aeg: number, skill: number 

const capt : Capt  = {
  name:"테스트",
  age:11,   
  skill : 100
}

let person_1 : {} = {
  name:'mark', 
  age : 12
}


// unknown 타입
let val_unknown : unknown;
let user : string ;

if(typeof val_unknown === 'string') user = val_unknown;



person_1 = {name:'miu', age:19}

const button = document.getElementById('btn')!;

function clickShow (message: string ) : void{
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

// this 알아내기 - 접근자 프로퍼티
class Person_2 {
  name = "person";

  getName() {
      return this.name;
  }

  getMyName = () => {
      return this.name;
  }
}

const person2 = new Person_2();

console.log(person2.getName);      // person - 메소드가 아님을 기억하자.

const personName = person2.getName;
console.log('1번 this')
//console.log(personName());          // undefined

console.log('2번 this')
const personName2 = person2.getMyName;
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

console.log(user1.fullName);




interface UIElement {
  addClickListener(  onclick: (this: void, e: Event) => void  ) : void;
}

class Handler {
  info: string = 'Hello world';
  
  onClickGood = (evnt: Event ) => {
      // 이런, `this`가 여기서 쓰이는군요. 이 콜백을 쓰면 런타임에서 충돌을 일으키겠군요
      //this.info  = e.message;
      console.log('굿클릭');
  }
}

let h = new Handler();

let uiElement:UIElement = {
  addClickListener: (  onclick:(this:void, e:Event) => void ) => { console.log('Event ~~~!!'); } 
}

uiElement.addClickListener(h.onClickGood)



class Animal {
  private name: string;
  constructor(theName: string) { this.name = theName; }
  show(){
    console.log(this.name);
  }
}

class Rhino extends Animal {
  constructor() { super("Rhino"); }
}

class Employee {
  private name: string;
  constructor(theName: string) { this.name = theName; }
}

let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
console.log(animal.show());
//animal = employee; // 오류: 'Animal'과 'Employee'은 호환될 수 없음.

class Grid {
  static origin = {x: 0, y: 0};
  calculateDistanceFromOrigin(point: {x: number; y: number;}) {
      let xDist = (point.x - Grid.origin.x);
      let yDist = (point.y - Grid.origin.y);
      return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
  constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));



enum LogLevel {
  ERROR, WARN, INFO, DEBUG
}

/**
* 이것은 아래와 동일합니다. :
* type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
*/
type LogLevelStrings = keyof typeof LogLevel;

function printImportant(key: LogLevelStrings, message: string) {
  const num = LogLevel[key];
  if (num <= LogLevel.WARN) {
     console.log('Log level key is: ', key);
     console.log('Log level value is: ', num);
     console.log('Log level message is: ', message);
  }
}
printImportant('ERROR', 'This is a message');

enum Bool {
  True,
  False,
  FileNotFound
}
let value = Bool.FileNotFound;
console.log(value);
let value_2 = Bool[3];
console.log(value_2);