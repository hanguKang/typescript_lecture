const config: { [input: string]: string[] } = {};
 
const addValidator = (input: string, type: string) => {
  config[input] = config[input] 
    ? [...config[input], type] 
    : [type];
}
 
const Required2 = (_: any, input: string) => addValidator(input, 'required');
const Maxlength2 = (_: any, input: string) => addValidator(input, 'maxlength');
const Positive2 = (_: any, input: string) => addValidator(input, 'positive');
 
const validate2 = (course: any) =>  {
  let isValidStr :string = '';
  Object.entries(config).every( ([input, types]) => // types에는 requried, maxlength가 2개 들어가거나, requried 와 positive 2개가 들어갈 것이다.     
    // types.every(type => 
    //   type === 'required' && course[input] || 
    //   type === 'positive' && course[input] > 0 ||
    //   type === 'maxlength' && course[input].length < 5
    // )
    
    types.every(type=>{
      // if( !(type === 'required' && course[input]) ){
      //   return 'none Value';
      // }

      // if( !(type === 'positive' && course[input] > 0 ) ){
      //   return 'none Positive';
      // }

      // if( !(type === 'maxlength' && course[input].length < 5) ){
      //   return 'none Value';
      // }
      switch (type){ 
        case 'required':
          isValidStr += course[input]? 'being' : 'required';
        case 'positive':
          isValidStr += (course[input] > 0)? 'positive': 'negative'; 
        case 'maxlength':
          isValidStr += (course[input].length < 5)? 'ok less 5' : 'no over 5';
      }
      return isValidStr;
    })
  )
}

class Course2 {
  
  @Required2 @Maxlength2 title: string;
  @Required2 @Positive2 price: number;
 
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
  alert(validate2(course2));
  console.log(course2);
});
