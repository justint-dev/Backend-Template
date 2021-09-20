<?php
    if(!unlink(realpath("../../news/". $_POST["filename"]))){
        die("200");
    }

    echo "100";
?>