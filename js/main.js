

  var coor = [];
  var marker,marker2;
  var markers= []; //array of markers
  var markerIcon;
  var timer,pos;
 var array = [];
 var areaobj = [];
 var directionsService,directionsDisplay;

  var map, infoWindow;

  // The map, centered at Uluru

  function toggleThis(data,lat,lng) {

          var id = data;
          init_panorama(lat,lng);

          $('#data').hide();
    $.ajax({
     type: 'post',
     url: 'getData.php',
     data: {data:id},
     success: function(result){
       $('#loader').show();
      setTimeout(function(){
       $('#data').show('fade');
        $('#data').html(result);
        $('#loader').hide();
      }, 1000);
       
    }

  });

          $('#dataDisplay').show('fade');
      }

      function init_panorama(lat_d,lng_d) {

  var loc = {lat: lat_d, lng: lng_d};
  var panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano'), {
        position: loc,
        pov: {
          heading: 34,
          pitch: 10
        }
      });
  map.setStreetView(panorama);
}

function calculateAndDisplayRoute(my_location, destination_d) {
        directionsService.route({
          origin: my_location,
          destination: destination_d,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }


      function initMap() {

        $.ajax({
     type: "post",
     url: "get-menu.php",
     success: function(result){
      $('#area_menu').html(" ");
       $('#area_menu').html(result);
    }

  });

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      array = this.responseText.split("/");
      //store string json to array
        
      directionsService = new google.maps.DirectionsService;
      directionsDisplay = new google.maps.DirectionsRenderer;


         var myStyle = [
      
       {
         featureType: "administrative",
         elementType: "labels",
         stylers: [
           { visibility: "on" }
         ]
       },{
         featureType: "poi",
         elementType: "labels",
         stylers: [
           { visibility: "off" }
         ]
       },{
         featureType: "water",
         elementType: "labels",
         stylers: [
           { visibility: "on" }
         ]
       },{
         featureType: "road",
         elementType: "labels",
         stylers: [
           { visibility: "on" }
         ]
       }
     ];

      map = new google.maps.Map(document.getElementById('map'), {
       mapTypeControlOptions: {
         mapTypeIds: ['mystyle', google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.TERRAIN]
       },
       center: new google.maps.LatLng(14.6218748, 121.05287369999996),
       zoom: 15,
       mapTypeId: 'mystyle'
     });

      directionsDisplay.setMap(map);

     map.mapTypes.set('mystyle', new google.maps.StyledMapType(myStyle, { name: 'iPark' }));

        // Try HTML5 geolocation.
        infoWindow = new google.maps.InfoWindow;
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('<div class="info-window">You are here.</div>');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      

        for(var x = 0; x < array.length-1; x++){
          coor = array[x].split(',');
          areaobj[x] = JSON.parse(JSON.stringify({
                  lat:coor[0],
                  lng:coor[1],
                  id:coor[2],
                  slot:coor[3],
              }));

          markerIcon = {
            url: 'http://image.flaticon.com/icons/svg/252/252025.svg',
            scaledSize: new google.maps.Size(80, 80),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(32,65),
            labelOrigin: new google.maps.Point(40,33)
          };

        var markerLabel = ""+coor[3]; 
        marker = new google.maps.Marker({
          map: map,
          icon: markerIcon,
          draggable: false,
          title: coor[2],
          label:{
              text: markerLabel,
              color: "#eb3a44",
              fontSize: "16px",
              fontWeight: "bold"
            },
          animation: google.maps.Animation.DROP,
          position: {lat: parseFloat(coor[0]), lng: parseFloat(coor[1])}
        });

        markers.push(marker);

        google.maps.event.addListener(map, 'click', function(event) {
          $('#dataDisplay').hide("fade");
          clearInterval(timer);
      });

        
        marker.addListener('click', function(){
            toggleData(this.getTitle(),this.getPosition().lat(),this.getPosition().lng());
        });

        }

         var options = {
            imagePath: 'images/m',
            zoomOnClick: true,
            maxZoom: 21

        };

         var markerCluster = new MarkerClusterer(map, markers, options);

        function toggleData(data,lat,lng) {

          var id = data;
          init_panorama(lat,lng);

          $('#data').hide();
    $.ajax({
     type: "post",
     url: "getData.php",
     data: {data:id},
     success: function(result){
       $('#loader').show();
      setTimeout(function(){
       $('#data').show("fade");
        $('#data').html(result);
        $('#loader').hide();
      }, 1000);
       
    }

  });

          $('#dataDisplay').show("fade");
      }

       function init_panorama(lat_d,lng_d) {

  var loc = {lat: lat_d, lng: lng_d};
  var panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano'), {
        position: loc,
        pov: {
          heading: 34,
          pitch: 10
        }
      });
  map.setStreetView(panorama);
}





         }
  };
  xhttp.open("GET", "connect.php", true);
  xhttp.send();
     
      


    }

    $(document).ready(function(){
      var array = [];
      var id;
      //search input
      $('#search').on('keyup',function(){
        

        if(this.value != "" && this.value != null){
          $.ajax({
        
           type: "post",
           url: "search-menu.php",
           data: {data:this.value},
           success: function(result){

              $('#area_menu').html(" ");
              $('#area_menu').html(result);
             
              }
              });

          }else{

               $.ajax({
        
           type: "post",
           url: "get-menu.php",
           success: function(result){

            $('#area_menu').html(" ");
              $('#area_menu').html(result);
             
              }
              });

          }

      });
      //end search input
      setInterval(function(){
      $.ajax({
     type: "post",
     url: "connect.php",
     success: function(result){
        array = result.split("/");

        for(var x = 0; x < array.length-1; x++){
          coor = array[x].split(',');
          var label = {
            text: ""+coor[3],
              color: "#eb3a44",
              fontSize: "16px",
              fontWeight: "bold"
          }
          markers[x].setLabel(label);                                                                                                                                                     
      }

       
    }

  });
      }, 1000);



      function toggleData(data) {
          id = data.getTitle();

          $('#data').hide();

    $.ajax({
     type: "post",
     url: "getData.php",
     data: {data:id},
     success: function(result){
       $('#loader').show();
      setTimeout(function(){
       $('#data').show("fade");

       //responsive data
       $("#data").html(result);
        //
        timer = setInterval(function(){
                 $.ajax({
           type: "post",
           url: "getData-d.php",
           data: {data:id},
           success: function(result){
            console.log(id);
              $('#js').html("");
              $('#js').html(result);
            }
          });
        },2000);

        $('#loader').hide();
      
      }, 2000);
       
    }

  });

          $('#dataDisplay').show("fade");
      }

     


    });


      

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
