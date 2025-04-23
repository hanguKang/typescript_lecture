//index Properties
//객체가 가질지도 모르는 속성에 대해서 더 유연하게 여기는 방식. 

// 만약 input 이메일 필드에 누구든지 제시된 방식대로 입력되 있기를 바라지만, 입력을 안했거나, 잘못된 정보가 있다면, 에러 컨테이너에 에러 메세지를 첨부해야 한다. 

// 에러 컨테이너를 만들고 싶다면, 
// 얼마나 많은 속성과 어떤 속성명을 써야할지 모르겠다면 다음과 같이 indexable Properies를 사용할 수 있다. 
// 규칙은 [key: 타입] : 갑속성;
interface ErrorContainer { // 에러 오브젝트가 이렇게 나타나기를 바란다. ex> 이메일 input 창에 잘못된 값 있을 때 --> { email: 'Not a valid email', username : 'Must start with a character!' }
  [prop: string] : string; 
}

// email과 username은 string타입이고, 값도 string타입이다. 
const errorBag : ErrorContainer = {
  email: 'Not a valid email!',  
  username : 'Must start with a capital character!'
}


// | -> union은 CatOrDogOrBoth에는 Cat 이나 Dog 또는 Cat과 Dog 합친 것을 할당할 수 있다. A|B|C 합집합 A도 되고, B도 되고, C도 되고 AB합친 것도 되고 AC합친 것도 BC합친 것도 ABC합친 것도 된다. 즉, 다된다. 
type Cat = { name: string; purs: boolean }
type Dog = { name: string; barks: boolean; wags: boolean }
type CatOrDogOrBoth = Cat | Dog









// ------------------------------------------------  typescript 개념잡기 - union , intesection 



type Person3 = {
  name: string
};
type Employee3 = {
  job: string;
};

let person3: Person3;

const employee3 = {
  name: 'Sanghyeon',
  job: 'Developer',
};

person3 = employee3; // OK

function union(input: Person3 | Employee3) {
  //input.name //Person3 일때는 name이 있지만, Employee3일때는 name속성이 없다. 
     // ~~~~ Property 'name' does not exist on type 'Person | Employee'.
  //input.job //Employee3 일때는 job이 있지만, Person3일때는 job속성이 없다. 
     // ~~~~ Property 'job' does not exist on type 'Person | Employee'.
}

function intersection(input: Person & Employee) { //교집합은 아무 것도 없다. never타입
  // input.name // string
  // input.job // string
}

// 1. Person3일 때 가질 수 있는 타입
// { name: 'Sanghyeon' }
// { name: 'Sanghyeon', extra: 'value' }
// { name: 'Sanghyeon', job: 'Developer' }
// { name: 'Sanghyeon', job: 'Developer', extra: 'value' }
// 그 외 `name` 필드를 가진 객체

// 2. Employee3 타입에 할당 가능한 값의 집합:
// { job: 'Developer' }
// { job: 'Developer', extra: 'value' }
// { name: 'Sanghyeon', job: 'Developer' }
// { name: 'Sanghyeon', job: 'Developer', extra: 'value' }
// 그 외 `job` 필드를 가진 객체

// 3. Person3 | Employee3 //(합집합):
// 유니온 연산으로 값의 집합을 모두 모아보면 각 타입에서 항상 존재하는 필드가 없어진 것을 확인할 수 있습니다.

// { name: 'Sanghyeon' }
// { name: 'Sanghyeon', extra: 'value' }
// { name: 'Sanghyeon', job: 'Developer' }
// { name: 'Sanghyeon', job: 'Developer', extra: 'value' }
// { job: 'Developer' }
// { job: 'Developer', extra: 'value' }
// { name: 'Sanghyeon', job: 'Developer' }
// { name: 'Sanghyeon', job: 'Developer', extra: 'value' }
// 그 외 `name` 필드를 가진 객체
// 그 외 `job` 필드를 가진 객체

// 4. Person & Employee (교집합):
// 인터섹션 연산으로 공통된 값의 집합을 추려보면 name, job 필드가 항상 존재하는 것을 확인할 수 있습니다.
// { name: 'Sanghyeon', job: 'Developer' }
// { name: 'Sanghyeon', job: 'Developer', extra: 'value' }

// 5. 3과 4를 이런 식으로 표현할 수 있다.
//keyof (Person | Employee) = (keyof Person) & (keyof Employee)  // : 'name' & 'job' // never (공집합)
//keyof (Person & Employee) = (keyof Person) | (keyof Employee) // :  'name' | 'job' // 'name' | 'job'


//구조적 관점에서 살펴본 방식
interface Person4 {
  name: string;
}

interface Employee4 extends Person4 {
  job: string;
}

const person4: Person4 = { name: 'Sanghyeon' };
const employee4: Employee4 = { name: 'Sanghyeon', job: 'Developer' };

let person5: Person4 ={name:'name'};
let employee5: Employee4 ={name:'name1', job:'job'};

person5 = employee5; // OK
//employee5 = person5;
// ~~~ Property 'job' is missing in type 'Person' but required in type 'Employee'.

// -------------------------------------------------------------------------------------  결론 : A extends B를 보면 A는 B의 부분 집합이다
// 다만, 구조적 타이핑 관점에서 예외 케이스가 있습니다.
// 잉여 속성 체크 (Excess Property Check)
// 유의 사항 - 타입이 명시된 변수에 객체 리터럴을 할당할 때 타입스크립트는 해당 타입의 속성이 있는지, 그리고 '그 외의 속성은 없는지' 확인합니다.
let person6: Person4;

person6 = {
  name: 'a',
  //job: 'b', 구조적 타이핑 관점에서 볼 때 job은 허용해 주어야 하지만, 리터럴로 값을 할당할 때 이런 'job'은 허용이 되지 않는다. 
// ~~~~~~~ Type '{ name: string; job: string; }' is not assignable to type 'Person4'.
//         Object literal may only specify known properties, and 'job' does not exist in type 'Person'.  
};

let personExtra = {job:'b'}
person6 = {...person6, ...personExtra} //하지만, 이렇게 레퍼런스로 넘기면 해당된다. 변수는 compile단계에서 구조를 확인하기 때문인데, 리터럴로 값을 넘기면 고정값이기에 
                                       //정해진 interface를 extends하거나, type을 형식으로 취할 때 그 형식만을 취해야 한다. 
                                       //하지만, 레퍼런스를 확장형으로 가져가게 되면 동적으로 값이 들어올 수도 있고 안들어올 수도 있기 때문에 유연한 형식으로 
                                       //typescript는 그 형식을 인정해 준다.  


//초과속성 _ 반공변
//초과속성 - 첫번째
type Person_A = {
  name: string;
  age: number;
};

function sayHi(person: Person_A) {
  console.log(`Hi! my name is ${person.name}.`);
}

const person_A = {
  name: "ramin",
  age: 27,
  hobbies: "coding",
};//이렇게 다음 sayHi에 파라미터로 넘길 때 이런 레퍼런스 타입을 연결하는 것은 동적으로 person_A라는 값이 계속 변경될 수 있다는 가정이 전제되어 있기 때문에 초과속성을 허락한다. 

sayHi(person_A); // OK

// 초과속성 - 두번째 
const you = {
  name: "choi",
  age: 30,
  hobbies: "trip",
}

const extraProperty_A : Person_A = you; //이렇게 레퍼런스로 연결하는 것은 동적으로 you라는 값이 계속 변경될 수 있다는 가정이 전제되어 있기 때문에 초과속성을 허락한다. 


//구조적 타이핑의 문제점

 interface Car {
  brand: string;
  speed: number;
  accelerate(): void;
}

interface Boat {
  brand: string;
  speed: number;
  sail(): void;
}

function testDrive(vehicle: Car) {
  console.log(`Testing ${vehicle.brand}`);
  vehicle.accelerate();
  console.log(`Speed: ${vehicle.speed}`);
}

const myCar: Car = {
  brand: "Tesla",
  speed: 0,
  accelerate() {
    this.speed += 10;
    console.log("Car is accelerating");
  }
};

const myBoat: Boat = {
  brand: "Yamaha",
  speed: 0,
  sail() {
    this.speed += 5;
    console.log("Boat is sailing");
  }
};

testDrive(myCar);  // 의도한 대로 작동
//testDrive(myBoat); // 이전에는 컴파일 오류가 발생하지 않았지만, 이젠 오류를 확인할 수 있다.


// *************************** ------------------------- ********************************
// 개별 객체에서의 union과 intersection은 초과 프로퍼티 허용 -> 1) ABC3은 세개의 참조 타입을 합집합으로 세개의 속성을 가질 수 있는 객체참조타입이 된다. 이 참조 타입은 각각 A3, B3, C3을 extend한다고 볼 수 있다. 따라서 이 객체 참조 타입은 따라서 A3도, B3도, C3도 A3, B3도... 가질 수 있게 되는 것이다.
// 배열에서의 union은 배열 전체의 일관성 필요 -> 2) arr3은 배열은 각 배열 타입을 세가지를 합치는 한가지의 값을 가져야 한다. 따라서 이 배열 타입은 A3[] , B3[], C3[]을 extend한다고 볼 수 있다. 하지만, 배열은 태생이 한가지 타입으로 만들어져야 한다. number, string 등...아래와 같이 정의형이 등.  다른 타입이 섞일 수가 없다. 
// union 그리고 intersection 타입   

// 1) : 
type A3 = {a:string}
type B3 = {b:number}
type C3 = {c:boolean}

//객체는 초과 프로퍼티(자식(부모보다 프로터티가 많음) extend 부모(자식보다 프로퍼티가 적음 때문에 확장성이 높음) ---> let 변수: 부모타입= 값 : 자식타입(OK) , 변수:자식타입 = 값:부모타입(ERROR) 이런 상황이 된다. 때문에 A3입장에서는 a속성만 맞다면 나머지는 확장되도 상관이 없다. B3 측면에서도 C3 측면에서도 마찬가지라서 각 A3, B3, C3의 각 속성만 지정되어 있다면 그 이외의 속성을 가져서 확장되도 상관이 없다. 
//확장하는 입장에서는 3가지의 합집합+extra 가진 타입은 모든 것(extra)을 표현할 수 없기 때문에 3가지 속성 + extra속성도 가능  또는 1가지 속성 + extra속성(2가지 속성을 포함하던 안하던)도 가능
type ABC3 = A3|B3|C3;
let AB3 : ABC3 = {
  a:'aaa',
  b:1000,
}
type ABC4 = A3 & B3 & C3;
//let ABC4 : ABC4 = {a:'aaa', d:null} Error 집적 이렇게 입력하면 에러가 발생한다. 
let ABC5 : ABC4 ; 
ABC5 = {a:'aaa', b:123, c:true} //intersection 입장에서 A3입장에서는 a:string을 제외한 모든 확장에 b:number, c:boolean이 있을 수 있고, 
                                //intersection 입장에서 B3입장에서는 b:number를 제외환 모든 확장에 a:string, c:boolean이 있을 수 있고,
                                //intersection 입장에서 C3입장에서는 c:boolean을 제외한 모든 확장에 a:string, b:number이 있을 수 있고,
                                //이렇게 확장의 압장에서 보자면, 교집합은 세개가 합쳐진 것이다. 
                                



// 2) : 
let arr3 : (A3[] | B3[] | C3[]) = []
//arr3 = [{a:'str'}, {a:'str2'},{b:1},{b:2}]  //error
arr3 = [{b:1}, {b:2}]
// 2) : 
let arr4 : (A3[] & B3[] & C3[]) = []
//console.log(arr4=[{b:1}, {b:2}])




// 출처: https://inpa.tistory.com/entry/TS-📘-타입스크립트-객체-타입-체킹-원리-이해하기 [Inpa Dev 👨‍💻:티스토리]
interface Avengers {
  name: string;
}
let hero: Avengers;
//hero = { name: 'Captain', location: 'Pangyo' }; // Error - '{ name: string; location: string; }' 형식은 'Avengers' 형식에 할당할 수 없습니다. 개체 리터럴은 알려진 속성만 지정할 수 있으며 'Avengers' 형식에 'location'이(가) 없습니다

let tmp = { name: 'Captain', location: 'Pangyo' };
hero = tmp; // 전혀 문제없이 대입 된다. 
console.log(hero); // { name: 'Captain', location: 'Pangyo' }














// -----------------------------------------   typescript의 타입 --------------------------------------------
/*
  타입스크립트 용어	| 집합 용어
  never	 | 공집합
  1, a 등의 리터럴	| 원소가 1개인 집합
  T1이 T2에 할당 가능	| T1이 T2의 부분 집합
  T1 | T2 (Union)	| T1과 T2의 합집합
  T1 & T2 (Intersection) |	T1과 T2의 교집합

*/
type A = {a:string}
type B = {b:number}
type C = {c:boolean}

type ABC = A|B|C;

let AB : ABC = {
  a:'aaa',
  b:1000,
}

let arrTest :(string|number|boolean)[] = [] //string number boolean을 합친 것은 불가능 셋중의 하나이거나 3중의 두가지 또는 모두 를 원소로 값을 갖는 배열.
arrTest = [1,2,3,'a','b']

let arrTest2 : (string[] | number[] | boolean[]) = [] //string배열과  number배열을합치거나 boolean배열을 합쳐야 하지만, 배열은 객체와 다르게 잉여초과를 속성을 허용하지 않기 때문에
                                                      //합쳐면 string[]이면서, number이면서, boolean[]어어야 한다. 하지만, 그런 경우의 수는(string|number|boolean)[]타입으로 설정된다.
                                                      //즉 자신만의 배열을 가지고 합집합을 가져야 한다. 다시 언급하지만, 잉여 속성을 허용하지 않기에 다른 타입으로 확장이 되지 않고, 
                                                      //배열은 태생이 정해진 타입을 지켜야 하는 것을 기억해야 한다. string[]은 string을 extend한 것이다.  
                                                      //string[]===>[0]:string, [1]:string, --> number[]===> [0]:number, [1]:number, ... 합쳐질 수 없다. 자신만의 타입을 가져야 한다. 
                                                      //string[]이거나 number[]이거나, boolean[]이거나 말이다.
                                                      //원칙대로라면 각 0과 1의 속성의 타입이 string, number로 다르기 때문에 합치면 naver가 되는 것인데 이 또한 말이 안된다.
                                                      //다시 한 번 이야기 하지만, 배열은 한 가지 타입이어야 한다. string, number, boolean, undefined, null, symbol, 정의형 등.
                                                      //arrTest2는 다르게보면,  extend string[] , extend number[], extend boolen[] 이라고 봐도 무방하기 때문에 세 타입 중 한가지여야 한다.
//arrTest2 = [1,2,3,4, 'a','b', 'c', true, false] // error - primative타입은 reference이라고 해도 uion, intersection이 reference 타입과 다르다. 


let arrTest3 : (A[] | B[] | C[]) = []
//arrTest3 = [{a:'str'}, {a:'str2'},{b:1},{b:2}] error 
arrTest3 = [{b:1}, {b:2}]
arrTest3 = [{c:true}, {c:false}]
//arrTest3 = [{a:'str'},{b:2}, {c:true}, {c:false}] 1가지만 실행가능

let arr: number[] = [1, 2, 3]; // 모든 요소가 number 타입이므로 호환됨 [1,2,'3']은 에러 - 배열의 모든 요소가 동일한 타입이어야 합니다.
let obj: { 0: number, 1: string } = { 0: 1, 1: '2' }; // 필요한 속성을 모두 포함하므로 호환됨 {0: 1, 1: '2', 2: { a: 'A' }}도 호환됨 - 객체가 특정 타입이 요구하는 속성을 모두 포함하면 호환됩니다.



//---------------------------------------------------------------------------------------------------------------------------------------------------------
type AB = 'a' | 'b';
type BC = 'b' | 'c';
type CD = 'c' | 'd';

type ABC1 = AB | BC; // 'a' | 'b' | 'c' ===> 'a'이면서 'b'일 수는 없다. 
type B2 = AB & BC; // 'b'
type EMPTY = AB & CD; // never



let CatorDog : CatOrDogOrBoth = {
  name:'cat',
  purs:false,
  //barks:false,
  //wags:false
}

// & -> intersection은 기존 타입을 합쳐 필요한 기능을 모두 가진 단일 타입으로 만듭니다. 만일 같은 속성의 다른 데이터 타입이면 never속성을 갖는다. 
// {name:string} & {name:number} ==> name:never
type CatAndDog = Cat & Dog
let CatandDog : CatAndDog = {
  name:'cat',
  purs:false,
  barks:false,
  wags:false
}



//function overload 
//lec_88에 있는 함수를 가져옴. type guard
//primative타입에서는 intersection(교집합)과 union(합집합)은 말 그대로를 의미한다. 
type Combinable2 = string | number;
type Numeric2 = number | boolean;
type Universal2 = Combinable2 & Numeric2; 
const Universal2Type : Universal2 = 12; //number만 된다. 

type Combinable3 = string | number; 
type Numeric3 = number | boolean;
type Universal3 = Combinable3 | Numeric3;
const Univeral3Type : Universal3 = 1; //string 또는 number 또는 boolean 이 할당된다. 





//함수 오버로드 (공변성 : A ⊂ B라면, T<A> ⊂ T<B> - 을 보여주고 있다. - 복합데이터 타입은 모두 공변성을 갖고 있다. ) 
// 함수의 매개변수는 반공변성의 성격도 갖고 있다. 
// 예시>
type Supertype = string | number;
type SubtypeSt = string;
type SubtypeNm = number;
type Print<T> = (param: T) => void;

let printSuper: Print<Supertype> = param => {
	console.log(param)
}

let printSub: Print<SubtypeNm> = param => {
	console.log(param)
}

// ************************* ********************************* error printSuper ****************************************************************** 
//printSuper = printSub // TypeError, Type 'Print<number>' is not assignable to type 'Print<string | number>'. ---> PrintSuper는 Printsub을 할당받아서 실행해야하는 구문이다. 실행해야되는 구문중 실행을 못하는 구문이 있으면 에러다. printSuper에서 string일 때와 number일 때 두 가지 경우에 대해서 실행문을 구성할 수 있지만, printSub은 string이나 number 둘 중에 한 가지만을 가정할 수밖에 없다. 예로 PrintSuper에서 number에 해당하는 실행구문을 작성했다면, string을 printSub에서 실행하는 함수는 printSuper에서 실행할 수 없기 때문에 에러다. 
printSub = printSuper // OK : 반공변성, Print<Subtype> ⊂  Print<Supertype>   ---> printSub은 printSpuer를 할당받아서 실행해야 되는 함수이다. printSub에서 실행할 수 있는 구문이 string에 관한 것이었다면, string과 number 모두를 실행할 수 있는 printSuper의 실행구문 중 number에 관한 것은 작동하지 못하고 제한된다. 실제 실행되는 printSub은 자신의 string만을 위한 구문을 온전히 실행 가능하다. 





function add_fn2 (n:number) : number; //#1 parameter를 이런 방식으로 1개로도 제한할 수 있다.
function add_fn2 (a:number, b:number): number; //#2 paremeter를 number 2개로 함.
function add_fn2 (a:string, b:string): string; //#3  paremeter를 string 2개로 함.
function add_fn2 (a:string, b:number): string; //#4  
function add_fn2 (a:number, b:string): string; //#5  
function add_fn2 ( a : Combinable2, b? : Combinable2) { // #6. #1때문에 두번째 argument를 옵셔널로 설정할 수도 있다. b? : Combinable
  if(typeof a === 'string' || typeof b === 'string') {
    if(b){
      return a.toString() + b.toString();
    }
    return a.toString();
  }
  if(b){
    return a + b; 
  }
  return a;
}

const result2 = add_fn2('Max', ' Schwarz'); // parameter 타입이 Combinable일 때 사용가능하다. 만일 함수 오버로드 #1과 #2가 생성되면 안된다. #3이 생기면 가능하다.
//result2.split(' ');// error 

const result3 = add_fn2('Max', ' Schwarz') as string; // parameter 타입이 Combinable일 때 사용가능하다. 만일 함수 오버로드 #1과 #2가 생성되면 안된다. #3이 생기면 가능하다.  
result3.split(' ');// error 
  

//함수시그니처 : 함수 타입 표현식과 동일하게 함수의 타입을 별도로 정의하는 방식 --> 주의사항 자바스크립트에서는 함수도 객체로 인식되기 때문에 객체의 속성으로 함수를 할당하면, 
// 속성: 값의 형태를 띈다. 속성 => 값 이렇게 작성하지 않도록 한다. 
// 인터페이스에서도 마찬가지이다. interface funcSignature { (x:number):number }
type Operation2 = {
  (a: number, b: number): number;
};

const add_2: Operation2 = (a, b) => a + b;
const sub_2: Operation2 = (a, b) => a - b;
const multiply_2: Operation2 = (a, b) => a * b;
const divide_2: Operation2 = (a, b) => a / b;

type Operation3 = {
  (a: number, b: number): number;
  name: string;
};

const add_3: Operation3 = (a, b) => a + b;


add_3(1, 2);
add_3.name;






