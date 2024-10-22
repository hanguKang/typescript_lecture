"use strict";
const e1 = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date(),
};
function add_fn(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
function printEmployeeInformation1(emp) {
    console.log('Name: ' + emp.name);
    if ('privileges' in emp) {
        console.log('Privileges: ' + emp.privileges);
    }
    if ('startDate' in emp) {
        console.log('Privileges: ' + emp.startDate);
    }
}
printEmployeeInformation1(e1);
class Car1 {
    drive() {
        console.log('Driving...');
    }
}
class Truck1 {
    drive() {
        console.log('Driving a truck...');
    }
    loadCargo(amount) {
        console.log('Loading cargo ...' + amount);
    }
}
const v1 = new Car1();
const v2 = new Truck1();
function useVehicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck1) {
        vehicle.loadCargo(1000);
    }
}
useVehicle(v1);
useVehicle(v2);
function moveAnimal(animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
    }
}
moveAnimal({ type: 'bird', flyingSpeed: 10 });
const userInputElment = document.getElementById('user-input');
if (userInputElment) {
    userInputElment.value = 'HI there!';
}
