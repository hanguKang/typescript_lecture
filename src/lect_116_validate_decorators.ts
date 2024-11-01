//html에서 데이터를 fetch로 얻던, 직접 입력하던, validate하고 싶을 때 사용한다.


interface ValidatorConfig{ // 이 인터페이스는 어떤 클래스가 valid를 하고 싶은 것이 있을 때 사용할 수 있는 frame이라고 하자. 
                           // 값이 필수오 있어야 하는 것(required인지 - 값이 현재 들어있는지 없는지 )과 숫자가 positive(숫자가 양수)인지 아닌지를 판단하는 interface라고 하자. 

  [property: string] : {  //#1 클래스명을 의미한다. 
    [validatableProp : string] : string[] // string타입 속성이며, 값은 string배열로 갖는다. 우리가 할 건 'requried ['requried', 'positive']  가질 속성들을 미리 설정해 놓는다.
  }
}
const registeredValidators : ValidatorConfig = {}; //빈객체여야 하는 이유는 앱이 시작되면서 타사 라이브러리가 로드되면 유효성 검사자(Required, positiveNumber)가 아직 등록되지 않았기 때문입니다.



function Required(target: any, propName : string){
  registeredValidators[target.constructor.name] = { // registeredValidators[target.constructor.name]는 여기서는 Course_1를 의미한다. javascript에서는 constructor의 속성으로 name을 갖고 name은 생성자 클래스명을 의미한다. registeredValidators[target.constructor.name] --> #1 
    ...registeredValidators[target.constructor.name], //spread 연산자 - 기존의 속성이 있다면 이곳으로 더해지게 될 것이다. 
    [propName] : [...( registeredValidators[target.constructor.name]?.[propName] ?? []), 'required'] // 이미 다른 validators가 이 속성으로 등록되어 있다면, 덮어씌울 것입니다. , 이미 존재하는 validators가 있다면,  여기 배열 안으로 복사해 넣어버리는 것입니다.
  }
}

function PositiveNumber(target: any, propName : string){
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name], //spread 연산자 - 기존의 속성이 있다면 이곳으로 더해지게 될 것이다. 
    [propName] : [...( registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive'] 
  }
}

function validate(obj: any ){ //obj: object타입으로 하지 않는 것은 아래 실행문에서 for of 반복문 내부에 !!obj[prop] 속성이 존재할지 boolean일지 알 수 없기 때문에 any로 넣는다. 

  //console.log('title 값 :' + typeof obj.title); string을 찍는 것 보니 값은 있다. ---> 빈 문자열 '' 
  //console.log('price 값 :' + typeof obj.price);

  const objValidatorConfig = registeredValidators[obj.constructor.name]; //클래스명 #a : Course_1  <--- interface의 형식을 왜 저렇게 만들었는지 #1과 연관된다. 
                                                                         //interface ValidatorConfig 로 인해서 Required 데코레이터에 의해서 title은 ['required']의 영향을 받게 됐다.
                                                                         //interface ValidatorConfig 로 인해서 PositiveNumber 데코레이터에 의해서 pricesms ['positive']의 영향을 받게 됐다.
                                                                         // Required와 PositiveNumber 데코레이터(함수)가 그렇다.  

  //console.log(objValidatorConfig);

  if(!objValidatorConfig) {
    return true; //클래스가 없다면 validate할 것이 없다면, true를 return하는 것이 맞다. 이 함수를 호출한 곳에 if문이 있고,  return값의 boolean에 의해서 if구문이 결정된다. 
  }

  let isValid = true; //#3333을 대체할 구문이다. 
  //클래스에서 validate 할 것이 있다면 다름과 같이 loop을 행하며 값이 
  for(const prop in objValidatorConfig){ //for in 반복문 : 객체의 모든 열거 가능한 Course_1 클래스의 속성명에 접근할 수 있다.
    //console.log(prop)
    for (const validator of objValidatorConfig[prop]){ // for of 반복문 : [Symbol.iterator] 속성을 가지는 컬렉션 전용, 속성(Requried, PostiveNumber 들은 각각의 [propNmae])의 값으로 validate될 것이다. 현재 각 배열이며, 하나만 더 validate될 것이 추가가 된다는 가정을 해보면 나열되어야 하기 때문에 처음부터 배열이어야 한다. 그래서 [propPname]의 값을 배열로 한다. 때문에 반복문인 for of loop 연산자를 사용한다. 
      //console.log(validator);
      //console.log(obj[prop]);
      switch (validator){ // ****************** 맨 처음 오는 속성은 decorator의 속성에 의해서 PositiveNumber와 Required가 실행된다. 처음 positive 속성 한가지만 오고 #3333 return 키워드에 의해서 함수는 끝난다. 두번째 속성 required가 실행되지 않는다. 
        case 'required':
          //return !!obj[prop]; // #3333 !!은 값의 truthiness를 명시적으로 boolean 타입으로 변환하는 데 사용된다. 빈공간 input 값 빈 문자열 ""는 false로 대체된다. 
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          //return obj[prop] > 0; // #3333
          isValid = isValid && obj[prop] > 0;
          break;
      } 
    }
  }// for End

  // return true; // 이 함수를 호출했던 if문 #b 가 실행되지 않도록 기본값으로 우선 true를 지정한다.  이 함수를 호출한 곳에 if문이 있고,  return값의 boolean에 의해서 if구문이 결정된다. 

  return isValid;
}



class Course_1 { //#a

  @Required
  title: string; //Required 데코레이터가 실행되면서 title: ['required'] 로 지정된다. 
  @Required
  @PositiveNumber
  price: number; //PositiveNumber 데코레이터가 실행되면서 price: ['Positive'] 로 지정된다. 
  

  constructor (t: string, p: number){
    this.title = t; 
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;

courseForm.addEventListener('submit', event =>{
  event.preventDefault();

  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value; //number로 변환시키기 위해서 +를 앞에 추가했다.

  const createdCourse  = new Course_1(title, price); 


  if(!validate(createdCourse)){ //#b
    alert('Invalid input, please try again!');
    return;
  }
  console.log(createdCourse);

});


