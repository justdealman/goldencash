/*
 * Custom Slider by Vitaly Makarevich, October 2012
 * vitaly@makarevich.me
 * My first jQuery plugin :-)
 */
 
(function( $ ){
	var
		plugin_name = 'custom_slider',
		curr_sufix = 'custom_slider_curr',
		methods = {
			init: function(options){
				var
					defaults = {
						holder: '#slider',
						img: '.slideimg',
						txt: '.info',
						paging: '.pagination',
						paging_current: '.current',
						nextIndex: 1,
						duration: 1500,
						interval: 3000
					},
					params = this.data(plugin_name);
				
				// If the plugin hasn't been initialized yet or options provided
				if (!params || options) {
					var params = $.extend(defaults, options);
					this.data(plugin_name, params);
				}
				
				// Add length to object data
				params.items_cnt = $(params.img, this).length;
				if (params.items_cnt < 2) {
					return this;
				}
				this.data(plugin_name, params);
				
				// Pause on hover
				var hover_event_map = {};
				hover_event_map['mouseenter.'+plugin_name] = function(){
					if ($(this).data(plugin_name).intervalID) {
						window.clearInterval($(this).data(plugin_name).intervalID);
					}
				};
				hover_event_map['mouseleave.'+plugin_name] = function(){
					methods.start($(this));
				};
				this.on(hover_event_map);
				
				// Quick navigation
				$(this).on('click.'+plugin_name, params.paging+' a', function(event){
					event.preventDefault();
					var obj = $(event.delegateTarget);
					var params = obj.data(plugin_name);
					if (!$(this).parent().hasClass(params.paging_current.substr(1))){
						obj.data(plugin_name, $.extend(obj.data(plugin_name), {'nextIndex': parseInt( $(this).attr('href').substr(1) ) }));
						$.fx.off;
						methods.animate(obj);
					}
				});
				
				// Hide not first images
				$(params.img, params.holder).first().addClass(curr_sufix);
				$(params.img, params.holder).not('.'+curr_sufix).hide();
				
				// Hide not first text blocks
				$(params.txt, params.holder).first().addClass(curr_sufix);
				$(params.txt, params.holder).not('.'+curr_sufix).hide();
				
				// Generate navigation
				
				methods.start(this);
			},
			
			destroy: function(){
				this.removeData(plugin_name);
				this.off('.'+plugin_name);
			},
			
			animate: function(obj){
				var params = obj.data(plugin_name);
				var nind = params.nextIndex;
				var cind = $('li'+params.paging_current, params.paging).index();
				
				// QuickNavigation next hightlight
				curr_paging = $( $('li', params.paging).get(cind) );
				next_paging = $( $('li', params.paging).get(nind) );
				curr_paging.removeClass(params.paging_current.substr(1));
				next_paging.addClass(params.paging_current.substr(1));
				
				// Increment next index
				params.nextIndex = params.nextIndex+1 < params.items_cnt ? params.nextIndex+1 : 0;
				obj.data(plugin_name, params);				
				
				// Current image fadeOut
				var curr_img = $( $(params.img, params.holder).get(cind) );
				curr_img.stop(true, true).fadeOut(params.duration, function(){
					$(this).removeClass(curr_sufix);
				});
				
				// Next image fadeIn
				var next_img = $( $(params.img, params.holder).get(nind) );
				next_img.stop(true, true).fadeIn(params.duration, function(){
					$(this).addClass(curr_sufix);
				});
				
				// Current txt fadeOut
				var curr_txt = $( $(params.txt, params.holder).get(cind) );
				curr_txt.stop(true, true).fadeOut(params.duration, function(){
					$(this).removeClass(curr_sufix);
				});
				
				// Next txt move from right to left
				var next_txt = $( $(params.txt, params.holder).get(nind) );
				next_txt.css({'display': 'block', 'left': -next_txt.width()});
				next_txt.stop(true, true).animate(
									{
										left: 0
									},
									params.duration,
									function() {
										$(this).addClass(curr_sufix);
									}
								);
			},
			
			start: function(obj){		
				var intervalID = window.setInterval(function(){methods.animate(obj)}, obj.data(plugin_name).interval);
				obj.data(plugin_name, $.extend(obj.data(plugin_name), {'intervalID': intervalID}));
			},
			
			printOptions: function(){
				return this.data(plugin_name);
			}
		};

  $.fn.custom_slider = function( method ) {
		var args = arguments;
		
    if ( methods[method] ) {
			this.each(function(){
				methods[method].apply( $(this), Array.prototype.slice.call( args, 1 ));
			});
    } else if ( typeof method === 'object' || ! method ) {
			this.each(function(){
				methods.init.apply( $(this), args );
			});
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.'+plugin_name );
    }    
		
		return this;
  };

})( jQuery );