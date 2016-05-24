<?php
    #change the character set
    header("Content-type:text/html;charset=utf-8");
    echo "进来了";
    #connect to mysql
    if($con = mysqli_connect('localhost','root','mysql123')){
        echo "connect success".'<br />';
    }else{
        echo mysqli_error($con);
        echo "connect fail".'<br />';
    }
    #select library
    if(mysqli_select_db($con,'Game2048')){
        echo "select success".'<br />';
    }else{
        echo mysqli_error($con);
        echo "select fail".'<br />';
    }
    #in utf8
    mysqli_query($con,"set names 'utf8'");
    $sql = "insert table score values('{$_session['id']}','{$_session['account']}',$score)";
    mysqli_close($con);
    echo "gg";
    echo $_session['id'],$_session['account'],$score;
?>