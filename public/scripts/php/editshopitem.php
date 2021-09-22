<?php
    require_once('../lib/db.php');

    $pdo = (new DB)->ReturnConnection();
    $statement = $pdo->prepare("UPDATE shopitems SET Itemnumber = ?, Name = ?, Price = ? WHERE Itemnumber = ?");

    if($statement->execute(array($_POST["itemnumber"], $_POST["name"], $_POST["price"], $_POST["oldItemnumber"]))){
        echo "100";
    }else{
        $pdo = null;
        die("200");
    }

    $pdo = null;
?>