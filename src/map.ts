<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"				uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn"				uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt"				uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="spring"			uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="Util"			uri="/WEB-INF/tlds/Util.tld"%>
<%@ taglib prefix="CommboUtil"		uri="/WEB-INF/tlds/CommboUtil.tld"%>
<%@ taglib prefix="CacheCommboUtil"	uri="/WEB-INF/tlds/CacheCommboUtil.tld"%>

<%@ include file="/WEB-INF/jsp/egovframework/mordern/config/common.jsp" %>
<script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=fdf1bd0a81b575c99f196c5ced6dc434&libraries=services"></script>


<script>
let current_url = window.location.href;
let active_hash = new URL(current_url).hash;




window.addEventListener("hashchange", function() {
  var hash = location.hash;
  if (hash !== "") {
    let target = document.querySelector(hash);
	$(target).trigger('click');
  }
});

//let item = "${item.PSITN}";
//let param = "${requestScope.param}";
//let psitn = "${requestScope.param.psitn}";"

//console.dir("item : "+item);
//console.dir("param : "+param);
//console.dir("psitn : "+psitn);


	//$(function(){
		/* 페이지 별 타이틀 텍스트 변경, yidy 2021.05.20
		let btnNm = $('.shelter_info .tab_wrap > li.active button').text().replace("선택됨","");
		$('title').text(btnNm + ' <  ' + $('title').text());*/


	//});

	function tabCustom(el) {
		$('.lnb a').each(function() {
			var centerName = el.text().substring(el.text().indexOf(' '));

			if(centerName.indexOf('노동자쉼터') != -1) {
				centerName = el.text().substring(el.text().indexOf(' ')-3);
			}

			if($(this).text().indexOf(centerName) != -1) {
				$('.lnb h2').text($(this).text());
				$(this).closest('ul').prev().text($(this).text());
			}
		})
	}

	// 등록폼
	function fnInsertForm(psitn, psitn_ty) {
		if(psitn == null || psitn == "" || psitn_ty == null || psitn_ty == "") {
			alert("새로고침 후 다시 시도해주세요.");
			return false;
		}

		$("[name=psitn]").val(psitn);
		$("[name=psitn_ty]").val(psitn_ty);
		$("#aform").attr({action:"/portal/shelterRent/insertFormShelterRent.do", method:"POST"}).submit();
	}

	function fnRentAlert() {
		alert("대관문의는 1833-8261로 연락주세요");
	}


</script>

<form method="POST" id="aform" name="aform" action="void(0);">
	<input type="hidden" name="psitn">
	<input type="hidden" name="psitn_ty">
</form>
<!-- 컨텐츠 -->
<div id="contents" class="shelter_info">
	<div class="container" style="position: relative;">
		<ul class="tab_wrap">
			<c:forEach var="item" items="${resultList}" varStatus="status">
				<c:if test="${item.PSITN_TY == '10'}">
					<c:choose>
						<c:when test="${not empty requestScope.param.psitn and item.PSITN == requestScope.param.psitn}">
							<li class="active"><span id="clickBtn" class="hide">선택됨</span>
						</c:when>
						<c:when test="${empty requestScope.param.psitn and status.first}">
							<li>
						</c:when>
						<c:otherwise>
							<li>
						</c:otherwise>
					</c:choose>
						<button type="button" id="rest${status.count}">${item.PSITN_NM}</button>
					</li>
				</c:if>
			</c:forEach>
		</ul>
		<script>
			//console.log('active_hash', typeof active_hash)
			let tab_active_li = document.querySelector(active_hash).parentElement;
			let prevTabNode = tab_active_li.previousElementSibling;
			let nextTabNode = tab_active_li.nextElementSibling;

			tab_active_li.classList.add('active');


			while(prevTabNode) {
				prevTabNode.classList.remove('active');
			  	prevTabNode = prevTabNode.previousElementSibling;
			}

			while(nextTabNode) {
				nextTabNode.classList.remove('active');
				nextTabNode = nextTabNode.nextElementSibling;
			}


			//$(active_hash).parent('li').addClass('active').siblings('li').removeClass('active');
		</script>
		<div class="map_box">
			<c:forEach var="item" items="${resultList}" varStatus="status">
				<c:if test="${item.PSITN_TY == '10'}">
					<c:choose>
						<c:when test="${not empty requestScope.param.psitn and item.PSITN == requestScope.param.psitn}">
							<dl class="active tab_con">
						</c:when>
						<c:when test="${empty requestScope.param.psitn and status.first}">
							<dl class="tab_con">
						</c:when>
						<c:otherwise>
							<dl class="tab_con">
						</c:otherwise>
					</c:choose>
					<dt>${item.PSITN_NM}</dt>
						<dd>
							<div class="map_api" id="${item.PSITN}"></div>
							<table class="table_A">
								<caption> <b class="table_cap_tit"> ${item.PSITN_NM} </b>  구분( 주소, 전화번호, 운영시간 ) , 내용 나타낸 표</caption><!-- 2024 webaccess table caption 제목 넣기  -->
						        <colgroup>
						            <col>
						            <col>
						        </colgroup>
								<thead class="hide">
									<tr>
										<th scope="col">구분</th>
										<th scope="col">내용</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th scope="row">주소</th>
										<td>${item.ADRES}</td>
									</tr>
									<tr>
										<th scope="row">전화번호</th>
										<td>${item.TEL_NO}</td>
									</tr>
									<tr>
										<th scope="row">운영시간</th>
										<td>${item.USE_TIME}</td>
									</tr>
								</tbody>
							</table>
						</dd>
						<dd>
							<ol class="list_dep2">
								<li>
									<h3 class="tit_md">대관정보</h3>
									<ol class="list_img">
										<c:forEach var="item_in" items="${resultList}" varStatus="status">
											<c:if test="${item_in.PSITN == item.PSITN and item_in.PSITN_TY != '10'}">
												<li>
													<div><img src="${item_in.IMAGE}" alt="${item_in.PSITN_TY_NM}" onerror="this.src='/common/images/no_image.jpg'"></div>
													<ul>
														<li><span>공간</span>${item_in.PSITN_TY_NM}</li>
														<li><span>최대수용인원</span>${item_in.MXMM_ACEPTNC_NMPR}명</li>
														<li style="white-space: pre;"><span>시설</span>${item_in.RENT_EQPNM_LEND}</li>
													</ul>
													<c:if test="${item_in.PSITN ne 'R000540028'}">
													<a href="#" onclick="fnInsertForm('${item_in.PSITN}','${item_in.PSITN_TY}'); return false;" class="btn2">대관하기</a>
													</c:if>
													<c:if test="${item_in.PSITN eq 'R000540028'}">
													<a href="#" onclick="fnRentAlert(); return false;" class="btn2">대관하기</a>
													</c:if>
												</li>
											</c:if>
										</c:forEach>
									</ol>
								</li>
							</ol>
						</dd>
					</dl>
				</c:if>
			</c:forEach>
		</div>
		<script>

			//지도 api
				//$(document).ready(function(){
		//var container = null;
		//var options = null;//지도를 생성할 때 필요한 기본 옵션
		//var mapTypeControl = null;
		//var zoomControl = null;


	//});





			//tabCustom($(active_hash).parent('li'));
			tabCustom($(active_hash))
			//console.log( '자동탭요소', $(active_hash) );

			let displayMarker = () =>{
				let tab_con_index = $(active_hash).parent('li').index();
				//console.log(tab_con_index);
				//console.log('맵api', $('.map_box').children('dl.tab_con').eq(tab_con_index));
				$('.map_box').children('dl.tab_con').eq(tab_con_index).addClass('active');
				setTimeout(()=>{
					$('.map_box').children('dl.tab_con').eq(tab_con_index).siblings('dl.tab_con').removeClass('active');
				},1);
			}


			displayMarker();


		</script>

	</div>
	</div>
<!-- //컨텐츠 -->

<script>
	$(document).ready(function(){
		let maps_id = [];
		let maps_center = [];

		<c:forEach var="item" items="${resultList}" varStatus="status">
		<c:if test="${item.PSITN_TY == '10'}">
			//지도를 담을 영역의 DOM 레퍼런스
			var container = document.getElementById('${item.PSITN}');
			options = { //지도를 생성할 때 필요한 기본 옵션
				center: new kakao.maps.LatLng(37.56846996492421, 126.98929759625558), //지도의 중심좌표.
				level: 1 //지도의 레벨(확대, 축소 정도)
			};

			var map_${item.PSITN} = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

			// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
			mapTypeControl = new kakao.maps.MapTypeControl();

			// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
			// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
			map_${item.PSITN}.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

			// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
			zoomControl = new kakao.maps.ZoomControl();
			map_${item.PSITN}.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

			// 주소-좌표 변환 객체를 생성합니다
			geocoder_${item.PSITN} = new kakao.maps.services.Geocoder();

			// 주소로 좌표를 검색합니다
			let getAddress_${status.count} = address =>{

				//return new Promise(function(resolve, reject){

					address.addressSearch('${item.ADRES}', function(result, status){
						// 정상적으로 검색이 완료됐으면
						if (status === kakao.maps.services.Status.OK) {

							//var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

		//						var icon = new kakao.maps.MarkerImage('https://i1.daumcdn.net/dmaps/apis/n_local_blit_04.png',
		//							new kakao.maps.Size(31, 35),
		//							{
		//								offset: new kakao.maps.Point(14, 34),
		//								alt: "${item.PSITN_NM}",
		//								shape: "poly",
		//								coords: "1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33"
		//							}
		//						);

							var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
							var imageSrc = 'https://i1.daumcdn.net/dmaps/apis/n_local_blit_04.png', // 마커이미지의 주소입니다
							imageSize = new daum.maps.Size(31, 35), // 마커이미지의 크기입니다
							imageOption = {
								offset: new daum.maps.Point(14, 34),
								alt: '${item.PSITN_NM}'
							}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

							var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption),
							markerPosition = coords; // 마커가 표시될 위치입니다

							// 결과값으로 받은 위치를 마커로 표시합니다
							var marker = new kakao.maps.Marker({
								map: map_${item.PSITN},
								position: coords,
			//						image: icon
								image: markerImage
							});

							marker.setMap(map_${item.PSITN});
							var content = '<div class="customoverlay">' +
							'	<span class="title">${item.PSITN_NM}</span>' +
							'</div>';

							// 커스텀 오버레이가 표시될 위치입니다
							var position = coords;

							// 커스텀 오버레이를 생성합니다
							var customOverlay = new kakao.maps.CustomOverlay({
								map: map_${item.PSITN},
								position: marker.getPosition(),
								content: content,
								yAnchor: 1
							});


							// 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
							map_${item.PSITN}.setCenter(coords);


							//resolve(result);

							//kakao.maps.event.addListener(map_${item.PSITN}, 'tilesloaded', displayMarker);
							console.log(map_${item.PSITN});
							maps_id.push( map_${item.PSITN} );
							maps_center.push(coords);

							map_${item.PSITN}.setZoomable(false);



						} else {
							alert("주소를 검색하지 못했습니다.");
							return;
						}
					});

				//});//Promise  End
			}// getMap End





/*
			let createOverlay_${status.count} = result =>{
				var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
				var imageSrc = 'https://i1.daumcdn.net/dmaps/apis/n_local_blit_04.png', // 마커이미지의 주소입니다
				imageSize = new daum.maps.Size(31, 35), // 마커이미지의 크기입니다
				imageOption = {
					offset: new daum.maps.Point(14, 34),
					alt: '${item.PSITN_NM}'
				}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

				var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption),
				markerPosition = coords; // 마커가 표시될 위치입니다

				// 결과값으로 받은 위치를 마커로 표시합니다
				var marker = new kakao.maps.Marker({
					map: map_${item.PSITN},
					position: coords,
//						image: icon
					image: markerImage
				});

				marker.setMap(map_${item.PSITN});
				var content = '<div class="customoverlay">' +
				'	<span class="title">${item.PSITN_NM}</span>' +
				'</div>';

				// 커스텀 오버레이가 표시될 위치입니다
				var position = coords;

				// 커스텀 오버레이를 생성합니다
				var customOverlay = new kakao.maps.CustomOverlay({
					map: map_${item.PSITN},
					position: marker.getPosition(),
					content: content,
					yAnchor: 1
				});


				// 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
				map_${item.PSITN}.setCenter(coords);

			}

*/
			getAddress_${status.count}(geocoder_${item.PSITN});
/*
			(async () => {
				try {
					const result = await getAddress_${status.count}(geocoder_${item.PSITN});
					//createOverlay_${status.count}(result);
				} catch (e) {
					console.log(e);
				}
			})();
*/
		</c:if>
	</c:forEach>

	let positioning = false;
	//console.log(maps_id);
	maps_id.forEach(function(map) {
		console.dir(map);
		/* let contentLayout = document.getElementById(element.a);
		if(contentLayout){
			contentLayout.addEventListener('mousemove',function(e){
				console.log('마우스 움직임');
			});
		} */
	});

	/* contentLayout.addEventListener('wheel',function(e){
		console.log('마우스 움직임');
	}); */



	/* window.addEvenListener('keypress',()=>{
		  e = e || window.event;
		  let code = e.charCode || e.keyCode;
		  if (e.ctrlKey && e.shiftKey && code==188 ){
		      alert("눌렸습니다.");
		  }
		  if (e.ctrlKey ){
		      alert("눌렸습니다.");
		      zommable();
		  }
	  }) */


	 	// 휴서울노동자쉼터 탭 기능
	    var shelterBtn = $('.shelter_info .tab_wrap > li button');
	    shelterBtn.on('click', function (){
	        // 1. 탭 클릭할 경우 클릭한 번째 컨텐츠를 보이도록
	        var shelterCon = $('.shelter_info .tab_con');
	        var i = $(this).closest('li').index();
	        //shelterCon.hide().eq(i).show();
	        //console.log(maps_id[i]);

			shelterCon.eq(i).addClass('active').siblings('.tab_con').removeClass('active');

			//maps_id[i].relayout();
			//maps_id[i].setCenter(maps_center[i]);
			//maps_id[i].setLevel(1);


	        /* 페이지 별 타이틀 텍스트 변경, yidy 2021.05.20 */
	        let btnNm = $('.shelter_info .tab_wrap > li.active button').text().replace("선택","");
	        $('.table_cap_tit').text(btnNm); // 2024 webaccess table caption 제목 넣기
	        $('title').text(btnNm + ' <  ' + $('title').text());
	    });
	});

//	$(window).on('load popstate',function(){
	    //$(window.location.hash).click();
		//console.log(typeof active_hash)
		//$(active_hash).parent('li').addClass('active').siblings('li').removeClass('active');
//	});



	/* const contentLayout = document.querySelector(".map_api");
	const targetClass = "heading";
	let highlightedElement = null;

	contentLayout.addEventListener("scroll", () => {
		console.log('이벤트 발생');

	  const indexSections = document.querySelectorAll(`.${targetClass}`);
	  const scrollPosition = contentLayout.scrollTop;

	  let currentElement = null;
	  */
	/*
	  indexSections.forEach((section) => {
	    const sectionId = section.getAttribute("id");
	    const targetElement = document.querySelector(`[href="#${sectionId}"]`);
	    const targetAbsoluteOffset =
	      section.getBoundingClientRect().top + contentLayout.scrollTop;

	    if (scrollPosition >= targetAbsoluteOffset - 80) {
	      currentElement = targetElement;
	    }
	  });
	  */
	/*
	  if (highlightedElement !== currentElement) {
	    if (highlightedElement) {
	      highlightedElement.style.color = "";
	    }

	    if (currentElement) {
	      currentElement.style.color = "#6119D1";
	      currentElement.style.transition = "all 1s linear";
	    }

	    highlightedElement = currentElement;
	  }

	}); */

</script>