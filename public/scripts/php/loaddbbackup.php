<?php
    require_once('../lib/db.php');

    function LoadDBBackup(){
        $pdo = (new DB)->ReturnConnection();
        $path = "../../dbbackups/";
        $table = explode("####", $_POST["file"])[1];

        $statement = $pdo->prepare("SET FOREIGN_KEY_CHECKS=0;");
        if($statement->execute()){
            $statement = $pdo->prepare("TRUNCATE TABLE " . $table);
            if($statement->execute()){
                $handle = fopen($path . $_POST["file"], "r");
                $arr = fread($handle, filesize($path . $_POST["file"]));
                fclose($handle);

                $arr = explode("\r\n", $arr);
                array_pop($arr);

                $types = [];
                $temp = explode(";", $arr[0]);

                foreach($temp as $value){
                    $type = explode(":", $value)[1];

                    array_push($types, explode('(', $type)[0]);
                }

                for($i = 1; $i < count($arr); $i++){
                    $queryString = "INSERT INTO " . $table . " VALUES (";
                    $temp = explode(";", $arr[$i]);

                    for($c = 0; $c < count($temp); $c++){
                        if($types[$c] == "varchar" || $types[$c] == "datetime" || $types[$c] == "char"){
                            $queryString .= "'" . $temp[$c] . "',";
                        }else{
                            $queryString .= $temp[$c] . ",";
                        }
                    }

                    $queryString = substr($queryString, 0, -1) . ")";

                    $statement = $pdo->prepare($queryString);
                    if(!$statement->execute()){
                        die("200");
                    }
                }
            }else{
                die("200");
            }

            $statement = $pdo->prepare("SET FOREIGN_KEY_CHECKS=1");
            if(!$statement->execute()){
                die("200");
            }
        }else{
            die("200");
        }

        echo "100";
    }

    LoadDBBackup();
?>