<?php
    require_once('../lib/db.php');

    $pdo = (new DB)->ReturnConnection();

    $statement = $pdo->prepare("DELETE FROM shopitems WHERE Itemnumber = ?");
    $statement->execute(array($_POST["itemnumber"]));

    if($statement->rowCount() == 1){
        echo "100";
    }else{
        echo "200";
    }

    $pdo = null;
?>