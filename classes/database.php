<?php

try {
    R::setup('mysql:host='.DB_HOST.';dbname='.DB_NAME, DB_USERNAME, DB_PASSWORD);
} catch (Exception $e) {
    echo $e->getMessage();
}