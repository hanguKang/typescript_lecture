class ProjectState {
  private listeners : any[] = [] //#BBB-1: 값이 변할 때마다 계속 추가되는 배열을 만들어 놓는다.
  private projects : any[] = []
  private static instance : ProjectState; //this.getInstance메소드에서 사용하는데, static 메소드이기 때문에 static으로 멤버필드로 사용함. 

  private constructor(){

  }

  static getInstance(){
    if(this.instance){
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addListener(listenerFn : Function){
    this.listeners.push(listenerFn);
  }

  //ProjectInput의 인스턴스에서 input 값들을 입력하고 submit버튼을 누르는 순간 프로젝트를 추가한다.
  //1. ProjectList 인스턴스(activePrjList 와 finishedPrjList)가 생성될 때 constructor에서 
  //----> projectState.addListener 메소드를 실행해서 projectState.listeners배열에 함수를 할당한다. 이 함수의 역할은 실행할 때 
  //1. ProjectList 인스턴스(activePrjList 와 finishedPrjList).assignedProjects 배열에 파라미터를 값으로 할당하고, 각인스턴스.renderProject를 실행시킨다.
  //2. 
  addProject(title: string, description: string, numOfPeople: number){
    const newProject = {
      id: Math.random().toString(),
      title: title, 
      desription: description, 
      people: numOfPeople
    }; 
    this.projects.push(newProject); //#DDD-1 : 배열에 값으로 또 배열을 넣어버림.
    for( const listenerFn of this.listeners ){
       listenerFn(this.projects.slice()); //#ccc-1 : 실제 원본 데이터(this.projects를 원소화해서)를 넘기면 reference(원본 참조)를 넘기기 때문에 문제가 생길 수 있다. 때문에 복사본 slice 메소드를 사용해서 함수에 파라미터를 넘긴다. ---> 클래스 projectList에서 연결된 작동을 할 수 있도록 한다. 
    }
  }
}

const projectState = ProjectState.getInstance(); // #AAA-1 : 이제 우리는 프로젝트에서 단 하나의 유형의 인스턴스만을 가질 수 있다.

interface Validatalbe {
  value : string | number; 
  required? : boolean; 
  minLength? : number; 
  maxLength? : number; 
  min? : number; 
  max? : number; 
}

function validate_3 (validatableInput : Validatalbe){
  let isValid = true; 
  if(validatableInput.required){
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if(validatableInput.minLength !== null && validatableInput.minLength !== undefined && typeof validatableInput.value === 'string'){ 
    isValid = isValid && validatableInput.value.length >= validatableInput.minLength; 
  }
  if(validatableInput.maxLength !== null && validatableInput.maxLength !== undefined && typeof validatableInput.value === 'string'){
    isValid = isValid && validatableInput.value.length <= validatableInput.maxLength; 
  }
  if(validatableInput.min !== null && validatableInput.min !== undefined && typeof validatableInput.value === 'number'){
    isValid = isValid && validatableInput.value >= validatableInput.min; 
  }
  if(validatableInput.max !== null && validatableInput.max !== undefined && typeof validatableInput.value === 'number'){
    isValid = isValid && validatableInput.value <= validatableInput.max; 
  }
  return isValid; 
}

const AutoBind_3 = ( _:any, _2: string, descriptor : PropertyDescriptor )=>{
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

class ProjectList {
  templateElement: HTMLTemplateElement; 
  hostElement: HTMLDivElement;
  element : HTMLElement; // html파일의 section element가 될 것이다. 
  assignedProjects : any[];

  constructor(private type: 'active' | 'finished'){
    this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement; 
    this.hostElement =  document.getElementById('app')! as HTMLDivElement;

    this.assignedProjects = []; //초기화

    const importedNode = document.importNode(this.templateElement.content, true); //this.templateElement.content의 자식노드도 가져올 거면 true
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;

    
    projectState.addListener( (  projects : any []) =>{  //#ccc-2:   ProjectState클래스의 listeners 배열에 화살표 함수를 값으로 넣는다. 넣고 실행할 마다 파라미터를 ProjectList의 인스턴스에 assignedProject 배열에 값으로 넣는다. 그리고 renderProjectgs를 실행한다. 
      this.assignedProjects = projects; //#FFF-1 : #ccc-1에 의해서 파라미터(id, title, description, people)를 넣는다. 
      this.renderProjects(); //화살표 함수의 this는 존재하지 않는다. 그래서 this는 외부의 this ====> ProjectList 클래스를 가리킨다. 
    }); 

    this.renderContent();
    this.attach();
  }

  private renderProjects(){//#CCC-3 : 상단의 #CCC-2에 화살표 함수(renderProjects를 실행하는 함수)를 정의 #CCC-1에서 호출
    const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
    //for (const prjItem of this.assignedProjects){
    const prjItem = this.assignedProjects[this.assignedProjects.length-1]
      const listItem = document.createElement('li');
      listItem.textContent = prjItem.title;
      listEl.appendChild(listItem);
    //}
  }

  private renderContent(){
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS'
  }
  private attach(){
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
}

class ProjectInput_3 {
    templateElement: HTMLTemplateElement; 
    hostElement: HTMLDivElement;
    element : HTMLFormElement;
    titleInputElement : HTMLInputElement;
    descriptionInputElement : HTMLInputElement;
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

    @AutoBind_3
    private gatehrUserInput() : [string, string, number ] | void {
        const enteredTitle : string = this.titleInputElement.value;
        const enteredDescription : string = this.descriptionInputElement.value;
        const enteredPeople : number = +this.peopleInputElement.value;
        

        const titleValidatable : Validatalbe = {
          value: enteredTitle, required: true
        }
        const descriptionValidatable : Validatalbe = {
          value: enteredDescription, required: true, minLength: 5
        }
        const peopleValidatable : Validatalbe = {
          value: +enteredPeople, required: true, min: 1, max: 5
        }

        // if(enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredPeople === 0 ){
        if( !validate_3(titleValidatable) || !validate_3(descriptionValidatable) || !validate_3(peopleValidatable)){
          alert('Invalid input value, please try agin!!');
          return; 
        }else{
          return [enteredTitle, enteredDescription, enteredPeople];
        }
    }

    private clearInputs(){
      this.titleInputElement.value = '';
      this.descriptionInputElement.value = '';
      this.peopleInputElement.value = '';
    }

    @AutoBind_3
    private submitHandler(event: Event){
        event.preventDefault();
        
        const userInput = this.gatehrUserInput(); //유저가 입력한 값들을 가져오는데, 밸리데이팅을 한다. 
        if( Array.isArray( userInput ) ){
          const [title, desc, people] =  userInput;
          //console.log(title, desc, people);

          //submit버튼을 누르자마자 ProjectState의 인스턴스에 값을 넣는다. 
          projectState.addProject(title, desc, people); //#AAA - 유저가 input 필드의 값들이 입력한 후 (인풋 값들이 들어갈 수 있는 클래스를 인스턴스로 만들어 최상위로 올리고) 클래스의 인스턴스에 값들을 넣어버린다. 
          this.clearInputs();
        }
    } 
    private configure(){
        this.element.addEventListener('submit',this.submitHandler); 
    }
    private attach(){
        this.hostElement.insertAdjacentElement('afterbegin', this.element); 

    }
}

const prjInput_3 = new ProjectInput_3();

const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');