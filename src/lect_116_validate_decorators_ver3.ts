
const Config3:{[input:string]:string[]} = {}

function addConfig (input:string, validType:string){
    Config3[input] = Config3[input]?[...Config3[input], validType]:[validType]
}

function MaxLengh3 (target:any, name:string){ addConfig(name,'maxLength'); }
function Required3 (target:any, name:string){ addConfig(name,'required'); }
function PositiveNumber3 (target:any, name:string){ addConfig(name,'positive'); }

function validateForm3(instanceForm:any){
    type validatetype = {required:boolean, maxLength:string, positive:string}
    const isValidate :validatetype = {required:true, maxLength:'less', positive:'minus'}

    Object.entries(Config3).forEach(([input, types])=>{
        
        if(input in instanceForm){
        
            types.forEach((type)=>{

                switch(type){
                    case 'required':
                        isValidate.required = !!instanceForm[input]?true:false;
                        break;
                    case 'maxLength':
                        isValidate.maxLength = instanceForm[input].length>5?'ok':'less'
                        break;
                    case 'positive':
                        isValidate.positive = instanceForm[input]>0?'positive':'negative'
                        break;

                }

            })

            
        }
        
    })
    return isValidate;
}


class Validator {

    @MaxLengh3
    @Required3
    title:string

    @PositiveNumber3
    @Required3
    price:number

    constructor (t:string, n:number){
        this.title = t; 
        this.price = n; 
    }
}

const courseForm3 = document.querySelector('form')!;

courseForm3.addEventListener('submit',()=>{
    const tit3 = document.querySelector('#inputTitle')! as HTMLInputElement;
    const num3 = document.querySelector('#inputPrice')! as HTMLInputElement;
    
    const tit3_val = tit3.value;
    const num3_val = +num3.value;
    
    const validInputs3 = new Validator(tit3_val, num3_val);

    const validResult = validateForm3(validInputs3);

    console.log(validResult);

})