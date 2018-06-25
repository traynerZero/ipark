<?php

include "db.php";
if($conn){

}

$sql = "SELECT * FROM property";
$result = mysqli_query($conn,$sql);

if($result){
	while ($row = mysqli_fetch_assoc($result)) {
		# code...
			$id = $row["property_id"];
			$slotsql = "SELECT * FROM slotsdisplay where property_id = $id";
			$slots = mysqli_query($conn,$slotsql);

			$area_sql = "SELECT * FROM area where area_id = ".$row['area_id']."";
			$area_result = mysqli_query($conn,$area_sql);
			$area_row = mysqli_fetch_assoc($area_result);

			$slotrow = mysqli_fetch_assoc($slots);
			$baseslot = $slotrow["motorBase_slot"] + $slotrow["carBase_slot"];
			$occupied = $slotrow["motor_slot"] + $slotrow["car_slot"];
			$remaining_slot = $baseslot - $occupied;

			echo $row["property_coord"].",".$row["property_id"].",".$remaining_slot.",".$row['area_id'].",".$area_row['area_name']." /";

	}
}

mysqli_close($conn);
?>