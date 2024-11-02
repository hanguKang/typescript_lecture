//module
//1. Intersection type
//2. Discriminated Unions
//3. Type casting
//4. Index Property
//5. Function overload


//intersection
type Admin1 = {
  name : string;
  privileges : string[]
}
type Employee1 = {
  name : string; 
  startDate : Date;
}

type ElevatedEmployee1 = Admin1 & Employee1; 

const e1 : ElevatedEmployee1 = {
  name :'Max',
  privileges : ['create-server'],
  startDate : new Date(),
}

//type guard
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric; 

function add_fn ( a : Combinable, b : Combinable) {
  if(typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b; 
}

type UnknownEmployee = Employee1 | Admin1; 

function  printEmployeeInformation1( emp : UnknownEmployee ){
  console.log('Name: ' + emp.name );
  if('privileges' in emp ){//typeguard
    console.log('Privileges: ' + emp.privileges);
  }
  if('startDate' in emp ){//typeguard
    console.log('Privileges: ' + emp.startDate);
  }
}

printEmployeeInformation1(e1);


class Car1 {
  drive(){
    console.log('Driving...');
  }
}

class Truck1 {
  drive(){
    console.log('Driving a truck...');
  }
  loadCargo(amount: number){
    console.log('Loading cargo ...' + amount);
  }
}


type Vehicle1 = Car1 | Truck1;

const v1 = new Car1();
const v2 = new Truck1();

function useVehicle (vehicle : Vehicle1){
  vehicle.drive();
  // if('loadCargo' in vehicle){
  //   vehicle.loadCargo(1000);
  // }
  if(vehicle instanceof Truck1){
    vehicle.loadCargo(1000);
  }
}
useVehicle(v1);
useVehicle(v2);

interface Bird1 {
  kind: 'bird';
  flyingSpeed : number; 
}

interface Horse1 {
  kind: 'horse';
  runningSpeed: number;
}

//type은 interface와 비슷해서 interface 타입으로 type형식을 만들 수 있다. 
type Animal1 = Bird1 | Horse1; 

function moveAnimal(animal: Animal1){
  // if('flyingSpeed' in animal){
  //   console.log('Moving with speed' + animal.flyingSpeed);
  // }else if('runningSpeed' in animal){
  //   console.log('Moving with speed' + animal.runningSpeed);
  // }

  let speed;

  switch (animal.kind){
    case 'bird':
      speed = animal.flyingSpeed;
      break; 
    case 'horse': 
      speed = animal.runningSpeed;
  }

}

moveAnimal({kind:'bird', flyingSpeed:10});
//type casting
//#1과 #2중 한가지만 사용해야하며, 혼용해서 사용하는 것은 좋지 않다. 
//const userInputElment = <HTMLInputElement>document.getElementById('user-input')!; //#1  : 하지만 이는 React를 사용한다면 에러가 발생할 수 있는데 <type casting>는 React에서 <컴포넌트>로써 하나의 자식 또는 부모 컴포넌트로 사용되기 때문에 이와같은 type casting은 문법의 중복을 야기한다. 따라서 React 한정으로 다른 타입 캐스팅을 지원한다. #2 as 방식을 사용하는 것이 좋다.
// const userInputElment = document.getElementById('user-input')! as HTMLInputElement; //#2 
// if(userInputElment){
//   userInputElment.value = 'HI there!'; //#1에서 type casting을 하지 않았다면 value값을 가져올 수 없다. tsconfig.json에서 lib속성에 :["dom"] 값이  <HTMLInputElement>의 타입 캐스팅을 할 수 있도록 도와준다. 
// }

//요소가 존재할지 모른다면 다음과 같이 한다. 
const userInputElment = document.getElementById('user-input'); //#3
if(userInputElment){ 
  (userInputElment as HTMLInputElement).value = 'HI there!'; 
} 