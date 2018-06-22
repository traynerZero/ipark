<?php
include "db.php";

if($conn){

}

$data = $_POST['data'];

$data = mysqli_real_escape_string($conn, $data);

$sql = "SELECT * FROM property where property_name LIKE '%".$data."%'  ";
$result = mysqli_query($conn,$sql);
$row_cnt = mysqli_num_rows($result);
$echo = "";
if($row_cnt != 0){
	while($prop_row = mysqli_fetch_assoc($result)){
          $coor = array();
          $coor = explode(",", $prop_row['property_coord']); 
          $echo .='<li id="'.$prop_row['property_id'].'" class="nav-item">
                <a href="#" class="nav-link">
                  <i class="fa fa-circle-o nav-icon"></i>
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
	echo $echo;
}else{
  echo "<h4 style='color:red; padding:10px;'>No Result</h4>";
}

mysqli_close($conn);

?>