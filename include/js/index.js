var gl_arr_mnu_main_code = new Array("platform", "floor", "store", "event", "facility", "wayfind");
var m_now_page_num = -1;
var gl_arr_mnu_statics_code = new Array("FLA", "FLO", "STO", "EVT", "FAC", "WAY");

var gl_arr_lang_code = new Array("KOR", "ENG", "CHN", "JPN");

var gl_main_conf = {
	lang: "KOR",
	name: "index",
	debug_cnt: 0,
	is_load: 0,
	time_last: 0,
	system_last: 0,
	curr_cnt: 0,
	curr_screen: 1,
	screen_ptime: 0,
	screen_last: 0,
	way_type: "",
	pop_store_id: "",
	pop_target_floor: "",
	pop_target_x: "",
	pop_target_y: "",
	pop_pub_code: "",
	pop_platform_code: "",
	pop_park_id: "",
	pop_waiting_id: "",
	waiting_code: "",
	waiting_cust: "",
};

var gl_jsop_lang_data = new Object();
var gl_load_data = new Object();
var gl_load_route = new Object();

var gl_arr_screen_list = new Array();
var setTimeoutID = null;

var gl_conf_time = new Object();

//setTimeout(setInitSetting,500);

// 최초 언어 세팅
function setInitSettingLang(p_load_data) {
	gl_jsop_lang_data = p_load_data;
	setLoadDataContents();

	$("#id_main_init_loading .progress_bar").css({
		width: "10%",
	});
}

// 최초 세팅
function setInitSetting(p_result) {
	if (p_result != "SUCC") {
		return;
	}

	gl_load_data = gl_xml_conf.xml_data;
	gl_load_route = gl_xml_conf.xml_route;
	gl_conf_time = gl_load_data.time_obj;

	$(".footer_bar .lang_area .lang_btn .lang_txt").mousedown(function () {
		onClickLangBtn(this);
	});

	$(".bottom_menu .bottom_btn_li .bottom_btn").mousedown(function () {
		onClickBottomMnu(this);
	});

	$(".intro_menu li").mousedown(function () {
		onClickBottomMnu(this);
	});

	for (i = 0; i < gl_arr_mnu_main_code.length; i += 1) {
		//$("#id_main_frame_"+gl_arr_mnu_main_code[i]).fadeOut();
	}

	// 한글 세팅을 하자.
	var str_eng_reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

	for (i = 0; i < gl_load_data.arr_store_list.length; i++) {
		obj = gl_load_data.arr_store_list[i];
		var remove_kor = getCvtRemoveWhite(obj.STORE_NAME_KOR);
		var arr_dis = Hangul.disassemble(remove_kor, true);

		if (Array.isArray(arr_dis) == true) {
			var cho = arr_dis.reduce(function (prev, elem) {
				elem = elem[0] ? elem[0] : elem;
				return prev + elem;
			}, "");
			/*
            cho = cho.replace(/ㄲ/gi,"ㄱ");
            cho = cho.replace(/ㅉ/gi,"ㅈ");
            cho = cho.replace(/ㅃ/gi,"ㅂ");
            cho = cho.replace(/ㄸ/gi,"ㄷ");
            cho = cho.replace(/ㅆ/gi,"ㅅ");
            */
			cho = cho.toLowerCase();
			cho = cho.replace(str_eng_reg, "");

			obj.STORE_NAME_CHO = cho;

			str_tmp = obj.STORE_NAME_ENG + "";
			str_tmp = str_tmp.toLowerCase();

			str_tmp = str_tmp.replace(str_eng_reg, "");
			str_tmp = str_tmp.replace(/ /gi, "");
			str_tmp = str_tmp.replace(/\r/gi, "");
			str_tmp = str_tmp.replace(/\n/gi, "");
			str_tmp = str_tmp.replace(/\t/gi, "");

			obj.STORE_SEARCH_ENG = str_tmp;
		}
	}

	setTimeout(setInitSettingEnd, 500);
}

function setInitSettingEnd() {
	setCallWebToApp("STATUS", "STATUS");

	$("#id_main_init_loading .progress_bar").css({
		width: "40%",
	});

	if (typeof document["frame_intro"].PAGEACTIVEYN != "undefined") {
		document["frame_intro"].setInitConfigLang(gl_jsop_lang_data);
		document["frame_intro"].setInitConfig(gl_load_data);
	}

	if (typeof document["frame_platform"].PAGEACTIVEYN != "undefined") {
		document["frame_platform"].setInitConfigLang(gl_jsop_lang_data);
		document["frame_platform"].setInitConfig(gl_load_data);
	}

	if (typeof document["frame_store"].PAGEACTIVEYN != "undefined") {
		document["frame_store"].setInitConfigLang(gl_jsop_lang_data);
		document["frame_store"].setInitConfig(gl_load_data);
	}

	if (typeof document["frame_wayfind"].PAGEACTIVEYN != "undefined") {
		document["frame_wayfind"].setInitConfigLang(gl_jsop_lang_data);
		document["frame_wayfind"].setInitConfig(gl_load_data);
	}

	if (typeof document["frame_event"].PAGEACTIVEYN != "undefined") {
		document["frame_event"].setInitConfigLang(gl_jsop_lang_data);
		document["frame_event"].setInitConfig(gl_load_data);
	}

	if (typeof document["frame_facility"].PAGEACTIVEYN != "undefined") {
		document["frame_facility"].setInitConfigLang(gl_jsop_lang_data);
		document["frame_facility"].setInitConfig(gl_load_data, gl_load_route);
	}

	document["frame_intro"].setMainStop();
	document["frame_intro"].setMainStart();

	setTimeout(setInitSettingEnd02, 500);
}

function setInitSettingEnd02() {
	if (typeof document["frame_floor"].PAGEACTIVEYN != "undefined") {
		document["frame_floor"].setInitConfigLang(gl_jsop_lang_data);
		document["frame_floor"].setInitConfig(gl_load_data);
	}
	setTimeout(setInitSettingEnd03, 500);
}

function setInitSettingEnd03() {
	var i_load_err = 0;

	$("#id_main_init_loading .progress_bar").css({
		width: "70%",
	});

	var str_iframe = $("iframe").contents();

	$("html").mousedown(function (evt) {
		gl_main_conf.time_last = new Date().getTime();
	});
	$("html").bind("touchstart", function (e) {
		gl_main_conf.time_last = new Date().getTime();
	});
	//IFRAME 클릭 감지
	$(str_iframe).mousedown(function (evt) {
		gl_main_conf.time_last = new Date().getTime();
	});
	$(str_iframe).bind("touchstart", function (e) {
		gl_main_conf.time_last = new Date().getTime();
	});

	if (typeof document["frame_intro"].PAGEACTIVEYN == "undefined") {
		i_load_err++;
	}

	if (typeof document["frame_store"].PAGEACTIVEYN == "undefined") {
		i_load_err++;
	}

	if (typeof document["frame_wayfind"].PAGEACTIVEYN == "undefined") {
		i_load_err++;
	}

	if (typeof document["frame_event"].PAGEACTIVEYN == "undefined") {
		i_load_err++;
	}

	if (typeof document["frame_facility"].PAGEACTIVEYN == "undefined") {
		i_load_err++;
	}

	if (typeof document["frame_floor"].PAGEACTIVEYN == "undefined") {
		i_load_err++;
	}

	//return;
}

function setInitSettingEnd04() {
	var i = 0;
	var str_sday = "";
	var str_eday = "";
	var str_date = "";

	var i_sday = 0,
		i_eday = 0,
		i_date = 0;

	var date = new Date();

	var str_days = date.getFullYear() + "";
	if (date.getMonth() + 1 < 10) {
		str_days += "0" + (date.getMonth() + 1) + "";
	} else {
		str_days += "" + (date.getMonth() + 1) + "";
	}
	if (date.getDate() < 10) {
		str_days += "0" + date.getDate();
	} else {
		str_days += "" + date.getDate();
	}

	i_date = parseInt(str_days);

	var screen_list = gl_load_data.arr_screen_list;

	for (i = 0; i < screen_list.length; i++) {
		str_sday = screen_list[i].SDAY + "";
		str_eday = screen_list[i].EDAY + "";
		i_sday = parseInt(str_sday);
		i_eday = parseInt(str_eday);

		if (i_sday <= i_date && i_eday >= i_date) {
			gl_arr_screen_list.push(screen_list[i]);
		}
	}
	gl_main_conf.is_load = 1;

	$("#id_main_init_loading .progress_bar").css({
		width: "100%",
	});
	var time_curr = new Date().getTime();
	gl_main_conf.time_last = time_curr;
	gl_main_conf.system_last = time_curr;
	setCallWebToApp("STATUS", "STATUS");
	setMainLang("INIT", "KOR");
	setInitFsCommand();
	setInterval(setMainInterval, 1000);
	setTimeout(setInitSettingEndDone, 300);
}

function setInitSettingEndDone() {
	$("#id_main_init_loading").remove();

	setMainTimeOut();
}

function setMainTimeOut() {
	if ($("#id_main_screen").css("display") == "none") {
		return;
	} else {
		setNoticeDrawInfo();
	}
}

function setNoticeDrawInfo() {
	var str_type = "";
	var str_show = "",
		str_hide = "";

	if (gl_arr_screen_list.length == 0) return;

	gl_main_conf.curr_cnt++;
	if (gl_main_conf.curr_cnt >= gl_arr_screen_list.length) gl_main_conf.curr_cnt = 0;

	var obj = gl_arr_screen_list[gl_main_conf.curr_cnt];

	if (gl_main_conf.curr_notice == 1) {
		gl_main_conf.curr_notice = 2;

		str_show = "id_notice_box_02";
		str_hide = "id_notice_box_01";

		$("#id_notice_box_01").css("zIndex", 10);
		$("#id_notice_box_02").css("zIndex", 9);
	} else {
		gl_main_conf.curr_notice = 1;

		str_show = "id_notice_box_01";
		str_hide = "id_notice_box_02";

		$("#id_notice_box_01").css("zIndex", 10);
		$("#id_notice_box_02").css("zIndex", 9);
	}

	// if (obj.TYPE == "IMG") {
	//     $("#" + str_show + " > img").attr("src", obj.FILE_URL);
	//     $("#" + str_show + " > video").hide();
	//     $("#" + str_show).children("video")[0].pause();
	//     $("#" + str_show + " > img").show();
	// } else {
	//     $("#" + str_show + " > video").attr("src", obj.FILE_URL);
	//     $("#" + str_show + " > video").show();
	//     $("#" + str_show + " > img").hide();
	//     $("#" + str_show).children("video")[0].play();
	// }

	gl_main_conf.notice_ptime = obj.PTIME;
	if (gl_main_conf.notice_ptime < 5) gl_main_conf.notice_ptime = 5;

	gl_main_conf.notice_ptime = gl_main_conf.notice_ptime * 1000;

	setTimeoutID = setTimeout(setMainTimeOut, gl_main_conf.notice_ptime);
	setTimeout(setNoticeDrawInfoEnd, 500);
}

function setNoticeDrawInfoEnd() {
	if (gl_arr_screen_list.length == 1) {
		if (gl_main_conf.curr_notice == 1) {
			$("#id_notice_box_01").show();
			$("#id_notice_box_02").hide();
		} else {
			$("#id_notice_box_01").hide();
			$("#id_notice_box_02").show();
		}
	} else {
		if (gl_main_conf.curr_notice == 1) {
			$("#id_notice_box_01").fadeIn();
			$("#id_notice_box_02").fadeOut();
		} else {
			$("#id_notice_box_01").fadeOut();
			$("#id_notice_box_02").fadeIn();
		}
	}
}

function setMainLang(p_type, p_lang) {
	var i = 0;
	var str_code = "";

	if (p_type != "INIT") {
		if (gl_main_conf.lang == p_lang) return;
	}

	gl_main_conf.lang = p_lang;

	//다국어 추가 부분
	var str_attr = "";
	var str_lang = gl_main_conf.lang.toLowerCase();

	$(".lang_code_names").each(function (i) {
		str_attr = $(".lang_code_names").eq(i).attr("lang_code");
		try {
			$(this).html(gl_jsop_lang_data[gl_main_conf.name][str_attr][str_lang]);
		} catch (err) {}
	});

	$(".bottom_btn_text").each(function (i) {
		if (p_lang == "KOR") {
			$(".bottom_btn_text").css({ "font-size": "2.5rem" });
		} else {
			$(".bottom_btn_text").css({ "font-size": "20px" });
		}
	});

	try {
		if (typeof document["frame_intro"].PAGEACTIVEYN != "undefined") {
			document["frame_intro"].setMainLang(p_type, p_lang);
		}
		if (typeof document["frame_floor"].PAGEACTIVEYN != "undefined") {
			document["frame_floor"].setMainLang(p_type, p_lang);
		}
		if (typeof document["frame_store"].PAGEACTIVEYN != "undefined") {
			document["frame_store"].setMainLang(p_type, p_lang);
		}
		if (typeof document["frame_wayfind"].PAGEACTIVEYN != "undefined") {
			document["frame_wayfind"].setMainLang(p_type, p_lang);
		}
		if (typeof document["frame_event"].PAGEACTIVEYN != "undefined") {
			document["frame_event"].setMainLang(p_type, p_lang);
		}
		if (typeof document["frame_facility"].PAGEACTIVEYN != "undefined") {
			document["frame_facility"].setMainLang(p_type, p_lang);
		}
	} catch (err) {
		console.log("ERROR ERROR MAIN LANG");
	}

	$("#id_line1").html(gl_conf_time["FOOTER_LINE1_" + p_lang]);
	$("#id_line2").html(gl_conf_time["FOOTER_LINE2_" + p_lang]);
	$("#id_line3").html(gl_conf_time["FOOTER_LINE3_" + p_lang]);
}

///////////////////////////////////////////////
// 화면전환
/*function setMainViewOpen(p_mnu, p_obj) {
    var str_code = p_mnu;
    var t_num = gl_arr_mnu_main_code.indexOf(str_code);
    if (str_code == "home") {
        $(".bottom_menu .bottom_btn_li .bottom_btn").removeClass("active");
        console.log('gl_arr_mnu_main_code', gl_arr_mnu_main_code);
        for (i = 0; i < gl_arr_mnu_main_code.length; i += 1) {
            $("#id_main_frame_" + gl_arr_mnu_main_code[i]).hide();
        }
        $("#id_main_frame_intro").fadeIn();

        console.log(document["frame_intro"]);
        if (typeof (document["frame_intro"].setMainStart) == 'function') {
            document["frame_intro"].setMainStart(p_obj);
            str_statics = "HOM";
            var statics_obj = {"sect":"MENU","code":str_statics}
            setStatisSend(statics_obj);
        }
        m_now_page_num = -1;
    } else if(str_code == ""){
        $(".bottom_menu .bottom_btn_li .bottom_btn").removeClass("active");
        for (i = 0; i < gl_arr_mnu_main_code.length; i += 1) {
            $("#id_main_frame_" + gl_arr_mnu_main_code[i]).hide();
        }
    } else {
        $(".bottom_menu .bottom_btn_li .bottom_btn").removeClass("active");
        $($(".bottom_menu .bottom_btn_li .bottom_btn")[t_num]).addClass("active");
        if ($("#id_main_frame_intro").css("display") != "none") {
            $("#id_main_frame_intro").fadeOut();
            if (typeof (document["frame_intro"].setMainStop) == 'function') {
                document["frame_intro"].setMainStop();
                str_statics = gl_arr_mnu_statics_code[i];
                var statics_obj = {"sect":"MENU","code":str_statics}
                setStatisSend(statics_obj);
            }
        }
        for (i = 0; i < gl_arr_mnu_main_code.length; i += 1) {
            if (i == t_num) {
                //if(m_now_page_num != t_num)
                //{
                if (typeof (document["frame_" + str_code].setMainStart) == 'function') {
                    document["frame_" + str_code].setMainStart(p_obj);
                    str_statics = gl_arr_mnu_statics_code[i];                    
                    var statics_obj = {"sect":"MENU","code":str_statics}
                    if(p_obj.sect==undefined || p_obj.sect=="MENU"){
                        setStatisSend(statics_obj);
                    }
                }

                $("#id_main_frame_" + str_code).fadeIn();
                m_now_page_num = t_num;
                //}
            } else {
                if(str_code==""){

                }
                else{
                    if (typeof (document["frame_" + str_code].setMainStop) == 'function') {
                        document["frame_" + str_code].setMainStop();
                    }   
                }
                $("#id_main_frame_" + gl_arr_mnu_main_code[i]).hide();
            }
        }
    }
}*/

function setScreenAuto() {
	$("#id_popup_error").hide();
	$("#id_page_block_white").hide();
	$("#id_pop_error").hide();
	$("#id_popup_store").hide();
	$("#id_popup_fnb").hide();
	$("#id_popup_fac").hide();
	$("#id_popup_waytype").hide();
	$("#id_popup_waiting").hide();

	if ($("#id_main_screen").css("display") == "none") {
		setTimeoutID = setTimeout(setMainTimeOut, gl_main_conf.notice_ptime);
		$("#id_main_screen").fadeIn();
		if (typeof document["frame_intro"].setMainStop == "function") {
			document["frame_intro"].setMainStop();
		}
		setMainViewOpen("intro", obj);
	}
	setMainLang("INIT", "KOR");
}

///////////////////////////////////////////////
// CLICK EVENT

function onClickScreenSaver() {
	if ($("#id_main_screen").css("display") == "none") {
		return;
	}

	try {
		$("#id_screen_area_01").children("video")[0].pause();
	} catch (err) {}
	try {
		$("#id_screen_area_02").children("video")[0].pause();
	} catch (err) {}

	$("#id_popup_error").hide();
	$("#id_page_block_white").hide();
	$("#id_pop_error").hide();
	$("#id_popup_store").hide();
	$("#id_popup_fnb").hide();
	$("#id_popup_fac").hide();
	$("#id_popup_waytype").hide();
	$("#id_popup_waiting").hide();

	$("#id_main_screen").fadeOut();

	var obj = {};
	if (typeof document["frame_intro"].setMainStart == "function") {
		document["frame_intro"].setMainStart(obj);
	}

	$("#id_main_frame_intro").show();
	//setMainViewOpen("",obj);

	clearTimeout(setTimeoutID);
}

function onClickLangBtn(p_obj) {
	var str_code = $(p_obj).attr("code");
	for (i = 0; i < 4; i += 1) {
		if ($($(".lang_area .lang_btn .lang_txt")[i]).attr("code") != str_code) {
			$($(".lang_area .lang_btn .lang_txt")[i]).removeClass("active");
		} else {
			$($(".lang_area .lang_btn .lang_txt")[i]).addClass("active");
		}
	}
	setMainLang("CLICK", str_code);
}

function onClickBottomMnu(p_obj) {
	var str_code = $(p_obj).attr("code");
	var obj = {};
	// setMainViewOpen(str_code, obj);
}

// 메인인터벌
function setMainInterval() {
	var time_gap = 0;
	var time_curr = new Date().getTime();

	gl_main_conf.debug_count = 0;

	time_gap = time_curr - gl_main_conf.time_last;
	time_gap = Math.floor(time_gap / 1000);

	// 인트로 체크
	if (time_gap > 60) {
		gl_main_conf.time_last = time_curr;
		setScreenAuto();
	}

	// 시스템 체크
	time_gap = time_curr - gl_main_conf.system_last;
	time_gap = Math.floor(time_gap / 1000);
	if (time_gap > 60) {
		gl_main_conf.system_last = time_curr;
		if (gl_main_conf.is_load == 1) {
			setCallWebToApp("STATUS", "STATUS");
		}
	}
}

/////////////////////////////////////////////////
// IFRAME과 통신
/////////////////////////////////////////////////

function setParentCmd(p_obj) {
	var str_html = "";

	if (p_obj.sect == "POPUP") {
		if (p_obj.type == "PLATFORM_INFO") {
			setMakeInfoPopUpPlatform(p_obj);
		} else if (p_obj.type == "STORE_INFO") {
			setMakeInfoPopUpStore(p_obj);
		} else if (p_obj.type == "FACILITY_INFO") {
			setMakeInfoPopUpFacility(p_obj);
		} else if (p_obj.type == "EVENT_INFO") {
			setMakeInfoPopUpEvent(p_obj);
		} else if (p_obj.type == "WAITING") {
			setMakeInfoPopUpWaiting(p_obj);
		} else if (p_obj.type == "STORE_WAYTYPE") {
			gl_main_conf.way_type = "STORE";
			gl_main_conf.pop_store_id = p_obj.id + "";
			gl_main_conf.pop_target_floor = getChkNull(p_obj.target_floor, "");
			gl_main_conf.pop_target_x = getChkNull(p_obj.target_x, "");
			gl_main_conf.pop_target_y = getChkNull(p_obj.target_y, "");

			$("#id_popup_waytype").fadeIn(200);
		} else if (p_obj.type == "PARK_WAYTYPE") {
			gl_main_conf.way_type = "PARK";
			gl_main_conf.pop_store_id = p_obj.id + "";
			gl_main_conf.pop_target_floor = getChkNull(p_obj.target_floor, "");
			gl_main_conf.pop_target_x = getChkNull(p_obj.target_x, "");
			gl_main_conf.pop_target_y = getChkNull(p_obj.target_y, "");

			$("#id_popup_waytype").fadeIn(200);
		} else if (p_obj.type == "ERROR") {
			setMakeInfoPopUpError(p_obj);
		}
	} else if (p_obj.sect == "FLOOR") {
		if (p_obj.type == "DONE") {
			// 지도 로딩 끝
			setTimeout(setInitSettingEnd04, 1000);
		}
	} else if (p_obj.sect == "WAYFIND" || p_obj.sect == "LOCATION") {
		var way_obj = {
			sect: p_obj.sect,
			type: p_obj.type,
			id: p_obj.id,
			code: getChkNull(p_obj.code, ""),
			move_type: getChkNull(p_obj.move_type, ""),
			target_floor: getChkNull(p_obj.target_floor, ""),
			target_x: getChkNull(p_obj.target_x, ""),
			target_y: getChkNull(p_obj.target_y, ""),
		};
		setMainViewOpen("floor", way_obj);
	} else if (p_obj.sect == "STATICS") {
		setStatisSend(p_obj.obj);
	} else if (p_obj.sect == "HIDE") {
		str_html = p_obj.type;
		str_html = str_html.toLowerCase();
		$("#id_main_frame_" + str_html).hide();
	} else if (p_obj.sect == "MENU") {
		setMainViewOpen(p_obj.code, p_obj);
	}
}

function onClickPopupClose(p_type) {
	if (p_type == "STORE") {
		//$("#id_popup_store").fadeOut();
		//$("#id_popup_fnb").fadeOut();
		$("#id_popup_store").hide();
		$("#id_popup_fnb").hide();
	} else if (p_type == "WAYTYPE") {
		qrcode.clear();
		// $("#id_popup_waytype").fadeOut();
		$("#id_popup_waytype").hide();
	} else if (p_type == "FACILITY") {
		$("#id_popup_fac").fadeOut();
	} else if (p_type == "PLATFORM") {
		$("#id_popup_platform").fadeOut();
	} else if (p_type == "EVENT") {
		$("#id_popup_event").fadeOut();
	} else if (p_type == "ERROR") {
		$("#id_popup_error").fadeOut();
	}
}

/////////////////////////////////////////////////////
// WAYFIND

function onClickPopupWayType(p_type) {
	if (gl_main_conf.way_type == "STORE") {
		var way_obj = {
			sect: "WAYFIND",
			type: "STORE",
			id: gl_main_conf.pop_store_id,
			move_type: p_type,
			target_floor: gl_main_conf.pop_target_floor,
			target_x: gl_main_conf.pop_target_x,
			target_y: gl_main_conf.pop_target_y,
		};
		setMainViewOpen("floor", way_obj);
	} else if (gl_main_conf.way_type == "PARK") {
		var way_obj = {
			sect: "WAYFIND",
			type: "PARK",
			id: gl_main_conf.pop_store_id,
			move_type: p_type,
			target_floor: gl_main_conf.pop_target_floor,
			target_x: gl_main_conf.pop_target_x,
			target_y: gl_main_conf.pop_target_y,
		};
		setMainViewOpen("floor", way_obj);
	}
	onClickPopupClose("WAYTYPE");
}

// 길안내
function onClickPopUpWayFind(p_sect, p_type) {
	var way_obj = {
		sect: p_sect,
		type: p_type,
		id: "",
		move_type: "",
		floor: "",
	};
	if (p_type == "STORE") {
		way_obj.id = gl_main_conf.pop_store_id;
		onClickPopupClose("STORE");
	} else if (p_type == "FACILITY") {
		way_obj.id = gl_main_conf.pop_pub_code;
		onClickPopupClose("FACILITY");
	}

	setMainViewOpen("floor", way_obj);
}

///////////////////////////////////////////////
//  POPUP

function setMakeInfoPopUpPlatform(p_obj) {
	gl_main_conf.pop_platform_code = p_obj.code;
	$("#popup_platform").text(p_obj.title);
	$("#id_pop_platform_desc > p").text(p_obj.description);
	$("#id_pop_platform_category > img").attr("arc", p_obj.img1);

	var statics_obj = {
		sect: "POPUP",
		code: p_obj.code,
	};
	setStatisSend(statics_obj);

	$("#id_popup_platform").fadeIn(200);
}
function setMakeInfoPopUpStore(p_obj) {
	var i = 0,
		j = 0,
		i_found = 0;
	var i_cnt = 0;
	var obj;
	var str_img = "",
		str_menu_0 = "",
		str_menu_1 = "",
		str_menu_name_0 = "",
		str_menu_name_1 = "",
		str_name = "",
		str_desc = "";
	gl_main_conf.pop_store_id = "";

	for (i = 0; i < gl_load_data.arr_store_list.length && i < 3000; i++) {
		obj = gl_load_data.arr_store_list[i];
		if (p_obj.id == obj.ID) {
			if (obj.CLICK_TYPE == "N") {
				return;
			}

			str_img = "";

			if (gl_main_conf.lang == "KOR") str_name = obj.STORE_NAME_KOR;
			if (gl_main_conf.lang == "ENG") str_name = obj.STORE_NAME_ENG;
			if (gl_main_conf.lang == "CHN") str_name = obj.STORE_NAME_CHN;
			if (gl_main_conf.lang == "JPN") str_name = obj.STORE_NAME_JPN;

			if (gl_main_conf.lang == "KOR") str_desc = obj.STORE_DESC_KOR;
			if (gl_main_conf.lang == "ENG") str_desc = obj.STORE_DESC_ENG;
			if (gl_main_conf.lang == "CHN") str_desc = obj.STORE_DESC_CHN;
			if (gl_main_conf.lang == "JPN") str_desc = obj.STORE_DESC_JPNG;

			if (gl_main_conf.lang == "KOR") str_menu_name_0 = obj.STORE_MENU_01_NAME_KOR;
			if (gl_main_conf.lang == "ENG") str_menu_name_0 = obj.STORE_MENU_01_NAME_ENG;
			if (gl_main_conf.lang == "CHN") str_menu_name_0 = obj.STORE_MENU_01_NAME_CHN;
			if (gl_main_conf.lang == "JPN") str_menu_name_0 = obj.STORE_MENU_01_NAME_JPN;

			if (gl_main_conf.lang == "KOR") str_menu_name_1 = obj.STORE_MENU_02_NAME_KOR;
			if (gl_main_conf.lang == "ENG") str_menu_name_1 = obj.STORE_MENU_02_NAME_ENG;
			if (gl_main_conf.lang == "CHN") str_menu_name_1 = obj.STORE_MENU_02_NAME_CHN;
			if (gl_main_conf.lang == "JPN") str_menu_name_1 = obj.STORE_MENU_02_NAME_JPN;

			if (obj.CATE_CODE == "S10") {
				str_img = obj.STORE_MAIN_URL;
				str_menu_0 = obj.STORE_MENU_01_URL;
				str_menu_1 = obj.STORE_MENU_02_URL;

				if (str_menu_0 == "" || str_menu_0 == undefined) {
					str_menu_0 = '<img src="images/fnb_noimg.png" draggable=false>';
				} else {
					str_menu_0 = '<img src="' + str_menu_0 + '" draggable=false>';
				}
				if (str_menu_1 == "" || str_menu_1 == undefined) {
					str_menu_1 = '<img src="images/fnb_noimg.png" draggable=false>';
				} else {
					str_menu_1 = '<img src="' + str_menu_1 + '" draggable=false>';
				}
				//str_menu_1 = "<img src=\"" + str_menu_1 + "\" draggable=false>";

				if (str_img == "") str_img = obj.STORE_MAIN_URL;
				if (str_img == "" || str_img == undefined) {
					str_img = '<p class="lang_name_thumb">' + str_name + "</p>";
				} else {
					str_img = '<img src="' + str_img + '" draggable=false>';
				}
				$("#id_pop_fnb_thumb").html(str_img);
				$("#id_pop_fnb_title").html(str_name);
				$("#id_pop_fnb_floor").html(getFloorName(obj.STORE_FLOOR, gl_main_conf.lang));

				//$("#id_pop_fnb_category").html(getFnbCateName(obj.CATE_SUB, gl_main_conf.lang));
				$("#id_pop_fnb_desc").html(str_desc);
				$("#id_pop_fnb_time").html(obj.STORE_SERVICETIME);
				$("#id_pop_fnb_phone").html(obj.STORE_PHONE);

				$("#id_pop_fnb_menu_0").html(str_menu_0);
				if (str_menu_name_0 == undefined) {
					$("#id_pop_fnb_menu_0_name").html("");
				} else {
					$("#id_pop_fnb_menu_0_name").html(str_menu_name_0);
				}
				$("#id_pop_fnb_menu_0_price").html(obj.STORE_MENU_01_PRICE);
				if (obj.STORE_MENU_01_PRICE == "0" || obj.STORE_MENU_01_PRICE == "" || obj.STORE_MENU_01_PRICE == undefined) {
					$("#id_pop_fnb_menu_0_price").html("");
				} else {
					/*
                    if(gl_main_conf.lang == "KOR"){
                        $("#id_pop_fnb_menu_0_price").html((obj.STORE_MENU_01_PRICE*=1).toLocaleString('ko-KR')+"원");
                    }
                    else{
                        $("#id_pop_fnb_menu_0_price").html("&#8361;"+(obj.STORE_MENU_01_PRICE*=1).toLocaleString('ko-KR'));
                    }
                    */
					$("#id_pop_fnb_menu_0_price").html(obj.STORE_MENU_01_PRICE);
				}
				$("#id_pop_fnb_menu_1").html(str_menu_1);
				if (str_menu_name_1 == undefined) {
					$("#id_pop_fnb_menu_1_name").html("");
				} else {
					$("#id_pop_fnb_menu_1_name").html(str_menu_name_1);
				}
				if (obj.STORE_MENU_02_PRICE == "0" || obj.STORE_MENU_02_PRICE == "" || obj.STORE_MENU_02_PRICE == undefined) {
					$("#id_pop_fnb_menu_1_price").html("");
				} else {
					/*
                    if(gl_main_conf.lang == "KOR"){
                        $("#id_pop_fnb_menu_1_price").html((obj.STORE_MENU_02_PRICE*=1).toLocaleString('ko-KR')+"원");
                    }
                    else{
                        $("#id_pop_fnb_menu_1_price").html("&#8361;"+(obj.STORE_MENU_02_PRICE*=1).toLocaleString('ko-KR'));
                    }
                    */
					$("#id_pop_fnb_menu_1_price").html(obj.STORE_MENU_02_PRICE);
				}
			} else {
				str_img = obj.STORE_MAIN_URL;
				if (str_img == "" || str_img == undefined) {
					str_img = '<p class="lang_name_thumb">' + str_name + "</p>";
				} else {
					str_img = '<img src="' + str_img + '" draggable=false>';
				}
				$("#id_pop_store_thumb").html(str_img);
				$("#id_pop_store_title").html(str_name);
				$("#id_pop_store_floor").html(getFloorName(obj.STORE_FLOOR, gl_main_conf.lang));

				$("#id_pop_store_category").html(getCateName(obj.CATE_CODE, gl_main_conf.lang));
				$("#id_pop_store_desc").html(str_desc);
				$("#id_pop_store_time").html(obj.STORE_SERVICETIME);
				$("#id_pop_store_phone").html(obj.STORE_PHONE);
			}

			gl_main_conf.pop_store_id = p_obj.id + "";

			i_found = 1;
			break;
		}
	}

	if (i_found == 1) {
		var statics_obj = {
			sect: "STORE",
			code: p_obj.id,
		};
		setStatisSend(statics_obj);

		if (obj.CATE_CODE == "S10") {
			$("#id_popup_fnb").fadeIn();
		} else {
			$("#id_popup_store").fadeIn();
		}
	}
}

function setMakeInfoPopUpFacility(p_obj) {
	gl_main_conf.pop_pub_code = p_obj.id;
	$("#id_pop_fac_floor").html(p_obj.floor);
	$("#id_popup_fac .title").html(p_obj.title);
	$("#id_popup_fac .img_box > img").attr("src", p_obj.img_src);

	var statics_obj = {
		sect: "PUBLIC",
		code: p_obj.id,
	};
	setStatisSend(statics_obj);

	$("#id_popup_fac").fadeIn(200);
}

function setMakeInfoPopUpEvent(p_obj) {
	gl_main_conf.pop_pub_code = p_obj.id;
	$("#id_popup_event .img_box > img").attr("src", p_obj.img_url);

	var statics_obj = {
		sect: "EVENT",
		code: p_obj.id,
	};
	setStatisSend(statics_obj);

	$("#id_popup_event").fadeIn(200);
}
