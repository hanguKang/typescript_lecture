
interface Draggable{
  dragStartHandler(event:DragEvent):void
  dragEndHandler(event:DragEvent):void
}
interface DragTarget{
  dragOverHandler(event:DragEvent):void
  dropHandler(event:DragEvent):void
  dragLeaveHandler(event:DragEvent):void
}


enum ProjectStatus { 
  Active, 
  Finished 
}

class ProjectType   {
  constructor(
    public id: string,
    public title:string, 
    public descript:string, 
    public people:number,
    public status: ProjectStatus
    
  ){  }
}



//원안 #Listener
//type Listener =   (inputVals:ProjectType[]) => void //ProjectType을 배열로 가져야 하는 함수
//대안
type Listener <T>=   (inputVals:T[]) => void //generic을 배열로 가져야 하는 함수

abstract class State <T>{
  //proteced를 사용하는 이유는 상속으로 인해서 내부에서 사용할 수 있게 만들기 위해서이다. 
  protected listeners:Listener<T>[]=[] //#Listener 를 찾아보면, type Listener 함수를 generic으로 변경해서 전달인자를 projectType에서 제네릭으로 사용하도록 변경했다. 때문에 앞으로 Listener를 사용하기 위해서는 제네릭 방식으로 표현해야 한다. 전달인자를 제네릭 타입으로 전달해줘야 하기 때문이다. 
  addListener( fn: Listener<T>){
    this.listeners.push(fn);
  }
}

//원안 
//class ProjectState2 {
class ProjectState2 extends State<ProjectType>{
  private static instance : ProjectState2; //static메소드에서 호출하기 때문에 static 선언

  //원안
  //listeners:Listener[]=[]
  //대안은 class State 의 내부에서 실행 변경 대체
  private projects:Array<ProjectType>=[]
  
  private constructor(){ // getInstance에서 내부적으로만 인스턴스를 생성할 것이기 때문에 private으로 선언
    super();
  }
  static getInstane(){
    if(!ProjectState2.instance) {
      ProjectState2.instance = new ProjectState2();
    }
    return ProjectState2.instance;
  }
  
  addProject( inputObj: Omit<ProjectType, 'id'|'status'> & {status?:ProjectStatus}){
    const newProject= new ProjectType(Math.random().toString(), inputObj.title , inputObj.descript , inputObj.people , ProjectStatus.Active)
    this.projects.push(newProject);
    //console.log(this.listeners)
    //console.log('왜?',this.projects)

    //new ProjectList2('active') or ('finished') 할 때 html요소가 렌더링되고 listener가 등록 된다. 
    //form요소의 submit버튼을 클릭하면 ProjectState인스턴스의 addProject를 실행해서 input 정보를 
    // ProjectList2에 assigendProject에 할당이 된다. 
    this.listeners.forEach(fn=>
      
      fn(this.projects)
    )
  }
 
  //원안 --> //대안은 class State 상속하면서 State의 내부 메소드로 변경 대체
  // addListener( fn: Listener){
  //   this.listeners.push(fn);
  // }
}

const projectState2 = ProjectState2.getInstane(); //instance를 여러개 생성하면 안된다. 두개의 클래스에서 데이터를 받아서 그 데이터들을 컨틀로 해주는 클래스이기 때문이다.

/* 클래스들 공통된 멤버필드, 메소드 합치기 */
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  rootElement :T //랜더링 되는 요소의 루트 엘리머트가 되는 요소
  templateElement
  projectElement : U //실제 렌더링이 되는 요소
  constructor(rootId:string, templateId:string, beforeAfter:boolean, type?:string,){
    this.rootElement = document.getElementById(rootId) as T;
    this.templateElement = document.getElementById(templateId) as HTMLTemplateElement; //template 태그
    const tempElemnt = document.importNode(this.templateElement.content, true); // (this.templateElement.content : template 태그의 첫번째 컨텐츠(자식노드), true: 그 하위 요소들도 모두 가져온다. )
    this.projectElement = tempElemnt.firstElementChild as U //template태그의 가장 첫번째 자식요소를 가리킨다.
    if(!!type){
      this.projectElement.id=type
    }

    this.attach(beforeAfter)
  }
  private attach(beforeAfter:boolean){
    this.rootElement.insertAdjacentElement(beforeAfter?'afterbegin':'beforeend', this.projectElement)
  }
  abstract renderContent():void
  abstract configure():void 

}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable{
  project : ProjectType // ProjectType으로 this.project를 만드는 이유는 이 클래스를 인스턴스화 하면 인스턴스.project.title, 인스턴스.project.descript 등을 사용할 수 있다.  constructor로 ProjectList2에 저장된 addAssignProjects의 원소들 중 하나를 선택해서 그 속성들을 가지고 li를 구성할 것이기 때문이다. 
  constructor(rootId:string, project:ProjectType){
    super(rootId, 'single-project', true, project.id) //전달인자: 1, li의 아이디, 2. 템플릿 태그 single-project를 소스로 작성, 3. ul요소 앞에 둘지 뒤에 둘지 결정, 4. project.id를 li요소츼 첫번째 자식의 id값으로 지정
    this.project = project;
    
    this.renderContent()
  }
  renderContent(): void { //single-project를 통해서 소스를 불러와서 작성할 때 
    //Component의 제네릭으로 HTMLUListElement와 HTMLLIElement로 지정했기 때문에 Component의 rootElement는 ul요소이고, Component의 projectElement는 li엘리먼트이며, project의 속성들을 가지고 li의 자식요소들을 찾아서 구성한다.
    console.log(this.projectElement);
    this.projectElement.querySelector('h2')!.textContent = this.project.title;
    this.projectElement.querySelector('h3')!.textContent = this.project.people.toString();
    this.projectElement.querySelector('p')!.textContent = this.project.descript;
  }
  configure(): void {
    
  }
  dragEndHandler(event: DragEvent): void {
    
  }
  dragStartHandler(event: DragEvent): void {
    
  }
}


class ProjectList2 extends Component<HTMLDivElement, HTMLElement>{
  // rootElement
  // templateElement
  // projectElement
  titleElement
  listElement
  addAssignProjects:Array< ProjectType >=[]

  constructor(private type:'active'|'finished'){
    super('app','project-list', false, `${type}-projects`)
    // this.rootElement = document.getElementById('app') as HTMLDivElement;
    // this.templateElement = document.getElementById('project-list') as HTMLTemplateElement;
    // const tempElemnt = document.importNode(this.templateElement.content, true);
    // this.projectElement = tempElemnt.firstElementChild as HTMLDivElement //section요소
    // this.projectElement.id=`${type}-projects`
    this.titleElement =  this.projectElement.querySelector('h2') as HTMLHeadingElement;
    this.listElement = this.projectElement.querySelector('ul') as HTMLUListElement;
    
    //원안
    //abstract Component때문에 configure함수로 옮김 
    // projectState2.addListener((projects:ProjectType[])=>{

    //   //submit으로 projectState2.addProject() 실행
    //   //console.log('실행?')
    //   const relevantProject = projects.filter(prj =>{
    //     if(this.type === 'active'){
    //       return prj.status === ProjectStatus.Active
    //     }
    //     return prj.status === ProjectStatus.Finished
    //   })
    //   this.addAssignProjects = relevantProject

    //   //console.log(this.type, this.addAssignProjects);
    //   if(this.addAssignProjects.length>0) this.render();
    // })

    //대안
    this.configure();

    this.renderContent();
  }

  @Autobind_4
  configure(){
    projectState2.addListener((projects:ProjectType[])=>{

      //submit으로 projectState2.addProject() 실행
      //console.log('실행?')
      const relevantProject = projects.filter(prj =>{
        if(this.type === 'active'){
          return prj.status === ProjectStatus.Active
        }
        return prj.status === ProjectStatus.Finished
      })
      this.addAssignProjects = relevantProject

      //console.log(this.type, this.addAssignProjects);
      if(this.addAssignProjects.length>0) this.render();
    })
  }
  render(){
    const listElement = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
    const currentObject = this.addAssignProjects[this.addAssignProjects.length-1];

    //원안 (ProjectItem을 사용하기 전)
    // const tempLiElement = document.createElement('li');
    // let tempStr = '';

    //https://ella951230.tistory.com/entry/%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%97%90%EB%9F%AC-Type-undefined-cannot-be-used-as-an-index-type
    //객체의 index 타입으로 string을 사용할 수 없다? ---> 
    /*
      const a = "Hello World"
      // ⭐ 컴파일러는 이 변수를 string이 아닌 조금 더 좁은 타입으로 선언한 것으로 추론한다.(Literal Narrowing)
      // ⭐ a의 타입은 string 타입보다 훨씬 구체적인 "Hello World" 타입이다.

      let b = "Hello World"        
      // ⭐ b변수는 let으로 선언되어 재할당될 수 있을 경우 어떤 문자열이든 넣을 수 있으며 그 경우의 수가 무한대
      // ⭐ 그렇기 때문에 컴파일러는 이 변수를 string타입으로 추론한다.

      const c: string = "Hello World"
      //c 변수는 명시적으로 string 으로 선언했으므로 string 타입이다.


      const obj = {
        foo: "hello"   
      }

    let propertyName = "foo"  //propertyName는 string 타입(let) 

    console.log(obj[propertyName])
    // 💣💣 컴파일 에러!
    //에러가 발생한 이유는 string literal 타입만 허용되는 곳(객체의 key)에 string 타입을 사용했기 때문


    const obj = {
      foo: "hello",
    }

    const propertyName = "foo"

    console.log(obj[propertyName]) // ok!
    console.log(obj["foo"]) // ok!
    // ⭐⭐ 정상 컴파일
    //⭐⭐ "foo"와 propertyName 모두 string literal type

    즉, 여기 for문의 prop의 속성의 타입은 string literal이 되어야 한다. 
    */
    // for(const prop in currentObject){
    //   if(prop in currentObject){
    //     tempStr += `${prop} : ${ currentObject[prop] }` // 여기를 어떻게 해결해야 할까? 이전에는 class ProjectType 대신에 {[key:string]:string|number} 이렇게 해결했거든
    //   }
    // }


    //원안 -----------------------------------------------------------------------------------------------------------------
    //index signature를 사용할 수 없다면, 이런식으로 인스턴스 객체를 배열형식으로 key와 value로 분할시켜서 작성한다. 
    // for(const [key, value] of Object.entries(currentObject)){
    //   tempStr += `${key}: ${value} `;
    // }
    // tempLiElement.textContent = tempStr;


    // listElement.appendChild(tempLiElement)

    //대안 -----------------------------------------------------------------------------------------------------------------
    //ProjectItem으로 대체한다. html의 template tag의 id="single-project"의 것을 이용해서 작성한다. 
    new ProjectItem(listElement.id, currentObject)
    
  }

  renderContent(){
    this.titleElement.textContent = `${this.type.toUpperCase()} PROJECT`;
    this.listElement.id = `${this.type}-projects-list`;

  }


}





type Validatable2 = {value:string|number, required?:boolean, positive?:boolean, min?:number, max?:number, minLength?:number}

function validateInput_2(validObj:Validatable2){
  type isValid = {required?:string, positive?:string, min?:string, max?:string, minLength?:string};
  const resultValidMsg:isValid = {required:"it's required", positive:"it needs positve number", min:`it needs over than ${validObj.min}`, max:`it needs less  than ${validObj.max}`, minLength:`it needs over than ${validObj.minLength} length`} 

  // console.log('길이',validObj.value.toString().trim().length);
  // console.log('min', !!validObj.min)
  // console.log('max', !!validObj.max)
  // console.log('positive', !!validObj.positive)
  // console.log('minLength', !!validObj.minLength)
  

  if(!!validObj.required && typeof validObj.value === 'string' && validObj.value.toString().trim().length === 0 ){
    //console.log('required 들어왔음')
    return resultValidMsg.required 
  }

  if(!!validObj.min && typeof validObj.value === 'string' && validObj.value.length < validObj.min){
    //console.log('min 들어왔음')
    return resultValidMsg.min
  }
  if(!!validObj.max && typeof validObj.value === 'string' && validObj.value.length > validObj.max){
    //console.log('max 들어왔음')
    return resultValidMsg.max
  }
  if(!!validObj.positive && typeof validObj.value === 'number' && validObj.value <= 0){
    //console.log('positive 들어왔음')
    return resultValidMsg.positive
  }

  if(!!validObj.minLength && typeof validObj.value === 'number' && validObj.value < validObj.minLength){
    //console.log('minLength 들어왔음')
    return resultValidMsg.minLength;
  }
  

}

function Autobind_4(_type:any, _name:string, descriptor:PropertyDescriptor){
  const originMethod = descriptor.value;
  descriptor={
    configurable:true,
    enumerable:false, 
    get(){
      const bindMethod = originMethod.bind(this);
      return bindMethod;
    }
  }
  return descriptor; 
}

class InputValidate extends Component<HTMLDivElement, HTMLFormElement>{

  // templateElement:HTMLTemplateElement;
  // rootElement:HTMLDivElement;
  // formElement:HTMLFormElement; // ===> #이름 : extends Component 사용하면서 super에서 호출해서 만들고 있다. Component 내부에 있는 projectElement라고 이름으로 변경하자 
  titleElement: HTMLInputElement;
  descriptionElement: HTMLInputElement;
  peopleElement: HTMLInputElement;

  constructor(){
    //원안
    // this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    // this.rootElement = document.getElementById('app')! as HTMLDivElement;
    // const importedNode = document.importNode(this.templateElement.content, true);
    // this.formElement = importedNode.firstElementChild as HTMLFormElement;
    // //console.log(this.formElement);
    // this.formElement.id = 'user-input'; 
    // this.titleElement = this.formElement.querySelector('#title')! as HTMLInputElement; //#이름
    // this.descriptionElement = this.formElement.querySelector('#description')! as HTMLInputElement; //#이름
    // this.peopleElement = this.formElement.querySelector('#people')! as HTMLInputElement; //#이름
    
    //대체안
    //원래는 class InputValidate의 주석 '#이름'을 찾아보면, formElement라고 사용해야 하지만, super를 사용하면서 projectElement라고 변경하자
    super('app', 'project-input', true, 'user-input')
    this.titleElement = this.projectElement.querySelector('#title')! as HTMLInputElement;
    this.descriptionElement = this.projectElement.querySelector('#description')! as HTMLInputElement;
    this.peopleElement = this.projectElement.querySelector('#people')! as HTMLInputElement;

    this.configure();

    //원안
    //this.attach(); //attach는 abstract Component에서 구현하고 있다.
  }

  private gatherUserInput(){
    const titleVal = this.titleElement.value;
    const descripionVal = this.descriptionElement.value;
    const peopleVal = +this.peopleElement.value;

    const inputArr = [this.titleElement, this.descriptionElement, this.peopleElement]

    const titleValValidatable : Validatable2 = {
      value:titleVal, 
      required:true,
      min:3, 
      max:10,
    }
    const descripionValValidatable : Validatable2 = {
      value:descripionVal, 
      required:true,
      min:20, 
      max:200,
    }
    const peopleValValidatable : Validatable2 = {
      value:peopleVal, 
      required:true,
      min:3, 
      max:10,
    }


    const tempValidArr:Array<Validatable2> = [titleValValidatable, descripionValValidatable, peopleValValidatable]; 
    let resultValidMsg:string | undefined;

    for(const inputType of tempValidArr.keys()) {
      resultValidMsg = validateInput_2(tempValidArr[inputType])!;
      //console.log(!!resultValidMsg)
      if(!!resultValidMsg){
        const validParagraph = document.createElement('p') as HTMLParagraphElement; 
        validParagraph.classList.add('validMsg')
        validParagraph.textContent = resultValidMsg;
        if(inputArr[inputType].nextElementSibling?.classList.contains('validMsg')){
          inputArr[inputType].nextElementSibling?.remove();
        }
        inputArr[inputType].after(validParagraph);
        inputArr[inputType].focus();
        break;
      }
    };

    if(typeof resultValidMsg != "undefined"){
      return {title:titleVal, descript:descripionVal, people:peopleVal }
    }else{
      return
    }
  }

  clearInput(){
    this.titleElement.value="";
    this.descriptionElement.value="";
    this.peopleElement.value="";
  }

  @Autobind_4
  private submitHandler(event:Event){

    event.preventDefault();        
    //기존에 validate한 p요소 삭제해야한다. 
    document.querySelectorAll('.validMsg').forEach(validMsgP=> validMsgP.remove())

    const userInput :Omit<ProjectType, 'id' | 'status'> & {status?:ProjectStatus} | undefined = this.gatherUserInput();

    //제대로 값이 오면 값을 처리하고 submit한다. 
    if(userInput) {
      projectState2.addProject(userInput);
      //this.clearInput();
    }

  }

  configure(){
    //원안
    //this.formElement.addEventListener('submit',this.submitHandler); 

    //변경안
    //주석 '#이름'을 찾아보면 원래는 formElement이지만, abstract Component를 super를 호출하면 projectElement라고 이름을 변경했다. 
    this.projectElement.addEventListener('submit',this.submitHandler); 
  }
  
  //대안 , 원래는 쓸일도 없고 의미도 없지만, abstract Component를 상속받으면서 빈 메소드로 구현해 놓는다. 
  renderContent() {}


  //원안 ---> 대안 : abstract Component를 상속받을 때 이미 Component에서 attach를 구현하고 있다.
  // attach(){
  //   //원안
  //   //this.rootElement.insertAdjacentElement('afterbegin', this.formElement);

  //   //변경안
  //   //주석 '#이름'을 찾아보면 원래는 formElement이지만, abstract Component를 super를 호출하면 projectElement라고 이름을 변경했다. 
  //   this.rootElement.insertAdjacentElement('afterbegin', this.projectElement);
  // }
}

const prjInputValidate = new InputValidate();

const active = new ProjectList2('active')
const finished = new ProjectList2('finished')