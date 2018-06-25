

  var coor = [];
  var marker,marker2;
  var markers= [];//array of markers
  var cluster_markers= [];
  var area_array = [];
  var area_id_array = []; 
  var markerIcon;
  var timer,pos;
  var imageUrl = 'images/icon_transp.png';
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

function createMarker(latlng, title) {

    var marker = new google.maps.Marker({
        position: latlng,
        icon: markerIcon,
        title: title,
        map: map
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(title);
        infowindow.open(map, marker);
    });
}


function calculateAndDisplayRoute(my_location, destination_d) {

        createMarker(my_location,'start');
        createMarker(destination_d,'end');


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

     directionsDisplay = new google.maps.DirectionsRenderer({
                suppressMarkers: true
            });

      map = new google.maps.Map(document.getElementById('map'), {
       mapTypeControlOptions: {
         mapTypeIds: ['mystyle', google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.TERRAIN]
       },
        rotateControl: true,
       center: new google.maps.LatLng(14.6218748, 121.05287369999996),
       zoom: 15,
       mapTypeId: 'mystyle'
     });

      directionsDisplay.setMap(map);

     map.mapTypes.set('mystyle', new google.maps.StyledMapType(myStyle, { name: 'iPark' }));
     map.mapTypes.set(google.maps.MapTypeId.HYBRID, new google.maps.StyledMapType(google.maps.MapTypeId.HYBRID, { name: 'Satellite' }));

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
                  area_id:coor[4],
                  area_name:coor[5],
              }));

          markerIcon = {
            url: imageUrl,
            scaledSize: new google.maps.Size(200, 200),
            origin: new google.maps.Point(-35,0),
            anchor: new google.maps.Point(103,125),
            labelOrigin: new google.maps.Point(130,67)
          };

        var markerLabel = ""+coor[3]; 
        marker = new google.maps.Marker({
          map: map,
          icon: markerIcon,
          draggable: false,
          title: coor[2],
          label:{
              text: markerLabel,
              color: "#0a4b72",
              fontSize: "16px",
              fontWeight: "bold"
            },
          animation: google.maps.Animation.DROP,
          position: {lat: parseFloat(coor[0]), lng: parseFloat(coor[1])}
        });

        markers.push(marker);
        area_array.push(coor[4]);
        area_id_array.push(coor[5]);
        

        google.maps.event.addListener(map, 'click', function(event) {
          $('#dataDisplay').hide("fade");
          clearInterval(timer);
      });

        
        marker.addListener('click', function(){
            map.setZoom(21);
           map.setCenter(new google.maps.LatLng(this.getPosition().lat(),this.getPosition().lng()));
            toggleData(this.getTitle(),this.getPosition().lat(),this.getPosition().lng());
        });

        }

        for(var y=0; y < area_array.length; y++){
          cluster_markers = [];
        for(var x = 0; x < markers.length; x++){
          if(area_array[y] == areaobj[x].area_id){
            cluster_markers.push(markers[x]);
         }
        }

        var options = {
            imagePath: 'images/m',
            zoomOnClick: true,
            maxZoom: 21
        };

         var markerCluster = new MarkerClusterer(map, cluster_markers, options,area_id_array[y]);

      }
        

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
              color: "#0a4b72",
              fontSize: "16px",
              fontWeight: "bold"
          }

         

          if(coor[3] <= 20){
            imageUrl = 'images/icon_red.png';

            markers[x].setIcon(updateMarker(imageUrl));
          }
          else if(coor[3] > 20 && coor[3]<100){
            imageUrl = 'images/icon_orange.png';

            markers[x].setIcon(updateMarker(imageUrl));
          }
          else if(coor[3] >= 100){
            imageUrl = 'images/icon_green.png';

            

            markers[x].setIcon(updateMarker(imageUrl));
          }

          markers[x].setLabel(label);                                                                                                                                                     
      }

       
    }

  });
      }, 1000);

      function updateMarker(imageUrl_d){
        var markerIcon_d = {
            url: imageUrl_d,
            scaledSize: new google.maps.Size(200, 200),
            origin: new google.maps.Point(-35,0),
            anchor: new google.maps.Point(103,125),
            labelOrigin: new google.maps.Point(130,67)
          };

          return markerIcon_d;
      }

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
