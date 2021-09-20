<?php
    require_once('../lib/db.php');
    session_start();

    if(!isset($_SESSION['ID'])){
        die("300");
    }else{
        $pdo = (new DB)->ReturnConnection();
        $statement = $pdo->prepare("SELECT Username, Usergroup FROM users INNER JOIN usergroups ON users.UsergroupID = usergroups.ID WHERE users.ID = ?");
        $statement->execute(array($_SESSION['ID']));

        if($statement->rowCount() == 1){
            while($row = $statement->fetch()){
                echo $row["Username"] . "#" . $row["Usergroup"];
            }
        }else{
            die("200");
        }

        $pdo = null;
    }
?>