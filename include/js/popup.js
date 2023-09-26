// 길찾기 팝업 열기 START
function onClickPopUpWayFind() {
	// 실외에 설치된 키오스크 이면 날씨 팝업 안 뜸
	// if (["B0008"].includes(gl_kiosk.KIOSK_BUILDING || "") && ["B0009", "B0010", "B0011", "B0013"].includes($("#building_code").val() || "")) {
	// 	$("#wayFindPopup").hide();
	// 	$("#id_popup_store").hide();
	// 	$('#testPopup').find('p').html('2층으로 올라가<br>매너하우스 마을 방향으로<br>이동해 주세요.');
	// 	$("#testPopup").fadeIn(200);
	// 	$("#testPopup").click(() => {
	// 		hideTestPopup();
	// 	});
	// 	return;
	// }
	if (["B0001", "B0002"].includes(gl_kiosk.KIOSK_BUILDING || "")) {
		findWay();
	} else {
		$("#id_popup_weather").fadeIn(200);
	}
}
// 길찾기 팝업 열기 END

// 팝업 닫기 START
function onClickPopupClose(menu) {
	switch (menu) {
		// 플랫폼
		case "PLATFORM":
			$("#id_popup_platform").fadeOut(200);
			break;

		// 매장
		case "STORE":
			$("#id_pop_store_thumb img").attr("src", "");
			$("#id_pop_store_title").text("");
			$("#id_pop_store_dec").text("");
			$("#id_pop_store_category").text("");
			$("#id_pop_store_time").text("");
			$("#id_pop_store_phone").text("");
			$("#building_code").val("");
			$("#floor_code").val("");
			$("#store_id").val("");
			$("#id_popup_store").fadeOut(200);
			break;

		// 이벤트
		case "EVENT":
			$("#id_popup_event").fadeOut(200);
			break;

		// 편의시설
		case "FACILITY":
			$("#id_pop_fac_thumb img").attr("src", "");
			$("#id_pop_fac_title").text("");
			$("#id_pop_fac_dec").text("");
			$("#id_pop_fac_category").text("");
			$("#id_pop_fac_time").text("");
			$("#id_pop_fac_phone").text("");
			$("#id_popup_fac").fadeOut(200);
			break;

		// 길찾기
		case "WAYFINDPOP":
			$("#wayFindPopup").fadeOut(200);
			break;

		default:
			$("#id_popup_weather").fadeOut(200);
	}
}
// 팝업 닫기 END

const hideTestPopup = () => {
	$("#testPopup").hide();
};
