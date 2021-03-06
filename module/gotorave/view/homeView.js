
cb.define({

	xtype: 'view',
	name: 'home',
	renderTo: '#body-col2',

	items: [{
		xtype: 'div',
		id: 'home-music-content',
		css: {opacity: 0},
		items: [{
			xtype: 'h3',
			margin: '10px 0 0 0',
			text: 'Música reciente',
		},{
			store: 'new',
			field: 'music',
			css: { 'margin-top': '10px'},
			xtype: 'panel',
			type: 'info',
			attr: {'data-id': '{id}'},
			items: [{
				xtype: 'head',
				items: [{
					xtype: 'review',
					attr: {data: 'music'},
					float: 'right',
					css: {'margin-right': '-5px'}
				},{
					xtype: 'div',
					cls: 'text-left',
					css: {'font-size': '17px'},
					field: 'titulo'
				}]
			},{
				xtype: 'body',
				items: [{
					xtype: 'div',
					css: {'text-align': 'center'},
					html: '{enlace}'
				}]
			},{
				xtype: 'footer',
				css: {'overflow': 'auto'},
				items: {
					field: 'tags',
					xtype: 'div',
					cls: 'label label-default',
					css: {
						'margin-right': '10px',
						'font-size': '17px'
					},
					text: '{name}'
				}
			}]
		}]
	},{
		xtype: 'div',
		id: 'home-users-content',
		css: {opacity: 0},
		items: [{
			xtype: 'h3',
			text: 'Últimos usuarios'
		},{
			store: 'new',
			field: 'user',
			xtype: 'panel',
			id: 'testpanel',
			type: 'info',
			css: {'margin-bottom': '10px'},
			attr: {'data-id': '{id}'},
			items: [{
				xtype: 'head',
				items: [{
					xtype: 'review',
					attr: {data: 'user'},
					float: 'right',
					css: {'margin-right': '-5px'}
				},/* {
					xtype: 'button',
					float: 'right',
					text: 'AAA {following}'
				},*/ {
					xtype: 'div',
					cls: 'text-left',
					css: {'font-size': '19px'},
					field: 'name'
				}]
			},{
				xtype: 'body',
				items: [{
					xtype: 'img',
					id: '{id}',
					css: {'width': '100%'},
					attr: {'src': '{image}'}
				}]
			},{
				xtype: 'footer',
				css: {overflow: 'auto'},
				items: {
					field: 'tags',
					xtype: 'div',
					cls: 'label label-default',
					css: {
						'margin-right': '10px',
						'font-size': '17px'
					},
					text: '{name}'
				}
			}]
		}]
	}]
});