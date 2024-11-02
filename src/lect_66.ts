// //class내에서 constructor로 멤버를 생성할 수 있는 예시

// class Department {
//   //private readonly id: string;
//   //private name: string;
//   private employees: string[] = [];

//   constructor(private readonly id: string, public name: string) {
//     //this.id = id;
//     //this.name = n;
//   }

//   describe(this: Department) {
//     console.log(`Department (${this.id}): ${this.name}`);
//   }

//   addEmployee(employee: string) {
//     // validation etc
//     // this.id = 'd2';
//     this.employees.push(employee);
//   }

//   printEmployeeInformation() {
//     console.log(this.employees.length);
//     console.log(this.employees);
//   }
// }

// class ITDepartment extends Department {
//   admins: string[];
//   constructor(id: string, admins: string[]) {
//     super(id, 'IT');
//     this.admins = admins;
//   }
// }

// class AccountingDepartment extends Department {

//   constructor(id: string, private reports: string[]) { //arguemnts로 reports만을 지정해도 실제 reports가 생성된다. 
//     super(id, 'Accounting');
//   }

//   addReport(text: string) {
//     this.reports.push(text);
//   }

//   printReports() {
//     console.log(this.reports);
//   }
// }

// const it = new ITDepartment('d1', ['Max']);

// it.addEmployee('Max');
// it.addEmployee('Manu');

// // it.employees[2] = 'Anna';

// it.describe();
// //it.name = 'NEW NAME'; Department class의 private 멤버 name은 Department class 내부에서만 접근 가능하다.
// it.printEmployeeInformation();

// console.log(it);

// const accounting = new AccountingDepartment('d2', []); // Department class의 id는 readonly를 사용했지만, new 할때마다 초기화할 수 있다. 

// accounting.addReport('Something went wrong...');

// accounting.printReports();

// console.log(accounting);

// // const accountingCopy = { name: 'DUMMY', describe: accounting.describe };

// // accountingCopy.describe();