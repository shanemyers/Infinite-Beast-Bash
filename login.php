<!-- Infinite Beast Bash

    DAGD 460 Multimedia 2
    Shane Myers
    12/13/2015 -->

<?php

    $errs = array();
    $user = "";
    $pass = "";
    $success = false;

    if(isset($_POST['name'])){
        
        $user = $_POST['user'];
        $pass = $_POST['password'];
        
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
            $sth->bindValue(2, $user, PDO::PARAM_STR);
            $sth->bindValue(3, $pass, PDO::PARAM_STR);
            
            $sth->execute();
            
            $success = true;
        }
    }
?>


<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Infinite Beast Bash</title>
    <link rel="stylesheet" type="text/css" href="main.css">
</head>
<body>
    
    <?php
        include("header.php");


        foreach($errs as $err)
        {
            echo "<div class='error'>$err</div>";
        }
        if($success){
            echo"YAY you submitted the form";
        }

    ?>
    
    <div class="body">  

    <form action="login.php" method="post">
        <div>
            <h1>Login</h1>
        </div>
        <div>
            <label>Username:</label>
            <input name="user" value="<?=$user?>">
        </div>
        <div>
            <label>Password:</label>
            <input name="password" value="<?=$pass?>">
        </div>
        <div  class="sub">
            <input type="Submit">
        </div>
    </form>
    </div>
    
   <div class="small">
    <?php
        include("footer.php");
    ?>
    </div>
    
</body>
</html>