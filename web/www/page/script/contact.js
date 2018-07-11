
/******************************************************************************/

try
{
	var coordinate=new google.maps.LatLng(51.514084,-0.141621);

	var mapOptions= 
	{
		zoom:15,
		center:coordinate,
		streetViewControl:false,
		mapTypeControl:false,
		zoomControlOptions: 
		{
			position:google.maps.ControlPosition.TOP_RIGHT
		},
		mapTypeId:google.maps.MapTypeId.ROADMAP
	};

	var googleMap=new google.maps.Map(document.getElementById('map'),mapOptions);
	
	var markerOptions=
	{
		map:googleMap,
		position:coordinate,
		icon:'image/icon_map_pointer.png'
	}
                				
	var marker=new google.maps.Marker(markerOptions);
}
catch(e) {}

/******************************************************************************/

$('#contact-form-message').elastic();

$('#contact-form').submit(function() 
{
	submitContactForm();
	return(false);
});

$('label.infield').inFieldLabels();

/******************************************************************************/

window.setTimeout(function() { $('.social-list').show('clip',500); },500);

/******************************************************************************/