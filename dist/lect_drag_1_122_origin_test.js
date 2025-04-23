"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class ProjectType {
    constructor(id, title, descript, people, status) {
        this.id = id;
        this.title = title;
        this.descript = descript;
        this.people = people;
        this.status = status;
    }
}
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(fn) {
        this.listeners.push(fn);
    }
}
class ProjectState2 extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstane() {
        if (!ProjectState2.instance) {
            ProjectState2.instance = new ProjectState2();
        }
        return ProjectState2.instance;
    }
    addProject(inputObj) {
        const newProject = new ProjectType(Math.random().toString(), inputObj.title, inputObj.descript, inputObj.people, ProjectStatus.Active);
        this.projects.push(newProject);
        this.listeners.forEach(fn => fn(this.projects));
    }
}
const projectState2 = ProjectState2.getInstane();
class Component {
    constructor(rootId, templateId, beforeAfter, type) {
        this.rootElement = document.getElementById(rootId);
        this.templateElement = document.getElementById(templateId);
        const tempElemnt = document.importNode(this.templateElement.content, true);
        this.projectElement = tempElemnt.firstElementChild;
        if (!!type) {
            this.projectElement.id = type;
        }
        this.attach(beforeAfter);
    }
    attach(beforeAfter) {
        this.rootElement.insertAdjacentElement(beforeAfter ? 'afterbegin' : 'beforeend', this.projectElement);
    }
}
class ProjectItem extends Component {
    constructor(rootId, project) {
        super(rootId, 'single-project', true, project.id);
        this.project = project;
        this.renderContent();
    }
    renderContent() {
        console.log(this.projectElement);
        this.projectElement.querySelector('h2').textContent = this.project.title;
        this.projectElement.querySelector('h3').textContent = this.project.people.toString();
        this.projectElement.querySelector('p').textContent = this.project.descript;
    }
    configure() {
    }
    dragEndHandler(event) {
    }
    dragStartHandler(event) {
    }
}
class ProjectList2 extends Component {
    constructor(type) {
        super('app', 'project-list', false, `${type}-projects`);
        this.type = type;
        this.addAssignProjects = [];
        this.titleElement = this.projectElement.querySelector('h2');
        this.listElement = this.projectElement.querySelector('ul');
        this.configure();
        this.renderContent();
    }
    configure() {
        projectState2.addListener((projects) => {
            const relevantProject = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === ProjectStatus.Active;
                }
                return prj.status === ProjectStatus.Finished;
            });
            this.addAssignProjects = relevantProject;
            if (this.addAssignProjects.length > 0)
                this.render();
        });
    }
    render() {
        const listElement = document.getElementById(`${this.type}-projects-list`);
        const currentObject = this.addAssignProjects[this.addAssignProjects.length - 1];
        new ProjectItem(listElement.id, currentObject);
    }
    renderContent() {
        this.titleElement.textContent = `${this.type.toUpperCase()} PROJECT`;
        this.listElement.id = `${this.type}-projects-list`;
    }
}
__decorate([
    Autobind_4
], ProjectList2.prototype, "configure", null);
function validateInput_2(validObj) {
    const resultValidMsg = { required: "it's required", positive: "it needs positve number", min: `it needs over than ${validObj.min}`, max: `it needs less  than ${validObj.max}`, minLength: `it needs over than ${validObj.minLength} length` };
    if (!!validObj.required && typeof validObj.value === 'string' && validObj.value.toString().trim().length === 0) {
        return resultValidMsg.required;
    }
    if (!!validObj.min && typeof validObj.value === 'string' && validObj.value.length < validObj.min) {
        return resultValidMsg.min;
    }
    if (!!validObj.max && typeof validObj.value === 'string' && validObj.value.length > validObj.max) {
        return resultValidMsg.max;
    }
    if (!!validObj.positive && typeof validObj.value === 'number' && validObj.value <= 0) {
        return resultValidMsg.positive;
    }
    if (!!validObj.minLength && typeof validObj.value === 'number' && validObj.value < validObj.minLength) {
        return resultValidMsg.minLength;
    }
}
function Autobind_4(_type, _name, descriptor) {
    const originMethod = descriptor.value;
    descriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const bindMethod = originMethod.bind(this);
            return bindMethod;
        }
    };
    return descriptor;
}
class InputValidate extends Component {
    constructor() {
        super('app', 'project-input', true, 'user-input');
        this.titleElement = this.projectElement.querySelector('#title');
        this.descriptionElement = this.projectElement.querySelector('#description');
        this.peopleElement = this.projectElement.querySelector('#people');
        this.configure();
    }
    gatherUserInput() {
        var _a, _b;
        const titleVal = this.titleElement.value;
        const descripionVal = this.descriptionElement.value;
        const peopleVal = +this.peopleElement.value;
        const inputArr = [this.titleElement, this.descriptionElement, this.peopleElement];
        const titleValValidatable = {
            value: titleVal,
            required: true,
            min: 3,
            max: 10,
        };
        const descripionValValidatable = {
            value: descripionVal,
            required: true,
            min: 20,
            max: 200,
        };
        const peopleValValidatable = {
            value: peopleVal,
            required: true,
            min: 3,
            max: 10,
        };
        const tempValidArr = [titleValValidatable, descripionValValidatable, peopleValValidatable];
        let resultValidMsg;
        for (const inputType of tempValidArr.keys()) {
            resultValidMsg = validateInput_2(tempValidArr[inputType]);
            if (!!resultValidMsg) {
                const validParagraph = document.createElement('p');
                validParagraph.classList.add('validMsg');
                validParagraph.textContent = resultValidMsg;
                if ((_a = inputArr[inputType].nextElementSibling) === null || _a === void 0 ? void 0 : _a.classList.contains('validMsg')) {
                    (_b = inputArr[inputType].nextElementSibling) === null || _b === void 0 ? void 0 : _b.remove();
                }
                inputArr[inputType].after(validParagraph);
                inputArr[inputType].focus();
                break;
            }
        }
        ;
        if (typeof resultValidMsg != "undefined") {
            return { title: titleVal, descript: descripionVal, people: peopleVal };
        }
        else {
            return;
        }
    }
    clearInput() {
        this.titleElement.value = "";
        this.descriptionElement.value = "";
        this.peopleElement.value = "";
    }
    submitHandler(event) {
        event.preventDefault();
        document.querySelectorAll('.validMsg').forEach(validMsgP => validMsgP.remove());
        const userInput = this.gatherUserInput();
        if (userInput) {
            projectState2.addProject(userInput);
        }
    }
    configure() {
        this.projectElement.addEventListener('submit', this.submitHandler);
    }
    renderContent() { }
}
__decorate([
    Autobind_4
], InputValidate.prototype, "submitHandler", null);
const prjInputValidate = new InputValidate();
const active = new ProjectList2('active');
const finished = new ProjectList2('finished');
