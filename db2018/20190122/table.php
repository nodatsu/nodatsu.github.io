<!DOCTYPE html>
<html lang ="ja">
<head>
 	<meta charset="UTF-8">
</head>
<body>

<table border="1">
<tr>
	<th>no</th><th>name</th><th>price</th>
</tr>

<?php
	$con = mysqli_connect("localhost", "si16000", "si16000");
	mysqli_select_db($con, "db_sample01");
	$res = mysqli_query($con, "select * from fruits;");
	while($row = mysqli_fetch_array($res)) {

	print "<tr>";
	print "<td>";
	print $row["no"];
	print "</td>";
	print "<td>";
	print $row["name"];
	print "</td>";
	print "<td>";
	print $row["price"];
	print "</td>";
	print "</tr>";

	}
	mysqli_free_result($res);
	mysqli_close($con);
?>

</table>

</body>
</html>
