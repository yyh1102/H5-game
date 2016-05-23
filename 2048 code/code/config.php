<?php
	
	$online = mysqli_connect("localhost","root","xyc19960420");
	echo "<meta charset='utf-8' />";
	header("Content-type:text/html;charset:utf-8");
	mysqli_select_db($online,"library");
	mysqli_query($online,"set names utf8");

?>