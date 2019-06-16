<?php

class Classrooms extends Model {

    public function get ($id, $sql = null) {
        $arr = parent::get($id, $sql);
        return count($arr) <= 0 ? null : $arr[0];
    }

    public function update ($id, $newData) {
        $data = $this->retrieve($id);

        if ($data->id <= 0)
        return [
            "status" => false,
            "message" => "Couldn't find entry with id: $id"
        ];

        $data->name = $this->isset($newData, "name", $data->name);

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

        $assocCount = R::count("courses", "classroom_id = {$id}");
        if ($assocCount > 0) {
            return [
                "status" => false,
                "message" => "$assocCount related rows found. Remove them first."
            ];
        }

        try {
            R::trash($data);
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