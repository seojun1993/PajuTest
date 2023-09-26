let BUILDING_CODE;
let FLOOR_CODE;
let PUB_CODE;
let facilityPubTweenList;
function findFacility() {
	FLOOR_CODE = BUILDING_CODE === "B0002" ? "지하지도" : BUILDING_CODE === "B0001" ? "전체지도" : FLOOR_CODE;
	// 편의시설에 건물과 층위치 정보가 없는 케이스가 있음.
	if (BUILDING_CODE && FLOOR_CODE) {
		const selectedMapInfo = MAP_BY_B_CODE[BUILDING_CODE][FLOOR_CODE];
		const mapSwiperDom = document.querySelector("#id_wayfind_list > .swiper-slide");
		mapSwiperDom.innerHTML = "";
		const img = document.createElement("img");
		img.src = selectedMapInfo.MAIN_MAP_URL;
		mapSwiperDom.appendChild(img);
		facilityPubTweenList?.kill();
		bindRouteData(mapSwiperDom, BUILDING_CODE, FLOOR_CODE).then(() => {
			facilityPubTweenList = TweenMax.fromTo($(`[data-pub-code="${PUB_CODE}"]`), 0.5, { scale: 2 }, { scale: 1, yoyo: true, repeat: Infinity });
		});

		$("#wayFindPopup").show();
	}
	onClickPopupClose("FACILITY");

	$('.qr_container').hide();
}

function onCloseFacilityMap() {
	onClickPopupClose("WAYFINDPOP");
}