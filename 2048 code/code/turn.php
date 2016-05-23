<!DOCTYPE HTML>
<html>
    <head>
        <meta http-equiv = "Content-Type" conteng = "text/html;charset = utf-8">
        <title>图书管理系统</title>
        <style>        
        span{
        color:blue;
        }
        </style>
    </head>
    <body><center>
        <h1>选择操作</h1>
        <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
            <input type="radio" value="借书还书"  name="op" />借书还书&nbsp;&nbsp;
            <input type="radio" value="入库"  name="op" />入库&nbsp;&nbsp;
            <input type="radio" value="查书"  name="op" />查书&nbsp;&nbsp;
            <input type="radio" value="管理"  name="op" />管理&nbsp;&nbsp;
            <input type="submit" value="确定" />&nbsp;&nbsp;
        </form>
        </center>
    </body>
</html>
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if($_POST['op']=="借书还书")
        echo '<script type="text/javascript">  window.location='.'\''.'Borrow&return_UI.php'.'\''.'</script>';
    if($_POST['op']=="入库")
        echo '<script type="text/javascript">  window.location='.'\''.'insert.php'.'\''.'</script>';
    if($_POST['op']=="查书")
        echo '<script type="text/javascript">  window.location='.'\''.'search.php'.'\''.'</script>';
    if($_POST['op']=="管理")
        echo '<script type="text/javascript">  window.location='.'\''.'manage.php'.'\''.'</script>';
}
