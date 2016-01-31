function debouncer( func , timeout ) {
   var timeoutID;
   timeout = timeout || 200;
   return function () {
      var scope = this , args = arguments;
      clearTimeout( timeoutID );
      timeoutID = setTimeout( function () {
          func.apply( scope , Array.prototype.slice.call( args ) );
      } , timeout );
   };
}

jQuery(function($) {

	var path = '',
		test = false,
		term_id = '';
		
		

	if (test === false) {
		path = '/_szablony_/public/';
	}

	var Layout = {
	
		accordion: function() {
			var item = $('.accordion .item'),
				allVisible = false;
			
			function toggleAllItems() {
				
				var obj = $('.show-all-items'),
					txt_hide = obj.attr('data-hide'),
					txt_show = obj.attr('data-show');

				obj.on('click', function(e) {
					e.preventDefault();
					
					$(this).toggleClass('active');
					
					if (allVisible === true) {
						allVisible = false;
						obj.text(txt_show);
						
						item.each(function() {
							$(this).removeClass('active');
							$('.description', this).hide();
						});
					} else {
						allVisible = true;
						obj.text(txt_hide);
						
						item.each(function() {
							$(this).addClass('active');
							$('.description', this).fadeIn();
						});
					}
				});
			}
			
			item.each(function() {
				$('.description', this).hide();
			});
				
			var hash = window.location.hash;
			
			if (typeof hash > 0 ) {
				var i = hash.slice(-1)-1;
				
				item.eq(i).addClass('active');
				item.eq(i).find('.description').fadeIn();
			}
						
			item.on('click', function() {
				if ($(this).hasClass('active')) {
				
					if (allVisible === true) {
						$('.description', this).slideUp();
						$(this).removeClass('active');	
					} else {
						$(this).toggleClass('active');
						$('.description', this).slideToggle();
					}

				} else {
					
					if (allVisible === true) {						
						$(this).addClass('active');
						$('.description', this).slideDown();
					} else {
						//$('.active .description').slideUp();
						//el.find('.active').removeClass('active');
						
						$(this).toggleClass('active');
						$('.description', this).slideToggle();
					}
				}
			});

			if ($('.show-all-items').length > 0 ) {
				toggleAllItems();
			}
		},

		cookies: function() {
			var el = $('.cookies');
			if (Cookies.get('kiribati') !== 1) {
				$(el).show();
			}
			$('.accept', el).on('click', function(e){
				e.preventDefault();
				Cookies.set("kiribati", 1, { expires: 356, path: '/' });
				$(el).fadeOut();		
			});	
		},
		
		dropdown: function() {
			var el = $('.dropdown'),
				item_first_level = $('> ul > li > a', el);
				
			item_first_level.on('click', function(e) {
				e.preventDefault();
				var parent = $(this).parent();

				if ( $('> .sub-menu', parent).length > 0 ) {
					if (parent.hasClass('active')) {
						$('> .sub-menu', parent).slideUp(250, function() {
							parent.removeClass('active');
						});
					} else {
						
						if ($('.active', el).length>0) {
							el.find('.active .sub-menu').slideUp(250, function() {
								el.find('.active').removeClass('active');
								$('> .sub-menu', parent).slideToggle(250, function() {
									parent.toggleClass('active');
								});
								
							});
						} else {
							$('> .sub-menu', parent).slideToggle(250, function() {
								parent.toggleClass('active');
							});	
						}
					}	
				}
			});	
		},
		
		figureSwitcher: function() {
			var el = $('.figure-switcher'),
				choice = Cookies.get('view'),
				figure = $('.examples-trip .item figure');
				
			function switcher(obj) {
				

				figure.each(function() {
					$(this).find(obj).fadeOut(250, function() {

						$(this).parent().find('.hidden').removeClass('hidden').addClass('animated bounceInDown');
						$(this).parent().find(obj).addClass('hidden').removeClass('animated bounceInDown').attr('style', '');

					});
				});
				
				Cookies.set("view", obj, { expires: 356 });
			}

			// Sprawdz cookies
			
			if (choice) {
				$('.btn', el).removeClass('active');
				switcher(choice); 
				switch (choice) {
					case '.map': 
						$('.btn.show-photos').addClass('active');
						break;
					case '.photo': 
						$('.btn.show-maps').addClass('active');
						break;
				}
			} else {
				$('.btn.show-maps').addClass('active');
			}

			$('.btn', el).on('click', function(e) {
				e.preventDefault();
				var obj = $(this).attr('data-el');
				
				el.find('.active').removeClass('active');
				$(this).addClass('active');
				
				switcher(obj);
			});
		},
		
		googleMap: function() {
			var google, map;
			$.getScript('https://www.google.com/jsapi', function()
			{
				google.load('maps', '3', { other_params: 'sensor=false', callback: function()
				{
					var i = 0;

					$('.google-map').each(function() {
						i++;
						var _t = $(this);
						$(this).append('<div id="map'+i+'" style="width: 100%; height: 100%"></map>');

						function initialize() {
							var $container    = _t,
								center        = new google.maps.LatLng( $container.attr( 'data-lat' ), $container.attr( 'data-lng' ) );
	
	                        map = new google.maps.Map(document.getElementById("map"+i), center);
	                        map.setOptions({ zoom: 14, center: center, scrollwheel: false, disableDefaultUI: true });
	                        
	                        new google.maps.Marker({ position: center, map: map, zIndex: 999 });
	
	                        var updateCenter = function(){ $.data( map, 'center', map.getCenter() ); };
	                        
	                        google.maps.event.addListener( map, 'dragend', updateCenter );
	                        google.maps.event.addListener( map, 'zoom_changed', updateCenter );
	                        google.maps.event.addListenerOnce( map, 'idle', function(){ $container.addClass( 'is-loaded' ); });
	
	                        google.maps.event.addDomListener(window, 'resize', function() {
	                           map.setCenter(center);
	                        });
	                    }
	                    
	                    initialize();
					});
                }});
            });
        },

		grid: function() {			
			var grid = $('.grid.isotope');
			
			grid.isotope({
				layoutMode: 'fitRows',
				itemSelector: '.item',
				fitRows: {
					columnWidth: '.grid-sizer',
					gutter: '.gutter-sizer'
				}
			});
			
			$('#filters .filter').on( 'click', function(e) {
				e.preventDefault();
				var filterValue = '';
				
				if ($(this).hasClass('active')) {
					filterValue = '*';
				} else {
					$('#filters .filter').removeClass('active');
					filterValue = $( this ).attr('data-filter');
				}

				$(this).toggleClass('active');
				grid.isotope({ filter: filterValue });
			});
		},
		
		loadCustomInputScripts: function() {
			head.js('http://code.jquery.com/ui/1.10.2/jquery-ui.js')
				.js(path+'js/ui.checkbox.js', function() {
				$('input').not('.no-visal').checkBox();
			});


			head.js(path+'js/jquery.selectbox-0.2.min.js', function() {
				$('select').selectbox({
					onOpen: function () {						
						$(this).parents('.row').addClass('tofront');						
					},
					onClose: function () {
						$(this).parents('.row').removeClass('tofront');						
					},
				});
			});
		},

		magnific: function() {
			$('.mfp-image').magnificPopup({
				type: 'image',
				mainClass: 'mfp-fade',
				gallery: {
					enabled: true,
					tCounter: '%curr% / %total%'
				},
				iframe: {
		            patterns: {
		                youtube_short: {
		                  index: 'youtu.be/',
		                  id: 'youtu.be/',
		                  src: '//www.youtube.com/embed/%id%?autoplay=1'
		                }
		            }
		        },
		        closeMarkup: '<button class="mfp-close">zamknij okno</button>',
		        callbacks: {
					open: function() {
					
						var header_title = $('.gallery').attr('data-title');						
						
						if (typeof header_title === 'undefined') { header_title = ""; } 
						
						var header_html = '<div class="mfp-header"><div class="wrapper"><div class="mfp-header-title">'+header_title+'</div><img src="'+path+'img/logo-kiribati.svg" alt="Kiribati Club" width="90" /></div></div>';

						$(".mfp-container").prepend(header_html);
						
						$('.mfp-content').css('marginTop', 80);
					
					
						var e = $(".mfp-arrow");
							e.detach();
						$('.mfp-content').append(e);
					
						var f = $(".mfp-counter");
							f.detach();
						$('.mfp-content figure').prepend(f);

						var g = $(".mfp-close");
							g.detach();
						$('.mfp-header .wrapper').append(g);
						
					},
					change: function() {
						var img = this.content.find('img'),
							img_height = parseFloat(img.css('max-height')) * 0.8;
				            img.css('max-height', img_height);
					},
					resize: function() {
						
					
						var img = this.content.find('img'),
							img_height = parseFloat(img.css('max-height')) * 0.8;
				            img.css('max-height', img_height);						
					}
				}
			});
		},
		
		multiselect: function() {
			var el = $('.multiselect');	
			$('.no-visual', el).checkBox({addVisualElement: false});
			
			$('.selector, .sbToggle').on('click', function() {
				if (!$('.sbOptions', this).hasClass('active')) {
					$('.sbOptions', el).slideToggle(250, function() {
						$(this).addClass('active');
					});
				}
			});
			
			
			$(document).on('click', function(e) {			
				if ( ! $(e.target).parents().hasClass('multiselect') ) {
					$('.sbOptions', el).hide().removeClass('active');
				}
			});
		},

		newsletter: function() {
			var el = $('.newsletter');
			
			$('.close', el).on('click', function() {
				el.removeClass('visible', el);
			});

			$(window).scroll(function() {
				if ($(window).width() >=640) {
					if($(window).scrollTop() + $(window).height() > $(document).height() * 0.75) {
						el.addClass('visible');
					}
					
					if($(window).scrollTop() + $(window).height() < $(document).height() * 0.75) {
						el.removeClass('visible');
					}
				}
			});	
		},
		
		createReservation: function() {

			var el = $('.create-reservation'),
				term, price, trip_name;

			el.click(function(event) {
				event.preventDefault();
				
				var choice = false,
					url = $(this).attr('href');

				function formReservation(trip_name, term, price) {
				
					Layout.loadCustomInputScripts();

					$.magnificPopup.open({
						type: 'ajax',
						items: {
							src: url
						},
						alignTop: true,
						fixedBgPos: true,
						preloader: true,
						fixedContentPos: true,
						overflowY: true,
						tLoading: 'Momencik...',
						closeMarkup: '<button class="mfp-close cancel-resevation">Anuluj</button>',
						callbacks: {
							beforeOpen: function() {
								//Layout.loadCustomInputScripts();
							},
							ajaxContentAdded : function() {
								Layout.loadCustomInputScripts();
								
								$('#form-reservation .summary .term_txt').text(term);
								$('#form-reservation .summary .price_txt').text(price);
								$('#form-reservation > h2').text(trip_name);
								
								if ($('input[name="data_urodzenia"]').length>0) {
									 $('input[name="data_urodzenia"]').mask("99-99-9999", { placeholder:"dd-mm-yyyy"});
								}

								Layout.validate();
							},
							open: function() {
								$('.mfp-content').css('marginTop', 40);								
								var a = $(".mfp-close");
									a.detach();
								$('.mfp-holder').append(a);								
							}
						}
					}, 0);
				}

				function checkTerm() {
					// Sprawdz, czy zostala wybrana data
					
					$('.dates-prices .item').removeClass('animated shake');
					
					var e = $('.dates-prices');					
						
					$('.item', e).each(function() {
						var _t = $(this),
							input = _t.find('input[type=radio]');
						
						if ( $(input).prop('checked') ) {
							
							term = $('.date', _t).text(),
							price = $('.price', _t).text(),
							trip_name = $('.offer > h1').text(),
							term_id = $('input[name="f_termin"]', _t).attr('id');
							choice = true;

							return false;
							
						} else {
							choice = false;
						}
					});
					
					return choice;
				}

				if ( checkTerm() === false ) {
					setTimeout( function() {
						$('.dates-prices .item').addClass('animated shake');
					}, 1 );
					
				} else {					
					formReservation(trip_name, term, price);
				}
			});
		},

		pilotCloud: function() {
			var el = $('.pilot-cloud');

			el.on('mouseenter', function() {
				if ($(window).width() >= 1024) {
					$('.cloud', this).fadeIn(250);
				}
			});
			
			el.on('mouseleave', function() {
				$('.cloud', this).hide();
			});
			
		},
		
		popup: function() {

			$('.popup-modal').magnificPopup({
				
				type: 'ajax',
				alignTop: false,
				preloader: true,
				mainClass: 'mfp-3d-unfold',
				tLoading: 'Momencik...',
				closeMarkup: '<button class="mfp-close cancel-resevation">Anuluj</button>',
				callbacks: {
					beforeOpen: function() {
						Layout.loadCustomInputScripts();
					},

					ajaxContentAdded : function() {
						Layout.loadCustomInputScripts();					
						
						if ($('#form-reservation-other-term').length > 0 ) {
							$('#form-reservation-other-term > h2').text($('.offer > h1').text());
						}
						
						if ($('#form-reservation-trip-on-request').length > 0 ) {
							$('#form-reservation-trip-on-request > h2').text($('.offer > h1').text());
						}
						
						if ($('#form-share').length > 0 ) {
							$('#form-share > h2').text($('.offer > h1').text());
						}

						Layout.validate();
					},
					open: function() {
						$('.mfp-content').css('marginTop', 40);								
						var a = $(".mfp-close");
							a.detach();
						$('.mfp-holder').append(a);								
					}
				}
			});
		},
		
		printDiv: function() {
			$(".btn.print").click(function (e) {
				e.preventDefault();
		        
		        var contents = $(".tabs-content").find(".active").html();		        	        
		        var classes =  $(".tabs-content").find(".active").attr("class");
		        var pricelist = $('.pricelist').html();
		        var dates_prices = $('.dates-prices').html();
		        
		        var page_title = $("title").text();
		        var frame1 = $('<iframe />');
		        
		        frame1[0].name = "frame1";
		        frame1.css({ "position": "absolute", "top": "-1000000px" });
		        $("body").append(frame1);
		        var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
		        frameDoc.document.open();
		        //Create a new HTML document.
		        frameDoc.document.write('<html class="print"><head><title>'+page_title+'</title>');
		        frameDoc.document.write('</head><body>');
		        //Append the external CSS file.
		        frameDoc.document.write('<link href="'+path+'style/screen.css" rel="stylesheet" type="text/css" /><link href="'+path+'style/app.css" rel="stylesheet" type="text/css" />');
		        //Append the DIV contents.
		        frameDoc.document.write('<div class="'+classes+'">'+contents+'</div>');
		        frameDoc.document.write('<div class="clear"></div>');
		        frameDoc.document.write('<div class="pricelist">'+pricelist+'</div>');
		        frameDoc.document.write('<div class="clear" style="height: 30px"></div>');
		        frameDoc.document.write('<div class="dates-prices">'+dates_prices+'</div>');
		        frameDoc.document.write('</body></html>');
		        frameDoc.document.close();
		        setTimeout(function () {
		            window.frames["frame1"].focus();
		            window.frames["frame1"].print();
		            frame1.remove();
		        }, 500);
		    });
		},
		
		findOnMap: function() {
			var el = $('.find-on-map'),
				area = $('area', el),
				mapHover = $('.map-hover', el);
			
			area.on('mouseover', function() {
				var cl = $(this).attr('class');
				
				mapHover.addClass(cl);
			});
			
			area.on('mouseout', function() {
				mapHover.removeClass().addClass('map-hover');
			});
		},

		rwdOffer: function() {
			var body = $('body'),
				ww = $(window).width(),
				mobile_status;

			function buildDesktop() {
				var e = $(".dates-prices, .questions");
					e.detach();
					$('.column.left').append(e);
					
					e = $(".tabs");
					e.detach();
					$('.column.right').append(e);
					
					e = $(".pricelist");
					e.detach();
					$('.column.left').append(e);

				e = $(".quick-links, .call-us");
				e.detach();
				$('aside').append(e);
				
				body.find('.offer').eq(1).remove();
			}
			
			function buildMobile() {
			
				var e = $(".dates-prices, .questions");
					e.detach();
					$('.offer > .meta').after(e);
					
					e = $(".tabs");
					e.detach();
					$('.offer > .questions').after(e);
					
					e = $(".pricelist");
					e.detach();
					$('.offer > .tabs').after(e);
				    
				$('.examples-trip').after('<div class="wrapper offer" />');

				e = $(".quick-links, .call-us");
				e.detach();
				$('.offer').eq(1).append(e);				

			}
			
			if (ww < 1024) {
				buildMobile();
				mobile_status = true;
			} else {
				mobile_status = false;
			}
			
			$(window).resize( debouncer( function() {
				ww = $(window).width();

				if (ww < 1024) {
					if (mobile_status === false) {
						buildMobile();
						mobile_status = true;
					}
				} else {
					if (mobile_status === true) {
						buildDesktop();
						mobile_status = false;
					}
				}
			}));
			
		},
		
		rwdAboveHeader: function() {
			var el = $('.rwd-above-header'),
				status = false;
				
			function moveEl() {
				var ww = $(window).width();
				
				if (ww < 1024) {
					if (status === false) {
					    el.detach();
					    $('h1.main').before(el);
					    status = true;
				   }
				} else {
					if (status === true) {
						el.detach();
					    $('.column.left').prepend(el);
					    status = false;
				   }
				}
			}

			moveEl();

			$(window).resize( debouncer( function() {
				moveEl();
			}));
		},

		selectAll: function() {			
			var el = $('.select-all'),
				name_check = el.attr('data-check'),
				name_uncheck = el.attr('data-uncheck');
			
			el.checkBox({
				'change': function(){
					if ( $(this).is(':checked') ) {
						$(this).parents('.sub-menu').find('input[type="checkbox"]').checkBox('changeCheckStatus', true);						
						$(this).parent().find('label').text(name_uncheck);
					} else {
						$(this).parents('.sub-menu').find('input[type="checkbox"]').checkBox('changeCheckStatus', false);
						$(this).parent().find('label').text(name_check);
					}
				}
			});
		},

		svgSupport: function() {
			// Check if browser can handle SVG
			if (!Modernizr.svg) {
				// Get all img tag of the document and create variables
				var i = document.getElementsByTagName("img"),
					j, y;
				// For each img tag
				for (j = i.length; j--;) {
					y = i[j].src;
					// If filenames ends with SVG
					if (y.match(/svg$/)) {
						// Replace "svg" by "png"
						i[j].src = y.slice(0, -3) + 'png';
					}
				}
			} else {}
		},

		tabs: function() {

			var el = $('.tabs'),
				i,
				hash = window.location.hash;

			function linkTab() {
				// po kliknieciu w link, zmien zakladke

				var l = $('.tab-link');
				
				l.on('click', function(e) {
					e.preventDefault();
					
					var linkhash = $(this).attr('href').slice(-1)-1;
					showTab(linkhash);
				});
			}

			function showTab(i) {
				$('.tabs-nav .active').removeClass('active');
				$('.tabs-nav li').eq(i).addClass('active');	
				$('.tabs-content .tab').removeClass('active').hide();
				$('.tabs-content .tab').eq(i).addClass('active').fadeIn(250, function() {
				
					if ( $('.tabs-content .tab').eq(i).find('.gallery-slider').length ) {
						Sliders.universalSlider('.gallery-slider');
					}
				});
			}

			el.each(function() {
				var n = $('> .tabs-nav', this),
					t = $('> ul > li', n),
					i = n.find('.active').index();

				t.click(function(e) {
					e.preventDefault();
					
					var i = $(this).index();

					showTab(i);						
				});
				
				showTab(i);
			});
			
			if (hash) {
				i = hash.slice(-1)-1;
				showTab(i);
			}
			
			linkTab();
		},
		
		team: function() {
			var el = $('.team-excerpt'),
				face = $('.members li', el),
				info = $('.info'),
				intro = $('.intro', el),
				index = 0,
				texts = $('.texts', el),
				pause = 0;
				
			var goToStart = function() {
				if ($(texts).find('.active')) {
					intro.fadeIn();
				}	
			};
				
			face.on('mouseover', function() {
				index = $(this).index() + 1;
				intro.fadeOut();
				$(texts).find(info).eq(index).fadeIn().addClass('active');
				clearTimeout(pause);
			});
			
			face.on('mouseout', function() {
				$(texts).find(info).fadeOut().removeClass('active');
				
				pause = setTimeout(function() {
					goToStart();
				}, 1000);
			});			
		},
		
		thematicTours: function() {
			var el = $(".thematic-tours"),
				img = el.find("img"),
				html = '<span class="image" style="background-image: url('+img.attr("src")+')"></span>';

			$('figure', el).append(html);
		},
		
		whyKiribati: function() {
			var el = $('.why-kiribati'),
				i = el.find("i"),
				html = '<img src="'+path+'img/why-kiribati-placeholder.png" alt="" />';

			i.append(html);
		},
		
		validate: function() {			
			var el = $('.mfp-holder'),
				error = 0,
				reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
				submit = $('button[type=submit]');
				
				
			$('input, textarea, select', el).each(function() {

				if ( $(this).prop('required') ) {
					$(this).parents('.field').append('<i class="star">*</i>');
				}
			});			

			var validateStart = function() {
				error = 0;						

				$('textarea', el).each(function() {
					if ( $(this).prop('required') ) {

						if ( !$(this).val() ) {
							$(this).addClass( "error", 1000 ).addClass('animated shake');
							error = 1;
						} else {
							$(this).removeClass('error animated shake');
						}
					}			
				});
				
				$('input[type=text], input[type=tel], [type=password], [type=date]', el).each(function() {
					if ( $(this).prop('required') ) {
						
						if ( !$(this).val() ) {
							$(this).parent().addClass('error animated shake');
							error = 1;

						} else {
							$(this).parent().removeClass('error animated shake');
							$(this).removeClass('error animated shake');
						}
					}				
				});
				
				$('input[type=email], input[type=text], [type=password]', el).on('keydown', function() {
					$(this).parent().removeClass('error animated shake');
				});
				
				$('input[type="email"]', el).each(function() {
					if ( $(this).prop('required') ) {
											
						var email = $(this).val();

						if ( email === '' ) {
							$(this).parent().addClass('error animated shake');
							error = 1;

						} else if ( reg.test(email) === false ) {
							$(this).parent().addClass('error animated shake');
							error = 1;
						}
						
						else {
							$(this).parent().removeClass('error animated shake');
						}
					}				
				});
				
				$('input[type=checkbox]', el).each(function() {
					if ( $(this).prop('required') ) {
						
						if ( !$(this).prop('checked') ) {
							$(this).parent().addClass('error animated shake');
							error = 1;

						} else {
							$(this).parent().removeClass('error animated shake');
						}
					}				
				});

				// Terminate the script if an error is found
	
				if ( error === 1 ) {
					$('.form-message.error').fadeIn();
					$('.form-message.success').hide();

					$('.additional-message.valid-info').addClass('visible');
					$('.additional-message.success').removeClass('visible');
					return false;

				} else {					
					$('.additional-message.valid-info').removeClass('visible');
					$('.additional-message.success').addClass('visible');
								
					$('.form-message.error').hide();
					$('.form-message.error-server').hide();
					
					return true;
				}
			};

			submit.on('click', function(e) {

				e.preventDefault();

				var success = validateStart();
				
				function sendAjax(data) {
					
					$.ajax({
						type: "POST",
						cache: false,
						url: $('.form').attr('action'),
						data: data,
						success: function(msg) {
							if (msg === 'ok') {
								$('.form-message.error-server').hide();
								$('.form-message.success').fadeIn();		
								$('.form .fields').slideUp();
							} else {
								$('.form .fields').slideDown();
								$('.form-message.error-server').fadeIn();
							}
						},
						error: function(ob, errStr) {
							window.alert(errStr);
							$(submit).removeAttr("disabled");
						}
					});
				}
				
				
				// jesli nie ma bledu
				
				if (success === true) {
				
					var dataString,email,id_wyprawa,imie,kiribati_club,nazwisko,newsletter,telefon,uwagi;

					// Akcje w zaleznosci od wczytanego formularza

					if ($('#form-reservation').length > 0 ) {
					
						var id_termin		=	term_id;
							id_wyprawa		=	$(".offer > h1").attr("id");
							email			=	$("input[name='email']").val();
							kiribati_club	=	$("input[name='kiribati_club']").is(':checked');
							imie			=	$("input[name='imie']").val();
							nazwisko		=	$("input[name='nazwisko']").val();
						var adres			=	$("input[name='adres']").val();
							telefon			=	$("input[name='telefon']").val();
						var data_urodzenia	=	$("input[name='data_urodzenia']").val();
							uwagi			=	$("textarea[name='uwagi']").val();
						var koszulka		=	$("select[name='koszulka']").val(),
							ubezpieczenie_1	=	$("input[name='ubezpieczenie_1']").prop('checked'),
							ubezpieczenie_2	=	$("input[name='ubezpieczenie_2']").prop('checked'),
							ubezpieczenie_3	=	$("input[name='ubezpieczenie_3']").prop('checked'),
							ubezpieczenie_4	=	$("input[name='ubezpieczenie_4']").prop('checked'),
							oplaty_wizowe	=	$("input[name='oplaty_wizowe']").prop('checked');
							newsletter		=	$("input[name='newsletter']").prop('checked');


						dataString = 
							'id_termin='		+	id_termin + 
							'&id_wyprawa='		+	id_wyprawa + 
							'&email='			+	email +
							'&kiribati_club='	+	kiribati_club +
							'&imie='			+	imie +
							'&nazwisko='		+	nazwisko +
							'&adres='			+	adres +
							'&telefon='			+	telefon +
							'&data_urodzenia='	+	data_urodzenia +
							'&uwagi='			+	uwagi +
							'&koszulka='		+	koszulka +
							'&ubezpieczenie_1='	+	ubezpieczenie_1 +
							'&ubezpieczenie_2='	+	ubezpieczenie_2 +
							'&ubezpieczenie_3='	+	ubezpieczenie_3 +
							'&ubezpieczenie_4='	+	ubezpieczenie_4 +
							'&oplaty_wizowe='	+	oplaty_wizowe +
							'&newsletter='		+	newsletter;
						
						window.console.log(dataString);
						sendAjax(dataString);
					}
					
					if ($('#form-reservation-other-term').length > 0 ) {
					
							id_wyprawa		=	$(".offer > h1").attr("id");
							email			=	$("input[name='email']").val();
						var termin			=	$("input[name='termin']").val();
							kiribati_club	=	$("input[name='kiribati_club']").is(':checked');
							imie			=	$("input[name='imie']").val();
							nazwisko		=	$("input[name='nazwisko']").val();
							telefon			=	$("input[name='telefon']").val();
							uwagi			=	$("textarea[name='uwagi']").val();
							newsletter		=	$("input[name='newsletter']").prop('checked');							

						dataString = 
							'id_wyprawa='		+	id_wyprawa + 
							'&email='			+	email +
							'&termin='			+	termin +
							'&kiribati_club='	+	kiribati_club +
							'&imie='			+	imie +
							'&nazwisko='		+	nazwisko +
							'&telefon='			+	telefon +
							'&uwagi='			+	uwagi +
							'&newsletter='		+	newsletter;
						
						window.console.log(dataString);
						sendAjax(dataString);
					}
					
					if ($('#form-reservation-trip-on-request').length > 0 ) {
					
							id_wyprawa		=	$(".offer > h1").attr("id");
							email			=	$("input[name='email']").val();
							kiribati_club	=	$("input[name='kiribati_club']").is(':checked');
							imie			=	$("input[name='imie']").val();
							nazwisko		=	$("input[name='nazwisko']").val();
							telefon			=	$("input[name='telefon']").val();
							uwagi			=	$("textarea[name='uwagi']").val();
							newsletter		=	$("input[name='newsletter']").prop('checked');							


						dataString = 
							'id_wyprawa='		+	id_wyprawa + 
							'&email='			+	email +
							'&kiribati_club='	+	kiribati_club +
							'&imie='			+	imie +
							'&nazwisko='		+	nazwisko +
							'&telefon='			+	telefon +
							'&uwagi='			+	uwagi +
							'&newsletter='		+	newsletter;
						
						window.console.log(dataString);
						sendAjax(dataString);
					}
					
					if ($('#form-share').length > 0 ) {
					
							id_wyprawa		=	$(".offer > h1").attr("id");
						var name			=	$("input[name='name']").val();
							email			=	$("input[name='email']").val();
						var akcja			=	'powiadom';

						dataString = 
							'id_wyprawa='		+	id_wyprawa + 
							'&name='			+	name +
							'&email='			+	email +
							'&akcja='			+	akcja;
						
						sendAjax(dataString);
					}

					return true;
				}
			});

		},
		
		init: function() {
			Layout.cookies();
			Layout.newsletter();
			
			$('.header-top').slideDown();

			if ( $('html').hasClass('phone') ) {
				//$('.header-top.no-photo').attr('style', '');
			}

			if ( $('.accordion').length > 0 ) {
				Layout.accordion();
			}
			
			if ( $(".create-reservation").length > 0 ) {
				Layout.createReservation();
			}	
			
			if ( $('.dropdown').length > 0 ) {
				Layout.dropdown();
			}
			
			if ( $('.figure-switcher').length > 0 ) {
				Layout.figureSwitcher();
			}
			
			if ( $('.find-on-map').length > 0 ) {
				Layout.findOnMap();
			}			
		
			if ( $('.google-map').length > 0 ) {
				Layout.googleMap();
			}
			
/*
			if ( $('.highlight').length > 0 ) {
				$('.highlight').each(function() {
					$(this).parent().addClass('padding-left');
				})
			}
*/
			
			if ( $('.isotope').length > 0 ) {
				Layout.grid();
			}
			
			if ( $(".mfp").length > 0 ) {
				Layout.magnific();
			}
			
			if ( $(".multiselect").length > 0 ) {
				Layout.multiselect();
			}
			
			if ( $(".offer").length > 0 ) {
				Layout.rwdOffer();
			}			
			
			if ( $(".pilot-cloud").length > 0 ) {
				Layout.pilotCloud();
			}
			
			if ( $('.popup-modal').length > 0 ) {
				Layout.popup();
			}
			
			if ( $('.rwd-above-header').length > 0 ) {
				Layout.rwdAboveHeader();
			}
			
			if ( $('.btn.print').length > 0 ) {
				Layout.printDiv();
			}	
			
			if ( $('.select-all').length > 0 ) {
				Layout.selectAll();
			}			
			
			if ( $('.tabs').length > 0 ) {
				Layout.tabs();
			}
			
			if ( $('.team-excerpt').length > 0 ) {
				Layout.team();
			}			
			
			if ( $('.team').length > 0 ) {
				Layout.team();
			}
			
			if ( $(".thematic-tours").length > 0 ) {
				Layout.thematicTours();
			}
			
			if ( $(".why-kiribati").length > 0 ) {
				Layout.whyKiribati();
			}
			
			
		}
	};
	

	var Sliders = {
	
		opinions: function() {
	
			var el = $('.opinions-slider .slider');
	
			el.show().royalSlider({
				arrowsNav: false,
				autoHeight: true,
				autoPlay: {
					enabled: true,
					delay: 3500,
					pauseOnHover: true
				},
				controlNavigationSpacing: 0,
				fadeinLoadedSlide: true,
				loop: true,
				navigateByClick: false,
				slidesSpacing: 0
			});
		},
		
		universalSlider: function(arg) {

			var el = $(arg);
	
			el.show().royalSlider({
				autoHeight: true,
				arrowsNavAutoHide: false,
				arrowsNavHideOnTouch: true,
				autoPlay: {
					enabled: true,
					delay: 3500,
					pauseOnHover: true
				},
				controlNavigationSpacing: 0,
				fadeinLoadedSlide: true,
				imageScaleMode: 'fill',
				loop: true,
				navigateByClick: false,
				slidesSpacing: 0
			});
			
			$('.rsArrow', el).each(function() {
				var e = $(this).detach();
				$('.rsNav').append(e);
			});
			
			$('.rsArrowLeft', el).addClass('icon-chevron-left');
			$('.rsArrowRight', el).addClass('icon-chevron-right');
		},
	
		init: function() {			
			if ( $('.gallery-slider').length > 0 ) {
				//Sliders.universalSlider('.gallery-slider');
			}
			
			if ( $('.opinions-slider').length > 0 ) {
				Sliders.opinions();
			}
			
			if ( $('.recommended-trip-slider').length > 0 ) {
				Sliders.universalSlider('.recommended-trip-slider');
			}
		}
	};
	
	
	var Nav = {
		addNavPrimaryTrigger: function() {
			var c = $('.header-top .wrapper'),
				h = '<a class="icon-hamburger nav-primary-trigger active"></a>',
				nav = $('.nav-primary');

			c.append(h);
			
			var trigger = $('.nav-primary-trigger');			
			
			trigger.on('click', function(e) {
				e.preventDefault();
				nav.slideToggle(250);
			});		
			
			$('li', nav).on('click', function(e) {
				e.preventDefault();

				var _t = $(this);
				
				if ( _t.find('ul:first').length > 0 ) {
					_t.find("ul").toggle();
				} else {
					location.href = $('a', _t).attr('href');
				}
				
			});			
		},
		
		init: function() {
			Nav.addNavPrimaryTrigger();
		}
	};

	
	$(document).ready(function () {
	
		Layout.init();
		Sliders.init();
		Nav.init();


	    // js is on
	    $('html').removeClass('no-js');
	});
});

