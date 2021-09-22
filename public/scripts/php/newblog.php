<?php
    $obj = new stdClass();
    $obj->title = $_POST["title"];
    $obj->date = $_POST["date"];
    $obj->text = $_POST["text"];

    //Gen ID
    $fi = new FilesystemIterator('../../blog', FilesystemIterator::SKIP_DOTS);
    $obj->id = (iterator_count($fi) + 1);

    $json = json_encode($obj);

    $handle = fopen(('../../blog/'.$obj->id.'####'.$obj->title.'####'.$obj->date.'.json'), "w");

    if(!fwrite($handle, $json)){
        fclose($handle);
        die("200");
    }

    fclose($handle);
    echo "100";
?>