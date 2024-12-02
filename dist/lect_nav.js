"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nav = void 0;
class Nav {
    constructor(elem) {
        this.ul_element = document.querySelector(elem);
        this.ul_element.addEventListener("mouseleave", this.on_Event.bind(this));
        this.anchor_descent_all = Array.prototype.slice.call(this.ul_element.querySelectorAll("a"));
        this.anchor_descent_all.forEach((anchor) => {
            anchor.addEventListener("focus", this.on_Event.bind(this));
            anchor.addEventListener("mouseenter", this.on_Event.bind(this));
        });
    }
    addClass(targetElm) {
        targetElm.classList.add("active");
        let siblings = (selfElem) => {
            if (!!selfElem.parentElement) {
                [...selfElem.parentElement.children].filter((e) => {
                    if (e != selfElem) {
                        e.classList.remove("active");
                    }
                });
            }
            else {
                console.log('navlist parent node 없음');
            }
        };
        siblings(targetElm);
    }
    resetNav(targetElm) {
        targetElm.querySelectorAll("li").forEach((e) => {
            e.classList.remove("active");
            if (e.classList.contains("first")) {
                e.classList.add("active");
            }
        });
    }
    save(targetElm) {
        alert(targetElm + "저장하기");
    }
    load(targetElm) {
        alert(targetElm + "불러오기");
    }
    search(targetElm) {
        alert(targetElm + "검색하기");
    }
    on_Event(event) {
        if (event.currentTarget.parentElement.tagName == "NAV") {
            let targetElm = event.currentTarget.parentElement;
            let action = targetElm.dataset.action;
            if (action == "save" || action == "load" || action == "search")
                this[action](targetElm);
            return false;
        }
        if (event.target.parentElement.tagName == "LI") {
            let targetElm = event.target.parentElement;
            let action = targetElm.dataset.action;
            if (action) {
                if (action == "save" || action == "load" || action == "search") {
                    this[action](targetElm);
                }
            }
        }
    }
}
exports.Nav = Nav;
