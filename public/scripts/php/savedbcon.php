<?php
    $dbobj = new stdClass();
    $dbobj->server = $_POST["server"];
    $dbobj->username = $_POST["username"];
    $dbobj->password = $_POST["password"];
    $json = json_encode($dbobj);

    $handle = fopen('../../settings/settings_db.json', 'w');

    if(!fwrite($handle, $json)){
        fclose($handle);
        die("200");
    }

    fclose($handle);
    echo "100";
?>