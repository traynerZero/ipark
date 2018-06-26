<?php
include "db.php";

if($conn){

}

$sql = "SELECT * FROM area";
$result = mysqli_query($conn,$sql);
$echo = "";
if($result){
	while ($row = mysqli_fetch_assoc($result)) {
		# code...
		$prop_sql = "SELECT * FROM property where area_id = '".$row['area_id']."'";
		$prop_result = mysqli_query($conn,$prop_sql);
		$echo .= '<li class="nav-item has-treeview">
        <a href="#" class="nav-link"><i class="fa fa-list-ul"></i> &nbsp;<p>'.$row['area_name'].'<i class="right fa fa-angle-left"></i></p></a>
        <ul class="nav nav-treeview">';
        	while($prop_row = mysqli_fetch_assoc($prop_result)){

            $slotsql = "SELECT * FROM slotsdisplay where property_id = ".$prop_row["property_id"]."";
        $slots = mysqli_query($conn,$slotsql);
        $slotrow = mysqli_fetch_assoc($slots);

          $baseslot = $slotrow["motorBase_slot"] + $slotrow["carBase_slot"];
          $occupied = $slotrow["motor_slot"] + $slotrow["car_slot"];
          $remaining_slot = $baseslot - $occupied;
          $bg = '';

        	$coor = array();
        	$coor = explode(",", $prop_row['property_coord']); 
        	$echo .='<li id="'.$prop_row['property_id'].'" class="nav-item">
                <a href="#" class="nav-link">
                  <span class="float-right badge" id="prop'.$prop_row['property_id'].'">'.$remaining_slot.'</span>
                  <p>'.$prop_row['property_name'].'</p>
                </a>
              </li>
              <script>
              $(document).ready(function(){

              	$("#'.$prop_row['property_id'].'").on("click",function(){
			          map.setZoom(21);
			          map.setCenter(new google.maps.LatLng('.$coor[0].', '.$coor[1].'));
			          toggleThis('.$prop_row['property_id'].','.$coor[0].','.$coor[1].');
			          });
			        });

              </script>';
              }
            $echo .='</ul>
      </li>';

	}
	echo $echo;
}

mysqli_close($conn);
?>