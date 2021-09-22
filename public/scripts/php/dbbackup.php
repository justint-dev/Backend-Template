<?php
    require_once('../lib/db.php');

    $pdo = (new DB)->ReturnConnection();
    $path = "../../dbbackups/";
    $statement = $pdo->prepare("SHOW TABLES");

    if($statement->execute()){
        $arr = $statement->fetchAll(PDO::FETCH_COLUMN);

        foreach($arr as $table){
            //Gen ID
            $fi = new FilesystemIterator('../../dbbackups', FilesystemIterator::SKIP_DOTS);
            $id = (iterator_count($fi) + 1);

            $filename = $id . "####" . $table . "####" . date("d-m-Y") . ".csv";
            $csv = "";
            $handle = fopen($path . $filename, 'w');

            $statement = $pdo->prepare("DESCRIBE " . $table);
            $statement->execute();

            if($statement->rowCount()){
                while($row = $statement->fetch()){
                    $csv .= $row["Field"] . ":" . $row["Type"] . ";";
                }

                $csv = substr($csv, 0, -1);
                $csv .= "\r\n";
            }

            $statement = $pdo->prepare("SELECT * FROM " . $table);
            $statement->execute();

            if($statement->rowCount()){
                while($row = $statement->fetch(PDO::FETCH_NUM)){
                    foreach($row as $value){
                        $csv .= $value . ";";
                    }

                    $csv = substr($csv, 0, -1);
                    $csv .= "\r\n";
                }
            }

            if(!fwrite($handle, $csv)){
                fclose($handle);
                die("200");
            }

            fclose($handle);
        }

        echo "100";
    }
?>