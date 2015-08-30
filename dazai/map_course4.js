"use strict"

//コース1のスポットの文字列配列,名前か住所
var course1 = [
	"青森駅",
	"青函連絡船メモリアル シップ八甲田丸",
	"青森県青森市安方１丁目１",
	"青森県観光物産館アスパム"
];

//位置情報と表示データの組み合わせ
var data = new Array();
	data.push({ position:new google.maps.LatLng(40.828713, 140.734682) , content:'青森駅',icon:"pin/pin_a.png"});
	data.push({ position:new google.maps.LatLng(40.831624, 140.736385) ,content:'八甲田丸周辺',icon:"pin/pin_b.png"});							//八甲田丸周辺
	data.push({ position:new google.maps.LatLng(40.830260, 140.735127) , content:'A-FACTORY',icon:"pin/pin_c.png"});							//a-factory
	data.push({ position: new google.maps.LatLng(40.830792, 140.736231),content:'青森ラブリッジ',icon:"pin/pin_d.png"});						//ラブリッジ
	data.push({ position:new google.maps.LatLng(40.829496, 140.743653),content:'青い海公園',icon:"pin/pin_e.png"});								//青い海公園
	data.push({ position:new google.maps.LatLng(40.829174, 140.745385),content:'聖徳公園',icon:"pin/pin_f.png"});								//聖徳公園
	data.push({ position:new google.maps.LatLng(40.830335,140.745538),content:'青森港新中央埠頭',icon:"pin/pin_g.png"});						//青森港新中央埠頭
	data.push({ position:new google.maps.LatLng(40.829503,140.747592),content:'浜町桟橋跡地',icon:"pin/pin_h.png"});							//浜町桟橋跡地
	data.push({ position:new google.maps.LatLng(40.828478, 140.748212),content:'青森製氷（株）',icon:"pin/pin_i.png"});							//青森製氷
	data.push({ position:new google.maps.LatLng(40.829347, 140.751304),content:'青森市公会堂跡（現・しあわせプラザ）',icon:"pin/pin_j.png"});	//青森市公会堂跡（現・しあわせプラザ）
	data.push({ position:new google.maps.LatLng(40.825222, 140.755404),content:'ホテル青森',icon:"pin/pin_k.png"});								//ホテル青森
	data.push({ position:new google.maps.LatLng(40.828121, 140.747416),content:'おもたか跡地',icon:"pin/pin_l.png"});							//おもだか跡地
	data.push({ position:new google.maps.LatLng(40.825369, 140.746718),content:'太宰下宿跡地',icon:"pin/pin_m.png"});							//太宰下宿跡地
	data.push({ position:new google.maps.LatLng(40.826431, 140.755521),content:'スマイル＆スプーンキッチンスタジオ',icon:"pin/pin_n.png"});		//スマイル＆スプーンキッチンスタジオ
	data.push({ position:new google.maps.LatLng(40.826535, 140.760442),content:'旭橋',icon:"pin/pin_o.png"});									//旭橋
	data.push({ position: new google.maps.LatLng(40.829941, 140.778934),content:'合浦公園',icon:"pin/pin_p.png"});								//合浦公園
	data.push({ position: new google.maps.LatLng(40.827648,140.777107),content:'旧制・青森中学校跡地',icon:"pin/pin_q.png"});					//旧制・青森中学校跡地
	data.push({ position: new google.maps.LatLng(40.829735,140.778357),content:'合浦公園西口への道',icon:"pin/pin_r.png"});						//合浦公園西口への道
	data.push({ position: new google.maps.LatLng(40.829327, 140.776723),content:'Coquelicot',icon:"pin/pin_s.png"});							//Coquelicot(コクリコ)

var direction = new google.maps.DirectionsService();
var renderer = new google.maps.DirectionsRenderer();

//出発地点と目的地点、ルーティングの種類の設定
var request = {
	origin : "青森駅",
	destination : " 青森県青森市柳川１丁目４-２",
	travelMode : google.maps.DirectionsTravelMode.WALKING
};


//マーカー用の配列
var marker = [];

google.maps.event.addDomListener(window, 'load', function() {
	
	//マーカーをクリックすると、情報ウィンドウがだすための関数
	function attachMessage(marker, msg) {
	    google.maps.event.addListener(marker, 'click', function(event) {
	      new google.maps.InfoWindow({
	        content: msg
	      }).open(marker.getMap(), marker);
	    });
	}
	
	//マップ中央の座標
	var lat = 40.827852;
	var lng = 140.740273;
	
	//マップのオプション
	var mapOptions = {
		zoom: 14,
		center: new google.maps.LatLng(lat, lng),
		mapTypeId: google.maps.MapTypeId.ROADMAP, 
    	scaleControl: true 
	};
	
	var mapObj = new google.maps.Map(document.getElementById('gmap'), mapOptions);
	
	var style =[{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"simplified"},{"lightness":20}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"simplified"},{"lightness":20},{"hue":"#007bff"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"visibility":"simplified"},{"color":"#929292"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"color":"#D9EDC5"}]},{"featureType":"poi.school","elementType":"geometry.fill","stylers":[{"color":"#f2e5c1"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#386FAB"}]},{"featureType":"road","elementType":"labels.text","stylers":[{"saturation":"-100"},{"visibility":"on"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#A0BDDD"},{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#7FA6CF"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.fill","stylers":[{"invert_lightness":true},{"color":"#336396"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#003e7e"}]},{"featureType":"road.highway.controlled_access","elementType":"labels.text","stylers":[{"invert_lightness":true},{"lightness":"16"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#D2E5F9"},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#6699D0"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#B0C1D3"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"visibility":"on"},{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"on"},{"lightness":40}]},{"featureType":"water","elementType":"all","stylers":[{"lightness":20},{"hue":"#007fff"}]}]

	var samplestyleOptions = {
    	name: "スタイル"
  	};
	
	var sampleMapType = new google.maps.StyledMapType(style,samplestyleOptions);
	
	mapObj.mapTypes.set('simple', sampleMapType);
	mapObj.setMapTypeId('simple');
	
	var geocoder = new google.maps.Geocoder();
	
	//マーカーの設定
	var i;
	for (i = 0; i < data.length; i++) {
    var myMarker = new google.maps.Marker({
      position: data[i].position,
      map: mapObj,
      icon:data[i].icon
    });
    
    attachMessage(myMarker, data[i].content);
    }

    /*function searchLongRoute(waypoints) {
	var route;
	var unit = 10;
	var unit_num = Math.ceil((waypoints.length+Math.ceil(waypoints.length/unit)-1)/unit);
 	
	for (var start_num = 0; start_num < waypoints.length-1;) {
		var s = waypoints[start_num];
		var next_start = ((waypoints.length>=start_num+unit)?(start_num+unit):(waypoints.length))-1;
		var e = waypoints[next_start];
		var w = waypoints.slice(start_num+1, next_start);
		direction.route({
			'origin': s.location,
			'destination': e.location,
			'travelMode': google.maps.DirectionsTravelMode.WALKING,
			'waypoints': w,
			'avoidHighways': true,
			'avoidTolls': true
	}, function(ret, st){
	if (st == google.maps.DirectionsStatus.OK) {
	if (route) {
		route.routes[0].legs = route.routes[0].legs.concat(ret.routes[0].legs);
		route.routes[0].overview_path = route.routes[0].overview_path.concat(ret.routes[0].overview_path);
		route.routes[0].bounds = route.routes[0].bounds.extend(ret.routes[0].bounds.getNorthEast());
		route.routes[0].bounds = route.routes[0].bounds.extend(ret.routes[0].bounds.getSouthWest());
	} else {
		route = ret;
	}
	} else {
		console.log(st);
	}
	if (!--unit_num) {
		renderer.setMap(mapObj);
		renderer.setDirections(route);
	}
	});
	start_num = next_start;
	}
}
    
	searchLongRoute(waypoints);*/
});

/*
コース①
１．青森駅出発＊　　　　　　　　　７．太宰下宿跡地＊
２．八甲田丸周辺＊　　　 　　　 　８．おもだか跡地＊
３．ラブリッジ　　　　　　　　　　９．倉庫跡地＊ 40.829137, 140.747321
４．青い海公園　　　　　　　　　　１０．製氷工場跡地＊ 青森製氷（株）
５．聖徳公園　　　　　　　　　　　１１．旭橋＊
６．喫茶店マロン　　　　　　　　　１２．ホテル青森
　　　　　　　　　　　　　　　　　１３．Ａ・ファクトリー
　　　　　　　　　　　　　　　　　
　　　　　　　　　　　　　　　　　
	{ location:"青函連絡船メモリアル シップ八甲田丸"},							//八甲田丸周辺
	{ location:new google.maps.LatLng(40.830792, 140.736231)},					//ラブリッジ
	{ location: new google.maps.LatLng(40.829496, 140.743653)},					//青い海公園
	{ location:"青森市安方2－14"},												//聖徳公園
	{ location:"青森県青森市安方2-6-7"},										//喫茶店マロン
	{ location:new google.maps.LatLng(40.825369, 140.746718)},					//太宰下宿跡地
	{ location:new google.maps.LatLng(40.828128, 140.747530)},					//おもだか跡地
	{ location:"青森県青森市本町3丁目4"},										//製氷工場跡地
	{ location:"青森県青森市堤町1丁目１-23"}									//ホテル青森
	

    青森駅
    合浦公園
    旧制・青森中学校跡地
    合浦公園西口への道
    Coquelicot(コクリコ)
    旭橋
    スマイル＆スプーンキッチンスタジオ
    おもだか跡地
    太宰治下宿跡地
    ホテル青森
    青森市公会堂跡地(現・しあわせプラザ)
    青森製氷
    浜町桟橋跡地
    聖徳公園
    青い海公園
    青森ラブリッジ
    八甲田丸周辺
    A-FACTORY

	
*/

