<?php

$conn = mysqli_connect("localhost","root","",'iparkdb1');
if($conn){

}

$id = $_POST['data'];

$sql = "SELECT * FROM area where area_id = $id";
$result = mysqli_query($conn,$sql);


$slotsql = "SELECT * FROM slots where area_id = $id";
$slots = mysqli_query($conn,$slotsql);

if($result){
	$row = mysqli_fetch_assoc($result);
	$slotrow = mysqli_fetch_assoc($slots); // slots result

	//baseslot = motor_baseslot + car_baseslot
	//occupied slot = motor_slot + car_slot
	//remaining slot = base slot - occupied slot
	//motor slot = motor_basesslot - motor_slot
	//car slot = car_baseslot - car_slot

	$baseslot = $slotrow["motor_baseslot"] + $slotrow["car_baseslot"];
	$occupied = $slotrow["motor_slot"] + $slotrow["car_slot"];
	$remaining_slot = $baseslot - $occupied;
	$motor_slot = $slotrow["motor_baseslot"] - $slotrow["motor_slot"];
	$car_slot = $slotrow["car_baseslot"] - $slotrow["car_slot"];
		# code...
			echo '<!-- Sidebar -->

  			<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
			<script>$(document).ready(function(){
      $(".dt-bck").on("click",function(){
          $("#dataDisplay").hide("bounce");
      });  
    });</script>

        <div class="bg-pic">
            <div class="dt-bck"><span class="fa fa-arrow-right"></span></div>
            <img src="images/Picture3.png">
        </div>
      <!-- Sidebar Menu -->
        <h1 class="dt-title"><strong>'.$row['area_name'].'</strong></h1>
        <h3 style="text-align: center;"></h3>
        <div class="row">
          <div class="col-lg-12 col-12">
          <div class="small-box bg-danger">
          <div class="inner">
               <h3><i id="remaining_slot">'.$remaining_slot.'</i> &nbsp;&nbsp;&nbsp;&nbsp;<span class="fas fa-parking"></span> Slots Available</h3>
          </div>
          </div>
          </div>

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
          <!-- ./col -->
        </div>
      <!-- /.sidebar-menu -->
    <!-- /.sidebar -->
  </aside>';

	
}

mysqli_close($conn);
?>