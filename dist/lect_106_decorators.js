"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Logger(LogString) {
    console.log("Logger FACTORY");
    return function (constructor) {
        console.log(LogString);
        console.log(constructor);
    };
}
function WithTemplate(template, hookId) {
    console.log("WithTemplate FACTORY");
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(...args) {
                super();
                this.name = args[0];
                console.log('Redering template');
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h2').textContent = this.name;
                }
            }
        };
    };
}
let Person_deco = class Person_deco {
    constructor(msg) {
        this.name = 'Max';
        console.log('Creating person object~~!!!');
        if (msg) {
            this.name = msg;
        }
    }
};
Person_deco = __decorate([
    Logger(' LOGGING - PERSON '),
    WithTemplate('<h2> My Person_deco Object</h2>', 'app')
], Person_deco);
console.log('인스턴스 만들어지기 전');
const pers = new Person_deco("Hello I'm instance");
console.log(pers);
function Log(target, propertyName) {
    console.log('property decorator!');
    console.log(target, propertyName);
}
function Log2(target, name, descriptor) {
    console.log('Accessor decrator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log3(target, name, descriptor) {
    console.log('Method decrator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log4(target, name, position) {
    console.log('Parameter decrator!');
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error('Invalid price - should be positive!');
        }
    }
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
const dependencyPool = {
    dep1: { name: 'dep1' },
    dep2: { name: 'dep2' },
    dep3: { name: 'dep3' },
    dep4: { name: 'dep4' }
};
function inject(...depNames) {
    return function (originConstructor) {
        return class extends originConstructor {
            constructor(...args) {
                const deps = depNames.reduce((deps, name) => (Object.assign(Object.assign({}, deps), { [name]: dependencyPool[name] })), {});
                super(deps);
            }
        };
    };
}
let Product_test = class Product_test {
    constructor(...deps) {
        console.log('product dependency is', deps);
    }
};
Product_test = __decorate([
    inject('dep1', 'dep2')
], Product_test);
function createProduct(...args) {
    return new Product_test(args);
}
const p = createProduct();
function logg_price(target, name, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        const res = originalMethod.apply(this, args);
        console.log(`${name} method arguments:`, args);
        console.log(`${name} method return:`, res);
        return res;
    };
}
class Product_price {
    constructor() {
        this.price = 10000;
    }
    setPrice(p) {
        this.price = p;
        return this.price;
    }
}
__decorate([
    logg_price
], Product_price.prototype, "setPrice", null);
const P_price = new Product_price();
P_price.setPrice(1000000);
class Users {
    constructor() {
        this._age = 24;
    }
    get age() {
        console.log('Age getter called');
        return this._age;
    }
    set age(value) {
        console.log('Age setter called');
        this._age = value;
    }
}
__decorate([
    changeAge(25)
], Users.prototype, "age", null);
function changeAge(newAge) {
    return function (target, name, desc) {
        console.log(desc);
        desc.get = () => {
            console.log("new age getter is called");
            return newAge;
        };
    };
}
const users = new Users();
const newAge = users.age;
console.log(newAge);
function format(formStr) {
    return function (target, propertyName) {
        let value = target[propertyName];
        function getter() {
            return `${formStr} ${value}`;
        }
        function setter(setVal) {
            value = setVal;
        }
        return {
            get: getter,
            set: setter,
        };
    };
}
class Greeter {
}
__decorate([
    format("Hello")
], Greeter.prototype, "greeting", void 0);
let instance_greet = new Greeter();
instance_greet.greeting = 'World';
console.log(instance_greet.greeting);
function MinLength(min) {
    return function (target, propertyName, parameterIndex) {
        target.validators = {
            minLength(args) {
                return args[parameterIndex].length >= min;
            }
        };
    };
}
function Validate(target, propertyName, descriptor) {
    const method = descriptor.value;
    descriptor.value = function (...args) {
        Object.keys(target.validators).forEach((key) => {
            if (!target.validators[key](args)) {
                console.log("throw new BadREquestExeption()");
            }
            else {
                console.log('OK!');
            }
        });
        method.apply(this, args);
    };
}
class User {
    setName(name) {
    }
}
__decorate([
    Validate,
    __param(0, MinLength(3))
], User.prototype, "setName", null);
const usr = new User();
usr.setName('Dexter');
usr.setName('22');
;
function AutoBind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const bindObj = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return bindObj;
}
class BtnEvnt {
    constructor() {
        this._msg = "Hello";
    }
    showMsg() {
        console.log(this._msg);
    }
}
__decorate([
    AutoBind
], BtnEvnt.prototype, "showMsg", null);
let btn = document.querySelector('button');
let instance_btnEvnt = new BtnEvnt();
btn.addEventListener('click', instance_btnEvnt.showMsg);
