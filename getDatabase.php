<?php
    
/* Infinite Beast Bash

    DAGD 460 Multimedia 2
    Shane Myers
    12/13/2015 */


    try{
    $dbh = new PDO("mysql:host=127.0.0.1;dbname=names", "root", "root");
    }catch(Exception $e){
        die("NOOOOOOOO!");
        
    }

    /* * is for all */
    /* $res is a PDO statement*/
    $res = $dbh->prepare("SELECT * FROM name");
    $res->execute();


    echo "<names>";

    while($row = $res->fetch(PDO::FETCH_ASSOC)){
        echo"<name>";
        

        echo"<id>{$row['ID']}</id>";
        echo"<adj>{$row['adjective']}</adj>";
        
        
        echo"</name>";
    }

    echo "</names>";
?>