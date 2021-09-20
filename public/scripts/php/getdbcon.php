<?php
    $file = "../../settings/settings_db.json";
    $handle = fopen($file, "r");
    $json = fread($handle, filesize($file));
    $dbobj = json_decode($json);
    fclose($handle);

    echo $dbobj->server . "####" . $dbobj->username . "####" . $dbobj->password;
?>