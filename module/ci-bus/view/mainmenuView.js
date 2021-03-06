cb.define({
	xtype: 'view',
	name: 'mainmenu',
	appendTo: 'header',
	items: [{
		xtype: 'nav',
		type: 'default fixed-top',
		color: '#454b49',
		store: 'texts',
		field: 'menu',
		items: [{
			xtype: 'header',
			items: [{
				xtype: 'a',
				padding: '1px 0px 1px 10px',
				css: {cursor: 'pointer'},
				cls: 'navbar-brand',
				href: '#home',
				items: [{
				    xtype: 'img',
				    src: './assets/img/cb_logo.png',
				    width: 48,
				    float: 'left'
				}]
			}]
		}, {
			xtype: 'collapse',
			items: [{
				xtype: 'navbar',
				type: 'left',
				defaults: {
				    css: {'font-size': '17px'}
				},
				items: [{
					xtype: 'navbar-dropdown',
					glyphicon: 'book',
					text: ' {tx0}',
					id: 'mainmenu-doc',
					items: [{
						xtype: 'a',
						text: '{tx8}',
						href: '#loadview/install'
					}, {
						xtype: 'a',
						text: '{tx1}',
						href: '#loadview/createmodule'
					}, {
                        xtype: 'a',
                        text: '{tx5}',
                        href: '#loadview/functions'
                    }, {
                        xtype: 'a',
                        text: '{tx2}',
                        href: '#loadview/controllers'
                    }, {
                        xtype: 'a',
                        text: '{tx3}',
                        href: '#loadview/views'
                    }, {
                        xtype: 'a',
                        text: '{tx4}',
                        href: '#loadview/items'
                    }, {
                        xtype: 'a',
                        text: '{tx6}',
                        href: '#loadview/properties'
                    }, {
                        xtype: 'a',
                        text: '{tx7}',
                        href: '#loadview/stores'
                    }]
				}, {
					xtype: 'navbar-dropdown',
					glyphicon: 'bookmark',
					text: ' Items',
					id: 'mainmenu-items',
					hidden: true,
					click: function () {
                        var ul = cb.getCmp(this).up().down('ul');
                        // Preserve max height
                        if (!this.ul_height || this.ul_height < ul.height()) {
                        	this.ul_height = ul.height();
                        }
                        if (this.ul_height > window.innerHeight - 50) {
                            ul.css({
                                height: window.innerHeight - 50,
                                overflow: 'auto'
                            });
                        } else {
                            ul.css({
                                height: 'auto'
                            });
                        }
                    },
					items: {
						xtype: 'a',
						store: 'texts',
						field: 'menu-items',
						text: '{tx}',
						click: function () {
						    var record = cb.getCmp(this).getRecord();
                            cb.scrollTo(record.st, 0, 60);
                            cb.sto(function(){
                                cb.commonProp(record.st, {
                                    color: 'red',
                                    css: {
                                        'font-weight': 600
                                    }
                                });
                            }, 200);
                            cb.sto(function(){
                                cb.commonProp(record.st, {
                                    color: 'black',
                                    css: {
                                        'font-weight': 500
                                    }
                                });
                            }, 800);
                            cb.getCmp('.navbar-collapse').removeClass('in');
                        }
					}
				}, {
				    xtype: 'navbar-dropdown',
                    glyphicon: 'bookmark',
                    store: 'texts',
                    field: 'stores',
                    text: ' {tx11}',
                    id: 'mainmenu-php-methods',
                    hidden: true,
                    click: function () {
                        var ul = cb.getCmp(this).up().down('ul');
                        // Preserve max height
                        if (!this.ul_height || this.ul_height < ul.height()) {
                        	this.ul_height = ul.height();
                        }
                        if (this.ul_height > window.innerHeight - 50) {
                            ul.css({
                                height: window.innerHeight - 50,
                                overflow: 'auto'
                            });
                        } else {
                            ul.css({
                                height: 'auto'
                            });
                        }
                    },
                    items: {
                        xtype: 'li',
                        store: 'texts',
                        field: 'menu-php-methods',
                        alterdata: function (record) {
                            if (record == 'separator') {
                                return cb.create({
                                    xtype: 'li',
                                    cls: 'divider',
                                    attr: {'role':'separator'}
                                });
                            }
                            return cb.create({xtype: 'a',
                                click: function () {
                                    var record = cb.getCmp(this).getRecord();
                                    cb.scrollTo($('h4.method-' + record), 0, 75);
                                    cb.sto(function(){
                                        cb.commonProp('h4.method-' + record, {
                                            color: 'red',
                                            css: {
                                                'font-weight': 600
                                            }
                                        });
                                    }, 200);
                                    cb.sto(function(){
                                        cb.commonProp('h4.method-' + record, {
                                            color: 'black',
                                            css: {
                                                'font-weight': 500
                                            }
                                        });
                                    }, 800);
                                    cb.getCmp('.navbar-collapse').removeClass('in');
                                }
                            }, record);
                        }
                    }
				}, {
				    xtype: 'navbar-dropdown',
                    glyphicon: 'bookmark',
                    store: 'texts',
                    field: 'stores',
                    text: ' {tx14}',
                    id: 'mainmenu-javascript-methods',
                    hidden: true,
                    click: function () {
                        var ul = cb.getCmp(this).up().down('ul');
                        // Preserve max height
                        if (!this.ul_height || this.ul_height < ul.height()) {
                        	this.ul_height = ul.height();
                        }
                        if (this.ul_height > window.innerHeight - 50) {
                            ul.css({
                                height: window.innerHeight - 50,
                                overflow: 'auto'
                            });
                        } else {
                            ul.css({
                                height: 'auto'
                            });
                        }
                    },
                    items: {
                        xtype: 'li',
                        store: 'texts',
                        field: 'menu-javascript-methods',
                        alterdata: function (record) {
                            if (record == 'separator') {
                                return cb.create({
                                    xtype: 'li',
                                    cls: 'divider',
                                    attr: {'role':'separator'}
                                });
                            }
                            return cb.create({xtype: 'a',
                                click: function () {
                                    var record = cb.getCmp(this).getRecord();
                                    cb.scrollTo($('h4.method-' + record), 0, 75);
                                    cb.sto(function(){
                                        cb.commonProp('h4.method-' + record, {
                                            color: 'red',
                                            css: {
                                                'font-weight': 600
                                            }
                                        });
                                    }, 200);
                                    cb.sto(function(){
                                        cb.commonProp('h4.method-' + record, {
                                            color: 'black',
                                            css: {
                                                'font-weight': 500
                                            }
                                        });
                                    }, 800);
                                    cb.getCmp('.navbar-collapse').removeClass('in');
                                }
                            }, record);
                        }
                    }
				}, {
				    xtype: 'navbar-dropdown',
                    glyphicon: 'bookmark',
                    store: 'texts',
                    field: 'general',
                    text: ' {tx3}',
                    id: 'mainmenu-ci-bus-methods',
                    hidden: true,
                    click: function () {
                        var ul = cb.getCmp(this).up().down('ul');
                        // Preserve max height
                        if (!this.ul_height || this.ul_height < ul.height()) {
                        	this.ul_height = ul.height();
                        }
                        if (this.ul_height > window.innerHeight - 50) {
                            ul.css({
                                height: window.innerHeight - 50,
                                overflow: 'auto'
                            });
                        } else {
                            ul.css({
                                height: 'auto'
                            });
                        }
                    },
                    items: {
                        xtype: 'li',
                        store: 'texts',
                        field: 'menu-ci-bus-methods',
                        alterdata: function (record) {
                            if (record == 'separator') {
                                return cb.create({
                                    xtype: 'li',
                                    cls: 'divider',
                                    attr: {'role':'separator'}
                                });
                            }
                            return cb.create({xtype: 'a',
                            	href: '#loadview/functions',
                                click: function () {
                                    var record = cb.getCmp(this).getRecord();
                                    cb.scrollTo($('h3.function-' + record), 0, 60);
                                    cb.sto(function(){
                                        cb.commonProp('h3.function-' + record, {
                                            color: 'red',
                                            css: {
                                                'font-weight': 600
                                            }
                                        });
                                    }, 200);
                                    cb.sto(function(){
                                        cb.commonProp('h3.function-' + record, {
                                            color: 'black',
                                            css: {
                                                'font-weight': 500
                                            }
                                        });
                                    }, 800);
                                    cb.getCmp('.navbar-collapse').removeClass('in');
                                }
                            }, record);
                        }
                    }
				}]
			}, {
				xtype: 'navbar',
	            type: 'right',
	            items: [{
					xtype: 'img',
					id: 'icolang',
					src: './assets/img/lang_en.png',
					margin: '8px 10px 0px 10px',
					cursor: 'pointer',
					attr: {
						lang: 'en'
					},
					click: function () {
						cb.ctr('ci-bus', 'changeLang', cb.getCmp(this).attr('lang'))
					}
	            }]
			}]
		}]
	}]
});