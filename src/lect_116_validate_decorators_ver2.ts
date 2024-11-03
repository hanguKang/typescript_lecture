const config: { [input: string]: string[] } = {};
 
const addValidator = (input: string, type: string) => {
  config[input] = config[input] 
    ? [...config[input], type] 
    : [type];
}
 
const Required2 = (_: any, input: string) => addValidator(input, 'required');
const Maxlength2 = (_: any, input: string) => addValidator(input, 'maxlength');
const Positive2 = (_: any, input: string) => addValidator(input, 'positive');
console.log(config);
const validate2 = (course: any) =>  {
  //Object.entries(config).every( ([input, types]) =>
  // types.every(type => 
  //   type === 'required' && course[input] || 
  //   type === 'positive' && course[input] > 0 ||
  //   type === 'maxlength' && course[input].length < 5
  // )
  //)
  type isValidEl = {required:boolean; maxlength:string; positive:string;}; 
  let isValid: isValidEl =  {required:true, maxlength:'less', positive:'minus'};

  Object.entries(config).forEach( ([input, types]) => {// types에는 requried, maxlength가 2개 들어가거나, requried 와 positive 2개가 들어갈 것이다.   
      //console.log(input, types);
      types.forEach(type=>{
        // if( !(type === 'required' && course[input]) ){
        //   return 'none Value';
        // }

        // if( !(type === 'positive' && course[input] > 0 ) ){
        //   return 'none Positive';
        // }

        // if( !(type === 'maxlength' && course[input].length < 5) ){
        //   return 'none Value';
        // }
        console.log(type);
        switch (type){ 
          case 'required':
            isValid.required = course[input]? false : true;
            if(isValid.required){
              alert(  input + '항목은 필수 항목입니다.');
            }
            break;
          case 'maxlength':
            isValid.maxlength = (course[input].length < 5)? 'less' : 'greater';
            if(isValid.maxlength === 'greater' && !isValid.required){
              alert( input + '항목은 5글자 내로 작성합니다.');
            }
            break;
          case 'positive':
            isValid.positive = (course[input] > 0 )? 'plus': 'minus'; 
            if(isValid.positive === 'minus'){
              alert( input + '항목은 양수만 가능합니다.');
            }
            break;
        }// switch End
        
      }) //types.every End
       
  }) // Object.entries(config).every End
  return isValid
}

class Course2 {
  
  @Maxlength2 @Required2 title: string;
  @Positive2 @Required2 price: number;
 
  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }
 
}


const courseForm2 = document.querySelector('form')!;
courseForm2.addEventListener('submit', (e)=>{
  e.preventDefault();

  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;
  
  const title = titleEl.value;
  const price = +priceEl.value;
  
  const course2 = new Course2(title, price);
  
  // if(!validate2(course2)){
  //   alert('invalid Value');
  //   return false;
  // }
  validate2(course2);
  console.log(course2);
});
