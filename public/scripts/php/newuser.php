<?php
    require_once('../lib/db.php');

    $pdo = (new DB)->ReturnConnection();
    $statement = $pdo->prepare("INSERT INTO users (Username, PasswordHash, UsergroupID) VALUES (?, ?, ?)");

    if($statement->execute(array($_POST["username"], password_hash("newpw21$.", PASSWORD_DEFAULT), $_POST["usergroup"]))){
        echo "100";
    }else{
        $pdo = null;
        die("200");
    }

    $pdo = null;
?>