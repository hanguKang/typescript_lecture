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