<?php
    require_once('../lib/db.php');

    $target_dir = "../../img/shop/" . $_FILES["image"]["name"];
    $imgLink = "./img/shop/" . $_FILES["image"]["name"];

    if(move_uploaded_file($_FILES["image"]["tmp_name"], $target_dir)){
        $pdo = (new DB)->ReturnConnection();
        $statement = $pdo->prepare("INSERT INTO shopitems (Itemnumber, Name, Description, Price, Imglink) VALUES (?, ?, ?, ?, ?)");

        if($statement->execute(array($_POST["itemnumber"], $_POST["name"], $_POST["description"], $_POST["price"], $imgLink))){
            echo "100";
        }else{
            $pdo = null;
            die("200");
        }

        $pdo = null;
    }else{
        $pdo = null;
        die("200");
    }
?>