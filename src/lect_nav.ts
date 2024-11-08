// const nav_ = (navList) => {
//   const nv = document.querySelector(navList).children;

//   const removeClass = (className) => {
//     for (let nvItem of nv) {
//       nvItem.classList.remove(className);
//     }
//   };

//   if (nv) {
//     for (let nvItem of nv) {
//       nvItem.addEventListener("click", function (e) {
//         let navItem_this = e.currentTarget;
//         let navItem_this_class = navItem_this.classList;
//         removeClass("active");

//         e.preventDefault();

//         navItem_this_class.add("active");
//         // const this_nav = document.getElementsByTagName(e.target.getAttribute('class'));
//         // this_nav.classList.add = "acitve";
//       });
//     }
//   } else {
//     return;
//   }
// };
class Nav {

  ul_element : HTMLUListElement;
  anchor_descent_all : HTMLAnchorElement [];

  constructor(elem: string) {
    
    this.ul_element = document.querySelector(elem)! as HTMLUListElement;
    this.ul_element.addEventListener("mouseleave", this.on_Event.bind(this));

    this.anchor_descent_all = Array.prototype.slice.call(
      //arrayList를 return
      this.ul_element.querySelectorAll("a")
    );
    //console.dir(this._descendants_a);
    this.anchor_descent_all.forEach( (anchor) => {
      anchor.addEventListener("focus", this.on_Event.bind(this));
      anchor.addEventListener("mouseenter", this.on_Event.bind(this));
    });
  }

  addClass(targetElm : HTMLElement ) {
    //console.dir(targetElm.classList);
    targetElm.classList.add("active");
    let siblings = (selfElem: HTMLElement) =>{
      if( !!selfElem.parentElement ){
        [...selfElem.parentElement.children].filter((e) => {
          if (e != t) {
            e.classList.remove("active");
          }
        });
      }else{
        console.log('navlist parent node 없음');
      }
    }
    siblings(targetElm); //li요소
  }

  resetNav(targetElm : HTMLElement ){
    targetElm.querySelectorAll("li").forEach((e)=>{
      e.classList.remove("active");
      if(e.classList.contains("first")){
        e.classList.add("active");
      }
    });
  }
  save(targetElm : HTMLElement) {
    alert(targetElm + "저장하기");
  }

  load(targetElm : HTMLElement) {
    alert(targetElm + "불러오기");
  }

  search(targetElm : HTMLElement) {
    alert(targetElm + "검색하기");
  }

  on_Event( event : any ) {
    //console.log("inininin");
    //console.log(this);
    //event.preventDefault();
    //console.dir(event.target.parentElement.tagName);
    if(event.currentTarget.parentElement.tagName == "NAV"){
      //console.dir(event.currentTarget.parentElement.tagName);
      let targetElm = event.currentTarget.parentElement;
      let action : string = targetElm.dataset.action; //this의 자식 요소에게 각각 다른 이멘트를 매칭하고 싶을 때 this의 각 자식 요소의 data-action="save" .. 등 속성을 지정하고 사용해서 Nav 
      if(action == "save" || action == "load" ||  action == "search" ) this[action](targetElm);
      return false; 

    }
    if (event.target.parentElement.tagName == "LI") {
      //alert(11111);
      let targetElm = event.target.parentElement;
      let action = targetElm.dataset.action; //this의 자식 요소에게 각각 다른 이멘트를 매칭하고 싶을 때 this의 각 자식 요소의 data-action="save" .. 등 속성을 지정하고 사용해서 Nav 클래스에 미리 만둘어둔 save, load, search등을 사용할 수 있다.
      //console.log(action);
      if (action) {
        //this[action]();
        if(action == "save" || action == "load" ||  action == "search" ) {
          this[action](targetElm); 
        }
      }
    }
  }
} // class nav  End

//export { nav_ };
export { Nav };
