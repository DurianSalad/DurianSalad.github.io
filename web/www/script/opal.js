	
	/**************************************************************************/
	
	(function($)
	{	
		/**********************************************************************/

		var Opal=function(options,page,slide)
		{
			/******************************************************************/
		
			var defaults=
			{
				opalListMenuSlider		: true,
				opalCircleMenuSlider	: true,
				backgroundImageIndex	: 1
			};

			var $this=this;

			$this.page=page;
			$this.slide=slide;
			$this.options=options;
			
			$this.options=$.extend(defaults,options);

			$this.enable=false;
			$this.pageOpen=false;
			
			$this.currentHash=false;
			$this.previousHash=false;
			
			/***/
			
			$this.backgroundPreloader=$('#background-preloader');
			$this.backgroundPreloaderBar=$('#background-preloader-bar');
			$this.backgroundPreloaderBarProgress=$('#background-preloader-bar-progress');
			
			$this.backgroundPreloaderSectionTop=$('#background-preloader-section-top');
			$this.backgroundPreloaderSectionBottom=$('#background-preloader-section-bottom');
			
			/***/
			
			$this.backgroundOverlay=$('#background-overlay');
			
			/***/
			
			$this.opal=$('#opal');
			
			/***/
			
			$this.opalCircleMenu=$('#opal-circle-menu');
			$this.opalCircleMenuElement=$this.opalCircleMenu.children('li');
			
			/***/
			
			$this.opalListMenu=$('#opal-list-menu');
			$this.opalListMenuElement=$this.opalListMenu.children('li');
			
			/***/
			
			$this.opalPage=$('#opal-page');
			$this.opalPageContent=$('#opal-page-content');
			
			/***/

			$this.opalLatestTweets=$('#opal-latest-tweets');
			
			/***/
			
			$this.opalLogo=$('#opal-logo');
			
			/***/
			
			$this.opalCircleMenuElementMarginTopFirst=225;
			$this.opalCircleMenuElementMarginTopSecond=500;
			
			/******************************************************************/
			
			this.load=function()
			{		
				$this.createSupersizedSlider();
				$this.createOpalCircleMenuSlider();

				$this.createBackgroundPreloader({complete:function()
				{
					$this.backgroundPreloaderBar.fadeOut(100,function() 
					{
						var i=0;
						
						$this.backgroundPreloaderSectionTop.css({display:'block'});
						$this.backgroundPreloaderSectionBottom.css({display:'block'});
						
						$this.backgroundPreloader.css('display','none');
						
						$('#background-preloader-section-top,#background-preloader-section-bottom').animate({height:0},{duration:500,easing:'linear',complete:function() 
						{
							if((++i)==2)
							{
								$this.backgroundOverlay.animate({opacity:1},{duration:500,complete:function() 
								{
									$this.expandOpalCircleMenu({complete:function() 
									{
										$this.showOpalLogo();
										$this.loadOpalLatestTweets(true);
										
										$this.enable=true;
										
										$this.handleHash();
									}});
								}});
							}
						}});
					});
				}});
			};
			
			/******************************************************************/
			/******************************************************************/
			
            this.handleHash=function()
            {
                $this.currentHash=window.location.hash;	

                $(window).bind('hashchange',function(event) 
                {
                    event.preventDefault();

                    if($this.isEnable()==false) return;

                    $this.currentHash=window.location.hash;
                    $this.doHash();
                    $this.previousHash=$this.currentHash;
                }); 
				
				if(!$this.checkHash()) 
				{
					window.location='#!/main';
					return;
				}
				
                if($this.currentHash!=$this.previousHash) $this.doHash();  
            };
			
			/******************************************************************/
			
            this.doHash=function()
            {
                if(!$this.enable) return(false);
				if(!$this.checkHash()) return(false);

				$this.enable=false;
				
				if($this.currentHash=='#!/main')
				{
					if($this.isOpen())
					{
						$this.close({complete:function() 
						{	
							$this.showOpalListMenu(false,{complete:function() 
							{
								$this.moveOpalLogo();
								$this.expandOpalCircleMenu({complete:function() 
								{
									$this.showOpalLatestTweets(true);
									$this.enable=true;
								}});							
							}});
						}});
					}
					else
					{
						$this.showOpalLatestTweets(true);
						$this.enable=true;
					}
					
					return(true);
				}
				
				var path=$this.currentHash.substring(3);
				$this.getPage(path,{complete:function() 
				{
					if($this.pageContent!==false)
					{
						if($this.isOpen())
						{
							$this.close({complete:function() 
							{
								$this.open({complete:function() 
								{	
									
								}});					
							}});
						}
						else
						{
							$this.showOpalLatestTweets(false);
							$this.collapseOpalCircleMenu({complete:function() 
							{
								$this.open({complete:function() 
								{
									$this.showOpalListMenu(true);
								}});
							}});
						}
					}
					else $this.enable=true;  
				}});

				return(true);
            };
			
			/******************************************************************/
			
			this.checkHash=function()
			{
				return($this.currentHash.substring(0,3)=='#!/' ? true : false);
			};
			
			/******************************************************************/
			/******************************************************************/
			
			this.expandOpalCircleMenu=function(event)
			{
				$this.showOpalCircleMenu(true);
				$this.opalCircleMenuElement=$this.opalCircleMenu.children('li');
				
				var i=0,count=$this.opalCircleMenuElement.length;
		
				$this.opalCircleMenuElement.each(function() 
				{
					$(this).animate({marginTop:$this.opalCircleMenuElementMarginTopFirst,opacity:1},{duration:getRandom(1000,2000),easing:'easeOutBounce',complete:function() 
					{
						if((++i)==count) 
						{
							$this.showNavigationOpalCircleMenuSlider(true);
							$this.doEvent(event);
						};
					}});											
				});			
			};
			
			/******************************************************************/
			
			this.collapseOpalCircleMenu=function(event)
			{				
				$this.opalCircleMenuElement=$this.opalCircleMenu.children('li');
				
				$this.showNavigationOpalCircleMenuSlider(false);
				$this.opalCircleMenuElement.css({marginTop:$this.opalCircleMenuElementMarginTopFirst,opacity:1});
				
				var i=0,count=$this.opalCircleMenuElement.length;
				$this.opalCircleMenuElement.each(function() 
				{			
					$(this).animate({marginTop:$this.opalCircleMenuElementMarginTopSecond,opacity:0},{duration:getRandom(500,1000),easing:'easeOutQuint',complete:function() 
					{
						if((++i)==count) 
						{
							$this.showOpalCircleMenu(false);
							$this.doEvent(event);
						}
					}});											
				});		
			};
			
			/******************************************************************/
			
			this.createOpalCircleMenuSlider=function()
			{
				if(!$this.options.opalCircleMenuSlider) return;
				
				$this.opalCircleMenu.bxSlider(
				{
					auto:false,
					pause:500,
					nextText:null,
					prevText:null,
					mode:'horizontal',
					displaySlideQty:5,
					infiniteLoop:true,
					hideControlOnEnd:false,
					easing:'easeInOutBack',
					wrapperClass:'bx-wrapper bx-wrapper-opal-circle-menu'
				});						
			};
			
			/******************************************************************/
		
			this.destroyOpalCircleMenuSlider=function()
			{
				if(!$this.options.opalCircleMenuSlider) return;
				$this.opalCircleMenu.destroyShow();
			};
			
			/******************************************************************/
			
			this.showNavigationOpalCircleMenuSlider=function(show)
			{
				if(!$this.options.opalCircleMenuSlider) return;
				$('.bx-wrapper-opal-circle-menu .bx-prev,.bx-wrapper-opal-circle-menu .bx-next').css('display',(show ? 'block' : 'none'));
			};
			
			/******************************************************************/
			
			this.showOpalCircleMenu=function(show)
			{
				$this.opalCircleMenu.css('display',(show ? 'block' : 'none'));
			};
			
			/******************************************************************/
			/******************************************************************/
			
			this.showOpalListMenu=function(show,event)
			{
				if(show)
				{
					$this.opalListMenu.show('drop',{},1000,function() 
					{
						$this.createOpalListMenuSlider();
						$this.doEvent(event); 
					});
				}
				else
				{
					$this.opalListMenu.hide('drop',{},500,function() 
					{
						$this.destroyOpalListMenuSlider();
						$this.doEvent(event); 
					});					
				}
			};
			
			/******************************************************************/
			
			this.createOpalListMenuSlider=function()
			{
				if(!$this.options.opalListMenuSlider) return;
				
				$this.opalListMenu.bxSlider(
				{
					auto:false,
					pause:500,
					nextText:null,
					prevText:null,
					mode:'vertical',
					displaySlideQty:5,
					infiniteLoop:true,
					hideControlOnEnd:false,
					easing:'easeInOutBack',
					wrapperClass:'bx-wrapper bx-wrapper-opal-list-menu'
				});						
			};
			
			/******************************************************************/
		
			this.destroyOpalListMenuSlider=function()
			{
				if(!$this.options.opalListMenuSlider) return;
				$this.opalListMenu.destroyShow();
			};
			
			/******************************************************************/
			/******************************************************************/
			
			this.getPage=function(path,event)
			{
                $.get('page/'+path,{},function(pageContent) 
                {	
					$this.pageContent=pageContent;
					$this.doEvent(event);
                },
                'html').error(function() 
				{ 
					$this.pageContent=false;
					$this.doEvent(event); 
				}) 
			};
			
			/******************************************************************/
			
			this.getPageProperty=function(property)
			{
				try
				{
					var val=$this.page[$this.currentHash.substring(3)][property];
				}
				catch(e) {}
				
				if(typeof(val)!='undefined') return(val);

				if(typeof($this.options[property])=='undefined') return(false);

				return($this.options[property]);
			};
			
			/******************************************************************/
			/******************************************************************/
			
			this.open=function(event)
			{
				$this.opalPageContent.html($this.pageContent);
				$this.createScrollbar();
				
				jQuery.getScript('page/script/page.js',function() 
				{
					var script=$this.getPageProperty('script');
					if(script!==false) jQuery.getScript('page/script/'+script,function() {});
				});
				
				$this.opalPage.show('fade',{},300,function() 
				{
					$this.opal.addClass('opal-open');

					api.goTo($this.getPageProperty('backgroundImageIndex'));
					$this.previousHash=$this.currentHash;
									
					$this.enable=true;	
					$this.pageOpen=true;
					
					$this.moveOpalLogo();
					
					$(window).scrollTop(0);
					
					$this.doEvent(event);
				});				
			};
			
			/******************************************************************/
			
			this.close=function(event)
			{
				$(':input,a').qtip('destroy');
				$this.opalPage.hide('explode',{},500,function() 
				{		
					$this.opal.removeClass('opal-open');
					
					$this.pageOpen=false;
								
					$this.doEvent(event);
				});						
			};
			
			/******************************************************************/
			
			this.isOpen=function()
			{
				return($this.pageOpen);
			};

			/******************************************************************/
			/******************************************************************/
			
			this.createScrollbar=function()
			{
				$this.scrollbar=$('#opal-page-scroll').jScrollPane({maintainPosition:false,autoReinitialise:true,mouseWheelSpeed:20}).data('jsp');
			};

			/******************************************************************/

			this.destroyScrollbar=function()
			{
				if($this.scrollbar!='') 
				{
					$this.scrollbar.destroy();
					$this.scrollbar='';
				};              
			};
			
			/******************************************************************/
			/******************************************************************/
			
			this.showOpalLogo=function(event)
			{
				$this.opalLogo.show('drop',{},300,function() 
				{
					$this.doEvent(event);
				});
			};
			
			/******************************************************************/
			
			this.moveOpalLogo=function()
			{
				var left=parseInt($this.opalLogo.css('left'));

				if($this.isOpen())
				{
					if(left!=-16) $this.opalLogo.animate({'left':'-16px'},{duration:2000});
				}
				else $this.opalLogo.animate({'left':'0px'},{duration:2000});
			};

			/******************************************************************/
			/******************************************************************/

			this.loadOpalLatestTweets=function()
			{
				$.getJSON('plugin/twitter-user-timeline/twitter-user-timeline.php',function(data)
				{
					if(data.length)
					{
						var list=$(document.createElement('ul'));
						$(data).each(function(index,value)
						{
							list.append($('<li>').append($('<p>').html(linkify(value.text))));
						});

						$this.opalLatestTweets.append(list).find('a').attr('target','_blank');

						list.bxSlider(
						{
							auto:true,
							pause:5000,
							nextText:null,
							prevText:null,
							mode:'vertical',
							displaySlideQty:1
						});
					}
				});
			};
			
			/******************************************************************/
			
			$this.showOpalLatestTweets=function(show,event)
			{
				var opacity=show ? 1 : 0;
				
				$this.opalLatestTweets.animate({'opacity':opacity},{duration:300,complete:function() 
				{
					$this.doEvent(event);
				}});	
			};
			
			/******************************************************************/
			/******************************************************************/

			this.createBackgroundPreloader=function(data)
			{
				var i=0,progress=0;
				var count=$this.slide.length;
					
				$this.blink($this.backgroundPreloaderBar);	
				
				$($this.slide).each(function(index) 
				{			
					var image=$(document.createElement('img'));	
					image.attr('src',$this.slide[index].image + ($.browser.msie ? '?i='+getRandom(1,10000) : ''));
					
					$(image).bind('load',function() 
					{
						progress+=(100/count);
						$this.backgroundPreloaderBarProgress.animate({width:progress+'%'},100,function() 
						{
							if((++i)==count) data.complete.apply();
						});
					});
				});
			};
			
			/******************************************************************/
			
			this.blink=function(element)
			{
				$(element).animate({opacity:($(element).css('opacity')==1 ? 0.5 : 1)},500,function() {$this.blink($(this));});
			};
			
			/******************************************************************/
			
			this.createSupersizedSlider=function()
			{
				$.supersized({autoplay:false,slides:$this.slide,thumbnail_navigation:false,thumb_links:false});					
			};

			/******************************************************************/
			
            this.isEnable=function()
            {
                if(!$this.enable)
                {
					if($this.previousHash!='')
						window.location.href=$this.previousHash;
                    return(false);
                }  
                
                return(true);
            };
			
			/******************************************************************/
			
            this.doEvent=function(event)
            {
                if(typeof(event)!='undefined')
                {
                    if(typeof(event.complete)!='undefined') event.complete.apply();
                };                  
            };
			
			/******************************************************************/
		};

		/**************************************************************/
		 
		$.fn.opal=function(options,page,slide)
		{
			/***********************************************************/

			var opal=new Opal(options,page,slide);
			opal.load();

			/***********************************************************/
		};
		
		/**************************************************************/
		
	})(jQuery);