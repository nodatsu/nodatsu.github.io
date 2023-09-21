<!DOCTYPE html>
<html>
    <head>
     	<title>アクション</title>
    </head>
    <?php
        echo "<body style=\"background: {$_POST[color]};\">";
    ?>
    	<?php
            echo "背景を{$_POST[color]}にします。";
    	?>
    </body>
</html>
