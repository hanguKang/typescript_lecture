//index Properties
//객체가 가질지도 모르는 속성에 대해서 더 유연하게 여기는 방식. 

// 만약 input 이메일 필드에 누구든지 입력되 있기를 바라지만, 입력을 안했거나, 잘못된 정보가 있다면, 에러 컨테이너에 에러 메세지를 첨부해야 한다. 

// 에러 컨테이너
interface ErrorContainer { // 에러 오브젝트가 이렇게 나타나기를 바란다. --> { email: 'Not a valid email', username : 'Must start with a character!' }
  [prop: string] : string; 
}

const errorBag : ErrorContainer = {
  email: 'Not a valid email!',  // email은 string타입이고, 값도 string타입이다. 
  username : 'Must start with a capital character!'
}

//function overload 
//lec_88에 있는 함수를 가져옴. type guard
type Combinable2 = string | number;
type Numeric2 = number | boolean;

type Universal2 = Combinable2 & Numeric2; 

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
printSub = printSuper // OK : 반공변성, Print<Subtype> ⊃ Print<Supertype>   ---> printSub은 printSpuer를 할당받아서 실행해야 되는 함수이다. printSub에서 실행할 수 있는 구문이 string에 관한 것이었다면, string과 number 모두를 실행할 수 있는 printSuper의 실행구문 중 number에 관한 것은 작동하지 못하고 제한된다. 실제 실행되는 printSub은 자신의 string만을 위한 구문을 온전히 실행 가능하다. 

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