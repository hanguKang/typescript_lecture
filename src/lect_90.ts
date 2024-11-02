//Optianl Chaining
//데이터를 백단이나 데이터베이스 또는 어떤 소스에서 불러들이던간에 오브젝트 내부에 어떤 프로퍼티가 정의-값 지정-되어 있는지 확인할 수 없을 때 

const fetchedUserData = {
  id: 'u1', 
  name : 'Max', 
  job : {title : 'CEO', description: 'My own company'} //#1
}
//console.log(fetchedUserData.job.title);//#1 을 알고 있을 때 사용가능

console.log(fetchedUserData?.job?.title); //데이터를 가져올지 안 가져올지 모르는 상황에서 사용할 수 있다. 


//nullish coalescing operator : null 병합 연산자 
// 좌항이 null, undefined일 경우에만 B를 리턴한다. 
// A ?? B
//기존에는 A || B  : A가 falsy한 값 (0, NaN, '', undeinfd, null ) 인 경우 B를 반환했다. 
//문제점 
// price가 0인 경우 -1 반환
function getPrice1(product: { price?: number }) {
  return product.price || -1;
}

// price가 0인 경우 0 반환
function getPrice2(product: { price?: number }) {
  return product.price ?? -1;
}
