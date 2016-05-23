<html>
    <head>
        <title>图书查询</title>
        <meta charset="UTF-8"  />
        <script type="text/javascript"></script>
        <style type="text/css">
            td {
                text-align:left;
                height: 24px;  }
            input {  height: 24px;  }
            .wh {
                width: 400px;
                margin: 100px 450px;
                text-align:left;
            }
            td.input {  width: 30px;  }
        </style>
    </head>
    <body>
        <div class="wh">
            <form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
                <fieldset>
                    <legend>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;图书查询&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</legend>
                    <table>
                        <tr><td><span>操作</span>
                            <select name="select1">
                                <option value="0">请选择</option>
                                <option value="bno">书号</option>
                                <option value="category">类别</option>
                                <option value="title">书名</option>
                                <option value="press">出版社</option>
                                <option value="year">年份</option>
                                <option value="year1">年份区间</option>
                                <option value="author">作者</option>
                                <option value="price">价格</option>
                                <option value="price1">价格区间</option>
                            </select></td>
                            <td>  关键字<input type="text" name="input" style="width:140px;"/></td></tr>
                            <tr><td><span>排序</span>
                                <select name="select2">
                                    <option value="title">请选择</option>
                                    <option value="bno">书号</option>
                                    <option value="category">类别</option>
                                    <option value="title">书名</option>
                                    <option value="press">出版社</option>
                                    <option value="year">年份</option>
                                    <option value="author">作者</option>
                                    <option value="price">价格</option>
                                </select></td>
                            <td>区间 <input type="text" name="bot" style="width:72px;"/> <input type="text" name="top" style="width:72px;"/></td>
                            <td><input type="submit" value="确定"></td></tr>
                        <?php
                            if ($_SERVER["REQUEST_METHOD"] == "POST"){
                                $mysql_server_name="localhost";
                                $mysql_username="root";
                                $mysql_password="xyc19960420";
                                $mysqli_database="library";
                                $conn=mysqli_connect($mysql_server_name, $mysql_username,$mysql_password);
                                mysqli_select_db($conn, $mysqli_database);

                                if($_POST['select1']=="0"){
                                    $sql="SELECT * FROM book order by book.$_POST[select2] limit 50";
                                }elseif($_POST['select1']=='year1'){
                                    $sql="select * from book where book.year >= $_POST[bot] AND book.year <= $_POST[top] order by book.$_POST[select2] limit 50";
                                }elseif($_POST['select1']=='price1'){
                                    $sql="select * from book where book.price >= $_POST[bot] AND book.price <= $_POST[top] order by book.$_POST[select2] limit 50";
                                }else{
                                    $sql="select * from book where book.$_POST[select1]='$_POST[input]' order by book.$_POST[select2] limit 50";
                                }

                                $result=mysqli_query($conn, $sql);
                                echo mysqli_error($conn);
                                echo '<table border="1" style="margin: 0 auto">';
                                echo '<tr><td>序号</td>';
                                echo '<td>书号</td>';
                                echo '<td>类别</td>';
                                echo '<td>书名</td>';
                                echo '<td>出版社</td>';
                                echo '<td>年份</td>';
                                echo '<td>作者</td>';
                                echo '<td>价格</td>';
                                echo '<td>总藏书量</td>';
                                echo '<td>库存</td></tr>';
                                mysqli_data_seek($result, 0);
                                $line=1;
                                while ($row=mysqli_fetch_row($result))
                                {
                                    echo "<tr><td>$line</td></b>";
                                    for ($i=0; $i<mysqli_num_fields($result); $i++ )
                                    {
                                        echo '<td >';
                                        echo $row[$i];
                                        echo '</td>';
                                    }
                                    echo "</tr></b>";
                                    $line++;
                                }
                                echo "</table></b>";
                                echo "</font>";
                                mysqli_free_result($result);
                                mysqli_close($conn);
                            }
                        ?>
                    </table>
                </fieldset>
            </form>
        </div>
    </body>
</html>