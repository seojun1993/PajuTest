// var gl_main_conf = {
//     lang:"KOR",
//     name: "platform"
// };

// var gl_conf_header = new Object();
// var gl_jsop_lang_data = new Object();

// var gl_arr_pub_list = new Array(
//     {"pub_code":"P01","name":"","floor":""},
//     {"pub_code":"P02","name":"","floor":""},
//     {"pub_code":"P03","name":"","floor":""},
//     {"pub_code":"P04","name":"","floor":""},
//     {"pub_code":"P05","name":"","floor":""},
//     {"pub_code":"P06","name":"","floor":""},
//     {"pub_code":"P07","name":"","floor":""},
//     {"pub_code":"P08","name":"","floor":""},
//     {"pub_code":"P09","name":"","floor":""},
//     {"pub_code":"P10","name":"","floor":""},
//     {"pub_code":"P11","name":"","floor":""},
//     {"pub_code":"P12","name":"","floor":""},
//     {"pub_code":"P13","name":"","floor":""},
//     {"pub_code":"P14","name":"","floor":""},
//     {"pub_code":"P15","name":"","floor":""},
//     {"pub_code":"P16","name":"","floor":""},
//     {"pub_code":"P17","name":"","floor":""},
//     {"pub_code":"P18","name":"","floor":""},
//     {"pub_code":"P19","name":"","floor":""},
//     {"pub_code":"P20","name":"","floor":""},
//     {"pub_code":"P21","name":"","floor":""},
//     {"pub_code":"P22","name":"","floor":""},
//     {"pub_code":"P23","name":"","floor":""}
// );


// /////////////////////////////////////////////////
// // 초기화 함수들

// function setInitSettingLang(p_load_data){
//     gl_jsop_lang_data = p_load_data;
// }

// function setInitSetting(p_result){

//     if(p_result != "SUCC"){
//         console.log("FAIL LOAD DATA/ROUTE");
//         return;
//     }

//     $(".info_main").click(function(){
//         onClickFacility(this);
//     });

//     if(parent.MAINPARENTCUSTOMCODE){

//     }else{
//         console.log("LOCAL SETTING FACILITY");
//         setInitConfig(gl_xml_conf.xml_data,gl_xml_conf.xml_route);
//     }
// }

// function setInitConfig(p_load_data,p_load_route){
//     var i = 0, j = 0,k = 0;
//     var obj;
//     var str_floor = "", str_tmp = "";
//     //console.log(p_load_data.arr_pub_list[0]);
//     var arr_floors = new Array(
//         {floor:"B1F",cnt:0},
//         {floor:"BM1F",cnt:0},
//         {floor:"1F",cnt:0},
//         {floor:"M1F",cnt:0},
//         {floor:"2F",cnt:0},
//         {floor:"3F",cnt:0},
//         {floor:"4F",cnt:0},
//         {floor:"5F",cnt:0},
//         {floor:"6F",cnt:0},
//         {floor:"RF",cnt:0}
//     );

//     for(i = 0; i < gl_arr_pub_list.length; i++){
//         str_floor = "";
//         for(j = 0; j < arr_floors.length; j++){
//             arr_floors[j].cnt = 0;
//         }
//         gl_arr_pub_list[i].floor = str_floor;
//     }
// }

// function setInitConfigLang(p_lang){
//     gl_jsop_lang_data = p_lang;
// }


// function setMainLang(p_type, p_lang){
//     var i  = 0;
//     var str_code = "";

//     console.log("MAIN LANG FACILITY");

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
//             console.log("ERROR LANG FACILITY : " + str_attr);
//         }
//     });
// }

// function setMainStart(p_obj){

//     PAGEACTIVEYN = true;

// }


// function setMainStop(){

//     if(PAGEACTIVEYN == false ){
//         return;
//     }
    
//     PAGEACTIVEYN = false;
// }


// /////////////////////////////////////////////////
// // CLICK EVENT
// /////////////////////////////////////////////////

// function onClickPlatform(data){

//     if(data.code != ""){
//         if(parent.MAINPARENTCUSTOMCODE){
//             var cmd_obj = {
//                 sect:"POPUP",
//                 type:"PLATFORM_INFO",
//                 id:data.code,
//                 code:data.code,
//                 title:data.name,
//                 mainImg:data.mainImg,
//                 otherImg:data.otherImg
//             };
//             parent.setParentCmd(cmd_obj);
//         }
//     }
// }



// /////////////////////////////////////////////////
// // DEBUG

// function onClickDebugInit(){
//     setMainStart(null);
// }

// function onClickDebugLang(p_type){
//     setMainLang("CLICK",p_type);
// }

// function onClickDebugSearch(p_type){
//     setEventSearch(p_type);

// }