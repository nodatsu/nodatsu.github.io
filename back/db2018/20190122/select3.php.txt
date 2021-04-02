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
	mysqli_select_db($con, "db_sample02");
	$res = mysqli_query($con, "select * from post where code7 = \"$_POST[keyword]\";");
	while($row = mysqli_fetch_array($res)) {

	print "<tr>";
	print "<td>";
	print $row["code7"];
	print "</td>";
	print "<td>";
	print $row["area2"];
	print "</td>";
	print "<td>";
	print $row["area3"];
	print "</td>";
	print "</tr>";

	}
	mysqli_free_result($res);
	mysqli_close($con);
?>

</table>

</body>
</html>
