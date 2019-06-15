<?php

class Courses extends Model {

    public function getAll($sql = null) {
        $sql = "SELECT C.id, C.name, R.name AS classroomName FROM courses AS C INNER JOIN classrooms AS R ON C.classroom_id = R.id";
        return parent::getAll($sql);
    }

    public function getPaged ($page = 1, $sql = null) {
        if ($page <= 0) {
            $page = 1;
        }

        $tableName = get_class($this);
        $limit = 5;
        $next = ($page - 1) * $limit;
        $bean = strtolower($tableName);
        $total = R::count($bean);

        $sql = "SELECT C.id, C.name, R.name AS classroomName FROM courses AS C INNER JOIN classrooms AS R ON C.classroom_id = R.id
                LIMIT $next, $limit";
        return parent::getPaged($page, $sql);
    }

    public function get ($id, $sql = null) {
        $sql = "SELECT C.id, C.name, R.name AS classroomName FROM courses AS C INNER JOIN classrooms AS R ON C.classroom_id = R.id
                WHERE C.id = $id";
        return parent::get($id, $sql);
    }

    public function update ($id, $newData) {
        $data = $this->retrieve($id);

        if ($data->id <= 0)
        return [
            "status" => false,
            "message" => "Couldn't find entry with id: $id"
        ];

        $data->name = $this->isset($newData, "name", $data->name);
        $data->classroom_id = $this->isset($newData, "classroom_id", $data->classroom_id);

        /* Relation control; if exists, update it  */
        if (!$data->classroom_id || !R::findOne("classrooms", "id = {$data->classroom_id}")) {
            return [
                "status" => false,
                "message" => "Classroom is not found"
            ];
        }

        $newId = R::store($data);
        return [
            "status" => true,
        ];
    }

    public function delete ($id) {
        $tableName = get_class($this);
        $bean = strtolower($tableName);
        $data = $this->retrieve($id);
        if ($data->id <= 0) {
            return [
                "status" => false,
                "message" => "Couldn't find entry with id: $id"
            ];
        }

        try {
            R::trash($data);
            R::exec("DELETE FROM stakesc WHERE course_id = {$id}");
        } catch (Excetion $e) {
            return [
                "status" => false,
                "message" => $e->getMessage()
            ];
        }

        return [
            "status" => true,
            "data" => [
                "id" => $id 
            ]
        ];
    }

    public function insert ($newData) {
        $tableName = get_class($this);
        $bean = strtolower($tableName);
        $new = R::dispense($bean);
        $new->name = $this->isset($newData, "name", $new->name);
        $new->classroom_id = $this->isset($newData, "classroom_id", $new->classroom_id);
        
        if (!$new->classroom_id || !R::findOne("classrooms", "id = {$new->classroom_id}")) {
            return [
                "status" => false,
                "message" => "Classroom is not found"
            ];
        }

        try {
            $id = R::store($new);
        } catch (Exception $e) {
            return [
                "status" => false,
                "message" => $e->getMessage()
            ];
        }

        return [
            "status" => true,
            "data" => $new
        ];
    }
}