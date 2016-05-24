<?php

	header("Content-Type:text/html;charset=utf-8");
	
	include("config.php");
    header("Content-Type:text/html;charset=utf-8");

    date_default_timezone_set("Asia/shanghai");
    $borrow_time = date("Y-m-d") ;
	$sel="SELECT * FROM book WHERE bno=".$_GET['bno'];
    $sel1="SELECT * FROM borrow WHERE bno = '".$_GET['bno']."'AND cno = '".$_GET['cno']."'";
	$outcome= mysqli_query($online,$sel);
    $outcome1=mysqli_query($online,$sel1);

    if(mysqli_num_rows($outcome1)==0) {
        echo '<script type="text/javascript"> alert("没有借书记录"); window.location=' . '\'' . 'Borrow&return_UI.php' . '\'' . '</script>';
        exit();
    }
    else{
        while($sql = mysqli_fetch_array($outcome))
        {

            if ($sql['bno'] == $_GET['bno'])
            {

                $number = $sql['stock']+1;


                $between_2="UPDATE book SET stock = '". $number ."' WHERE bno = '". $_GET['bno'] . "'";
                mysqli_query($online,$between_2);
                echo mysqli_error($online);

                session_start();

                $mysql="DELETE FROM borrow WHERE bno = '".$_GET['bno']."'AND cno = '".$_GET['cno']."'";

                mysqli_query($online,$mysql);

            }
        }
        mysqli_close($online);
        echo '<script type="text/javascript"> alert("图书归还成功"); window.location='.'\''.'Borrow&return_UI.php'.'\''.'</script>';
        exit();
    }


?>
