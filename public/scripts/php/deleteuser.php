<?php
    require_once('../lib/db.php');

    $pdo = (new DB)->ReturnConnection();

    $statement = $pdo->prepare("DELETE FROM users WHERE ID = ?");
    $statement->execute(array($_POST["id"]));

    if($statement->rowCount() == 1){
        echo "100";
    }else{
        $pdo = null;
        die("200");
    }

    $pdo = null;
?>