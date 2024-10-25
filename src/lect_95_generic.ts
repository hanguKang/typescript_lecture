
//Generic (제네릭)
//1. Generic 함수 & 클래스
//2. Constrains
//3. Special typescript types


// const names: Array = [] // error 배열은 맞지만, 어떤 타입을 넣을지는 정해지지 않았다면 error다. --> 수정 Array<T> 또는 Array<string> 등.
// const names: any[] = [] // any[] 어떤 타입이라도 괜챃은 any를 사용할 수 있다. 그럼 number, string .. 등 데이터 들이 복합적으로 다 들어가도 된다. 


// const names: Array<string> = []; // string[] 과 100% 같다. 
// names[0].split(' ');


// 만약 어떤 자료가 올지 모른다면, Promise<any> 를 사용하면 된다.
// const promise: Promise<string> = new Promise((resolve, reject)=>{ #1 현재 promise는 Promise<string>이다.
//   setTimeout(()=>{
//     resolve('This is done!'); //#1이 Promise<number>라면 resolive(숫자)가 되어야 한다. 
//   },2000);
// });


// promise.then(data=>{
//   data.split(' '); //any 또는 string일 때는 사용할 수 있지만, Promise<number> 라면, 불가능하다. 
// })

// function merge(objA: object, objB: object){

//   return Object.assign({},objA, objB);    
  
// }

// const mergeObj = merge({name:'Max'}, {age:30});
// mergeObj.age; // #1. 여기서 문제는 compile할 때 typescript에서 age라는 속성은 함수 merge에서 정의 내린, objA: object, objB: object에 할당되어 있지 않다.
// typescript는 object에서 age라는 속성이 있을 것이라고 예상할 수 없다. {name:'Max'}, {age:30}는 내가 정의 내린 object이고, 함수 merge를 통해서 return받은 object는 
// ************************* (중요) 객체가 온다는 것은 알지만, 어떤 속성을 갖는지는 알 수 없기 때문에 사용자 정의 객체까지 compile 시키지 않는다. 
// 따라서 age를 사용할 수 없다. 사용하고 싶다면 함수에 age속성을 넣으면 되지만, 이는 object를 age속성을 쓰도록 제한시킬 수밖에 없다.
// 그럼 어떤 타입이 결과로 나올 것인지 지정하는 type casting을 사용해서 typescript에게 미리 알려 주어야 한다. 
// const mergeObj = merge({name:'Max'}, {age:30}) as {name: string, age:number};


//이럴 때 Generic이 필요하다. 
// function merge<T , U >(objA: T, objB: U){
//   return Object.assign({},objA, objB);    
// }
// const mergeObj = merge({name:'Max'}, {age:30}); 
// console.log(mergeObj.age); //#2 오류가 나지 않는다.  T, U 는 다른 타입이라고 구분된다. 그리고  typescript는 어떤 랜덤한 객체가 올 거라고 이해하게 된다. T는 {name: 'Max'}라는 타입으로 치환되고, U는 {age:30}이라는 타입으로 치환된다. (어떤 객체가 아니라, name속성과 'Max'라는 값을 갖는 type이 온다는 것이 중요하다. )
//이는 compile할 때 함수와 parameter가 결정되는 것과 달리, generic타입은 runtime 즉, 호출할 때 dynamical할게 타입이 결정된다. 
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
    descriptionText = 'Got' + element.length + ' elements.';
  }
  return [element, descriptionText];  

}

console.log(countAndDescribe('Hi there!')); //string타입을 generic타입인 T인 element로 전달해도, length라는 속성이 있다. 역시 array를 보내도 length라는 속성이 있다. 
                                            //반공변 원칙에 따라서 함수의 파라미터는 ( string타입이 더 크지만 더 작은 속성을 갖는 Lenghty라는 타입으로 ) narrow된다. 


function extracAndConvert<T extends object, U extends keyof T>(obj: T, key : U){ // 두번째 generic 타입은 첫번째 T를 상속하고 있다.
  return 'Value : ' + obj[key];
}
extracAndConvert({ name: 'Max'}, 'name');


//generic classes 
class DataStorage <T> { // #6  primative data 그리고 object를 구분하기 위해서 처음부터 이렇게 하는 것이 좋다. <T extends string | number | boolean >
  private data :T[] = [];
  addItem(item :T ){
    this.data.push(item);
  }
  removeItem(item : T){
    //this.data.splice(this.data.indexOf(item), 1); //#3.
    //#4.
    if(this.data.indexOf(item) === -1){
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems(){
    return [...this.data];
  }
}

const textStorage  = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.addItem('Swartz');
textStorage.removeItem('Max');
console.log(textStorage.getItems());

const numberStroage = new DataStorage<number>();

const objStorage = new DataStorage<object>();
objStorage.addItem({name:'Max'}); //#5
objStorage.addItem({name:'Swartz'});
objStorage.removeItem({name:'Swartz'}); //#1. {name:'Swartz'}를 지우고 #2를 확인하면 [{name:'Max'}]만 남는다. 
                                        // ********************* 그런데 #1에서 지우는 {name:'Swartz'} 대신 {name:'Max'}를 지우면 역시 {name:'Max'}만 남는다. 왜 그럴까? 
                                        //jvaascript의 객체는 reference타입이다. #1에서 작성한 {name:'Max'}는 data에 입력된 객체가 아니라, 새로운 객체이다. 
                                        //#3의 item을 찾는 것은 기존 data 내부에서 reference를 찾는 것인데 #1의 reference 의 주소가 다르다. 
                                        //#1에서 {name:'Swartz'}를 지워도 실제 data에서 {name:'Swartz'}가 삭제되는 것이 아니라, 
                                        //#3의 this.data.splice(this.data.indexOf(item), 1); 는 찾을 수 없는 주소값(this.data.indexOf(item) ---> -1로 나온다.) 이기 때문에 
                                        //#3은 무조건 마지막 data의 원소를 지우게 된다. 
                                        //#3을 수정해야 한다. 
//또는 같은 주소를 가질 수 있도록 다음과 같이 #5를 수정한다. 
//const maxObj = {name: 'Max'}
//objStorage.removeItem(maxObj);


console.log(objStorage.getItems()); //#2



