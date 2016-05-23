<!DOCTYPE HTML>
<html>
    <head>
        <meta http-equiv = "Content-Type" conteng = "text/html;charset = utf-8">
        <title>借书证管理系统</title>
        <style>        
        span{
        color:blue;
        }
        </style>
    </head>
    <body>
    <div class=\"tip\">
        <input type="button" value="返回" onclick="javascript:window.location='turn.php'">
    </div>
    <h1>借书证管理系统</h1>
    <div class="wh">

        <form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
            <fieldset>
                <legend><h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;账号加减&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h2></legend>
                <table align="center">
                    <tr>
                        <td>卡号：</td>
                        <td><input type="text" name="cno"/></td>
                    </tr>
                    <tr>
                        <td>姓名：</td>
                        <td><input type="text" name="name"/></td>
                    </tr>
                    <tr>
                        <td>部门（系）：</td>
                        <td><input type="text" name="depart"/></td>
                    </tr>
                    <tr>
                        <td>类型：</td>
                        <td><input type="text" name="type"/></td>
                    </tr>
                    <tr>
                        <td><input type="radio" name="op" value="add"></td>
                        <td>增加</td>
                        <td><input type="radio" name="op" value="sub"></td>
                        <td>删除</td>
                        <td><input type="submit" value="确定"></td>
                    </tr>
                </table>
            </fieldset>
    </div>
    </form>
    </center>
    </body>
</html>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST"){
        if($_POST["op"]=="add"){
            echo '<script type="text/javascript">alert("增加");window.location='.'\''.'add.php?cno='.$_POST['cno']."&&name=".$_POST['name']."&&dep=".$_POST['depart']."&& type=".$_POST['type'].'\''.' </script>';
        }
        if($_POST["op"]=="sub"){
            echo '<script type="text/javascript">window.location='.'\''.'sub.php?cno='.$_POST['cno']."&& name=".$_POST['Lname'].'\''.' </script>';
        }
}
    ?><center>
