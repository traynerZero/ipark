<?php

include "db.php";
if($conn){

}

$id = $_POST['data'];

$sql = "SELECT * FROM property where property_id = $id";
$result = mysqli_query($conn,$sql);


$slotsql = "SELECT * FROM slotsdisplay where property_id = $id";
$slots = mysqli_query($conn,$slotsql);

if($result){
	$row = mysqli_fetch_assoc($result);
	$slotrow = mysqli_fetch_assoc($slots); // slots result
  $coor = array();
  $coor = explode(",", $row['property_coord']); 
	//baseslot = motor_baseslot + car_baseslot
	//occupied slot = motor_slot + car_slot
	//remaining slot = base slot - occupied slot
	//motor slot = motor_basesslot - motor_slot
	//car slot = car_baseslot - car_slot

	$baseslot = $slotrow["motorBase_slot"] + $slotrow["carBase_slot"];
	$occupied = $slotrow["motor_slot"] + $slotrow["car_slot"];
	$remaining_slot = $baseslot - $occupied;
	$motor_slot = $slotrow["motorBase_slot"] - $slotrow["motor_slot"];
	$car_slot = $slotrow["carBase_slot"] - $slotrow["car_slot"];
		# code...
			echo '<!-- Sidebar -->

  			<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
			<script>$(document).ready(function(){
      $(".dt-bck").on("click",function(){
          $("#dataDisplay").hide("bounce");
      });  
    });</script>

      <!-- Sidebar Menu -->
        <h1 class="dt-title"><strong>'.$row['property_name'].'</strong><br>
        <div style="padding:10px;">
        <script>

         var destination = {
              lat: '.$coor[0].',
              lng: '.$coor[1].'
            };

        </script>
        <button class="btn btn-primary" title="Direction" onclick="calculateAndDisplayRoute(pos,destination);"><span><i class="fa fa-compass"></i></span></button>
        <button class="btn btn-danger" title="Rates"><span><i class="fa fa-list-ul"></i></span></button>
        <div>
        </h1> 
        <h3 style="text-align: center;"></h3>
        <div class="row">

          <div class="col-lg-12 col-12">
            <!-- small box -->
            <div class="small-box bg-info">
              <div class="inner">
                <h3 ><i id="car_slot">'.$car_slot.'</i> &nbsp;&nbsp;&nbsp;&nbsp;<span class="fa fa-car"></span> Car slots</h3>

              </div>
              <div class="icon">
                <i class="ion ion-bag"></i>
              </div>
              
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-12 col-12">
            <!-- small box -->
            <div class="small-box bg-success">
              <div class="inner">
                <h3><i id="motor_slot">'.$motor_slot.'</i>&nbsp;&nbsp;&nbsp;&nbsp;<span class="fa fa-motorcycle"></span> Motor slots</h3>
              </div>
              <div class="icon">
                <i class="ion ion-stats-bars"></i>
              </div>
            </div>
          </div>

        </div>
      <!-- /.sidebar-menu -->
    <!-- /.sidebar -->
  </aside>';

	
}

mysqli_close($conn);
?>