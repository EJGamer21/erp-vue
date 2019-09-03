<?php

class Api extends Database {
    protected $_tablename = 'users';

    function getUser() {
        
        header('Content-type: application/json; charset=utf8');
        http_response_code(200);
        $json['users'] = $this->get();

        echo json_encode($json);
    }
}