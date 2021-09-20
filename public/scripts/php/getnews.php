<?php
    $dir = '../../news';
    $files = scandir($dir);
    $filelist = array_slice($files, 2);

    foreach($filelist as &$item){
        echo $item . "////";
    }
?>