

  var coor = [];
  var marker,marker2;
  var markers= []; //array of markers
  var markerIcon;
  var timer;
 var array = [];
 var areaobj = [];

  var map, infoWindow;

  // The map, centered at Uluru
      function initMap() {

        $.ajax({
     type: "post",
     url: "get-menu.php",
     success: function(result){

       $('#area_menu').html(result);
    }

  });

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      array = this.responseText.split("/");
      //store string json to array
        
   


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
       zoom: 17,
       mapTypeId: 'mystyle'
     });

     map.mapTypes.set('mystyle', new google.maps.StyledMapType(myStyle, { name: 'iPark' }));

        // Try HTML5 geolocation.

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



        google.maps.event.addListener(map, 'zoom_changed', function(event) {
          var bound = new google.maps.LatLngBounds();
          if(map.getZoom() == 16){

           



      //   marker2.addListener('click', function(){
      //       toggleData(this);
      //   });

      //       console.log( bound.getCenter().lat() );
            }
      });

        
        marker.addListener('click', function(){
            toggleData(this);
        });

        }
        function toggleData(data) {

          var id = data.getTitle();
          var lat = data.getPosition().lat();
          var lng = data.getPosition().lng();
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
        // marker = new google.maps.Marker({
        //   map: map,
        //   icon: markerIcon,
        //   draggable: false,
        //   title: coor[2],
        //   label:{
        //       text: ""+coor[3],
        //       color: "#eb3a44",
        //       fontSize: "16px",
        //       fontWeight: "bold"
        //     },
        //   position: {lat: parseFloat(coor[0]), lng: parseFloat(coor[1])}
        // });

        // marker.addListener('click', function(){
        //     toggleData(this);
        // });
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
