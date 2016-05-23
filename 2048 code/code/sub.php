<?php

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
    $ins = "delete from card where cno='$_GET[cno]'";
    mysqli_query($con,$ins);
    $uid = mysqli_insert_id($con);
    echo $uid;
    echo '<script type="text/javascript">  window.location='.'\''.'manage.php'.'\''.'</script>';
?>