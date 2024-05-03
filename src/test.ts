interface Person {
  name: string;
  age: number;
}
interface Developer {
  name: string;
  skill: number;
}
//intersection type 합집합(union) - | person의 값도 있고, Developer의 값도 있고  /  교집합(intersection) & - 2개의 객체의 키 값이 모두 있는 타입을 만들고 싶을 때 사용
type Capt = Person | Developer; // | ==> name : string, age:number , skill: number (합집합)     /       & ==> name:string (교집합)

const capt : Capt  = {
  name:"테스트",
  age:11,   
  skill : 100
}

let person : {} = {
  name:'mark', 
  age : 12
}

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
class Person {
  name = "person";

  getName() {
      return this.name;
  }

  getMyName = () => {
      return this.name;
  }
}

const person1 = new Person();

console.log(person1.getName());      // person

const personName = person1.getName;
console.log('1번 this')
//console.log(personName());          // undefined

console.log('2번 this')
const personName2 = person1.getMyName;
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