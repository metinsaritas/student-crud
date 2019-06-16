<?php

class Students extends Model {

    public function getAll($sql = null) {
        $sql = "SELECT S.*, C.name AS courseName, C.id AS courseId, R.name AS classroomName FROM students AS S LEFT JOIN stakesc AS Re ON S.id = Re.student_id LEFT JOIN courses AS C ON C.id = Re.course_id LEFT JOIN classrooms AS R ON R.id = C.classroom_id";
        $result = parent::getAll($sql);
        $data = [
            "total" => 0,
            "data" => $this->combine($result["data"])
        ];
        $data["total"] = count($data["data"]);
        return $data;
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

        $sql = "SELECT S.*, C.name AS courseName, C.id AS courseId, R.name AS classroomName FROM students AS S LEFT JOIN stakesc AS Re ON S.id = Re.student_id LEFT JOIN courses AS C ON C.id = Re.course_id LEFT JOIN classrooms AS R ON R.id = C.classroom_id";
        
        $result = parent::getPaged($page, $sql);
        $combined = $this->combine($result["data"]);
        $limited = array_slice($combined, $next, $limit);
        $data = [
            "total" => $result["total"],
            "data" => $limited
        ];
        return $data; 
    }

    public function get ($id, $sql = null) {
        $sql = "SELECT S.*, C.name AS courseName, C.id AS courseId, R.name AS classroomName FROM students AS S LEFT JOIN stakesc AS Re ON S.id = Re.student_id LEFT JOIN courses AS C ON C.id = Re.course_id LEFT JOIN classrooms AS R ON R.id = C.classroom_id
                WHERE S.id = $id";

        $arr = $this->combine(parent::get($id, $sql));
        return count($arr) <= 0 ? null : $arr[0];
    }

    private function combine ($arr) {
        $combined = [];
        foreach ($arr as $data):
            $id = $data["id"];
            $name = $data["name"];
            $surname = $data["surname"];
            $courseName = $data["courseName"];
            $classroomName = $data["classroomName"];
            $courseId = $data["courseId"];
            
            if (!isset($combined[$id])):
                $combined[$id] = [
                    "id" => $id,
                    "name"=> $name,
                    "surname"=> $surname,
                    "courses" => [],
                ];
            endif;

            $combined[$id]["courses"][] = [
                "courseName" => $courseName,
                "classroomName" => $classroomName,
                "courseId" => $courseId
            ];

            
        endforeach;
        return array_values($combined);
    }

    public function update ($id, $newData) {
        $data = $this->retrieve($id);

        if ($data->id <= 0)
        return [
            "status" => false,
            "message" => "Couldn't find entry with id: $id"
        ];

        $data->name =    $this->isset($newData, "name", $data->name);
        $data->surname = $this->isset($newData, "surname", $data->surname);

        if (isset($newData["courses"]) && is_array($newData["courses"])) {

            $courses = $newData["courses"];
            R::getAll("DELETE FROM stakesc WHERE student_id = $id");
            $availableCourses = [];
            foreach ($courses as $cid):
                $count = R::count("courses", "id = $cid");
                if ($count >= 1) {
                    $availableCourses[] = "($id, $cid)";
                }
            endforeach;

            try {
                $values = implode(", ", $availableCourses);
                
                $sql = "INSERT INTO stakesc (student_id, course_id) VALUES $values";
                R::getAll($sql);
            }
            catch (Exception $e) {}
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