const OUTSIDE_BUILDING_LIST = ["B0009", "B0010", "B0011", "B0013"];
const getMyKiost = () => MAP_BY_B_CODE[kioskBuildingCode]?.[kioskFloorCode];
const onClosePopup = () => {
	onClickPopupClose("WEATHER");
	onClickPopupClose("STORE");
};

let qrcode = null;

function checkAndPushCurrent(mapList, item) {
	if (item && (mapList[mapList.length - 1].b_code !== item.b_code || mapList[mapList.length - 1].floor !== item.floor)) {
		mapList.push(item);
	}
}

let floorSwiper = new Swiper(".wayFindSwiper", {
	slidesPerView: 1,
	spaceBetween: 0,
	pagination: {
		el: ".swiper-pagination.wayfind-pagination",
		clickable: true,
		renderBullet: function (index, className) {
			alert(className);
			return '<span class="' + className + '">' + '<span class="popup_way_title">' + wayTitle[index] + "</span>" + '<span class="popup_way_subtitle">' + waySubTitle[index] + "</span>" + "</span>";
		},
	},
	navigation: {
		nextEl: ".wayfind-next",
		prevEl: ".wayfind-prev",
	},
	touchStartPreventDefault: false,
});

const makePubList = (pubCode, target) => {
	const li = document.createElement("li");
	const div = document.createElement("div");
	const img = document.createElement("img");
	const span = document.createElement("span");
	div.classList.add("floor_img");
	div.dataset.pubCode = pubCode;
	img.src = window.PUB_MAP[pubCode].PUB_ICON;
	span.innerText = window.PUB_MAP[pubCode].PUBLIC_NAME_KOR || "";
	div.appendChild(img);
	li.appendChild(div);
	li.appendChild(span);
	target.appendChild(li);
};

function getMapRate(target) {
	var mapSizeW = $(target).width();
	var mapSizeH = $(target).height();
	var mapRateX = mapSizeW / mapSettingSizeW;
	var mapRateY = mapSizeH / mapSettingSizeH;
	var mapRate = { mapRateX: mapRateX, mapRateY: mapRateY };
	return mapRate;
}

function currentLocation(target, elementId) {
	$(target).append('<img id="' + elementId + '" src="images/wayfind/floor_minimap_start.svg" style="position: absolute; top:0; left:0; width: 40px; height: 56px;" />');
	var mapRate = getMapRate($(target));
	var positionMapX = gl_kiosk.KIOSK_FLOOR.pos_x * mapRate.mapRateX - $("#" + elementId).width() / 2;
	var positionMapY = gl_kiosk.KIOSK_FLOOR.pos_y * mapRate.mapRateY - $("#" + elementId).height() - TweenMaxY;
	//positionY = gl_kiosk.KIOSK_FLOOR.pos_y * mapRateY - $('#id_location').height() - 0;
	$("#" + elementId)
		.css("left", positionMapX + "px")
		.css("top", positionMapY + "px");
	TweenMax.to($("#" + elementId), 0.5, {
		y: TweenMaxY,
		yoyo: true,
		repeat: -1,
	});
}

function setCanvasWH(buildingCode, floorCode) {
	$("#id_map_main").css("top", "").css("left", "").css("transform", "scale(1.0, 1.0)");
	$("#canvas").attr("width", $("#id_map_img").width());
	$("#canvas").attr("height", $("#id_map_img").height());

	bindLocation(document.getElementById("id_map_main"), buildingCode, floorCode);
}
// 키오스크 위치, 매장위치, 편의시설 위치 binding
function bindLocation(target, currentBuildingCode, currentFloorCode) {
	initRouteData();
	// 현재 위치(키오스크) 표시
	bindRouteData(target, currentBuildingCode, currentFloorCode).then(() => {
		if (!currentFloorCode) {
			if (kioskBuildingCode == "B0001") {
				currentFloorCode = "전체지도";
			} else if (kioskBuildingCode == "B0002") {
				currentFloorCode = "지하지도";
			}
		}

		if (kioskBuildingCode == currentBuildingCode && kioskFloorCode == currentFloorCode) {
			// currentLocation('#id_map_main', 'id_location');
			$("#id_map_main").append('<img id="id_location" src="images/wayfind/floor_minimap_start.svg" style="position: absolute; top:0; left:0; width: 40px; height: 56px;" />');
			var mapRate = getMapRate($("#id_map_img"), mapSettingSizeW, mapSettingSizeH);
			var mapRateX = mapRate.mapRateX;
			var mapRateY = mapRate.mapRateY;
			var positionX = gl_kiosk.KIOSK_FLOOR.pos_x * mapRateX - $("#id_location").width() / 2;
			var positionY = gl_kiosk.KIOSK_FLOOR.pos_y * mapRateY - $("#id_location").height() - TweenMaxY;
			//positionY = gl_kiosk.KIOSK_FLOOR.pos_y * mapRateY - $('#id_location').height() - 0;
			$("#id_location").css({
				left: positionX + "px",
				top: positionY + "px",
				"z-index": 50,
			});
			TweenMax.to($("#id_location"), 0.5, { y: TweenMaxY, yoyo: true, repeat: -1 });
		}
	});
}

function bindRouteData(target, currentBuildingCode, currentFloorCode) {
	const imageDom = target.querySelector("img");
	return new Promise((resolve) => {
		imageDom.onload = () => {
			const mapRate = getMapRate(imageDom);
			var mapRateX = mapRate.mapRateX;
			var mapRateY = mapRate.mapRateY;
			// 상점 표시
			var storeList = gl_load_route.STORE_LIST.STORE_INFO;
			if (storeList.length > 0) {
				var filterStoreList = storeList.filter((e) => {
					// console.log(e);
					return e.STORE_FLOOR.b_code == currentBuildingCode && e.STORE_FLOOR.text == currentFloorCode;
				});
				$.each(filterStoreList, function () {
					if (this.dp_type == "Y") {
						var storeNm = this.STORE_NAME_KOR.replace(/\r\n/gi, "<br>");
						var $divStore = $(
							"<div class='store-info' style='z-index:7; position: absolute; font-weight:bold; text-align:center; top:" +
								this.STORE_FLOOR.pos_y * mapRateY +
								"px; left: " +
								this.STORE_FLOOR.pos_x * mapRateX +
								"px;' onclick='onClickStoreInfo(" +
								JSON.stringify({ ...this, BUILDING_CODE: currentBuildingCode }) +
								");'>" +
								storeNm +
								"</div>",
						);
						// 맵에디터에 해당 css 있으므로 좌표 같게 하기 위해 transform 추가
						$divStore.css("transform", "translate(-50% ,-50%)");
						$divStore.css("font-size", this.FONT_SIZE * mapRateX + "px");
						$divStore.css("font-coloe", this.FONT_COLOR * mapRateX);
						$divStore.css("line-height", this.LINE_HEIGHT * mapRateX + "px");
						$(target).append($divStore);
					}
				});
			}

			// 공용 시설 표시
			var pubList = gl_load_route.PUB_LIST.PUB_INFO;
			const pubSet = new Set();
			if (pubList.length > 0) {
				var filterPubList = new Array();
				if (currentBuildingCode == "B0001" || currentBuildingCode == "B0002") {
					filterPubList = pubList.filter((e) => e.PUB_FLOOR.b_code == currentBuildingCode);
				} else {
					filterPubList = pubList.filter((e) => e.PUB_FLOOR.b_code == currentBuildingCode && e.PUB_FLOOR.text == currentFloorCode);
				}

				$.each(filterPubList, function () {
					var $this = this;
					var $divPub = $(
						'<div class="pub-info" data-pub-code="' +
							$this.PUB_CODE +
							'" style="z-index:7; position: absolute; font-weight:bold; text-align:center; top:' +
							$this.PUB_FLOOR.pos_y * mapRateY +
							"px; left: " +
							$this.PUB_FLOOR.pos_x * mapRateX +
							'px;"><img style="width: 110px; height: 110px;" src="' +
							$this.PUB_URL +
							'" /></div>',
					);
					pubSet.add($this.PUB_CODE);
					$divPub.css("transform", "translate(-50% ,-50%)");
					$divPub.css("font-size", $this.FONT_SIZE * mapRateX + "px");
					$divPub.css("font-coloe", $this.FONT_COLOR * mapRateX);
					$(target).append($divPub);
				});
			}
			// TODO : 아래 코드 동작안함 => PUB_CODE를 받아오지 못하는것으로 보임. 추후 수정필요
			const pubListUl = document.getElementById("pub_list_ul");
			if (pubListUl && pubSet.size && window.gl_load_data?.PUB_INFO_LIST?.PUB_INFO) {
				pubListUl.innerHTML = "";
				pubSet.forEach((pubCode) => {
					// 출입구 코드 삭제
					if (window.PUB_MAP[pubCode].PUB_CODE != "P06") {
						makePubList(pubCode, pubListUl);
					}
				});
			}

			// 공용시설 클릭 시 이벤트
			$(".floor_left > ul > li > div").on("click", function () {
				if (PubTweenList) {
					$(".pub-info").css("transform", "translate(-50%, -50%)");
					PubTweenList.kill();
				}
				var pubCode = $(this).data("pub-code");
				PubTweenList = TweenMax.fromTo($(".pub-info[data-pub-code=" + pubCode + "]"), 0.5, { scale: 2 }, { scale: 1, yoyo: true, repeat: 8 });

				var obj = {
					sect: "PUBLIC",
					code: pubCode,
				};
				setStatisSend(obj);
			});

			// 전체지도일 경우 건물 좌표 위해 shape 표시
			var shapeList = gl_load_route.SHAPE_LIST.SHAPE_INFO;
			if (shapeList.length > 0) {
				var filterShapeList = shapeList.filter((e) => e.SHAPE_FLOOR.b_code == currentBuildingCode);
				$.each(filterShapeList, function () {
					var $divShape = $(
						'<div class="shape-info" onClick="onclickShapeInfo(this);" style="z-index:7; position: absolute; font-size: ' +
							this.SHAPE_TEXT.font_size * mapRateX +
							'px;  font-weight:bold; text-align:center;">' +
							this.SHAPE_TEXT.text +
							"</div>",
					);
					$(target).append($divShape);
					$divShape.css("transform", "translate(-50% ,-50%) rotate(" + this.SHAPE_FLOOR.angle + "deg");
					$divShape.css("top", this.SHAPE_FLOOR.pos_y * mapRateY + "px");
					$divShape.css("left", this.SHAPE_FLOOR.pos_x * mapRateX + "px");
				});
			}
			resolve();
		};
	});
}

function onclickShapeInfo(obj) {
	if (window.isAnimating) return;
	var buildingName = $(obj).text();
	var buildingObj = gl_json_building_floor_data.filter((e) => e.name.includes(buildingName))[0];
	$(".full_faci_btn, .faci_btn").each(function () {
		if ($(this).data("code") == buildingObj.code) {
			$(this).click();
		}
	});
}

function findWayStartToEnd(target, startXY, endXY, mapRateX, mapRateY) {}

function findFastWay(mapCtx, startXY, endXY, nodeList, mapRateX, mapRateY, isFirst, translateNodelList = []) {
	// 시작점에서 가장 가까운 점 찾기
	if (isFirst) {
		var nodeXYList = new Array();
		$.each(nodeList, function () {
			var obj1 = { x: this.x1, y: this.y1 };
			var obj2 = { x: this.x2, y: this.y2 };
			nodeXYList.push(obj1);
			nodeXYList.push(obj2);
		});

		var distance = new Array();
		$.each(nodeXYList, function () {
			distance.push(getDistance(startXY.x, this.x * mapRateX, startXY.y, this.y * mapRateY));
		});

		var min = distance[0];
		var minPos = 0;

		$.each(distance, function (idx) {
			if (min > distance[idx]) {
				min = distance[idx];
				minPos = idx;
			}
		});
		mapCtx.beginPath();
		mapCtx.strokeStyle = "red";
		mapCtx.lineWidth = 5;
		mapCtx.moveTo(startXY.x, startXY.y);
		mapCtx.lineTo(nodeXYList[minPos].x * mapRateX, nodeXYList[minPos].y * mapRateY);
		mapCtx.stroke();
		mapCtx.closePath();
		translateNodelList.push(nodeXYList[minPos]);

		startXY = { x: nodeXYList[minPos].x, y: nodeXYList[minPos].y };

		isFirst = false;

		if (startXY.x * mapRateX == endXY.x && startXY.y * mapRateY == endXY.y) {
			// 시작점과 도착점 같을 경우 return
			return translateNodelList;
		}
		if (nodeXYList[minPos]) {
			findFastWay(mapCtx, startXY, endXY, nodeList, mapRateX, mapRateY, isFirst, translateNodelList);
		}
	} else {
		// 가까운 노트 리스트
		var nearNodeList = new Array();
		var nearNodeXYList = new Array();

		// 가까운 노드 찾기
		$.each(nodeList, function () {
			if (this.x1 == startXY.x && this.y1 == startXY.y) {
				nearNodeList.push(this);
			}
			if (this.x2 == startXY.x && this.y2 == startXY.y) {
				nearNodeList.push(this);
			}
		});

		if (nearNodeList.length == 1) {
			var obj = { x: nearNodeList[0].x1, y: nearNodeList[0].y1 };
			if (nearNodeList[0].x2 != startXY.x) {
				obj = { x: nearNodeList[0].x2, y: nearNodeList[0].y2 };
			}
			strokeLine(mapCtx, startXY, obj, mapRateX, mapRateY, "red", 5);

			// 이동한 노드 삭제
			$.each(nodeList, function (idx) {
				if (this.x1 == startXY.x && this.y1 == startXY.y && this.x2 == obj.x && this.y2 == obj.y) {
					nodeList.splice(idx, 1);
				} else if (this.x1 == obj.x && this.y1 == obj.y && this.x2 == startXY.x && this.y2 == startXY.y) {
					nodeList.splice(idx, 1);
				}
			});

			// 시작점 이동한 노드 끝점으로 변경
			startXY = { x: obj.x, y: obj.y };
			translateNodelList.push(startXY);

			if (startXY.x * mapRateX == endXY.x && startXY.y * mapRateY == endXY.y) {
				// 시작점과 도착점 같을 경우 return
				return translateNodelList;
			} else {
				// 시작점과 도착점 다를 경우 길찾기 함수 호출
				findFastWay(mapCtx, startXY, endXY, nodeList, mapRateX, mapRateY, false, translateNodelList);
			}
		} else {
			// 시작점과 가까운 노드 중 x,y 좌표만 리스트 push
			$.each(nearNodeList, function () {
				var obj1 = { x: this.x1, y: this.y1 };
				var obj2 = { x: this.x2, y: this.y2 };
				nearNodeXYList.push(obj1);
				nearNodeXYList.push(obj2);
			});

			var distance = new Array();
			nearNodeXYList = nearNodeXYList.filter(function (value, index, array) {
				return array.findIndex((item) => item.x === value.x && item.y === value.y) === index;
			});

			$.each(nearNodeXYList, function (idx) {
				distance.push(getDistance(endXY.x, this.x * mapRateX, endXY.y, this.y * mapRateY));
			});

			var min = distance[0];
			var minPos = 0;

			$.each(distance, function (idx) {
				if (min > distance[idx]) {
					min = distance[idx];
					minPos = idx;
				}
			});

			strokeLine(mapCtx, startXY, nearNodeXYList[minPos], mapRateX, mapRateY, "red", 5);

			// 이동한 노드 삭제
			$.each(nodeList, function (idx) {
				if (this.x1 == startXY.x && this.y1 == startXY.y && this.x2 == nearNodeXYList[minPos].x && this.y2 == nearNodeXYList[minPos].y) {
					// strokeLine({x:this.x1, y:this.y1}, {x:this.x2, y:this.y2}, mapRateX, mapRateY, 'yellow', 3);
					nodeList.splice(idx, 1);
				} else if (this.x1 == nearNodeXYList[minPos].x && this.y1 == nearNodeXYList[minPos].y && this.x2 == startXY.x && this.y2 == startXY.y) {
					// strokeLine({x:this.x1, y:this.y1}, {x:this.x2, y:this.y2}, mapRateX, mapRateY, 'yellow', 3);
					nodeList.splice(idx, 1);
				}
			});
			startXY = { x: nearNodeXYList[minPos].x, y: nearNodeXYList[minPos].y };
			translateNodelList.push(startXY);
			if (startXY.x * mapRateX == endXY.x && startXY.y * mapRateY == endXY.y) {
				return translateNodelList;
			} else {
				findFastWay(mapCtx, startXY, endXY, nodeList, mapRateX, mapRateY, false, translateNodelList);
			}
		}
	}
}

function strokeLine(mapCtx, startXY, endXY, mapRateX, mapRateY, color, lineWidth) {
	const jumpNodeList = [
		{ x: 1141, y: 953 },
		{ x: 1434, y: 592 },
	];

	const isJumpNode =
		(+startXY?.x === jumpNodeList[0].x && +startXY?.y === jumpNodeList[0].y && +endXY.x === jumpNodeList[1].x && +endXY.y === jumpNodeList[1].y) ||
		(+startXY?.x === jumpNodeList[1].x && +startXY?.y === jumpNodeList[1].y && +endXY.x === jumpNodeList[0].x && +endXY.y === jumpNodeList[0].y);

	mapCtx.beginPath();
	mapCtx.strokeStyle = isJumpNode ? "transparent" : color;
	mapCtx.lineWidth = lineWidth;
	mapCtx.moveTo(startXY.x * mapRateX, startXY.y * mapRateY);
	mapCtx.lineTo(endXY.x * mapRateX, endXY.y * mapRateY);
	mapCtx.stroke();
	mapCtx.closePath();
}

function findNearNodeStroke(mapCtx, startXY, mapRate, buildingCode, floorCode) {
	var distance = new Array();
	var mapRateX = mapRate.mapRateX;
	var mapRateY = mapRate.mapRateY;
	mapCtx.beginPath();
	/*mapCtx.fillStyle = 'blue';
      mapCtx.moveTo(startXY.x, startXY.y);
      mapCtx.arc(startXY.x, startXY.y, 10, 0, 2 * Math.PI);
      mapCtx.fill();
      mapCtx.closePath();*/

	var nodeList = [...gl_load_route.NODE_LIST.NODE_INFO];
	// 해당 건물, 층에 해당하는 노드 리스트

	if (buildingCode === "B0001" || buildingCode === "B0002") {
		nodeList = nodeList.filter((e) => e.b_code == buildingCode);
	} else {
		nodeList = nodeList.filter((e) => e.b_code == buildingCode && e.floor == floorCode);
	}

	// 노드 좌표
	var nodeXYList = new Array();
	$.each(nodeList, function () {
		var obj1 = { x: this.x1, y: this.y1 };
		var obj2 = { x: this.x2, y: this.y2 };
		nodeXYList.push(obj1);
		nodeXYList.push(obj2);
	});

	nodeXYList = nodeXYList.filter(function (value, index, array) {
		return array.findIndex((item) => item.x === value.x && item.y === value.y) === index;
	});

	$.each(nodeXYList, function (idx) {
		distance.push(getDistance(startXY.x, this.x * mapRateX, startXY.y, this.y * mapRateY));
	});
	var min = distance[0];
	var minPos = 0;

	$.each(distance, function (idx) {
		if (min > distance[idx]) {
			min = distance[idx];
			minPos = idx;
		}
	});

	mapCtx.beginPath();
	mapCtx.strokeStyle = "red";
	mapCtx.lineWidth = 5;
	mapCtx.moveTo(startXY.x, startXY.y);
	mapCtx.lineTo(nodeXYList[minPos].x * mapRateX, nodeXYList[minPos].y * mapRateY);
	mapCtx.stroke();
	mapCtx.closePath();

	return {
		x: nodeXYList[minPos].x * mapRateX,
		y: nodeXYList[minPos].y * mapRateY,
	};
}

const findNearlistPubByCode = (mapItem, pubCode, startPosition, mapRate) => {
	const selectedPubList = mapItem.PUB_LIST.filter((pub) => pub.PUB_CODE === pubCode);
	if (selectedPubList.length !== 1) {
		let minDistance = Infinity;
		let minIdx = selectedPubList.length - 1;
		selectedPubList.forEach((pub, idx) => {
			const distance = getDistance(startPosition.x, pub.POSITION.x * mapRate.mapRateX, startPosition.y, pub.POSITION.y * mapRate.mapRateY);
			if (distance < minDistance) {
				minDistance = distance;
				minIdx = idx;
			}
		});

		return {
			...selectedPubList[minIdx],
		};
	} else {
		return {
			...selectedPubList[0],
		};
	}
};

const paintFastNodes = (selectedObj, latestMap, mapListObj, aList) => {
	const animationList = aList ? [...aList] : [];
	const { crossLpBuildingType } = selectedObj;
	const { idx, mapList } = mapListObj;
	if (idx >= mapList.length) {
		return animationList;
	} else {
		const isFirstMap = idx === 0;
		const isLastMap = idx === mapList.length - 1;
		const $this = mapList[idx];
		const prev = mapList[idx - 1];
		const last = mapList[idx + 1];
		const destination = window.MAP_BY_B_CODE[selectedObj.BUILDING_CODE][selectedObj.FLOOR_CODE]?.store?.find((store) => store.id === selectedObj.ID) ?? window.MAP_BY_B_CODE[selectedObj.BUILDING_CODE];
		const translateNodeList = [];
		const buildingCode = $this.b_code;
		const floorCode = $this.floor;
		const _canvas = document.getElementById("canvas_" + idx);
		const mapCtx = _canvas.getContext("2d");
		const mapRate = getMapRate($("#id_map_slide_" + idx));
		const mapRateX = mapRate.mapRateX;
		const mapRateY = mapRate.mapRateY;
		const pubList = MAP_BY_B_CODE[$this.b_code][$this.floor]?.PUB_LIST || [];
		/**
		 * crossLpBuildingType
		 * INCLUDE_2F : 전체지도 -> 매너하우스
		 * INCLUDE_1F : 매너하우스 -> 전체지도
		 * STARTED_UNDERGROUND : 지하지도 -> 매너하우스
		 * IDLE 			: 일반
		 */
		let findStartPosition = isFirstMap
			? { POSITION: { x: gl_kiosk.KIOSK_FLOOR.pos_x, y: gl_kiosk.KIOSK_FLOOR.pos_y } }
			: $this.b_code === "B0002"
			? pubList.find((pub) => pub.BUILDING_CODE === latestMap.BUILDING_CODE)
			: $this.SHAPE_LIST.find((shape) => shape.BUILDING_CODE === latestMap.BUILDING_CODE);
		if (!findStartPosition) {
			const filteredPub =
				pubList.find((pub) => pub.PUB_CODE === "P06") || pubList.find((e) => e.area.includes(latestMap.BUILDING_CODE) && e.PUB_CODE == "P01") || pubList.find((e) => e.PUB_CODE == "P01");
			findStartPosition = findNearlistPubByCode($this, latestMap?.FLOOR_CODE === "전체지도" ? "P06" : "P01", { x: filteredPub.PUB_FLOOR.pos_x, y: filteredPub.PUB_FLOOR.pos_y }, mapRate);
		}

		if (!isFirstMap) {
			if (prev.b_code === "B0008" && !["2F", "1F"].includes($this?.floor) && !destination.STORE_NAME_KOR?.includes("야외수영장") && OUTSIDE_BUILDING_LIST.includes(destination.BUILDING_CODE)) {
				findStartPosition = { POSITION: { x: 1434, y: 595 } };
			}
			if (["INCLUDE_2F"].includes(crossLpBuildingType)) {
				if ($this.b_code === "B0008" && $this.floor === "2F") {
					findStartPosition = pubList.find((pub) => pub.PUB_CODE === "P02");
				}
			} else if (["INCLUDE_1F", "STARTED_UNDERGROUND"].includes(crossLpBuildingType)) {
				if ($this.b_code === "B0008" && $this.floor === "1F") {
					const isStartedUnderground = crossLpBuildingType === "STARTED_UNDERGROUND";
					findStartPosition = pubList.find((pub) => (isStartedUnderground ? pub.PUB_ID === "PUB_1F_7" : pub.PUB_CODE === "P02"));
				}
			} else if (["INCLUDE_2F_REVERSE"].includes(crossLpBuildingType)) {
				if ($this.b_code === "B0008" && $this.floor === "2F") {
					findStartPosition = pubList.find((pub) => pub.PUB_CODE === "P06");
				} else if ($this.b_code === "B0008" && $this.floor === "1F") {
					findStartPosition = pubList.find((pub) => pub.PUB_CODE === "P02");
				}
			}
		}

		if (gl_kiosk.KIOSK_CODE === "KANTW012" && isFirstMap && OUTSIDE_BUILDING_LIST.includes(destination?.BUILDING_CODE)) {
			findStartPosition = { POSITION: { x: gl_kiosk.KIOSK_FLOOR.pos_x, y: gl_kiosk.KIOSK_FLOOR.pos_y } };
		}
		const startPosition = { POSITION: { x: findStartPosition.POSITION.x * mapRateX, y: findStartPosition.POSITION.y * mapRateY } };

		let nextDestinationPosition =
			$this.b_code === "B0002"
				? pubList.find((pub) => pub.BUILDING_CODE === (isLastMap ? selectedObj.BUILDING_CODE : last.b_code)) ||
				  pubList.find((e) => e.area.includes(isLastMap ? selectedObj.BUILDING_CODE : last.b_code) && e.PUB_CODE == "P01")
				: isLastMap
				? destination
				: $this.SHAPE_LIST?.length
				? $this.SHAPE_LIST.find((shape) => {
						return shape.SHAPE_TEXT.text === last.MAP_NAME;
				  })
				: findNearlistPubByCode($this, last.b_code === "B0002" ? "P01" : $this.b_code === last.b_code ? "P01" : last.SHAPE_LIST.length ? "P06" : "P06", startPosition.POSITION, mapRate);
		if (!isLastMap) {
			if (["STARTED_UNDERGROUND", "INCLUDE_2F"].includes(crossLpBuildingType) && $this.b_code === "B0008" && $this.floor === "1F") {
				const isStartedUnderground = crossLpBuildingType === "STARTED_UNDERGROUND";
				nextDestinationPosition = pubList.find((pub) => (isStartedUnderground ? pub.PUB_ID === "PUB_1F_3" : pub.PUB_CODE === "P02"));
			} else if (["INCLUDE_2F_REVERSE"].includes(crossLpBuildingType)) {
				if ($this.b_code === "B0001") {
					if (prev?.b_code === "B0011") {
						nextDestinationPosition = { POSITION: { x: 1434, y: 595 } };
					}
				}
				if ($this.b_code === "B0008" && $this.floor === "2F") {
					nextDestinationPosition = pubList.find((pub) => pub.PUB_CODE === "P02");
				}
			}
		}
		if (gl_kiosk.KIOSK_CODE === "KANTW012" && isFirstMap && !OUTSIDE_BUILDING_LIST.includes(destination?.BUILDING_CODE)) {
			nextDestinationPosition = { POSITION: { x: 1434, y: 595 } };
		}

		const endPosition = { x: nextDestinationPosition.POSITION.x * mapRateX, y: nextDestinationPosition.POSITION.y * mapRateY };
		const startXY = findNearNodeStroke(mapCtx, startPosition.POSITION, mapRate, buildingCode, floorCode);
		const endXY = findNearNodeStroke(mapCtx, endPosition, mapRate, buildingCode, floorCode);
		translateNodeList.push({ x: startXY.x / mapRateX, y: startXY.y / mapRateY });
		// 해당 건물, 층에 해당하는 노드 리스트
		const nodeList = gl_load_route.NODE_LIST.NODE_INFO.filter((e) => e.b_code == buildingCode && e.floor === (["전체지도", "지하지도"].includes(floorCode) ? "" : floorCode));
		findFastWay(mapCtx, startXY, endXY, nodeList, mapRateX, mapRateY, true, translateNodeList);
		translateNodeList.push({ x: nextDestinationPosition.POSITION.x, y: nextDestinationPosition.POSITION.y });
		animationList.push(
			() =>
				new Promise((resolve) => {
					$("#id_map_slide_" + idx).append(
						'<img id="id_find_human_' + idx + '"  style="top: 0; left:0; width:50px; height:50px; z-index:10; position: absolute;" src="images/wayfind/ico_m_point_human.png" />',
					);
					$("#id_find_human_" + idx)
						.css("top", startXY.y - $("#id_find_human").height() / 2)
						.css("left", startXY.x - $("#id_find_human").width() / 2);
					moveHuman($("#id_find_human_" + idx), [...translateNodeList], idx, mapRate).then(() => resolve());
				}),
		);
		const nextIndex = idx + 1;

		return paintFastNodes(selectedObj, nextDestinationPosition, { ...mapListObj, idx: nextIndex }, animationList);
	}
};

function findWay(obj) {
	const selectedBuildingCode = $("#building_code").val();
	const selectedFloorCode = $("#floor_code").val() ?? "1F";
	const selectedStoreId = $("#store_id").val();
	const destination = window.MAP_BY_B_CODE[selectedBuildingCode]?.[selectedFloorCode]?.store?.find((store) => store.id === selectedStoreId) ?? window.MAP_BY_B_CODE[selectedBuildingCode];
	const myGeoLocationKiosk = getMyKiost();
	let crossLpBuildingType = "IDLE";
	try {
		$("#wayFindPopup").show();

		// 날씨 코드 sun: 맑은날, rain: 궂은날
		const weatherCode = $(obj).data("code") || (kioskBuildingCode === "B0002" ? "rain" : "sun");
		let mapList = new Array();
		const currentBuildingCode = selectedBuildingCode || $(".full_faci_btn.active, .faci_btn.active").data("code");
		const currentFloorCode = selectedFloorCode || $(".floor_right > ul > li.active").data("floor-code");

		if (myGeoLocationKiosk) {
			mapList.push(myGeoLocationKiosk);
		}
		const foreGround = MAP_BY_B_CODE["B0001"]["전체지도"];
		const underGround = MAP_BY_B_CODE["B0002"]["지하지도"];
		const isIncludesForeGroundBuildingList = OUTSIDE_BUILDING_LIST.includes(currentBuildingCode);
		const baseMap = weatherCode === "sun" ? foreGround : underGround;

		// 목적지가 현재 키오스크 건물과 같다면
		if (selectedBuildingCode === kioskBuildingCode) {
			const anotherFloorKiosk = gl_map_list.filter((e) => e.b_code == currentBuildingCode && e.floor == currentFloorCode)?.[0];
			// 같은 건물내의 다른 층이라면
			if (selectedFloorCode !== kioskFloorCode && anotherFloorKiosk) {
				checkAndPushCurrent(mapList, MAP_BY_B_CODE[currentBuildingCode][currentFloorCode]);
			}
		} else {
			const isTwoDepthMoreMapPath =
				!myGeoLocationKiosk?.SHAPE_LIST?.find((shape) => shape.BUILDING_CODE === selectedBuildingCode) || !myGeoLocationKiosk.PUB_LIST.find((pub) => pub.BUILDING_CODE === selectedBuildingCode);
			if (currentFloorCode === "1F") {
				if (isTwoDepthMoreMapPath && OUTSIDE_BUILDING_LIST.includes(selectedBuildingCode)) {
					if (weatherCode === "rain" && myGeoLocationKiosk.b_code === "B0002") {
						const 엘피크리스탈 = MAP_BY_B_CODE["B0008"]["1F"];
						checkAndPushCurrent(mapList, 엘피크리스탈);
					}
				}
				checkAndPushCurrent(mapList, myGeoLocationKiosk.b_code === "B0011" ? foreGround : myGeoLocationKiosk.b_code === "B0002" && isIncludesForeGroundBuildingList ? foreGround : baseMap);
				checkAndPushCurrent(mapList, MAP_BY_B_CODE[currentBuildingCode][currentFloorCode]);
			} else {
				if (weatherCode == "sun") {
					checkAndPushCurrent(mapList, foreGround);
				} else {
					checkAndPushCurrent(mapList, underGround);
				}

				if (weatherCode === "sun") {
					checkAndPushCurrent(mapList, MAP_BY_B_CODE[currentBuildingCode]["1F"]);
				}
				checkAndPushCurrent(mapList, MAP_BY_B_CODE[currentBuildingCode][currentFloorCode]);
			}
		}

		var wayTitle = new Array();
		var waySubTitle = new Array();
		$("#id_wayfind_list").html("");

		const wayfindListDom = document.getElementById("id_wayfind_list");
		mapList = mapList.filter((item) => !!item);
		if (!selectedStoreId) mapList.pop();
		// B0008 -> B0001 -> B0011 ==> 전체에서 매너하우스로
		// B0011 -> B0001 -> B0008 ==> 전체에서 매너하우스로

		/**
		 * 시작위치 -> 목적지
		 */
		// 목적지가 야외일경우
		// 시작지가 야외일 경우
		const 엘피크리스탈1층 = MAP_BY_B_CODE["B0008"]["1F"];
		const 엘피크리스탈2층 = MAP_BY_B_CODE["B0008"]["2F"];
		if (
			OUTSIDE_BUILDING_LIST.includes(destination.BUILDING_CODE) &&
			!OUTSIDE_BUILDING_LIST.includes(myGeoLocationKiosk.b_code) &&
			!(OUTSIDE_BUILDING_LIST.includes(destination.BUILDING_CODE) && gl_kiosk.KIOSK_CODE === "KANTW012")
		) {
			const isIncludeForegroundOfMyLocation = ["B0001"].includes(mapList[0].b_code);
			let isLPIncludes = false;
			if (myGeoLocationKiosk.b_code !== "B0002") {
				if (myGeoLocationKiosk.b_code !== "B0008") {
					if (isIncludeForegroundOfMyLocation) {
						mapList = [mapList[0], 엘피크리스탈1층, ...mapList.slice(1, mapList.length)];
					} else {
						const groundList = ["B0001", "B0002"];
						const foreIndex = mapList.findIndex((map) => {
							return groundList.includes(map.b_code);
						});

						if (foreIndex > -1) {
							mapList = [...mapList.slice(0, foreIndex + 1), 엘피크리스탈1층, 엘피크리스탈2층, foreGround, ...mapList.slice(foreIndex + 1, mapList.length)];
							isLPIncludes = true;
							crossLpBuildingType = "INCLUDE_2F";
						}
					}
					const startIndex = mapList.findIndex((map) => {
						return map.b_code === "B0008";
					});

					if (!isLPIncludes && startIndex > -1) {
						mapList = [...mapList.slice(0, startIndex), mapList[startIndex], 엘피크리스탈2층, foreGround, ...mapList.slice(startIndex + 1, mapList.length)];
						crossLpBuildingType = "INCLUDE_2F";
					}
				} else {
					const startIndex = mapList.findIndex((map) => {
						return map.b_code === "B0008";
					});

					if (!isLPIncludes && startIndex > -1) {
						mapList = [...mapList.slice(0, startIndex), mapList[startIndex], 엘피크리스탈2층, ...mapList.slice(startIndex + 1, mapList.length)];
						crossLpBuildingType = "INCLUDE_2F";
					}
				}
			} else {
				const startIndex = mapList.findIndex((map) => {
					return map.b_code === "B0008";
				});
				if (startIndex > -1) {
					mapList = [...mapList.slice(0, startIndex), 엘피크리스탈1층, 엘피크리스탈2층, ...mapList.slice(startIndex + 1, mapList.length)];
					crossLpBuildingType = "STARTED_UNDERGROUND";
				}
			}
		} else if (
			(!OUTSIDE_BUILDING_LIST.includes(destination.BUILDING_CODE) && OUTSIDE_BUILDING_LIST.includes(myGeoLocationKiosk.b_code)) ||
			(gl_kiosk.KIOSK_CODE === "KANTW012" && !OUTSIDE_BUILDING_LIST.includes(destination.BUILDING_CODE))
		) {
			if (destination.BUILDING_CODE === "B0008") {
				const lastItem = mapList[mapList.length - 1];
				mapList.pop();
				if (lastItem.floor === "1F") {
					checkAndPushCurrent(mapList, MAP_BY_B_CODE["B0008"]["2F"]);
				} else {
					mapList.pop();
				}
				checkAndPushCurrent(mapList, lastItem);
				crossLpBuildingType = "INCLUDE_2F_REVERSE";
			} else {
				const groundList = ["B0001", "B0002"];
				const foreIndex = mapList.findIndex((map) => {
					return groundList.includes(map.b_code);
				});
				if (foreIndex > -1) {
					const isForeGround = mapList[foreIndex].b_code === "B0001";

					if (isForeGround) {
						mapList = [
							...mapList.slice(0, foreIndex + 1),
							엘피크리스탈2층,
							엘피크리스탈1층,
							...[...(!groundList.includes(destination.BUILDING_CODE) ? [foreGround] : []), ...mapList.slice(foreIndex + 1, mapList.length)],
						];
					} else {
						mapList = [...mapList.slice(0, foreIndex), foreGround, 엘피크리스탈2층, 엘피크리스탈1층, underGround, ...mapList.slice(foreIndex + 1, mapList.length)];
					}

					crossLpBuildingType = "INCLUDE_2F_REVERSE";
				}
			}
		}

		const lastItem = mapList[mapList.length - 1];

		if (destination.STORE_NAME_KOR?.includes("야외수영장")) {
			if (lastItem?.b_code === "B0001" && weatherCode === "rain") {
				mapList.pop();
				checkAndPushCurrent(mapList, MAP_BY_B_CODE["B0003"]["1F"]);
				checkAndPushCurrent(mapList, lastItem);
			} else {
				checkAndPushCurrent(mapList, MAP_BY_B_CODE[currentBuildingCode][currentFloorCode]);
			}
		}

		// FIXME: 매너하우스 -> 엘피크리스탈 2층으로 가는 케이스 하드코딩
		if (mapList.length === 2 && weatherCode === "rain" && destination.BUILDING_CODE === "B0008" && destination.FLOOR_CODE === "2F" && myGeoLocationKiosk.b_code !== "B0008") {
			const lastMap = mapList[mapList.length - 1];
			mapList.pop();
			checkAndPushCurrent(mapList, foreGround);
			checkAndPushCurrent(mapList, lastMap);
		}
		const imageNodeList = mapList.map((map, idx) => {
			if (map.MAP_NAME == "전체지도") {
				wayTitle.push(map.floor);
				waySubTitle.push("");
			} else if (map.MAP_NAME == "지하지도") {
				wayTitle.push("L1F");
				waySubTitle.push("주차장");
			} else {
				wayTitle.push(map.floor);
				waySubTitle.push(map.MAP_NAME);
			}
			const slideWrapper = document.createElement("div");
			slideWrapper.classList.add("swiper-slide");
			slideWrapper.id = `swiperSlide${idx}`;
			slideWrapper.style.cssText = "display:flex; justify-content: center;";
			slideWrapper.innerHTML = `
							<div class="id_map_slide" id="id_map_slide_${idx}" style="position: relative; height: 100%; transform: scale(1, 1);" data-building-code="${map.b_code}" data-floor-code="${map.floor}">
									<canvas id="canvas_${idx}" style="position: absolute; z-index:5;"></canvas>
									<img src="${map.MAIN_MAP_URL}" alt="" />
							</div>`;
			wayfindListDom.appendChild(slideWrapper);
			return slideWrapper.querySelector("img");
		});

		// canvas width height 조절
		const canvases = [...wayfindListDom.querySelectorAll(".id_map_slide")];
		try {
			floorSwiper?.destroy?.();
		} catch (err) {
			console.error(err);
		}
		floorSwiper = new Swiper(".wayFindSwiper", {
			slidesPerView: 1,
			spaceBetween: 0,
			pagination: {
				el: ".swiper-pagination.wayfind-pagination",
				clickable: true,
				renderBullet: function (index, className) {
					return '<span class="' + className + '">' + '<span class="popup_way_title">' + wayTitle[index] + "</span>" + '<span class="popup_way_subtitle">' + waySubTitle[index] + "</span>" + "</span>";
				},
			},
			navigation: {
				nextEl: ".wayfind-next",
				prevEl: ".wayfind-prev",
			},
		});

		// qr코드
		$("#qrBox").html("");
		qrcode = new QRCode("qrBox", {
			text: gl_kiosk.URL_QR + "?storeId=" + selectedStoreId + "&kioskCode=" + gl_kiosk.KIOSK_CODE + "&weatherCode=" + weatherCode + '&buildingCode=' + selectedBuildingCode,
			width: 250,
			height: 250,
			colorDark: "#000000",
			colorLight: "#ffffff",
			correctLevel: QRCode.CorrectLevel.H,
		});

		const promisePaintCanvases = canvases.map((target, idx) => {
			const { dataset: { buildingCode: bCode, floorCode: fCode } = {} } = target;
			// 매장, 공용시설, shape 바인딩

			return new Promise((resolve) => {
				bindRouteData(document.getElementById(`id_map_slide_${idx}`), bCode, fCode).then(() => {
					const canvas = target.querySelector("canvas");
					$(canvas).attr("width", imageNodeList[idx].width);
					$(canvas).attr("height", imageNodeList[idx].height);
					if (kioskBuildingCode === bCode && kioskFloorCode === fCode) {
						$("#id_map_slide_" + idx).append('<img id="id_map_location" src="images/wayfind/floor_minimap_start.svg" style="position: absolute; top:0; left:0; width: 40px; height: 56px;" />');
						var mapRate = getMapRate($("#id_map_slide_" + idx), mapSettingSizeW, mapSettingSizeH);
						var mapRateX = mapRate.mapRateX;
						var mapRateY = mapRate.mapRateY;
						var positionX = gl_kiosk.KIOSK_FLOOR.pos_x * mapRateX - $("#id_map_location").width() / 2;
						var positionY = gl_kiosk.KIOSK_FLOOR.pos_y * mapRateY - $("#id_map_location").height() - TweenMaxY;
						//positionY = gl_kiosk.KIOSK_FLOOR.pos_y * mapRateY - $('#id_location').height() - 0;
						$("#id_map_location")
							.css("left", positionX + "px")
							.css("top", positionY + "px");
						TweenMax.to($("#id_map_location"), 0.5, { y: TweenMaxY, yoyo: true, repeat: -1 });
					}
					resolve();
				});
			});
		});
		Promise.all(promisePaintCanvases).then(() => {
			$("#id_popup_weather").hide();
			$("#id_popup_store").hide();
			const animations = paintFastNodes({ BUILDING_CODE: selectedBuildingCode, FLOOR_CODE: selectedFloorCode, ID: selectedStoreId, WEATHER_CODE: weatherCode, crossLpBuildingType }, null, {
				mapList,
				idx: 0,
			});
			floorSwiper.slideTo(0, 300, false);
			window.isAnimating = true;
			fireNextfn(animations, 0, () => {
				window.isAnimating = false;
			});
		});
	} catch (err) {
		console.error(err, err);
	}
	onClosePopup();
}

async function fireNextfn(fnList, idx, cb) {
	if (idx > fnList.length) return cb && cb();

	await fnList[idx]?.();
	fireNextfn(fnList, idx + 1, cb);
}

function moveHuman(humanEl, translateNodeList, idx, mapRate) {
	return new Promise((resovle) => {
		var mapRateX = mapRate.mapRateX;
		var mapRateY = mapRate.mapRateY;
		for (let i = 0; i < translateNodeList.length - 1; i++) {
			const jumpNodeList = [
				{ x: 1141, y: 953 },
				{ x: 1434, y: 592 },
			];
			const startXY = translateNodeList[i];
			const endXY = translateNodeList[i + 1];
			var _distance = getDistance(translateNodeList[i].x * mapRateX, translateNodeList[i + 1].x * mapRateX, translateNodeList[i].y * mapRateY, translateNodeList[i + 1].y * mapRateY);
			var setTime = _distance * 5;
			const isJumpNode =
				(+startXY?.x === jumpNodeList[0].x && +startXY?.y === jumpNodeList[0].y && +endXY.x === jumpNodeList[1].x && +endXY.y === jumpNodeList[1].y) ||
				(+startXY?.x === jumpNodeList[1].x && +startXY?.y === jumpNodeList[1].y && +endXY.x === jumpNodeList[0].x && +endXY.y === jumpNodeList[0].y);

			$(humanEl)
				.animate(
					{
						left: translateNodeList[i + 1].x * mapRateX - $(humanEl).width() / 2,
						top: translateNodeList[i + 1].y * mapRateY - $(humanEl).height() / 2,
					},
					isJumpNode ? 0 : setTime,
					"linear",
				)
				.promise()
				.done(() => {
					if (i === translateNodeList.length - 2) {
						floorSwiper.slideTo(idx + 1, setTime, false);
						setTimeout(() => resovle(), setTime);
					}
				});
		}
	});
}
