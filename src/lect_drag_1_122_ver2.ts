
const configValid_1 : { [name:string]:string[] } = {};
const addValid_1 = (input: string, type : string)=>{
    configValid_1[input] = 
    configValid_1[input]
    ? [...configValid_1[input], type]
    : [type]
}
const Password_1 = (target:any, propName: string ) => addValid_1(propName, 'password');
const MinMax_1 = (target:any, propName: string ) => addValid_1(propName, 'minmax');
const Maxlength_2 = (target:any, propName: string ) => addValid_1(propName, 'maxlength');
const Required_2 = (target:any, propName: string ) => addValid_1(propName, 'required');


const validateInput_1 = (_this : any) : {required:boolean} => {
    let isValid = {required:true, maxlength:true, minMax:true, password:true} // 인풋 필드가 비었다는 가정하에 시작한다. 
    let validRequiredKeep = true;
    let validMaxLengthKeep = true;
    let validMinMaxhKeep = true;
    let validPasswordKeep = true;

    //Object.entries(configValid).forEach(([input, types])=>{  
    Loop1:
    for( const [input, types] of Object.entries(configValid) ){
        //types.forEach((type)=>{
        Loop2:
        for( const type of types){
            
            switch (type){ 
                case 'required':
                     const hasValueRequired = ( !!_this[input].value && validRequiredKeep );
                    if( !hasValueRequired ){
                        isValid.required = false;
                        validRequiredKeep = false;
                        alert(  input + '항목은 필수 항목입니다.');
                        break Loop1;
                    }       
                    break;         
                case 'maxlength':
                        const hasValueMaxlength = ( _this[input].value.length >= 5 && validMaxLengthKeep);
                        //console.log(_this[input].value, _this[input].value.length >= 5,  hasValueMaxlength, validMaxLengthKeep);
                    if( hasValueMaxlength ){                     
                        isValid.maxlength = false;
                        validMaxLengthKeep = false;
                        alert(  input + '항목은 5글자 미만으로 작성하시오.');
                        break Loop1;
                    }
                    break;
                case 'minmax':
                        const hasValueMinMax = ( ( _this[input].value.length >= 8 && _this[input].value.length <= 15 ) && validMinMaxhKeep);
                    if( !hasValueMinMax ){                   
                        isValid.minMax = false;
                        validMinMaxhKeep = false;
                        alert(  input + '항목은 8글자 이상 15글자 이하로 작성하시오.');
                        break Loop1;
                    }
                    break;
                case 'password':
                        const pattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~@#$!%*?&])[a-zA-Z\d~@#$!%*?&]+$/  
                        const hasValuePassword = (  ( !/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(_this[input].value) && pattern.test(_this[input].value) ) && validPasswordKeep );
                    if( !hasValuePassword ){                 
                        isValid.password = false;
                        validPasswordKeep = false;
                        alert(  input + '항목은 한글이 포함되지 말아야 하며, 특수문자 숫자 영문자 포함해야 합니다.');
                        break Loop1;
                    }
                    break;
                
            }// switch End
        }//내부 for문 End
        //}); types.forEach End
    } //for End
    //)}//forEach End
    return isValid;
}

const AutoBind_2 = ( _:any, _2: string, descriptor : PropertyDescriptor )=>{
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


class ProjectInput_1 {
    templateElement: HTMLTemplateElement; 
    hostElement: HTMLDivElement;
    element : HTMLFormElement;

    @Maxlength_2
    @Required_2
    titleInputElement : HTMLInputElement;

    @Password_1
    @MinMax_1
    @Required_2
    descriptionInputElement : HTMLInputElement;

    @Required_2
    peopleInputElement : HTMLInputElement;

    constructor(){
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement; 
        this.hostElement =  document.getElementById('app')! as HTMLDivElement;
        
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';
        this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;

        this.configure();
        this.attach();
    }

    @AutoBind_2
    private gatehrUserInput(){
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = +this.peopleInputElement.value;
        let resultInputVal : {required: boolean} = {required:true};
        
        resultInputVal = validateInput( this );
        return resultInputVal;
    }

    @AutoBind_2
    private submitHandler(event: Event){
        event.preventDefault();
        const userInput = this.gatehrUserInput();
    } 
    private configure(){
        this.element.addEventListener('submit',this.submitHandler);
    }
    private attach(){
        this.hostElement.insertAdjacentElement('afterbegin', this.element); 
    }
}

const prjInput_1 = new ProjectInput_1();