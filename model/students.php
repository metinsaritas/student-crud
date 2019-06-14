<?php

class Students extends Model {

    public function update ($id, $newData) {
        $data = $this->retrieve($id);

        if ($data->id <= 0)
        return [
            "status" => false,
            "message" => "Couldn't find entry with id: $id"
        ];

        $data->name =    $this->isset($newData, "name", $data->name);
        $data->surname = $this->isset($newData, "surname", $data->surname);

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
            R::exec("DELETE FROM stakesc WHERE student_id = {$id}");
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
        $new->surname = $this->isset($newData, "surname", $new->surname);
        
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