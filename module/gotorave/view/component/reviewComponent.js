cb.define({
	xtype: 'component',
	name: 'review',
	items: [{
		xtype: 'span',
		css: {
			'background-color': 'white',
			'border-radius': 5,
			'padding': 5,
			'margin-left': 10},
		items: [{
			xtype: 'glyphicon',
			type: 'thumbs-down',
			cursor: 'pointer',
			cls : '{hand1_color}',
			margin: 5,
			attr: {'clicked': '{review_cos}'},
			listeners: {
				click: function(){
					cb.ctr('gotorave','musiclike',this)
				}
			}
		},{
			xtype: 'glyphicon',
			type: 'thumbs-up',
			cls : '{hand2_color}',
			cursor: 'pointer',
			attr: {'clicked': '{review_pos}'},
			margin: 5,
			listeners: {
				click: function(){
					cb.ctr('gotorave','musiclike',this)
				}
			}
		},{
			xtype: 'span',
			css: {'margin-right': 5},
			color: 'black',
			cls: 'review',
			field: 'reviews'
		}]
	}]
	
});