function Autobind(target: any, methodName :string , descriptor: PropertyDescriptor){ //target과 mentodName을 사용할 필요 없다면, _:any, _2:string으로 사용하자.
                                                                                     // _:any, _2:string
  const originalMethod = descriptor.value;
  const adjDescriptor : PropertyDescriptor = {
    configurable : true, 
    enumerable : false, 
    get(){ //여기서 get은 methodName을 호출해서 실행할 때 작동되는 방식을 정의한다. , 반면 set (파라미터) {} 가 정의되면 호출할 때 전달인자를 전달하면 methodName이 실행되는 방식을 정의한다. 
      const boundFn = originalMethod.bind(this); //#2. 여기서 this는 originalMethod를 사용하는 객체에 refer(연결)된다. addEventListner에 의해서 overwritten되지 않는다. 
                                                 //    중요한 점은 get 메소드가 실행되는 것은 addEventListen에 의해 실행될 때 이중적으로 실행되는 것이다. #3d의 addEventListener의 p1.showMessage만 놓고 보면 showMessage가 가리키는 this는 호출객체에 따라서 달라지지만, addEventListener는 get를 다시 호출하는 여분의 백그라운드 레이어라고 생각하면 된다. 때문에 여기서 가리키는 this는 addEventListenr에 의해서 overwritten되지 않는다. 
      return boundFn;
    }
  }
  return adjDescriptor;
}


class Printer_1 {
  message = 'This works!';

  @Autobind
  showMessage(){
    console.log(this.message); //#1
  }

}
let p1 = new Printer_1();
p1.showMessage();
const button_1 = document.querySelector('button')!;

//시나리오 1번, 직접 bind를 사용해서 객체와 연결시켜준다. 
//button_1.addEventListener('click', p1.showMessage.bind(p1)); // #1의 this는 event target인 버튼을 의미하기 때문에 bind로 p1을 this화 시킨다. 

//시나리오 2번, 미리 addEventListener에서 사용하는 함수의 this를 #2에 의해서 객체와 연결시킨다. 
button_1.addEventListener('click', p1.showMessage); //#3.



