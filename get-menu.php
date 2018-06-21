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
        <a href="#" class="nav-link"><p>'.$row['area_name'].'<i class="right fa fa-angle-left"></i></p></a>
        <ul class="nav nav-treeview">';
        	while($prop_row = mysqli_fetch_assoc($prop_result)){
        	$echo .='<li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="fa fa-circle-o nav-icon"></i>
                  <p>'.$prop_row['property_name'].'</p>
                </a>
              </li>';
              }
            $echo .='</ul>
      </li>';

	}
	echo $echo;
}

mysqli_close($conn);
?>