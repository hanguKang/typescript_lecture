// const names: Array<string> = [];


// const promise: Promise<string> = new Promise((resolve, reject)=>{
//   setTimeout(()=>{
//     resolve('This is done!');
//   },2000);
// });


// promise.then(data=>{
//   data.split(' ');
// })


function merge<T extends object, U extends object>(objA: T, objB: U){

  return Object.assign({},objA, objB);    
  
}

const mergedObj = merge<{name:string, hobbies:string[]},{age:number}>( {name:"Max", hobbies: ['Sports']}, {age:30} );

console.log(mergedObj.age);

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