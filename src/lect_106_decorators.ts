function  Logger(LogString : string){
  console.log("Logger FACTORY"); //순서 I

  //순서 IV
  return function(constructor:Function){
    console.log(LogString);
    console.log(constructor);
    //console.log('context: ');
  }
}

function WithTemplate(template: string, hookId : string){
  console.log("WithTemplate FACTORY"); //순서 II

  //순서 III
  return function ( constructor: any){ //여기서는 Function을 사용할 수 없는 이유는 #1에서 new constructor()로 instance할 수 없다. 모든 함수그 new 키워드를 사용해 instance를 생성할 수는 없다.
    const hookEl = document.getElementById(hookId);
    const p = new constructor(); // #1
    if(hookEl){
      hookEl.innerHTML = template; 
      hookEl.querySelector('h2')!.textContent = p.name;
    }
  }
}

//#decorator function의 실행 순서는 bottom up방식이다. 
@Logger(' LOGGING - PERSON ') //#B decorator가 나중에 렌더링된다. (렌더링은 #B decorator를 실행시키는 Factory가 먼저 실행 - Logger)
@WithTemplate('<h2> My Person_deco Object</h2>','app') // #A decorator가 먼저 렌더링된다.  (A decorator를 실행시키는 Factory가 나중에 실행)
class Person_deco {
  name = 'Max';
  constructor(){
    console.log('Creating person object~~!!!');
  }
}

const pers = new Person_deco(); 

console.log(pers);


// ---- 

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
    return this._price*(1 + tax));
  }
}