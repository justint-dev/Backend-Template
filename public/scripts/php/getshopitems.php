<?php
    require_once('../lib/db.php');

    $pdo = (new DB)->ReturnConnection();

    $statement = $pdo->prepare("SELECT Itemnumber, Name, Price, Imglink FROM shopitems");
    $statement->execute(array());

    if($statement->rowCount()){
        while($row = $statement->fetch()){
            echo $row["Itemnumber"] . "#" . $row["Name"] . "#" . $row["Price"] . "#" . $row["Imglink"] . "####";
        }
    }

    $pdo = null;
?>