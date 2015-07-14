/*

MTileLayerControl_v3.js

Copyright 2010 - Marcelo Montagna  - http://maps.forum.nu

Free to use as long as copyright notices are left unchanged.
Please save this file to your own server. Do not link directly,
or unexpected things might happen :-)

*/

MTileLayerControl = function(MOptions) {
	MOptions = MOptions ? MOptions : {};
	this.parent = MOptions.parent ? MOptions.parent : null;
	this.overlay = MOptions.overlay ? MOptions.overlay : null;
	this.caption = MOptions.caption ? MOptions.caption : 'Overlay';
	this.theme = MOptions.theme ? MOptions.theme : null;
	this.self = this;
	this.background = '#eef';
	this.knobWidth = MOptions.knobWidth ? MOptions.knobWidth : 16;
	this.value = MOptions.value ? MOptions.value : 100;
	this.ondrag = MOptions.ondrag ? MOptions.ondrag : null;
	this.ondragend = MOptions.ondragend ? MOptions.ondragend : null;
	this.dragStartX = null;
	this.initialize();
};

MTileLayerControl.prototype.initialize = function() {
	var self = this.self;
	this.container = document.createElement('div');
	if (this.parent) {
		this.parent.appendChild(this.container);
	}

//=== テーブル開始 =========================================
	var oTable = document.createElement('table');
	this.container.appendChild(oTable);
	oTable.setAttribute('id','cntpanel');
	oTable.setAttribute('cellspacing','0');
	this.sliderTable = oTable;
//--- tbody
	var oTBody = document.createElement('tbody');
	oTable.appendChild(oTBody);
//--- row
	var oTRow = document.createElement('tr');
	oTBody.appendChild(oTRow);
//--- キャプション部分のセル
	var oTCell = document.createElement('td');
	oTRow.appendChild(oTCell);
	oTCell.setAttribute('id','caption');
	oTCell.innerHTML = this.caption;
//--- チェックボックス部分のセル
	var oTCell = document.createElement('td');
	oTCell.style.textAlign = 'center';
	oTCell.style.width = '10px';
	oTCell.style.verticalAlign = 'middle';
	oTRow.appendChild(oTCell);
	oTCell.style.font = 'normal 10px verdana';
	this.cBox = document.createElement('input');
	this.cBox.setAttribute('type','checkbox');
//	this.cBox.setAttribute('checked','checked');
	this.cBox.onclick = function(){self.cbClick()};
	oTCell.style.paddingRight = '0';
	oTCell.appendChild(this.cBox);
	this.cBox.checked = true;	// IE7チェック対策
//---
	var oTCell = document.createElement('td');
	oTRow.appendChild(oTCell);
	oTCell.style.paddingLeft = '0';
	oTCell.innerHTML = 'Disp';
//*** 内部テーブル開始 ***
	var iTable = document.createElement('table');
	this.container.appendChild(iTable);
	iTable.setAttribute('id','sldpanel');
	iTable.setAttribute('cellspacing','0');
	this.sliderTable = iTable;
//--- tbody
	var iTBody = document.createElement('tbody');
	iTable.appendChild(iTBody);
//--- row
	var iTRow = document.createElement('tr');
	iTBody.appendChild(iTRow);
//---
	var oTCell = document.createElement('td');
	iTRow.appendChild(oTCell);
	oTCell.innerHTML = '0:';
//--- スライダー部分のセル
	var oTCell = document.createElement('td');
	iTRow.appendChild(oTCell);

	var line = mak_slider(this.theme);
	oTCell.innerHTML = line;
//---
	var oTCell = document.createElement('td');
	iTRow.appendChild(oTCell);
	oTCell.innerHTML = ':100';
//--- ラベル部分のセル
	var oTCell = document.createElement('td');
	iTRow.appendChild(oTCell);
	this.form = this.createForm();
	oTCell.appendChild(this.form);
	this.label = this.createLabel();
	this.form.appendChild(this.label);
	this.form.onsubmit  = function(){self.lbChange(); return false;};	// ラベルに直接入力
//---
	var oTCell = document.createElement('td');
	iTRow.appendChild(oTCell);
	oTCell.innerHTML = '%';
//************************

//--- 内部テーブルを外部テーブルセルにアタッチ
	var oTCell = document.createElement('td');
	oTRow.appendChild(oTCell);
	oTCell.appendChild(iTable);

//==========================================================

	this.overlay.show();		// カスタムオーバーレイの表示
	this.overlay.fadeToOpacity(this.value);
	set_slider(this.theme, 0, this.overlay);	// Opera対策
	set_slider(this.theme, this.value, this.overlay);
};

MTileLayerControl.prototype.cbClick = function() {
	if (this.cBox.checked) {
		this.overlay.show();
		this.sliderTable.style.display = '';
		if (this.overlay) {
			var vl = document.getElementById(this.theme + '_label').value;
			this.overlay.fadeToOpacity(vl);
		}
	}
	else {
		if (this.overlay) {
			this.overlay.fadeToOpacity(0);
		}
		this.sliderTable.style.display = 'none';
	}
}

MTileLayerControl.prototype.createForm = function() {
	var form = document.createElement('form');
	form.setAttribute('id', 'lform');
	form.style.display = 'inline';
	return form;
};

MTileLayerControl.prototype.createLabel = function() {
	var label = document.createElement('input');
	label.type = 'text';
	label.setAttribute('id', this.theme + '_label');
	label.setAttribute('value',this.value);
	label.style.border = '1px solid #aaa';
	label.style.background = '#ddf';
	label.style.textAlign = 'right';
	label.style.height = '13px';
	label.style.width = '4em';
	label.style.font = 'normal 10px verdana';
	label.style.margin = '0 1em';
	return label;
};

// ラベルに直接入力
MTileLayerControl.prototype.lbChange = function() {
	clearTimeout(timelabel);	// フェード途中での操作対策
	var lb = document.getElementById(this.theme + '_label');
	lb.blur();
	var vl = Math.round(lb.value);
	if((vl<0)||(isNaN(vl))) vl = 0;
	if(vl>100) vl = 100;
	lb.value = vl;
	set_slider(this.theme, vl, this.overlay);
	if (vl == 0) vl = 0.01;
	this.overlay.fadeToOpacity(vl);
}

    var root;
    var scripts = document.getElementsByTagName("script");
    var i = scripts.length;
    while (i--) {
        var match = scripts[i].src.match(/(^|.*\/)MTileLayerControl_v3\.js$/);
        if (match) {
            root = match[1];
            break;
        }
    }

// スライダー関係
function mak_slider(theme) {
	var line = '';
	line += '<div class="slider">';
	line += '<div id="'+theme+'_track" class="tracks">';
	line += '<img id="'+theme+'_handl" src="./' + imgfoldr + '/slider.gif" width="14" height="15">';
	line += '</div></div>';
	return line;
}

function set_slider(thm, val, ovr) {
	var hdl = thm + '_handl';
	var trk = thm + '_track';
	new Control.Slider(hdl, trk,{
		range: $R(0,100),
		sliderValue: val,
		onSlide : function(pos){ fade(pos, ovr, thm); },
		onChange: function(pos){ fade(pos, ovr, thm); }
	});
}

function fade(pos, ovr, thm) {
	clearTimeout(timelabel);	// フェード途中での操作対策
	var v_disp = document.getElementById(thm+'_label');
	v_disp.value = pos.toFixed(0);
	if (pos == 0) pos = 0.01;	// onChangeゼロで消えない対策
	ovr.setOpacity(pos);
}
