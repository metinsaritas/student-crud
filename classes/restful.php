<?php

class RESTfulController extends Controller {

    protected function getModel () {
        $tableName = get_class($this);
        $bean = strtolower($tableName).'s';
        $model = $this->model($bean);
        return $model;
    }
    
    protected function json ($json) {
        header('Content-Type: application/json');
        echo json_encode($json, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    }

    public function list () {
        $model = $this->getModel();
        $data = $model->getAll();
        
        $this->view($tableName, [$bean => $data]);
    }

    public function all () {
        $model = $this->getModel();
        $data = $model->getAll();
        $this->json($data);
    }

    public function paged ($page) {
        $model = $this->getModel();
        $data = $model->getPaged($page);
        $this->json($data);
    }

    public function single ($id) {
        $model = $this->getModel();
        $data = $model->get($id);
        header('Content-Type: application/json');
        $this->json($data);
    }

    public function update ($id) {
        $model = $this->getModel();
        $newData = json_decode(file_get_contents("php://input"), true);
        $result = $model->update($id, $newData);
        $this->json($result);
    }

    public function delete ($id) {
        $model = $this->getModel();
        $data = $model->delete($id);
        $this->json($result);
    }

    public function insert () {
        $model = $this->getModel();
        $newData = json_decode(file_get_contents("php://input"), true);
        $result = $model->insert($newData);
        $this->json($result);
    }

}