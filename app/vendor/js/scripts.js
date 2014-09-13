var hash,
	url,
	projectIndex,
	scrollPostition,
	current,
	prev,
	next,
	target,
	projectLength,
	pageRefresh = true,
	ajaxLoading = false,
	content = false,
	portfolioGrid = jQuery('#projects .projects'),
	projectContainer = jQuery('#project_content'),
	project = jQuery('#project'),
	projectNav = jQuery('#portfolio #project .project_navigation'),
	loader = jQuery('#portfolio #project .loader'),
	folderName ='portfolio-item',
	loadingError = '<p class="error">The Content cannot be loaded.</p>',
	isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|Bada|Tizen|webOS|IEMobile|Opera Mini|Opera Mobi)/);
	doc='html';
	if ($.browser.webkit) doc='body';

$(function(){
	'use strict';
    $(document).ready(function (){
	//iPhone Safari Viewport Scaling Bug fix
	if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
		var viewportmeta = document.querySelector('meta[name="viewport"]');
		if (viewportmeta) {
			viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
			document.body.addEventListener('gesturestart', function () {
				viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
			}, false);
		}
	}

	//Hide loading
	if (jQuery('#loading').length){
		jQuery('#loading').fadeOut(1500, function(){
			jQuery(this).remove();
		});
	}

	//Placeholder
	$('[placeholder]').placeholder();

	//Mobile menu
	jQuery('#menu select').change(function() {
		window.location = jQuery(this).find("option:selected").val();
	});

	//Call fancybox popup
	$('a.fancybox').fancybox({
		helpers: {
			media : {},
			overlay: {
			  locked: false
			}
		}
	});

	//Slider
	// $('#slider').revolution({
	// 	delay:3000,
	// 	startwidth: 1000,
	// 	startheight: 770,
	// 	navigationType:'bullet',
	// 	navigationArrows:'none',
	// 	touchenabled:'on',
	// 	fullWidth:'on',
	// 	fullScreen:'on',
	// 	shadow:0
	// });

	//Menu anchors
	$('#menu').on('click', 'a[href^=]', function() {
		var href=$(this).attr('href');
		if (href.length>1 && $(href).length>0) {
			jQuery('html,body').stop().animate({scrollTop: ($(href).offset().top)+'px'},1000,'easeInOutExpo');
			$(this).closest('li').addClass('active').siblings().removeClass('active');
			return false;
		}
	});

	//Portfolio filters
	$('#portfolio #projects #ajax_content').waitForImages(function() {
		$('#portfolio .projects ul').isotope({
			layoutMode: 'fitRows',
			itemSelector: 'li'
		});
	});

	$('#portfolio .filters a').click(function(){
		$(this).closest('li').addClass('active').siblings().removeClass('active');
		var selector = $(this).attr('data-filter');
		$('#portfolio .projects ul').isotope({ filter: selector });
		return false;
	});

	//Change portfolio view type
	$('#portfolio .view_type a').click(function(){
		if (!$(this).hasClass('active')) {
			var currentHeight=$('#ajax_container').height();
			var link=$(this).attr('href');
			$(this).addClass('active').siblings().removeClass('active');
			$('#portfolio #projects .loader').show();
			$('#ajax_container').height(currentHeight);
			$('#ajax_container').addClass('fx_opacity_hide');
			var scaleDownTimeout=setTimeout(function(){
				$('#portfolio #projects #ajax_content').load(link+' #ajax_page', function(xhr, statusText, request){
					if (statusText=='success'){
						portfolioGrid = jQuery('#projects .projects'),
						projectContainer = jQuery('#project_content'),
						portfolioGrid.find('li a[href$="#!' + url + '"]' ).closest('li').addClass('current');
						$('#portfolio #projects .loader').hide();
						$('#portfolio #projects #ajax_content').waitForImages(function() {
							$('#portfolio .projects ul').isotope({
								layoutMode: 'fitRows',
								itemSelector: 'li',
								filter: $('#portfolio .filters li.active a').attr('data-filter')
							}, function(){
								var heightAnimationTimeout=setTimeout(function(){
									var newHeight=$('#portfolio #projects #ajax_content').height();
									$('#ajax_container').removeClass('fx_opacity_hide').animate({height: newHeight}, 250, function(){
										var newHeight=$('#portfolio #projects #ajax_content').height();
										$('#ajax_container').animate({height: newHeight}, 250, function(){
											$('#ajax_container').css('height','auto');
										});
									});
									clearTimeout(heightAnimationTimeout);
								}, 500);
							});
						});
					}
					if (statusText=='error'){
						//Show error
					}
				});
				clearTimeout(scaleDownTimeout);
			}, 400);
		}
		return false;
	});

	//Testimonials rotation
	$('#testimonials .testimonials_carousel ul').cycle({
		slides: '> li',
		timeout: 1000,
		speed: 500,
		log: false
	});

	//Contact form validation
	$('#contact_form').validate({
		rules: {
			name: {required : true},
			email: {required : true, email: true},
			message: {required : true}
		},
		highlight: function(element, errorClass) {
			$(element).addClass('error');
		}
	});

	//Comment form validation
	$('#commentform').validate({
		rules: {
			name: {required : true},
			email: {required : true, email: true},
			message: {required : true}
		},
		highlight: function(element, errorClass) {
			$(element).addClass('error');
		}
	});

	//Close alert message
	$('.alert_message .close').live('click', function(e){
		$(this).closest('.alert_message').slideUp();
		e.preventDefault();
	});

	//Accordions
	$('.accordion').on('click', '.accordion_title', function(e){
		if (!$(this).hasClass('active')) {
			$(this).siblings('.accordion_title').next('.accordion_content').stop().slideUp(200, function() {
				$(this).prev().removeClass('active');
			});
			$(this).next('.accordion_content').stop().slideDown(200, function() {
				$(this).prev().addClass('active');
			});
		}
	});

	//Toggles
	$('.toggle').on('click', '.toggle_title', function(e){
		$(this).next('.toggle_content').slideToggle(200, function() {
			$(this).prev().toggleClass('active');
		});
	});

	//Skill bar
	$('.skills').appear(function() {
		$(this).find('.skill_bar').each(function(){
			var dataperc = $(this).attr('data-percentage');
			$(this).find('.skill_percentage').animate({'width':dataperc+'%'}, 500);
		});

	});

	//Show/hide more jobs
	jQuery('#wanted .show_more_jobs').on('click', function(e){
		jQuery('#wanted .job_list.second_list').slideToggle();
		return false;
	});

	//Tabs
	jQuery('.tabs .tab_title').on('click', 'a', function(e){
		if (!jQuery(this).parent().hasClass('active')) {
			if (jQuery(window).width()>=640) {
				jQuery(this).parent().addClass('active').siblings().removeClass('active');
				jQuery(this).parent().next('.tab_content').addClass('active').siblings('.tab_content').hide();
			} else {
				var tab=jQuery(this).parent();
				jQuery(tab).siblings('.tab_content.active').slideUp(function() {
					jQuery(this).removeClass('active').prev('.tab_title').removeClass('active');
				});
				jQuery(tab).next('.tab_content').slideDown(function() {
					jQuery(tab).addClass('active').next('.tab_content').addClass('active').siblings('.tab_content').hide();
				});
			}
		}
		return false;
	});

	//Show modal window
	$('#team .column, #services .column').on('mouseenter', function(){
        $('#team .column, #services .column').addClass('highlighted_column');
	}).on('mouseleave', function(){
            $('#team .column, #services .column').removeClass('highlighted_column');
	});

    $('#services .column').on('click', function(){
        console.log('fucker');
    });

	//Show modal window
	jQuery('.show_modal_popup').on('click', function(e){
		var modal=$(this).attr('href');
		jQuery('body').append('<div id="modal_overlay"></div>');
		jQuery('#modal_overlay').fadeIn();
		jQuery(modal).show();
		return false;
	});

	//Hide modal window
	jQuery('.modal .close_modal').on('click', function(e){
		jQuery(this).closest('.modal').hide();
		jQuery('#modal_overlay').fadeOut(function(){
			jQuery(this).remove();
		});
	});

	//Blog post preview images cycle
	$('.blog_post .post_preview').each(function(index) {
		$(this).find('ul').cycle({
			slides: '> li',
			timeout: 0,
			speed: 500,
			fx: 'scrollHorz',
			allowWrap: false,
			log: false,
			prev: '.blog_post .post_preview:eq('+index+') .prev',
			next: '.blog_post .post_preview:eq('+index+') .next'
		});
	});

	//Ajax load more posts
	jQuery('.load_more .load_more_posts').on('click', function() {
		var link=jQuery(this).closest('.load_more');
		var url=jQuery(this).attr('href');
		jQuery(link).addClass('loading');
		jQuery.ajax({
			url: url,
			timeout: 10000,
			success: function(result) {
				jQuery(link).removeClass('loading');
				jQuery('#posts').append(result);
				$('#posts .blog_post .post_preview').each(function(index) {
					$(this).find('ul').cycle({
						slides: '> li',
						timeout: 0,
						speed: 500,
						fx: 'scrollHorz',
						allowWrap: false,
						log: false,
						prev: '#posts .blog_post .post_preview:eq('+index+') .prev',
						next: '#posts .blog_post .post_preview:eq('+index+') .next'
					});
				});
			},
			error: function() {
				link.removeClass('loading').append('<div class="alert_message error">The requested content cannot be loaded. Please try again later.<span class="close">&times;</span></div>');
			}
		});
		return false;
	});

	//Clients logo carousel
	jQuery('.our_clients ul').carouFredSel({
		circular: false,
		width: '100%',
		items: {
			visible: {
				min: 2,
				max: 10
			}
		},
		auto: {
			play: false
		},
		infinite: false,
		scroll: {
			items: 1,
			duration: 500
		},
		prev: '.our_clients .carousel_navigation .prev',
		next: '.our_clients .carousel_navigation .next'
	});

	//Launch animations
	if (isMobile) {
		$('.animated').each(function() {
			$(this).removeClass('animated');
		});
	}
	if (!isMobile && !$('html').hasClass('old-ie')){
		$(window).on('scroll', function() {
			updateMenu();
			launchAnimation();
			$('.parallax_bg:in-viewport').each(function() {
				var scrollTop=$(window).scrollTop();
				var windowHeight=$(window).height();
				var top=$(this).offset().top;
				var yPos=-(scrollTop+windowHeight-top)/2+$(this).height()/2;
				var coords = '50% '+ yPos + 'px';
				$(this).css({ backgroundPosition: coords });
			});
		});
	};

	$(window).on('resize', function() {
		if ($(window).width()<768) {
			//Transform services block into slider if window width less than 768 pixels
			$('#services .services').cycle({
				slides: '> .column',
				timeout: 0,
				speed: 500,
				fx: 'scrollHorz',
				allowWrap: false,
				log: false,
				prev: '#services .services .carousel_navigation .prev',
				next: '#services .services .carousel_navigation .next'
			});
			//Transform team block into slider if window width less than 768 pixels
			$('#team .team').cycle({
				slides: '> .column',
				timeout: 0,
				speed: 500,
				fx: 'scrollHorz',
				allowWrap: false,
				log: false,
				prev: '#team .ream .carousel_navigation .prev',
				next: '#team .team .carousel_navigation .next'
			});
		} else {
			if ($('#services .services .cycle-slide').length>0) {
				$('#services .services').cycle('destroy');
			}
			if ($('#team .team .cycle-slide').length>0) {
				$('#team .team').cycle('destroy');
			}
		}

		if ($(window).width()<960) {
			//Blog posts carousel destroy
			if ($('#blog .blog_carousel .carousel_content .cycle-slide').length>0) {
				$('#blog .blog_carousel .carousel_content').cycle('destroy');
			}
		} else {
			//Blog posts carousel
			$('#blog .blog_carousel .carousel_content').cycle({
				slides: '> .blog_group',
				timeout: 0,
				speed: 500,
				fx: 'scrollHorz',
				allowWrap: false,
				log: false,
				prev: '#blog .blog_carousel .carousel_navigation .prev',
				next: '#blog .blog_carousel .carousel_navigation .next'
			});
		}

		//Calc height for full height blocks
		$('.full_height').height($(window).height());
	});

	//Style Picker toggle
	jQuery('#style_picker .handler').live('click', function(){
		if (jQuery(this).hasClass('closed')) {
			jQuery(this).removeClass('closed');
			jQuery('#style_picker').animate({left: "0"}, 500);
		} else {
			jQuery(this).addClass('closed');
			jQuery('#style_picker').animate({left: "-245px"}, 500);
		}
	});

	//Style Picker options toggle
	jQuery('#style_picker .options_title span').live('click', function(){
		jQuery(this).parent().next('.options_content').slideToggle();
	});

	//Choose site layout style
	var layout_style=jQuery.cookie('layout_style');
	if (layout_style==='boxed') {
		jQuery('body').addClass('boxed');
		jQuery('#layout_wide').removeAttr('checked');
		jQuery('#layout_boxed').attr('checked', true);
	}
	jQuery('#layout_wide,#layout_boxed').live('change', function(){
		if (jQuery(this).attr('id')=='layout_wide') {
			jQuery('body').removeClass('boxed');
			jQuery.cookie('layout_style', 'wide');
			jQuery(window).trigger('resize');
			jQuery('.our_clients ul').trigger('updateSizes');
		} else {
			$('body').addClass('boxed');
			jQuery.cookie('layout_style', 'boxed');
			$(window).trigger('resize');
			jQuery('.our_clients ul').trigger('updateSizes');
		}
	});

	//Choose theme color scheme
	var scheme=jQuery.cookie('scheme');
	if (scheme) {
		jQuery('body').addClass(scheme);
		jQuery('#style_picker #theme_scheme a[class='+scheme+']').parent().addClass('active').siblings().removeClass('active');
	}
	jQuery('#style_picker #theme_scheme a').live('click', function(){
		if (!jQuery(this).parent().hasClass('active')) {
			jQuery('body').removeClass($('#theme_scheme li.active a').attr('class')).addClass(jQuery(this).attr('class'));
			jQuery(this).parent().addClass('active').siblings().removeClass('active');
			jQuery.cookie('scheme', jQuery(this).attr('class'));
		}
		return false;
	});

	//Style Picker append background pattern
	var pattern=jQuery.cookie('pattern');
	if (pattern) {
		jQuery('body').addClass(pattern);
		jQuery('#theme_patterns a[class='+pattern+']').parent().addClass('active').siblings().removeClass('active');
	}
	jQuery('#theme_patterns a').live('click', function(){
		if (!jQuery(this).parent().hasClass('active')) {
			jQuery('body').removeClass($('#theme_patterns li.active a').attr('class')).addClass(jQuery(this).attr('class'));
			jQuery(this).parent().addClass('active').siblings().removeClass('active');
			jQuery.cookie('pattern', jQuery(this).attr('class'));
		}
		return false;
	});

	//Init functions
	initializePortfolio();
	$(window).trigger('resize');
	$(window).trigger('scroll');
	$(window).trigger('hashchange');
});
}());


/*----------------------------------------------------*/
// LOAD PROJECT
/*----------------------------------------------------*/ 

function initializePortfolio() {

	jQuery(window).bind('hashchange', function() {
	
		hash = jQuery(window.location).attr('hash');
        console.log('hash: ' + hash);
		var root = '#!'+ folderName +'/';
		var rootLength = root.length;
		if ( hash.substr(0,rootLength) != root ){
			return;
		} else {
			var correction = 50;
			var headerH = jQuery('#menu').outerHeight()+correction;
			hash = jQuery(window.location).attr('hash');
			url = hash.replace(/[#\!]/g, '' );
            console.log('url: ' + url);
			portfolioGrid.find('li.current').removeClass('current' );

			/* IF URL IS PASTED IN ADDRESS BAR AND REFRESHED */
			if (pageRefresh == true && hash.substr(0,rootLength) ==  root){
				jQuery('html,body').stop().animate({scrollTop: ($('#portfolio').offset().top)+'px'},500,'easeOutExpo', function(){
					loadProject();
				});
				
			/* CLICKING ON PORTFOLIO GRID OR THROUGH PROJECT NAVIGATION */
			} else if (pageRefresh == false && hash.substr(0,rootLength) == root){
				jQuery('html,body').stop().animate({scrollTop: ($('#portfolio').offset().top)+'px'},500,'easeOutExpo', function(){
					if(content == false){
						loadProject();							
					} else {
						project.addClass('loading').animate({opacity:1},function(){
							loadProject();
						});
					}
				});
			
			/* USING BROWSER BACK BUTTON WITHOUT REFRESHING */	
			} else if(hash=='' && pageRefresh == false || hash.substr(0,rootLength) != root && pageRefresh == false || hash.substr(0,rootLength) != root && pageRefresh == true){
				deleteProject();
			}
			
			/* ADD ACTIVE CLASS TO CURRENTLY CLICKED PROJECT */
			portfolioGrid.find('li a[href$="#!' + url + '"]' ).closest('li').addClass('current');
		}
	});
	
	/* LOAD PROJECT */		
	function loadProject(){
		projectNav.fadeOut(500);
		project.removeClass('loaded').addClass('loading').animate({opacity:1});
		if(!ajaxLoading) {
			ajaxLoading = true;
			var animateTimeout=setTimeout(function(){
				projectContainer.load( url +' div#ajax_project', function(xhr, statusText, request){
					if(statusText == "success"){
					ajaxLoading = false;
						page =  jQuery('#ajax_project');
						project.removeClass('loading').addClass('loaded');
						reinitProjectInfo();
						if (page.find('.project_gallery .slides li').length>1) {
							page.find('.project_gallery').flexslider({
								animation: "slide"
							});
						}
						showProject();
					}
					if(statusText == "error"){
						loader.addClass('projectError').append(loadingError);
						loader.find('p').slideDown();
					}
				});
				clearTimeout(animateTimeout);
			}, 400);
		}
	}
	
	function hideLoader(){
		loader.delay(400).fadeOut('fast', function(){
			showProject();
		});
	}
	
	function showProject(){
		if(content==false){
			scrollPostition = jQuery('html,body').scrollTop();
			projectNav.fadeIn(500);
			content = true;
		} else {
			scrollPostition = jQuery('html,body').scrollTop();
			projectNav.fadeIn(500);
		}
		projectIndex = portfolioGrid.find('li.current').index();
		projectLength = portfolioGrid.find('li').length-1;
		if (projectIndex == projectLength){
			jQuery('#next_project a').addClass('disabled');
			jQuery('#prev_project a').removeClass('disabled');
		} else if (projectIndex == 0) {
			jQuery('#prev_project a').addClass('disabled');
			jQuery('#next_project a').removeClass('disabled');
		} else {
			jQuery('#next_project a,#prev_project a').removeClass('disabled');
		}
	}
	
	function deleteProject(closeURL){
		projectNav.fadeOut(500);
		project.removeClass('loaded').removeClass('loading').animate({opacity:0}, 500, function() {
			projectContainer.empty();
		});
		if (typeof closeURL!='undefined' && closeURL!='') {
			location = '#_';
		}
		portfolioGrid.find('li.current').removeClass('current');
	}
	
	/* LINKING TO PREIOUS AND NEXT PROJECT VIA PROJECT NAVIGATION */
	jQuery('#next_project a').on('click', function() {										   							   
		current = portfolioGrid.find('li.current');
		next = current.next('li');
		target = jQuery(next).find('a').attr('href');
		jQuery(this).attr('href', target);
		if (next.length == 0) {
			return false;
		}
		current.removeClass('current'); 
		next.addClass('current');
	});
	
	jQuery('#prev_project a').on('click',function() {
		current = portfolioGrid.find('li.current');
		prev = current.prev('li');
		target = jQuery(prev).find('a').attr('href');
		jQuery(this).attr('href', target);
		if (prev.length == 0) {
			return false;
		}
		current.removeClass('current');
		prev.addClass('current');
	});
	
	
	/* CLOSE PROJECT */
	jQuery('#close_project a').on('click',function() {
		deleteProject(jQuery(this).attr('href'));
		portfolioGrid.find('li.current').removeClass('current');
		return false;
	});
		
	function reinitProjectInfo() {
		$('#portfolio #project #project_content .project_info').jScrollPane();
		$(window).on('resize', function(){
			$('#portfolio #project #project_content .project_info').jScrollPane();
			var api = $('#portfolio #project #project_content .project_info').data('jsp');
			if ($(window).width()>=960) {
				if (api !== null && api !== undefined) {
					api.reinitialise();
				}
			} else {
				if (api !== null && api !== undefined) {
					api.destroy();
				}
			}
		});
	}
	pageRefresh = false;
};

function updateMenu() {
	if (!($(doc).is(':animated'))) {
		if ($('body').hasClass('home')) {
			$('.section.anchor').each(function(index) {
				if ( ($(this).offset().top-$(window).height()/2)<=$(doc).scrollTop() && ($(this).offset().top+$(this).outerHeight()-$(window).height()/2)>$(doc).scrollTop() ) {
					var id=$(this).attr('id');
					$('#menu a[href="'+id+'"]').closest('li').addClass('active').siblings().removeClass('active');
					return false;
				}
			});
		}
	}
}

function launchAnimation() {
	$('.about_parallax:in-viewport').each(function () {
		$('.about_parallax .about_parallax_left,.about_parallax .about_parallax_right').addClass('start_animation');
	});
	var index=-1;
	$('.animated:not(.start_animation):in-viewport').each(function () {
		var $this=$(this);
		if (!$this.hasClass('start_animation') && !$this.hasClass('animation_triggered')) {
			$this.addClass('animation_triggered');
			index++;
			if ($this.hasClass('about_parallax_left') || $this.hasClass('about_parallax_right')) {
				
			} else {
				setTimeout(function () {
					$this.addClass('start_animation');
				}, 200*index);
			}
		};
	});
};