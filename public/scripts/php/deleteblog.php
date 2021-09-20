<?php
    if(!unlink(realpath("../../blog/". $_POST["filename"]))){
        die("200");
    }

    echo "100";
?>