<?php
    require_once('../lib/db.php');

    session_start();
    $pdo = (new DB)->ReturnConnection();

    $statement = $pdo->prepare("SELECT ID, Username, PasswordHash FROM users WHERE Username=?");
    $statement->execute(array($_POST["username"]));

    if($statement->rowCount()){
        while($row = $statement->fetch()){
            if($_POST["password"] == password_verify($_POST["password"], $row["PasswordHash"])){
                if($_POST["password"] != "newpw21$."){
                    echo "100";
                    $_SESSION["ID"] = $row["ID"];
                }else{
                    echo "500"; //reset password
                }
            }else{
                $pdo = null;
                die("200");
            }
        }
    }

    $pdo = null;
?>