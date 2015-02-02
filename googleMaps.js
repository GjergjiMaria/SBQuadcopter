  var centerlat = 39.955107;
  var centerlng = -123.406677;//-75.186286;
  /*function initialize() {
    var mapOptions = {
      center: { lat: 39.955107, lng: -75.186286},
      zoom: 16
    };
    
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
  }
  
  */
var map;
var i = 0;
var change = 0 

function initialize() {
	var mapOptions = 
	{
		zoom: 8,
		center: new google.maps.LatLng(centerlat, centerlng),
		mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

	// Create a <script> tag and set the USGS URL as the source.
	var script = document.createElement('script');
	
	// (In this example we use a locally stored copy instead.)
	script.src = 'http://earthquake.usgs.gov/earthquakes/feed/geojsonp/1.0/week';
	//script.src = 'earthquake_GeoJSONP';
	//script.src = 'http://comcat.cr.usgs.gov/fdsnws/event/1/query?starttime=2013-00-00%2000:00:00&minlatitude=39&maxlatitude=41&minlongitude=-76&maxlongitude=-74';
	document.getElementsByTagName('head')[0].appendChild(script);
	
}


// Loop through the results array and place a marker for each
// set of c	oordinates.
var mostRecentQuake;
var todayDate = new Date();
console.log(todayDate.getD);

var markerArray = [];
var infoWindowArray = [];

var infowindow = new google.maps.InfoWindow();
//window.eqfeed_callback = function(results) {
	
function eqfeed_callback(results) {

	var j = 0	
	mostRecentQuake = results.features[0].properties.code;
	console.log(mostRecentQuake);
	resetMarkers(markerArray);
	for (var i = 0; i < results.features.length; i++) {
		
		var coords = results.features[i].geometry.coordinates;
		
		
		if (Math.abs(centerlat - coords[1]) < 1 && Math.abs(centerlng - coords[0]) < 1){
			var eqDate =  new Date(results.features[i].properties.time * 1);
      		var latLng = new google.maps.LatLng(coords[1],coords[0]);
      		var markerIcon;
      		console.log();
      		if (eqDate.getMonth() == todayDate.getMonth() && eqDate.getDate() == todayDate.getDate()){
      			
      			markerIcon = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
      			console.log("Month: " + eqDate.getMonth());
      			console.log("Day: " + eqDate.getDay());
      			console.log("Today Month: " + todayDate.getMonth());
      			console.log("Today Day: " + todayDate.getDay());
      			
      		}
      		else{
      			markerIcon = 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';
      		}
      		
      		var marker = new google.maps.Marker({
        		position: latLng,
        		map: map,
        		icon : markerIcon,
        		infoWindowIndex : j++
      		});
      		
      		
      		var content = '<div id = "infoWindow" style="width:400px; height:200px">' +
      				      "<h4>" + results.features[i].properties.mag + " Magnitude Earthquake</h4>" +
      					  "<p><strong> Time: </strong><br/>" + eqDate + "<br/></p>" +
      					  "<p><strong> Location: </strong><br/> Epicenter at " + coords[1] +", " + coords[0] + "<br/>" + 
      					  results.features[i].properties.place + "</p>" +
      					  "Depth: " + coords[2] + " km" + "</div>"
      					  
      					  
      					  ;
      					  
      					  
      		
      		var infoWindow = new google.maps.InfoWindow({
            	content : content
        	});
      		
      		google.maps.event.addListener(marker, 'click', 
            function(event)
            {
            	closeAllInfoWindow();
                infoWindowArray[this.infoWindowIndex].open(map, this);
            });
      		
      		
      		markerArray.push(marker);
      		infoWindowArray.push(infoWindow);
      
     } // If statement
      
   } // For
}


 function closeAllInfoWindow(){
           for(var i=0; i<infoWindowArray.length; i++)
                infoWindowArray[i].close();
           }
      


function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function resetMarkers(arr){
	for (var i=0;i<arr.length; i++)
	{
        arr[i].setMap(null);
    }
    //reset the main marker array for the next call
    arr=[];
}


function load_js()
   {
      var head = document.getElementsByTagName('script')[0];
      console.log();
      var script = document.createElement('script');
      script.type= 'text/javascript';
      script.src= 'http://earthquake.usgs.gov/earthquakes/feed/geojsonp/1.0/week';
      head.appendChild(script);
   }



   
  google.maps.event.addDomListener(window, 'load',initialize);

 