// 같은 건물, 같은 층일 경우

// var translateNodeList = new Array();
// if (findWayCase === 1) {
// 	translateNodeList = new Array();
// 	var buildingCode = $this.b_code;
// 	var floorCode = $this.floor;
// 	var _canvas = document.getElementById("canvas_" + idx);
// 	var mapCtx = _canvas.getContext("2d");
// 	var mapRate = getMapRate($("#id_map_slide_" + idx), mapSettingSizeW, mapSettingSizeH);
// 	var mapRateX = mapRate.mapRateX;
// 	var mapRateY = mapRate.mapRateY;
// 	var startXY = { x: gl_kiosk.KIOSK_FLOOR.pos_x * mapRateX, y: gl_kiosk.KIOSK_FLOOR.pos_y * mapRateY };
// 	var endXY = { x: destinationStore.STORE_FLOOR.pos_x * mapRateX, y: destinationStore.STORE_FLOOR.pos_y * mapRateY };

// 	translateNodeList.push({ x: startXY.x / mapRateX, y: startXY.y / mapRateY });
// 	startXY = findNearNodeStroke(mapCtx, startXY, mapRate, buildingCode, floorCode);
// 	endXY = findNearNodeStroke(mapCtx, endXY, mapRate, buildingCode, floorCode);

// 	var nodeList = gl_load_route.NODE_LIST.NODE_INFO;
// 	// 해당 건물, 층에 해당하는 노드 리스트
// 	nodeList = nodeList.filter((e) => e.b_code == buildingCode && e.floor == floorCode);

// 	findFastWay(mapCtx, startXY, endXY, nodeList, mapRateX, mapRateY, true, translateNodeList);
// 	translateNodeList.push({ x: destinationStore.STORE_FLOOR.pos_x, y: destinationStore.STORE_FLOOR.pos_y });

// 	$("#id_map_slide_" + idx).append(
// 		'<img id="id_find_human_' + idx + '"  style="top: 0; left:0; width:50px; height:50px; z-index:10; position: absolute;" src="images/wayfind/ico_m_point_human.png" />',
// 	);
// 	$("#id_find_human_" + idx)
// 		.css("top", startXY.y - $("#id_find_human").height() / 2)
// 		.css("left", startXY.x - $("#id_find_human").width() / 2);
// 	moveHuman($("#id_find_human_" + idx), translateNodeList, mapList, mapRate);
// } else if (findWayCase == 2) {
// 	translateNodeList = new Array(0);
// 	var buildingCode = $this.b_code;
// 	var floorCode = $this.floor;
// 	var _canvas = document.getElementById("canvas_" + idx);
// 	var mapCtx = _canvas.getContext("2d");
// 	var mapRate = getMapRate($("#id_map_slide_0"), mapSettingSizeW, mapSettingSizeH);
// 	var mapRateX = mapRate.mapRateX;
// 	var mapRateY = mapRate.mapRateY;

// 	var nodeXYList = new Array();
// 	var startXY = new Object();
// 	var endXY = new Object();
// 	var pubXYList = new Array();

// 	// 다음 지도와 같은 건물일 경우
// 	if (idx == 0) {
// 		if ($this.b_code == mapList[idx + 1].b_code) {
// 			// 엘리베이터 코드 - P01 , 에스컬레이터 - P02, 출입문 코드 - P06
// 			// 가까운 엘리베이터를 찾는다.
// 			startXY = { x: gl_kiosk.KIOSK_FLOOR.pos_x * mapRateX, y: gl_kiosk.KIOSK_FLOOR.pos_y * mapRateY };
// 			translateNodeList.push(startXY);

// 			var pubList = gl_load_route.PUB_LIST.PUB_INFO;
// 			if (pubList.length > 0) {
// 				var filterPubList = pubList.filter((e) => e.PUB_FLOOR.b_code == $this.b_code && e.PUB_FLOOR.text == $this.floor && e.PUB_CODE == "P01");
// 				$.each(filterPubList, function () {
// 					var obj = { x: this.PUB_FLOOR.pos_x, y: this.PUB_FLOOR.pos_y };
// 					pubXYList.push(obj);
// 				});
// 				pubXYList = pubXYList.filter(function (value, index, array) {
// 					return array.findIndex((item) => item.x === value.x && item.y === value.y) === index;
// 				});

// 				var distance = new Array();
// 				$.each(pubXYList, function () {
// 					distance.push(getDistance(startXY.x, this.x * mapRateX, startXY.y, this.y * mapRateY));
// 				});

// 				var min = distance[0];
// 				var minPos = 0;
// 				$.each(distance, function (idx) {
// 					if (min > distance[idx]) {
// 						min = distance[idx];
// 						minPos = idx;
// 					}
// 				});
// 				endXY = { x: pubXYList[minPos].x * mapRateX, y: pubXYList[minPos].y * mapRateY };
// 			}

// 			startXY = findNearNodeStroke(mapCtx, startXY, mapRate, buildingCode, floorCode);
// 			endXY = findNearNodeStroke(mapCtx, endXY, mapRate, buildingCode, floorCode);

// 			var nodeList = gl_load_route.NODE_LIST.NODE_INFO;
// 			// 해당 건물, 층에 해당하는 노드 리스트
// 			nodeList = nodeList.filter((e) => e.b_code == buildingCode && e.floor == floorCode);

// 			if (pubXYList[minPos].x == endXY.x && pubXYList[minPos].y == endXY.y) {
// 				return;
// 			} else {
// 				findFastWay(mapCtx, startXY, endXY, nodeList, mapRateX, mapRateY, true, translateNodeList);
// 			}
// 			translateNodeList.push(endXY);
// 		}
// 		$("#id_map_slide_" + idx).append(
// 			'<img id="id_find_human_' + idx + '"  style="top: 0; left:0; width:50px; height:50px; z-index:10; position: absolute;" src="images/wayfind/ico_m_point_human.png" />',
// 		);
// 		/* $('#id_find_human_' + idx).css('top', startXY.y - $('#id_find_human_' + idx).height() / 2).css('left', startXY.x - $('#id_find_human_' + idx).width() / 2);
// 							 moveHuman($('#id_find_human_' + idx), translateNodeList, mapList, mapRate);*/
// 	} else if (idx == 1) {
// 		var pubList = gl_load_route.PUB_LIST.PUB_INFO;
// 		if (pubList.length > 0) {
// 			var filterPubList = pubList.filter((e) => e.PUB_FLOOR.b_code == $this.b_code && e.PUB_FLOOR.text == $this.floor && e.PUB_CODE == "P01");

// 			$.each(filterPubList, function () {
// 				var obj = { x: this.PUB_FLOOR.pos_x, y: this.PUB_FLOOR.pos_y };
// 				pubXYList.push(obj);
// 			});

// 			pubXYList = pubXYList.filter(function (value, index, array) {
// 				return array.findIndex((item) => item.x === value.x && item.y === value.y) === index;
// 			});

// 			var distance = new Array();
// 			$.each(pubXYList, function () {
// 				distance.push(getDistance(startXY.x, this.x * mapRateX, startXY.y, this.y * mapRateY));
// 			});

// 			var min = distance[0];
// 			var minPos = 0;
// 			$.each(distance, function (idx) {
// 				if (min > distance[idx]) {
// 					min = distance[idx];
// 					minPos = idx;
// 				}
// 			});

// 			startXY = { x: pubXYList[minPos].x * mapRateX, y: pubXYList[minPos].y * mapRateY };
// 			endXY = { x: destinationStore.STORE_FLOOR.pos_x * mapRateX, y: destinationStore.STORE_FLOOR.pos_y * mapRateY };
// 			startXY = findNearNodeStroke(mapCtx, startXY, mapRate, buildingCode, floorCode);
// 			var nodeList = gl_load_route.NODE_LIST.NODE_INFO;
// 			// 해당 건물, 층에 해당하는 노드 리스트
// 			nodeList = nodeList.filter((e) => e.b_code == buildingCode && e.floor == floorCode);
// 			endXY = findNearNodeStroke(mapCtx, endXY, mapRate, buildingCode, floorCode);
// 			findFastWay(mapCtx, startXY, endXY, nodeList, mapRateX, mapRateY, true);
// 		}
// 	}
// } else if (findWayCase == 3) {
// 	var buildingCode = $this.b_code;
// 	var floorCode = $this.floor;
// 	var _canvas = document.getElementById("canvas_" + idx);
// 	var mapCtx = _canvas.getContext("2d");
// 	var mapRate = getMapRate($("#id_map_slide_" + idx), mapSettingSizeW, mapSettingSizeH);
// 	var mapRateX = mapRate.mapRateX;
// 	var mapRateY = mapRate.mapRateY;

// 	var nodeXYList = new Array();
// 	var startXY = new Object();
// 	var endXY = new Object();
// 	var pubXYList = new Array();
// 	var startBuildingCode;

// 	if (idx == 0) {
// 		// 엘리베이터 코드 - P01 , 에스컬레이터 - P02, 출입문 코드 - P06
// 		startXY = { x: gl_kiosk.KIOSK_FLOOR.pos_x * mapRateX, y: gl_kiosk.KIOSK_FLOOR.pos_y * mapRateY };

// 		if (weatherCode == "sun") {
// 			var pubList = gl_load_route.PUB_LIST.PUB_INFO;
// 			if (pubList.length > 0) {
// 				var filterPubList = pubList.filter((e) => e.PUB_FLOOR.b_code == $this.b_code && e.PUB_FLOOR.text == $this.floor && e.PUB_CODE == "P06");

// 				$.each(filterPubList, function () {
// 					var obj = { x: this.PUB_FLOOR.pos_x, y: this.PUB_FLOOR.pos_y };
// 					pubXYList.push(obj);
// 				});
// 				pubXYList = pubXYList.filter(function (value, index, array) {
// 					return array.findIndex((item) => item.x === value.x && item.y === value.y) === index;
// 				});

// 				var distance = new Array();
// 				$.each(pubXYList, function () {
// 					distance.push(getDistance(startXY.x, this.x * mapRateX, startXY.y, this.y * mapRateY));
// 				});

// 				var min = distance[0];
// 				var minPos = 0;
// 				$.each(distance, function (idx) {
// 					if (min > distance[idx]) {
// 						min = distance[idx];
// 						minPos = idx;
// 					}
// 				});
// 				endXY = { x: pubXYList[minPos].x * mapRateX, y: pubXYList[minPos].y * mapRateY };
// 			}
// 		} else if (weatherCode == "rain") {
// 			var pubList = gl_load_route.PUB_LIST.PUB_INFO;
// 			if (pubList.length > 0) {
// 				var filterPubList = pubList.filter((e) => e.PUB_FLOOR.b_code == $this.b_code && e.PUB_FLOOR.text == $this.floor && e.PUB_CODE == "P01");
// 				$.each(filterPubList, function () {
// 					var obj = { x: this.PUB_FLOOR.pos_x, y: this.PUB_FLOOR.pos_y };
// 					pubXYList.push(obj);
// 				});
// 				pubXYList = pubXYList.filter(function (value, index, array) {
// 					return array.findIndex((item) => item.x === value.x && item.y === value.y) === index;
// 				});

// 				var distance = new Array();
// 				$.each(pubXYList, function () {
// 					distance.push(getDistance(startXY.x, this.x * mapRateX, startXY.y, this.y * mapRateY));
// 				});

// 				var min = distance[0];
// 				var minPos = 0;
// 				$.each(distance, function (idx) {
// 					if (min > distance[idx]) {
// 						min = distance[idx];
// 						minPos = idx;
// 					}
// 				});
// 				endXY = { x: pubXYList[minPos].x * mapRateX, y: pubXYList[minPos].y * mapRateY };
// 			}
// 		}

// 		startXY = findNearNodeStroke(mapCtx, startXY, mapRate, buildingCode, floorCode);
// 		endXY = findNearNodeStroke(mapCtx, endXY, mapRate, buildingCode, floorCode);

// 		var nodeList = gl_load_route.NODE_LIST.NODE_INFO;
// 		// 해당 건물, 층에 해당하는 노드 리스트
// 		nodeList = nodeList.filter((e) => e.b_code == buildingCode && e.floor == floorCode);

// 		// findFastWay(mapCtx, startXY, endXY, nodeList, mapRateX, mapRateY, true);
// 		if (pubXYList[minPos].x == endXY.x && pubXYList[minPos].y == endXY.y) {
// 			return;
// 		} else {
// 			findFastWay(mapCtx, startXY, endXY, nodeList, mapRateX, mapRateY, true);
// 			floorSwiper.slideTo(idx + 1, 0, false);
// 		}
// 	} else if (idx == 1) {
// 		// 매너하우스는 지상으로만 이동
// 		if (weatherCode == "sun" || currentBuildingCode == "B0011") {
// 			var shapeList = gl_load_route.SHAPE_LIST.SHAPE_INFO;
// 			var startBuildingObj = gl_json_building_floor_data.filter((e) => e.code == gl_kiosk.KIOSK_BUILDING)[0];
// 			var endBuildingObj = gl_json_building_floor_data.filter((e) => e.code == currentBuildingCode)[0];

// 			if (shapeList.length > 0) {
// 				var startShapeObj = shapeList.filter((e) => e.SHAPE_TEXT.text == startBuildingObj.name)[0];
// 				var endShapeObj = shapeList.filter((e) => e.SHAPE_TEXT.text == endBuildingObj.name)[0];
// 			}
// 			startXY = { x: startShapeObj.SHAPE_FLOOR.pos_x * mapRateX, y: startShapeObj.SHAPE_FLOOR.pos_y * mapRateY };
// 			endXY = { x: endShapeObj.SHAPE_FLOOR.pos_x * mapRateX, y: endShapeObj.SHAPE_FLOOR.pos_y * mapRateY };
// 			startXY = findNearNodeStroke(mapCtx, startXY, mapRate, buildingCode, floorCode);
// 			endXY = findNearNodeStroke(mapCtx, endXY, mapRate, buildingCode, floorCode);

// 			var nodeList = gl_load_route.NODE_LIST.NODE_INFO;
// 			// 해당 건물, 층에 해당하는 노드 리스트
// 			nodeList = nodeList.filter((e) => e.b_code == buildingCode);
// 			findFastWay(mapCtx, startXY, endXY, nodeList, mapRateX, mapRateY, true);
// 			floorSwiper.slideTo(idx + 1, 0, false);
// 		} else {
// 			var pubList = gl_load_route.PUB_LIST.PUB_INFO;

// 			var startBuildingObj = gl_json_building_floor_data.filter((e) => e.code == gl_kiosk.KIOSK_BUILDING)[0];
// 			var endBuildingObj = gl_json_building_floor_data.filter((e) => e.code == currentBuildingCode)[0];

// 			var filterPubList = new Array();
// 			if (pubList.length > 0) {
// 				filterPubList = pubList.filter((e) => e.PUB_FLOOR.b_code == $this.b_code && e.area.includes(startBuildingObj.code) && e.PUB_CODE == "P01");
// 				$.each(filterPubList, function () {
// 					var obj = { x: this.PUB_FLOOR.pos_x, y: this.PUB_FLOOR.pos_y };
// 					pubXYList.push(obj);
// 				});
// 				startXY = { x: pubXYList[0].x * mapRateX, y: pubXYList[0].y * mapRateY };

// 				filterPubList = new Array();
// 				filterPubList = pubList.filter((e) => e.PUB_FLOOR.b_code == $this.b_code && e.area.includes(endBuildingObj.code) && e.PUB_CODE == "P01");
// 				pubXYList = new Array();
// 				$.each(filterPubList, function () {
// 					var obj = { x: this.PUB_FLOOR.pos_x, y: this.PUB_FLOOR.pos_y };
// 					pubXYList.push(obj);
// 				});
// 				endXY = { x: pubXYList[0].x * mapRateX, y: pubXYList[0].y * mapRateY };
// 			}
// 			startXY = findNearNodeStroke(mapCtx, startXY, mapRate, buildingCode, floorCode);
// 			endXY = findNearNodeStroke(mapCtx, endXY, mapRate, buildingCode, floorCode);

// 			var nodeList = gl_load_route.NODE_LIST.NODE_INFO;
// 			// 해당 건물, 층에 해당하는 노드 리스트
// 			nodeList = nodeList.filter((e) => e.b_code == buildingCode);

// 			findFastWay(mapCtx, startXY, endXY, nodeList, mapRateX, mapRateY, true);
// 			floorSwiper.slideTo(idx + 1, 0, false);
// 		}
// 	} else if (idx == 2) {
// 		var pubList = gl_load_route.PUB_LIST.PUB_INFO;
// 		var filterPubList = new Array();
// 		if (pubList.length > 0) {
// 			if (weatherCode == "sun" || $this.b_code == "B0011") {
// 				filterPubList = pubList.filter((e) => e.PUB_FLOOR.b_code == $this.b_code && e.PUB_FLOOR.text == $this.floor && e.PUB_CODE == "P06");
// 			} else {
// 				filterPubList = pubList.filter((e) => e.PUB_FLOOR.b_code == $this.b_code && e.PUB_FLOOR.text == $this.floor && e.PUB_CODE == "P01");
// 			}

// 			$.each(filterPubList, function () {
// 				var obj = { x: this.PUB_FLOOR.pos_x, y: this.PUB_FLOOR.pos_y };
// 				pubXYList.push(obj);
// 			});
// 			if (pubXYList.length == 1) {
// 				startXY = { x: pubXYList[0].x * mapRateX, y: pubXYList[0].y * mapRateY };
// 			} else {
// 				pubXYList = pubXYList.filter(function (value, index, array) {
// 					return array.findIndex((item) => item.x === value.x && item.y === value.y) === index;
// 				});

// 				var distance = new Array();
// 				$.each(pubXYList, function () {
// 					distance.push(getDistance(startXY.x, this.x * mapRateX, startXY.y, this.y * mapRateY));
// 				});

// 				var min = distance[0];
// 				var minPos = 0;
// 				$.each(distance, function (idx) {
// 					if (min > distance[idx]) {
// 						min = distance[idx];
// 						minPos = idx;
// 					}
// 				});
// 				startXY = { x: pubXYList[minPos].x * mapRateX, y: pubXYList[minPos].y * mapRateY };
// 			}
// 		}

// 		startXY = findNearNodeStroke(mapCtx, startXY, mapRate, buildingCode, floorCode);
// 		var endXY = { x: destinationStore.STORE_FLOOR.pos_x * mapRateX, y: destinationStore.STORE_FLOOR.pos_y * mapRateY };
// 		endXY = findNearNodeStroke(mapCtx, endXY, mapRate, buildingCode, floorCode);

// 		var nodeList = gl_load_route.NODE_LIST.NODE_INFO;
// 		// 해당 건물, 층에 해당하는 노드 리스트
// 		nodeList = nodeList.filter((e) => e.b_code == buildingCode && e.floor == floorCode);

// 		// findFastWay(mapCtx, startXY, endXY, nodeList, mapRateX, mapRateY, true);
// 		if (startXY.x == endXY.x && startXY.y == endXY.y) {
// 			return;
// 		} else {
// 			findFastWay(mapCtx, startXY, endXY, nodeList, mapRateX, mapRateY, true);
// 		}
// 		floorSwiper.slideTo(idx + 1, 0, false);
// 	}
// } else if (findWayCase == 4) {
// 	var buildingCode = $this.b_code;
// 	var floorCode = $this.floor;
// 	var _canvas = document.getElementById("canvas_" + idx);
// 	var mapCtx = _canvas.getContext("2d");
// 	var mapRate = getMapRate($("#id_map_slide_" + idx), mapSettingSizeW, mapSettingSizeH);
// 	var mapRateX = mapRate.mapRateX;
// 	var mapRateY = mapRate.mapRateY;

// 	var nodeXYList = new Array();
// 	var startXY = new Object();
// 	var endXY = new Object();
// 	var pubXYList = new Array();
// 	var startBuildingCode;

// 	if (idx == 0) {
// 		// 엘리베이터 코드 - P01 , 에스컬레이터 - P02, 출입문 코드 - P06
// 		// 가까운 출입구를 찾는다.
// 		startXY = { x: gl_kiosk.KIOSK_FLOOR.pos_x * mapRateX, y: gl_kiosk.KIOSK_FLOOR.pos_y * mapRateY };

// 		var pubList = gl_load_route.PUB_LIST.PUB_INFO;
// 		var filterPubList = new Array();
// 		if (pubList.length > 0) {
// 			if (weatherCode == "sun") {
// 				filterPubList = pubList.filter((e) => e.PUB_FLOOR.b_code == $this.b_code && e.PUB_FLOOR.text == $this.floor && e.PUB_CODE == "P06");
// 			} else {
// 				filterPubList = pubList.filter((e) => e.PUB_FLOOR.b_code == $this.b_code && e.PUB_FLOOR.text == $this.floor && e.PUB_CODE == "P01");
// 			}

// 			$.each(filterPubList, function () {
// 				var obj = { x: this.PUB_FLOOR.pos_x, y: this.PUB_FLOOR.pos_y };
// 				pubXYList.push(obj);
// 			});
// 			pubXYList = pubXYList.filter(function (value, index, array) {
// 				return array.findIndex((item) => item.x === value.x && item.y === value.y) === index;
// 			});

// 			var distance = new Array();
// 			$.each(pubXYList, function () {
// 				distance.push(getDistance(startXY.x, this.x * mapRateX, startXY.y, this.y * mapRateY));
// 			});

// 			var min = distance[0];
// 			var minPos = 0;
// 			$.each(distance, function (idx) {
// 				if (min > distance[idx]) {
// 					min = distance[idx];
// 					minPos = idx;
// 				}
// 			});

// 			endXY = { x: pubXYList[minPos].x * mapRateX, y: pubXYList[minPos].y * mapRateY };
// 		}

// 		startXY = findNearNodeStroke(mapCtx, startXY, mapRate, buildingCode, floorCode);
// 		endXY = findNearNodeStroke(mapCtx, endXY, mapRate, buildingCode, floorCode);

// 		var nodeList = gl_load_route.NODE_LIST.NODE_INFO;
// 		// 해당 건물, 층에 해당하는 노드 리스트
// 		nodeList = nodeList.filter((e) => e.b_code == buildingCode && e.floor == floorCode);

// 		// findFastWay(mapCtx, startXY, endXY, nodeList, mapRateX, mapRateY, true);
// 		if (pubXYList[minPos].x == endXY.x && pubXYList[minPos].y == endXY.y) {
// 			return;
// 		} else {
// 			findFastWay(mapCtx, startXY, endXY, nodeList, mapRateX, mapRateY, true);
// 			floorSwiper.slideTo(idx + 1, 0, false);
// 		}
// 	} else if (idx == 1) {
// 		if (weatherCode == "sun") {
// 			var shapeList = gl_load_route.SHAPE_LIST.SHAPE_INFO;
// 			var startBuildingobj = gl_json_building_floor_data.filter((e) => e.code == gl_kiosk.KIOSK_BUILDING)[0];

// 			if (shapeList.length > 0) {
// 				var startShapeObj = shapeList.filter((e) => e.SHAPE_TEXT.text == startBuildingobj.name)[0];
// 				var endShapeObj = shapeList.filter((e) => e.SHAPE_TEXT.text == storeObj.BUILDING_NAME)[0];
// 			}
// 			startXY = { x: startShapeObj.SHAPE_FLOOR.pos_x * mapRateX, y: startShapeObj.SHAPE_FLOOR.pos_y * mapRateY };
// 			endXY = { x: endShapeObj.SHAPE_FLOOR.pos_x * mapRateX, y: endShapeObj.SHAPE_FLOOR.pos_y * mapRateY };
// 		} else {
// 			var pubList = gl_load_route.PUB_LIST.PUB_INFO;

// 			var startBuildingObj = gl_json_building_floor_data.filter((e) => e.code == gl_kiosk.KIOSK_BUILDING)[0];
// 			var endBuildingObj = gl_json_building_floor_data.filter((e) => e.code == currentBuildingCode)[0];

// 			var filterPubList = new Array();
// 			if (pubList.length > 0) {
// 				filterPubList = pubList.filter((e) => e.PUB_FLOOR.b_code == this.b_code && e.area.includes(startBuildingObj.code) && e.PUB_CODE == "P01");
// 				$.each(filterPubList, function () {
// 					var obj = { x: this.PUB_FLOOR.pos_x, y: this.PUB_FLOOR.pos_y };
// 					pubXYList.push(obj);
// 				});
// 				startXY = { x: pubXYList[0].x * mapRateX, y: pubXYList[0].y * mapRateY };

// 				filterPubList = new Array();
// 				filterPubList = pubList.filter((e) => e.PUB_FLOOR.b_code == this.b_code && e.area.includes(endBuildingObj.code) && e.PUB_CODE == "P01");
// 				pubXYList = new Array();
// 				$.each(filterPubList, function () {
// 					var obj = { x: this.PUB_FLOOR.pos_x, y: this.PUB_FLOOR.pos_y };
// 					pubXYList.push(obj);
// 				});
// 				endXY = { x: pubXYList[0].x * mapRateX, y: pubXYList[0].y * mapRateY };
// 			}
// 		}

// 		startXY = findNearNodeStroke(mapCtx, startXY, mapRate, buildingCode, floorCode);
// 		endXY = findNearNodeStroke(mapCtx, endXY, mapRate, buildingCode, floorCode);

// 		var nodeList = gl_load_route.NODE_LIST.NODE_INFO;
// 		// 해당 건물, 층에 해당하는 노드 리스트
// 		nodeList = nodeList.filter((e) => e.b_code == buildingCode);

// 		findFastWay(mapCtx, startXY, endXY, nodeList, mapRateX, mapRateY, true);
// 		floorSwiper.slideTo(idx + 1, 0, false);
// 	} else if (idx == 2) {
// 		if (weatherCode == "rain") {
// 			return;
// 		}

// 		var pubList = gl_load_route.PUB_LIST.PUB_INFO;
// 		var filterPubList = new Array();
// 		var pubXYList = new Array();
// 		var min;
// 		var minPos = 0;
// 		if (pubList.length > 0) {
// 			// 출입구를 찾는다.
// 			filterPubList = pubList.filter((e) => e.PUB_FLOOR.b_code == $this.b_code && e.PUB_FLOOR.text == $this.floor && e.PUB_CODE == "P06");
// 			$.each(filterPubList, function () {
// 				var obj = { x: this.PUB_FLOOR.pos_x, y: this.PUB_FLOOR.pos_y };
// 				pubXYList.push(obj);
// 			});

// 			if (pubXYList.length == 1) {
// 				startXY = { x: pubXYList[0].x * mapRateX, y: pubXYList[0].y * mapRateY };
// 			} else {
// 				pubXYList = pubXYList.filter(function (value, index, array) {
// 					return array.findIndex((item) => item.x === value.x && item.y === value.y) === index;
// 				});

// 				distance = new Array();
// 				$.each(pubXYList, function () {
// 					distance.push(getDistance(startXY.x, this.x * mapRateX, startXY.y, this.y * mapRateY));
// 				});

// 				min = distance[0];
// 				minPos = 0;
// 				$.each(distance, function (idx) {
// 					if (min > distance[idx]) {
// 						min = distance[idx];
// 						minPos = idx;
// 					}
// 				});
// 				startXY = { x: pubXYList[minPos].x * mapRateX, y: pubXYList[minPos].y * mapRateY };
// 			}

// 			// 엘리베이터를 찾는다
// 			filterPubList = new Array();
// 			filterPubList = pubList.filter((e) => e.PUB_FLOOR.b_code == this.b_code && e.PUB_FLOOR.text == this.floor && e.PUB_CODE == "P01");
// 			var pubXYList = new Array();
// 			$.each(filterPubList, function () {
// 				var obj = { x: this.PUB_FLOOR.pos_x, y: this.PUB_FLOOR.pos_y };
// 				pubXYList.push(obj);
// 			});
// 			if (pubXYList.length == 1) {
// 				endXY = { x: pubXYList[0].x * mapRateX, y: pubXYList[0].y * mapRateY };

// 				mapCtx.beginPath();
// 				mapCtx.fillStyle = "blue";
// 				mapCtx.moveTo(endXY.x, endXY.y);
// 				mapCtx.arc(endXY.x, endXY.y, 10, 0, 2 * Math.PI);
// 				mapCtx.fill();
// 				mapCtx.closePath();
// 			} else {
// 				pubXYList = pubXYList.filter(function (value, index, array) {
// 					return array.findIndex((item) => item.x === value.x && item.y === value.y) === index;
// 				});

// 				distance = new Array();
// 				$.each(pubXYList, function () {
// 					distance.push(getDistance(startXY.x, this.x * mapRateX, startXY.y, this.y * mapRateY));
// 				});

// 				min = distance[0];
// 				minPos = 0;
// 				$.each(distance, function (idx) {
// 					if (min > distance[idx]) {
// 						min = distance[idx];
// 						minPos = idx;
// 					}
// 				});
// 				endXY = { x: pubXYList[minPos].x * mapRateX, y: pubXYList[minPos].y * mapRateY };
// 			}
// 		}

// 		startXY = findNearNodeStroke(mapCtx, startXY, mapRate, buildingCode, floorCode);
// 		endXY = findNearNodeStroke(mapCtx, endXY, mapRate, buildingCode, floorCode);

// 		var nodeList = gl_load_route.NODE_LIST.NODE_INFO;
// 		// 해당 건물, 층에 해당하는 노드 리스트
// 		nodeList = nodeList.filter((e) => e.b_code == buildingCode && e.floor == floorCode);

// 		/*$.each(nodeList, function () {
// 									mapCtx.beginPath();
// 									mapCtx.strokeStyle = 'blue';
// 									mapCtx.strokeWidth = 1;
// 									mapCtx.moveTo($this.x1 * mapRateX, $this.y1 * mapRateY);
// 									mapCtx.lineTo($this.x2 * mapRateX, $this.y2 * mapRateY);
// 									mapCtx.stroke();
// 									mapCtx.closePath();
// 							});*/

// 		// findFastWay(mapCtx, startXY, endXY, nodeList, mapRateX, mapRateY, true);
// 		if (startXY.x == endXY.x && startXY.y == endXY.y) {
// 			return;
// 		} else {
// 			findFastWay(mapCtx, startXY, endXY, nodeList, mapRateX, mapRateY, true);
// 			floorSwiper.slideTo(idx + 1, 0, false);
// 		}
// 	} else if (idx == 3) {
// 		var pubList = gl_load_route.PUB_LIST.PUB_INFO;
// 		if (pubList.length > 0) {
// 			var filterPubList = pubList.filter((e) => e.PUB_FLOOR.b_code == $this.b_code && e.PUB_FLOOR.text == $this.floor && e.PUB_CODE == "P01");

// 			$.each(filterPubList, function () {
// 				var obj = { x: this.PUB_FLOOR.pos_x, y: this.PUB_FLOOR.pos_y };
// 				pubXYList.push(obj);
// 			});
// 			pubXYList = pubXYList.filter(function (value, index, array) {
// 				return array.findIndex((item) => item.x === value.x && item.y === value.y) === index;
// 			});

// 			var distance = new Array();
// 			$.each(pubXYList, function () {
// 				distance.push(getDistance(startXY.x, this.x * mapRateX, startXY.y, this.y * mapRateY));
// 			});

// 			var min = distance[0];
// 			var minPos = 0;
// 			$.each(distance, function (idx) {
// 				if (min > distance[idx]) {
// 					min = distance[idx];
// 					minPos = idx;
// 				}
// 			});

// 			startXY = { x: pubXYList[minPos].x * mapRateX, y: pubXYList[minPos].y * mapRateY };
// 		}

// 		startXY = findNearNodeStroke(mapCtx, startXY, mapRate, buildingCode, floorCode);

// 		var endXY = { x: destinationStore.STORE_FLOOR.pos_x * mapRateX, y: destinationStore.STORE_FLOOR.pos_y * mapRateY };
// 		endXY = findNearNodeStroke(mapCtx, endXY, mapRate, buildingCode, floorCode);

// 		var nodeList = gl_load_route.NODE_LIST.NODE_INFO;
// 		// 해당 건물, 층에 해당하는 노드 리스트
// 		nodeList = nodeList.filter((e) => e.b_code == buildingCode && e.floor == floorCode);

// 		if (startXY.x == endXY.x && startXY.y == endXY.y) {
// 			return;
// 		} else {
// 			findFastWay(mapCtx, startXY, endXY, nodeList, mapRateX, mapRateY, true);
// 		}
// 	}
// }s
