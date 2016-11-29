var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 48.7271776, lng: 26.599085400000003},
		zoom: 14,
	  zoomControl: false,
	  disableDoubleClickZoom: false,
	  mapTypeControl: false,
	  scaleControl: false,
	  scrollwheel: false,
	  panControl: false,
	  streetViewControl: false,
	  draggable : true,
	  overviewMapControl: false,
		overviewMapControlOptions: {
		 opened: false
		},
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles:[{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#f7f1df"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#d0e3b4"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fbd3da"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#bde6ab"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffe15f"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efd151"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#cfb2db"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a2daf2"}]}]
  });
}
$.fn.Move=function(el,offset,time){
	$("html, body").stop().animate({
		scrollTop: el.offset().top-offset
	}, time, "swing");
}
$.fn.ShowText=function(el,time){
	var
	   Leter      = "leter",
		 Text       = $.trim($(el).text()),
		 TextLength = Text.length,
		 Basetime   = (time/1000)/TextLength,
		 NewText    ='';

	el.html("");

	for(var i=0; i<TextLength; i++){
		var delay = (Basetime*(i+1)),
		    css   = "style='animation-delay: " + delay + "s'",
				text  = "<span class='"+Leter+"'"+css+">"+Text[i]+"</span>";

	  if(i===0){
			text="<span class='word'>"+text;
		}
		if(Text[i]===' '){
			text="</span>\n<span class='word'>";
		}
		if(i===Leter.length-1){
			text+="</span>";
		}
		NewText+=text;
	}
  el.append(NewText);

}
$.fn.animated = function(inEffect) {
	$(this).each(function() {
		var ths = $(this);
		ths.css({opacity:0})
			.addClass("animated")
			.waypoint(function(dir) {
				if (dir === "down") {
					ths.addClass(inEffect).css({opacity:1});
				}
			},
			{
				offset: "90%"
			});
	});
};
$.fn.animatePies = function() {
	$(this).each(function(){
		var pie = $(this);
		pie.waypoint(function(dir) {
			if (dir === "down") {
				pie=pie.find('.about__texnol__progres__top');
				var progres=getSkillProgres(pie);
				pie.css({
					strokeDashoffset: progres.pr+"px",
				  stroke:progres.fill
				});
			}
		},
			{
				offset: "90%"
			});
	});
}
function getSkillProgres(svg){
	var r    = +svg.attr('r'),
	    s    = (Math.PI*(r*2)),
			per  = +svg.data('percentage')
			proc = (per/100),
			alfa = 1-proc;
  return {pr:proc*s,fill:'rgba(116,161,99,'+alfa+')'};
}
 $( document ).ready(function() {
  $('.commentwork_header_title').animated('lightSpeedIn');
  $('.commentwork_comment').animated('fadeInUp');
  $('.commentwork_contacmy_input:first').animated('bounceInLeft');
  $('.commentwork_contacmy_input:last').animated('bounceInRight');
  $('.commentwork_contacmy_text').animated('jello');
  $('.about__texnol__skils').animated('fadeInUp');
  $('.about__texnol__progres').animatePies();

  $('.content_downwork').click(function(){
		 var
		    $this  = $(this),
		    el     = $this.data('link'),
				offset = +$this.data('offset');
		 $this.Move($(el),offset,700);
	});
	$('.content_up').click(function(){
		var $this  = $(this);
    $this.Move($('body'),0,700);
	});
 $('.mywork_SmalFoto_go').click(function(){
		  var
			  $this                = $(this),
				$thisWrapper         = $this.next(),
				$thisActiv           = $thisWrapper.find('.activ'),
				$thisSlides          = $thisWrapper.children(),
				$thisNextIndex       = $thisSlides.index($thisActiv),
				$Otherthis           = $this.parent().siblings().filter('.mywork_SmalFoto').children().filter('button'),
                $OtherWrapper        = $this.parent().siblings().filter('.mywork_SmalFoto'),
				$OtherActiv          = $OtherWrapper.find('.activ'),
				$OtherSlides         = $OtherWrapper.find('.mywork_wraperSlides').children(),
				$OtherNextIndex      = $OtherSlides.index($OtherActiv),
				$PreviewWrapper      = $('.mywork_BigFoto .mywork_wraperSlides'),
				$PreviewActiv        = $PreviewWrapper.find('.activ'),
				$PreviewSlides       = $PreviewWrapper.children(),
				$PreviewNextiNdex    = $PreviewSlides.index($PreviewActiv),
				$LinksWrpapper       = $('.mywork_wrappers'),
				$LinkActive          = $LinksWrpapper.find('.activ'),
				$LinkSlides          = $LinksWrpapper.children(),
				$linkNextIndex       = $LinkSlides.index($LinkActive);

      if(!$this.hasClass('button_next')){
				$PreviewNextiNdex = $PreviewNextiNdex < $PreviewSlides.length-1 ? $PreviewNextiNdex+1 : 0;
				$thisNextIndex    = $thisNextIndex    < $thisSlides.length-1    ? $thisNextIndex+1    : 0;
				$OtherNextIndex   = $OtherNextIndex   < $OtherSlides.length-1   ? $OtherNextIndex+1   : 0;
				$linkNextIndex    = $linkNextIndex    < $LinkSlides.length-1 ? $linkNextIndex+1    : 0;
			}else{
				$PreviewNextiNdex = $PreviewNextiNdex > 0 ? $PreviewNextiNdex-1 : $PreviewSlides.length-1;
				$thisNextIndex    = $thisNextIndex    > 0 ? $thisNextIndex-1    : $thisSlides.length-1;
				$OtherNextIndex   = $OtherNextIndex   > 0 ? $OtherNextIndex-1   : $OtherSlides.length-1;
				$linkNextIndex    = $linkNextIndex    > 0 ? $linkNextIndex-1    : $LinkSlides.length-1;
			}

      $thisSlides.eq($thisNextIndex).removeClass('move-down').addClass('activ move-up');
      $thisActiv.removeClass('move-down activ').addClass('move-up');

      $OtherSlides.eq($OtherNextIndex).removeClass('move-up').addClass('activ move-down');
			$OtherActiv.removeClass('move-up activ').addClass('move-down');

			$PreviewSlides.eq($PreviewNextiNdex).removeClass('activ').addClass('activ');
      $PreviewActiv.removeClass('activ');

      $LinkActive.removeClass('activ');
			var LinksNextEl=$LinkSlides.eq($linkNextIndex);
			LinksNextEl.addClass('activ');
		  LinksNextEl.find('.mywork_links_title').ShowText(LinksNextEl.find('.mywork_links_title'),600);
			LinksNextEl.find('.mywork_links_title').ShowText(LinksNextEl.find('.mywork_links_texnologi'),600);

			$LinksWrpapper.find('.leter').addClass('show');

			$this.prop("disabled", true);
			$Otherthis.prop("disabled", true);

			setTimeout(function(){
				$this.prop("disabled", false);
				$Otherthis.prop("disabled", false);
			},700);
	});
   if($('.center').length){
	var
	   Section       = $('#one'),
		 Navigation    = $('.center_navgitation'),
		 NavMobile     = $('.center_NavigationMobile'),
		 Limit         = $('.fot').offset().top - $('.center_navgitation').outerHeight(),
		 activ         = '',
		 id            = '',
		 current       = '',
		 ScrollItems   = Navigation.find('.navbar_link').map(function(){
				var item = $($(this).attr("href"));
				if (item.length) return item;
		 });
		 Navigation.find('.navbar_link').click(function(e){
			 var
			     $this      = $(this),
			     href       = $this.attr("href");
					 e.preventDefault();
          $.fn.Move($(href),0,500);
		 });
		}
	$(window).on('scroll',function(){
		 if($('.center').length){
			 var
			    $this         = $(this),
					top           = window.pageYOffset
				  SectionTop    = Section.offset().top-60;

					current = ScrollItems.map(function(){
					  if ($(this).offset().top < top+144){
               return this;
					  }
				  });
					current = current[current.length-1];
          id      = current ? current[0].id : '';
					if(activ!=id){
						activ=id;
					  Navigation.find(".navbar_li").removeClass('activ');
						Navigation.find(".navbar_link").each(function(){
							 var $this=$(this),
							     href=$this.attr("href").slice(1);
               if(activ===href){
								$this.parent().addClass('activ');
								return false;
							 }

						});
					}
          if(top>=Limit){
						console.log('ok');
						Navigation.css({"position":"absolute", "top":Limit + "px"});
					}else	if(top>=SectionTop && $(window).width()>768 ){
						Navigation.attr('style','');
						Navigation.addClass('navfixed');
						NavMobile.addClass('activ');
					}else if(top<SectionTop){
						Navigation.removeClass('navfixed');
						NavMobile.removeClass('activ');
					}
		 }
	});
	$('.center_MobileButton').click(function(){
		NavMobile.toggleClass('active');
	});
	$('.center_NavigationMobile').find('.navbar_link').click(function(e){
		var
				$this      = $(this),
				href       = $this.attr("href");
				e.preventDefault();
			 $.fn.Move($(href),0,500);
	});
	$('.button_toggle').click(function(){
		var 
		   $this=$(this),
		   navigation=$('.navigationfixed'),
		   li=$('.navigation_li');

        $this.toggleClass('on');
		navigation.toggleClass('show');

           li.each(function(i){
           	var res=0.3+0.1*i;
           	  $(this).css('transition-delay',res+'s');;
           })
	});
	$(window).on('resize',function(){
		if($('.center').length){
		var
	 	   top           = window.pageYOffset
		   SectionTop    = Section.offset().top-60;
			 if(top>=Section && $(window).width()>768){
				 Navigation.addClass('navfixed');
				 NavMobile.addClass('activ');
			 }
	   }
	});
});

var container= $(".preloader__container"),
    pathall=container.find('path'),
    progres=container.find('.preloader__progres'),
	hasImageProperties = ["background", "backgroundImage", "listStyleImage", "borderImage", "borderCornerImage", "cursor"],
	match_url = /url\(\s*(['"]?)(.*?)\1\s*\)/g,
	all_images = [],
	total = 0,
	count = 0;

var path_o = pathall.eq(0),
	path_c = pathall.eq(1),
	path_i = pathall.eq(2),
	length = 96.40425109863281;


function preloader() {
	function img_loaded(){
		var percentage = Math.ceil( ++count / total * 100 ),
		    Dashoffsets=0;

		percentage = percentage > 100 ? 100 : percentage;
        Dashoffsets=(length-((percentage/100)*length));
      
		path_o.css({strokeDashoffset: Dashoffsets});

		if(percentage > 50) {
			path_c.css({strokeDashoffset: Dashoffsets});
		}

		if(percentage == 100) {
			path_i.css({strokeDashoffset: Dashoffsets});
		}

		progres.html(percentage);
        

		if(count === total) return done_loading();
	}

	function done_loading(){
		$(".preloader").delay(700).fadeOut(700, function(){
			$("#preloader__progress").remove();
               if($('.wrapper_box').length){
               	$('.wrapper_box').addClass('show');
               }
		});
	}
	function images_loop (item) {
		if(typeof item =="undefined"){
			item=0;
		}
		setTimeout(function () {
			var test_image = new Image();

			test_image.onload = img_loaded;
			test_image.onerror = img_loaded;

			if (item < total) {
				test_image.src = all_images[count].src;
				images_loop(++item);
			}
		}, 10);
	}

	$("*").each(function () {
		var element = $(this);
		if (element.is("img") && element.attr("src")) {
			all_images.push({
				src: element.attr("src"),
				element: element[0]
			});
		}

		$.each(hasImageProperties, function (i, property) {
			var propertyValue = element.css(property);
			var match;
                  
			if (!propertyValue) {
				return true;
			}

			match = match_url.exec(propertyValue);

			if (match) {
				all_images.push({
					src: match[2],
					element: element[0]
				});
			}
		});

	});
	total = all_images.length;


	if (total === 0) {
		done_loading();
	} else {
		images_loop();
	}
};
preloader();