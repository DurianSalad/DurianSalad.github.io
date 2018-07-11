
    $(document).ready(function() 
    {
		var options=
		{
			opalListMenuSlider		: true,
			opalCircleMenuSlider	: true,
			backgroundImageIndex	: 1
		};

        var slide=
		[
			{image:'image/background/02.jpg'},
			{image:'image/background/01.jpg'},
			{image:'image/background/03.jpg'},
			{image:'image/background/04.jpg'},
			{image:'image/background/05.jpg'}
		];
		
        var page=
        {
            'about.html'		:   {script:'about.js',backgroundImageIndex:1},
            'blog.html'			:   {script:'blog.js',backgroundImageIndex:2},
            'portfolio.html'	:   {script:'portfolio.js',backgroundImageIndex:3},  
            'services.html'		:   {script:'services.js',backgroundImageIndex:4},
            'contact.php'       :   {script:'contact.js',backgroundImageIndex:5}
        };
		
        $('#opal').opal(options,page,slide);
    });