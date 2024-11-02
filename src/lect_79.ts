//optional property : 
// 구현할 때 이 속성은 사용할 수도 있고 안할 수도 있다. 
// 멤버 : 속성? : 데이터타입
// 메소드 :  속성! : myMethod?(){ ... }


// type AddFn = (a: number, b: number) => number;

interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

//이렇게 
//  1. interface에서 optional 속성을 사용하면, 
//  2. class 에서 구현할 때 이 속성 역시 optional로 사용하는 것이 개인적으로는 좋아보인다. 만일 optional이 아니라면, 
//     당연하겠지만, 이 프로퍼티를 실제 구현할 수 있는 constructor나 메소드에서 optional을 사용하지 못한다.
//  3. class 내부에서 파라미터로 받는 argument도 역시 optional이 되어야할 것 같다. 

interface Named {
  readonly name?: string;
  outputName?: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name?: string;
  age = 30;

  constructor(n?: string) {
    if (n) {
      this.name = n;
    }
  }

  greet(phrase: string) {
    if (this.name) {
      console.log(phrase + ' ' + this.name);
    } else {
      console.log('Hi!');
    }
  }
}

let user_: Greetable;

user_ = new Person();
// user_.name = 'Manu';

user_.greet('Hi there - I am');
console.log(user_);
