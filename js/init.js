path = '';
//path = '/_szablony_/public/'

head.js('//code.jquery.com/jquery-1.11.1.min.js', function() {
		if ($('.isotope').length > 0) {
			head.js('//cdnjs.cloudflare.com/ajax/libs/jquery.isotope/2.2.2/isotope.pkgd.min.js');
		}

		if ($('.slider').length > 0) {
			head.js(path+'js/jquery.royalslider.custom.min.js')
				.load(path+'style/royalslider.css');
		}

		if ($('input[type="checkbox"], input[type="radio"]').length > 0) {
			head.js('//code.jquery.com/ui/1.10.2/jquery-ui.js');
			head.js(path+'js/ui.checkbox.js', function() {
				$('input').not('.no-visual').checkBox({addLabel: false});
			});
		}

		if ($('select').length > 0) {
		
			head.js('//cdn.jsdelivr.net/jquery.selectbox/0.2/js/jquery.selectbox-0.2.min.js', function() {
				$('select').selectbox({
					onOpen: function (val, inst) {
					
						if ($('.enquiry').length > 0) {
							$(this).parents('.row').addClass('tofront');
						} else {
							$(this).parents('.row').addClass('tofront');
						}
						
					},
					
					onClose: function (val, inst) {
					
						if ($('.enquiry').length > 0) {				
							$(this).parents('.wrapper').removeClass('tofront');
						} else {
							$(this).parents('.wrapper').removeClass('tofront');
						}	
						
					},
				});
			});
		}
	})
	
	.js('https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.0.0/jquery.magnific-popup.min.js')
	.js(path+'js/js.cookie.js')
	.js('//cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js')
	.js('//cdnjs.cloudflare.com/ajax/libs/mobile-detect/1.3.0/mobile-detect.min.js')
	.js('//cdnjs.cloudflare.com/ajax/libs/mobile-detect/1.3.0/mobile-detect-modernizr.js')
	.js('//cdnjs.cloudflare.com/ajax/libs/jquery.maskedinput/1.4.1/jquery.maskedinput.min.js')
	.js(path+'js/main.js');

if (head.browser.ie && parseFloat(head.browser.version) < 9) {
    head.js('//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js')
    	.js('//cdnjs.cloudflare.com/ajax/libs/selectivizr/1.0.2/selectivizr-min.js')
    	.js('//cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js');
}
