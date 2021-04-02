<!DOCTYPE html>
<html lang ="ja">
<head>
 	<meta charset="UTF-8">
</head>
<body>

<?php
	$con = mysqli_connect("localhost", "si16000", "si16000");
	mysqli_select_db($con, "db_sample01");
	$res = mysqli_query($con, "select * from fruits;");
	while($row = mysqli_fetch_array($res)) {
		print_r($row);
	}
	mysqli_free_result($res);
	mysqli_close($con);
?>

</body>
</html>
