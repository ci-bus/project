cb.define({
	xtype: 'view',
	name: 'resultado',
	renderTo: '#search_result',
	items: {
		xtype: 'a',
		store: 'palabras',
		field: 'busqueda',
		items: {
			xtype: 'badge',
			margin: '10px 0px 0px 10px',
			css: {'font-size': '17px'},
			items: [{
				xtype: 'div',
				text: '{palabra}'
			},{
				xtype: 'div',
				items: [{
					xtype: 'a',
					href: 'http://diccionario.reverso.net/espanol-definiciones/{palabra}',
					target: '_blank',
					color: '#fff',
					pull: 'left',
					margin: '5px 5px 0 0',
					items: {
						xtype: 'glyphicon',
						type: 'info-sign'
					}
				}]
			}] 
		}
	}
});