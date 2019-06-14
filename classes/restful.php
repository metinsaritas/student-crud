<?php

class RESTfulController extends Controller {

    public function list () {
        $tableName = get_class($this);
        $bean = strtolower($tableName).'s';
        $model = $this->model($bean);
        $data = $model->getAll();
        
        $this->view($tableName, [$bean => $data]);
    }

    public function all () {
        $tableName = get_class($this);
        $bean = strtolower($tableName).'s';
        $model = $this->model($bean);
        $data = $model->getAll();
        header('Content-Type: application/json');
        echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    }

    public function paged ($page) {
        $tableName = get_class($this);
        $bean = strtolower($tableName).'s';
        $model = $this->model($bean);
        $data = $model->getPaged($page);
        header('Content-Type: application/json');
        echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    }

    public function single ($id) {
        $tableName = get_class($this);
        $bean = strtolower($tableName).'s';
        $model = $this->model($bean);
        $data = $model->get($id);
        header('Content-Type: application/json');
        echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    }

    public function update ($id) {
        $tableName = get_class($this);
        $bean = strtolower($tableName).'s';
        $model = $this->model($bean);
        $newData = json_decode(file_get_contents("php://input"), true);
        $result = $model->update($id, $newData);
        echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    }

    public function delete ($id) {
        $tableName = get_class($this);
        $bean = strtolower($tableName).'s';
        $model = $this->model($bean);
        $data = $model->delete($id);
        header('Content-Type: application/json');
        echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    }

    public function insert () {
        $tableName = get_class($this);
        $bean = strtolower($tableName).'s';
        $model = $this->model($bean);
        $newData = json_decode(file_get_contents("php://input"), true);
        $result = $model->insert($newData);
        echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    }
}