cb.define({
	
	xtype: 'controller',
	name: 'bioculuspro',
	
	onload: function(vals){
		
		if(vals && vals['producto']){
			var me = this;
			var record = false;
			cb.load('store', 'bioculuspro', 'home', function(){
				productos = cb.get('store', 'home', 'data')['productos'];
				texts = vals['producto'];
				texts = texts.split('-');
				for(i=0;i<productos.length;i++){
					if(productos[i]['but_menu_text1'].toUpperCase() == texts[0].toUpperCase()){
						if(productos[i]['but_menu_text2'].toUpperCase() == texts[1].toUpperCase()){
							record = productos[i];
							i = productos.length;
						}
					}
				}
				if(record){
					me.load_product(record, function(){
						if(vals['seccion']){
							var id = '#'+vals['seccion'];
						    var top = $(id).offset().top;
						    $('body').stop().animate({
						    	scrollTop: top
						    }, 'swing');
						}
					});
					
				}else{
					me.onload();
				}
			});
			
		}else if(vals && vals['p']){
			cb.loadAll([
			    ['store','bioculuspro','home', {'p': vals['p']}],
				['view', 'common', 'base'],
				['view', 'bioculuspro', 'menu'],
				['view', 'bioculuspro', 'p'],
				['view', 'bioculuspro', 'footer']
			]);
			
		}else{
		
			var temp_id = getCookie('producto_selected');
			
			cb.loadAll([
			    ['store','bioculuspro','home', {'id_producto': temp_id}],
				['view', 'common', 'base'],
				['view', 'bioculuspro', 'menu'],
				['view', 'bioculuspro', 'landing'],
				['view', 'bioculuspro', 'products'],
				['view', 'bioculuspro', 'whatis'],
				['view', 'bioculuspro', 'moreinfo'],
				['view', 'bioculuspro', 'questions'],
				['view', 'bioculuspro', 'suscribe'],
				['view', 'bioculuspro', 'footer']
			], function(){
				record = cb.module.store.home.data.alerta_compra;
				
				var cookieacept = getCookie('cookieacept');
				
				if(cookieacept !== '123'){
					cb.create({
						xtype: 'div',
						appendTo: 'body',
						css: {
							position: 'fixed', 
							bottom: 0, 
							left: 0, 
							width: '100%', 
							background: 'rgba(0, 0, 0, 0.8)',
							'min-height': 100
						},
						items: [{
								xtype: 'button',
								type: 'primary',
								text: 'Aceptar',
								css: {
									position: 'absolute',
									top: -17,
									right: 10
								},
								click: function(){
									setCookie('cookieacept', '123');
									$(this).parent().animate({bottom: '-300px'}, 'slow', function(){
										$(this).remove();
									})
								}
							},{
								xtype: 'div',
								color: 'white',
								size: 19,
								padding: 30,
								text: 'Las cookies son pequeños archivos que se almacenan en los navegadores por parte de los sitios web para dar a los visitantes la mejor experiencia de usuario. La UE ha establecido una ley que regula el uso de cookies en sitios web y requiere el consentimiento del visitante para usarlas.'
							}]
					})
				}
				
				if(record){
					
					cb.popup({
						type: 'success',
						effect: {
							type: 'flipin',
							vel: 'fast',
							dire: 'down'
						},
						offsetTop: 100,
						css: {
							'max-width': 400
						},
						items: [{
							xtype: 'head',
							css: {'min-height': 40},
							store: 'home',
							field: 'alerta_compra',
							items: [{
								xtype: 'span',
								glyphicon: 'remove',
								cls: 'pull-right',
								css: {
									cursor: 'pointer',
									'padding-top': 4
								},
								listeners: {
									click: function(){
										cb.effect($(this).parent().parent(), {
											type: 'flipout',
											dire: 'up',
											fn: function(){
												$(this).parent().remove();
											}
										});
									}
								}
							},{
								xtype: 'div',
								size: 19,
								store: 'home',
								field: 'alerta_compra',
								text: '{titulo_popup}',
								cls: 'text-center'
							}]
						},{
							store: 'home',
							field: 'alerta_compra',
							xtype: 'body',
							store: 'home',
							field: 'alerta_compra',
							html: '{contenido_popup}'
						}]
					});
					
					cb.sto(function(){
						cb.module.store.home.data.alerta_compra = false;
					}, 1000);
				}
			});
		}
		
		$(window).scroll(function(){
			var top = $(window).scrollTop();
			var top2 = $('header').height() - top;
			if(top2 < -20){
				if($('#submenu').css('position') == 'absolute'){
					
					$('#submenu').stop().css({position: 'fixed', top: top2}).animate({top: 0}, 'fast');
				}
			}else if(top2 > 0){
				if($('#submenu').css('position') == 'fixed'){
					$('#submenu').stop().css({position: 'absolute', top: 0});
				}
			}
		});
		/*
		setInterval(function(){
			if(!$.isNumeric(getCookie('landing'))){
				setCookie('landing', $('#landing').children().length);
			}
			
			
			$('#landing').children().each(function(){
				var display = $(this).css('display');
				if(ocultado === false && display !== 'none'){
					ocultado = true;
					$(this).css('display', 'none');
				}
			});
			
			$($('#landing').children()[1]).remove();
		}, 2000);
		*/
	},
	
	animate_gallery: function(){
		cb.setConfig('c_galley', 1);
		
		cb.ctr('bioculuspro', 'next_gallery');
		
		if(cb.getConfig('galley_start') !== 1){
			cb.setConfig('galley_start', 1);
			setInterval(function(){
				cb.ctr('bioculuspro', 'next_gallery');
			}, 5000);
		}
	},
	
	next_gallery: function(){
		c = cb.getConfig('c_galley'); //La cabecera que hay que mostrar
		c2 = 1; //Contador de la cabecera que estamos procesando
		a = $('#landing').children().length; //Numero máximo de cabeceras
											//control para no borrar el submenu
										   //que tambien se encuentra en la cabecera
		
		$('#landing').children().each(function(){
			if(c2 < a)
			{
				if(c2 == c)
				{
					$(this).stop().fadeIn('slow');
				}
				else
				{
					$(this).stop().fadeOut('slow');
				}
			}
			c2++;
		});
		
		c++;
		
		if(c >= a) //Vuelta al principio
		{
			cb.setConfig('c_galley', 1);
		}
		else //Pasa a la siguiente cabecera
		{
			cb.setConfig('c_galley', c);
		}
	},
	
	adapt_content: function(){
		this.adapt_height($('#aunmas').find('.col-xs-6'), 50);
		this.adapt_height($('#caracteristicas').find('.caract'), 50);
		this.adapt_height($('#submenu').find('button'), 40);
	},
	
	adapt_products: function(){
		this.adapt_height($('#productos').find('.col-xs-6, .col-xs-4, .col-xs-3').find('div:first').find('div:first'), 0);
		this.adapt_height($('#productos').find('.col-xs-6, .col-xs-4, .col-xs-3').find('div:first'), 0);
	},
	
	adapt_height: function(els, off){
		var max = 0;
		els.each(function(){
			if(max < $(this).height()){
				max = $(this).height();
			}
		});
		max += off;
		els.each(function(){
			$(this).css('height', max);
		});
	},
	
	load_product: function(record, fun){
		
		setCookie('producto_selected', record.id, 2);
		
		 cb.loadAll([
		     ['view','common','base'],
			 ['store','bioculuspro','producto', { id: record.id }],       
		     ['view', 'bioculuspro', 'menu'],
		     ['view', 'bioculuspro', 'product/landing'],
		     ['view','bioculuspro','product/video'],
		     ['view','bioculuspro','product/whatis'],
		     ['view','bioculuspro','product/instalacion'],
		     ['view','bioculuspro','product/carcateristicas'],
		     ['view','bioculuspro','product/questions'],
		     ['view','bioculuspro','footer']
		], function(){
			 cb.ctr('bioculuspro', 'adapt_content');
			 if(fun){
				 fun();
			 }
			 $('img').each(function(){
				 if($(this).attr('src') == 'sistema/undefined'){
					 $(this).remove();
				 }
			 })
		 });
	},
	
	enviar_mensaje: function(){
		var err = 0;
		if($("input[name='nombre']").val().trim()=='')
		{
			err++;
			$("input[name='nombre']").css('border-color', 'red');
		}
		else
		{
			$("input[name='nombre']").css('border-color', '#ccc');
		}
		
		if($("input[name='email']").val().trim()=='')
		{
			err++;
			$("input[name='email']").css('border-color', 'red');
		}
		else
		{
			if($("input[name='email']").css('border-color')=='rgb(255, 0, 0)'){
				err++;
			}else{
				$("input[name='email']").css('border-color', '#ccc');
			}
		}
		
		if($("input[name='telefono']").val().trim()=='')
		{
			err++;
			$("input[name='telefono']").css('border-color', 'red');
		}
		else
		{
			$("input[name='telefono']").css('border-color', '#ccc');
		}
		
		if($("input[name='capcha']").val().trim() != cb.getConfig('ncapcha'))
		{
			err++;
			$("input[name='capcha']").css('border-color', 'red');
		}
		else
		{
			$("input[name='capcha']").css('border-color', '#ccc');
		}
		
		if($("textarea[name='mensaje']").val().trim()!='' && err === 0){
			$("textarea[name='mensaje']").css('border-color', '#ccc');
			cb.send('contacto','bioculuspro','send_mail',function(res){
				if(res == 'true'){
					cb.popup({
						type: 'primary',
						effect: {
							type: 'flipin',
							vel: 'fast',
							dire: 'right'
						},
						offsetTop: 100,
						css: {
							'max-width': 400
						},
						id: 'infomsok',
						items: [{
							xtype: 'head',
							text: 'Mensaje enviado con éxito'
						},{
							xtype: 'body',
							items: {
								xtype: 'h3',
								css: {'margin': '20px'},
								text: 'Gracias por contactar con el equipo de BioculusPro<br>En breve recibirá respuesta a su consulta.'
							}
						}]
					});
					cb.sto(function(){
						cb.effect('#infomsok', {
							type: 'flipout',
							dire: 'down',
							fn: function(){
								$(this).parent().remove();
							}
						});
					}, 5000)
				}
			});
		}else{
			$("textarea[name='mensaje']").css('border-color', 'red');
		}
	},
	
comprar: function(record){
				
		var id_producto = record.id;
		
		cb.define({
			xtype: 'store',
			name: 'prod_sel',
			data: record
		});
		
		if(id_producto){
			setCookie('producto_selected', id_producto);
		}else{
			id_producto = getCookie('producto_selected');
		}
		
		cb.popup({
			id: 'popcompra',
			type: 'primary',
			effect: {
				type: 'flipin',
				vel: 'fast',
				dire: 'right'
			},
			offsetTop: 100,
			css: {
				'max-width': 400
			},
			items: [{
				xtype: 'head',
				css: {'min-height': 40},
				items: [{
					xtype: 'span',
					glyphicon: 'remove',
					cls: 'pull-right',
					css: {
						cursor: 'pointer',
						'padding-top': 4
					},
					listeners: {
						click: function(){
							cb.effect('#popcompra', {
								type: 'flipout',
								dire: 'down',
								fn: function(){
									$(this).parent().remove();
								}
							});
						}
					}
				},{
					xtype: 'div',
					size: 19,
					text: 'Datos del cliente',
					cls: 'text-center'
				}]
			},{
				xtype: 'body',
				items: {
					xtype:'form',
					name: 'userdata',
					items: [{
						xtype: 'input',
						type: 'hidden',
						value: id_producto,
						name: 'id_producto'
					},{
						xtype: 'input',
						type: 'hidden',
						name: 'tipo_pago',
						id: 'formpagointipo'
					},{
						xtype:'row',
						defaults: {
							xtype: 'col',
							size: 6,
							css:{'padding-top':10},
						},
						items:[{
							
							items: [{
								xtype:'label',
								text:'Nombre',
							},{
								xtype:'input',
								type:'text',
								name:'Nombre'
							}]
						},{
							
							items: [{
								xtype:'label',
								text:'Apellidos',
							},{
								xtype:'input',
								type:'text',
								name:'Apellidos'
							}]
						},{
							size: 12,
							items: [{
								xtype:'label',
								text:'Dirección completa',
							},{
								xtype:'input',
								type:'text',
								name:'direccion'
							}]
						},{
							
							items: [{
								xtype:'label',
								text:'País',
							},{
								xtype:'input',
								type:'text',
								name:'pais'
							}]
						},{
							
							items: [{
								xtype:'label',
								text:'Código postal',
							},{
								xtype:'input',
								type:'text',
								name:'cp'
							}]
						},{
							
							items: [{
								xtype:'label',
								text:'Ciudad',
							},{
								xtype:'input',
								type:'text',
								name:'ciudad'
							}]
						},{
							
							items: [{
								xtype:'label',
								text:'Dni (Opcional)',
							},{
								xtype:'input',
								type:'text',
								name:'dni'
							}]
						},{
							
							items: [{
								xtype:'label',
								text:'Email',
							},{
								xtype:'input',
								type:'text',
								name:'email'
							}]
						},{
							
							items: [{
								xtype:'label',
								text:'Télefono',
							},{
								xtype:'input',
								type:'text',
								name:'Tlf'
							}]
						},{
							size: 12,
							items: [{
								xtype:'label',
								text:'Verificar información',
							},{
								xtype:'button',
								border:'2px solid #337ab7',
								click: function(){
									$('#formpagointipo').val('redsys');
									cb.create({
										xtype:'div',
										id: 'capa-loading',
										appendTo:'body',
										onRender: function(){
											$('#capa-loading').fadeIn('fast');
										},
										css:{'position':'fixed', width: '100%', height:'100%',top: 0, left:0, 'z-index': 20777271, 'text-align': 'center'},
										background: 'rgba(0, 0, 0, 0.8)',
										display: 'none',
										items:[{
											xtype: 'row',
											items: [{
												xtype: 'col',
												size: 12,
												items: {
													xtype:'img',
													src:'assets/img/loading.gif',
													width: '70px',
													margin: '10% auto 0px auto'
												}
											},{
												xtype: 'col',
												size: 12,
												items: {
													xtype: 'h3',
													color: 'white',
													text: 'Validando información...'
												}
											}]
										}]
									});
									
									$('#capa-loading').fadeIn('fast');
									
									cb.send('userdata', 'bioculuspro', 'comprar', function()
									{
										if($.isPlainObject(pago_res) && pago_res['id_redsys'] && pago_res['url'] && pago_res['Ds_SignatureVersion'] && pago_res['Ds_MerchantParameters'] && pago_res['Ds_Signature']){
											
											cb.effect('#popcompra', {
												type: 'flipout',
												dire: 'down',
												fn: function(){
													$(this).parent().remove();
												}
											});
											
											$('#capa-loading').fadeOut('slow', function(){
												$(this).remove();
												cb.popup({
													id: 'comprarcontinue',
													type: 'primary',
													effect: {
														type: 'flipin',
														vel: 'fast',
														dire: 'right'
													},
													offsetTop: 100,
													css: {
														'max-width': 400
													},
													items: [{
														xtype: 'head',
														items: [{
															xtype: 'button',
															type: 'primary',
															glyphicon: 'arrow-left',
															text: ' Volver atrás',
															click: function(){
																cb.effect('#comprarcontinue', {
																	type: 'flipout',
																	dire: 'left',
																	fn: function(){
																		$(this).parent().remove();
																	}
																});
																$('#popcompra').css({opacity: 0, 'margin-top': '120px'});
																cb.effect('#popcompra', {
																	type: 'flipin',
																	dire: 'up'
																});
															}
														},{
															xtype: 'button',
															type: 'primary',
															pull: 'right',
															glyphicon: 'cancel',
															text: 'Cancelar pedido',
															click: function(){
																$('#popcompra').parent().remove();
																cb.effect('#comprarcontinue', {
																	type: 'flipout',
																	dire: 'down',
																	fn: function(){
																		$(this).parent().remove();
																	}
																});
															}
														}]
													},{
														xtype: 'body',
														items: [{
															xtype: 'form',
															name: 'redsys',
															attr: {'method': 'POST', action: pago_res['url']},
															defaults: {
																xtype: 'input',
																type: 'hidden'
															},
															items: [{
																name: 'Ds_SignatureVersion',
																value: pago_res['Ds_SignatureVersion']
															},{
																name: 'Ds_MerchantParameters',
																value: pago_res['Ds_MerchantParameters']
															},{
																name: 'Ds_Signature',
																value: pago_res['Ds_Signature']
															}]
														},{
															xtype: 'div',
															padding: 10,
															items: [{
																xtype: 'button',
																id: 'cucheck',
																text: 'aceptar',
																click: function(){
																	if($(this).hasClass('btn-primary')){
																		$(this).addClass('btn-default').removeClass('btn-primary').text('Aceptar');
																		$('#but_redsys').addClass('disabled');
																		$('#but_paypal').addClass('disabled');
																		$('#but_trans').addClass('disabled');
																		$('#but_reem').addClass('disabled');
																	}else{
																		$(this).css('border-color', '#ddd');
																		$(this).addClass('btn-primary').removeClass('btn-default').text('Aceptadas');
																		$('#but_redsys').removeClass('disabled');
																		$('#but_paypal').removeClass('disabled');
																		$('#but_trans').removeClass('disabled');
																		$('#but_reem').removeClass('disabled');
																	}
																}
															},{
																xtype: 'glyphicon',
																type: 'hand-left',
																margin: '0 10px'
															},{
																xtype: 'a',
																href: 'http://bioculuspro.com/?p=aviso-legal',
																target: '_blank',
																text: 'Condiciones de uso'
															}]
														},{
															xtype: 'row',
															defaults: {
																xtype: 'col',
																size: 6,
																css: {'margin-top': '10px'}
															},
															items: [{
																items: [{
																	xtype:'label',
																	text:'Tarjeta de Crédito',
																},{
																	xtype: 'button',
																	border:'2px solid #337ab7',
																	type:'default',
																	cls: 'disabled',
																	width:'100%',
																	id: 'but_redsys',
																	
																	defaults:{
																		css:{'margin-right':'10px'}
																	},
																	items:[{
																		xtype:'img',
																		src:'assets/img/redsys.png'
																	},{
																		xtype:'img',
																		src:'assets/img/visa_icon.png'
																	},{
																		xtype:'img',
																		src:'assets/img/master_ico.png'
																	}],
																	click: function(){
																		if($('#cucheck').hasClass('btn-primary')){
																			cb.load('store','bioculuspro','comprar', { id: cb.getConfig('cliente', 'id'), sele: 'tarjet' });
																			$('form[name="redsys"]').submit();
																		}else{
																			$('#cucheck').css('border-color', '#f00');
																		}
																	}
																}]
															},{
																items: [{
																	xtype:'label',
																	text:'Pago con Paypal',
																},{
																	xtype: 'div',
																	store: 'prod_sel',
																	text: '{form_button_paypal}'
																}]
															},{
																items: [{
																	xtype:'label',
																	text:'Transferencia',
																},{
																	xtype: 'button',
																	border:'2px solid #337ab7',
																	type:'default',
																	cls: 'disabled',
																	width:'100%',
																	padding: '6px 0px 7px 2px',
																	css: {'font-weight': 600},
																	id: 'but_trans',
																	store: 'prod_sel',
																	text: 'Mostrar datos bancarios',
																	click: function(){
																		cb.ctr('bioculuspro', 'show_bankdata');
																	}
																}]
															},{
																items: [{
																	xtype:'label',
																	text:'Contra reembolso',
																},{
																	xtype: 'button',
																	border:'2px solid #337ab7',
																	type:'default',
																	cls: 'disabled',
																	width:'100%',
																	id: 'but_reem',
																	store: 'prod_sel',
																	padding: '6px 0px 7px 2px',
																	css: {'font-weight': 600},
																	text: 'Pagar cuando lo reciba',
																	click: function(){
																		cb.ctr('bioculuspro', 'show_contra');
																	}
																}]
															}]
														}]
													}]
												});
											});
											
										}else if(pago_res){
											var infail = pago_res.split(',');
											$('form[name="userdata"] input').css('border-color', '#ddd');
											for(i=0;i<infail.length;i++){
												$('input[name="'+infail[i]+'"]').css('border-color', 'red');
											}
											
											$('#capa-loading').fadeOut('slow', function(){
												$(this).remove();
											});
										}else{
											$('#capa-loading').fadeOut('slow', function(){
												$(this).remove();
											});
											alert('No se ha podido procesar el pedido, puedes usar el formulario de contacto para comunicarnos este problema.');
										}
									});
								},
								type:'default',
								width:'100%',
								text: 'Continuar'
							}]
						}]
						
					}]
				}
			}]
		});
	},
	
	show_bankdata: function(){
		
		cb.effect('#comprarcontinue', {
			type: 'flipout',
			dire: 'down',
			fn: function(){
				$(this).parent().remove();
			}
		});
		
		cb.load('store','bioculuspro','comprar', { id: cb.getConfig('cliente', 'id'), sele: 'transf' });
		
		var store = cb.get('store', 'prod_sel');
		var texto = store.data.texto_compra_contra;
		texto.replace('[id]', cb.getConfig('cliente', 'id'));
		texto.replace('[precio]', store.data.precio);
		texto.replace('[producto]', store.data.texto_compra_contra+' '+store.data.texto_compra_trans);
		
		this.showPopup(texto, store.data.text_compra_realizada);
	},
	
	show_contra: function(){
		
		cb.effect('#comprarcontinue', {
			type: 'flipout',
			dire: 'down',
			fn: function(){
				$(this).parent().remove();
			}
		});
		
		cb.load('store','bioculuspro','comprar', { id: cb.getConfig('cliente', 'id'), sele: 'contra' });
		
		var store = cb.get('store', 'prod_sel');
		var texto = store.data.texto_compra_contra;
		texto.replace('[id]', cb.getConfig('cliente', 'id'));
		texto.replace('[precio]', store.data.precio);
		texto.replace('[producto]', store.data.texto_compra_contra+' '+store.data.texto_compra_trans);
		
		this.showPopup(texto, store.data.text_compra_realizada);
	},
	
	showPopup: function(msg, title){
		if(!$.isPlainObject(msg) && !$.isArray(msg)){
			msg = {
				xtype: 'span',
				text: msg
			};
		}
		if(!title) title = 'Información';
		cb.popup({
			type: 'success',
			effect: {
				type: 'flipin',
				vel: 'fast',
				dire: 'down'
			},
			offsetTop: 100,
			css: {
				'max-width': 400
			},
			items: [{
				xtype: 'head',
				css: {'min-height': 40},
				items: [{
					xtype: 'span',
					glyphicon: 'remove',
					cls: 'pull-right',
					css: {
						cursor: 'pointer',
						'padding-top': 4
					},
					listeners: {
						click: function(){
							cb.effect($(this).parent(), {
								type: 'flipout',
								dire: 'up',
								fn: function(){
									$(this).parent().parent().remove();
								}
							});
						}
					}
				},{
					xtype: 'div',
					size: 19,
					text: title,
					cls: 'text-center'
				}]
			},{
				xtype: 'body',
				items: msg
			}]
		});
	}
});