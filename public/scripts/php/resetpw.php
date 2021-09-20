<?php
    require_once('../lib/db.php');

    $pdo = (new DB)->ReturnConnection();
    $statement = $pdo->prepare("UPDATE users SET PasswordHash = ? WHERE ID = ?");

    if($statement->execute(array(password_hash("newpw21$.", PASSWORD_DEFAULT), $_POST["id"]))){
        echo "100";
    }else{
        echo "200";
    }

    $pdo = null;
?>