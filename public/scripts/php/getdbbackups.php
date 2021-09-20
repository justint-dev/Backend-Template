<?php
    $dir = '../../dbbackups';
    $files = scandir($dir);
    $filelist = array_slice($files, 2);
    $reversed = array_reverse($filelist);

    foreach($reversed as &$item){
        echo $item . "////";
    }
?>