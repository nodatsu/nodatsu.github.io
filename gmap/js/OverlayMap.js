/*
Copyright 2012 - Rail & Bikes - http://hkuma.com/
Free to use as long as copyright notices are left unchanged here.
*/

// 初期設定
var G = google.maps;
var container;			// マップコンテナ
var map;			// マップオブジェクト
var stv;			// ストリートビューフラグ

// Googleマップ
function gmapload() {
	var swflg = false;	// スクロールフラグ
	var centerPoint = new G.LatLng(mapcentr[0], mapcentr[1]);	// 初期座標
	var high = document.getElementById("maparea").clientHeight; 
	var wrap = document.getElementById('wrap');
	// 全画面にする処理
	if (fullflag == 1) {
		var viewport = getViewPort();
		high = viewport.height;
		swflg = true;
	}
	high = high - 42*maptheme.length;
	wrap.style.height = high + 'px';
	// マップの設定
	containerm = document.getElementById('mapd');
	var myOptions = {
		zoom: zoomsize,
		center: centerPoint,
		scrollwheel: swflg,
		mapTypeId: maptype
	}
	map = new G.Map(containerm, myOptions);
	map.setTilt(0);			// 45度画像をOFF
	// カスタムレイヤーの設定
	for (i = 0; i < maptheme.length; i++) {
		if (!maptitle[i]) maptitle[i] = maptheme[i];
		if (!mapvalue[i]) mapvalue[i] = 50;
		addOverlay(maptheme[i], maptitle[i], mapvalue[i]);
	}
	// ストリートビューの設定
	var panoramaOptions = {
		navigationControlOptions: {
			style: G.NavigationControlStyle.SMALL
		},
		scrollwheel: false,
		enableCloseButton: true
	};
	containerp = document.getElementById("pano");
	var panorama = new G.StreetViewPanorama(containerp, panoramaOptions);
	map.setStreetView(panorama);
	stv = 9;		// 初回起動時対応
	G.event.addListener(map, "zoom_changed", function () {
		document.getElementById('zoom').innerHTML = map.zoom;
	});
	G.event.addListener(panorama, "visible_changed", function () {
		if (panorama.getVisible()) {
			if (stv == 0) { containerm.style.width = "50%";  stv = 1; }	// ストリートビューオン
			if (stv == 9) { containerm.style.width = "100%"; stv = 0; }	// 初回起動時対応
		}
		else {
			if (stv == 1) { containerm.style.width = "100%"; stv = 0; }	// ストリートビューオフ
		}
		google.maps.event.trigger(map, 'resize');	// マップ幅変更に追随しないバグ
		map.setZoom( map.getZoom() );			// の対策（checkResizeの代替）
	});
	// ペグマン位置変更イベント
	G.event.addListener(panorama, 'position_changed', function() {
		if (stv == 1) {
			var positionCell = panorama.getPosition();
			map.panTo(positionCell);		// ペグマンの位置を画面中央に
		}
	});
	if (debugmap) map.overlayMapTypes.insertAt(0, new CoordMapType(new G.Size(256, 256)));	// 座標表示部
}

// 座標表示部
function CoordMapType(tileSize) {
	this.tileSize = tileSize;
}
CoordMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
	var div = ownerDocument.createElement('DIV');
	div.innerHTML = "<span style='background-color: #fff;'>" + zoom + coord + "</span>";
	div.style.width = this.tileSize.width + 'px';
	div.style.height = this.tileSize.height + 'px';
	div.style.fontSize = '10';
	div.style.borderLeft = "solid 1px #aaa";
	div.style.borderTop = "solid 1px #aaa";
	return div;
};

// ブラウザの高さ取得
var getViewPort = function() {
 	var width, heiht;
 	if (self.innerHeight) {
		// all except Explorer
		width = self.innerWidth;
		height = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) {
		// Explorer 6 Strict Mode
		width = document.documentElement.clientWidth;
		height = document.documentElement.clientHeight;
	} else if (document.body) {
		// other Explorers
		width = document.body.clientWidth;
		height = document.body.clientHeight;
	}
	return {width: width, height: height};
};
