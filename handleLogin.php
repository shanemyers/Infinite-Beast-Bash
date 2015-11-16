<?php

    $errs = array();
    $name = "";
    $user = "";
    $pass = "";
    $lang = "";
    $comm = "";
    $success = false;

    if(isset($_POST['name'])){
        
        $name = $_POST['name'];
        $user = $_POST['user'];
        $pass = $_POST['password'];
        $lang = $_POST['language'];
        $comm = $_POST['comment'];
        
        // do validation
        if(strlen($name) < 4)
        {
            array_push($errs, "Name is too short");
        }
        if(strlen($pass) < 6)
        {
            array_push($errs, "Passwords must be at least 6 characters long");
        }
        
        // if there are no validation errors
        if(count($errs) == 0)
        {
            // store data in database
            include("db_connect.php");
            $dbh->exec("USE fun;");
            
            $sth = $dbh->prepare("INSERT INTO forms_submissions (id, name, user, pass, Lang, Comment) VALUES(NULL, ?, ?, ?, ?, ?);");
            $sth->bindValue(1, $name, PDO::PARAM_STR);
            $sth->bindValue(2, $user, PDO::PARAM_STR);
            $sth->bindValue(3, $pass, PDO::PARAM_STR);
            $sth->bindValue(4, $lang, PDO::PARAM_STR);
            $sth->bindValue(5, $comm, PDO::PARAM_STR);
            
            $sth->execute();
            
            $success = true;
        }
    }
?><!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sign In</title>
    <style>
        body{
            background:#999;
        }
        form{
            width:550px;
            margin:0 auto;
            background: #FFF;
            border-radius: 10px;
            padding:20px;
            
        }
        form div{
            padding:5px 0;
            clear:both;
        }
        label{
            text-align: right;
            display: block;
            float: left;
            width: 200px;
            padding-right: 10px;
        }
        textarea{
            min-width:300px;
            max-width:300px;
            min-height:150px;
            max-height:150px;
        }
        form div.sub{
            margin-left:210px;
        }
        .error
        {
            width:550px;
            padding:10px 20px;
            background:#ff8000;
            margin:5px auto;
            border-radius:5px;
        }
    </style>
</head>
<body>
    
    <?php
        foreach($errs as $err)
        {
            echo "<div class='error'>$err</div>";
        }
        if($success){
            echo"YAY you submitted the form";
        }
    ?>
    
    <form action="warmup.php" method="post">
        <div>
            <label>Name:</label>
            <input name="name" value="<?=htmlentities($name)?>">
        </div>
        <div>
            <label>Username:</label>
            <input name="user" value="<?=$user?>">
        </div>
        <div>
            <label>Password:</label>
            <input name="password" value="<?=$pass?>">
        </div>
        <div>
            <label>Favorite langauge:</label>
            <select name="language">
                <option<? if($lang =="C#") echo " selected"; ?>>C#</option>
                <option<? if($lang =="PHP") echo " selected"; ?>>PHP</option>
                <option<? if($lang =="Java") echo " selected"; ?>>Java</option>
            </select>
        </div>
        <div>
            <label>Comment:</label>
            <textarea name="comment"><?=$comm?></textarea>
        </div>
        <div  class="sub">
            <input type="Submit">
        </div>
    </form>
</body>
</html>
