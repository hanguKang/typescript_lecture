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

//class의 static 측면과 instance측면의 차이점 
//class와 inteface로 작업할 때 class에는 두가지 유형- static측면과 instance측면-이 있다. 
//구문을 사용해서 interface를 만들고 interface를 구현하는 class를 만들려고 하면 오류가 발생할 수 있다. 

// interface ClockConstructor{
//   new (hour:number, minute:number) : any
// }

// class Clock implements ClockConstructor{
//   currentTime : Date = new Date();
//   constructor(h:number, m:number){
//     //this.currentTime = new Date(2024,9,23, h, m);
//   }
// }

// 그 이유는 class가 interface를 구현할 때 class의 instance면만 검사되기 때문이다. constructor는 static 측면도 있기 때문에 체크에 포함되지 않는다. 
// 대신 class의 static 측면에서 작업해야 한다. 이 예제에서 생성자에 대한 ClockConstructor와 instance 메소드에 대한 ColockInterface 각각 2개의 interface를 정의한다. 
// 편의상 우리는 전달 된 타입의 instance를 생성하는 생성자 함수인 createClock을 정의한다. 


interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface; // #1
}

interface ClockInterface {
  tick(): void;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();
  
  constructor(h: number, m: number) {
    // 시간 세팅 로직
  }

  tick() {
    console.log("tick tock");
  }
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute);
}

let clock = createClock(Clock, 10, 20);
