// WAYFIND JS END


// var gl_main_conf = {
//     lang:"KOR",
//     name: "wayfind"
// };


// var gl_paging_conf = {
//     box_width : 860,
//     box_height : 740,
//     total_cnt : 0,        // 총카운트
//     list_cnt : 8,        // 한페이지에 보이는 리스트 수
//     page_curr : 1,        // 현재 페이지
//     page_total : 0,         // 페이지 블록수
//     page_cnt : 0,         // 페이지 블록수
//     page_block : 7,       // 페이징에 보여지는 불록수
//     keyword_old : "",
//     cate_code : "",
//     floor_code : ""
// };

// var gl_move_conf = {
//     drag_status:0,        // 드래그 여부 0 : 선택안함, 1: 선택함
//     parent_x:0,
//     parent_w:0,
//     start_left:0,         // 드래그 스타트 X
//     end_left:0,
//     orig_left:0,          // 드래그 원래위치 X
// };

// var gl_conf_header = new Object();
// var gl_jsop_lang_data = new Object();
// var gl_arr_store_list = new Array();



// /////////////////////////////////////////////////
// // 초기화 함수들

// function setInitSettingLang(p_load_data){
//     gl_jsop_lang_data = p_load_data;
// }

// function setInitSetting(p_result){
//     var i = 0;

//     if(p_result != "SUCC"){
//         return;
//     }
    
//     document.getElementById("id_list_area").addEventListener("touchstart",function(evt){ onMouseDownList(this,evt); },true );
//     document.getElementById("id_list_area").addEventListener("touchend",function(evt){ onMouseUpList(this,evt); },true );
//     document.addEventListener("touchmove",function(evt){ onMouseMoveList(evt); }, true );

//     document.getElementById("id_list_area").addEventListener("mousedown",function(evt){ onMouseDownList(this,evt); },true );
//     document.getElementById("id_list_area").addEventListener("mouseup",function(evt){ onMouseUpList(this,evt); },true );
//     document.addEventListener("mousemove",function(evt){ onMouseMoveList(evt); }, false );

//     var ret_offset = $("#id_wayfind_cover").offset();
//     var ret_width = $("#id_wayfind_cover").width();

//     gl_move_conf.parent_x = ret_offset.left;
//     gl_move_conf.parent_w = ret_width + gl_move_conf.parent_x;

//     $("#id_search_type_floor li").click(function(){
//         onClickSearchFloor(this);
//     });
    
    
    
    
    
    
//     if(parent.MAINPARENTCUSTOMCODE){

//     }else{
//         // 한글 세팅을 하자.
//         var str_eng_reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

//         for(i = 0; i < gl_xml_conf.xml_data.arr_store_list.length; i++){
//             obj = gl_xml_conf.xml_data.arr_store_list[i];
//             var remove_kor = getCvtRemoveWhite(obj.STORE_NAME_KOR);
//             var arr_dis = Hangul.disassemble(remove_kor, true);

//             if(Array.isArray(arr_dis) == true){
//                 var cho = arr_dis.reduce(function (prev, elem) {
//                     elem = elem[0] ? elem[0] : elem;
//                     return prev + elem;
//                 }, "");
//                 /*
//                 cho = cho.replace(/ㄲ/gi,"ㄱ");
//                 cho = cho.replace(/ㅉ/gi,"ㅈ");
//                 cho = cho.replace(/ㅃ/gi,"ㅂ");
//                 cho = cho.replace(/ㄸ/gi,"ㄷ");
//                 cho = cho.replace(/ㅆ/gi,"ㅅ");
//                 */
//                 cho = cho.toLowerCase();
//                 cho = cho.replace(str_eng_reg,"");
//                 obj.STORE_NAME_CHO = cho;

//                 str_tmp = obj.STORE_NAME_ENG + "";
//                 str_tmp = str_tmp.toLowerCase();

//                 str_tmp = str_tmp.replace(str_eng_reg,"");
//                 str_tmp = str_tmp.replace(/ /gi,"");
//                 str_tmp = str_tmp.replace(/\r/gi,"");
//                 str_tmp = str_tmp.replace(/\n/gi,"");
//                 str_tmp = str_tmp.replace(/\t/gi,"");

//                 obj.STORE_SEARCH_ENG = str_tmp;
//             }
//         }

//         setInitConfig(gl_xml_conf.xml_data);
//     }
// }

// function setInitConfig(p_load_data){
//     var i = 0;
//     var obj;

//     gl_conf_header = p_load_data.header;

//     var store_list = p_load_data.arr_store_list;

//     // F&B S09
//     for(i = 0; i < store_list.length && i < 1000; i++){
//         if(store_list[i].SAERCH_TYPE != "Y") continue;
//         gl_arr_store_list.push(store_list[i]);
//     }

//     gl_arr_store_list.sort(function(a, b) { // 오름차순
//         return a.STORE_NAME_KOR < b.STORE_NAME_KOR ? -1 : a.STORE_NAME_KOR > b.STORE_NAME_KOR ? 1 : 0;
//     });

//     setInitMakeFacList();
// }


// function setMainLang(p_type, p_lang){
//     var i  = 0;
//     var str_code = "";

//     if(p_type != "INIT"){
//         if(gl_main_conf.lang == p_lang) return;
//     }

//     gl_main_conf.lang = p_lang;


//     var str_attr = "";
//     var str_lang = gl_main_conf.lang.toLowerCase();

//     $(".lang_code_names").each(function(i){
//         str_attr = $(".lang_code_names").eq(i).attr("lang_code");
//         try{
//             $(this).html(gl_jsop_lang_data[gl_main_conf.name][str_attr][str_lang]);
//         }catch(err){
//             console.log("ERROR LANG Fac : " + str_attr);
//         }
//     });
    
    
//     // 다국어 매장 이름 변환
//     for(i = 0; i < gl_arr_store_list.length && i < 3000; i++){
//         obj = gl_arr_store_list[i];
//         try{
//             if($("#id_wayfind_box_" + obj.ID + " .logo_main .lang_name_thumb").hasClass("lang_name_thumb") == true){
//                 $("#id_wayfind_box_" + obj.ID + " .logo_main .lang_name_thumb").html(obj["FACILITY_NAME_" + gl_main_conf.lang]);
//             }
//             $("#id_wayfind_box_" + obj.ID + " .wayfind_name").html(obj["FACILITY_NAME_" + gl_main_conf.lang]);
//         }catch(err){
//             console.log("ERROR LANG FACILITY NAME : " + obj.FACILITY_NAME_KOR);
//         }
//     }
    
//     try{
//         $("#id_txt_search_keyword").attr("placeholder",gl_jsop_lang_data[gl_main_conf.name].FACILITY_INIT_TXT[str_lang]);
//     }catch(err){}    
// }
        
// function setToUpperCase(p_str){
//     var t_str = p_str.toUpperCase();
//     return t_str;
// }


// function setInitConfigLang(p_lang){
//     gl_jsop_lang_data = p_lang;
// }



// function setMainStart(p_obj){
//     if(PAGEACTIVEYN == true ){
//         return;
//     }
//     PAGEACTIVEYN = true;

//     // 초기화

//     gl_paging_conf.cate_code = "";
//     gl_paging_conf.floor_code = "";

//     //$("#id_pop_store_guide").show();
//     setTimeout(setMainStartEnd,2000);
//     setFacSearch("");
    
// }

// function setMainStartEnd(){
//     //$("#id_pop_store_guide").fadeOut();
// }


// function setMainStop(){

//     if(PAGEACTIVEYN == false ){
//         return;
//     }
//     PAGEACTIVEYN = false;
// }


// function setInitMakeFacList(){
//     var i = 0,j = 0;
//     var i_found = 0;
//     var obj;
//     var str_tmp = "";
//     var str_img  = "";
//     var str_html = "";

//     var i_total_page = Math.floor(gl_arr_store_list.length / gl_paging_conf.list_cnt) + 1;

//     gl_paging_conf.page_total = i_total_page;

//     for(i = 1; i <= i_total_page && i < 100; i++){
//         str_html = "<li code=\"" + i + "\" class=\"paging\" onClick=\"javascript:onClickPagingNum(this);\"><span class=\"circle_paging\"></span></li>";
//         $("#id_wayfind_paging").append(str_html);
//     }

//     for(i = 0; i < gl_arr_store_list.length && i < 3000; i++){
//         obj = gl_arr_store_list[i];
//         str_img = "";
//         str_img = obj.STORE_LOGO_URL;
//         if(str_img == "") str_img = obj.STORE_MAIN_URL;
//         if(str_img == ""){
//             str_img = "<p class=\"lang_name_thumb\">" + obj.STORE_NAME_KOR + "</p>";
//         }else{
//             str_img = "<img src=\"" + str_img + "\" draggable=false >";
//         }
        
//         str_html =  "<div code='P03' id='id_wayfind_box_" + obj.ID  + "' class='info' style='transform:translate(0px,0px);'> ";
//         str_html += "   <div class='logo_main' onClick='javascript:onClickFacInfo(event,\"" + obj.ID + "\");'>"+str_img;
//         str_html += "   </div>";
//         str_html += "   <div class='desc_main' onClick='javascript:onClickFacInfo(event,\"" + obj.ID + "\");'>";
//         str_html += "       <div class='desc_info'>";
//         str_html += "           <div class='desc_title'>";
//         str_html += "               <div class='wayfind_name'>"+obj.STORE_NAME_KOR;
//         str_html += "               </div>";
//         str_html += "           </div>";
//         str_html += "           <div class='desc_location'>";
//         str_html += "               <div class='right_area'>";
//         str_html += "                   <img src='images/store_list_ico_location.svg'>";
//         str_html += "               </div>";
//         str_html += "           </div>";
//         str_html += "       </div>";
//         str_html += "   </div>";
//         str_html += "</div>";
        
//         $("#id_wayfind_list").append(str_html);
//     }
    
//     gl_paging_conf.total_cnt = gl_arr_store_list.length;
//     gl_paging_conf.page_cnt = Math.ceil(gl_paging_conf.total_cnt / gl_paging_conf.list_cnt);
// }



// function setFacSearch(p_type){
//     var i = 0;
//     var i_cnt = 0, i_found = 0;
//     var obj;
//     var str_tmp = "";
//     var str_val = "";

//     if(p_type == "KEYWORD"){
//         str_val = $("#id_txt_search_keyword").val();
//         if(str_val == gl_paging_conf.keyword_old){
//             return;
//         }
//         str_val = str_val.toLowerCase();
//         gl_paging_conf.keyword_old = str_val;
//     }else if(p_type == "CATE_MAIN"){
//         str_val = gl_paging_conf.cate_code;
//     }else if(p_type == "CATE_SUB"){
//         str_val = gl_paging_conf.cate_code;
//     }else if(p_type == "FLOOR"){
//         str_val = gl_paging_conf.floor_code;
//     }

//     var ret_obj = { page:0, left:0, top:0 };

//     for(i = 0; i < gl_arr_store_list.length; i++){
//         obj = gl_arr_store_list[i];
//         i_found = 0;

//         if(p_type == "KEYWORD"){
//             if(gl_main_conf.lang == "KOR"){
//                 str_tmp = obj.STORE_NAME_CHO;
//                 if(str_tmp.indexOf(str_val) != -1){
//                     i_found = 1;
//                 }
//                 if(i_found==0){
//                     str_tmp = obj.STORE_SEARCH_ENG;
//                     if(str_tmp.indexOf(str_val) != -1){
//                         i_found = 1;
//                     }
//                 }
//             }else{
//                 str_tmp = obj.STORE_SEARCH_ENG;
//                 if(str_tmp.indexOf(str_val) != -1){
//                     i_found = 1;
//                 }
//             }
//         }else if(p_type == "CATE_MAIN"){
//             str_tmp = obj.CATE_CODE;
//             if(str_tmp.indexOf(str_val) >= 0){
//                 i_found = 1;
//             }
//         }else if(p_type == "CATE_SUB"){
//             str_tmp = obj.CATE_SUB;
//             if(str_tmp.indexOf(str_val) >= 0){
//                 i_found = 1;
//             }
//         }else if(p_type == "FLOOR"){
//             if(str_val == obj.STORE_FLOOR || str_val == "ALL"){
//                 i_found = 1;
//             }
//         }
//         if(p_type == ""){
//             i_found = 1;
//         }

//         if(i_found == 1){
//             ret_obj = getCalPosFac(i_cnt);
//             if(ret_obj.page < 3){
//                 obj.VIEW_SET = 1;
//                 $("#id_wayfind_box_" + obj.ID).css("transform","translate(" + ret_obj.left + "px," + ret_obj.top + "px)"); 
//             }else{
//                 obj.VIEW_SET = 0;
//                 $("#id_wayfind_box_" + obj.ID).css("transform","translate(-1500px," + ret_obj.top + "px)"); 
//             }
//             obj.PAGE = ret_obj.page + 1;
//             obj.POS_X = ret_obj.left;
//             obj.POS_Y = ret_obj.top;
//             $("#id_wayfind_box_" + obj.ID).show();
//             i_cnt++;
//         }else{
//             obj.PAGE = -1;
//             $("#id_wayfind_box_" + obj.ID).hide();
//             $("#id_wayfind_box_" + obj.ID).css("transform","translate(0px,0px)");
//         }
//     }

//     if(i_cnt > 0){
//         $("#id_page_no_result").hide();
//     }else{
//         $("#id_page_no_result").show();
//     }
//     gl_paging_conf.page_curr = 1;
//     gl_paging_conf.total_cnt = i_cnt;
//     gl_paging_conf.page_cnt = Math.ceil(gl_paging_conf.total_cnt / gl_paging_conf.list_cnt);

//     setContentsPaging();

//     $("#id_wayfind_list").css("transform","translate(0px,0px)"); 
// }

// function setContentsDir(p_dir){
//     var i = 0;
//     var i_left = 0;
//     var obj;

//     var i_width = gl_paging_conf.box_width * 2;

//     if(p_dir == "NEXT" || p_dir == "PREV" || p_dir == "HOME"){

//         if(p_dir == "NEXT"){
//             if((gl_paging_conf.page_curr + 1) <= gl_paging_conf.page_cnt){
//                 gl_paging_conf.page_curr++;
//             }
//             i_left = 0 - ((gl_paging_conf.page_curr-1) * i_width);

//         }else if(p_dir == "PREV"){

//             if(gl_paging_conf.page_curr > 1){
//                 gl_paging_conf.page_curr--;
//             }
//             i_left = 0 - ((gl_paging_conf.page_curr-1) * i_width);
//         }else if(p_dir == "HOME"){
//             i_left = 0 - ((gl_paging_conf.page_curr-1) * i_width);
//         }
//     }else{
//         gl_paging_conf.page_curr = Number(p_dir);
//         i_left = 0 - ((gl_paging_conf.page_curr-1) * i_width);
//     }

//     for(i = 0; i < gl_arr_store_list.length; i++){
//         obj = gl_arr_store_list[i];
//         if(obj.PAGE > 0 && obj.VIEW_SET == 0){
//             if(obj.PAGE < (gl_paging_conf.page_curr + 2)){
//                 obj.VIEW_SET = 1;
//                 $("#id_wayfind_box_" + obj.ID).css("transform","translate(" + obj.POS_X + "px," + obj.POS_Y + "px)"); 
//             }
//         }
//     }
//     $("#id_wayfind_list").css("transform","translate(" + i_left + "px,0px)"); 

//     setContentsPaging();

// }


// // 페이징
// function setContentsPaging(){
//     var i = 0;
//     var i_tmp = 0;
//     var str_html = "";

//     var paging = $("#id_wayfind_paging");

//     if(gl_paging_conf.page_cnt > 1){
//         for(i = 0; i < gl_paging_conf.page_total; i++){
//             if(i < gl_paging_conf.page_cnt){
//                 if(gl_paging_conf.page_curr == (i+1)){
//                     $(paging.children()[i]).addClass("active").find("span").addClass("active");
//                 }else{
//                     $(paging.children()[i]).removeClass("active").find("span").removeClass("active");
//                 }
//                 $(paging.children()[i]).show();
//             }else{
//                 $(paging.children()[i]).hide();
//             }
//         }

//         if(gl_paging_conf.page_curr <= 1){
//             $("#id_paging_prev").css({"opacity":"0.3"});
//             $("#id_paging_prev").attr("page_num","NONE");
//         }else{
//             $("#id_paging_prev").css({"opacity":"1"});
//             $("#id_paging_prev").attr("page_num","PREV");
//         }
//         if(gl_paging_conf.page_curr >= gl_paging_conf.page_cnt){
//             $("#id_paging_next").css({"opacity":"0.3"});
//             $("#id_paging_next").attr("page_num","NONE");
//         }else{
//             $("#id_paging_next").css({"opacity":"1"});
//             $("#id_paging_next").attr("page_num","NEXT");
//         }
//         paging.show();
//         $("#id_paging_prev").show();
//         $("#id_paging_next").show();
//     }else{
//         $("#id_paging_prev").css({"opacity":"0.3"});
//         $("#id_paging_next").css({"opacity":"0.3"});
//         $("#id_paging_prev").attr("page_num","NONE");
//         $("#id_paging_next").attr("page_num","NONE");
//         paging.hide();
//         $("#id_paging_prev").hide();
//         $("#id_paging_next").hide();
//     }
// }

// /////////////////////////////////////////////////
// // MOVE EVENT

// function onMouseDownList(p_obj,evt){

//     gl_move_conf.drag_status = 1;

//     var ret_pos = getPosTransform(document.getElementById("id_wayfind_list"));

//     gl_move_conf.orig_left = ret_pos.left;

//     if(evt.type == "touchstart"){
//         gl_move_conf.start_left = evt.targetTouches[0].pageX;
//     }else{
//         gl_move_conf.start_left = evt.pageX;
//     }
// }

// function onMouseUpList(p_obj,evt){

//     var pos_x = 0;

//     if(evt.type == "touchend"){
//         pos_x = evt.changedTouches[0].pageX;
//     }else{
//         pos_x = evt.pageX;
//     }

//     pos_x = pos_x - gl_move_conf.start_left;

//     if(pos_x < -120){
//         setContentsDir("NEXT");
//     }else if(pos_x > 120){
//         setContentsDir("PREV");
//     }else{
//         setContentsDir("HOME");
//     }

//     gl_move_conf.drag_status = 0;
// }

// function onMouseMoveList(evt){

//     if(gl_move_conf.drag_status == 1){

//         var obj = evt.touches;

//         if(obj != undefined){
//             pos_x = evt.touches[0].clientX;
//         }else{
//             pos_x = evt.pageX;
//         }

//         if(pos_x < gl_move_conf.parent_x || pos_x > gl_move_conf.parent_w){
//             gl_move_conf.drag_status = 0;
//             setContentsDir("HOME");
//             return;
//         }
//         pos_x = pos_x - gl_move_conf.start_left + gl_move_conf.orig_left;
//         $("#id_wayfind_list").css("transform","translate(" + pos_x + "px,0px)"); 
//     }
// }

// /////////////////////////////////////////////////
// // CLICK EVENT

// // 페이징 처리
// function onClickPagingNum(p_obj){
//     var page_num = $(p_obj).attr("code");

//     if(page_num == "NONE") return;
//     setContentsDir(page_num);
// }

// // 상품 상세보기 클릭
// function onClickFacInfo(p_evt,p_id){
//     if(Math.abs(gl_move_conf.start_left - p_evt.pageX) < 10){
//         var cmd_obj = { sect:"POPUP", type:"STORE_INFO", id:p_id, code:"" };
//         if(parent.MAINPARENTCUSTOMCODE){
//             parent.setParentCmd(cmd_obj);
//         }
//     }
// }

// function onClickWayFindLocation(p_id){
//     var cmd_obj = { sect:"LOCATION",type:"STORE", id:p_id};
//     if(parent.MAINPARENTCUSTOMCODE){
//         parent.setParentCmd(cmd_obj);
//     }
// }

// ///////////////////////////////////////////
// // UTIL
// function getCalPosFac(p_num){

//     var ret_obj = { page:0, left:0, top:0 };

//     var i_left = 0;
//     var i_top = 0;

//     var i_page = Math.floor(p_num / gl_paging_conf.list_cnt);
//     var i_left = Math.floor(p_num % 2) * gl_paging_conf.box_width;
//     var i_top = Math.floor((p_num % gl_paging_conf.list_cnt) / 2) * gl_paging_conf.box_height;

//     i_left = i_left + (gl_paging_conf.box_width * 2) * i_page;

//     ret_obj.page = i_page;
//     ret_obj.left = i_left;
//     ret_obj.top = i_top;

//     return ret_obj;
// }


// /////////////////////////////////////////////////
// // DEBUG
// function onClickDebugLang(p_lang){
//     setMainLang("CLICK",p_lang);
// }

// function onClickDebug01(p_type){
//     setFacSearch("");
// }

// function onClickDebugInit(p_type){
//     if(p_type == "START"){
//         setMainStart(null);
//     }else{
//         setMainStop();
//     }
// }