
/******************************************************************************/

$('.image img').each(function() 
{
	$(this).attr('src',$(this).attr('src') + '?i='+getRandom(1,100000));
	$(this).bind('load',function() 
	{ 
		$(this).parent('a').css('background-image','none'); 
		$(this).fadeIn(1000,function() {});
	});
});

/******************************************************************************/

$('.fancybox-image').fancybox({});

/******************************************************************************/

$('.fancybox-video-youtube').bind('click',function() 
{
    $.fancybox(
    {
        'padding'		: 0,
        'autoScale'		: false,
        'transitionIn'	: 'none',
        'transitionOut'	: 'none',
        'width'			: 680,
        'height'		: 495,
        'href'			: this.href,
        'type'			: 'iframe'
    });

    return false;
});

/******************************************************************************/

$('.fancybox-video-vimeo').bind('click',function() 
{
	$.fancybox(
	{
		'padding'		: 0,
		'autoScale'		: false,
		'transitionIn'	: 'none',
		'transitionOut'	: 'none',
		'width'			: 600,
		'height'		: 338,
		'href'			: this.href,
		'type'			: 'iframe'
	});
	
	return false;
});

/******************************************************************************/
	
$('#issues li div.timeline-scroll-box').jScrollPane({maintainPosition:false,autoReinitialise:true,mouseWheelSpeed:20}).data('jsp');

/******************************************************************************/

$('#slider').nivoSlider({controlNav:true,directionNav:false,manualAdvance:true});

/******************************************************************************/





