cb.define({
	xtype: 'view',
	name: 'csel',
	renderTo: '#csel',
	items: {
		xtype: 'select',
		name: 'letra',
		listener: {
			change: function(){
				var record = $(this).find('option:selected').getRecord();
				cb.ctr('maderap', 'reset');
				cb.ctr('maderap', 'insert', record.text);
			}
		},
		items: [{
			store: 'letras',
			xtype: 'option',
			value: '{id}',
			text: '{title}'
			
		}]
	}
});