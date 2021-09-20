<?php
    $dir = '../../dbbackups';
    $files = scandir($dir);
    $filelist = array_slice($files, 2);

    if(array_key_exists(0, $filelist)){
        $reversed = array_reverse($filelist);
        echo explode("####", $reversed[0])[2];
    }else{
        echo "none";
    }
?>