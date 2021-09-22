<?php
    require_once('../lib/db.php');

    $pdo = (new DB)->ReturnConnection();
    $statement = $pdo->prepare("UPDATE users SET PasswordHash = ? WHERE Username = ?");

    if($statement->execute(array(password_hash($_POST["password"], PASSWORD_DEFAULT), $_POST["username"]))){
        echo "100";
    }else{
        $pdo = null;
        die("200");
    }

    $pdo = null;
?>