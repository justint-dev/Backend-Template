<?php
    $dir = '../../blog';
    $files = scandir($dir);
    $filelist = array_slice($files, 2);

    foreach($filelist as &$item){
        echo $item . "////";
    }
?>