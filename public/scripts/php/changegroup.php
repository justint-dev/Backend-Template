<?php
    require_once('../lib/db.php');
    
    $pdo = (new DB)->ReturnConnection();
    $statement = $pdo->prepare("Update users SET UsergroupID = ? WHERE ID = ?");

    if($statement->execute(array($_POST["group"], $_POST["id"]))){
        echo "100";
    }else{
        $pdo = null;
        die("200");
    }

    $pdo = null;
?>