<?php
    require_once('../lib/db.php');

    $pdo = (new DB)->ReturnConnection();

    $statement = $pdo->prepare("SET foreign_key_checks=0");
    if(!$statement->execute()){
        $pdo = null;
        die("200");
    }

    $statement = $pdo->prepare("DROP TABLE usergroups");
    if(!$statement->execute()){
        $pdo = null;
        die("200");
    }
    
    $statement = $pdo->prepare("DROP TABLE users");
    if(!$statement->execute()){
        $pdo = null;
        die("200");
    }

    $statement = $pdo->prepare("DROP TABLE shopitems");
    if(!$statement->execute()){
        $pdo = null;
        die("200");
    }

    $statement = $pdo->prepare("SET foreign_key_checks=1");
    if(!$statement->execute()){
        $pdo = null;
        die("200");
    }

    echo "100";
    $pdo = null;
?>