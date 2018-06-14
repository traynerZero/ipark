<?php

$conn = mysqli_connect("localhost","root","",'iparkdb1');
if($conn){

}

$sql = "SELECT * FROM area";
$result = mysqli_query($conn,$sql);

if($result){
	while ($row = mysqli_fetch_assoc($result)) {
		# code...
			$id = $row["area_id"];
			$slotsql = "SELECT * FROM slots where area_id = $id";
			$slots = mysqli_query($conn,$slotsql);

			$slotrow = mysqli_fetch_assoc($slots);
			$baseslot = $slotrow["motor_baseslot"] + $slotrow["car_baseslot"];
			$occupied = $slotrow["motor_slot"] + $slotrow["car_slot"];
			$remaining_slot = $baseslot - $occupied;

			echo $row["area_coord"].",".$row["area_id"].",".$remaining_slot." /";

	}
}

mysqli_close($conn);
?>