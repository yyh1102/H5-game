<?php
    header("Content-Type:text/html;charset=utf-8");
    
    date_default_timezone_set("Asia/shanghai");
    $borrow_time = date("Y-m-d") ;
    $return_time=date("Y-m-d",strtotime("+30 days"));
    include("config.php");

    
    $sel="SELECT * FROM book WHERE bno=".$_GET['bno'];
    $outcome= mysqli_query($online,$sel);
    while($sql = mysqli_fetch_array($outcome))
    {
        if ($sql['bno'] == $_GET['bno'])
        {
            if ($sql['stock'] >= 1)
            {
    
                $number = $sql['stock']-1;
                $between_2="UPDATE book SET stock = '". $number ."' WHERE bno = '". $_GET['bno'] . "'";
                mysqli_query($online,$between_2);
                echo mysqli_error($online);
    
                session_start();
                
                $ins="INSERT INTO borrow  VALUES ('$_GET[cno]','$_GET[bno]','$borrow_time','$return_time','$_SESSION[account]')";
                mysqli_query($online,$ins);
                echo mysqli_error($online);
            }
            else
            {
                echo '<script type="text/javascript"> alert("该图书已借完"); window.location='.'\''.'Borrow&return_UI.php'.'\''.' </script>';
                exit();
            }
        }
    }
    mysqli_close($online);
    echo '<script type="text/javascript"> alert("图书借阅成功"); window.location='.'\''.'Borrow&return_UI.php'.'\''.'</script>';
    exit();
?>