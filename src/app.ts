

interface ValidatorConfig1 {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators1: ValidatorConfig1 = {};

function Required1(target: any, propName: string) {
  registeredValidators1[target.constructor.name] = {
    //...registeredValidators1[target.constructor.name],
    [propName]: ['required']
  };
}

function PositiveNumber1(target: any, propName: string) {
  registeredValidators1[target.constructor.name] = {
    //...registeredValidators1[target.constructor.name],
    [propName]: ['positive']
  };
}

function validate1(obj: any) {
  const objValidatorConfig = registeredValidators1[obj.constructor.name];
  console.log(objValidatorConfig);
  if (!objValidatorConfig) {
    return true;
  }
  //let isValid = true;
  for (const prop in objValidatorConfig) {
    //console.log(prop)
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          //isValid = isValid && !!obj[prop];          
          //break;
          return !!obj[prop];
        case 'positive':
          //isValid = isValid && obj[prop] > 0;
          //break;
          return obj[prop] > 0;
      }
    }
  }
  //return isValid;
  return true;
}

class Course1 {
  @Required1
  title: string;
  @PositiveNumber1
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm1 = document.querySelector('form')!;
courseForm1.addEventListener('submit', event => {
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course1(title, price);

  if (!validate1(createdCourse)) {
    alert('Invalid input, please try again!');
    return;
  }
  console.log(createdCourse);
});
