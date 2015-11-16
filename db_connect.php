<?php
    
    //database handler
    //$dbh = new PDO("type","username","pass");
    try{
        $dbh = new PDO("mysql:host=127.0.0.1;dbname=classicmodels","root","root");
    }catch(Exception $e)
    {
        die($e->getMessage());
    }
?>