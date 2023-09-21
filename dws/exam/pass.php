<!DOCTYPE html>
<html>
    <head>
        <title>アクション</title>
    </head>
    <body>
        <?php
            if (strcmp($_POST[id], "つのだ") == 0 && strcmp($_POST[pw], "pass1234") == 0) {
                echo "成功";
            }
            else {
                echo "失敗";
            }
        ?>
    </body>
</html>