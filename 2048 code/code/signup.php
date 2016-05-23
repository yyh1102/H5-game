<?php
    #change the character set
    header("Content-type:text/html;charset=utf-8");
    // echo $_POST['username'];
    // echo '<br />';
    // echo $_POST['pass'];
    session_start();

    #connect to mysql
    if($con = mysqli_connect('localhost','root','xyc19960420')){
        echo "connect success".'<br />';
    }else{
        echo mysqli_error($con);
        echo "connect fail".'<br />';
    }
    #select library
    if(mysqli_select_db($con,'library')){
        echo "select success".'<br />';
    }else{
        echo mysqli_error($con);
        echo "select fail".'<br />';
    }
    #in utf8
    mysqli_query($con,"set names 'utf8'");
    $sql = "select * from manager where name = '{$_POST['username']}'";
    $res = mysqli_query($con,$sql)or die(mysqli_error($con)) ;
#print_r($res);
    $row = mysqli_fetch_row($res);
    $num = mysqli_num_rows($res);
    if($num == 0){
        echo '<script type="text/javascript"> alert("密码错误啊！！！！！！！！"); window.location='.'\''.'main.php'.'\''.'</script>';
    }
    if($row[1] == $_POST['pass']){
        $_session['account'] = $_POST['username'];
        echo '<script type="text/javascript"> alert("welcome！！！！！！！！"); window.location='.'\''.'turn.php'.'\''.'</script>';
    }else{
        echo '<script type="text/javascript"> alert("密码错误啊！！！！！！！！"); window.location='.'\''.'main.php'.'\''.'</script>';
    }
    mysqli_close($con);

?>