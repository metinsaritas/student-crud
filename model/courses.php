<?php

class Courses extends Model {

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