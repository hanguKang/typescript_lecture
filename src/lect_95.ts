
//Generic (제네릭)
//1. Generic 함수 & 클래스
//2. Constrains
//3. Special typescript types


// const names: Array = [] // error 어떤 타입의 array를 넣을건지 다만 배열은 맞지만, 어떤 타입을 넣을지는 정해지지 않았다면, 
// const names: any[] = [] // any[] 어떤 타입이라도 괜챃은 any를 사용할 수 있지만, 그럼 number, string .. 등 데이터 들이 복합적으로 다 들어가도 된다. 


// const names: Array<string> = []; // string[] 과 100% 같다. 
// names[0].split(' ');


// 어떤 자료가 올지 모른다면, Promise<any> 가 될 것이다. 
// const promise: Promise<string> = new Promise((resolve, reject)=>{
//   setTimeout(()=>{
//     resolve('This is done!'); //Promise<number>라면 resolive(숫자)가 되어야 한다. 
//   },2000);
// });


// promise.then(data=>{
//   data.split(' '); //any 또는 string일 때는 사용할 수 있지만, Promise<number> 라면, 불가능하다. 
// })

// function merge(objA: object, objB: object){

//   return Object.assign({},objA, objB);    
  
// }
// const mergeObj = merge({name:'Max'}, {age:30});
// mergeObj.age; // #1. 여기서 문제는 compile할 때 typescript에서 age라는 속성은 함수 merge에서 정의 내린, objA: object, objB: object에 해당하지 않는다. 
// typescript는 object에서 age라는 속성이 있을 것이라고 예상할 수 없다. {name:'Max'}, {age:30}는 내가 정의 내린 object이고, 함수 merge를 통해서 return받은 object는 
// ************************* (중요) 객체가 온다는 것은 알지만, 어떤 속성을 갖는지는 알 수 없기 때문에 사용자 정의 객체까지 compile 시키지 않는다. 
// 따라서 age를 사용할 수 없다. 사용하고 싶다면 함수에 age속성을 넣으면 되지만, 이는 object를 age속성을 쓰도록 제한시킬 수밖에 없다.
// 그럼 어떤 타입이 결과로 나올 것인지 지정하는 type casting을 사용해서 typescript에게 미리 가려쳐 주어야 한다. 
// const mergeObj = merge({name:'Max'}, {age:30}) as {name: string, age:number};

//이럴 때 Generic이 필요하다. 
// function merge<T , U >(objA: T, objB: U){
//   return Object.assign({},objA, objB);    
// }
// const mergeObj = merge({name:'Max'}, {age:30}); 
// console.log(mergeObj.age); //#2 오류가 나지 않는다.  T, U 는 다른 타입이라고 구분된다. 그리고  typescript는 어떤 랜덤한 객체가 올 거라고 이해하게 된다. T는 {name: 'Max'}라는 타입으로 치환되고, U는 {age:30}이라는 타입으로 치환되기 때문이다. 이는 compile할 때 함수와 parameter가 결정되는 것과 달리, genetic타입은 runtime 즉, 호출할 때 dynamical할게 타입이 결정된다. 
//                            //age는 U타입에 존재하는 속성이 되어 버린다. 

function merge<T extends object, U extends object>(objA: T, objB: U){ // #5
  return Object.assign({},objA, objB);    
}


//const mergedObj = merge<{name:string, hobbies:string[]},{age:number}>( {name:"Max", hobbies: ['Sports']}, {age:30} ); // #3 이런식으로 typescript는 generic타입을 이해하게 된다는 뜻이다. 
const mergedObj = merge( {name:"Max", hobbies: ['Sports']}, {age:30} ); //우리는 typescript가 이해할 수 있는 정도(#3)까지 자세하게 타입을 지정해서 보내줄 필요 없다. 
console.log(mergedObj.age);

//function merge<T , U>(objA: T, objB: U){ //#4
 // return Object.assign({},objA, objB);    
//}

//const mergedObj2 = merge ({name:"Max", hobbies: ['Sports']}, 30) // 이렇게 데이터를 #4 함수로 보내면 error는 없지만, 내가 원하는 형식이 아닐 수 있다. 
//따라서 Gegeric타입에도 제한을 할 필요가 있다. <T extends object, U extends object> 
// 참고로 <T extends string | number > 이런 식으로도 사용가능하다. 


interface Lengthy {
  length:number;
}

function countAndDescribe<T extends Lengthy>(element : T): [T, string]{
  let descriptionText = 'Got no value.';
  if(Element.length === 1){
    descriptionText = 'Got 1 element';
  }else if(Element.length > 0 ){
    descriptionText = 'Got' + element.length + ' element. ';
  }
  return [element, descriptionText];  
 
}

console.log(countAndDescribe('Hi there!'));


function extracAndConvert<T extends object, U extends keyof T>(obj: T, key : U){
  return 'Value : ' + obj[key];
}

extracAndConvert({ name: 'Max'}, 'name');