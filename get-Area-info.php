<?php

include "db.php";

$area = $_POST['area'];
$echo = "";

$a_sql = "SELECT area_id,area_name FROM area where area_name = '$area'";
$a_result = mysqli_query($conn,$a_sql);
if($a_result){
	$a_row = mysqli_fetch_assoc($a_result);
$sql = "SELECT * FROM property where area_id = ".$a_row['area_id']."";
$result = mysqli_query($conn,$sql);
if($result){

		
		$echo .= '<style>
					.close {
					    color: white;
					    float: right;
					    font-size: 28px;
					    font-weight: bold;
					}

					.close:hover,
					.close:focus {
					    color: #aaa;
					    text-decoration: none;
					    cursor: pointer;
					}

				</style>
				<script>
				$(document).ready(function(){
					$(".close").on("click", function(){
						$("#area-info").hide("blind");
						});

					});
				</script>
				<div class="card card-widget widget-user-2">
              <!-- Add the bg color to the header using any of the bg-* classes -->

                
              <div class="widget-user-header bg-primary" style="display:inline;">
                <!-- /.widget-user-image -->
                <h5>'.$a_row['area_name'].'
                <span class="close">&times;</span></h5>
              </div>

              <div class="card-footer p-0">
              <ul class="nav flex-column">
              ';
              $id = $a_row['area_id'];

                

				while($row = mysqli_fetch_assoc($result)){

				$slotsql = "SELECT * FROM slotsdisplay where property_id = ".$row["property_id"]."";
				$slots = mysqli_query($conn,$slotsql);
				$slotrow = mysqli_fetch_assoc($slots);

					$baseslot = $slotrow["motorBase_slot"] + $slotrow["carBase_slot"];
					$occupied = $slotrow["motor_slot"] + $slotrow["car_slot"];
					$remaining_slot = $baseslot - $occupied;
					$bg = '';
					if($remaining_slot <= 20){
						$bg = 'bg-danger';
					}else if($remaining_slot > 20 && $remaining_slot < 100){
						$bg = 'bg-warning';
					}else if($remaining_slot >= 100){
						$bg = 'bg-success';
					}
                  $echo .= '<li class="nav-item">
                    <a href="#" class="nav-link">
                      '.$row['property_name'].' <span class="float-right badge '.$bg.'">'.$remaining_slot.'</span>
                    </a>
                  </li>';
                  }

               $echo .= '</ul>
              </div>
            </div>';

            echo $echo;
}
}

?>