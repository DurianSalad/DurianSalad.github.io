<?php require_once('../plugin/contact-form/config.php'); ?>

<div class="page-contact clear-fix">
	
	<h1>Contact</h1>
	
	<div class="layout-50 clear-fix">
		
		<!-- Left column -->
		<div class="layout-50-left">
			
			<!-- Contact form -->
			<form name="contact-form" id="contact-form" action="" method="post">

				<div class="clear-fix">

					<div class="form-line block">
						<label for="contact-form-name" class="infield"><?php echo CONTACT_FORM_LABEL_DATA_NAME; ?></label>
						<input type="text" name="contact-form-name" id="contact-form-name" value=""/>	
					</div>
					<div class="form-line block">
						<label for="contact-form-mail" class="infield"><?php echo CONTACT_FORM_LABEL_DATA_MAIL; ?></label>
						<input type="text" name="contact-form-mail" id="contact-form-mail" value=""/>	
					</div>					
					<div class="form-line block">
						<label for="contact-form-message" class="infield"><?php echo CONTACT_FORM_LABEL_DATA_MESSAGE; ?></label>
						<textarea rows="0" cols="0" name="contact-form-message" id="contact-form-message" ></textarea>	
					</div>

					<div class="form-line">
						<div class="block float-right">
							<input type="submit" class="button" id="contact-form-send" value="Send"/>
						</div>
					</div>

				</div>	

			</form>
			<!-- /Contact form -->
			
			<!-- Social links -->
			<h3>Connect</h3>
			<ul class="no-list social-list text">
				<li class="icon-3 icon-3-rss">
					<div>
						RSS Feed<br/>
						<a href="#">rss.mattposner.com</a>
					</div>
				</li>
				<li class="icon-3 icon-3-facebook">
					<div>
						Facebook profile<br/>
						<a href="#">facebook.com/mattposner</a>
					</div>
				</li>
				<li class="icon-3 icon-3-twitter">
					<div>
						Twitter profile<br/>
						<a href="#">twitter.com/mattposner</a>
					</div>
				</li>
				<li class="icon-3 icon-3-google">
					<div>
						Google+ profile<br/>
						<a href="#">googleplus.com/mattposner</a>
					</div>
				</li>	
			</ul>
			<!-- /Social links -->
			
		</div>
		<!-- /Left column -->
		
		<!-- Right column -->
		<div class="layout-50-right">
		
			<!-- Google map -->
			<h3>On the map</h3>
			<div id="map"></div>
			<!-- /Google map -->
			
			<!-- Address -->
			<div class="contact-box text">
			
				Web &amp; Print Design Matt Posner<br/>
				11 Lower Regent Street<br/>
				80-100 London
				
			</div>
			<!-- /Address -->
			
			<!-- Contact details -->
			<div class="contact-box">
				
				<ul class="no-list text">
					<li class="icon-2 icon-2-phone">+123 655 655</li>
					<li class="icon-2 icon-2-fax">+123 755 755</li>
					<li class="icon-2 icon-2-mail">mattposner(at)mail.com</li>
				</ul>
				
			</div>
			<!-- /Contact details -->
			
		</div>
		<!-- /Right column -->
		
	</div>
	
</div>