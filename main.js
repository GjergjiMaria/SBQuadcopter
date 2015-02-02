
$.when(getWeatherInfo()).done(function() {  
  displayInfo()
  createWidget()
  //earthQuake()
  
  //setInterval(getWeather, 60000); //Update the weather every 10 minutes.
});



function getWeatherInfo() {
return $.ajax({
	async: false,
    url : "https://api.wunderground.com/api/c8827d40b7166996/geolookup/conditions/q/PA/Philadelphia.json", 
    dataType : "jsonp",
    success : function(weatherJson) {
        city = weatherJson['location']['city'];
        state = weatherJson['location']['state'];
        temperatureF = weatherJson['current_observation']['temp_f'];
        time = weatherJson['current_observation']['local_time_rfc822'];
        barometricPressure = weatherJson['current_observation']['pressure_in'];
        weatherCondition = weatherJson['current_observation']['weather'];
        weatherPic = weatherJson['current_observation']['icon_url'];
        windDirection = weatherJson['current_observation']['wind_dir'];
        windMPH = weatherJson['current_observation']['wind_mph'];
    },
    error : function() {
    	alert("Something Fucked Up");
	}
});
}


function displayInfo() {
		

	    html = "<li> Time of Request: " + time + " </li>";
        html += "<li> Location: " + city + ", " + state + "</li>"
        html += "<li> Temperature: " + temperatureF + "&degF </li>"; 
        html += "<li> Weather Condition: " + weatherCondition + "</li>"; 
        html += "<li> Barometric Pressure: " + barometricPressure + " inHg </li>";       
        html += '<li> Wind Information: ' + windDirection+' '+' '+windMPH+' MPH</li>';
        html += '<br> </br>';
         
        $('#weatherInfo').html(html);
}


function createWidget() {

      if(temperatureF > 75) {
        $('#weatherWidget').css({backgroundColor: '#F7AC57'}, 1500);
      } 
      else {
        $('#weatherWidget').css({backgroundColor: '#0091c2'}, 1500);
      }
      
      html = '<h2> '+temperatureF+'&degF</h2>';
      html += '<ul><li><img src=' + weatherPic + '></li></ul>'
      html += '<ul><li>'+ city +', '+state+'</li> ';
      html += '<li>'+ weatherCondition +'</li> ';
      html += '<li>'+windDirection+' '+' '+windMPH+' MPH</li></ul>';
      
      $("#weatherWidget").html(html);
    }

function earthQuake() {

	return $.ajax({
	
	async: false,
    //url : "http://comcat.cr.usgs.gov/fdsnws/event/1/query?starttime=2013-00-00%2000:00:00&minlatitude=39&maxlatitude=41&minlongitude=-76&maxlongitude=-74", 
    //url : "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson",
    url : "http://comcat.cr.usgs.gov/fdsnws/event/1/query?starttime=2013-00-00%2000:00:00&minlatitude=39&maxlatitude=41&minlongitude=-76&maxlongitude=-74&format=kml",
    //url : "eData.kml",
    dataType: "xml",
    success : function(data) {
		$(data).find('Folder').each(function() {
			var info = $(this).find('Placemark name').text();
			var magnitude = info.match(/\d\.\d/g);
			var earthquakeTime = $(this).find('name').first().text();
			var earthquakeLocation = info.match(/\dkm.*/g);
			console.log(earthquakeTime);
			console.log(earthquakeLocation);
			$(earthquake).append('<li>' + earthquakeTime + '    ' + earthquakeLocation + ' ' +  magnitude + '</li>');
			
		})
		

		
    }
	
	});
}
