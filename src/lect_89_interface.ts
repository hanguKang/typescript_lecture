//interface
interface PersonInt {
  name: string;
  age: number;
  setname(_name: string): void;
}

class Person1 implements PersonInt {
  public name;
  public age;

  constructor(_name: string , _age: number) {
    this.name = _name;
    this.age = _age;
  }

  setname(_name: string) {
    this.name = _name;
  }

  // interface 외 구성요소
  print() {
    console.log(`${this.name} , ${this.age}`)
  }
}


interface newPerson {
  new (name: string, age: number): Person1; // PersonInt면?
}
// interface newPerson {
//   new (name: string, age: number): PersonInt; // PersonInt면?
// }

function createPerson(construct: newPerson, name: string, age: number) {
    return new construct(name, age);
}

const person1 = createPerson( Person1, 'Charles', 26);
person1.print();

class Control {
  private state : any
}
interface SelectableControl extends Control{
  select():void
}

class Button extends Control implements SelectableControl{
  select(){}
}
class TextBox extends Control {
  select(){}
}

//constructor를 정의형대로 구현하고 싶을 때 ------------------------------------------------------------------- 
//1. class의 static 측면과 instance측면에서 차이점이 있다는 것의 유의한다.
//class를 inteface로 작업할 때 유의할 점 : class에는 두가지 유형- static측면과 instance측면-이 있다. 
//class의 constructor인 interface를 만들고 interface를 구현하는 class를 만들려고 하면 구현할 수 없다는 오류가 발생한다.
//아래 예시를 보자. 

// interface ClockConstructor1{
//   new (hour:number, minute:number) : any
// }

// class Clock1 implements ClockConstructor1{
//   currentTime : Date = new Date();
//   constructor(h:number, m:number){
//     //this.currentTime = new Date(2024,9,23, h, m);
//   }
// }

// 그 이유는 class가 interface를 구현할 때 class의 instance측면만 검사하기 때문에 interface에서 지정한 것들을 모두 구현했는지 확인한다. 
// 하지만, interface로 constructor를 정의한 것을 구현할 때는 instance뿐만 아니라, static 측면도 있기 때문에 검사할 때  
// constructor를 구현한 interface는 검사할 때 instance 어디에도 interface를 구현한 것이 없기 때문에 interface를 구현하지 않았다고 판단한다.  

//2. 외부에서 작업
// 그렇다면, constructor를 구현한 interface는 어떻게 작업할 수 있을까? 
// class의 static 측면에서 작업해야 한다. 
// 2-1. 생성자에 대한 ClockConstructor와 
// 2-2. instance 메소드에 대한 ColockInterface 각각 2개의 interface를 정의한다. 
// 편의상 우리는 전달 된 타입의 instance를 생성하는 생성자 함수인 createClock을 정의한다. 


interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface; // #1
}

interface ClockInterface {
  tick(): void;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();
  
  constructor(h: number, m: number) { //2-3. 이렇게 interface형식으로 우선 구현하고 
    // 시간 세팅 로직
  }

  tick() {
    console.log("tick tock");
  }
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface { //2-4. 이렇게 타입을 지정하면 된다. 
  return new ctor(hour, minute); //인스턴스 생성시 생성자형식의 구조(ClockConstructor)형식을 따랐는지 확인할 수 있다.
}

let clock = createClock(Clock, 10, 20);









