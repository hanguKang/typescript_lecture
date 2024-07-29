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