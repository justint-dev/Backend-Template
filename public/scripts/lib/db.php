<?php
    class DB{
        function ReturnConnection(){
            $file = "../../settings/settings_db.json";
            $handle = fopen($file, "r");
            $json = fread($handle, filesize($file));
            $dbobj = json_decode($json);
            fclose($handle);


            return new PDO('mysql:host='.$dbobj->server.';dbname=backend', $dbobj->username, $dbobj->password);
        }
    }
?>