
const configValid : { [name:string]:string[] } = {};
const addValid = (input: string, type : string)=>{
    configValid[input] = 
    configValid[input]
    ? [...configValid[input], type]
    : [type]
}
const Required_1 = (target:any, propName: string ) => addValid(propName, 'required');

const validateInput = (vals : any) : {required:boolean} => {
    let isValid : {required:boolean;} = {required:false}
    Object.entries(configValid).forEach(([input, types])=>{
        types.forEach((type)=>{

            switch (type){ 
                case 'required':
                    isValid.required = vals ? false : true;
                    if(isValid.required){
                        alert(  input + '항목은 필수 항목입니다.');
                    }
                    break;
                
            }// switch End

        });
    }) //forEach End
    return isValid;
}

const AutoBind_1 = ( target:any, methodName: string, descriptor : PropertyDescriptor )=>{
    const originalMethod = descriptor.value;
    const adjDescriptor : PropertyDescriptor = {
        configurable : true,
        enumerable : false,
        get(){
            let boundFn = originalMethod.bind(this);
            return boundFn; 
        }
    }
    return adjDescriptor;
}


class ProjectInput {
    templateElement: HTMLTemplateElement; 
    hostElement: HTMLDivElement;
    element : HTMLFormElement;
    @Required_1
    titleInputElement : HTMLInputElement;
    @Required_1
    descriptionInputElement : HTMLInputElement;
    @Required_1
    peopleInputElement : HTMLInputElement;
    constructor(){
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement; 
        this.hostElement =  document.getElementById('app')! as HTMLDivElement;
        console.log(this.templateElement); // HTMLCollection(유사배열 - 인덱스나 반복문을 통해 요소에 접근 가능하나 배열 메서드는 사용불가(foreEach, entires, keys, values사용 불가능), liveCollection 이다 : DOM변경사항이 실시간 반영)에 return  --> children속성으로 htmlcollection
        console.log(this.templateElement.content); // NodeList(유사배이지만, foreEach, entires, keys, values사용가능, 대부분의 nodeList는 Live Collection이지만, querysellectorAll은 static Collection으로 DOM변경사항이 실시간으로 반영되지 않는다. )에 return --> childNode nodeList
        const importedNode = document.importNode(this.templateElement.content, true); //this.templateElement.content의 자식노드도 가져올 거면 true
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input'; //form요소에게 id 값을 세팅햇다.
        this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;

        this.configure();
        this.attach();
    }

    
    private gatehrUserInput():{required:boolean}{
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = +this.peopleInputElement.value;
        
        
        const resultTitle : {required:boolean} = validateInput(enteredTitle);
        const resultDescription : {required:boolean} = validateInput(enteredDescription);
        const resultPeople : {required:boolean} = validateInput(enteredPeople);

        let resultInputVal : {required: boolean} = {required:true};
        if(resultTitle.required){
            resultInputVal = resultTitle;
        }
        if(resultDescription.required){
            resultInputVal = resultDescription;
        }
        if(resultPeople.required){
            resultInputVal = resultPeople;
        }
        return resultInputVal;
    }

    @AutoBind_1
    private submitHandler(event: Event){
        event.preventDefault();
        console.log(this.titleInputElement.value); //#1이 eventListener이 트리거돼서 실행될 때, this는 이벤트 객체를 가리킨다. 여기서는 이벤트 객체 #1의 this.element 인 form요소를 가리킨다. 따라서 bind(this)를 해줘야 refer되어서 class ProjectInput을 가리키게 된다. 
        const userInput : {required:boolean} = this.gatehrUserInput();
    } 
    private configure(){
        this.element.addEventListener('submit',this.submitHandler); //#1. this.element는 form요소를 가리킨다.  그리고 bind(this)는 class 'ProjectInput'를 가리킨다. 
                                                                    // this.element.addEventListener('submit',this.submitHandler.bind(this)) bind를 decorator(Autobind_1)로 먼저 설정해 버리자. 
    }
    private attach(){
        this.hostElement.insertAdjacentElement('afterbegin', this.element); //요소 변경이 아닌 요소 삽입만을 해야 하는 상황일 때 : 인자로 (넣을 위치, 넣고 싶은 요소)
        //const foodArray = ["김밥", "방어", "사과", "오렌지"]
        //const FOOD_TEMPLATE = (food) => '<div class="list_food">'+food+'</div>'
        //foodArray.forEach(food => body.innerHTML += FOOD_TEMPLATE(food))
        //innerHTML에 값이 할당될 때마다 DOM Tree는 새로 그려진다.
        //코드 상으로는 += 연산자로 간단하게 표현되었지만, 실제 동작은 그렇지 않을 것이다. 다음을 보자
        // body.innerHTML = '<div class="list_food">김밥</div>'
        // body.innerHTML = '<div class="list_food">김밥</div><div class="list_food">방어</div>'
        // body.innerHTML = '<div class="list_food">김밥</div><div class="list_food">방어</div><div class="list_food">사과</div>'
        // body.innerHTML = '<div class="list_food">김밥</div><div class="list_food">방어</div><div class="list_food">사과</div><div class="list_food">오렌지</div>'
        //물론, 위 방법을 보완하기 위하여 다음과 같이 함수를 쓸 수도 있을 것이다.
        //reduce 함수로 HTML을 합친 후 innerHTML에 할당하면 여러번 돔 트리가 교체되는 것을 막을 수 있다.
        // const foodArray = ["김밥", "방어", "사과", "오렌지"]
        // const FOOD_TEMPLATE = (food) => '<div class="list_food">'+food+'</div>'
        // body.innerHTML = foodArray.reduce((acc, cur)=>acc+=FOOD_TEMPLATE(cur), "")
        // 그러나 첫 렌더링 이후로 새 요소가 추가되어야 하는 상황이라면 다른 해결책이 필요할 것이다.
        // 그래서 필요한 것이 element.insertAdjacentHTML(position, text);
        // position : position의 값은 beforebegin(요소의 시작 태그 앞), afterbegin(요소의 시작 태그 뒤), beforeend(요소의 닫는 태그 앞), afterend(요소의 닫느태그 뒤)만 사용할 수 있으며, 각각 값에 해당하는 위치는 아래 그림에 표시해 두었다.
        // text : 해당 위치에 삽입될 HTML 요소의 text값

    }
}

const prjInput = new ProjectInput();