<?php  
 #connect to mysql
    header("Content-type:text/html;charset=utf-8");
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
$name=$_POST['name'];  
$password=$_POST['password'];  
$pwd_again=$_POST['pwd_again'];  
// $code=$_POST['check'];  
if($name==""|| $password=="")  
{  
    echo"用户名或者密码不能为空";  
}  
else   
{  
    if($password!=$pwd_again)  
    {  
        echo"两次输入的密码不一致,请重新输入！";  
        echo"<a href='register.php'>重新输入</a>";  
          
    }  
    // else if($code!=$_SESSION['check'])  
    // {  
    //     echo"验证码错误！";  
    // }  
    else  
    {  
        $int = rand();
        mysqli_query($con,"set names 'utf8'");
        $sql="insert into user values('$int','$name','$password')";  
        $result=mysqli_query($con,$sql)or die(mysqli_error($con)) ;
        if(!$result)  
        {  
            echo"注册不成功！";  
            echo"<a href='register.php'>返回</a>";  
        }  
        else   
        {  
            echo '<script type="text/javascript"> alert("welcome！！！！！！！！"); window.location='.'\''.'webpage.html'.'\''.'</script>';
        }  
    }  
}  
?>  
