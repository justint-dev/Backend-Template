<?php
    if(!unlink(realpath("../../dbbackups/". $_POST["filename"]))){
        die("200");
    }

    echo "100";
?>