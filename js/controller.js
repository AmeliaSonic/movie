// var page_count = 24;
// var total_page = 0;
// var db;
//
// function recommend(){
//     var arr = [];
//     var type = GetQueryString("type");
//     $.getJSON("./data/data.json",function(datas){
//         console.log(type);
//         var medias = [];
//         for(i in datas){
//             if(datas[i].type==type){
//                 medias = datas[i].media;
//             }
//         }
//         var num = 6;
//         var limit = medias.length;
//         if(num>limit){
//             num = limit;
//         }
//         arr = rand(num,limit);
//         var str = "";
//         for(var i in arr){
//             var num = arr[i];
//             var item = medias[num];
//             str = str + "<li class=\"first_content bg\">" +
//                 "<a href=\"Detail.html?type="+type+"&num="+i+"\" class=\"pic \">" +
//                 "<img src=\"./images/"+item.cover+"\" width=\"100%\">" +
//                 "<span class=\"first_bg\"><i class=\"icon_bf\"></i></span>" +
//                 "</a>" +
//                 "<div class=\"tc\">" +
//                 "<p class=\"tit\">" +
//                 "<a target=\"_blank\" href=\"Detail.html?type="+type+"&num="+num+"\">"+item.name+"</a></p>" +
//                 "<p class=\"des\">"+(item.description.length>10?item.description.substring(0,10):item.description)+"</p>" +
//                 "</div>" +
//                 "</li>";
//         }
//         $("#recommend_list").empty().append("<ul class=\"Notice_list\">"+str+"</ul>");
//     })
// }
//
// function recommend(type){
//     // console.log(type);
//     $("#recommend_list").empty();
//     var arr = [];
//     getListMedia(type,null,function (datas) {
//         var num = 6;
//         var limit = datas.length;
//         if(num>limit){
//             num = limit;
//         }
//         arr = rand(num,limit);
//         var str = "";
//         for(var i in arr){
//             var num = arr[i];
//             var item = datas[num-1];
//             str = str + "<li class=\"first_content bg\">" +
//                 "<a href=\"Detail.html?id="+item.id+"\" class=\"pic \">" +
//                 "<img src=\"./images/"+item.cover+"\" width=\"100%\">" +
//                 "<span class=\"first_bg\"><i class=\"icon_bf\"></i></span>" +
//                 "</a>" +
//                 "<div class=\"tc\">" +
//                 "<p class=\"tit\">" +
//                 "<a target=\"_blank\" href=\"Detail.html?id="+item+"\">"+item.name+"</a></p>" +
//                 "<p class=\"des\">"+(item.description.length>10?item.description.substring(0,10)+"...":item.description)+"</p>" +
//                 "</div>" +
//                 "</li>";
//         }
//         $("#recommend_list").empty().append("<ul class=\"Notice_list\">"+str+"</ul>");
//     })
//     // $.getJSON("./data/data.json",function(datas){
//     //     var medias = [];
//     //     for(i in datas){
//     //         if(datas[i].type==type){
//     //             medias = datas[i].media;
//     //         }
//     //     }
//     //     var num = 6;
//     //     var limit = medias.length;
//     //     if(num>limit){
//     //         num = limit;
//     //     }
//     //     arr = rand(num,limit);
//     //     var str = "";
//     //     for(var i in arr){
//     //         var num = arr[i];
//     //         var item = medias[num-1];
//     //         str = str + "<li class=\"first_content bg\">" +
//     //             "<a href=\"Detail.html?type="+type+"&num="+i+"\" class=\"pic \">" +
//     //             "<img src=\"./images/"+item.cover+"\" width=\"100%\">" +
//     //             "<span class=\"first_bg\"><i class=\"icon_bf\"></i></span>" +
//     //             "</a>" +
//     //             "<div class=\"tc\">" +
//     //             "<p class=\"tit\">" +
//     //             "<a target=\"_blank\" href=\"Detail.html?type="+type+"&num="+num+"\">"+item.name+"</a></p>" +
//     //             "<p class=\"des\">"+(item.description.length>10?item.description.substring(0,10)+"...":item.description)+"</p>" +
//     //             "</div>" +
//     //             "</li>";
//     //     }
//     //     $("#recommend_list").empty().append("<ul class=\"Notice_list\">"+str+"</ul>");
//     // })
// }
//
// function rand(number,limit) {
//     // console.log(number+"---"+limit);
//     var arr = [];
//     for(var i=0;i<number;i++){
//         var a = Math.ceil(Math.random()*limit);
//         var str = arr.toString();
//         if(str.indexOf(a.toString())>-1){
//             i--;
//         }else{
//             arr.push(a);
//         }
//     }
//     // console.log(arr);
//     return arr;
// }
//
// function initdb(callback){
//     window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
//
//     if(!window.indexedDB)
//     {
//         console.log("你的浏览器不支持IndexedDB");
//     }else {
//         console.log("support");
//         var request = window.indexedDB.open("ipfsmovies",1);
//         request.onerror = function (event) {
//             console.log('数据库打开报错');
//         };
//         request.onsuccess = function (event) {
//             db = request.result;
//             console.log('数据库打开成功');
//             initData(function(data){
//                 initTypes(data,function(datas){
//                     addData([],datas);
//                     addData(data,[]);
//                 })
//             });
//             callback();
//             // getAll(function (data) {
//             //     console.log(data);
//             // });
//             // searchMedia("电视剧",function (data) {
//             //     console.log(data);
//             // });
//             // initData(function(data){add(data)});
//         };
//         request.onupgradeneeded = function (event) {
//             console.log("数据库配置中");
//             db = event.target.result;
//             var objectStore;
//             if (!db.objectStoreNames.contains('medias')) {
//                 objectStore = db.createObjectStore('medias', { keyPath: 'id' });
//                 objectStore.createIndex('name', 'name', { unique: false });
//                 objectStore.createIndex('cover', 'cover', { unique: false });
//                 objectStore.createIndex('actor', 'actor', { unique: false });
//                 objectStore.createIndex('tags', 'tags', { unique: false });
//                 objectStore.createIndex('year', 'year', { unique: false });
//                 objectStore.createIndex('area', 'area', { unique: false });
//                 objectStore.createIndex('description', 'description', { unique: false });
//                 objectStore.createIndex('episode', 'episode', { unique: false });
//                 objectStore.createIndex('score', 'score', { unique: false });
//                 objectStore.createIndex('director', 'director', { unique: false });
//                 objectStore.createIndex('type', 'type', { unique: false });
//             }
//             if (!db.objectStoreNames.contains('types')) {
//                 objectStore = db.createObjectStore('types', { keyPath: 'id' });
//                 objectStore.createIndex('name', 'name', { unique: false });
//                 objectStore.createIndex('tags', 'tags', { unique: false });
//             }
//         }
//
//     }
// }
//
// function initData(callback){
//     // $.getJSON("./data/data.json",function(datas) {
//     //     $.getJSON("./data/configs.json",function(configs){
//     //         var types = configs.types;
//     //         var jsons = [];
//     //         var id = 0;
//     //         var type = "";
//     //         for(i in datas){
//     //             var data = datas[i];
//     //             var typenum = data.type;
//     //             var medias = data.media;
//     //             for(m in medias){
//     //                 var media = medias[m];
//     //                 media.type = types[typenum].name;
//     //                 media.id = id;
//     //                 id = id + 1;
//     //                 jsons.push(media);
//     //             }
//     //         }
//     //         // console.log(jsons);
//     //         callback(jsons);
//     //     })
//     // })
//     $.getJSON("./data/data_new.json",function (datas) {
//         var jsons = [];
//         for(i in datas){
//             var media = {};
//             media = datas[i];
//             media.id = i;
//             jsons.push(media);
//         }
//         callback(jsons);
//     })
// }
//
// function initTypes(datas,callback){
//     var types = [];
//     for(i in datas){
//         var data = datas[i];
//         var exist = false;
//         var type;
//         if(types.length==0){
//             type = {};
//             type.name = data.type;
//             type.tags = data.tags;
//             types.push(type);
//         }else{
//             type = {};
//             var num;
//             for(j in types){
//                 var type0 = types[j];
//                 type=type0;
//                 if(type0.name==data.type){
//                     exist = true;
//                     num = j;
//                     for(m in data.tags){
//                         var tag = data.tags[m];
//                         if(!(type0.tags.toString().indexOf(tag)>-1)){
//                             var tags = [];
//                             tags = type0.tags;
//                             tags.push(tag);
//                             type = {};
//                             type.name = type0.name;
//                             type.tags = tags;
//                         }
//                     }
//                 }
//             }
//             if(!exist){
//                 type={};
//                 type.name = data.type;
//                 type.tags = data.tags;
//                 jsons = types;
//                 jsons.push(type);
//             }else{
//                 var jsons = [];
//                 for(j in types){
//                     if(j==num){
//                         jsons.push(type);
//                     }else{
//                         jsons.push(types[j]);
//                     }
//                 }
//             }
//             types = jsons;
//         }
//     }
//     for(i in types){
//         types[i].id = parseInt(i);
//     }
//     callback(types);
// }
//
// function addData(datas1,datas2) {
//     for(i in datas2){
//         var data = datas2[i];
//         var request2 = db.transaction(['types'], 'readwrite').objectStore('types').add(data);
//         request2.onsuccess = function (event) {
//             console.log('数据写入成功');
//         };
//         request2.onerror = function (event) {
//             console.log('数据写入失败');
//         }
//     }
//     for(i in datas1){
//         var data = datas1[i];
//         var request1 = db.transaction(['medias'], 'readwrite').objectStore('medias').add(data);
//         // }else if(type=="types"){
//         //     request = db.transaction(['types'], 'readwrite').objectStore('types').add(data);
//         // }
//         request1.onsuccess = function (event) {
//             console.log('数据写入成功');
//         };
//         request1.onerror = function (event) {
//             console.log('数据写入失败');
//         }
//     }
// }
//
// function getAll(callback){
//     var objectStore = db.transaction('medias').objectStore('medias');
//     var sum = 0;
//     objectStore.openCursor().onsuccess = function (event) {
//         var cursor = event.target.result;
//         if(cursor){
//             sum = sum + 1;
//             cursor.continue();
//         }else{
//             callback(sum);
//         }
//     };
//     // console.log(sum);
// }
//
// function getAllConfigs(callback){
//     var objectStore = db.transaction('types').objectStore('types');
//     var datas = [];
//     objectStore.openCursor().onsuccess = function (event) {
//         var cursor = event.target.result;
//         var data = {};
//         if(cursor){
//             data.id=cursor.value.id;
//             data.name=cursor.value.name;
//             data.tags=cursor.value.tags;
//             datas.push(data);
//             cursor.continue();
//         }else{
//             // console.log(datas);
//             callback(datas);
//         }
//     }
// }
//
// function searchMedia(keywords,callback){
//     var objectStore = db.transaction('medias').objectStore('medias');
//     var jsons = [];
//     objectStore.openCursor().onsuccess = function (event) {
//         var cursor = event.target.result;
//         var sum =0;
//         var json = {};
//         if(cursor){
//             var status = false;
//             if(cursor.value.name.toString().indexOf(keywords)>-1||cursor.value.actor.toString().indexOf(keywords)>-1||cursor.value.tags.toString().indexOf(keywords)>-1||cursor.value.area.toString().indexOf(keywords)>-1||cursor.value.description.toString().indexOf(keywords)>-1||cursor.value.director.toString().indexOf(keywords)>-1||cursor.value.type.toString().indexOf(keywords)>-1){
//                 json.id = cursor.value.id;
//                 json.name = cursor.value.name;
//                 json.cover = cursor.value.cover;
//                 json.actor = cursor.value.actor;
//                 json.tags = cursor.value.tags;
//                 json.area = cursor.value.area;
//                 json.year = cursor.value.year;
//                 json.description = cursor.value.description;
//                 json.episode = cursor.value.episode;
//                 json.score = cursor.value.score;
//                 json.director = cursor.value.director;
//                 json.type = cursor.value.type;
//                 jsons.push(json);
//             }
//             sum = sum + 1;
//             cursor.continue();
//         }else{
//             // console.log(jsons);
//             callback(jsons);
//         }
//     };
// }
//
// function getListMedia(type,tag,callback){
//     var objectStore = db.transaction('medias').objectStore('medias');
//     var jsons = [];
//     objectStore.openCursor().onsuccess = function (event) {
//         var cursor = event.target.result;
//         var sum =0;
//         var json = {};
//         if(cursor){
//             var status = false;
//             if((tag==null||cursor.value.tags.toString().indexOf(tag)>-1)&&cursor.value.type.toString().indexOf(type)>-1){
//                 json.id = cursor.value.id;
//                 json.name = cursor.value.name;
//                 json.cover = cursor.value.cover;
//                 json.actor = cursor.value.actor;
//                 json.tags = cursor.value.tags;
//                 json.area = cursor.value.area;
//                 json.year = cursor.value.year;
//                 json.description = cursor.value.description;
//                 json.episode = cursor.value.episode;
//                 json.score = cursor.value.score;
//                 json.director = cursor.value.director;
//                 json.type = cursor.value.type;
//                 jsons.push(json);
//             }
//             sum = sum + 1;
//             cursor.continue();
//         }else{
//             callback(jsons);
//         }
//     };
// }
//
// function getMediaDetail(id,callback){
//     var objectStore = db.transaction('medias').objectStore('medias');
//     var json = {};
//     objectStore.openCursor().onsuccess = function (event) {
//         var cursor = event.target.result;
//         var sum =0;
//         if(cursor){
//             var status = false;
//             if(cursor.value.id.toString()==id){
//                 json.id = cursor.value.id;
//                 json.name = cursor.value.name;
//                 json.cover = cursor.value.cover;
//                 json.actor = cursor.value.actor;
//                 json.tags = cursor.value.tags;
//                 json.area = cursor.value.area;
//                 json.year = cursor.value.year;
//                 json.description = cursor.value.description;
//                 json.episode = cursor.value.episode;
//                 json.score = cursor.value.score;
//                 json.director = cursor.value.director;
//                 json.type = cursor.value.type;
//             }
//             cursor.continue();
//         }else{
//             callback(json);
//         }
//     };
// }
//
// function initShowMedia(type,page_count){
//     var objectStore = db.transaction('medias').objectStore('medias');
//     var jsons = [];
//     var sum =0;
//     var content_type = "";
//     content_type = content_type + "<div class=\"Hot_selection_style Channels\"><div class=\"Channels margintb\"><div class=\"title_name clearfix\">";
//     var str_type = "<i class=\"icon_title\"><img src=\"images/icon_film.png\" /></i>"+ type + "<span class=\"link_name\">" + "</span></div>";
//     content_type = content_type + str_type + "<div class=\"clearfix  \"><ul class=\"movie_list  clearfix\">";
//     var str_media = "";
//     objectStore.openCursor().onsuccess = function (event) {
//         var cursor = event.target.result;
//         var json = {};
//         if(cursor){
//             var status = false;
//             if(cursor.value.type==type){
//                 json.id = cursor.value.id;
//                 json.name = cursor.value.name;
//                 json.cover = cursor.value.cover;
//                 json.actor = cursor.value.actor;
//                 json.tags = cursor.value.tags;
//                 json.area = cursor.value.area;
//                 json.year = cursor.value.year;
//                 json.description = cursor.value.description;
//                 json.episode = cursor.value.episode;
//                 json.score = cursor.value.score;
//                 json.director = cursor.value.director;
//                 json.type = cursor.value.type;
//                 if(sum<page_count){
//                     // $("#ceshi").append(json.name.toString()+" sum : "+ sum+"----");
//                     var media = json;
//                     var actor = media.actor.length>=3?media.actor[0]+" "+media.actor[1]+" ...":media.actor[0]+" "+media.actor[1];
//                     str_media = str_media + "<li class=\"Case_info\">" +
//                         "<a href=\"Detail.html?id="+media.id+"\" class=\"movie_link\">" +
//                         "<img src=\"./images/"+media.cover+"\"  width=\"100%\"/>" +
//                         "<div class=\"movie_title\">" +
//                         "<i class=\"fraction\">"+media.score+"</i>" +
//                         "<p class=\"name\">"+media.name+"</p>" +
//                         "<h5>"+actor+"</h5>" +
//                         "<p class=\"content\">" +
//                         (media.description.length>50?media.description.substring(0,50)+"...":media.description) +
//                         "</p></div></a></li>";
//                     // $("#content").append(str_media);
//                 }
//                 sum = sum + 1;
//                 jsons.push(json);
//             }
//             cursor.continue();
//         }else{
//             $("#content").append(content_type+str_media+"</ul></div></div></div></div>");
//             // console.log("------"+jsons.length+"-------");
//         }
//     };
// }
//
// function initResult(datas){
//     $("#result").empty();
//     for(i in datas){
//         var data = datas[i];
//         var str = "<p>"+"name : "+data.name.toString()+" ; actor : "+data.actor.toString()+"<p>";
//         $("#result").append(""+str+"<br>");
//     }
// }
//
// function GetQueryString(name){
// 	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
// 	var r = window.location.search.substr(1).match(reg);
// 	if (r!=null)
// 		return unescape(r[2]);
// 	return null;
// }
//
// function initDetailPage(){
//     var id=GetQueryString("id");
//     var type="";
//     getAllConfigs(function(configs){
//         getMediaDetail(id,function (data) {
//             var item = data;
//             var typeid = "";
//             for(i in configs){
//                 if(configs[i].name==item.type){
//                     typeid = i;
//                 }
//             }
//             type = item.type;
//             var location_link = "<em></em><a href=\"index.html\">首页</a>  &lt;   <a href=\"list_page.html?type="+typeid+"\">"+item.type+"</a> &lt; <span>"+item.name+"</span>";
//             $("#location_link").empty().append(location_link);
//             $("#score").empty().append(item["score"]);
//             $("#name").empty().append(item["name"]);
//             var director = "";
//             for(i in item["director"]){
//                 director = director + "<span><a href=\"#\">"+ item["director"][i]+"</a></span>";
//             }
//             $("#director").empty().append("<label>导演：</label>"+director);
//             $("#year").empty().append("<label>年份：</label> <span><a href=\"#\">"+item["year"]+"</a></span>");
//             $("#description").empty().append(item["description"]);
//             $("#cover").attr("src","./images/"+item["cover"]);
//             $("#detail_link").attr("href","play.html?id="+item.id);
//             $("#actor").empty();
//             $("#tags").empty();
//             $("#area").empty();
//             $("#episode_title").empty().append("剧集");
//             $("#episode").empty();
//             var actor = "";
//             for(i in item["actor"]){
//                 actor = actor + "<span><a href=\"#\">"+item["actor"][i]+"</a></span>";
//             }
//             $("#actor").append("<label>主演：</label>"+actor);
//             var tags = "";
//             for(i in item["tags"]){
//                 tags = tags + "<span><a href=\"#\">"+item["tags"][i]+"</a></span>";
//             }
//             $("#tags").append("<label>类型：</label>"+tags);
//             var area = "";
//             for(i in item["area"]){
//                 area = area + "<span><a href=\"#\">"+item["area"][i]+"</a></span>";
//             }
//             $("#area").append("<label>地区：</label>"+area);
//             if(item["episode"].length>1)
//                 $("#episode_title").empty().append("剧集<p>（更新至"+item["episode"].length+"集）</p>");
//             var episode = "";
//             for(i in item["episode"]){
//                 episode = episode + "<li><a href=\"play.html?id="+item.id+"\" class=\"\">"+(parseInt(i)+ 1 )+"</a></li>";
//             }
//             $("#episode").append("<ul class=\"diversity_list\">"+episode+"</ul>");
//         })
//     })
//     recommend(type);
//     // var num=GetQueryString("num");
//     // if(type!=null&&num!=null){
//     //     $.getJSON("./data/data.json",function(datas){
//     //         var item;
//     //         var type_name = "";
//     //         for(i in datas){
//     //             var data = datas[i];
//     //             if(data.type==type)
//     //                 item = data.media[num];
//     //         }
//     //         $.getJSON("./data/configs.json",function (datas) {
//     //         	var types = datas.types;
//     //             var location_link = "<em></em><a href=\"index.html\">首页</a>  &lt;   <a href=\"list_page.html?type="+type+"\">"+types[type].name+"</a> &lt; <span>"+item["name"]+"</span>";
//     //             $("#location_link").empty().append(location_link);
//     //             type_name = types[type].name;
//     //             $(document).attr("title",type_name + "-"+item["name"]);
//     //             var configs_type = datas.types;
//     //             // var str_type = "<a href=\"javascript:void(0)\" values2=\"\" values1=\"\" attrval=\"全部\" class=\"selected\">全部</a>";
//     //             // var str_channel = "";
//     //             var str_channel_nav = "";
//     //             for(i in configs_type){
//     //                 str_channel_nav = str_channel_nav + "<li class=\"Channel_color split_line\"><a href=\"list_page.html?type="+i+"\" ><i class=\"icon_TV\"></i>"+configs_type[i].name+"</a></li>";
//     //             }
//     //             $("#channel_nav_list").empty().append("<ul class=\" clearfix\">"+str_channel_nav+"</ul>");
//     //         })
//     //         $("#score").empty().append(item["score"]);
//     //         $("#name").empty().append(item["name"]);
//     //         var director = "";
//     //         for(i in item["director"]){
//     //             director = director + "<span><a href=\"#\">"+ item["director"][i]+"</a></span>";
//     //         }
//     //         $("#director").empty().append("<label>导演：</label>"+director);
//     //         $("#year").empty().append("<label>年份：</label> <span><a href=\"#\">"+item["year"]+"</a></span>");
//     //         $("#description").empty().append(item["description"]);
//     //         $("#cover").attr("src","./images/"+item["cover"]);
//     //         $("#actor").empty();
//     //         $("#tags").empty();
//     //         $("#area").empty();
//     //         $("#episode_title").empty().append("剧集");
//     //         $("#episode").empty();
//     //         var actor = "";
//     //         for(i in item["actor"]){
//     //             actor = actor + "<span><a href=\"#\">"+item["actor"][i]+"</a></span>";
//     //         }
//     //         $("#actor").append("<label>主演：</label>"+actor);
//     //         var tags = "";
//     //         for(i in item["tags"]){
//     //             tags = tags + "<span><a href=\"#\">"+item["tags"][i]+"</a></span>";
//     //         }
//     //         $("#tags").append("<label>类型：</label>"+tags);
//     //         var area = "";
//     //         for(i in item["area"]){
//     //             area = area + "<span><a href=\"#\">"+item["area"][i]+"</a></span>";
//     //         }
//     //         $("#area").append("<label>地区：</label>"+area);
//     //         if(item["episode"].length>1)
//     //             $("#episode_title").empty().append("剧集<p>（更新至"+item["episode"].length+"集）</p>");
//     //         var episode = "";
//     //         for(i in item["episode"]){
//     //             episode = episode + "<li><a href=\"play.html?type="+type+"&num="+num+"&episode="+i+"\" class=\"\">"+(parseInt(i)+ 1 )+"</a></li>";
//     //         }
//     //         $("#episode").append("<ul class=\"diversity_list\">"+episode+"</ul>");
//     //     })
//     // }
// }
//
// function initIndexPage(){
//     getAllConfigs(function(configs){
//         var content_title = "<div class=\"home_Column_style\"><div class=\"Column_list clearfix \"><ul class=\"\"><li class=\"Channel_name\"><a href=\"index.html\" ><i class=\"icon_TV\"></i>首页</a></li>";
//         var content_type = "";
//         var str_media = "";
//         var datas = [];
//         for(i in configs){
//             var type = configs[i];
//             var str_column = "";
//             content_title = content_title + "<li class=\"Channel_name"+type.id+"\"><a href=\"list_page.html?type="+type.id+"\" ><i class=\"icon_TV\"></i>"+type.name+"</a></li>";
//             content_type = content_type + "<div class=\"Channels margintb\"><div class=\"title_name clearfix\">";
//              var str_type = "<i class=\"icon_title\"><img src=\"images/icon_film.png\" /></i>"+ type.name + "<span class=\"link_name\">" + "</span></div>";
//
//             content_type = content_type + str_type + "<div class=\"clearfix  \"><ul class=\"movie_list  clearfix\">";
//             var name = type.name;
//             initShowMedia(name,14);
//             content_type = content_type + str_media + "</ul></div></div></div>"
//         }
//         content_title = content_title + "</ul></div></div>";
//         $("#content").empty().append(content_title);
//
//     })
//     // $.getJSON("./data/data.json",function(datas){
//     //     $.getJSON("./data/configs.json",function (data_types) {
//     //         var datas_types = data_types.types;
//     //         var content = "";
//     //         var column = "<div class=\"home_Column_style\"><div class=\"Column_list clearfix navigation_list\"><ul class=\"\"><li class=\"Channel_name\"><a href=\"index.html\" ><i class=\"icon_TV\"></i>首页</a></li>";
//     //         var str_column = "";
//     //         for(m in datas_types){
//     //             str_column = str_column + "<li class=\"Channel_name"+m+"\"><a href=\"list_page.html?type="+m+"\" ><i class=\"icon_TV\"></i>"+datas_types[m].name+"</a></li>";
//     //         }
//     //         column = column + str_column;
//     //         var colum2 = "<div class=\"Column_list navigation\">" +
//     //             "<a href=\"#\" class=\"w_logo\"><img src=\"images/logo.png\"  width=\"100%\"/></a>" +
//     //             "<div class=\"navigatio_name\">" +
//     //             "<a href=\"javascript:\" class=\"mouse-enter\"><i class=\"icon_navigatio\"></i>导航</a>" +
//     //             "<div class=\"navigatio_nav\">" +
//     //             "<ul class=\" clearfix\">" +
//     //             str_column+
//     //             "</ul></div></div></div>";
//     //         colum2 = "";
// 	// 		for(i in datas){
// 	// 			var data = datas[i];
// 	// 			content = content + "<div class=\"Channels margintb\"><div class=\"title_name clearfix\">";
// 	// 			var type = "";
// 	// 			for(j in datas_types){
// 	// 			    if(j==data.type){
//     //                     var types = datas_types[j];
//     //                     type = "<i class=\"icon_title\"><img src=\"images/icon_film.png\" /></i>"+ types.name + "<span class=\"link_name\">";
//     //                     var str = "";
//     //                     for(m in types.tags){
//     //                         str = str + (m==0?"":"|") + types.tags[m];
//     //                     }
//     //                     type = type + "</span></div>";
//     //                 }
//     //             }
//     //             content = content + type + "<div class=\"clearfix  \"><ul class=\"movie_list  clearfix\">";
// 	// 			var str_media = "";
// 	// 			for(m in data.media){
// 	// 			    var media = data.media[m];
// 	// 			    var actor = media.actor.length>=3?media.actor[0]+" "+media.actor[1]+" ...":media.actor[0]+" "+media.actor[1];
// 	// 			    str_media = str_media + "<li class=\"Case_info\">" +
//     //                     "<a href=\"Detail.html?type="+data.type+"&num="+m+"\" class=\"movie_link\">" +
//     //                     "<img src=\"./images/"+media.cover+"\"  width=\"100%\"/>" +
//     //                     "<div class=\"movie_title\">" +
//     //                     "<i class=\"fraction\">"+media.score+"</i>" +
//     //                     "<p class=\"name\">"+media.name+"</p>" +
//     //                     "<h5>"+actor+"</h5>" +
//     //                     "<p class=\"content\">" +
//     //                     (media.description.length>50?media.description.substring(0,50)+"...":media.description) +
//     //                     "</p></div></a></li>";
//     //             }
//     //             content = content + str_media + "</ul></div></div></div>"
// 	// 		}
//     //         column = column + "</ul></div>"+colum2+"</div>";
// 	// 		$("#content").empty().append(column+content);
//     //     })
//     // })
// }
//
// function initListPaging(){
//     var typeid=GetQueryString("type");
//     var page=GetQueryString("page");
//     var tag=GetQueryString("tag");
//     // type="电影";
//     getAllConfigs(function(configs){
//         var str_channel = "";
//         var str_channel_nav = "";
//         for(i in configs){
//             str_channel = str_channel + "<li class=\"Channel_name"+i+"\"><a href=\"list_page.html?type="+i+"\">" +
//                 // "<i class=\"icon_TV\"></i>" +
//                 ""+configs[i].name+"</a></li>";
//         }
//         $("#channel_list").empty().append(str_channel);
//         var type = configs[typeid].name;
//         var str_type = "<a href=\"list_page.html?type="+typeid+"\" values=\"\" values=\"\" attrval=\"全部\" class=\""+(tag==null?"selected":"")+"\">全部</a>";
//         for(i in configs[typeid].tags){
//             str_type = str_type + "<a href=\"list_page.html?type="+typeid+"&tag="+i+"\" class='"+(tag!=null&&tag==i?"selected":"")+"' values=\"\"+i+\"\" values=\""+i+"\" attrval=\""+configs[typeid].tags[i]+"\" >"+configs[typeid].tags[i]+"</a>";
//         }
//         var tag_new = null;
//         if(tag!=null)
//             tag_new = configs[typeid].tags[tag];
//         $("#type_name").empty().append(type);
//         $("#configs_type").empty().append(str_type);
//         getListMedia(type,tag_new,function(datas){
//             var page_now = 1;
//             total_page = Math.ceil(datas.length/page_count);
//             if(page!=null&&page!=undefined)
//                 page_now = parseInt(page);
//             var str_list = "<ul class=\"clearfix\">";
//             for(var i=0;i<page_count;i++){
//                 var media = datas[(i+(page_now-1)*page_count)];
//                 if(media!=null)
//                     str_list = str_list + "<li class=\"movie_theme\">" +
//                         // "<i class=\"icon_b rb_ico\"></i>" +
//                         "<a href=\"Detail.html?id="+media.id+"\" class=\"movie_img\">" +
//                         "<img src=\"./images/"+media.cover+"\"  width=\"183px;\"/>" +
//                         "<span class=\"v_title\">" +
//                         "<em>"+(media.episode.length>1?"更新至"+media.episode.length+"集":"")+"</em><i class=\"fraction\">"+media.score+"分</i>" +
//                         "</span>" +
//                         "</a>" +
//                         "<div class=\"movie_title\">" +
//                         "<p class=\"movie_name\"><a href=\"Detail.html?id="+media.id+"\" class=\"name\">"+media.name+"</a><span class=\"status\"></span></p>" +
//                         "<p class=\"Description\">"+(media.description.length>20?media.description.substring(0,20)+"...":media.description)+"</p>" +
//                         "</div></li>";
//             }
//             str_list = str_list + "</ul>";
//             $("#medias_list").empty().append(str_list);
//             var content_page = "<div class=\"Paging\">" +
//                 "<a href=\"javascript:void(0)\" class=\"pn-prev disabled\" onclick='changePage(\"index\")'>首页</a>" +
//                 "<a href=\"javascript:void(0)\" class=\"pn-prev disabled\" onclick='changePage(\"pre\")'>&lt;上一页</a>" +
//                 // "<a href=\"\" class=\"disabled\" disabled='disabled'>"+page_now+"</a>" +
//                 "<a href=\"javascript:void(0)\" onclick='changePage(\"next\")'>下一页&gt;</a>" +
//                 "<a href=\"javascript:void(0)\" onclick='changePage(\"end\")'>尾页</a>" +
//                 "</div>";
//             $("#medias_list").append(content_page);
//         })
//     })
//
// }
//
// function initSearchPaging(){
//     var keywords=GetQueryString("keywords");
//     var page=GetQueryString("page");
//     getAllConfigs(function(configs){
//         var str_channel = "";
//         var str_channel_nav = "";
//         for(i in configs){
//             str_channel = str_channel + "<li class=\"Channel_name"+i+"\"><a href=\"list_page.html?type="+i+"\">" +
//                 ""+configs[i].name+"</a></li>";
//         }
//         $("#channel_list").empty().append(str_channel);
//         $("#type_name").empty().append("\""+decodeURI(decodeURI(keywords))+"\" 搜索结果");
//         searchMedia(decodeURI(decodeURI(keywords)),function(datas){
//             var page_now = 1;
//             total_page = Math.ceil(datas.length/page_count);
//             if(page!=null&&page!=undefined)
//                 page_now = parseInt(page);
//             var str_list = "<ul class=\"clearfix\">";
//             for(var i=0;i<page_count;i++){
//                 var media = datas[(i+(page_now-1)*page_count)];
//                 if(media!=null)
//                     str_list = str_list + "<li class=\"movie_theme\">" +
//                         // "<i class=\"icon_b rb_ico\"></i>" +
//                         "<a href=\"Detail.html?id="+media.id+"\" class=\"movie_img\">" +
//                         "<img src=\"./images/"+media.cover+"\"  width=\"183px;\"/>" +
//                         "<span class=\"v_title\">" +
//                         "<em>"+(media.episode.length>1?"更新至"+media.episode.length+"集":"")+"</em><i class=\"fraction\">"+media.score+"分</i>" +
//                         "</span>" +
//                         "</a>" +
//                         "<div class=\"movie_title\">" +
//                         "<p class=\"movie_name\"><a href=\"Detail.html?id="+media.id+"\" class=\"name\">"+media.name+"</a><span class=\"status\"></span></p>" +
//                         "<p class=\"Description\">"+(media.description.length>20?media.description.substring(0,20)+"...":media.description)+"</p>" +
//                         "</div></li>";
//             }
//             str_list = str_list + "</ul>";
//             $("#medias_list").empty().append(str_list);
//             var content_page = "<div class=\"Paging\">" +
//                 "<a href=\"javascript:void(0)\" class=\"pn-prev disabled\" onclick='changePage(\"index\")'>首页</a>" +
//                 "<a href=\"javascript:void(0)\" class=\"pn-prev disabled\" onclick='changePage(\"pre\")'>&lt;上一页</a>" +
//                 // "<a href=\"\" class=\"disabled\" disabled='disabled'>"+page_now+"</a>" +
//                 "<a href=\"javascript:void(0)\" onclick='changePage(\"next\")'>下一页&gt;</a>" +
//                 "<a href=\"javascript:void(0)\" onclick='changePage(\"end\")'>尾页</a>" +
//                 "</div>";
//             $("#medias_list").append(content_page);
//         })
//     })
//
// }
//
// function changePage(type){
//     var typeid=GetQueryString("type");
//     var page=GetQueryString("page");
//     var tag=GetQueryString("tag");
//     var keywords = GetQueryString("keywords");
//     var url = keywords==null?"list_page.html?":"search_page.html?";
//     if(typeid!=null)
//         url = url + "type="+typeid;
//     if(tag!=null)
//         url = url + (url.indexOf("=")>-1?"&":"") + "tag="+tag;
//     if(keywords!=null) {
//         keywords = decodeURI(decodeURI(keywords));
//         url = url + (url.indexOf("=") > -1 ? "&" : "") + "keywords=" + encodeURI(encodeURI(keywords));
//     }
//     switch (type) {
//         case "index":
//             page = page ==null?"1":page;
//             if(page!="1"){
//                 url = url + (url.indexOf("=")>-1?"&":"") + "page="+1;
//                 window.location.href = url;
//             }
//             break;
//         case "pre":
//             if(page!=null&&page!="1"){
//                 url = url + (url.indexOf("=")>-1?"&":"") + "page="+(parseInt(page)-1);
//                 window.location.href = url;
//             }
//             break;
//         case "next":
//             page = page ==null?1:parseInt(page);
//             if(page<total_page){
//                 url = url + (url.indexOf("=")>-1?"&":"") + "page="+(parseInt(page)+1);
//                 window.location.href = url;
//             }
//             break;
//         case "end":
//             page = page ==null?1:parseInt(page);
//             if(page!=total_page){
//                 url = url + (url.indexOf("=")>-1?"&":"") + "page="+total_page;
//                 window.location.href = url;
//             }
//             break;
//     }
// }
//
// function initListPage(){
//     var type=GetQueryString("type");
//     if(type!=null) {
//         $.getJSON("./data/data.json", function (datas) {
//             $.getJSON("./data/configs.json",function(configs){
//                 var configs_type = configs.types;
//                 var configs_area = configs.areas;
//                 var str_type = "<a href=\"javascript:void(0)\" values2=\"\" values1=\"\" attrval=\"全部\" class=\"selected\">全部</a>";
//                 var str_area = "<a href=\"javascript:void(0)\" values2=\"\" values1=\"\" attrval=\"全部\" class=\"selected\">全部</a>";
//                 for(i in configs_area){
//                     str_area = str_area + "<a href=\"javascript:void(0)\" values2=\"\"+i+\"\" values1=\""+i+"\" attrval=\""+configs_area[i]+"\" >"+configs_area[i]+"</a>";
//                 }
//                 var str_channel = "";
//                 var str_channel_nav = "";
//                 for(i in configs_type){
//                     str_channel = str_channel + "<li class=\"Channel_name"+i+"\"><a href=\"list_page.html?type="+i+"\">" +
//                         // "<i class=\"icon_TV\"></i>" +
//                         ""+configs_type[i].name+"</a></li>";
//                     str_channel_nav = str_channel_nav + "<li class=\"Channel_color split_line\"><a href=\"list_page.html?type="+i+"\" ><i class=\"icon_TV\"></i>"+configs_type[i].name+"</a></li>";
//                 }
//                 $("#channel_list").empty().append(str_channel);
//                 $("#channel_nav_list").empty().append("<ul class=\" clearfix\">"+str_channel_nav+"</ul>");
//                 for(i in configs_type[type].tags){
//                     str_type = str_type + "<a href=\"javascript:void(0)\" values2=\"\"+i+\"\" values1=\""+i+"\" attrval=\""+configs_type[type].tags[i].name+"\" >"+configs_type[type].tags[i].name+"</a>";
//                 }
//                 $("#configs_type").empty().append(str_type);
//                 $("#configs_area").empty().append(str_area);
//                 $("#type_name").empty().append(configs_type[type].name);
//             })
//             for(i in datas){
//                 if(datas[i].type==type){
//                     var medias = datas[i].media;
//                     var str_list = "<ul class=\"clearfix\">";
//                     for(m in medias){
//                         str_list = str_list + "<li class=\"movie_theme\">" +
//                             // "<i class=\"icon_b rb_ico\"></i>" +
//                             "<a href=\"Detail.html?type="+type+"&num="+m+"\" class=\"movie_img\">" +
//                             "<img src=\"./images/"+medias[m].cover+"\"  width=\"183px;\"/>" +
//                             "<span class=\"v_title\">" +
//                             "<em>"+(medias[m].episode.length>1?"更新至"+medias[m].episode.length+"集":"")+"</em><i class=\"fraction\">"+medias[m].score+"分</i>" +
//                             "</span>" +
//                             "</a>" +
//                             "<div class=\"movie_title\">" +
//                             "<p class=\"movie_name\"><a href=\"Detail.html?type="+type+"&num="+m+"\" class=\"name\">"+medias[m].name+"</a><span class=\"status\"></span></p>" +
//                             "<p class=\"Description\">"+(medias[m].description.length>20?medias[m].description.substring(0,20)+"...":medias[m].description)+"</p>" +
//                             "</div></li>";
//                     }
//                     str_list = str_list + "</ul>";
//                     $("#medias_list").empty().append(str_list);
//                 }
//             }
//         })
//     }
// }
//
// function initPlayPage(){
//     var id=GetQueryString("id");
//     var episode=GetQueryString("episode");
//     var type = "";
//     getAllConfigs(function(configs) {
//         getMediaDetail(id, function (data) {
//             var item = data;
//             var typeid = "";
//             for (i in configs) {
//                 if (configs[i].name == item.type) {
//                     typeid = i;
//                 }
//             }
//             var location_link = "<em></em><a href=\"index.html\">首页</a>  &lt;   <a href=\"list_page.html?type=" + typeid + "\">" + item.type + "</a> &lt; <span>" + item.name + "</span>";
//             type = item.type;
//             $("#location_link").empty().append(location_link);
//             var str = "";
//             for(i in item.tags){
//                 if(i<3) {
//                     str = str + "<span class=\"label_name\"><a href=\"javascript:void(0)\">" + (i==2?"...":item.tags[i]) + "</a></span>";
//                 }
//             }
//             $("#play_title").empty().append(item["name"] +" " + str);
//             $("#play_cover").attr("src","./images/"+item.cover);
//             $("#play_name").empty().append(item.name);
//             var director = "";
//             for(i in item.director){
//                 director = director + "<span class=\"l_f\"><a href=\"#\">"+ item.director[i]+"</a></span>";
//             }
//             $("#play_director").empty().append("<label>导演：</label>"+director);
//             str = "";
//             for(i in item.tags){
//                 if(i<3)
//                     str = str + "<span class=\"l_f\"><a href=\"javascript:void(0)\">"+(i==2?"...":item.tags[i])+"</a></span>";
//             }
//             $("#play_tags").empty().append("<label>类型：</label>"+str);
//             str = "";
//             for(i in item.area){
//                 if(i<3)
//                     str = str + "<span class=\"l_f\"><a href=\"#\">"+(i==2?"...":item.area[i])+"</a></span>";
//             }
//             $("#play_area").empty().append("<label>地区：</label>"+str);
//             // console.log(item.description);
//             $("#play_description").empty().append("<label>简介：</label>"+item.description);
//             str = "";
//             for(i in item.actor){
//                 if(i<3)
//                     str = str + "<a href=\"#\">"+(i==2?"...":item.actor[i])+"</a></span>";
//             }
//             $("#play_actor").empty().append("<label>主演：</label><span class=\"l_f\">"+str+"</span>");
//             str = "";
//             for(i in item.episode){
//                 str = str + "<li id=\"vli_0\" onclick=\"playvideo(0)\" class=\"volume "+((i==episode&&episode!=null)||(i==0&&episode==null)?"selected":"")+"\"><a href=\"play.html?id="+item.id+"&episode="+i+"\" title=\""+item.name+"\" rseat=\"sht_1\">"+(parseInt(i)+1)+"</a></li>";
//             }
//             $("#play_list").empty().append(str);
//             if(episode==null)
//                 episode = 0;
//             // str = "<video src=\"http://localhost:8080/ipfs/"+item.episode[episode]+"\" controls=\"controls\" autoplay=\"autoplay\" style=\"width:100%;height:100%;\" webkit-playsinline>" +
//             //     "您的浏览器不支持 video 标签。\n" +
//             //     "</video>";
//             // str = "<video src=\"http://localhost:8080/ipfs/QmRrqrRRycqXykSCUuaM9rmdBZqCE7ZWbfrNJa8sC4SLuh\" controls=\"controls\" autoplay=\"autoplay\" style=\"width:100%;height:100%;\" webkit-playsinline>" +
//             //     "您的浏览器不支持 video 标签。\n" +
//             //     "</video>";
//             // $("#play_video").empty().append(str);
//             $("#play_video").empty();
//             var cover = "./images/"+item.cover;
//             var src = "http://localhost:8080/ipfs/"+item.episode[episode];
//             // console.log(src);
//             var videoObject = {
//                 container: '#play_video', //容器的ID或className
//                 variable: 'player',//播放函数名称
//                 poster:cover,//封面图片
//                 // autoLoad:true,
//                 video: [//视频地址列表形式
//                     [src, 'video/mp4', '超清', 0]
//                 ]
//             };
//             var player = new ckplayer(videoObject);
//             player.embed()
//         })
//     })
//     recommend(type);
//
//     // var type=GetQueryString("type");
//     // var num=GetQueryString("num");
//     // var episode = GetQueryString("episode");
//     // if(type!=null&&num!=null){
//     //     $.getJSON("./data/data.json",function(datas){
//     //         var item;
//     //         var type_name = "";
//     //         for(i in datas){
//     //             var data = datas[i];
//     //             if(data.type==type)
//     //                 item = data.media[num];
//     //         }
//     //         $.getJSON("./data/configs.json",function (datas) {
//     //             var types = datas.types;
//     //             var location_link = "<em></em><a href=\"index.html\">首页</a>  &lt;   <a href=\"list_page.html?type="+type+"\">"+types[type].name+"</a> &lt; <span>"+item["name"]+"</span>";
//     //             $("#location_link").empty().append(location_link);
//     //             type_name = types[type].name;
//     //             $(document).attr("title",type_name + "-"+item["name"]);
//     //             var str = "";
//     //             for(i in item.tags){
//     //                 str = str + "<span class=\"label_name\"><a href=\"#\">"+item.tags[i]+"</a></span>";
//     //             }
//     //             $("#play_title").empty().append(item["name"] +" " + str);
//     //             $("#play_cover").attr("src","./images/"+item.cover);
//     //             $("#play_name").empty().append(item.name);
//     //             var director = "";
//     //             for(i in item.director){
//     //                 director = director + "<span class=\"l_f\"><a href=\"#\">"+ item.director[i]+"</a></span>";
//     //             }
//     //             $("#play_director").empty().append("<label>导演：</label>"+director);
//     //             str = "";
//     //             for(i in item.tags){
//     //                 str = str + "<span class=\"l_f\"><a href=\"#\">"+item.tags[i]+"</a></span>";
//     //             }
//     //             $("#play_tags").empty().append("<label>类型：</label>"+str);
//     //             str = "";
//     //             for(i in item.area){
//     //                 str = str + "<span class=\"l_f\"><a href=\"#\">"+item.area[i]+"</a></span>";
//     //             }
//     //             $("#play_area").empty().append("<label>地区：</label>"+str);
//     //             str = "";
//     //             for(i in item.actor){
//     //                 str = str + "<a href=\"#\">"+item.actor[i]+"</a></span>";
//     //             }
//     //             $("#play_actor").empty().append("<label>主演：</label><span class=\"l_f\">"+str+"</span>");
//     //             str = "";
//     //             for(i in item.episode){
//     //                 str = str + "<li id=\"vli_0\" onclick=\"playvideo(0)\" class=\"volume "+((i==episode&&episode!=null)||(i==0&&episode==null)?"selected":"")+"\"><a href=\"play.html?type="+type+"&num="+num+"&episode="+i+"\" title=\""+item.name+"\" rseat=\"sht_1\">"+(parseInt(i)+1)+"</a></li>";
//     //             }
//     //             $("#play_list").empty().append(str);
//     //             if(episode==null)
//     //                 episode = 0;
//     //             str = "<video src=\"http://localhost:8080/ipfs/"+item.episode[episode]+"\" controls=\"controls\" autoplay=\"autoplay\" style=\"width:100%;height:100%;\" webkit-playsinline>" +
//     //                 "您的浏览器不支持 video 标签。\n" +
//     //                 "</video>";
//     //             str = "<video src=\"http://localhost:8080/ipfs/QmRrqrRRycqXykSCUuaM9rmdBZqCE7ZWbfrNJa8sC4SLuh\" controls=\"controls\" autoplay=\"autoplay\" style=\"width:100%;height:100%;\" webkit-playsinline>" +
//     //                 "您的浏览器不支持 video 标签。\n" +
//     //                 "</video>";
//     //             $("#play_video").empty().append(str);
//     //         })
//     //     })
//     // }
// }
