<?php

$conn = mysqli_connect("localhost","root","",'iparkdb1');
if($conn){

}

if(isset($_POST['data'])){
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
			echo '<script>
      $(document).ready(function(){
        $("#remaining_slot").html(" ");
        $("#car_slot").html(" ");
        $("#motor_slot").html(" ");

        $("#remaining_slot").html("'.$remaining_slot.'");
        $("#car_slot").html("'.$car_slot.'");
        $("#motor_slot").html("'.$motor_slot.'");
        });
      </script>';

	
}


mysqli_close($conn);
}
?>