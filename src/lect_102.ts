interface CourseGoal{
  title:string;
  description: string; 
  completeUntil : Date; 
}

function createCourseGoal (
  title: string, 
  description: string, 
  date : Date
) : CourseGoal {

  let courseGoal : Partial<CourseGoal> = {};
  courseGoal.title = title; 
  courseGoal.description = description; 
  courseGoal.completeUntil  = date; 

  return courseGoal as CourseGoal; 
}

const names_1: Readonly<string[]> = ['Max', "Anna"];
// names.push('Manu');
// names.pop();


// Generic vs union 
// 아래 예제는 lect_95에 있는 DataStorage 클래스 예제이다. 이 예제를 T가 있던 자리<generic>을 모두 union타입으로 변경해보겠다. 
// 별반 차이가 없어보인다. 

class DataStorage_1 { 
  //private data : (string | number | boolean)[] = []; // 이 방식은 string, number, boolean 이 세가지의 mixed된 배열을 만들 수 있다. generic과는 다르다는 뜻이다. 
  private data : string[] | number[] | boolean[] = []; //#1 generic타입처럼 한 가지만 가능하도록 한다. 
  addItem(item :string | number | boolean ){ // #1처럼 하게 되면 문제가 된다. number타입이 오면, data : string[] 배열에 연결될 수 있을것인가?
                                             // 아니면, number[]에 string 배열을 넣을 수 있을 것인가? 이 때문에 #2 #3 #4 는 에러가 난다. 
                                             
    //this.data.push(item); //#2 
  }
  removeItem(item : string | number | boolean ){ //#3
    //this.data.splice(this.data.indexOf(item), 1); 
    //#4.
    // if(this.data.indexOf(item) === -1){
    //   return;
    // }
    // this.data.splice(this.data.indexOf(item), 1);
  }

  getItems(){
    return [...this.data];
  }
}