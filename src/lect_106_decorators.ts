function  Logger(LogString : string){
  console.log("Logger FACTORY"); //순서 I

  //순서 IV
  return function(constructor:Function){
    console.log(LogString);
    console.log(constructor);
    //console.log('context: ');
  }
}

// 1번째
// function WithTemplate(template: string, hookId : string){
//   console.log("WithTemplate FACTORY"); //순서 II

//   //순서 III
//   return function ( constructor: any){ //constructor타입으로 Function을 사용할 수 없는 이유는 Functio타입은 일반 함수타입이지 생성자 함수를 가리키지 않는다. 
//                                        // #1에서 new 키워드를 사용해서 constructor()로 instance할 수 없다. 
//                                        //모든 함수가 new 키워드를 사용해 instance를 생성할 수는 없다.
//     const hookEl = document.getElementById(hookId);
//     const p = new constructor(); // #1
//     if(hookEl){
//       hookEl.innerHTML = template; 
//       hookEl.querySelector('h2')!.textContent = p.name;
//     }
//   }
// }

//2번째
function WithTemplate(template: string, hookId : string){
    console.log("WithTemplate FACTORY"); //순서 II
  
    //순서 III
    return function <T extends { new(...args: any[]): {name: string} }> ( originalConstructor: T){ 
      return class extends originalConstructor{
        constructor(...args: any[]){ // typescript에서 '_' 파라미터는 파라미터를 받아들이겠지만, 사용하지 않겠다는 뜻이다. 
          super();
          this.name = args[0]//'테스트';
          console.log('Redering template');
          const hookEl = document.getElementById(hookId);          
          if(hookEl){
            hookEl.innerHTML = template; 
            hookEl.querySelector('h2')!.textContent = this.name;
          }
        }        
      }
      
    }
  }

//#decorator function의 실행 순서는 bottom up방식이다. 
@Logger(' LOGGING - PERSON ') //#B decorator가 나중에 렌더링된다. (렌더링은 #B decorator를 실행시키는 Factory가 먼저 실행 - Logger)
@WithTemplate('<h2> My Person_deco Object</h2>','app') // #A decorator가 먼저 렌더링된다.  (A decorator를 실행시키는 Factory가 나중에 실행)
class Person_deco {
  name = 'Max';
  constructor(msg: string | undefined){
    console.log('Creating person object~~!!!');
    if(msg){
      this.name = msg;
    }
  }
}
console.log('인스턴스 만들어지기 전');
const pers = new Person_deco( "Hello I'm instance" ); 

console.log(pers);

// --------------------------------------------------------------------


function Log(target : any, propertyName : string | Symbol){
  console.log('property decorator!');
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor){
  console.log('Accessor decrator!');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor){
  console.log('Method decrator!');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position : number){ //position은 몇번째 argument인지 확인
  console.log('Parameter decrator!');
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title : string; 
  private _price :number;

  @Log2
  set price(val : number){
    if(val >0 ){
      this._price = val;
    }else {
      throw new Error ('Invalid price - should be positive!');
    }
  }

  constructor(t: string, p:number){
    this.title = t; 
    this._price = p; 
  }

  @Log3
  getPriceWithTax(@Log4 tax: number){
    return this._price*(1 + tax);
  }
}

// --------------------------------------------------------------------

const dependencyPool:{[key:string]: {name:string}} = {
  dep1 : {name : 'dep1'}, 
  dep2 : {name : 'dep2'}, 
  dep3 : {name : 'dep3'}, 
  dep4 : {name : 'dep4'} 
}


function inject(...depNames: any[]){
  return function <T extends {new(...args: any[]): {}}> (originConstructor: T) {
    return class extends originConstructor {
      constructor(...args: any[]){
        const deps = depNames.reduce( (deps: {}, name: string)=>({
          ...deps, 
          [name] : dependencyPool[name],
        }),{});
  
        super(deps);
      }
    }
  }
}

@inject('dep1', 'dep2')
class Product_test {
  constructor(...deps:any []){
    console.log('product dependency is', deps);
  }
}

function createProduct(...args: any[]){
  return new Product_test(args);
}

const p = createProduct();





// --------------------------------------------------------------------

function logg_price(target:any, name:string, descriptor:PropertyDescriptor){
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]){
    const res = originalMethod.apply(this, args);
    console.log(`${name} method arguments:`, args);
    console.log(`${name} method return:`, res);
    return res;
  }
}

class Product_price {
  price : number = 10000; 

  @logg_price
  setPrice(p : number){
    this.price = p; 
    return this.price; 
  }
}

const P_price = new Product_price();
P_price.setPrice(1000000);



// --------------------------------------------------------------------

class Users {
  private _age: number = 24;
	
	@changeAge(25)
  get age() {
    console.log('Age getter called');
    return this._age;
  }

  //@changeAge(25) --> 어짜피 get에만 적용되게 됨 decorator는 get과 set 두개 모두 사용할 수 없다. 이유는 Propertydescriptor의 get메소드에서 속성을 setting할 수 있기 때문이다. 
  set age(value: number) {
    console.log('Age setter called')
    this._age = value;
  }
}

function changeAge(newAge: number) {
  return function(target: any, name: any, desc: PropertyDescriptor) {
    console.log(desc);
    desc.get = () => {
      console.log("new age getter is called");
      return newAge;
    }
  }
}

const users = new Users();
const newAge = users.age;
console.log(newAge);



// --------------------------------------------------------------------
function format(formStr : string) {
  return function (target : any, propertyName : string) :any {
    let value = target[propertyName];
    function getter():string{
      return `${formStr} ${value}`;
    }
    function setter(setVal :string):void{
      value= setVal;
    }
    //return {get:getter, set:setter } 대신에 Object.defineProperty(target, propertyName, {get: getter, set:setter}) 를 사용해도 된다. 
    return {
      get: getter,
      set: setter,
    }
  }
}
class Greeter {
  @format("Hello")
  greeting!: string;
}

 let instance_greet = new Greeter();
 instance_greet.greeting = 'World';
 console.log(instance_greet.greeting);



// -------------------------------------------------------------------- 

function MinLength(min : number){
  return function (target:any, propertyName: string, parameterIndex: number){
    target.validators = {
      minLength(args: string[]){
        return args[parameterIndex].length >= min;
      }
    }
  }
}

function Validate (target:any, propertyName: string, descriptor: PropertyDescriptor): void{
   const method = descriptor.value;
   descriptor.value = function(...args: []){
    Object.keys(target.validators).forEach((key)=>{
      if(!target.validators[key](args)){
        console.log("throw new BadREquestExeption()");
      }else{
        console.log('OK!');
      }
    });
    method.apply(this, args); //#1 이건 왜 있는거지? - 실제 setName을 작동시키기 위해서 현재 setName에는 아무런 실행코드가 없기 때문에 지워도 상관없다. 
   }
}

class User {
  private name!: string; 

  @Validate
  setName(@MinLength(3) name:string){

  }
}

const usr = new User();
usr.setName('Dexter'); 
usr.setName('22');; 

// -------------------------------------------------------------------- 

function AutoBind(_:any, _2:string, descriptor:PropertyDescriptor):any{
  const originalMethod = descriptor.value;
  // descriptor.value = function (){
  //   console.log(this); //버튼객체 
  //   const res = originalMethod.call(this); //#1여기서 this는 버튼을 가리킨다. click이벤트와 연결된 객체는 버튼이기 때문이다. this대신에 target을 입력한다고 해도 의미는 없다. shoMsg에서 this를 사용하고 있기 때문에 this는 계속해서 button을 가리킬 것이다. - 버튼객체가 showMsg함수를 사용한다.
  //   return res;
  // }
  const bindObj: PropertyDescriptor = {
    configurable:true,
    enumerable:false,
    get(){ //get함수는 클래스 내부에서 실행되는 함수다. get내부에서 this는 클래스를 가리킨다. 
      const boundFn = originalMethod.bind(this); //#2. 여기서 this는 클래스를 가리킨다. 
      return boundFn;
    }
  };
  return bindObj;
}
class BtnEvnt{
  private _msg:string = "Hello";

  @AutoBind
  showMsg(){
    console.log(this._msg);
  }
}

let btn = document.querySelector('button')!;
let instance_btnEvnt = new BtnEvnt();
btn.addEventListener('click',instance_btnEvnt.showMsg);



//---------------------------------------------------------------------------------------------------------------

const Inject_obj = {
  name1 : {name: 'name1'},
  name2 : {name: 'name2'},
  name3 : {name: 'name3'},
  name4 : {name: 'name4'}
}



function Inject_propery(...args:string[]){
  return function <T extends {new(...args:any[]):{}}>(originalConstructor: T){
    return class extends originalConstructor {
      constructor(...args:any[]){
        args.reduce((deps, val)=> ({
          deps
        }),{});
        super();
      }
    }
  }
}


@Inject_propery('name1', 'name2')
class Property_test {
  constructor(...args:any[]){
    console.log('deps name is' + args);
  }
}