//싱글톤 (singleton pattern) - 하나의 인스턴스만 갖도록 한다. & Private Constructor
//class AccountingDepartment를 - singleton

abstract class Department {
  static fiscalYear = 2020;
  // private readonly id: string;
  // private name: string;
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {
    // this.id = id;
    // this.name = n;
    // console.log(Department.fiscalYear);
  }

  static createEmployee(name: string) {
    return { name: name };
  }

  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    // validation etc
    // this.id = 'd2';
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, 'IT');
    this.admins = admins;
  }

  describe() {
    console.log('IT Department - ID: ' + this.id);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  //"private static"은 프로그래밍에서 특정한 멤버나 메서드가 클래스 내부에서만 접근 가능하고, 해당 멤버 또는 메서드가 클래스 인스턴스에 속하는 것이 아니라 클래스 자체에 속한다는 것을 나타내는 키워드 조합이다. AccoungtingDepartment.멤버필드 or 메서드
  private static instance: AccountingDepartment;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No report found.');
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a valid value!');
    }
    this.addReport(value);
  }

  // #1. 이렇게 private로 modifier를 정한다. new 생성자를 통해서 AccountingDepartment의 instance를 생성하는 것은 힘들다. 
  private constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment('d2', []);
    return this.instance;
  }

  describe() {
    console.log('Accounting Department - ID: ' + this.id);
  }

  addEmployee(name: string) {
    if (name === 'Max') {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}

const employee1 = Department.createEmployee('Max');
console.log(employee1, Department.fiscalYear);

const it = new ITDepartment('d1', ['Max']);

it.addEmployee('Max');
it.addEmployee('Manu');

// it.employees[2] = 'Anna';

it.describe();
it.name = 'NEW NAME';
it.printEmployeeInformation();

console.log(it);

//#2. private modifier로 constructor를 사용하면 이렇게 new 생성자로 instnace를 생성할 수 없다. 
// const accounting = new AccountingDepartment('d2', []);

const accounting1 = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();

console.log(accounting1, accounting2);

accounting1.mostRecentReport = 'Year End Report';
accounting1.addReport('Something went wrong...');
console.log(accounting1.mostRecentReport);

accounting1.addEmployee('Max');
accounting1.addEmployee('Manu');

// accounting.printReports();
// accounting.printEmployeeInformation(); 
accounting1.describe();

// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };

// accountingCopy.describe();
