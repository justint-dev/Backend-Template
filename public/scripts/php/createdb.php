<?php
    require_once('../lib/db.php');

    $pdo = (new DB)->ReturnConnection();
    $query1 = "CREATE TABLE `usergroups` (
            `ID` int(11) NOT NULL AUTO_INCREMENT,
            `Usergroup` varchar(50) NOT NULL,
            PRIMARY KEY (`ID`)
            ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4";

    $query2 = "INSERT INTO usergroups (ID, Usergroup) VALUES (1, 'Admin'), (2, 'Moderator'), (3, 'User');";

    $query3 = "CREATE TABLE `users` (
            `ID` int(11) NOT NULL AUTO_INCREMENT,
            `Username` varchar(50) NOT NULL,
            `PasswordHash` varchar(200) NOT NULL,
            `UsergroupID` int(11) NOT NULL,
            PRIMARY KEY (`ID`),
            KEY `usergroupID` (`UsergroupID`),
            CONSTRAINT `users_ibfk_1` FOREIGN KEY (`usergroupID`) REFERENCES `usergroups` (`ID`)
            ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4";

    $query4 = "INSERT INTO users (ID, Username, PasswordHash, UsergroupID) VALUES (1, 'justin', '$2y$10$8B5fka4kZ1zV/tOl8YJCX.LJl.bTaCFlJiplGM8CNO7t68HgoUl7S', 1)";

    $query5 = "CREATE TABLE `shopitems` (
            `Itemnumber` varchar(20) NOT NULL,
            `Name` varchar(50) NOT NULL,
            `Description` varchar(5000) DEFAULT NULL,
            `Price` varchar(10) DEFAULT NULL,
            `Imglink` varchar(200) DEFAULT NULL,
            PRIMARY KEY (`Itemnumber`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

    $statement = $pdo->prepare($query1);
    if(!$statement->execute()){
        die("200");
    }

    $statement = $pdo->prepare($query2);
    if(!$statement->execute()){
        die("200");
    }

    $statement = $pdo->prepare($query3);
    if(!$statement->execute()){
        die("200");
    }

    $statement = $pdo->prepare($query4);
    if(!$statement->execute()){
        die("200");
    }

    $statement = $pdo->prepare($query5);
    if(!$statement->execute()){
        die("200");
    }

    echo "100";
    $pdo = null;
?>