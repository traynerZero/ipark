<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="x-ua-compatible" content="ie=edge">

  <title>iPark</title>

  <!-- Font Awesome Icons -->
  <link rel="stylesheet" type="text/css" href="css/main.css">

  <link rel="stylesheet" href="plugins/font-awesome/css/font-awesome.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="dist/css/adminlte.css">
  <!-- Google Font: Source Sans Pro -->
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">



<!-- REQUIRED SCRIPTS -->
<!-- jQuery -->
<script src="plugins/jquery/jquery.min.js"></script>
<!-- Bootstrap -->
<script src="plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- AdminLTE App -->
<script src="dist/js/adminlte.js"></script>

<!-- OPTIONAL SCRIPTS -->
<script src="dist/js/demo.js"></script>

<!-- PAGE PLUGINS -->
<!-- SparkLine -->
<script src="plugins/sparkline/jquery.sparkline.min.js"></script>
<!-- jVectorMap -->
<script src="plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
<script src="plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
<!-- SlimScroll 1.3.0 -->
<script src="plugins/slimScroll/jquery.slimscroll.min.js"></script>
<!-- PAGE SCRIPTS -->
<script src="dist/js/pages/dashboard2.js"></script>

    <script type="text/javascript" src="js/main.js"></script>
    <script type="text/javascript" src="js/markerclusterer.js"></script>

</head>
<body class="hold-transition sidebar-mini">
  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand bg-white navbar-light border-bottom" style="width: 12%;">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li id="navbar-show" class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#"><i class="fa fa-bars"></i></a>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->

  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-light-primary elevation-4">
    <!-- Brand Logo -->
    <a href="http://www.ipark.ph/" class="brand-link">
      <img src="dist/img/picture2.png" alt="iPark Logo"
           style="width: 100%;">
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

        
      <form class="form-inline ml-3">
      <div class="input-group wrap-input100 rs1-wrap-input100">
        <div class="row">
        <input class="input100" type="search" placeholder="Search" aria-label="Search" id="search" autocomplete="off">
        <span class="focus-input100"></span>
        </div>
      </div>
    </form>
          <div id="area_menu">
            
          </div>
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          
           
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <div id="map"></div>
    
     <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCTgczb7Vc891EnJeEgFyPBg3XCu-Pf2Vk&callback=initMap"
  type="text/javascript"></script>
      <section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

  <!-- /.control-sidebar -->
<!-- ./wrapper -->
<!-- Modal -->


<aside class="main-sidebar-left sidebar-light-primary elevation-4" id="dataDisplay" style="display: none;">
    <div id="pano" style="height: 50vh;">
      
    </div>
     <div id="data">
        
      </div>
      <div id="js">
        
      </div>
      <div id="loader" class="lds-dual-ring" style="display: none;"></div>

</body>
</html>
