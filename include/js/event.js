// EVENT JS START

bindEventList($('.tab_box').find('button.active').data('code'));

    $('.tab_box > button').on('click', function () {
        $('.tab_box > button').removeClass('active');
        $(this).addClass('active');
        bindEventList($(this).data('code'));
    });

    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 140,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        touchStartPreventDefault: false,
    });

    function bindEventList(code) {
        var filter_gl_event_list = gl_event_list.filter(e => e.sect == code);

        $("#id_list_area").html('');
        if(filter_gl_event_list.length > 0) {
            $.each(filter_gl_event_list, function () {
                var $this = this;
                var str_html = '';
                str_html += "<div class='info_main swiper-slide'>";
                str_html += "     <div class='img_box'>";
                str_html += "        <div class='img_main' style=''>";
                str_html += "          <img style='width:100%;height:100%' src='" + $this.FILE_URL + "' onClick='clickEventInfo(\"" + $this.FILE_URL + "\");'>";
                str_html += "        </div>";
                str_html += "        <div class='img_txt' style=''>";
                str_html += "            <h3 class='img_title' style=''>" + $this.EVENT_NAME + "<br/>" + $this.EVENT_DESC + "</h3>";
                str_html += "            <span>별도 공지 시까지</span>";
                str_html += "        </div>";
                str_html += "     </div>";
                str_html += " </div>";
                $("#id_list_area").append(str_html);
            });
            $('#id_page_no_result').hide();
        } else {
            $('#id_page_no_result').show();
        }
    }

    function clickEventInfo(fileUrl) {
        $("#id_popup_event .img_box > img").attr("src", fileUrl);
        $("#id_popup_event").fadeIn(200);

        $('#id_popup_event').show();
    }
    
// EVENT JS END

// var gl_main_conf = {
//     lang:"KOR",
//     name: "event"
// };

// var gl_list_conf = {
//     box_list_width:1140,
//     box_width:1140,
//     box_height:1000,
//     slider_margin : 0,
//     list_cnt : 0,
//     curr_cnt : 0,
//     auto_move: "NONE"    
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
// var gl_arr_event_list = new Array();
// var gl_arr_event_near = new Array();
// var gl_arr_event_active = new Array();


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


//     var ret_offset = $("#id_list_area").offset();
//     var ret_width = $("#id_list_area").width();

//     gl_move_conf.parent_x = ret_offset.left;
//     gl_move_conf.parent_w = ret_width;

//     for(i = 0; i < 5; i++){
//         var obj = { idx:0, left:0 };
//         gl_arr_event_near.push(obj);
//     }
//     if(parent.MAINPARENTCUSTOMCODE){

//     }else{
//         setInitConfig(gl_xml_conf.xml_data);
//     }
// }

// function setInitConfig(p_load_data){
//     var i = 0,i_cnt = 1;
//     var obj;
//     var str_sday = "";
//     var str_eday = "";
//     var str_date = "";

//     var i_sday = 0, i_eday = 0,i_date = 0;

//     var date = new Date();

//     var str_days = date.getFullYear() + "";
//     if((date.getMonth()+1) < 10){ str_days += "0" + (date.getMonth()+1) + "";
//     }else{ str_days += "" + (date.getMonth()+1) + ""; }
//     if(date.getDate() < 10){ str_days += "0" + date.getDate();
//     }else{ str_days += "" + date.getDate(); }
    
//     i_date = parseInt(str_days);

//     gl_conf_header = p_load_data.header;

//     var event_list = p_load_data.arr_event_list;

//     for(i = 0; i < event_list.length && i < 1000; i++){
//         if(gl_arr_event_list.FILE_URL == "") continue;

//         str_sday = event_list[i].SDAY + "";
//         str_eday = event_list[i].EDAY + "";
//         i_sday = parseInt(str_sday);
//         i_eday = parseInt(str_eday);

//         if(i_sday <= i_date && i_eday >= i_date){
//             event_list[i].NUM = i_cnt + "";
//             gl_arr_event_list.push(event_list[i]);
//             gl_arr_event_active.push(event_list[i]);
//             i_cnt++;
//         }
//     }

//     setInitMakeEventList();

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
//             console.log("ERROR LANG FOOD : " + str_attr);
//         }
//     });
// }

// function setInitConfigLang(p_lang){
//     gl_jsop_lang_data = p_lang;
// }



// function setMainStart(p_obj){

//     if(PAGEACTIVEYN == true ){
// //        return;
//     }
//     PAGEACTIVEYN = true;

//     $($(".button_list span")[0]).addClass("active");
//     $($(".button_list span")[1]).removeClass("active");

//     setEventSearch("");
// }

// function setMainStop(){

//     if(PAGEACTIVEYN == false ){
//         return;
//     }
//     PAGEACTIVEYN = false;
// }


// function setInitMakeEventList(){
//     var i = 0,j = 0;
//     var i_found = 0;
//     var obj;
//     var str_tmp = "";
//     var str_img  = "";
//     var str_html = "";

//     gl_list_conf.list_cnt = gl_arr_event_list.length;
//     gl_list_conf.curr_cnt = 0;

//     if(gl_list_conf.list_cnt == 0 ){
//         return;

//         /*
//         if(gl_list_conf.list_cnt < 5){
//             for(i = 0; i < 5; i++){
//                 obj = gl_arr_event_list[i];
//                 var obj_event = new Object();

//                 for(var key in obj){
//                     obj_event[key] = obj[key];
//                 }
//                 obj_event.NUM = gl_arr_event_list.length + 2;
//                 gl_arr_event_list.push(obj_event);
//                 gl_arr_event_active.push(obj_event);
//             }
//             gl_list_conf.list_cnt = gl_arr_event_list.length;
//         }
//         */
//     }

//     for(i = 1; i <= gl_arr_event_list.length && i < 1000; i++){
//         str_html = "<li code='" + i + "' class='paging' onClick='javascript:onClickPagingNum(this);'><span class='circle_skybg'></span></li>";
//         $("#id_event_paging").append(str_html);
//     }

//     i_left = gl_list_conf.box_width * 5;
    
//     for(i = 0; i < gl_arr_event_list.length && i < 3000; i++)
//     {
//         obj = gl_arr_event_list[i];
        


//        str_html = "<div id='id_event_box_" + obj.NUM  + "' code='" + obj.ID + "' class='info_main' style='transform:translate(" + i_left + "px,0px);' onClick='javascript:onClickEventInfo(event,\"" + obj.ID + "\");'>";
//        str_html += "     <div class='img_box'>";
//        str_html += "        <div class='img_bg' style=''>";
//        str_html += "          <img style='width:100%;height:100%' src='images/event_noimg.png'>";
//        str_html += "        </div>";
//        str_html += "        <div class='img_main' style=''>";
//        str_html += "          <img style='width:100%;height:100%' src='" + obj.FILE_URL + "'>";
//        str_html += "        </div>";
//        str_html += "        <div class='img_txt' style=''>";
//        str_html += "            <h3 class='img_title' style=''>아난티 역사상 가장 강력한 플랫폼<br/> 빌라쥬 드 아난티 7월 18일(화)에 오픈합니다.</h3>";
//        str_html += "            <span>별도 공지 시까지</span>";
//        str_html += "        </div>";
//        str_html += "     </div>";
//        str_html += " </div>";
//         $("#id_list_area").append(str_html);
//     }
    
//     $("#id_page_no_result").hide();

//     setContentsDir("HOME");
// }


// function setEventSearch(p_type){
//     var i = 0;
//     var i_cnt = 0, i_found = 0;
//     var obj;
//     var str_tmp = "";
//     var str_val = "";

//     var ret_obj = { page:0, left:0, top:0 };

//     str_val = "BRAND";

//     var i_left = gl_list_conf.box_width * 5;

//     gl_arr_event_active = [];

//     for(i = 0; i < gl_arr_event_list.length; i++){
//         obj = gl_arr_event_list[i];

//         i_found = 0;

//         if(p_type != ""){
//             str_tmp = obj.CATE_CODE;
//             if(str_tmp.indexOf(str_val) >= 0){
//                 i_found = 1;
//             }
//         }else{
//             i_found = 1;
//         }

//         if(i_found == 1){
//             gl_arr_event_active.push(obj);
//         }else{

//         }
//         $("#id_event_box_" + obj.NUM).css("transform","translate(" + i_left + "px,0px)"); 
//     }

//     gl_list_conf.list_cnt = gl_arr_event_active.length;
//     gl_list_conf.curr_cnt = 0;

//     setContentsDir("HOME");
// }


// function setContentsDir(p_dir){

//     if(gl_list_conf.list_cnt == 0) return;

//     var i = 0;
//     var i_tmp = 0, i_left = 0;

//     if(gl_list_conf.list_cnt < 5){

//         if(p_dir == "NEXT"){
//             if(gl_list_conf.curr_cnt < gl_list_conf.list_cnt-1){
//                 gl_list_conf.curr_cnt++;
//             }
//         }else if(p_dir == "PREV"){
//             if(gl_list_conf.curr_cnt > 0){
//                 gl_list_conf.curr_cnt--;
//             }
//         }else if(p_dir == "HOME"){

//         }

//         if(gl_list_conf.list_cnt == 1){
//             i_left = 0;
//             //i_left = (1080 - gl_list_conf.box_width)/2;
//         }else{
//             i_left = -(gl_list_conf.box_width + gl_list_conf.slider_margin) * gl_list_conf.curr_cnt;
//         }

//         for(i = 0; i < gl_arr_event_list.length && i < 3000; i++){
//             obj = gl_arr_event_list[i];
//             i_tmp = obj.NUM;
//             gl_arr_event_near[i].idx = i_tmp;
//             gl_arr_event_near[i].left = i_left;
//             $("#id_event_box_" + i_tmp).css("transition-duration","0.4s");
//             $("#id_event_box_" + i_tmp).css("transform","translate(" + i_left + "px,0px)"); 
//             i_left += (gl_list_conf.box_width + gl_list_conf.slider_margin);
//         }

//     }else{

//         i_left = gl_list_conf.box_list_width -(gl_list_conf.box_width + gl_list_conf.slider_margin) * 3 + gl_list_conf.slider_margin + 0;

//         if(p_dir == "NEXT"){
//             gl_list_conf.curr_cnt++;
//             if(gl_list_conf.curr_cnt >= gl_list_conf.list_cnt){
//                 gl_list_conf.curr_cnt = 0;
//             }
//         }else if(p_dir == "PREV"){
//             gl_list_conf.curr_cnt--;
//             if(gl_list_conf.curr_cnt < 0){
//                 gl_list_conf.curr_cnt = gl_list_conf.list_cnt-1;
//             }
//         }else if(p_dir == "HOME"){

//         }

//         getFindNearEvent(gl_list_conf.curr_cnt);

//         for(i = 0; i < 5; i++){
//             i_tmp = gl_arr_event_near[i].idx;
//             gl_arr_event_near[i].left = i_left;

//             if(p_dir == "PREV" && i == 0){
//                 $("#id_event_box_" + i_tmp).css("transition-duration","0s");
//             }else if(p_dir == "NEXT" && i == 4){
//                 $("#id_event_box_" + i_tmp).css("transition-duration","0s");
//             }else{
//                 $("#id_event_box_" + i_tmp).css("transition-duration","0.4s");
//             }
//             $("#id_event_box_" + i_tmp).css("transform","translate(" + i_left + "px,0px)"); 
//             i_left += (gl_list_conf.box_width + gl_list_conf.slider_margin);
//         }
//     }
//     setContentsPaging();
// }

// function setContentsPaging(){
//     var i = 0;
//     var i_tmp = 0;
//     var str_html = "";

//     var paging = $("#id_event_paging");

//     if(gl_list_conf.list_cnt > 1){
//         for(i = 0; i < gl_arr_event_list.length; i++){
//             if(i < gl_list_conf.list_cnt){
//                 if(gl_list_conf.curr_cnt== i){
//                     $(paging.children()[i]).find("span").addClass("active");
//                 }else{
//                     $(paging.children()[i]).find("span").removeClass("active");
//                 }
//                 $(paging.children()[i]).show();
//             }else{
//                 $(paging.children()[i]).hide();
//             }
//         }
//         paging.show();
//     }else{
        
//         $("#id_paging_prev").hide();
//         $("#id_paging_next").hide();
//         paging.hide();
//     }
// }

// function getFindNearEvent(p_num){
//     var i = 0;
//     var i_num = p_num;

//     if(gl_list_conf.list_cnt == 0) return;

//     i_num = i_num - 2;
//     if(i_num < 0){
//         i_num = gl_list_conf.list_cnt + i_num;
//     }
    
//     gl_arr_event_near[0].idx = gl_arr_event_active[i_num].NUM;
//     for(i = 1; i < 5; i++){
//         i_num++;
//         if(i_num >= gl_list_conf.list_cnt) i_num = 0;
//         gl_arr_event_near[i].idx = gl_arr_event_active[i_num].NUM;
//     }
// }

// // 상품 상세보기 클릭
// function onClickEventInfo(p_evt,p_id){
//     if(Math.abs(gl_move_conf.start_left - p_evt.pageX) < 10){
//         var cmd_obj = { sect:"POPUP", type:"EVENT_INFO", id:p_id, code:"", img_url : obj.FILE_URL };
//         if(parent.MAINPARENTCUSTOMCODE){
//             parent.setParentCmd(cmd_obj);
//         }
//     }
// }

// /////////////////////////////////////////////////
// // MOVE EVENT

// function onMouseDownList(p_obj,evt){

//     gl_move_conf.drag_status = 1;

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

//         var i = 0, i_tmp = 0;

//         for(i = 0; i < 5; i++){
//             i_tmp = gl_arr_event_near[i].idx;
//             if(i_tmp >= 0){
//                 i_left = gl_arr_event_near[i].left + pos_x;
//                 $("#id_event_box_" + i_tmp).css("transform","translate(" + i_left + "px,0px)"); 
//             }
//         }
//     }
// }


// /////////////////////////////////////////////////
// // CLICK EVENT
// /////////////////////////////////////////////////

// function onClickEventCate(p_obj){
//     $(".button_list span").removeClass("active");
//     $(p_obj).find("span").addClass("active");

//     var str_code = $(p_obj).attr("code");
//     setEventSearch(str_code);
// }



// function onClickPagingNum(p_obj){
//     var page_num = $(p_obj).attr("code");
//     if(page_num == "NONE") return;
//     setContentsDir(page_num);
// }


// ///////////////////////////////////////////
// // UTIL
// function getCalPosEvent(p_num){

//     var ret_obj = { page:0, left:0, top:0 };

//     var i_left = 0;
//     var i_top = 0;

//     var i_page = p_num;
//     var i_left = p_num * gl_paging_conf.box_width;

//     ret_obj.page = i_page;
//     ret_obj.left = i_left;
//     ret_obj.top = i_top;

//     return ret_obj;
// }


// /////////////////////////////////////////////////
// // DEBUG

// function onClickDebugInit(){
//     setMainStart(null);
// }

// function onClickDebugLang(p_lang){
//     setMainLang("CLICK",p_lang);
// }

// function onClickDebugSearch(p_type){
//     setEventSearch(p_type);

// }
// function onClickDebugDir(p_type){
//     setContentsDir(p_type);
// }