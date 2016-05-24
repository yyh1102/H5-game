<html>
    <head>
        <title>图书入库</title>
        <meta charset="UTF-8"  />
        <script type="text/javascript"></script>
        <style type="text/css">
            td { height: 24px;  }
            input {  height: 24px;  }
            .wh {
                width: 400px;
                margin: 100px 450px;
            }
            td.input {  width: 30px;  }
        </style>
    </head>
    <body>
    <div class=\"tip\">
        <input type="button" value="返回" onclick="javascript:window.location='turn.php'">
    </div>
        <div class="wh">
            <form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
                <fieldset>
                    <legend>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;图书入库&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</legend>
                    <table style="margin: 0 auto">
                        <tr><td><input type="radio" name="op" value="one">单本入库</td>
                            <td><input type="radio" name="op" value="more">批量入库</td></tr>
                        <tr><td>书号：<input type="text" name="bno"/></td>
                        <td>类别：<input type="text" name="category"/></td></tr>
                        <tr><td>书名：<input type="text" name="title"/></td>
                        <td>出版社：<input type="text" name="press"/></td></tr>
                        <tr><td>年份：<input type="text" name="year"/></td>
                        <td>作者：<input type="text" name="author"/></td></tr>
                        <tr><td>价格：<input type="text" name="price"/></td>
                        <td>数量：<input type="text" name="num"/></td></tr>
                        <tr><td><input type="submit" value="确定"></td></tr>
                    </table>
                </fieldset>
            </form>
        </div>
    </body>
</html>
<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $mysqli_server_name = "localhost";
        $mysqli_username = "root";
        $mysqli_password = "xyc19960420";
        $mysqli_database = "library";
        $conn = mysqli_connect($mysqli_server_name, $mysqli_username, $mysqli_password);
        mysqli_select_db($conn, $mysqli_database);
        if($_POST["op"]=="one") {
            //单本入库，数据从网页表单获取
            function _post($str)
            {
                $val = !empty($_POST[$str]) ? $_POST[$str] : null;
                return $val;
            }

            $bno = _post('bno');
            $category = _post('category');
            $title = _post('title');
            $press = _post('press');
            $year = (int)_post('year');
            $author = _post('author');
            $price = _post('price');
            $num = (int)_post('num');

            //判断是否已有该书
            $sql = "select * from book where book.bno = $bno";
            $result = mysqli_query($conn, $sql);
            if ($result->num_rows) {
                $sql = "update book set book.total =  book.total +" . $num . ",book.stock = book.stock +" . $num . " where book.bno = $bno";
                $result = mysqli_query($conn, $sql);
                echo mysqli_error($conn);

            } else {
                //插入该书
                $sql = "insert into book values ('$bno','$category','$title','$press','$year','$author','$price','$num','$num')";
                mysqli_query($conn, $sql);
                echo mysqli_error($conn);

            }
            mysqli_close($conn);
        }elseif ($_POST["op"]=="more"){
            //批量入库，数据从文本中获取，每行内容如下：
            //书号,类别,书名,出版社,年份,作者,价格,数量
            //读取文件数据
            $file='book.txt';
            $handle=fopen($file,'r');
            while (!feof($handle)){
                $row = fgets($handle);
                if ($row){
                    $content = explode(',',$row);
                    $bno=$content[0];
                    $category=$content[1];
                    $title=$content[2];
                    $press=$content[3];
                    $year=(int)$content[4];
                    $author=$content[5];
                    $price=$content[6];
                    $num=(int)$content[7];
                }
                //判断是否已有该书
                $sql="select * from book where book.bno = $bno";
                $result=mysqli_query($conn, $sql);
                if($result->num_rows){
                    $sql="update book set book.total =  book.total +".$num.",book.stock = book.stock +".$num." where book.bno = $bno";
                    $result=mysqli_query($conn,$sql);
                    echo mysqli_error($conn);
                }else{
                    //插入该书
                    $sql="insert into book values ('$bno','$category','$title','$press','$year','$author','$price','$num','$num')";
                    mysqli_query($conn,$sql);
                    echo mysqli_error($conn);
                }
            }
            mysqli_close($conn);
        }
    }
?>