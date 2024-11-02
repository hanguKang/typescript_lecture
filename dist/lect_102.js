"use strict";
function createCourseGoal(title, description, date) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal;
}
const names_1 = ['Max', "Anna"];
class DataStorage_1 {
    constructor() {
        this.data = [];
    }
    addItem(item) {
    }
    removeItem(item) {
    }
    getItems() {
        return [...this.data];
    }
}
