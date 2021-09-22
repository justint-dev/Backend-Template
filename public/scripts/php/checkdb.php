<?php
    require_once('../lib/db.php');

    $pdo = (new DB)->ReturnConnection();

    $statement = $pdo->prepare("SELECT users.ID, Username, Usergroup FROM users INNER JOIN usergroups ON usergroups.ID = users.UsergroupID");
    $statement->execute(array());

    if($statement->rowCount()){
        echo "100";
    }else{
        $pdo = null;
        die("200");
    }

    $pdo = null;
?>