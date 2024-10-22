"use strict";
var _a;
const fetchedUserData = {
    id: 'u1',
    name: 'Max',
    job: { title: 'CEO', description: 'My own company' }
};
console.log((_a = fetchedUserData === null || fetchedUserData === void 0 ? void 0 : fetchedUserData.job) === null || _a === void 0 ? void 0 : _a.title);
function getPrice1(product) {
    return product.price || -1;
}
function getPrice2(product) {
    var _a;
    return (_a = product.price) !== null && _a !== void 0 ? _a : -1;
}
